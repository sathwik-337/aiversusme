"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Sparkles } from "lucide-react";
import { blogPosts } from "@/app/data/blog-posts";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BlogDetailContent({ slug }: { slug: string }) {
  const post = blogPosts.find((p) => p.slug === slug);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");

  if (!post) {
    notFound();
  }

  const backHref = from === "blogs" ? "/blogs" : 
    Number(post.id) <= 13 ? "/#blog-section" : "/blogs";

  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-12 px-4 md:px-8">
      <article className="max-w-4xl mx-auto">

        {/* Back Link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors mb-8 text-sm font-medium cursor-pointer relative z-50"
        >
          <ArrowLeft size={16} />
          Back to all insights
        </Link>

        {/* Header */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-400">
              <Sparkles size={12} />
              <span>{post.tags[0]}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Clock size={14} />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-cyan-100/60 leading-relaxed max-w-3xl">
            {post.description}
          </p>
        </header>

        {/* Main Image */}
        <div className="w-full max-w-3xl mx-auto aspect-[16/7] md:aspect-[21/9] rounded-3xl overflow-hidden mb-12 relative border border-white/10 shadow-2xl shadow-cyan-500/5">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          <p className="leading-loose text-lg mb-8">{post.content}</p>

          {post.sections?.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">{section.title}</h2>
              <p className="leading-loose mb-8">{section.content}</p>
            </div>
          ))}

          {post.quote && (
            <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl my-10 italic text-xl text-gray-200 border-l-4 border-l-cyan-500 leading-relaxed shadow-lg shadow-black">
              "{post.quote}"
            </div>
          )}

          {post.actionSteps && post.actionSteps.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mt-10 mb-4 text-white">Actionable Next Steps</h2>
              <ul className="list-disc pl-6 space-y-3 text-gray-300 my-6">
                {post.actionSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Tags footer */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500 mr-2 py-1 uppercase tracking-wider font-semibold">Topics:</span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium text-cyan-200/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <Link
            href={backHref}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-medium backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] transition-all duration-300"
          >
            <span>View All Articles</span>
            <ArrowLeft size={16} className="text-cyan-400 rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>
        </div>

      </article>
    </div>
  );
}

export default function BlogDetail({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <BlogDetailContent slug={slug} />
    </Suspense>
  );
}