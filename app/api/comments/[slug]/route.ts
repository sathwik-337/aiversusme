import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comments } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const jobComments = await db
      .select()
      .from(comments)
      .where(eq(comments.job_slug, slug))
      .orderBy(desc(comments.created_at));

    return NextResponse.json(jobComments);
  } catch (error) {
    console.error("Failed to fetch comments:", error);
    return NextResponse.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { name, email, content } = await req.json();

    if (!name || !content) {
      return NextResponse.json({ error: "Name and content are required" }, { status: 400 });
    }

    const [newComment] = await db.insert(comments).values({
      job_slug: slug,
      name,
      email,
      content,
    }).returning();

    return NextResponse.json(newComment);
  } catch (error) {
    console.error("Failed to post comment:", error);
    return NextResponse.json({ error: "Failed to post comment" }, { status: 500 });
  }
}
