"use client";

import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { CheckCircle2, CirclePlay, Lock, Trophy, Minimize2, Maximize2 } from "lucide-react";
import type { AcademyCourse } from "@/app/data/academy";
import AcademyModuleContent from "@/components/academy-module-content";
import { cn } from "@/lib/utils";
import {
  enrollInAcademyCourse,
  getAcademyLetterGrade,
  getAcademyPassPercentage,
  getAcademyScorePercentage,
  getEmptyAcademyProgress,
  getAcademyProgress,
  hasPassedAcademyAssessment,
  hydrateAcademyProgress,
  subscribeAcademyProgress,
} from "@/lib/academy-progress";

type AcademyCourseOutlineProps = {
  course: AcademyCourse;
};

function AcademyCourseOutlineContent({
  course,
}: AcademyCourseOutlineProps) {
  const requiredPercentage = getAcademyPassPercentage();
  const searchParams = useSearchParams();
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const isSpecialUser = user?.primaryEmailAddress?.emailAddress === "sathwikkamath31@gmail.com";

  const progress = useSyncExternalStore(
    (callback) => subscribeAcademyProgress(userId, course.slug, callback),
    () => getAcademyProgress(userId, course.slug),
    getEmptyAcademyProgress
  );
  const [minimizedModules, setMinimizedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    course.modules.forEach(m => {
      initial[m.id] = true;
    });
    return initial;
  });

  const toggleMinimize = (moduleId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMinimizedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  useEffect(() => {
    if (!isLoaded || !userId) {
      return;
    }

    void hydrateAcademyProgress(userId, course.slug);
  }, [course.slug, isLoaded, userId]);

  const requestedModuleId = searchParams.get("module");
  const unlockedModuleCount = isSpecialUser ? course.modules.length : Math.min(
    course.modules.length,
    progress.completedModuleIds.length + 1
  );
  const isEnrolled = progress.enrolled || isSpecialUser;

  const activeModule = useMemo(() => {
    if (!isEnrolled) {
      return course.modules[0];
    }

    const requestedIndex = course.modules.findIndex(
      (module) => module.id === requestedModuleId
    );

    if (requestedIndex >= 0 && (isSpecialUser || requestedIndex < unlockedModuleCount)) {
      return course.modules[requestedIndex];
    }

    return course.modules[Math.max(0, unlockedModuleCount - 1)];
  }, [course.modules, isEnrolled, isSpecialUser, requestedModuleId, unlockedModuleCount]);

  const allModulesComplete =
    isSpecialUser || progress.completedModuleIds.length === course.modules.length;
  const finalExamCompleted = Boolean(progress.finalExamScore);

  if (!isLoaded) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-8">
      <div className="grid gap-8 xl:grid-cols-[0.36fr_0.64fr] xl:items-start">
        <aside className="rounded-[32px] border border-white/10 bg-zinc-950 p-6 self-start">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            {isEnrolled ? "Course flow" : "Enrollment"}
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            {isEnrolled
              ? "Watch the module, then open its quiz from the sidebar"
              : "Review the syllabus and enroll to unlock the modules"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {isEnrolled
              ? `Each next module stays locked until the current module quiz is passed with at least ${requiredPercentage}%.`
              : "Until you enroll, the module player, quizzes, and final exam stay locked."}
          </p>

          {!isEnrolled ? (
            <button
              type="button"
              onClick={() => void enrollInAcademyCourse(userId, course.slug)}
              className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Enroll now
            </button>
          ) : null}

          {isEnrolled && (
            <div className="mt-6 space-y-3">
              {course.modules.map((module, index) => {
                const unlocked = isEnrolled && index < unlockedModuleCount;
                const completed = progress.completedModuleIds.includes(module.id);
                const score = progress.quizScores[module.id];
                const percentage = score ? getAcademyScorePercentage(score) : null;
                const passed = score ? hasPassedAcademyAssessment(score) : false;
                const isMinimized = minimizedModules[module.id];

                return (
                  <div
                    key={module.id}
                    className={cn(
                      "rounded-[24px] border p-4 transition-all duration-300",
                      activeModule.id === module.id
                        ? "border-sky-300/60 bg-sky-300/10"
                        : "border-white/10 bg-white/[0.03]",
                      !unlocked && "opacity-60"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={unlocked ? `/academy/${course.slug}?module=${module.id}` : "#"}
                        className={cn("flex-grow block", !unlocked && "pointer-events-none")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                            Module {module.id}
                          </span>
                          <div className="flex items-center gap-2">
                            {completed ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                            ) : unlocked ? (
                              <CirclePlay className="h-4 w-4 text-sky-300" />
                            ) : (
                              <Lock className="h-4 w-4 text-zinc-500" />
                            )}
                          </div>
                        </div>
                        <p className="mt-3 text-base font-semibold text-white">{module.title}</p>
                      </Link>
                      
                      <button 
                        onClick={(e) => toggleMinimize(module.id, e)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                        title={isMinimized ? "Maximize" : "Minimize"}
                      >
                        {isMinimized ? (
                          <Maximize2 className="h-4 w-4 text-zinc-400" />
                        ) : (
                          <Minimize2 className="h-4 w-4 text-zinc-400" />
                        )}
                      </button>
                    </div>

                    {!isMinimized && (
                      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                          Quiz
                        </p>
                        <p className="mt-2 text-sm text-zinc-300">
                          {score
                            ? `Score: ${score.score}/${score.total} (${percentage}%)`
                            : "5 questions"}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {score
                            ? passed
                              ? "Passed. Next module unlocked."
                              : `Need ${requiredPercentage}% to unlock the next module.`
                            : `Minimum ${Math.ceil((5 * requiredPercentage) / 100)} correct answers required.`}
                        </p>
                        {unlocked ? (
                          <Link
                            href={`/academy/${course.slug}/module/${module.id}/quiz`}
                            className="mt-3 inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
                          >
                            {score ? "Retake quiz" : "Start quiz"}
                          </Link>
                        ) : (
                          <div className="mt-3 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-500">
                            Quiz locked
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </aside>

        <div className="space-y-8">
          {isEnrolled ? (
            <AcademyModuleContent key={activeModule.id} module={activeModule} courseSlug={course.slug} />
          ) : (
            <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
                Syllabus preview
              </p>
              <h3 className="mt-4 text-3xl font-semibold text-white">
                Enroll to unlock the module player
              </h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">
                After enrolling, you can open the video lessons, take each quiz,
                and unlock the final exam in sequence.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {course.modules.map((module) => (
                  <div
                    key={module.id}
                    className="rounded-[24px] border border-white/10 bg-white/[0.03] p-5"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Module {module.id}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{module.title}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {module.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={cn(
          "mt-8 rounded-[32px] border p-8",
          allModulesComplete
            ? "border-emerald-300/25 bg-emerald-300/10"
            : "border-white/10 bg-zinc-950",
          !isEnrolled && "opacity-50 hidden"
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Final exam
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              {course.modules.length * 2}-question course exam
            </h3>
          </div>
          <Trophy
            className={cn(
              "h-6 w-6",
              allModulesComplete ? "text-amber-300" : "text-zinc-500"
            )}
          />
        </div>

        <p className="mt-4 text-sm leading-7 text-zinc-300">
          {!isEnrolled
            ? `The final exam unlocks only after you enroll and pass every module quiz with at least ${requiredPercentage}%.`
            : allModulesComplete
            ? "All module quizzes are passed. Open the final exam on its dedicated page."
            : `The final exam stays locked until every module quiz is passed with at least ${requiredPercentage}%.`}
        </p>

        {isEnrolled && allModulesComplete ? (
          <div className="mt-6 rounded-[26px] border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between gap-4"
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Final exam
                </p>
                <p className="mt-2 text-sm text-zinc-200">
                  Open the full {course.modules.length * 2}-question exam on its separate page.
                </p>
              </div>
              <Link
                href={`/academy/${course.slug}/final-exam`}
                className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                {finalExamCompleted ? "Retake final exam" : "Start final exam"}
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function AcademyCourseOutline(props: AcademyCourseOutlineProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading course outline...</div>}>
      <AcademyCourseOutlineContent {...props} />
    </Suspense>
  );
}
