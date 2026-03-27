import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { ilike, or, sql as drizzleSql } from "drizzle-orm";

export async function GET(req: NextRequest) {
  console.log("Search API hit with URL:", req.url);
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  if (!db) {
    console.error("Database not initialized");
    return NextResponse.json({ error: "Database not initialized" }, { status: 500 });
  }

  try {
    console.log("Searching for query:", query);
    
    // Test if jobs table is accessible
    if (!jobs) {
      throw new Error("Jobs schema not loaded");
    }

    let results: any[];
    try {
      results = await db
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
        .limit(10);
    } catch (drizzleError: any) {
      console.error("Drizzle search failed, trying fallback raw SQL:", drizzleError.message);
      
      const rawResults = await db.execute(drizzleSql`
        SELECT title, slug, job_code 
        FROM jobs 
        WHERE title ILIKE ${`%${query}%`} 
           OR slug ILIKE ${`%${query}%`} 
           OR synonyms ILIKE ${`%${query}%`}
        LIMIT 10
      `);
      
      // rawResults structure might vary between drivers
      results = Array.isArray(rawResults) ? rawResults : (rawResults as any).rows || [];
    }

    console.log(`Search for "${query}" returned ${results.length} results`);
    return NextResponse.json(results);
  } catch (error: any) {
    console.error("Search API Execution Error:", error);
    return NextResponse.json({ 
      error: "Search failed", 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
