 "use client";
 
 import React from "react";
 import { cn } from "@/lib/utils";
 
 interface SentimentPoint {
   label: string;
   value: number;
 }
 
 interface SentimentChartProps {
   data: SentimentPoint[];
   height?: number;
 }
 
 export default function SentimentChart({ data, height = 240 }: SentimentChartProps) {
   const max = data.length > 0 ? Math.max(...data.map(d => d.value)) : 100;
   const getColor = (v: number) => {
     if (v < 60) return "bg-[#84cc16]";
     if (v < 80) return "bg-[#f59e0b]";
     return "bg-[#f97316]";
   };
 
   return (
     <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6">
       <div className="flex items-center justify-between mb-4">
         <h4 className="text-xl font-bold">Sentiment over time (quarterly)</h4>
       </div>
      <div className="h-[280px] flex items-end gap-1.5 relative pt-8">
         {data.map((pt, i) => {
           const h = max ? (pt.value / max) * 100 : 0;
           return (
            <div key={i} className="flex-1 h-full flex flex-col items-center group relative">
               <div
                 style={{ height: `${h}%` }}
                 className={cn("w-full rounded-t-sm transition-all group-hover:opacity-80", getColor(pt.value))}
               />
               <span className="text-[8px] text-[#94a3b8] mt-2">{pt.label}</span>
               <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-[10px] p-1 rounded z-10 whitespace-nowrap">
                 {Math.round(pt.value)}%
               </div>
             </div>
           );
         })}
       </div>
       <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#94a3b8]">
         <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
         <span>Risk level</span>
       </div>
     </div>
   );
 }
