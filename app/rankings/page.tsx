 import { db } from "@/lib/db";
 import { jobs } from "@/lib/db/schema";
 import { desc } from "drizzle-orm";
 import Link from "next/link";
 
 export default async function RankingsPage() {
   const items = await db.select().from(jobs).orderBy(desc(jobs.risk_score)).limit(50);
   return (
     <div className="min-h-screen bg-background text-foreground">
       <div className="container px-4 md:px-6 py-12">
         <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Job Automation Risk Rankings</h1>
         <p className="text-muted-foreground mb-6">Top roles ranked by estimated automation risk. Click a role to view detailed analysis.</p>
         <div className="bg-card border border-border rounded-2xl overflow-hidden">
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
             {items.map((job, idx) => (
               <Link
                 key={job.id}
                 href={`/job/${job.slug}`}
                 className="p-6 border-b border-border hover:bg-muted/40 transition-colors"
               >
                 <div className="flex items-center justify-between">
                   <div>
                     <div className="text-sm text-muted-foreground">#{idx + 1}</div>
                     <div className="text-lg font-semibold">{job.title}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-2xl font-black">{job.risk_score}%</div>
                     <div className="text-xs text-muted-foreground">risk</div>
                   </div>
                 </div>
                 <div className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</div>
               </Link>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 }
