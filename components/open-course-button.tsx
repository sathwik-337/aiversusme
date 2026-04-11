"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface OpenCourseButtonProps {
  slug: string;
}

export default function OpenCourseButton({ slug }: OpenCourseButtonProps) {
  return (
    <>
      <SignedIn>
        <Link
          href={`/academy/${slug}`}
          className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
        >
          Open course
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" fallbackRedirectUrl={`/academy/${slug}`}>
          <button
            type="button"
            className="mt-6 inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Open course
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </SignInButton>
      </SignedOut>
    </>
  );
}
