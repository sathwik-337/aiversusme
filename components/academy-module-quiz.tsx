"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleHelp, RotateCcw, ChevronRight, ChevronLeft, Trophy, AlertCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AcademyQuizQuestion } from "@/app/data/academy";
import { motion, AnimatePresence } from "framer-motion";

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
  submitLabel = "Complete Quiz",
  onComplete,
}: AcademyModuleQuizProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [shuffleVersion, setShuffleVersion] = useState(0);
  const [direction, setDirection] = useState(0);

  const shuffledQuestions = useMemo(() => {
    return questions.map((question) => ({
        ...question,
        options: shuffleOptions(question.options),
      }));
  }, [questions, shuffleVersion]);

  const totalQuestions = shuffledQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const score = shuffledQuestions.filter(
    (question) => answers[question.id] === question.correctOptionId
  ).length;

  const handleSubmit = () => {
    if (answeredCount === totalQuestions) {
      setSubmitted(true);
      onComplete?.({ score, totalQuestions, answers });
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentQuestionIndex(0);
    setShuffleVersion((current) => current + 1);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  if (submitted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 60;

    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mt-6 rounded-[40px] border border-white/10 bg-zinc-900/50 p-10 text-center backdrop-blur-xl"
      >
        <div className="mx-auto mb-6 h-24 w-24 rounded-[32px] bg-white/5 flex items-center justify-center relative">
          {passed ? (
            <>
              <Trophy className="h-12 w-12 text-amber-400" />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-amber-400/20 blur-2xl rounded-full"
              />
            </>
          ) : (
            <AlertCircle className="h-12 w-12 text-rose-400" />
          )}
        </div>

        <h3 className="text-3xl font-black tracking-tighter mb-2 uppercase">
          {passed ? "Excellent Work!" : "Keep Practicing"}
        </h3>
        <p className="text-zinc-400 font-medium mb-8">
          {passed 
            ? "You've successfully mastered the concepts in this module." 
            : "Review the module notes and try again to unlock the next section."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-10 max-w-sm mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Score</div>
            <div className="text-3xl font-black text-white">{score}/{totalQuestions}</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Grade</div>
            <div className={cn(
              "text-3xl font-black",
              passed ? "text-emerald-400" : "text-rose-400"
            )}>{percentage}%</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition hover:bg-white/10"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retake Quiz
          </button>
          {passed && (
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-emerald-400 shadow-lg shadow-emerald-500/20"
            >
              Continue Learning
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  if (totalQuestions === 0) {
    return (
      <div className="mt-6 rounded-[40px] border border-white/10 bg-zinc-950/50 p-10 text-center">
        <p className="text-zinc-400">No questions available for this assessment.</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-[40px] border border-white/10 bg-zinc-950/50 overflow-hidden shadow-2xl">
      {/* Quiz Header & Progress */}
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
              <CircleHelp size={20} />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
                {title}
              </h4>
              <div className="text-sm font-bold text-white mt-0.5">Question {currentQuestionIndex + 1} of {totalQuestions}</div>
            </div>
          </div>
          <div className="hidden sm:block">
             <div className="flex items-center gap-2">
                <div className="h-1.5 w-32 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
                    className="h-full bg-sky-500"
                  />
                </div>
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter">
                   {Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}%
                </span>
             </div>
          </div>
        </div>
      </div>

      {/* Question Area */}
      <div className="relative px-8 pb-8 overflow-hidden min-h-[400px]">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestionIndex}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: dir > 0 ? -50 : 50, opacity: 0 })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="space-y-8"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
              {currentQuestion.question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {currentQuestion.options.map((option) => {
                const selected = answers[currentQuestion.id] === option.id;
                return (
                  <button
                    key={option.id}
                    onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: option.id }))}
                    className={cn(
                      "group flex items-start gap-4 rounded-[24px] border p-5 text-left transition-all duration-300",
                      selected
                        ? "border-sky-500 bg-sky-500/10 shadow-lg shadow-sky-500/10"
                        : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                    )}
                  >
                    <div className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-black transition-colors",
                      selected ? "border-sky-500 bg-sky-500 text-black" : "border-white/10 text-zinc-500 group-hover:border-white/30"
                    )}>
                      {option.id.toUpperCase()}
                    </div>
                    <span className={cn(
                      "text-sm font-medium transition-colors leading-relaxed",
                      selected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                    )}>{option.text}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-white/5 bg-black/40 p-6 flex items-center justify-between">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors disabled:opacity-0"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        <div className="flex gap-4">
          {isLastQuestion ? (
            <button
              onClick={handleSubmit}
              disabled={answeredCount !== totalQuestions}
              className="flex items-center gap-2 rounded-2xl bg-emerald-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-emerald-400 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            >
              {submitLabel}
              <Sparkles size={16} />
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              disabled={!answers[currentQuestion.id]}
              className="flex items-center gap-2 rounded-2xl bg-white px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition hover:bg-zinc-200 disabled:opacity-40"
            >
              Next Question
              <ChevronRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
