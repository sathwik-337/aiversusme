import { NextRequest, NextResponse } from "next/server";
import { desc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import { academyCoupons } from "@/lib/db/schema";
import { isAuthorized } from "@/lib/admin-auth";
import crypto from "crypto";

export const runtime = "nodejs";

function generateCode(type: "coupon" | "voucher") {
  const prefix = type === "coupon" ? "AIVSMEC" : "AIVSMEV";
  const randomPart = crypto.randomBytes(6).toString("hex").toUpperCase();
  return `${prefix}${randomPart}`;
}

export async function GET(req: NextRequest) {
  try {
    if (!isAuthorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
      .select()
      .from(academyCoupons)
      .orderBy(desc(academyCoupons.created_at));

    return NextResponse.json(rows);
  } catch (error) {
    console.error("GET Coupons Error:", error);
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    type: "coupon" | "voucher";
    discountPercentage?: number;
    usageLimit?: number;
    count?: number;
    courseSlug?: string;
  };

  console.log("Admin creating codes:", body);

  if (!body.type || (body.type !== "coupon" && body.type !== "voucher")) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const count = Math.min(Math.max(body.count || 1, 1), 500);
  const discountPercentage = body.type === "coupon" ? 100 : (body.discountPercentage || 0);
  const usageLimit = body.usageLimit !== undefined ? body.usageLimit : 1; // Default to 1 for single-use
  const courseSlug = body.courseSlug || null;

  const couponsToInsert = [];
  const usedCodes = new Set<string>();

  for (let i = 0; i < count; i++) {
    let code = generateCode(body.type);
    // Extremely unlikely collision with 8 hex chars, but let's be safe
    while (usedCodes.has(code)) {
      code = generateCode(body.type);
    }
    usedCodes.add(code);

    couponsToInsert.push({
      code,
      course_slug: courseSlug,
      discount_percentage: discountPercentage,
      usage_limit: usageLimit,
      is_active: 1,
    });
  }

  const newCoupons = await db
    .insert(academyCoupons)
    .values(couponsToInsert)
    .returning();

  return NextResponse.json(newCoupons);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids"); // comma-separated ids

  if (!ids) {
    return NextResponse.json({ error: "IDs required" }, { status: 400 });
  }

  const idArray = ids.split(",");

  await db.delete(academyCoupons).where(inArray(academyCoupons.id, idArray));

  return NextResponse.json({ ok: true });
}
