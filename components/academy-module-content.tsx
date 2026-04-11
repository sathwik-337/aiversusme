"use client";

import { useState } from "react";
import { ChevronDown, CheckCircle2, Video } from "lucide-react";
import type { AcademyCourse } from "@/app/data/academy";
import { cn } from "@/lib/utils";

type AcademyModuleContentProps = {
  module: AcademyCourse["modules"][number];
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
      const videoId = url.searchParams.get("v");
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : sourceUrl;
    }

    return sourceUrl;
  } catch {
    return sourceUrl;
  }
}

export default function AcademyModuleContent({
  module,
}: AcademyModuleContentProps) {
  const [lessonsExpanded, setLessonsExpanded] = useState(false);
  const [expandedVideos, setExpandedVideos] = useState<Record<string, boolean>>({});

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
          Module {module.id}
        </span>
        <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-zinc-300">
          {(module.videos ?? []).length} videos
        </span>
      </div>

      <h3 className="mt-5 text-3xl font-semibold text-white">{module.title}</h3>
      <p className="mt-4 text-base leading-8 text-zinc-400">{module.description}</p>

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
              {module.lessons.length} key learning points
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
            {module.lessons.map((lesson) => (
              <div key={lesson} className="flex items-start gap-3 text-sm text-zinc-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                <span>{lesson}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-8 space-y-5">
        {(module.videos ?? []).map((video) => {
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
                embedUrls.length ? (
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
                )
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
