import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import { and, eq } from "drizzle-orm";
import { isAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      userId,
      courseSlug,
      certificateNumber,
      recipientName,
      recipientEmail,
      courseTitle,
      grade,
      percentage,
      completedAt,
    } = body;

    if (
      !courseSlug ||
      !certificateNumber ||
      !recipientName ||
      !recipientEmail ||
      !courseTitle ||
      !grade ||
      percentage === undefined ||
      percentage === null ||
      !completedAt
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const normalizedRecipientEmail =
      typeof recipientEmail === "string" ? recipientEmail.trim().toLowerCase() : "";
    const effectiveUserId =
      typeof userId === "string" && userId.trim()
        ? userId.trim()
        : normalizedRecipientEmail
          ? `admin:${normalizedRecipientEmail}`
          : `admin:${certificateNumber}`;

    const percentageNumber =
      typeof percentage === "number" ? percentage : Number.parseInt(String(percentage), 10);
    if (!Number.isFinite(percentageNumber)) {
      return NextResponse.json({ error: "Invalid percentage" }, { status: 400 });
    }

    const completedAtDate = new Date(completedAt);
    if (Number.isNaN(completedAtDate.getTime())) {
      return NextResponse.json({ error: "Invalid completion date" }, { status: 400 });
    }

    const existingForRecipientCourse = await db
      .select({ id: academyCertificates.id })
      .from(academyCertificates)
      .where(
        and(
          eq(academyCertificates.user_id, effectiveUserId),
          eq(academyCertificates.course_slug, courseSlug)
        )
      )
      .limit(1);

    if (existingForRecipientCourse.length) {
      return NextResponse.json(
        { error: "A certificate already exists for this recipient" },
        { status: 409 }
      );
    }

    // Check if certificate already exists for this user and course
    const existing = await db
      .select()
      .from(academyCertificates)
      .where(eq(academyCertificates.certificate_number, certificateNumber))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json({ error: "Certificate number already exists" }, { status: 400 });
    }

    await db.insert(academyCertificates).values({
      user_id: effectiveUserId,
      course_slug: courseSlug,
      certificate_number: certificateNumber,
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      course_title: courseTitle,
      grade: grade,
      percentage: percentageNumber,
      completed_at: completedAtDate,
      email_status: "active",
      updated_at: new Date(),
    });

    return NextResponse.json({
      ok: true,
      certificateNumber,
      downloadUrl: `/api/certificates/${certificateNumber}?download=1`,
    });
  } catch (error) {
    console.error("Failed to generate certificate:", error);
    return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 });
  }
}
