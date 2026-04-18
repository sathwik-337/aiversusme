"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, LayoutDashboard, User } from "lucide-react";
import OpenCourseButton from "@/components/open-course-button";
import { useAuth } from "@clerk/nextjs";

interface AcademyContentProps {
  allCourses: any[];
}

export default function AcademyContent({ allCourses }: AcademyContentProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-28 md:pb-16 md:pt-32">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl"
        >
          <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1 text-sm font-medium text-emerald-200">
            Course Catalog
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mt-4">
            <h1 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
              E-Learning courses
            </h1>
            
            {isLoaded && isSignedIn && (
              <Link 
                 href="/academy/dashboard" 
                 className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 hover:border-white/20"
               >
                 <User size={18} className="text-emerald-400" />
                 My Dashboard
               </Link>
            )}
          </div>
          <p className="mt-4 max-w-5xl text-base leading-7 text-zinc-300 md:text-lg">
            The AI Versus Me Academy is a forward-thinking learning platform designed to equip individuals with the skills needed to thrive in an AI-driven world. It focuses on bridging the gap between human potential and artificial intelligence by offering practical, future-ready training that emphasizes critical thinking, creativity, and real-world application. Through curated programs, the academy aims to empower students, professionals, and entrepreneurs to not just compete with AI, but to leverage it effectively, transforming them from passive users into confident creators and decision-makers in the evolving digital landscape.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {allCourses.map((course) => (
            <motion.article
              key={course.slug}
              variants={itemAnim}
              className="group overflow-hidden rounded-[26px] border border-white/10 bg-zinc-950 shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
            >
              <div className="relative aspect-[4/2.65] overflow-hidden border-b border-white/10">
                {course.cardImageSrc ? (
                  <Image
                    src={course.cardImageSrc}
                    alt={course.cardImageAlt ?? course.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,197,94,0.18),_transparent_32%),radial-gradient(circle_at_80%_18%,_rgba(59,130,246,0.16),_transparent_28%),linear-gradient(180deg,_rgba(255,255,255,0.04),_transparent_45%)]" />
                )}
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  <span className="rounded-full bg-white/5 px-3 py-1.5">{course.level}</span>
                  <span className="rounded-full bg-white/5 px-3 py-1.5">{course.duration}</span>
                </div>

                <h3 className="mt-4 text-xl font-semibold text-white md:text-2xl">{course.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{course.tagline}</p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-zinc-300">
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                    {course.modules.length} modules
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
                    {course.isCoding ? "Technical/Coding" : "No coding required"}
                  </span>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-400">
                    {(course.price ?? 0) > 0 ? `₹${course.price}` : "FREE"}
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {course.outcomes.slice(0, 3).map((outcome: string) => (
                    <div key={outcome} className="flex items-start gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>

                <OpenCourseButton slug={course.slug} />
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
