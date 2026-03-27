 "use client";
 
 import { useRouter } from "next/navigation";
 
 interface Props {
   titles: string[];
 }
 
 export default function TrendingJobs({ titles }: Props) {
   const router = useRouter();
 
   const handleClick = async (title: string) => {
     try {
      const known: Record<string, string> = {
        "Computer Programmers": "software-developer",
        "Lawyers": "lawyer",
        "Web Developers": "web-developer",
        "Accountants": "accountant",
        "Electrical Engineers": "electrical-engineer",
        "Graphic Designers": "graphic-designer",
        "Actors": "actor",
        "Mechanical Engineers": "mechanical-engineer",
        "Electricians": "electrician",
      };
      const mapped = known[title];
      if (mapped) {
        router.push(`/job/${mapped}`);
        return;
      }
      const q = title.replace(/s\b/i, ""); // simple singular fallback
      const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(q)}`);
      if (!response.ok) throw new Error("Search failed");
      const data = await response.json();
      const match = data?.[0];
      if (match?.slug) {
        router.push(`/job/${match.slug}`);
      } else {
        console.warn(`No job found for: ${title}`);
      }
     } catch (e) {
       console.error("Trending click failed", e);
     }
   };
 
   return (
     <div className="flex flex-wrap justify-center gap-3">
       {titles.map((title, i) => (
         <button
           key={`${title}-${i}`}
           onClick={() => handleClick(title)}
           className="px-4 py-1.5 rounded-full bg-white text-black text-sm border border-white/20 hover:bg-gray-200 hover:scale-105 transition shadow"
         >
           {title}
         </button>
       ))}
     </div>
   );
 }
