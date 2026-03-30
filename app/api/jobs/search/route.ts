import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { ilike, or } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const results = await db
      .select({
        title: jobs.title,
        slug: jobs.slug,
      })
      .from(jobs)
      .where(or(ilike(jobs.title, `%${query}%`), ilike(jobs.slug, `%${query}%`)))
      .limit(5);

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
