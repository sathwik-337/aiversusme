import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import RankingsContent from "./RankingsContent";

export default async function RankingsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-[80px] md:pt-[110px] pb-16 px-4 md:px-8">
      <RankingsContent />
    </div>
  );
}
