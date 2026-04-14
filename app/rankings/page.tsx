import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import RankingsContent from "./RankingsContent";

export default async function RankingsPage() {
  const items = await db.select().from(jobs).orderBy(desc(jobs.risk_score)).limit(50);

  const maxScore = items[0]?.risk_score ?? 100;

  return (
    <div className="min-h-screen bg-black text-white pt-[80px] md:pt-[110px] pb-16 px-4 md:px-8">
      <RankingsContent items={items} maxScore={maxScore} />
    </div>
  );
}
