import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { ilike, or } from "drizzle-orm";

export async function GET(req: NextRequest) {
  console.log("Search API hit with URL:", req.url);
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await db
      .select({
        title: jobs.title,
        slug: jobs.slug,
        job_code: jobs.job_code,
      })
      .from(jobs)
      .where(or(
        ilike(jobs.title, `%${query}%`),
        ilike(jobs.slug, `%${query}%`),
        ilike(jobs.synonyms, `%${query}%`)
      ))
      .limit(5);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
