"use client";

import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, CirclePlay, Lock, Trophy, Minimize2, Maximize2, CreditCard, Loader2, ChevronRight } from "lucide-react";
import type { AcademyCourse } from "@/app/data/academy";
import AcademyModuleContent from "@/components/academy-module-content";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

declare global {
  interface Window {
    Razorpay: any;
  }
}
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
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercentage: number } | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [userCredits, setUserCredits] = useState<number>(0);

  useEffect(() => {
    async function fetchUserCredits() {
      if (!userId) return;
      try {
        const res = await fetch("/api/academy/student/dashboard");
        if (res.ok) {
          const data = await res.json();
          setUserCredits(data.user.credits);
        }
      } catch (err) {
        console.error("Error fetching credits:", err);
      }
    }
    if (isLoaded && userId) {
      fetchUserCredits();
    }
  }, [isLoaded, userId]);

  const progress = useSyncExternalStore(
    (callback) => subscribeAcademyProgress(userId, course.slug, callback),
    () => getAcademyProgress(userId, course.slug),
    getEmptyAcademyProgress
  );

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    try {
      setIsValidatingCoupon(true);
      const res = await fetch("/api/academy/payment/coupon/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim(), courseSlug: course.slug }),
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || "Invalid coupon code");
        return;
      }

      const data = await res.json();
      setAppliedCoupon(data);
      toast.success(`Coupon applied! ${data.discountPercentage}% discount`);
    } catch (err) {
      toast.error("Failed to validate coupon");
    } finally {
      setIsValidatingCoupon(false);
    }
  };

  const handlePayment = async (useCredits: boolean = false) => {
    try {
      setIsProcessingPayment(true);
      
      // 1. Create order on server
      const orderRes = await fetch("/api/academy/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          courseSlug: course.slug,
          couponCode: appliedCoupon?.code,
          useCredits: useCredits
        }),
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        throw new Error(errData.error || "Failed to create payment order");
      }

      const orderData = await orderRes.json();

      if (orderData.free) {
        toast.success(useCredits ? "Enrolled using 1 credit!" : "Enrollment successful!");
        await enrollInAcademyCourse(userId, course.slug);
        void hydrateAcademyProgress(userId, course.slug);
        return;
      }

      // 2. Open Razorpay checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "AI Versus Me Academy",
        description: `Enrollment for ${course.title}`,
        order_id: orderData.id,
        handler: async function (response: any) {
          try {
            // 3. Verify payment on server
            const verifyRes = await fetch("/api/academy/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                course_slug: course.slug,
              }),
            });

            if (verifyRes.ok) {
              toast.success("Payment successful! Enrolling you now...");
              await enrollInAcademyCourse(userId, course.slug);
              void hydrateAcademyProgress(userId, course.slug);
            } else {
              toast.error("Payment verification failed. Please contact support.");
            }
          } catch (err) {
            console.error("Verification error:", err);
            toast.error("An error occurred during verification.");
          }
        },
        prefill: {
          name: user?.fullName || "",
          email: user?.primaryEmailAddress?.emailAddress || "",
        },
        theme: {
          color: "#10b981",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      toast.error("Failed to start payment process. Please try again.");
    } finally {
      setIsProcessingPayment(false);
    }
  };
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
    <section className="mx-auto max-w-7xl px-6 pb-12 pt-8" id="course-outline">
      <div className="grid gap-8 xl:grid-cols-[0.36fr_0.64fr] xl:items-start">
        <aside className="rounded-[32px] border border-white/10 bg-zinc-950 p-6 self-start xl:sticky xl:top-36">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-zinc-500">
              {isEnrolled ? "Learning Path" : "Enrollment"}
            </p>
            {isEnrolled && (
              <div className="flex items-center gap-2">
                <div className="h-1 w-20 rounded-full bg-white/5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(progress.completedModuleIds.length / course.modules.length) * 100}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
                <span className="text-[10px] font-black text-zinc-500">
                  {Math.round((progress.completedModuleIds.length / course.modules.length) * 100)}%
                </span>
              </div>
            )}
          </div>
          <h2 className="mt-4 text-xl font-black tracking-tight text-white uppercase">
            {isEnrolled
              ? "Course Modules"
              : "Unlock Your Potential"}
          </h2>
          <p className="mt-3 text-sm leading-7 text-zinc-400">
            {isEnrolled
              ? `Each next module stays locked until the current module quiz is passed with at least ${requiredPercentage}%.`
              : "Until you enroll, the module player, quizzes, and final exam stay locked."}
          </p>

          {!isEnrolled ? (
            <div className="mt-8 space-y-4">
              {course.price && course.price > 0 && !appliedCoupon && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon code"
                    className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white focus:border-emerald-500/50 focus:outline-none"
                  />
                  <button
                    onClick={() => void handleApplyCoupon()}
                    disabled={isValidatingCoupon || !couponCode.trim()}
                    className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/30 disabled:opacity-50"
                  >
                    {isValidatingCoupon ? "..." : "Apply"}
                  </button>
                </div>
              )}

              {appliedCoupon && (
                <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-4 py-2 text-sm text-emerald-400">
                  <span>
                    Coupon <strong>{appliedCoupon.code}</strong> applied!
                  </span>
                  <button
                    onClick={() => {
                      setAppliedCoupon(null);
                      setCouponCode("");
                    }}
                    className="text-emerald-400/70 hover:text-emerald-400"
                  >
                    Remove
                  </button>
                </div>
              )}

              {userCredits > 0 && (
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => void handlePayment(true)}
                  className="inline-flex w-full items-center justify-center rounded-full bg-emerald-500/20 px-5 py-3 text-sm font-semibold text-emerald-400 transition hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed border border-emerald-500/30"
                >
                  {isProcessingPayment ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Enroll with 1 Credit ({userCredits} available)
                    </>
                  )}
                </button>
              )}

              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={() => {
                  if (course.price && course.price > 0 && !appliedCoupon) {
                    void handlePayment();
                  } else if (course.price && course.price > 0 && appliedCoupon) {
                    void handlePayment();
                  } else {
                    void enrollInAcademyCourse(userId, course.slug);
                  }
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : course.price && course.price > 0 ? (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    {appliedCoupon
                      ? `Enroll for ₹${Math.max(0, course.price * (1 - appliedCoupon.discountPercentage / 100))}`
                      : `Enroll for ₹${course.price}`}
                  </>
                ) : (
                  "Enroll for free"
                )}
              </button>
            </div>
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
                      "group rounded-[24px] border p-4 transition-all duration-300 hover:border-white/20",
                      activeModule.id === module.id
                        ? "border-sky-300/60 bg-sky-300/10 ring-1 ring-sky-300/20"
                        : "border-white/10 bg-white/[0.03]",
                      !unlocked && "opacity-60 grayscale"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={unlocked ? `/academy/${course.slug}?module=${module.id}` : "#"}
                        className={cn("flex-grow block group-hover:translate-x-1 transition-transform", !unlocked && "pointer-events-none")}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.22em]",
                            activeModule.id === module.id ? "text-sky-300" : "text-zinc-500"
                          )}>
                            Module {module.id}
                          </span>
                          <div className="flex items-center gap-2">
                            {completed ? (
                              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20">
                                <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-tighter">Done</span>
                              </div>
                            ) : unlocked ? (
                              <div className="flex items-center gap-1.5 rounded-full bg-sky-500/10 px-2 py-0.5 border border-sky-500/20">
                                <CirclePlay className="h-3 w-3 text-sky-400" />
                                <span className="text-[9px] font-black text-sky-400 uppercase tracking-tighter">Start</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 rounded-full bg-zinc-500/10 px-2 py-0.5 border border-zinc-500/20">
                                <Lock className="h-3 w-3 text-zinc-500" />
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-tighter">Locked</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <p className={cn(
                          "mt-2 text-sm font-bold transition-colors",
                          activeModule.id === module.id ? "text-white" : "text-zinc-300 group-hover:text-white"
                        )}>{module.title}</p>
                      </Link>
                      
                      <button 
                        onClick={(e) => toggleMinimize(module.id, e)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors self-start"
                        title={isMinimized ? "Show details" : "Hide details"}
                      >
                        {isMinimized ? (
                          <Maximize2 className="h-3.5 w-3.5 text-zinc-500" />
                        ) : (
                          <Minimize2 className="h-3.5 w-3.5 text-zinc-500" />
                        )}
                      </button>
                    </div>

                    {!isMinimized && (
                      <div className="mt-4 rounded-2xl border border-white/5 bg-black/40 p-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                            Assessment
                          </p>
                          {score && (
                            <span className={cn(
                              "text-[10px] font-black px-2 py-0.5 rounded border",
                              passed ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            )}>
                              {percentage}%
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {score
                            ? passed
                              ? "Excellent! You've mastered this module."
                              : `Score: ${score.score}/${score.total}. Retake to unlock the next module.`
                            : "Complete the quiz to verify your knowledge."}
                        </p>
                        {unlocked ? (
                          <Link
                            href={`/academy/${course.slug}/module/${module.id}/quiz`}
                            className={cn(
                              "mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest transition-all",
                              passed 
                                ? "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10 hover:text-white"
                                : "bg-sky-500 text-white shadow-lg shadow-sky-500/20 hover:bg-sky-400"
                            )}
                          >
                            {score ? "Retake Quiz" : "Start Quiz"}
                            <ChevronRight size={14} />
                          </Link>
                        ) : (
                          <div className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold uppercase tracking-widest bg-white/5 text-zinc-600 border border-white/5">
                            <Lock size={14} />
                            Locked
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
