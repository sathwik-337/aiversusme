import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
import { academyOrders, academyCoupons, users } from "@/lib/db/schema";
import { academyCourseCatalog } from "@/app/data/academy-catalog";
import { eq, and, sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseSlug, couponCode, useCredits, isInternational } = await req.json();
    const course = academyCourseCatalog.find((c) => c.slug === courseSlug);

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if user wants to use credits
    if (useCredits) {
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.clerk_user_id, userId))
        .limit(1);

      if (user && user.credits > 0) {
        // Use 1 credit for enrollment
        await db
          .update(users)
          .set({ credits: sql`${users.credits} - 1` })
          .where(eq(users.clerk_user_id, userId));

        const orderId = `credit_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        
        await db.insert(academyOrders).values({
          user_id: userId,
          course_slug: courseSlug,
          razorpay_order_id: orderId,
          amount: 0,
          currency: "INR",
          status: "paid",
          coupon_code: "CREDIT_USED",
        });

        return NextResponse.json({
          id: orderId,
          amount: 0,
          currency: "INR",
          free: true,
          message: "Enrolled using 1 credit"
        });
      } else {
        return NextResponse.json({ error: "Insufficient credits" }, { status: 400 });
      }
    }

    let discountPercentage = 0;
    if (couponCode) {
      const [coupon] = await db
        .select()
        .from(academyCoupons)
        .where(eq(academyCoupons.code, couponCode))
        .limit(1);

      if (coupon && coupon.is_active === 1 && (coupon.usage_limit === -1 || coupon.usage_limit === null || coupon.usage_count < coupon.usage_limit)) {
        discountPercentage = coupon.discount_percentage;
      }
    }

    const originalPrice = course.price || 0;
    
    // International pricing mapping (matches use-price.ts)
    const PRICE_MAPPING: Record<number, number> = {
      999: 19.99,
      499: 9.99,
      99: 1.99,
      1999: 39.99,
    };

    let finalAmount: number;
    let finalCurrency: string;

    if (isInternational) {
      const usdPrice = PRICE_MAPPING[originalPrice] || (originalPrice / 80);
      const discountedUSD = Math.max(0, usdPrice * (1 - discountPercentage / 100));
      finalAmount = Math.round(discountedUSD * 100); // USD in cents
      finalCurrency = "USD";
    } else {
      const discountedINR = Math.max(0, originalPrice * (1 - discountPercentage / 100));
      finalAmount = Math.round(discountedINR * 100); // INR in paise
      finalCurrency = "INR";
    }

    if (finalAmount <= 0) {
      // Handle free enrollment (either course is free or 100% discount)
      const orderId = `free_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      await db.insert(academyOrders).values({
        user_id: userId,
        course_slug: courseSlug,
        razorpay_order_id: orderId,
        amount: 0,
        currency: finalCurrency,
        status: "paid",
        coupon_code: couponCode || null,
      });

      if (couponCode) {
        await db.update(academyCoupons)
          .set({ 
            usage_count: sql`${academyCoupons.usage_count} + 1`,
            is_active: sql`CASE WHEN ${academyCoupons.usage_limit} != -1 AND ${academyCoupons.usage_count} + 1 >= ${academyCoupons.usage_limit} THEN 0 ELSE 1 END`
          })
          .where(eq(academyCoupons.code, couponCode));
      }

      return NextResponse.json({
        id: orderId,
        amount: 0,
        currency: finalCurrency,
        free: true,
      });
    }

    const options = {
      amount: finalAmount,
      currency: finalCurrency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    await db.insert(academyOrders).values({
      user_id: userId,
      course_slug: courseSlug,
      razorpay_order_id: order.id,
      amount: finalAmount,
      currency: finalCurrency,
      status: "pending",
      coupon_code: couponCode || null,
    });

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      free: false,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
