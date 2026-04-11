"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcademyQuizQuestion } from "@/app/data/academy";

type AcademyModuleQuizProps = {
  assessmentId: string;
  questions: AcademyQuizQuestion[];
  title?: string;
  description?: string;
  submitLabel?: string;
  onComplete?: (result: {
    score: number;
    totalQuestions: number;
    answers: Record<string, string>;
  }) => void;
};

function shuffleOptions<T>(items: T[]) {
  const next = [...items];

  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = next[index];
    next[index] = next[swapIndex];
    next[swapIndex] = current;
  }

  return next;
}

export default function AcademyModuleQuiz({
  assessmentId,
  questions,
  title = "Module quiz",
  description = "Check understanding before moving to the next section.",
  submitLabel = "Check answers",
  onComplete,
}: AcademyModuleQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [shuffleVersion, setShuffleVersion] = useState(0);

  const shuffledQuestions = useMemo(() => {
    const currentShuffleVersion = shuffleVersion;
    void currentShuffleVersion;

    return questions.map((question) => ({
        ...question,
        options: shuffleOptions(question.options),
      }));
  }, [questions, shuffleVersion]);

  const totalQuestions = shuffledQuestions.length;
  const answeredCount = shuffledQuestions.filter((question) => answers[question.id]).length;
  const score = shuffledQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId
  ).length;

  const handleSubmit = () => {
    if (answeredCount === totalQuestions) {
      const nextScore = shuffledQuestions.filter(
        (question) => answers[question.id] === question.correctOptionId
      ).length;
      setSubmitted(true);
      onComplete?.({ score: nextScore, totalQuestions, answers });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShuffleVersion((current) => current + 1);
  };

  return (
    <div className="mt-6 rounded-[26px] border border-sky-400/20 bg-sky-400/10 p-5">
      <div className="flex items-center gap-3">
        <CircleHelp className="h-5 w-5 text-sky-200" />
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-100">
            {title}
          </h4>
          <p className="mt-1 text-sm text-zinc-200">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-5">
        {shuffledQuestions.map((question, questionIndex) => (
          <div
            key={question.id}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <p className="text-sm font-medium text-white">
              {questionIndex + 1}. {question.question}
            </p>

            <div className="mt-4 space-y-3">
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                const isCorrect = option.id === question.correctOptionId;
                const showCorrect = submitted && isCorrect;
                const showIncorrect = submitted && selected && !isCorrect;

                return (
                  <label
                    key={option.id}
                    htmlFor={`${assessmentId}-${question.id}-${option.id}`}
                    className={cn(
                      "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                      selected
                        ? "border-sky-300/60 bg-sky-300/10 text-white"
                        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:border-white/20",
                      showCorrect && "border-emerald-300/60 bg-emerald-300/10",
                      showIncorrect && "border-rose-300/60 bg-rose-300/10"
                    )}
                  >
                    <input
                      id={`${assessmentId}-${question.id}-${option.id}`}
                      type="radio"
                      name={`${assessmentId}-${question.id}`}
                      value={option.id}
                      checked={selected}
                      onChange={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: option.id,
                        }))
                      }
                      className="mt-1"
                    />
                    <span>{option.text}</span>
                  </label>
                );
              })}
            </div>

            {submitted ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-200">
                <div className="flex items-center gap-2 font-medium text-white">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  {answers[question.id] === question.correctOptionId
                    ? "Correct"
                    : "Review this concept"}
                </div>
                <p className="mt-2 leading-7 text-zinc-300">{question.explanation}</p>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {submitted ? (
          <p className="text-sm font-medium text-white">
            Score: {score}/{totalQuestions}
          </p>
        ) : (
          <p className="text-sm text-zinc-200">
            {answeredCount}/{totalQuestions} answered
          </p>
        )}

        <div className="flex gap-3">
          {submitted ? (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Retry
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={answeredCount !== totalQuestions}
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition disabled:cursor-not-allowed disabled:bg-white/40"
            >
              {submitLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
