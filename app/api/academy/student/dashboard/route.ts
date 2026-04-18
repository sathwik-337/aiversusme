import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users, academyOrders, academyCoupons, academyAssessmentResults, academyCertificates } from "@/lib/db/schema";
import { eq, desc, and, notInArray } from "drizzle-orm";
import { academyCourseCatalog } from "@/app/data/academy-catalog";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get user data (credits)
    const [userData] = await db
      .select()
      .from(users)
      .where(eq(users.clerk_user_id, userId))
      .limit(1);

    // 2. Get enrolled courses (paid or free orders)
    const enrollments = await db
      .select()
      .from(academyOrders)
      .where(and(
        eq(academyOrders.user_id, userId),
        eq(academyOrders.status, "paid")
      ))
      .orderBy(desc(academyOrders.created_at));

    // 3. Get all quiz results to calculate progress
    const quizResults = await db
      .select()
      .from(academyAssessmentResults)
      .where(eq(academyAssessmentResults.user_id, userId))
      .orderBy(desc(academyAssessmentResults.created_at));

    // 4. Get earned certificates
    const certificates = await db
      .select()
      .from(academyCertificates)
      .where(eq(academyCertificates.user_id, userId))
      .orderBy(desc(academyCertificates.created_at));

    // 5. Combine data for dashboard
    const enrolledSlugs = enrollments.map(o => o.course_slug);
    const enrolledCourses = enrollments.map(order => {
      const course = academyCourseCatalog.find(c => c.slug === order.course_slug);
      if (!course) return null;

      const courseQuizResults = quizResults.filter(r => 
        r.course_slug === order.course_slug && 
        (r.assessment_type === "module_quiz" || r.assessment_type === "quiz") &&
        (r.total_questions > 0 && Math.round((r.score / r.total_questions) * 100) >= 60)
      );
      const totalModules = course.modules?.length || 0;
      const completedModules = new Set(courseQuizResults.map(r => r.module_id)).size;
      const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

      return {
        slug: course.slug,
        title: course.title,
        thumbnail: course.cardImageSrc,
        progress: progress,
        enrolledAt: order.created_at,
        totalModules,
        completedModules
      };
    }).filter(Boolean);

    // 6. Get recommendations (courses not yet enrolled)
    const recommendations = academyCourseCatalog
      .filter(c => !enrolledSlugs.includes(c.slug))
      .slice(0, 3)
      .map(c => ({
        slug: c.slug,
        title: c.title,
        thumbnail: c.cardImageSrc,
        level: c.level,
        tagline: c.tagline
      }));

    // 7. Recent activity (last 5 quiz results)
    const recentActivity = quizResults.slice(0, 5).map(r => {
      const course = academyCourseCatalog.find(c => c.slug === r.course_slug);
      return {
        id: r.id,
        courseTitle: course?.title || r.course_slug,
        courseSlug: r.course_slug,
        score: r.score,
        totalQuestions: r.total_questions,
        type: r.assessment_type,
        createdAt: r.created_at
      };
    });

    return NextResponse.json({
      user: {
        credits: userData?.credits || 0,
      },
      enrolledCourses,
      certificates: certificates.map(cert => ({
        number: cert.certificate_number,
        courseTitle: cert.course_title,
        courseSlug: cert.course_slug,
        completedAt: cert.completed_at,
        grade: cert.grade,
        percentage: cert.percentage
      })),
      recentActivity,
      recommendations
    });
  } catch (error) {
    console.error("Failed to fetch student dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
