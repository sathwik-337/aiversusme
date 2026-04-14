import type { AcademyCourse, AcademyQuizQuestion } from "@/app/data/academy";

export type AcademyQuizScore = {
  score: number;
  total: number;
};

export function generateFinalExam(course: AcademyCourse): AcademyQuizQuestion[] {
  const finalExam: AcademyQuizQuestion[] = [];

  course.modules.forEach((module) => {
    if (module.quiz && module.quiz.length > 0) {
      // Shuffle module quiz questions
      const shuffled = [...module.quiz].sort(() => Math.random() - 0.5);
      // Pick 2 random questions (or fewer if module has less than 2)
      const selected = shuffled.slice(0, 2);
      
      selected.forEach((q, index) => {
        finalExam.push({
          ...q,
          id: `final-${module.id}-${q.id}-${index}`,
        });
      });
    }
  });

  // If the course has a fixed final exam defined and it's longer than what we generated,
  // or if we somehow didn't get enough questions (though for 15 modules we should get 30),
  // we could potentially fallback or merge. 
  // But the user was specific: "2 randomly from each module".
  
  return finalExam;
}

export type AcademyCertificate = {
  certificateNumber: string;
  recipientName: string;
  recipientEmail: string;
  courseTitle: string;
  grade: string;
  percentage: number;
  completedAt: string;
  emailStatus: string;
  emailSentAt: string | null;
};

export type AcademyProgress = {
  enrolled: boolean;
  completedModuleIds: string[];
  quizScores: Record<string, AcademyQuizScore>;
  finalExamScore: AcademyQuizScore | null;
  certificate: AcademyCertificate | null;
};

const ACADEMY_PASS_PERCENTAGE = 60;

const EMPTY_PROGRESS: AcademyProgress = {
  enrolled: false,
  completedModuleIds: [],
  quizScores: {},
  finalExamScore: null,
  certificate: null,
};

const progressCache = new Map<
  string,
  {
    raw: string | null;
    value: AcademyProgress;
  }
>();

function getStorageKey(userId: string, courseSlug: string) {
  return `academy-progress:${userId}:${courseSlug}`;
}

export function getAcademyProgress(
  userId: string | null | undefined,
  courseSlug: string
): AcademyProgress {
  if (typeof window === "undefined" || !userId) {
    return EMPTY_PROGRESS;
  }

  try {
    const storageKey = getStorageKey(userId, courseSlug);
    const raw = window.localStorage.getItem(storageKey);

    const cached = progressCache.get(storageKey);
    if (cached && cached.raw === raw) {
      return cached.value;
    }

    if (!raw) {
      progressCache.set(storageKey, {
        raw: null,
        value: EMPTY_PROGRESS,
      });
      return EMPTY_PROGRESS;
    }

    const parsed = JSON.parse(raw) as Partial<AcademyProgress>;

    const nextValue: AcademyProgress = {
      enrolled: parsed.enrolled === true,
      completedModuleIds: Array.isArray(parsed.completedModuleIds)
        ? parsed.completedModuleIds
        : [],
      quizScores:
        parsed.quizScores && typeof parsed.quizScores === "object"
          ? parsed.quizScores
          : {},
      finalExamScore:
        parsed.finalExamScore &&
        typeof parsed.finalExamScore === "object" &&
        typeof parsed.finalExamScore.score === "number" &&
        typeof parsed.finalExamScore.total === "number"
          ? parsed.finalExamScore
          : null,
      certificate:
        parsed.certificate &&
        typeof parsed.certificate === "object" &&
        typeof parsed.certificate.certificateNumber === "string" &&
        typeof parsed.certificate.recipientName === "string" &&
        typeof parsed.certificate.recipientEmail === "string" &&
        typeof parsed.certificate.courseTitle === "string" &&
        typeof parsed.certificate.grade === "string" &&
        typeof parsed.certificate.percentage === "number" &&
        typeof parsed.certificate.completedAt === "string" &&
        typeof parsed.certificate.emailStatus === "string"
          ? {
              ...parsed.certificate,
              emailSentAt:
                typeof parsed.certificate.emailSentAt === "string"
                  ? parsed.certificate.emailSentAt
                  : null,
            }
          : null,
    };

    progressCache.set(storageKey, {
      raw,
      value: nextValue,
    });

    return nextValue;
  } catch {
    progressCache.set(getStorageKey(userId, courseSlug), {
      raw: null,
      value: EMPTY_PROGRESS,
    });
    return EMPTY_PROGRESS;
  }
}

