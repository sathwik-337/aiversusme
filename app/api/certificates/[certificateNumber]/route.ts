import { NextRequest, NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import { getCertificateFileName, renderCourseCertificatePdf } from "@/lib/certificates";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ certificateNumber: string }> }
) {
  try {
    const { certificateNumber } = await context.params;
    const [row] = await db
      .select({
        certificate_number: academyCertificates.certificate_number,
        recipient_name: academyCertificates.recipient_name,
        course_title: academyCertificates.course_title,
        grade: academyCertificates.grade,
        percentage: academyCertificates.percentage,
        completed_at: academyCertificates.completed_at,
        course_slug: academyCertificates.course_slug,
      })
      .from(academyCertificates)
      .where(eq(academyCertificates.certificate_number, certificateNumber))
      .limit(1);

    if (!row) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
    }

    const pdf = await renderCourseCertificatePdf({
      certificateNumber: row.certificate_number,
      recipientName: row.recipient_name,
      courseTitle: row.course_title,
      grade: row.grade,
      percentage: row.percentage,
      completionDate: row.completed_at,
      courseSlug: row.course_slug,
    });

    const download =
      req.nextUrl.searchParams.get("download") === "1" ||
      req.nextUrl.searchParams.get("download") === "true";
    const disposition = download ? "attachment" : "inline";

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `${disposition}; filename="${getCertificateFileName(
          row.certificate_number
        )}"`,
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to render certificate" }, { status: 500 });
  }
}
