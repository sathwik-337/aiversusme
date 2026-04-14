"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  CirclePlay,
  FileCheck2,
  Lock,
  Trophy,
  Video,
} from "lucide-react";
import type { AcademyCourse, AcademyQuizQuestion } from "@/app/data/academy";
import { cn } from "@/lib/utils";
import AcademyModuleQuiz from "@/components/academy-module-quiz";
import { generateFinalExam } from "@/lib/academy-progress";
import { generateAutomatedQuiz } from "@/lib/quiz-generator";

type AcademyCoursePlayerProps = {
  course: AcademyCourse;
};

type ActiveModulePanelProps = {
  activeModule: AcademyCourse["modules"][number];
  activeModuleIndex: number;
  onComplete: (moduleId: string, moduleIndex: number) => void;
};

function getEmbedUrl(sourceUrl?: string) {
  if (!sourceUrl) return "";

  try {
    const url = new URL(sourceUrl);

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace("/", "");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : sourceUrl;
    }

    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) {
        return sourceUrl;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const videoId = url.pathname.split("/")[2];
        return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : sourceUrl;
      }

      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : sourceUrl;
    }

    return sourceUrl;
  } catch {
    return sourceUrl;
  }
}

function ActiveModulePanel({
  courseTitle,
  activeModule,
  activeModuleIndex,
  onComplete,
}: ActiveModulePanelProps & { courseTitle: string }) {
  const [lessonsExpanded, setLessonsExpanded] = useState(false);
  const [quizExpanded, setQuizExpanded] = useState(false);
  const [expandedVideos, setExpandedVideos] = useState<Record<string, boolean>>({});

  const activeVideos = activeModule.videos ?? [];
  const baseQuiz = activeModule.quiz ?? [];
  
  const activeQuiz = useMemo(() => {
    if (baseQuiz.length >= 5) return baseQuiz.slice(0, 5);
    
    // Supplement with automated questions if less than 5
    const automated = generateAutomatedQuiz(courseTitle, activeModule.title);
    const combined = [...baseQuiz, ...automated].slice(0, 5);
    return combined;
  }, [baseQuiz, courseTitle, activeModule.title]);

  const toggleVideo = (videoTitle: string) => {
    setExpandedVideos((current) => ({
      ...current,
      [videoTitle]: !current[videoTitle],
    }));
  };

  return (
    <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">
          Module {activeModule.id}
        </span>
        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300">
          {activeVideos.length} videos
        </span>
        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300">
          {activeQuiz.length} quiz questions
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-white">
        {activeModule.title}
      </h3>
      <p className="mt-4 text-base leading-8 text-zinc-400">
        {activeModule.description}
      </p>

      <div className="mt-8 rounded-[26px] border border-white/10 bg-white/[0.03] p-5">
        <button
          type="button"
          onClick={() => setLessonsExpanded((current) => !current)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-500">
              What you’ll learn
            </p>
            <p className="mt-2 text-sm text-zinc-300">
              {activeModule.lessons.length} key learning points
            </p>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-zinc-400 transition-transform",
              lessonsExpanded && "rotate-180"
            )}
          />
        </button>

        {lessonsExpanded ? (
          <div className="mt-4 space-y-3">
            {activeModule.lessons.map((lesson) => (
              <div key={lesson} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{lesson}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 space-y-5">
        {activeVideos.map((video) => {
          const embedUrls =
            video.sourceUrls?.map((url) => getEmbedUrl(url)).filter(Boolean) ??
            (video.sourceUrl ? [getEmbedUrl(video.sourceUrl)].filter(Boolean) : []);

          return (
            <div
              key={video.title}
              className="rounded-[26px] border border-amber-300/20 bg-amber-300/10 p-5"
            >
              <button
                type="button"
                onClick={() => toggleVideo(video.title)}
                className="flex w-full items-center justify-between gap-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-amber-200" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{video.title}</h4>
                    <p className="mt-1 text-sm text-zinc-200">{video.duration}</p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-zinc-300 transition-transform",
                    expandedVideos[video.title] && "rotate-180"
                  )}
                />
              </button>

              <p className="mt-4 text-sm leading-7 text-zinc-300">{video.summary}</p>

              {expandedVideos[video.title] ? (
                <>
                  {embedUrls.length ? (
                    <div className="mt-4 space-y-4">
                      {embedUrls.map((embedUrl, index) => (
                        <div
                          key={`${video.title}-${index}`}
                          className="overflow-hidden rounded-2xl border border-white/10 bg-black"
                        >
                          <div className="aspect-video">
                            <iframe
                              src={embedUrl}
                              title={`${video.title} ${index + 1}`}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="strict-origin-when-cross-origin"
                              className="h-full w-full"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-4 rounded-2xl border border-dashed border-white/15 bg-black/20 p-4 text-sm text-zinc-300">
                      Paste the lesson link manually in <code>app/data/academy-mini-course.ts</code> using the <code>sourceUrl</code> field.
                    </div>
                  )}
                </>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-[26px] border border-sky-400/20 bg-sky-400/10 p-5">
        <button
          type="button"
          onClick={() => setQuizExpanded((current) => !current)}
          className="flex w-full items-center justify-between gap-4 text-left"
        >
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-100">
              Module quiz
            </p>
            <p className="mt-2 text-sm text-zinc-200">
              {activeQuiz.length} questions. Complete this to unlock the next module.
            </p>
          </div>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-sky-100 transition-transform",
              quizExpanded && "rotate-180"
            )}
          />
        </button>

        {quizExpanded ? (
          <AcademyModuleQuiz
            assessmentId={`module-${activeModule.id}`}
            questions={activeQuiz}
            description="Answer all 5 questions to unlock the next module."
            onComplete={() => onComplete(activeModule.id, activeModuleIndex)}
          />
        ) : null}
      </div>
    </div>
  );
}

export default function AcademyCoursePlayer({
  course,
}: AcademyCoursePlayerProps) {
  const { user } = useUser();
  const isSpecialUser = user?.primaryEmailAddress?.emailAddress === "sathwikkamath31@gmail.com";

  const [completedModuleIds, setCompletedModuleIds] = useState<string[]>([]);
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [finalExamCompleted, setFinalExamCompleted] = useState(false);
  const [finalExamExpanded, setFinalExamExpanded] = useState(false);

  const [generatedQuestions, setGeneratedQuestions] = useState<AcademyQuizQuestion[]>([]);

  useEffect(() => {
    if (course.modules && course.modules.length > 0) {
      setGeneratedQuestions(generateFinalExam(course));
    }
  }, [course]);

  const unlockedModuleCount = isSpecialUser ? course.modules.length : completedModuleIds.length + 1;
  const allModulesComplete = isSpecialUser || completedModuleIds.length === course.modules.length;

  const activeModule = useMemo(
    () => course.modules[activeModuleIndex],
    [activeModuleIndex, course.modules]
  );

  const handleModuleComplete = (moduleId: string, moduleIndex: number) => {
    setCompletedModuleIds((current) => {
      if (current.includes(moduleId)) {
        return current;
      }

      if (moduleIndex !== current.length) {
        return current;
      }

      return [...current, moduleId];
    });

    if (moduleIndex < course.modules.length - 1) {
      setActiveModuleIndex(moduleIndex + 1);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid gap-8 xl:grid-cols-[0.36fr_0.64fr]">
        <aside className="rounded-[32px] border border-white/10 bg-zinc-950 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
            Course flow
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Complete each module quiz to unlock the next module
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            Learners must finish all module quizzes before the {course.modules.length * 2}-question final exam opens.
          </p>

          <div className="mt-6 space-y-3">
            {course.modules.map((module, index) => {
              const unlocked = index < unlockedModuleCount;
              const completed = completedModuleIds.includes(module.id);
              const active = index === activeModuleIndex;

              return (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => unlocked && setActiveModuleIndex(index)}
                  disabled={!unlocked}
                  className={cn(
                    "w-full rounded-[24px] border p-4 text-left transition",
                    active
                      ? "border-sky-300/60 bg-sky-300/10"
                      : "border-white/10 bg-white/[0.03]",
                    !unlocked && "cursor-not-allowed opacity-60"
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                      Module {module.id}
                    </span>
                    {completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    ) : unlocked ? (
                      <CirclePlay className="h-4 w-4 text-sky-300" />
                    ) : (
                      <Lock className="h-4 w-4 text-zinc-500" />
                    )}
                  </div>
                  <p className="mt-3 text-base font-semibold text-white">{module.title}</p>
                  <p className="mt-2 text-sm text-zinc-400">
                    {completed
                      ? "Quiz completed"
                      : unlocked
                        ? "Ready to start"
                        : "Locked until previous quiz is completed"}
                  </p>
                </button>
              );
            })}
          </div>

          <div
            className={cn(
              "mt-6 rounded-[24px] border p-5",
              allModulesComplete
                ? "border-emerald-300/30 bg-emerald-300/10"
                : "border-white/10 bg-white/[0.03]"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Final exam
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{course.modules.length * 2} questions</p>
              </div>
              {allModulesComplete ? (
                <Trophy className="h-5 w-5 text-amber-300" />
              ) : (
                <Lock className="h-5 w-5 text-zinc-500" />
              )}
            </div>
            <p className="mt-3 text-sm text-zinc-300">
              {allModulesComplete
                ? "All module quizzes are completed. Open the final exam below."
                : "The final exam stays locked until every module quiz is completed."}
            </p>
          </div>
        </aside>

        <div className="space-y-8">
          <ActiveModulePanel
            key={activeModule.id}
            courseTitle={course.title}
            activeModule={activeModule}
            activeModuleIndex={activeModuleIndex}
            onComplete={handleModuleComplete}
          />

          <div
            className={cn(
              "rounded-[32px] border p-8",
              allModulesComplete
                ? "border-emerald-300/25 bg-emerald-300/10"
                : "border-white/10 bg-zinc-950",
              !allModulesComplete && "opacity-50"
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
              {allModulesComplete
                ? "All module quizzes are passed. Open the final exam only when ready."
                : "The final exam unlocks only after you pass every module quiz."}
            </p>

            {allModulesComplete ? (
              <div className="mt-6 rounded-[26px] border border-white/10 bg-black/20 p-5">
                <button
                  type="button"
                  onClick={() => setFinalExamExpanded((current) => !current)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-zinc-400">
                      Final exam
                    </p>
                    <p className="mt-2 text-sm text-zinc-200">
                      Open the full {course.modules.length * 2}-question exam only when ready.
                    </p>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-zinc-300 transition-transform",
                      finalExamExpanded && "rotate-180"
                    )}
                  />
                </button>

                {finalExamExpanded ? (
                  <AcademyModuleQuiz
                    assessmentId="final-exam"
                    questions={generatedQuestions}
                    title="Final exam"
                    description={`Answer all ${generatedQuestions.length} questions to complete the course.`}
                    submitLabel="Submit final exam"
                    onComplete={() => setFinalExamCompleted(true)}
                  />
                ) : null}
              </div>
            ) : null}

            {finalExamCompleted ? (
              <div className="mt-6 rounded-[24px] border border-emerald-300/25 bg-black/20 p-5">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-amber-300" />
                  <p className="text-lg font-semibold text-white">
                    Course completed
                  </p>
                </div>
                <p className="mt-3 text-sm leading-7 text-zinc-300">
                  The learner has completed all module quizzes and the final exam.
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