export function getEmptyAcademyProgress() {
  return EMPTY_PROGRESS;
}

export function getAcademyScorePercentage(score: AcademyQuizScore) {
  if (!score.total) {
    return 0;
  }

  return Math.round((score.score / score.total) * 100);
}

export function hasPassedAcademyAssessment(score: AcademyQuizScore) {
  return getAcademyScorePercentage(score) >= ACADEMY_PASS_PERCENTAGE;
}

export function getAcademyPassPercentage() {
  return ACADEMY_PASS_PERCENTAGE;
}

export function getAcademyLetterGrade(score: AcademyQuizScore) {
  const percentage = getAcademyScorePercentage(score);

  if (percentage >= 90) {
    return "A+";
  }

  if (percentage >= 80) {
    return "A";
  }

  if (percentage >= 70) {
    return "B";
  }

  return "C";
}

export function saveAcademyProgress(
  userId: string | null | undefined,
  courseSlug: string,
  progress: AcademyProgress
) {
  if (typeof window === "undefined" || !userId) {
    return;
  }

  const storageKey = getStorageKey(userId, courseSlug);
  const raw = JSON.stringify(progress);
  progressCache.set(storageKey, {
    raw,
    value: progress,
  });
  window.localStorage.setItem(storageKey, raw);
  window.dispatchEvent(
    new CustomEvent("academy-progress-changed", {
      detail: { courseSlug, userId },
    })
  );
}

export async function hydrateAcademyProgress(
  userId: string | null | undefined,
  courseSlug: string
) {
  if (typeof window === "undefined" || !userId) {
    return EMPTY_PROGRESS;
  }

  const response = await fetch(`/api/academy/progress/${courseSlug}`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  if (!response.ok) {
    return getAcademyProgress(userId, courseSlug);
  }

  const data = (await response.json()) as Partial<AcademyProgress>;
  const next: AcademyProgress = {
    enrolled: data.enrolled === true,
    completedModuleIds: Array.isArray(data.completedModuleIds)
      ? data.completedModuleIds
      : [],
    quizScores:
      data.quizScores && typeof data.quizScores === "object"
        ? data.quizScores
        : {},
    finalExamScore:
      data.finalExamScore &&
      typeof data.finalExamScore === "object" &&
      typeof data.finalExamScore.score === "number" &&
      typeof data.finalExamScore.total === "number"
        ? data.finalExamScore
        : null,
    certificate:
      data.certificate &&
      typeof data.certificate === "object" &&
      typeof data.certificate.certificateNumber === "string" &&
      typeof data.certificate.recipientName === "string" &&
      typeof data.certificate.recipientEmail === "string" &&
      typeof data.certificate.courseTitle === "string" &&
      typeof data.certificate.grade === "string" &&
      typeof data.certificate.percentage === "number" &&
      typeof data.certificate.completedAt === "string" &&
      typeof data.certificate.emailStatus === "string"
        ? {
            ...data.certificate,
            emailSentAt:
              typeof data.certificate.emailSentAt === "string"
                ? data.certificate.emailSentAt
                : null,
          }
        : null,
  };

  saveAcademyProgress(userId, courseSlug, next);
  return next;
}

export async function enrollInAcademyCourse(
  userId: string | null | undefined,
  courseSlug: string
) {
  const current = getAcademyProgress(userId, courseSlug);

  const next: AcademyProgress = {
    ...current,
    enrolled: true,
  };

  saveAcademyProgress(userId, courseSlug, next);
  await fetch(`/api/academy/progress/${courseSlug}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moduleId: "__enrollment__",
      assessmentType: "enrollment",
      score: 0,
      totalQuestions: 0,
      answers: {},
    }),
  });

  return next;
}

export async function completeModuleQuiz(
  userId: string | null | undefined,
  courseSlug: string,
  moduleId: string,
  score: AcademyQuizScore,
  answers: Record<string, string> = {}
) {
  const current = getAcademyProgress(userId, courseSlug);
  const passed = hasPassedAcademyAssessment(score);
  const completedModuleIds = current.completedModuleIds.filter((id) => id !== moduleId);

  const next: AcademyProgress = {
    enrolled: current.enrolled,
    completedModuleIds: passed
      ? [...completedModuleIds, moduleId]
      : completedModuleIds,
    quizScores: {
      ...current.quizScores,
      [moduleId]: score,
    },
    finalExamScore: current.finalExamScore,
    certificate: current.certificate,
  };

  saveAcademyProgress(userId, courseSlug, next);
  await fetch(`/api/academy/progress/${courseSlug}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moduleId,
      assessmentType: "module_quiz",
      score: score.score,
      totalQuestions: score.total,
      answers,
    }),
  });

  return next;
}

