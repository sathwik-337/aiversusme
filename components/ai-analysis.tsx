"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Sparkles, BrainCircuit, Rocket, Lightbulb, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAnalysisProps {
  jobTitle: string;
}

interface AnalysisData {
  explanation: string;
  future: string;
  skills: string[];
  alternatives: string[];
  scores: {
    automation_risk: number;
    growth_potential: number;
    wage_score: number;
    job_volume: number;
    overall_job_score: number;
  };
}

export default function AIAnalysis({ jobTitle }: AIAnalysisProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.post("/api/ai-analysis", { job_title: jobTitle });
        setData(response.data);
      } catch (err: unknown) {
        const msg = typeof err === "object" && err && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error || "Failed to generate AI insights. Please try again later."
          : "Failed to generate AI insights. Please try again later.";
        setError(msg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [jobTitle]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-primary text-primary-foreground space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-white/20 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded-lg" />
            <div className="h-4 w-3/4 bg-white/10 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-full bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-3xl border-2 border-dashed border-red-200 bg-red-50 text-red-700 text-center">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Explanation & Future */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden group">
            <Sparkles className="absolute top-6 right-6 h-12 w-12 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="h-6 w-6 text-primary-foreground/80" />
              <h2 className="text-2xl font-bold">Automation Impact</h2>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed">
              {data.explanation}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-secondary border shadow-sm relative overflow-hidden group">
            <Rocket className="absolute top-6 right-6 h-12 w-12 opacity-10 group-hover:-translate-y-1 transition-transform" />
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Future Outlook</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {data.future}
            </p>
          </div>
        </div>

        {/* Right Column: Skills & Alternatives */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Skills to Learn</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-2xl bg-background border shadow-sm hover:border-primary/30 transition-colors flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <Repeat className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Alternative Careers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.alternatives.map((alt, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-2xl bg-background border shadow-sm hover:border-primary/30 transition-colors flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-secondary-foreground/20" />
                  <span className="font-medium text-sm">{alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
