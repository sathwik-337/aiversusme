"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Lock, Mail, Trophy } from "lucide-react";
import type { AcademyCourse } from "@/app/data/academy";
import AcademyModuleQuiz from "@/components/academy-module-quiz";
import {
  completeFinalExam,
  getAcademyLetterGrade,
  getAcademyProgress,
  getAcademyScorePercentage,
  getEmptyAcademyProgress,
  hydrateAcademyProgress,
  subscribeAcademyProgress,
} from "@/lib/academy-progress";

type AcademyFinalExamRouteProps = {
  course: AcademyCourse;
};

export default function AcademyFinalExamRoute({
  course,
}: AcademyFinalExamRouteProps) {
  const { isLoaded, userId } = useAuth();
  const [isPngToPdfExporting, setIsPngToPdfExporting] = useState(false);
  const [isEmailing, setIsEmailing] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const progress = useSyncExternalStore(
    (callback) => subscribeAcademyProgress(userId, course.slug, callback),
    () => getAcademyProgress(userId, course.slug),
    getEmptyAcademyProgress
  );
  const [localResult, setLocalResult] = useState<{
    score: number;
    total: number;
  } | null>(null);
  const finalExamResult = localResult ?? progress.finalExamScore ?? null;
  const finalExamPercentage = finalExamResult
    ? getAcademyScorePercentage(finalExamResult)
    : null;
  const finalExamGrade = finalExamResult
    ? getAcademyLetterGrade(finalExamResult)
    : null;
  const certificate = progress.certificate;
  const isEnrolled = progress.enrolled;
  const allModulesComplete =
    progress.completedModuleIds.length === course.modules.length;

  useEffect(() => {
    if (!isLoaded || !userId) {
      return;
    }

    void hydrateAcademyProgress(userId, course.slug);
  }, [course.slug, isLoaded, userId]);

  const generateCertificatePdf = async () => {
    const svgResponse = await fetch(
      `/api/academy/certificate/${course.slug}?format=svg`,
      { credentials: "include" }
    );
    const svgText = await svgResponse.text();
    const vb = /viewBox="([^"]+)"/.exec(svgText)?.[1];
    let w = 419.25;
    let h = 297.75;
    if (vb) {
      const p = vb.split(/\s+/).map((v) => Number(v));
      if (p.length === 4 && Number.isFinite(p[2]) && Number.isFinite(p[3])) {
        w = p[2];
        h = p[3];
      }
    }
    const scale = 4;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const blob = new Blob([svgText], {
      type: "image/svg+xml;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("svg-render-failed"));
      img.src = url;
    });
    ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(url);
    const pngBlob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b as Blob), "image/png")
    );
    const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
    const loadPDFLib = async (): Promise<any> => {
      const g = window as any;
      if (g.PDFLib) return g.PDFLib;
      await new Promise<void>((resolve, reject) => {
        const s = document.createElement("script");
        s.src =
          "https://cdn.jsdelivr.net/npm/pdf-lib@1.17.1/dist/pdf-lib.min.js";
        s.async = true;
        s.onload = () => resolve();
        s.onerror = () => reject(new Error("pdf-lib-load-failed"));
        document.head.appendChild(s);
      });
      return (window as any).PDFLib;
    };
    const PDFLib = await loadPDFLib();
    const pdfDoc = await PDFLib.PDFDocument.create();
    const page = pdfDoc.addPage([841.89, 595.28]);
    const pngImage = await pdfDoc.embedPng(pngBytes);
    const imgW = pngImage.width;
    const imgH = pngImage.height;
    const maxW = 841.89;
    const maxH = 595.28;
    const fit = Math.min(maxW / imgW, maxH / imgH);
    const drawW = imgW * fit;
    const drawH = imgH * fit;
    const x = (maxW - drawW) / 2;
    const y = (maxH - drawH) / 2;
    page.drawImage(pngImage, { x, y, width: drawW, height: drawH });
    return await pdfDoc.save();
  };

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
            You need to enroll in this course before the final exam unlocks.
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

  if (!allModulesComplete) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <div className="flex items-center gap-3">
            <Lock className="h-5 w-5 text-amber-300" />
            <h1 className="text-2xl font-semibold">Final exam locked</h1>
          </div>
          <p className="mt-4 text-sm leading-7 text-zinc-300">
            Complete every module quiz first. The final exam unlocks only after
            all modules are finished.
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
          href={`/academy/${course.slug}`}
          className="inline-flex items-center text-sm font-medium text-zinc-300 transition hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to course
        </Link>

        <div className="mt-6 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Final exam
            </p>
            <h1 className="mt-3 text-3xl font-semibold">10-question course exam</h1>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Answer all questions to complete the course. Your score is saved
              to your account.
            </p>
          </div>
          <Trophy className="h-6 w-6 text-amber-300" />
        </div>

        {finalExamResult ? (
          <div className="mt-6 rounded-[24px] border border-emerald-300/25 bg-emerald-300/10 p-5">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-300" />
              <p className="text-lg font-semibold text-white">
                Course completed successfully
              </p>
            </div>
            <p className="mt-3 text-sm text-zinc-200">
              Final score: {finalExamResult.score}/{finalExamResult.total} (
              {finalExamPercentage}%)
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              Grade: {finalExamGrade}
            </p>
            {certificate ? (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-200">
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    disabled={isPngToPdfExporting}
                    onClick={async () => {
                      try {
                        setIsPngToPdfExporting(true);
                        const pdfBytes = await generateCertificatePdf();
                        const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
                        const pdfUrl = URL.createObjectURL(pdfBlob);
                        const a = document.createElement("a");
                        a.href = pdfUrl;
                        a.download = `${certificate?.certificateNumber ?? "certificate"}.pdf`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                        URL.revokeObjectURL(pdfUrl);
                      } catch (error) {
                        console.error("Failed to download certificate:", error);
                      } finally {
                        setIsPngToPdfExporting(false);
                      }
                    }}
                    className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isPngToPdfExporting ? "Preparing..." : "Download certificate (PDF)"}
                  </button>

                  <button
                    type="button"
                    disabled={isEmailing || emailStatus === "sent"}
                    onClick={async () => {
                      try {
                        setIsEmailing(true);
                        setEmailStatus("sending");
                        const pdfBytes = await generateCertificatePdf();
                        
                        // Convert Uint8Array to base64 safely
                        let binary = "";
                        const bytes = new Uint8Array(pdfBytes);
                        const len = bytes.byteLength;
                        for (let i = 0; i < len; i++) {
                          binary += String.fromCharCode(bytes[i]);
                        }
                        const base64 = window.btoa(binary);

                        const response = await fetch(`/api/academy/certificate/${course.slug}`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ pdfBase64: base64 }),
                        });

                        if (!response.ok) throw new Error("Failed to send email");
                        setEmailStatus("sent");
                      } catch (error) {
                        console.error("Failed to email certificate:", error);
                        setEmailStatus("failed");
                      } finally {
                        setIsEmailing(false);
                      }
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Mail className="h-4 w-4" />
                    {emailStatus === "sending" ? "Sending..." : 
                     emailStatus === "sent" ? "Email sent!" : 
                     emailStatus === "failed" ? "Try again" : "Email certificate"}
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        <AcademyModuleQuiz
          assessmentId="final-exam-route"
          questions={course.finalExam ?? []}
          title="Final exam"
          description="Submit the final exam to finish the course."
          submitLabel="Submit final exam"
          onComplete={({ score, totalQuestions, answers }) => {
            const nextScore = {
              score,
              total: totalQuestions,
            };
            setLocalResult(nextScore);
            void completeFinalExam(
              userId,
              course.slug,
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
            href={`/academy/${course.slug}`}
            className="inline-flex rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Return to course
          </Link>
        </div>
      </div>
    </section>
  );
}
