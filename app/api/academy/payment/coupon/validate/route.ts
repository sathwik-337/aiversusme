import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { academyCoupons } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { code, courseSlug } = await req.json();

    if (!code) {
      return NextResponse.json({ error: "Code required" }, { status: 400 });
    }

    const [coupon] = await db
      .select()
      .from(academyCoupons)
      .where(eq(academyCoupons.code, code))
      .limit(1);

    if (!coupon) {
      return NextResponse.json({ error: "Invalid coupon code" }, { status: 404 });
    }

    if (coupon.is_active === 0) {
      return NextResponse.json({ error: "Coupon is inactive" }, { status: 400 });
    }

    if (coupon.usage_limit !== null && coupon.usage_limit !== -1 && coupon.usage_count >= coupon.usage_limit) {
      return NextResponse.json({ error: "Coupon has expired or reached usage limit" }, { status: 400 });
    }

    if (coupon.course_slug && courseSlug && coupon.course_slug !== courseSlug) {
      return NextResponse.json({ error: "Coupon is not valid for this course" }, { status: 400 });
    }

    return NextResponse.json({
      code: coupon.code,
      discountPercentage: coupon.discount_percentage,
    });
  } catch (error) {
    console.error("Coupon validation error:", error);
    return NextResponse.json(
      { error: "Validation failed" },
      { status: 500 }
    );
  }
}
