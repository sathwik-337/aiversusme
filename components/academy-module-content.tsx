"use client";

import { CheckCircle2, Video, FileText, Download, CircleHelp, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { AcademyCourse, AcademyVideo } from "@/app/data/academy";
import { cn } from "@/lib/utils";

type AcademyModuleContentProps = {
  module: AcademyCourse["modules"][number];
  courseSlug: string;
};

function getEmbedUrl(video: AcademyVideo) {
  if (video.videoEmbedUrl) return video.videoEmbedUrl;
  if (!video.sourceUrl) return "";

  try {
    const url = new URL(video.sourceUrl);

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace("/", "");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : video.sourceUrl;
    }

    if (url.hostname.includes("youtube.com")) {
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : video.sourceUrl;
    }

    return video.sourceUrl;
  } catch {
    return video.sourceUrl;
  }
}

export default function AcademyModuleContent({
  module,
  courseSlug,
}: AcademyModuleContentProps) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-300">
          Module {module.id}
        </span>
        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300">
          {(module.videos ?? []).length} videos
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-white">{module.title}</h3>
      <p className="mt-4 text-base leading-8 text-zinc-400">{module.description}</p>

      <div className="mt-8 rounded-[32px] border border-white/10 bg-white/[0.02] p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500">
              Learning Objectives
            </p>
            <h4 className="text-xl font-bold text-white mt-1">What you&apos;ll master</h4>
          </div>
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {module.lessons.map((lesson, index) => (
            <div 
              key={lesson} 
              className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
            >
              <span className="text-xs font-black text-emerald-500/40 group-hover:text-emerald-500 transition-colors">
                {(index + 1).toString().padStart(2, '0')}
              </span>
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors leading-relaxed">
                {lesson}
              </span>
            </div>
          ))}
        </div>
      </div>

      {(module.notes || module.notesDownloadUrl) ? (
        <div className="mt-8 rounded-[26px] border border-emerald-300/20 bg-emerald-300/10 p-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-emerald-300" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-emerald-200">
                  Module Notes
                </p>
                <p className="mt-1 text-sm text-zinc-300">Review the key concepts from this module.</p>
              </div>
            </div>
            {module.notesDownloadUrl && (
              <a
                href={module.notesDownloadUrl.endsWith(".pdf") ? module.notesDownloadUrl : `/api/academy/notes/${courseSlug}/${module.id}`}
                download={module.notesDownloadUrl.split("/").pop()}
                className="flex items-center gap-2 rounded-full bg-emerald-300/20 px-4 py-2 text-sm font-medium text-emerald-200 transition hover:bg-emerald-300/30"
              >
                <Download className="h-4 w-4" />
                {module.notesDownloadUrl.endsWith(".pdf") ? "Download PDF" : "Download Notes"}
              </a>
            )}
          </div>
          {module.notes && (
            <div className="mt-4 text-sm leading-7 text-zinc-300">
              {module.notes}
            </div>
          )}
        </div>
      ) : null}

      <div className="mt-8 rounded-[32px] border border-sky-400/20 bg-sky-400/5 p-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
           <CircleHelp size={80} className="text-sky-400" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400 border border-sky-500/20">
              <CircleHelp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-sky-300">
                Ready to test?
              </p>
              <h4 className="text-xl font-bold text-white mt-1">Module Knowledge Check</h4>
            </div>
          </div>
          <Link
            href={`/academy/${courseSlug}/module/${module.id}/quiz`}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 text-sm font-black uppercase tracking-widest text-black transition hover:bg-sky-400 hover:text-white shadow-xl shadow-white/5"
          >
            Start Quiz
            <ChevronRight size={18} />
          </Link>
        </div>
      </div>

      <div className="mt-8 space-y-5">
        {(module.videos ?? []).map((video) => {
          const embedUrls =
            video.sourceUrls?.map((url) => getEmbedUrl({ ...video, sourceUrl: url, videoEmbedUrl: undefined })).filter(Boolean) ??
            [getEmbedUrl(video)].filter(Boolean);

          return (
            <div
              key={video.title}
              className="rounded-[26px] border border-amber-300/20 bg-amber-300/10 p-5"
            >
              <div className="flex w-full items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <Video className="h-5 w-5 text-amber-200" />
                  <div>
                    <h4 className="text-lg font-semibold text-white">{video.title}</h4>
                    <p className="mt-1 text-sm text-zinc-200">{video.duration}</p>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-zinc-300">{video.summary}</p>

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
                  Paste the lesson iframe URL or link manually in <code>app/data/academy-mini-course.ts</code> using the <code>videoEmbedUrl</code> or <code>sourceUrl</code> field.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
