"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface OpenCourseButtonProps {
  slug: string;
}

export default function OpenCourseButton({ slug }: OpenCourseButtonProps) {
  const { isSignedIn, isLoaded } = useAuth();

  // If not loaded, we can show a placeholder or nothing to avoid layout shifts
  if (!isLoaded) {
    return (
      <div className="mt-6 inline-flex items-center rounded-full bg-white/5 px-5 py-2.5 text-sm font-semibold text-transparent animate-pulse">
        Open course
        <ArrowRight className="ml-2 h-4 w-4 opacity-0" />
      </div>
    );
  }

  if (isSignedIn) {
    return (
      <Link
        href={`/academy/${slug}`}
        className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
      >
        Open course
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    );
  }

  return (
    <SignInButton mode="modal" fallbackRedirectUrl={`/academy/${slug}`}>
      <button
        type="button"
        className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
      >
        Open course
        <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </SignInButton>
  );
}
