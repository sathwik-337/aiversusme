import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";

export default async function RankingsPage() {
  const items = await db.select().from(jobs).orderBy(desc(jobs.risk_score)).limit(50);

  const maxScore = items[0]?.risk_score ?? 100;

  const getBarColor = (score: number) => {
    if (score >= 75) return "bg-red-400";
    if (score >= 50) return "bg-orange-400";
    if (score >= 25) return "bg-yellow-400";
    return "bg-green-400";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 75) return { label: "Critical", color: "text-red-400 bg-red-500/10 border-red-500/30" };
    if (score >= 50) return { label: "High", color: "text-orange-400 bg-orange-500/10 border-orange-500/30" };
    if (score >= 25) return { label: "Medium", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" };
    return { label: "Low", color: "text-green-400 bg-green-500/10 border-green-500/30" };
  };

  return (
    <div className="min-h-screen bg-black text-white pt-[80px] md:pt-[110px] pb-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-bold tracking-widest uppercase mb-3 text-gray-400">
            AI vs Human Analysis
          </p>
          <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight mb-2 text-white">
            JOB AUTOMATION
          </h1>
          <h2 className="text-4xl md:text-6xl font-black leading-none tracking-tight text-white">
            RISK RANKINGS
          </h2>
          <p className="mt-4 text-base text-gray-400">
            Top roles ranked by estimated automation risk score. Click any role for detailed analysis.
          </p>
        </div>

        {/* Column Headers */}
        <div className="hidden md:flex items-center gap-4 mb-4 px-2">
          <div className="w-[180px] md:w-80 shrink-0 flex items-center gap-3">
            <div className="w-6 shrink-0" /> {/* Spacer for rank number */}
            <span className="text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full inline-block bg-white text-black">
              JOBS
            </span>
          </div>
          <div className="flex-1" />
          <div className="shrink-0 w-24 md:w-32 text-right">
            <span className="text-xs font-black tracking-widest uppercase px-4 py-2 rounded-full inline-block bg-white text-black">
              RISK SCORE
            </span>
          </div>
        </div>

        {/* Grid lines + Rows */}
        <div className="relative">
          {/* Vertical grid lines — desktop only */}
          <div className="absolute inset-0 left-80 right-0 pointer-events-none hidden md:block" aria-hidden>
            {[0, 25, 50, 75, 100].map((pct) => (
              <div
                key={pct}
                className="absolute top-0 bottom-0 border-r border-dashed border-white/10"
                style={{ left: `${pct}%` }}
              />
            ))}
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-2">
            {items.map((job, idx) => {
              const widthPct = (job.risk_score / maxScore) * 100;
              const risk = getRiskLabel(job.risk_score);

              return (
                <Link
                  key={job.id}
                  href={`/job/${job.slug}`}
                  className="group flex items-center gap-4 rounded-xl px-2 py-3 md:py-2 transition-all duration-200 hover:bg-white/5 border border-transparent hover:border-white/10"
                >
                  {/* Rank + Job Name */}
                  <div className="w-[180px] md:w-80 shrink-0 flex items-center gap-3">
                    <span className="text-xs font-bold w-6 text-right shrink-0 text-gray-500">
                      #{idx + 1}
                    </span>
                    <div className="flex-1 flex items-center justify-start min-h-[40px] px-4 py-2 rounded-2xl md:rounded-full bg-white/10 text-white">
                      <span
                        className="text-xs md:text-sm font-bold text-left leading-tight md:leading-snug"
                        style={{ wordBreak: "keep-all", overflowWrap: "break-word" }}
                      >
                        {job.title}
                      </span>
                    </div>
                  </div>

                  {/* Bar — desktop only */}
                  <div className="flex-1 relative h-7 hidden md:flex items-center">
                    <div
                      className={`h-full rounded-r-full transition-all duration-500 group-hover:brightness-110 ${getBarColor(job.risk_score)}`}
                      style={{ width: `${widthPct}%`, minWidth: "8px" }}
                    />
                  </div>

                  {/* Score + Badge */}
                  <div className="flex items-center gap-1 md:gap-2 shrink-0 w-24 md:w-32 justify-end">
                    <span className={`hidden md:inline text-[10px] font-bold px-2 py-0.5 rounded-full border ${risk.color}`}>
                      {risk.label}
                    </span>
                    <span className="text-lg font-black tabular-nums text-white">
                      {job.risk_score}%
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-10 hidden md:flex flex-wrap gap-4 items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Risk Level:
          </span>
          {[
            { label: "Low (0–24%)", color: "bg-green-400" },
            { label: "Medium (25–49%)", color: "bg-yellow-400" },
            { label: "High (50–74%)", color: "bg-orange-400" },
            { label: "Critical (75–100%)", color: "bg-red-400" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-xs text-gray-400">{l.label}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
