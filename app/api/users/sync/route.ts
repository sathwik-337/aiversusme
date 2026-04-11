import { NextRequest, NextResponse } from "next/server";
import { syncCurrentUserToDatabase } from "@/lib/users";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const syncedUser = await syncCurrentUserToDatabase();
    return NextResponse.json({ success: true, user: syncedUser });
  } catch (error) {
    console.error("API user sync error:", error);
    return NextResponse.json({ success: false, error: "Sync failed" }, { status: 500 });
  }
}
