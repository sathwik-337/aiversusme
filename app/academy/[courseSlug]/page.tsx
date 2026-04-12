import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, FileCheck2, GraduationCap, Lock } from "lucide-react";
import { getAcademyCourseBySlug, academyCourseCatalog } from "@/app/data/academy-catalog";
import AcademyCourseOutline from "@/components/academy-course-outline";

export async function generateStaticParams() {
  return academyCourseCatalog.map((course) => ({
    courseSlug: course.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ courseSlug: string }>;
}): Promise<Metadata> {
  const { courseSlug } = await props.params;
  const course = getAcademyCourseBySlug(courseSlug);

  if (!course) return {};

  return {
    title: course.title,
    description: course.summary,
    openGraph: {
      title: course.title,
      description: course.summary,
      url: `/academy/${courseSlug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description: course.summary,
    },
  };
}

export default async function AcademyCoursePage(props: {
  params: Promise<{ courseSlug: string }>;
}) {
  const { courseSlug } = await props.params;
  const course = getAcademyCourseBySlug(courseSlug);

  if (!course) {
    notFound();
  }

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
                {course.level}
              </span>
              <h1 className="mt-6 text-4xl font-semibold tracking-tight md:text-6xl">
                {course.title}
              </h1>
              <p className="mt-6 text-xl leading-8 text-zinc-300">
                {course.tagline}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">
                {course.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm text-zinc-200">
                <span className="rounded-full bg-white/5 px-4 py-2">{course.duration}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">{course.level}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">{course.pace}</span>
                <span className="rounded-full bg-white/5 px-4 py-2">
                  {course.isCoding ? "Technical/Coding" : "No coding required"}
                </span>
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h2 className="text-2xl font-semibold">Course structure</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Clock3 className="h-5 w-5 text-emerald-300" />
                  <p className="mt-3 text-lg font-semibold text-white">
                    {course.duration}
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">Total learning time</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <GraduationCap className="h-5 w-5 text-sky-300" />
                  <p className="mt-3 text-lg font-semibold text-white">
                    {course.modules.length} modules
                  </p>
                  <p className="mt-2 text-sm text-zinc-400">Step-by-step learning</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <Lock className="h-5 w-5 text-amber-300" />
                  <p className="mt-3 text-lg font-semibold text-white">Locked flow</p>
                  <p className="mt-2 text-sm text-zinc-400">Quiz unlocks next module</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <FileCheck2 className="h-5 w-5 text-rose-300" />
                  <p className="mt-3 text-lg font-semibold text-white">Final exam</p>
                  <p className="mt-2 text-sm text-zinc-400">Certificate of completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AcademyCourseOutline course={course} />
    </div>
  );
}
