import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { academyCoupons, users } from "@/lib/db/schema";
import { eq, sql, and, or } from "drizzle-orm";
import { syncCurrentUserToDatabase } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ensure user exists in our local database before trying to add credits
    await syncCurrentUserToDatabase();

    const { code } = await req.json();
    console.log("Redeeming voucher code:", code, "for user:", userId);

    if (!code) {
      return NextResponse.json({ error: "Voucher code is required" }, { status: 400 });
    }

    // 1. Find the voucher
    const [voucher] = await db
      .select()
      .from(academyCoupons)
      .where(eq(academyCoupons.code, code))
      .limit(1);

    if (!voucher) {
      console.log("Voucher not found in DB:", code);
      return NextResponse.json({ error: "Invalid voucher code" }, { status: 404 });
    }

    console.log("Voucher found:", voucher);

    // 2. Check if it's a voucher (AIVSMEV prefix)
    if (!code.startsWith("AIVSMEV")) {
      return NextResponse.json({ error: "This is a coupon, not a credit voucher. Use it at course checkout." }, { status: 400 });
    }

    // 3. Check if it's active
    if (voucher.is_active === 0) {
      return NextResponse.json({ error: "Voucher is inactive" }, { status: 400 });
    }

    // 4. Check if it's already used/expired
    if (voucher.usage_limit !== null && voucher.usage_limit !== -1 && voucher.usage_count >= voucher.usage_limit) {
      return NextResponse.json({ error: "Voucher has already been redeemed" }, { status: 400 });
    }

    // 5. Transaction to add credit and update voucher usage
    // Note: neon-http driver doesn't support interactive transactions (stateless HTTP),
    // but Drizzle can batch these statements together into a single request.
    await db.transaction(async (tx) => {
      // Increment voucher usage with a safety check in the WHERE clause
      const [updatedVoucher] = await tx
        .update(academyCoupons)
        .set({ 
          usage_count: sql`${academyCoupons.usage_count} + 1`,
          // If this use reaches the limit, mark as inactive
          is_active: sql`CASE WHEN ${academyCoupons.usage_limit} != -1 AND ${academyCoupons.usage_count} + 1 >= ${academyCoupons.usage_limit} THEN 0 ELSE 1 END`
        })
        .where(
          and(
            eq(academyCoupons.code, code),
            or(
              eq(academyCoupons.usage_limit, -1),
              sql`${academyCoupons.usage_count} < ${academyCoupons.usage_limit}`
            ),
            eq(academyCoupons.is_active, 1)
          )
        )
        .returning();

      if (!updatedVoucher) {
        throw new Error("Voucher could not be redeemed (already used or inactive)");
      }

      // Add credits to user
      const creditsToAdd = voucher.discount_percentage || 1;
      const [updatedUser] = await tx
        .update(users)
        .set({ 
          credits: sql`${users.credits} + ${creditsToAdd}` 
        })
        .where(eq(users.clerk_user_id, userId))
        .returning();

      if (!updatedUser) {
        throw new Error("Failed to add credits to user account. Please ensure your profile is synced.");
      }
    });

    const creditsAdded = voucher.discount_percentage || 1;
    return NextResponse.json({ 
      success: true, 
      message: `Voucher redeemed! ${creditsAdded} ${creditsAdded === 1 ? 'credit' : 'credits'} added to your account.` 
    });

  } catch (error: any) {
    console.error("Voucher redemption error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to redeem voucher" },
      { status: 500 }
    );
  }
}
