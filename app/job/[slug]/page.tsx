import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import JobDetailAnalysis from "@/components/job-detail-analysis";
import CommentsSection from "@/components/comments-section";
import * as dotenv from "dotenv";

export default async function JobPage({ params: promise }: { params: { slug: string } }) {
  const params = await promise;
  const job = await db.query.jobs.findFirst({
    where: eq(jobs.slug, params.slug),
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-white py-12 px-4 flex flex-col items-center">
      {/* Client component that handles AI analysis and dynamic rendering */}
      <JobDetailAnalysis job={job} />

      {/* Footer sections that remain relatively static but styled */}
      <CommentsSection jobSlug={job.slug} initialCommentsCount={job.votes_count || 0} />
    </div>
  );
}
