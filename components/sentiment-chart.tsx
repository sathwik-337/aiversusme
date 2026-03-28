"use client";

import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from 'recharts';
import { cn } from "@/lib/utils";

interface SentimentPoint {
  label: string;
  value: number;
}

interface SentimentChartProps {
  data: SentimentPoint[];
  height?: number;
}

export default function SentimentChart({ data, height = 300 }: SentimentChartProps) {
  const getColor = (v: number) => {
    if (v < 60) return "#84cc16";
    if (v < 80) return "#f59e0b";
    return "#f97316";
  };

  return (
    <div className="bg-[#25282c] border border-white/5 rounded-3xl p-4 md:p-6 h-[350px] md:h-[450px] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-lg md:text-xl font-bold leading-tight">Sentiment over time <span className="text-sm font-normal text-[#94a3b8]">(quarterly)</span></h4>
      </div>
      <div className="flex-grow w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis 
              dataKey="label" 
              stroke="#94a3b8" 
              fontSize={10} 
              tickLine={false} 
              axisLine={false}
              angle={-45}
              textAnchor="end"
              interval={4}
              height={50}
            />
            <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
              itemStyle={{ color: '#fff' }}
              formatter={(value: any) => `${value}%`}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center gap-2 mt-4 text-xs text-[#94a3b8]">
        <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
        <span>Risk level</span>
      </div>
    </div>
  );
}
