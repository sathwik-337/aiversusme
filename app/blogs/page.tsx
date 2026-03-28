"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, TrendingUp, ArrowRight, Search, Sparkles } from "lucide-react";
import { blogPosts } from "@/app/data/blog-posts";

const categories = ["All", "AI Risk", "Careers", "Tech Jobs"];

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Only show posts from index 13 onwards (first 13 are on homepage)
  
const remainingPosts = blogPosts;

  const filteredPosts = remainingPosts.filter((post) => {
    const category = activeCategory.toLowerCase();

    // Category filter
    let categoryMatch = true;
    if (category !== "all") {
      if (category === "careers") {
        categoryMatch = post.tags.some(t =>
          t.toLowerCase().includes("career") ||
          t.toLowerCase().includes("job") ||
          t.toLowerCase().includes("upskilling")
        );
      } else if (category === "tech jobs") {
        categoryMatch = post.tags.some(t =>
          t.toLowerCase().includes("tech") ||
          t.toLowerCase().includes("software") ||
          t.toLowerCase().includes("ai tools") ||
          t.toLowerCase().includes("automation") ||
          t.toLowerCase().includes("robotics")
        );
      } else {
        categoryMatch = post.tags.some(t => t.toLowerCase().includes(category));
      }
    }

    // Search filter
    const searchMatch = searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return categoryMatch && searchMatch;
  });

  return (
    <div className="min-h-screen bg-black text-white py-32 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-cyan-400" />
            <span>All Articles</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            More Insights
          </h1>
          <p className="text-center text-gray-400 mb-10 text-lg max-w-2xl">
            Insights on AI, careers & the future of work

          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-10">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, insights, or careers..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-md"
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md ${
                  activeCategory === category
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}?from=blogs`}
                className="group relative flex flex-col bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:shadow-[0_20px_50px_rgba(6,182,212,0.15)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="w-full h-48 relative overflow-hidden bg-gray-900 border-b border-white/10">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {post.isTrending && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-medium text-white backdrop-blur-md">
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
                  <h3 className="text-xl font-semibold mb-3 text-gray-100 group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-gray-500">
            <Search size={48} className="mb-4 opacity-20" />
            <p className="text-lg">No articles found.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}