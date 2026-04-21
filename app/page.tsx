import Link from "next/link";
import { Suspense } from "react";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { cn } from "@/lib/utils";
import AboutSection from "@/app/components/about";
import BlogSection from "@/app/components/blog";
import TestimonialsSection from "@/app/components/testimonials";
import HowItWorksSection from "@/app/components/howtouse";
import ContactSection from "./components/contact";
import FeatureSection from "@/app/components/featuresection";
import LandingHero from "@/app/components/hero";
import Script from "next/script";

export default async function Home() {
  let featuredJobs = [];
  try {
    featuredJobs = await db.select().from(jobs).orderBy(desc(jobs.created_at)).limit(6);
  } catch (error) {
    console.error("Failed to fetch featured jobs:", error);
    // Fallback to empty array so the page still loads
  }

  return (
    <div className="flex flex-col items-center">
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is AI VS ME?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AI VS ME is an AI-powered platform that helps individuals analyze their job automation risk and discover future-proof skills to stay relevant in the evolving job market."
                }
              },
              {
                "@type": "Question",
                "name": "How does the AI risk score work?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our system evaluates automation risk by analyzing job tasks, required skills, and current AI capabilities using advanced data models to provide a comprehensive risk score."
                }
              },
              {
                "@type": "Question",
                "name": "How can I future-proof my career?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can future-proof your career by developing high-touch human skills like empathy, strategic thinking, and emotional intelligence, and by learning to work alongside AI tools."
                }
              },
              {
                "@type": "Question",
                "name": "Is the job risk analysis free?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, basic job risk analysis and insights are free on AI VS ME to help everyone understand their career's future."
                }
              }
            ]
          })
        }}
      />
      {/* Landing Hero */}
      <LandingHero />

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* About section for hash link */}
      <AboutSection />

      {/* Blog section */}
      <Suspense fallback={<div className="py-20 text-center text-zinc-500">Loading blog...</div>}>
        <BlogSection />
      </Suspense>

      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Contact section */}
      <ContactSection />
    </div>
  );
}