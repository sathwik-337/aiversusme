import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import {
  getCertificateFileName,
  getCertificateSvgFileName,
  renderCourseCertificate,
  renderCourseCertificatePdf,
  sendCertificateEmail,
} from "@/lib/certificates";

export const runtime = "nodejs";

async function getCertificateRecord(userId: string, courseSlug: string) {
  const [certificate] = await db
    .select({
      certificate_number: academyCertificates.certificate_number,
      recipient_name: academyCertificates.recipient_name,
      recipient_email: academyCertificates.recipient_email,
      course_title: academyCertificates.course_title,
      grade: academyCertificates.grade,
      percentage: academyCertificates.percentage,
      completed_at: academyCertificates.completed_at,
    })
    .from(academyCertificates)
    .where(
      and(
        eq(academyCertificates.user_id, userId),
        eq(academyCertificates.course_slug, courseSlug)
      )
    )
    .limit(1);

  return certificate ?? null;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ courseSlug: string }> }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug } = await context.params;
    const certificate = await getCertificateRecord(userId, courseSlug);

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    const data = {
      certificateNumber: certificate.certificate_number,
      recipientName: certificate.recipient_name,
      courseTitle: certificate.course_title,
      grade: certificate.grade,
      percentage: certificate.percentage,
      completionDate: certificate.completed_at,
      courseSlug,
    };
    const format = req.nextUrl.searchParams.get("format");

    if (format !== "svg") {
      const pdf = await renderCourseCertificatePdf(data);

      return new NextResponse(pdf, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${getCertificateFileName(
            certificate.certificate_number
          )}"`,
          "Cache-Control": "no-store",
        },
      });
    }

    const svg = await renderCourseCertificate(data);

    return new NextResponse(svg, {
      status: 200,
      headers: {
        "Content-Type": "image/svg+xml; charset=utf-8",
        "Content-Disposition": `attachment; filename="${getCertificateSvgFileName(
          certificate.certificate_number
        )}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Failed to download academy certificate:", error);
    return NextResponse.json(
      { error: "Failed to download certificate" },
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
    const certificate = await getCertificateRecord(userId, courseSlug);

    if (!certificate) {
      return NextResponse.json(
        { error: "Certificate not found" },
        { status: 404 }
      );
    }

    let pdfBase64: string | null = null;
    try {
      const body = await req.json();
      if (body && typeof body.pdfBase64 === "string" && body.pdfBase64.length > 0) {
        pdfBase64 = body.pdfBase64;
      }
    } catch {}

    const mailResult = await sendCertificateEmail(
      {
        certificateNumber: certificate.certificate_number,
        recipientName: certificate.recipient_name,
        recipientEmail: certificate.recipient_email,
        courseTitle: certificate.course_title,
        grade: certificate.grade,
        percentage: certificate.percentage,
        completionDate: certificate.completed_at,
        courseSlug,
      },
      {
        attachmentPdf: pdfBase64 ? Buffer.from(pdfBase64, "base64") : undefined,
      }
    );

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

    return NextResponse.json({
      success: true,
      emailStatus: mailResult.status,
      emailSentAt: mailResult.sentAt?.toISOString() ?? null,
    });
  } catch (error) {
    console.error("Failed to resend academy certificate email:", error);

    const { userId } = await auth();
    const { courseSlug } = await context.params;

    if (userId) {
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

    return NextResponse.json(
      { error: "Failed to resend certificate email" },
      { status: 500 }
    );
  }
}
