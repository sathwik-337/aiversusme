import { NextRequest, NextResponse } from "next/server";
import { and, asc, eq } from "drizzle-orm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import {
  academyAssessmentResults,
  academyCertificates,
  users,
} from "@/lib/db/schema";
import {
  getAcademyLetterGrade,
  getAcademyScorePercentage,
  hasPassedAcademyAssessment,
} from "@/lib/academy-progress";
import {
  generateCertificateNumber,
  sendCertificateEmail,
} from "@/lib/certificates";
import { aiBeginnersCourse } from "@/app/data/academy-ai-beginners";
import { aiEngineersCourse } from "@/app/data/academy-ai-engineers";
import { aiAdvancedCourse } from "@/app/data/academy-ai-advanced";

type AssessmentType = "module_quiz" | "final_exam" | "enrollment";
const ENROLLMENT_MODULE_ID = "__enrollment__";
export const runtime = "nodejs";

type CertificateRow = {
  certificate_number: string;
  recipient_name: string;
  recipient_email: string;
  course_title: string;
  grade: string;
  percentage: number;
  completed_at: Date;
  email_status: string;
  email_sent_at: Date | null;
} | null;

function getCourseTitle(courseSlug: string) {
  if (aiBeginnersCourse.slug === courseSlug) {
    return aiBeginnersCourse.title;
  }
  if (aiEngineersCourse.slug === courseSlug) {
    return aiEngineersCourse.title;
  }
  if (aiAdvancedCourse.slug === courseSlug) {
    return aiAdvancedCourse.title;
  }

  return courseSlug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildProgressResponse(
  rows: Array<{
    module_id: string;
    assessment_type: string;
    score: number;
    total_questions: number;
  }>,
  certificate: CertificateRow
) {
  let enrolled = false;
  const completedModuleIds: string[] = [];
  const quizScores: Record<string, { score: number; total: number }> = {};
  let finalExamScore: { score: number; total: number } | null = null;

  for (const row of rows) {
    if (row.assessment_type === "enrollment") {
      enrolled = true;
      continue;
    }

    if (row.assessment_type === "module_quiz") {
      enrolled = true;
      quizScores[row.module_id] = {
        score: row.score,
        total: row.total_questions,
      };

      if (
        hasPassedAcademyAssessment({
          score: row.score,
          total: row.total_questions,
        })
      ) {
        completedModuleIds.push(row.module_id);
      }

      continue;
    }

    if (row.assessment_type === "final_exam") {
      enrolled = true;
      finalExamScore = {
        score: row.score,
        total: row.total_questions,
      };
    }
  }

  return {
    enrolled,
    completedModuleIds,
    quizScores,
    finalExamScore,
    certificate: certificate
      ? {
          certificateNumber: certificate.certificate_number,
          recipientName: certificate.recipient_name,
          recipientEmail: certificate.recipient_email,
          courseTitle: certificate.course_title,
          grade: certificate.grade,
          percentage: certificate.percentage,
          completedAt: certificate.completed_at.toISOString(),
          emailStatus: certificate.email_status,
          emailSentAt: certificate.email_sent_at
            ? certificate.email_sent_at.toISOString()
            : null,
        }
      : null,
  };
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await context.params;

    const rows = await db
      .select({
        module_id: academyAssessmentResults.module_id,
        assessment_type: academyAssessmentResults.assessment_type,
        score: academyAssessmentResults.score,
        total_questions: academyAssessmentResults.total_questions,
      })
      .from(academyAssessmentResults)
      .where(
        and(
          eq(academyAssessmentResults.user_id, userId),
          eq(academyAssessmentResults.course_slug, courseSlug)
        )
      )
      .orderBy(asc(academyAssessmentResults.module_id));

    const [certificate] = await db
      .select({
        certificate_number: academyCertificates.certificate_number,
        recipient_name: academyCertificates.recipient_name,
        recipient_email: academyCertificates.recipient_email,
        course_title: academyCertificates.course_title,
        grade: academyCertificates.grade,
        percentage: academyCertificates.percentage,
        completed_at: academyCertificates.completed_at,
        email_status: academyCertificates.email_status,
        email_sent_at: academyCertificates.email_sent_at,
      })
      .from(academyCertificates)
      .where(
        and(
          eq(academyCertificates.user_id, userId),
          eq(academyCertificates.course_slug, courseSlug)
        )
      )
      .limit(1);

    return NextResponse.json(buildProgressResponse(rows, certificate ?? null));
  } catch (error) {
    console.error("Failed to fetch academy progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch academy progress" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await context.params;
    const body = (await req.json()) as {
      moduleId?: string;
      assessmentType?: AssessmentType;
      score?: number;
      totalQuestions?: number;
      answers?: Record<string, string>;
    };

    const moduleId = typeof body.moduleId === "string" ? body.moduleId : "";
    const assessmentType = body.assessmentType;
    const score = Number(body.score);
    const totalQuestions = Number(body.totalQuestions);
    const answers =
      body.answers && typeof body.answers === "object" ? body.answers : {};

    if (!moduleId || !courseSlug) {
      return NextResponse.json(
        { error: "Course and module identifiers are required" },
        { status: 400 }
      );
    }

    if (
      assessmentType !== "module_quiz" &&
      assessmentType !== "final_exam" &&
      assessmentType !== "enrollment"
    ) {
      return NextResponse.json(
        { error: "Invalid assessment type" },
        { status: 400 }
      );
    }

    const isEnrollment = assessmentType === "enrollment";

    if (isEnrollment) {
      if (moduleId !== ENROLLMENT_MODULE_ID || score !== 0 || totalQuestions !== 0) {
        return NextResponse.json(
          { error: "Invalid enrollment payload" },
          { status: 400 }
        );
      }
    } else if (
      !Number.isFinite(score) ||
      !Number.isFinite(totalQuestions) ||
      score < 0 ||
      totalQuestions <= 0 ||
      score > totalQuestions
    ) {
      return NextResponse.json(
        { error: "Invalid score payload" },
        { status: 400 }
      );
    }

    const now = new Date();

    await db
      .insert(academyAssessmentResults)
      .values({
        user_id: userId,
        course_slug: courseSlug,
        module_id: moduleId,
        assessment_type: assessmentType,
        score,
        total_questions: totalQuestions,
        answers,
        updated_at: now,
      })
      .onConflictDoUpdate({
        target: [
          academyAssessmentResults.user_id,
          academyAssessmentResults.course_slug,
          academyAssessmentResults.module_id,
          academyAssessmentResults.assessment_type,
        ],
        set: {
          score,
          total_questions: totalQuestions,
          answers,
          updated_at: now,
        },
      });

    if (assessmentType === "final_exam") {
      const [existingCertificate] = await db
        .select({
          certificate_number: academyCertificates.certificate_number,
          percentage: academyCertificates.percentage,
        })
        .from(academyCertificates)
        .where(
          and(
            eq(academyCertificates.user_id, userId),
            eq(academyCertificates.course_slug, courseSlug)
          )
        )
        .limit(1);

      const [recipient] = await db
        .select({
          first_name: users.first_name,
          last_name: users.last_name,
          full_name: users.full_name,
          email: users.email,
        })
        .from(users)
        .where(eq(users.clerk_user_id, userId))
        .limit(1);
      const clerkUser = !recipient?.email || !recipient?.full_name ? await currentUser() : null;
      const clerkEmail =
        clerkUser?.emailAddresses.find(
          (email) => email.id === clerkUser.primaryEmailAddressId
        )?.emailAddress ?? clerkUser?.emailAddresses[0]?.emailAddress ?? null;
      const clerkName =
        [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(" ").trim() ||
        clerkUser?.username ||
        null;

      const recipientName =
        [recipient?.first_name, recipient?.last_name].filter(Boolean).join(" ").trim() ||
        recipient?.full_name ||
        clerkName ||
        "Learner";
      const recipientEmail = recipient?.email ?? clerkEmail;
      const percentage = getAcademyScorePercentage({
        score,
        total: totalQuestions,
      });
      const grade = getAcademyLetterGrade({
        score,
        total: totalQuestions,
      });
      const certificateNumber =
        existingCertificate?.certificate_number ?? generateCertificateNumber();
      const courseTitle = getCourseTitle(courseSlug);

      // On retest, we update the certificate score if the new score is higher or equal, 
      // or if no certificate exists yet.
      const shouldUpdateCertificate = !existingCertificate || percentage >= (existingCertificate.percentage ?? 0);

      if (recipientEmail && shouldUpdateCertificate) {
        await db
          .insert(academyCertificates)
          .values({
            user_id: userId,
            course_slug: courseSlug,
            certificate_number: certificateNumber,
            recipient_name: recipientName,
            recipient_email: recipientEmail,
            course_title: courseTitle,
            grade,
            percentage,
            completed_at: now,
            email_status: "pending",
            updated_at: now,
          })
          .onConflictDoUpdate({
            target: [
              academyCertificates.user_id,
              academyCertificates.course_slug,
            ],
            set: {
              recipient_name: recipientName,
              recipient_email: recipientEmail,
              course_title: courseTitle,
              grade,
              percentage,
              completed_at: now,
              email_status: "pending",
              updated_at: now,
            },
          });

        try {
          const mailResult = await sendCertificateEmail({
            certificateNumber,
            recipientName,
            recipientEmail,
            courseTitle,
            completionDate: now,
            grade,
            percentage,
            courseSlug,
          });

          await db
            .update(academyCertificates)
            .set({
              email_status: mailResult.status,
              email_sent_at: mailResult.sentAt,
              updated_at: new Date(),
            })
            .where(
              and(
                eq(academyCertificates.user_id, userId),
                eq(academyCertificates.course_slug, courseSlug)
              )
            );
        } catch (emailError) {
          console.error("Failed to send certificate email:", emailError);
          await db
            .update(academyCertificates)
            .set({
              email_status: "failed",
              updated_at: new Date(),
            })
            .where(
              and(
                eq(academyCertificates.user_id, userId),
                eq(academyCertificates.course_slug, courseSlug)
              )
            );
        }
      }
    }

    const rows = await db
      .select({
        module_id: academyAssessmentResults.module_id,
        assessment_type: academyAssessmentResults.assessment_type,
        score: academyAssessmentResults.score,
        total_questions: academyAssessmentResults.total_questions,
      })
      .from(academyAssessmentResults)
      .where(
        and(
          eq(academyAssessmentResults.user_id, userId),
          eq(academyAssessmentResults.course_slug, courseSlug)
        )
      );

    const [certificate] = await db
      .select({
        certificate_number: academyCertificates.certificate_number,
        recipient_name: academyCertificates.recipient_name,
        recipient_email: academyCertificates.recipient_email,
        course_title: academyCertificates.course_title,
        grade: academyCertificates.grade,
        percentage: academyCertificates.percentage,
        completed_at: academyCertificates.completed_at,
        email_status: academyCertificates.email_status,
        email_sent_at: academyCertificates.email_sent_at,
      })
      .from(academyCertificates)
      .where(
        and(
          eq(academyCertificates.user_id, userId),
          eq(academyCertificates.course_slug, courseSlug)
        )
      )
      .limit(1);

    return NextResponse.json(buildProgressResponse(rows, certificate ?? null));
  } catch (error) {
    console.error("Failed to save academy assessment:", error);
    return NextResponse.json(
      { error: "Failed to save academy assessment" },
      { status: 500 }
    );
  }
}
