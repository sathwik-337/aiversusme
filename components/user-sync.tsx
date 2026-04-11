"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function UserSync() {
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    if (isLoaded && userId) {
      // Trigger the sync via an API route to avoid dynamic server usage in layouts
      fetch("/api/users/sync", { method: "POST" }).catch((err) => {
        console.error("Failed to sync user:", err);
      });
    }
  }, [userId, isLoaded]);

  return null;
}
