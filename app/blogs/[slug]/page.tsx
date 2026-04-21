import { Metadata } from "next";
import { blogPosts } from "@/app/data/blog-posts";
import BlogDetail from "@/app/components/blog-detail";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import Script from "next/script";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    return {
      title: "Post Not Found | AI VS ME",
    };
  }

  return {
    title: `${post.title} | AI VS ME`,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      type: "article",
      publishedTime: post.date,
      authors: ["AI VS ME Team"],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl],
    },
    alternates: {
      canonical: `/blogs/${post.slug}`,
    },
  };
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const post = blogPosts.find((p) => p.slug === resolvedParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BlogPosting",
                "headline": post.title,
                "description": post.description,
                "image": post.imageUrl,
                "datePublished": post.date,
                "author": {
                  "@type": "Organization",
                  "name": "AI VS ME"
                }
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://aiversusme.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://aiversusme.com/blogs"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": post.title,
                    "item": `https://aiversusme.com/blogs/${post.slug}`
                  }
                ]
              }
            ]
          })
        }}
      />
      <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading post...</div>}>
        <BlogDetail slug={resolvedParams.slug} />
      </Suspense>
    </>
  );
}
