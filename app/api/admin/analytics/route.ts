import { NextRequest, NextResponse } from "next/server";
import { count, desc, eq, sql, gte, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, academyOrders, academyCourses, academyCertificates, academyAssessmentResults } from "@/lib/db/schema";
import { isAuthorized } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // 1. Total Stats
    const totalUsers = await db.select({ count: count() }).from(users);
    const totalEnrollments = await db.select({ count: count() }).from(academyOrders).where(eq(academyOrders.status, "paid"));
    const totalCertificates = await db.select({ count: count() }).from(academyCertificates);
    
    const totalRevenueResult = await db.select({ 
      total: sql<string>`sum(${academyOrders.amount})` 
    }).from(academyOrders).where(eq(academyOrders.status, "paid"));
    const totalRevenue = (Number(totalRevenueResult[0]?.total) || 0) / 100; // Convert paise to INR

    // 2. Enrollments Over Time (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const enrollmentsOverTime = await db.select({
      date: sql<string>`${academyOrders.created_at}::date`,
      count: count(),
    })
    .from(academyOrders)
    .where(and(eq(academyOrders.status, "paid"), gte(academyOrders.created_at, thirtyDaysAgo)))
    .groupBy(sql`${academyOrders.created_at}::date`)
    .orderBy(sql`${academyOrders.created_at}::date`);

    // 3. Course Distribution
    const courseDistribution = await db.select({
      courseSlug: academyOrders.course_slug,
      count: count(),
    })
    .from(academyOrders)
    .where(eq(academyOrders.status, "paid"))
    .groupBy(academyOrders.course_slug);

    // 4. Quiz Performance (Average scores per course)
    const quizPerformance = await db.select({
      courseSlug: academyAssessmentResults.course_slug,
      avgScore: sql<string>`avg((${academyAssessmentResults.score} * 100.0) / NULLIF(${academyAssessmentResults.total_questions}, 0))`,
    })
    .from(academyAssessmentResults)
    .groupBy(academyAssessmentResults.course_slug);

    // 5. Recent Enrollments (Last 10)
    const recentEnrollments = await db.select({
      id: academyOrders.id,
      user_id: academyOrders.user_id,
      course_slug: academyOrders.course_slug,
      amount: academyOrders.amount,
      created_at: academyOrders.created_at,
    })
    .from(academyOrders)
    .where(eq(academyOrders.status, "paid"))
    .orderBy(desc(academyOrders.created_at))
    .limit(10);

    return NextResponse.json({
      stats: {
        totalUsers: Number(totalUsers[0].count),
        totalEnrollments: Number(totalEnrollments[0].count),
        totalCertificates: Number(totalCertificates[0].count),
        totalRevenue,
      },
      enrollmentsOverTime: enrollmentsOverTime.map(e => ({
        date: e.date,
        count: Number(e.count)
      })),
      courseDistribution: courseDistribution.map(c => ({
        courseSlug: c.courseSlug,
        count: Number(c.count)
      })),
      quizPerformance: quizPerformance.map(q => ({
        courseSlug: q.courseSlug,
        avgScore: Number(q.avgScore) || 0
      })),
      recentEnrollments,
    });
  } catch (error: any) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json({ 
      error: "Failed to fetch analytics",
      details: error?.message || String(error)
    }, { status: 500 });
  }
}
