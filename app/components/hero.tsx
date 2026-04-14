"use client";

import { FaRobot } from "react-icons/fa";
import SearchAutocomplete from "@/components/search-autocomplete";
import TrendingJobs from "@/app/components/trending-jobs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const trendingJobs = [
  "Computer Programmers",
  "Lawyers",
  "Web Developers",
  "Accountants",
  "Electrical Engineers",
  "Graphic Designers",
  "Actors",
  "Mechanical Engineers",
  "Electricians",
];

const exploreLinks = [
  "Marketing",
  "Healthcare",
  "Finance",
  "Construction",
  "Technology",
  "Education",
];

export default function LandingHero() {
  const router = useRouter();

  const handleExploreClick = async (item: string) => {
    try {
      const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(item)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      const match = data?.[0];
      if (match?.slug) {
        router.push(`/job/${match.slug}`);
      }
    } catch (err) {
      console.error("Explore click failed", err);
    }
  };

  return (
    <section className="relative w-full flex flex-col items-center bg-[#050505] px-4 pt-[80px] md:pt-[110px] pb-20 overflow-hidden">

      {/* Subtle glowing radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1000px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
      >

        {/* Soft Inner Glow */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />

        {/* ICON */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="mb-8 flex justify-center"
        >
          <div className="bg-white text-black p-3.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <FaRobot size={24} />
          </div>
        </motion.div>

        {/* HEADING */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500"
        >
          Explore your job&apos;s future
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-white/60 mb-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Find out how likely your job is to be automated. Understand how AI is shaping careers with data-driven insights.
        </motion.p>

        {/* SEARCH BAR */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative w-full max-w-3xl mx-auto mb-10 group"
        >
          {/* Focus glow ring for the SearchAutocomplete area */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative z-10">
            <SearchAutocomplete className="max-w-3xl mx-auto shadow-xl" />
          </div>
        </motion.div>

        {/* TRENDING JOBS */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="mb-10 text-center space-y-4"
        >
          <p className="text-white/40 text-sm font-medium tracking-wide uppercase">Most searched</p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            <TrendingJobs titles={trendingJobs} />
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}