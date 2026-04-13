import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { academyCertificates } from "@/lib/db/schema";
import { isAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const rows = await db
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
      updated_at: academyCertificates.updated_at,
    })
    .from(academyCertificates)
    .orderBy(desc(academyCertificates.updated_at));

  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as
    | { certificateNumber: string; action: "revoke" }
    | { certificateNumber: string; action: "restore" };

  if (!body?.certificateNumber || (body.action !== "revoke" && body.action !== "restore")) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const newStatus = body.action === "revoke" ? "revoked" : "active";

  await db
    .update(academyCertificates)
    .set({
      email_status: newStatus,
      updated_at: new Date(),
    })
    .where(eq(academyCertificates.certificate_number, body.certificateNumber));

  return NextResponse.json({ ok: true, status: newStatus });
}

