import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { verifyRazorpaySignature } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { academyOrders, academyCoupons } from "@/lib/db/schema";
import { eq, and, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      course_slug,
    } = await req.json();

    const isVerified = verifyRazorpaySignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isVerified) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get order to check for coupon
    const [order] = await db
      .select()
      .from(academyOrders)
      .where(
        and(
          eq(academyOrders.razorpay_order_id, razorpay_order_id),
          eq(academyOrders.user_id, userId)
        )
      )
      .limit(1);

    // Update order status in database
    await db
      .update(academyOrders)
      .set({
        razorpay_payment_id,
        razorpay_signature,
        status: "paid",
        updated_at: new Date(),
      })
      .where(
        and(
          eq(academyOrders.razorpay_order_id, razorpay_order_id),
          eq(academyOrders.user_id, userId)
        )
      );

    // If coupon was used, increment usage count and deactivate if limit reached
    if (order && order.coupon_code) {
      await db.update(academyCoupons)
        .set({ 
          usage_count: sql`${academyCoupons.usage_count} + 1`,
          is_active: sql`CASE WHEN ${academyCoupons.usage_limit} != -1 AND ${academyCoupons.usage_count} + 1 >= ${academyCoupons.usage_limit} THEN 0 ELSE 1 END`
        })
        .where(eq(academyCoupons.code, order.coupon_code));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Razorpay verification error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
