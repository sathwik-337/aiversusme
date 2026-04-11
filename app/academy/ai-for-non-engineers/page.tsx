import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  FileCheck2,
  GraduationCap,
  Lock,
} from "lucide-react";
import { academyMiniCourse } from "@/app/data/academy-mini-course";
import AcademyCourseOutline from "@/components/academy-course-outline";

export const metadata: Metadata = {
  title: "AI for Beginners",
  description:
    "A beginner mini-course covering AI basics, real-world applications, AI tools, practical work use, and a locked final exam flow.",
  openGraph: {
    title: "AI for Beginners",
    description:
      "A beginner mini-course for non-engineers with videos, quizzes, module locks, and a final exam.",
    url: "/academy/ai-for-non-engineers",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI for Beginners",
    description:
      "A beginner mini-course for non-engineers with videos, quizzes, module locks, and a final exam.",
  },
};

export default function AiForNonEngineersPage() {
  return (
    <div className="bg-[#050505] text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_30%),radial-gradient(circle_at_85%_15%,_rgba(16,185,129,0.14),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.03),_transparent_42%)]" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36">
          <Link
            href="/academy"
            className="inline-flex items-center text-sm font-medium text-zinc-300 transition hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to e-learning
          </Link>

          <div className="mt-8 grid gap-10 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
            <div className="max-w-3xl">
              <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-sm font-medium text-amber-100">
                Mini course
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                {academyMiniCourse.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-zinc-300">
                {academyMiniCourse.tagline}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
                {academyMiniCourse.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-200">
                <span className="rounded-full bg-white/5 px-4 py-2">{academyMiniCourse.duration}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">{academyMiniCourse.level}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">{academyMiniCourse.pace}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">No coding</span>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-2xl font-semibold">Course structure</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Clock3 className="h-5 w-5 text-emerald-300" />
                  <p className="mt-3 text-lg font-semibold text-white">
                    {academyMiniCourse.duration}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">Total learning time</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <GraduationCap className="h-5 w-5 text-sky-300" />
                  <p className="mt-3 text-lg font-semibold text-white">
                    {academyMiniCourse.modules.length} modules
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">Each with 2 videos</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Lock className="h-5 w-5 text-amber-300" />
                  <p className="mt-3 text-lg font-semibold text-white">Locked flow</p>
                  <p className="mt-2 text-sm text-zinc-400">Quiz unlocks next module</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <FileCheck2 className="h-5 w-5 text-rose-300" />
                  <p className="mt-3 text-lg font-semibold text-white">10-question exam</p>
                  <p className="mt-2 text-sm text-zinc-400">Final test after all modules</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AcademyCourseOutline course={academyMiniCourse} />
    </div>
  );
}
