"use client";

import { useState, useRef, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";

import { blogPosts, type BlogPost } from "@/app/data/blog-posts";

const categories = ["All", "AI Risk", "Careers", "Tech Jobs"];

function BlogSectionContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [itemsPerView, setItemsPerView] = useState(3);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle scrolling to blog section from search params
  useEffect(() => {
    const scrollTo = searchParams.get("scrollTo");
    if (scrollTo === "blog" && sectionRef.current) {
      (sectionRef.current as HTMLElement).scrollIntoView({ behavior: "smooth" });
      // Clean up the URL without triggering a full scroll to top
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  const filteredPosts = blogPosts.slice(0, 13).filter((post) => {
    const category = activeCategory.toLowerCase();
    if (category === "all") return true;

    // Inclusive matching for Careers
    if (category === "careers") {
      return post.tags.some(t =>
        t.toLowerCase().includes("career") ||
        t.toLowerCase().includes("job") ||
        t.toLowerCase().includes("upskilling")
      );
    }

    // Inclusive matching for Tech Jobs
    if (category === "tech jobs") {
      return post.tags.some(t =>
        t.toLowerCase().includes("tech") ||
        t.toLowerCase().includes("software") ||
        t.toLowerCase().includes("ai tools") ||
        t.toLowerCase().includes("automation") ||
        t.toLowerCase().includes("robotics")
      );
    }

    // Exact or partial match for others (like AI Risk)
    return post.tags.some(t => t.toLowerCase().includes(category));
  });

  // Infinite index tracking
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Dynamic items per view detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Conditional Tripling: Only triple if we actually need to scroll
  const shouldScroll = filteredPosts.length > itemsPerView;
  const tripledPosts = shouldScroll ? [...filteredPosts, ...filteredPosts, ...filteredPosts] : filteredPosts;

  // Initialize/Update currentIndex when category or scrolling needs change
  useEffect(() => {
    setCurrentIndex(shouldScroll ? filteredPosts.length : 0);
  }, [filteredPosts.length, shouldScroll]);

  const handleNext = useCallback(() => {
    if (!shouldScroll) return;
    setCurrentIndex((prev) => prev + 1);
  }, [shouldScroll]);

  const handlePrev = useCallback(() => {
    if (!shouldScroll) return;
    setCurrentIndex((prev) => prev - 1);
  }, [shouldScroll]);

  // Silent reset logic to stay within the triple-buffering zone for infinite feel
  useEffect(() => {
    if (!shouldScroll) return;
    const total = filteredPosts.length;
    if (total === 0) return;

    if (currentIndex >= total * 2) {
      setCurrentIndex(currentIndex - total);
    }
    if (currentIndex < total) {
      if (currentIndex < 0) setCurrentIndex(total);
    }
  }, [currentIndex, filteredPosts.length, shouldScroll]);

  // Auto-play
  useEffect(() => {
    if (isPaused || !shouldScroll) return;
    const interval = setInterval(handleNext, 4500);
    return () => clearInterval(interval);
  }, [isPaused, handleNext, shouldScroll]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="w-full min-h-screen bg-black text-white py-20 px-4 md:px-8 overflow-hidden"
      id="blog-section"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm"
          >
            <Sparkles size={14} className="text-cyan-400" />
            <span>Latest Articles</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500"
          >
            Insights & Career Trends
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
          >
            Explore how AI is shaping the future of jobs, automating tasks, and creating new opportunities worldwide.
          </motion.p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-12">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search articles, insights, or careers..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-md"
                suppressHydrationWarning
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md",
                  activeCategory === category
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                )}
                suppressHydrationWarning
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative group/slider"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Buttons - Only show if should scroll */}
          {shouldScroll && (
            <>
              <button
                onClick={handlePrev}
                className="absolute -left-2 md:-left-6 lg:-left-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-cyan-500/50 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center shadow-lg"
                aria-label="Previous slide"
                suppressHydrationWarning
              >
                <ChevronLeft size={24} />
              </button>

              <button
                onClick={handleNext}
                className="absolute -right-2 md:-right-6 lg:-right-12 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/10 border border-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-cyan-500/50 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center shadow-lg"
                aria-label="Next slide"
                suppressHydrationWarning
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Slider Track */}
          <div className="overflow-visible pt-4 pb-12">
            <motion.div
              className={cn("flex gap-6", !shouldScroll && "justify-center")}
              drag={shouldScroll ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (!shouldScroll) return;
                if (info.offset.x > 50) handlePrev();
                else if (info.offset.x < -50) handleNext();
              }}
              animate={{
                x: shouldScroll ? `-${currentIndex * (100 / itemsPerView)}%` : "0%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {tripledPosts.length > 0 ? (
                tripledPosts.map((post, idx) => (
                  <motion.div
                    key={`${post.id}-${idx}`}
                    className={cn(
                      "flex-shrink-0 px-2",
                      itemsPerView === 1 ? "w-full" : itemsPerView === 2 ? "w-1/2" : "w-1/3"
                    )}
                  >
                    <motion.div
                      whileHover={{ y: -10, scale: 1.03 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="h-full"
                    >
                      <Link
                        href={`/blogs/${post.slug}`}
                        className="text-left group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-500 w-full"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="w-full h-48 relative overflow-hidden bg-gray-900 border-b border-white/10">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          {post.isTrending && (
                            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-medium text-white backdrop-blur-md z-10">
                              <TrendingUp size={12} className="text-cyan-400" />
                              <span>Trending</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 p-6 relative z-10">
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag) => (
                              <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-medium tracking-wide text-cyan-100/70 uppercase">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-100 group-hover:text-white transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 w-full">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                              <Clock size={14} />
                              <span>{post.readingTime}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                              Read More
                              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <div className="w-full flex flex-col items-center justify-center p-12 text-gray-500">
                  <Search size={48} className="mb-4 opacity-20" />
                  <p>No articles found for "{activeCategory}".</p>
                  <button
                    onClick={() => setActiveCategory("All")}
                    className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
                    suppressHydrationWarning
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Pagination Dots - Only show if should scroll */}
          {shouldScroll && (
            <div className="flex justify-center flex-wrap gap-2 mt-4">
              {filteredPosts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(filteredPosts.length + idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500 ease-in-out",
                    (currentIndex % filteredPosts.length) === idx
                      ? "w-8 bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                  suppressHydrationWarning
                />
              ))}
            </div>
          )}
        </div>

        {/* View More Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/blogs"
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </motion.div>

      </div>
    </motion.section>
    
  );
}

export default function BlogSection() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogSectionContent />
    </Suspense>
  );
}
