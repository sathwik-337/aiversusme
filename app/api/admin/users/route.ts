import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export const runtime = "nodejs";

function isAuthorized(req: NextRequest) {
  const auth = req.headers.get("x-admin-auth") || req.headers.get("authorization");
  const expected = "Basic " + Buffer.from("admin:admin").toString("base64");
  return auth === expected;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const allUsers = await db
      .select()
      .from(users)
      .orderBy(desc(users.created_at));

    return NextResponse.json(allUsers);
  } catch (error) {
    console.error("Failed to fetch users:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
