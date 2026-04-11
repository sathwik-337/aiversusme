import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function syncCurrentUserToDatabase() {
  try {
    // We avoid calling dynamic clerk functions during static prerendering
    // to prevent DYNAMIC_SERVER_USAGE errors during build.
    let clerkUser;
    try {
      clerkUser = await currentUser();
    } catch (e: any) {
      // In Next.js, certain functions like headers() or currentUser() throw a special 
      // error to signal dynamic rendering. We should catch it and return null
      // during static generation without logging it as an error.
      if (e?.digest === 'DYNAMIC_SERVER_USAGE' || e?.message?.includes('Dynamic server usage')) {
        return null;
      }
      throw e;
    }

    if (!clerkUser) {
      return null;
    }

    const cleanImageUrl = (value: string | null | undefined) => {
      if (!value || typeof value !== "string") return null;
      const trimmed = value.trim();
      if (!trimmed.startsWith("http")) return null;
      const noComma = trimmed.includes(",") ? trimmed.split(",")[0] : trimmed;
      try {
        const url = new URL(noComma);
        return url.toString();
      } catch {
        return null;
      }
    };

    const primaryEmail =
      clerkUser.emailAddresses.find(
        (email) => email.id === clerkUser.primaryEmailAddressId
      )?.emailAddress ?? clerkUser.emailAddresses[0]?.emailAddress ?? null;

    const fullName =
      [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ").trim() ||
      clerkUser.username ||
      null;

    const payload = {
      clerk_user_id: clerkUser.id,
      email: primaryEmail,
      first_name: clerkUser.firstName ?? null,
      last_name: clerkUser.lastName ?? null,
      full_name: fullName,
      image_url: cleanImageUrl(clerkUser.imageUrl) ?? null,
      updated_at: new Date(),
    };

    const [syncedUser] = await db
      .insert(users)
      .values(payload)
      .onConflictDoUpdate({
        target: users.clerk_user_id,
        set: payload,
      })
      .returning({ id: users.id });

    return syncedUser ?? null;
  } catch (error) {
    console.error("Failed to sync current user to database:", error);
    return null;
  }
}