export async function completeFinalExam(
  userId: string | null | undefined,
  courseSlug: string,
  score: AcademyQuizScore,
  answers: Record<string, string> = {}
) {
  const current = getAcademyProgress(userId, courseSlug);
  const percentage = getAcademyScorePercentage(score);
  const grade = getAcademyLetterGrade(score);

  const next: AcademyProgress = {
    ...current,
    finalExamScore: score,
  };

  saveAcademyProgress(userId, courseSlug, next);
  const response = await fetch(`/api/academy/progress/${courseSlug}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      moduleId: "final-exam",
      assessmentType: "final_exam",
      score: score.score,
      totalQuestions: score.total,
      answers: {
        ...answers,
        __grade: grade,
        __percentage: String(percentage),
      },
    }),
  });

  if (response.ok) {
    const data = (await response.json()) as Partial<AcademyProgress>;
    const synced: AcademyProgress = {
      enrolled: data.enrolled === true,
      completedModuleIds: Array.isArray(data.completedModuleIds)
        ? data.completedModuleIds
        : next.completedModuleIds,
      quizScores:
        data.quizScores && typeof data.quizScores === "object"
          ? data.quizScores
          : next.quizScores,
      finalExamScore:
        data.finalExamScore &&
        typeof data.finalExamScore === "object" &&
        typeof data.finalExamScore.score === "number" &&
        typeof data.finalExamScore.total === "number"
          ? data.finalExamScore
          : next.finalExamScore,
      certificate:
        data.certificate &&
        typeof data.certificate === "object" &&
        typeof data.certificate.certificateNumber === "string" &&
        typeof data.certificate.recipientName === "string" &&
        typeof data.certificate.recipientEmail === "string" &&
        typeof data.certificate.courseTitle === "string" &&
        typeof data.certificate.grade === "string" &&
        typeof data.certificate.percentage === "number" &&
        typeof data.certificate.completedAt === "string" &&
        typeof data.certificate.emailStatus === "string"
          ? {
              ...data.certificate,
              emailSentAt:
                typeof data.certificate.emailSentAt === "string"
                  ? data.certificate.emailSentAt
                  : null,
            }
          : null,
    };

    saveAcademyProgress(userId, courseSlug, synced);
    return synced;
  }

  return next;
}

export function subscribeAcademyProgress(
  userId: string | null | undefined,
  courseSlug: string,
  callback: () => void
) {
  if (typeof window === "undefined" || !userId) {
    return () => {};
  }

  const onStorage = (event: StorageEvent) => {
    if (event.key === getStorageKey(userId, courseSlug)) {
      callback();
    }
  };

  const onCustom = (event: Event) => {
    const detail = (event as CustomEvent<{ courseSlug?: string; userId?: string }>).detail;
    if (
      (!detail?.courseSlug || detail.courseSlug === courseSlug) &&
      (!detail?.userId || detail.userId === userId)
    ) {
      callback();
    }
  };

  window.addEventListener("storage", onStorage);
  window.addEventListener("academy-progress-changed", onCustom);

  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("academy-progress-changed", onCustom);
  };
}
