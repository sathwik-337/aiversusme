"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import type { AcademyCourse } from "@/app/data/academy";
import AcademyModuleQuiz from "@/components/academy-module-quiz";
import {
  completeModuleQuiz,
  getAcademyPassPercentage,
  getAcademyScorePercentage,
  getEmptyAcademyProgress,
  getAcademyProgress,
  hasPassedAcademyAssessment,
  hydrateAcademyProgress,
  subscribeAcademyProgress,
} from "@/lib/academy-progress";

type AcademyModuleQuizRouteProps = {
  course: AcademyCourse;
  moduleId: string;
};

export default function AcademyModuleQuizRoute({
  course,
  moduleId,
}: AcademyModuleQuizRouteProps) {
  const requiredPercentage = getAcademyPassPercentage();
  const { isLoaded, userId } = useAuth();
  const moduleIndex = course.modules.findIndex((module) => module.id === moduleId);
  const currentModule = course.modules[moduleIndex];
  const progress = useSyncExternalStore(
    (callback) => subscribeAcademyProgress(userId, course.slug, callback),
    () => getAcademyProgress(userId, course.slug),
    getEmptyAcademyProgress
  );
  const isEnrolled = progress.enrolled;
  const previousModuleIds = course.modules.slice(0, moduleIndex).map((item) => item.id);
  const isUnlocked = previousModuleIds.every((id) =>
    progress.completedModuleIds.includes(id)
  );
  const savedScore = progress.quizScores[moduleId];
  const nextModule = course.modules[moduleIndex + 1];
  const [localCompletionResult, setLocalCompletionResult] = useState<{
    score: number;
    total: number;
  } | null>(null);
  const completionResult = localCompletionResult ?? savedScore ?? null;
  const completionPercentage = completionResult
    ? getAcademyScorePercentage(completionResult)
    : null;
  const hasPassed = completionResult
    ? hasPassedAcademyAssessment(completionResult)
    : false;

  useEffect(() => {
    if (!isLoaded || !userId) {
      return;
    }

    void hydrateAcademyProgress(userId, course.slug);
  }, [course.slug, isLoaded, userId]);

  if (!currentModule) {
    return null;
  }

  if (!isLoaded) {
    return null;
  }

  if (!isEnrolled) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-300" />
            <h1 className="text-2xl font-semibold">Enroll first</h1>
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            You need to enroll in this course before quizzes and modules unlock.
          </p>
          <Link
            href={`/academy/${course.slug}`}
            className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Back to course
          </Link>
        </div>
      </section>
    );
  }

  if (!isUnlocked) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-300" />
            <h1 className="text-2xl font-semibold">Quiz locked</h1>
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Pass the previous module quiz first. This route unlocks in sequence.
          </p>
          <Link
            href={`/academy/${course.slug}`}
            className="mt-6 inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Back to course
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
        <Link
          href={`/academy/${course.slug}?module=${currentModule.id}`}
          className="inline-flex items-center text-sm font-medium text-zinc-300 transition hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to module
        </Link>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
          Module {currentModule.id} quiz
        </p>
        <h1 className="mt-3 text-3xl font-semibold">{currentModule.title}</h1>
        <p className="mt-4 text-sm leading-7 text-zinc-300">
          Answer all {currentModule.quiz?.length ?? 0} questions. When you submit, the
          score and percentage appear here. You need at least {requiredPercentage}% to
          unlock the next module.
        </p>

        {completionResult ? (
          <div className="mt-6 rounded-[24px] border border-emerald-300/25 bg-emerald-300/10 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              <p className="text-lg font-semibold text-white">
                Current score: {completionResult.score}/{completionResult.total} (
                {completionPercentage}%)
              </p>
            </div>
            <p className="mt-3 text-sm text-zinc-200">
              {hasPassed
                ? "Passed. The next module is now unlocked."
                : `You need at least ${requiredPercentage}% to unlock the next module.`}
            </p>
          </div>
        ) : null}

        <AcademyModuleQuiz
          assessmentId={`module-route-${currentModule.id}`}
          questions={currentModule.quiz ?? []}
          description={`Get at least ${requiredPercentage}% to unlock the next module.`}
          onComplete={({ score, totalQuestions, answers }) => {
            const nextScore = {
              score,
              total: totalQuestions,
            };
            setLocalCompletionResult(nextScore);
            void completeModuleQuiz(
              userId,
              course.slug,
              currentModule.id,
              {
                score: nextScore.score,
                total: nextScore.total,
              },
              answers
            );
          }}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/academy/${course.slug}?module=${currentModule.id}`}
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Return to module
          </Link>
          {completionResult && hasPassed && nextModule ? (
            <Link
              href={`/academy/${course.slug}?module=${nextModule.id}`}
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Go to next module
            </Link>
          ) : completionResult ? (
            <Link
              href={`/academy/${course.slug}`}
              className="inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Back to course
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
