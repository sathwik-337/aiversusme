import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq, ilike } from "drizzle-orm";
import { notFound } from "next/navigation";
import JobDetailAnalysis from "@/components/job-detail-analysis";
import CommentsSection from "@/components/comments-section";

export const dynamic = "force-dynamic";

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  let slug: string | undefined;
  try {
    const p = await params;
    slug = p.slug;
  } catch (e) {
    console.error("Error awaiting params:", e);
    return notFound();
  }

  if (!slug) return notFound();

  const decodedSlug = decodeURIComponent(slug);
  let job;

  try {
    // Using a more standard query to ensure compatibility
    const jobResults = await db
      .select()
      .from(jobs)
      .where(ilike(jobs.slug, decodedSlug))
      .limit(1);
    
    job = jobResults[0];
  } catch (error) {
    console.error("Error loading job from DB:", error);
    return notFound();
  }

  if (!job) {
    console.error(`Job not found for slug: ${decodedSlug}`);
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-white flex flex-col items-center px-6 pt-[80px] md:pt-[110px] pb-12 md:pb-24">
      {/* Pass the job to the analysis component */}
      <JobDetailAnalysis job={job} />
      
      <div id="comments-section">
        {/* Footer sections that remain relatively static but styled */}
        <CommentsSection jobSlug={job.slug} initialCommentsCount={job.votes_count || 0} />
      </div>
    </div>
  );
}
