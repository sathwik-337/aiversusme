import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("x-admin-auth") || req.headers.get("authorization");
  const expected = "Basic " + Buffer.from("admin:admin").toString("base64");
  return auth === expected;
}

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
      user_id: userId || "admin-generated",
      course_slug: courseSlug,
      certificate_number: certificateNumber,
      recipient_name: recipientName,
      recipient_email: recipientEmail,
      course_title: courseTitle,
      grade: grade,
      percentage: parseInt(percentage),
      completed_at: new Date(completedAt),
      email_status: "active",
      updated_at: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to generate certificate:", error);
    return NextResponse.json({ error: "Failed to generate certificate" }, { status: 500 });
  }
}
