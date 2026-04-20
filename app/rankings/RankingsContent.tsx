"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  slug: string;
  risk_score: number;
}

interface RankingsContentProps {
  items: Job[];
  maxScore: number;
}

export default function RankingsContent() {
  const highRiskJobs = [
    { title: "Data Entry Operators", score: 95 },
    { title: "Telecallers / Customer Support Executives", score: 95 },
    { title: "Bookkeeping Clerks", score: 90 },
    { title: "Basic Content Writers (SEO articles, generic blogs)", score: 90 },
    { title: "Transcriptionists", score: 95 },
    { title: "Retail Cashiers", score: 90 },
    { title: "Travel Agents (basic booking roles)", score: 90 },
    { title: "Proofreaders (basic grammar checking)", score: 85 },
    { title: "Bank Clerks (routine processing roles)", score: 85 },
    { title: "Paralegals (document review heavy roles)", score: 85 },
  ];

  const mediumRiskJobs = [
    { title: "Software Developers", score: 60 },
    { title: "Teachers (school level)", score: 60 },
    { title: "Journalists", score: 70 },
    { title: "Graphic Designers", score: 65 },
    { title: "Accountants", score: 65 },
    { title: "Doctors (diagnostics side)", score: 60 },
    { title: "Lawyers (research + drafting roles)", score: 70 },
    { title: "HR Professionals", score: 65 },
    { title: "Marketing Executives", score: 70 },
    { title: "Financial Analysts", score: 65 },
  ];

  const lowRiskJobs = [
    { title: "Surgeons", score: 25 },
    { title: "Psychologists / Therapists", score: 30 },
    { title: "Teachers (higher education, mentoring roles)", score: 40 },
    { title: "Entrepreneurs", score: 30 },
    { title: "Police Officers / Investigators", score: 40 },
    { title: "Skilled Trades (electricians, plumbers)", score: 30 },
    { title: "Creative Directors", score: 40 },
    { title: "Politicians / Leaders", score: 25 },
    { title: "Event Managers", score: 40 },
    { title: "Social Workers", score: 35 },
  ];

  const getBarColor = (score: number) => {
    if (score >= 70) return "bg-red-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getRiskLabel = (score: number) => {
    if (score >= 70) return { label: "High Risk", color: "text-red-400 bg-red-500/10 border-red-500/30" };
    if (score >= 40) return { label: "Medium Risk", color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/30" };
    return { label: "Low Risk", color: "text-green-400 bg-green-500/10 border-green-500/30" };
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  const renderSection = (title: string, description: string, pattern: string, jobs: { title: string, score: number }[]) => (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-black text-white flex items-center gap-3">
          <span className={`w-2 h-8 rounded-full ${getBarColor(jobs[0].score)}`} />
          {title}
        </h2>
        <p className="text-gray-400 text-sm mt-2 font-medium italic">
          {description}
        </p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col gap-3"
      >
        {jobs.map((job, idx) => {
          const risk = getRiskLabel(job.score);
          return (
            <motion.div key={job.title} variants={itemAnim}>
              <div className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition-all duration-200 bg-white/5 border border-white/5 hover:border-white/20">
                <div className="w-48 md:w-80 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold w-4 text-gray-600">#{idx + 1}</span>
                    <span className="text-sm font-bold text-white leading-tight">{job.title}</span>
                  </div>
                </div>

                <div className="flex-1 relative h-2 bg-white/5 rounded-full overflow-hidden hidden md:block">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${job.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                    className={`absolute inset-y-0 left-0 rounded-full ${getBarColor(job.score)}`}
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0 w-24 md:w-32 justify-end">
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${risk.color}`}>
                    {job.score}%
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
        <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          PATTERN: {pattern}
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-center"
      >
        <p className="text-xs font-black tracking-[0.2em] uppercase mb-4 text-blue-500">
          Global Risk Index 2026
        </p>
        <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tighter text-white mb-6">
          JOB<br/>RANKINGS
        </h1>
        <div className="h-1 w-20 bg-white mx-auto mb-6" />
        <p className="max-w-xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed">
          The definitive guide to AI's impact across industries. Ranked by routine density, 
          creativity requirements, and human interaction necessity.
        </p>
      </motion.div>

      {renderSection(
        "HIGH RISK JOBS", 
        "These jobs are routine, repetitive, rule-based, or predictable. Takeover probability: 70% – 95%.",
        "If the job = rules + repetition + low creativity → high risk",
        highRiskJobs
      )}

      {renderSection(
        "MEDIUM RISK JOBS", 
        "Roles where AI becomes a co-pilot, enhancing productivity rather than full replacement. Takeover probability: 40% – 70%.",
        "AI becomes a co-pilot, not a replacement",
        mediumRiskJobs
      )}

      {renderSection(
        "LOW RISK JOBS", 
        "Roles requiring deep human interaction, creativity, physical presence, ethics, or leadership. Takeover probability: 10% – 40%.",
        "High human interaction + creativity + leadership = Low Risk",
        lowRiskJobs
      )}
    </div>
  );
}
