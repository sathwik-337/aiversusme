"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { 
  TrendingUp, Facebook, Twitter, Linkedin, Repeat, Search, 
  GitCompare, Vote, MessageSquare, ChevronDown, Sparkles, BrainCircuit, Rocket, Lightbulb,
  Mail, MessageCircle, FileDown, Download
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { cn } from "@/lib/utils";
import Gauge from "./gauge";
import RadarChart from "./radar-chart";
import SentimentChart from "./sentiment-chart";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";
import type { jobs as jobsTable } from "@/lib/db/schema";

type JobSelect = typeof jobsTable.$inferSelect;
interface JobDetailAnalysisProps { job: JobSelect }

interface AnalysisData {
  executive_summary: string;
  risk_analysis: string;
  strategic_advice: {
    individuals: string;
    businesses: string;
  };
  robot_takeover_analysis?: {
    can_be_taken_by_robots: string;
    reasoning: string;
    estimated_timeline: string;
  };
  task_analysis: {
    replaceable: string[];
    non_replaceable: string[];
  };
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
  employment_history: (number | { year: number; job_count?: number; value?: number; count?: number })[];
  wage_history: {
    year: number;
    job_wage: number;
    national_median: number;
  }[];
  drivers?: { name: string; impact: number }[];
  task_impact?: { replaced: number; augmented: number; preserved: number };
  regional_demand?: { region: string; demand: number }[];
  wage_forecast?: { year: number; forecast: number }[];
  hiring_trend?: { month: string; postings: number }[];
  timeline?: { year: number; event: string; risk_change: number }[];
  certifications?: string[];
}

const StatusBox = ({ children, borderColor = "border-orange-500" }: { children: React.ReactNode, borderColor?: string }) => (
  <div className={cn("bg-[#25282c] border-l-4 rounded-md p-4 mb-6", borderColor)}>
    <p className="text-sm font-bold tracking-tight">{children}</p>
  </div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-6">{children}</h2>
);

const detailCache = new Map<string, AnalysisData>();

const WrappedTick = (props: any) => {
  const { x, y, payload } = props;
  const words = payload.value.split(' ');
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    if ((currentLine + ' ' + words[i]).length < 15) {
      currentLine += ' ' + words[i];
    } else {
      lines.push(currentLine);
      currentLine = words[i];
    }
  }
  lines.push(currentLine);

  return (
    <g transform={`translate(${x},${y})`}>
      {lines.map((line: string, i: number) => (
        <text
          key={i}
          x={-10}
          y={i * 12 - (lines.length - 1) * 6}
          dy={4}
          textAnchor="end"
          fill="#94a3b8"
          fontSize={10}
          className="font-medium"
        >
          {line}
        </text>
      ))}
    </g>
  );
};

const CustomTooltip = ({ active, payload, isMobile }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const value = payload[0].value;
    const name = payload[0].name || 'impact';
    const isCurrency = name.toLowerCase().includes('wage') || name.toLowerCase().includes('salary');

    return (
      <div className="bg-[#111315] border border-white/10 rounded-xl p-3 shadow-2xl max-w-[200px] md:max-w-[300px]">
        <p className="text-white font-bold text-xs md:text-sm mb-1 break-words whitespace-normal">
          {data.name || data.region || data.year || data.label}
        </p>
        <p className="text-cyan-400 font-medium text-[10px] md:text-xs">
          {name} : {isCurrency ? `₹${Number(value).toLocaleString()}` : value}
          {payload[0].unit || ''}
        </p>
      </div>
    );
  }
  return null;
};

const getIndefiniteArticle = (title: string) => {
  if (!title) return "A";
  const firstLetter = title.trim().charAt(0).toLowerCase();
  return ["a", "e", "i", "o", "u"].includes(firstLetter) ? "An" : "A";
};

export default function JobDetailAnalysis({ job }: JobDetailAnalysisProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const [pollData, setPollData] = useState<{ highly_likely: number; moderate: number; uncertain: number; low: number; no_chance: number } | null>(null);
  const [choice, setChoice] = useState<"highly_likely" | "moderate" | "uncertain" | "low" | "no_chance" | null>(null);
  const [pollMessage, setPollMessage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isMobile, setIsMobile] = useState(false);

  // Dynamic screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function recommendCerts(title: string) {
    const t = title.toLowerCase();
    if (t.includes("data") || t.includes("analyst") || t.includes("scientist")) {
      return ["Google Data Analytics", "IBM Data Science", "AWS Data Analytics", "Microsoft Azure DP-100", "Tableau Desktop", "Power BI Analyst PL-300"];
    }
    if (t.includes("developer") || t.includes("engineer") || t.includes("programmer") || t.includes("software") || t.includes("web")) {
      return ["AWS Solutions Architect Associate", "Azure AZ-104", "Google Professional Cloud Developer", "Meta Front-End", "React Nanodegree", "Kubernetes CKAD"];
    }
    if (t.includes("accountant") || t.includes("finance") || t.includes("banking")) {
      return ["ACCA Foundations", "CPA fundamentals", "Tally with GST", "SAP FI basics", "Financial Modeling", "Excel Advanced"];
    }
    if (t.includes("marketing") || t.includes("sales") || t.includes("advertising")) {
      return ["Google Ads", "Meta Blueprint", "HubSpot Content", "SEO Specialization", "GA4 Analytics", "Email Marketing"];
    }
    if (t.includes("designer") || t.includes("ui") || t.includes("ux") || t.includes("creative")) {
      return ["Adobe Certified Professional", "Figma UI Design", "UX Research", "Motion Graphics", "3D Modeling Basics", "Brand Design"];
    }
    if (t.includes("electrical") || t.includes("mechanical") || t.includes("civil") || t.includes("industrial")) {
      return ["AutoCAD", "SolidWorks", "PLC SCADA", "Primavera P6", "ANSYS Basics", "Quality Management"];
    }
    if (t.includes("nurse") || t.includes("doctor") || t.includes("medical") || t.includes("health")) {
      return ["AI in Healthcare (Stanford)", "Health Informatics (Coursera)", "Medical Technology Basics", "Digital Health Foundations", "Patient Care Analytics", "Telemedicine Fundamentals"];
    }
    if (t.includes("law") || t.includes("legal") || t.includes("attorney")) {
      return ["AI in Law Specialization", "Legal Tech Foundations", "eDiscovery Management", "Contract Analysis Tools", "Legal Data Privacy", "Digital Evidence Management"];
    }
    return ["AI Fundamentals", "Project Management Basics", "Digital Literacy", "Modern Workplace Tools", "Problem Solving Skills", "Critical Thinking"];
  }

  useEffect(() => {
    const fetchAnalysis = async () => {
      /* Temporarily disabled cache to ensure prompt changes take effect
      if (detailCache.has(job.title)) {
        setData(detailCache.get(job.title)!);
        setLoading(false);
        return;
      }
      */

      try {
        const response = await axios.post("/api/ai-analysis", { job_title: job.title }, { withCredentials: true });
        detailCache.set(job.title, response.data);
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
  }, [job.title]);

  useEffect(() => {
    const loadPoll = async () => {
      if (!isSignedIn) return;
      const res = await axios.get(`/api/polls/${job.slug}`, { withCredentials: true });
      setPollData(res.data);
    };
    loadPoll();
  }, [isSignedIn, job.slug]);

  const risk = data?.scores?.automation_risk ?? job.risk_score;
  const riskLevel = risk > 70 ? "Imminent Risk" : risk > 30 ? "Moderate Risk" : "Minimal Risk";
  const riskColor = risk > 70 ? "border-orange-500" : risk > 30 ? "border-yellow-500" : "border-green-500";
  const sentimentData = (() => {
    const seed = Array.from(job.slug || job.title || "").reduce((a, c) => a + c.charCodeAt(0), 0);
    const startYear = 2018;
    const startQuarter = 1;
    const quarters = 36;
    const base = Math.max(40, Math.min(65, risk - 10));
    const slope = ((risk - base) / quarters) * 0.8 + ((data?.scores?.growth_potential ?? 50) / 500);
    const arr: { label: string; value: number }[] = [];
    for (let i = 0; i < quarters; i++) {
      const year = startYear + Math.floor((startQuarter - 1 + i) / 4);
      const q = ((startQuarter - 1 + i) % 4) + 1;
      const noise = (((seed * (i + 3)) % 17) - 8) * 0.6;
      const val = Math.max(0, Math.min(100, base + i * slope + noise));
      arr.push({ label: `Q${q} ${year}`, value: Math.round(val) });
    }
    return arr;
  })();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // Account for fixed header if any
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out the AI risk analysis for ${job.title} on AI vs ME!`;
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent("AI Risk Analysis: " + job.title)}&body=${encodeURIComponent(shareText + "\n\n" + shareUrl)}`;
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`;

  const handleShare = (platform: string) => {
    if (!isSignedIn) return;
    
    switch (platform) {
      case "pdf":
        window.print();
        break;
    }
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Title & Badge */}
      <div className="text-center space-y-4 mb-8 px-4">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight">{job.title}</h1>
        <div className="flex justify-center">
          <div className="bg-[#451a1a] text-[#f87171] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            High pay & high risk
          </div>
        </div>
        <div className="inline-block border-2 border-yellow-500/50 rounded-xl px-4 md:px-8 py-2 text-lg md:text-xl font-black text-yellow-500 bg-yellow-500/5 uppercase tracking-widest">
          {riskLevel}
        </div>
      </div>

      {/* Main Gauge Section */}
      <div className="w-full max-w-2xl flex flex-col items-center px-4 mb-16">
        <Gauge value={risk} size={400} />
      </div>

      <h2 className="text-xl md:text-2xl font-bold tracking-tight text-center mb-8 px-4">Or, Explore This Profession In Greater Detail...</h2>
      
      <div className="flex gap-4 justify-center mb-12 px-4">
        <button 
          onClick={() => scrollToSection('poll-section')}
          className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors text-xs md:text-sm"
        >
          <Vote className="h-4 w-4" /> Vote
        </button>
        <button 
          onClick={() => scrollToSection('comments-section')}
          className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors text-xs md:text-sm"
        >
          <MessageSquare className="h-4 w-4" /> Comments ({job.votes_count || 0})
        </button>
      </div>

      {loading ? (
        <div className="w-full flex flex-col items-center py-20 space-y-4 px-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="text-muted-foreground animate-pulse text-center">AI is generating detailed analysis for {job.title}...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl border-2 border-dashed border-red-200 bg-red-50 text-red-700 text-center w-full mb-12 mx-4">
          <p className="font-medium">{error}</p>
        </div>
      ) : data ? (
        <div className="w-full space-y-20 px-4 md:px-0">
          {/* 🔍 Executive Summary */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
            <SectionHeader>🔍 Executive Summary</SectionHeader>
            <div className="prose prose-invert max-w-none text-[#cbd5e1] leading-relaxed italic border-l-4 border-blue-500 pl-4 md:pl-6 py-2 text-sm md:text-base">
              {data.executive_summary}
            </div>
          </section>

          {/* 🤖 Robot Takeover Analysis */}
          {data.robot_takeover_analysis && (
            <section className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <BrainCircuit className="h-24 w-24" />
              </div>
              <SectionHeader>🤖 Robot Takeover Potential</SectionHeader>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                <div className="md:col-span-1 bg-[#111315] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-2">Can Robots Do This?</span>
                  <span className={cn(
                    "text-2xl md:text-3xl font-black px-4 py-1 rounded-lg",
                    data.robot_takeover_analysis.can_be_taken_by_robots.toLowerCase().includes('yes') ? "text-red-500 bg-red-500/10" :
                    data.robot_takeover_analysis.can_be_taken_by_robots.toLowerCase().includes('no') ? "text-green-500 bg-green-500/10" :
                    "text-yellow-500 bg-yellow-500/10"
                  )}>
                    {data.robot_takeover_analysis.can_be_taken_by_robots}
                  </span>
                </div>
                <div className="md:col-span-2 bg-[#111315] p-6 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-2 block">The Reasoning</span>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {data.robot_takeover_analysis.reasoning}
                  </p>
                </div>
                <div className="md:col-span-1 bg-[#111315] p-6 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center">
                  <span className="text-xs font-bold text-[#94a3b8] uppercase tracking-widest mb-2">Timeline</span>
                  <span className="text-base md:text-lg font-bold text-blue-400">
                    {data.robot_takeover_analysis.estimated_timeline}
                  </span>
                </div>
              </div>
            </section>
          )}

          {/* 1. Calculated automation risk & Analysis */}
          <section>
            <SectionHeader>📉 Job Risk Analysis</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
               <div className="md:col-span-1 flex flex-col items-center justify-center bg-[#1e293b]/30 rounded-3xl p-8 border border-white/5">
                  <span className="text-sm font-bold text-[#94a3b8] uppercase tracking-widest mb-2">Risk Score</span>
                  <span className={cn("text-5xl md:text-6xl font-black", risk > 70 ? "text-orange-500" : risk > 30 ? "text-yellow-500" : "text-green-500")}>
                    {risk}%
                  </span>
                  <span className="text-xs font-bold text-[#94a3b8] mt-2 uppercase tracking-widest">{riskLevel}</span>
               </div>
               <div className="md:col-span-2 space-y-4">
                  <StatusBox borderColor={riskColor}>
                    Expert Interpretation
                  </StatusBox>
                  <p className="text-[#94a3b8] leading-relaxed text-sm md:text-base">
                    {data.risk_analysis}
                  </p>
               </div>
            </div>
            
            <div className="bg-[#1e293b]/30 border-l-4 border-green-500 rounded-md p-6 mt-8">
              <p className="font-bold text-sm mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" /> Future-Proof Skills to Focus On:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#94a3b8]">
                {(data?.skills || []).map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 🤖 Task-Level Automation Insight */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 shadow-xl">
            <SectionHeader>🤖 Task-Level Automation Insight</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
               <div className="space-y-4 md:space-y-6">
                  <h4 className="text-base md:text-lg font-bold text-red-400 flex items-center gap-2">
                     <BrainCircuit className="h-5 w-5" /> Tasks AI Can Replace
                  </h4>
                  <ul className="space-y-3 md:space-y-4">
                     {(data.task_analysis.replaceable || []).map((task, i) => (
                        <li key={i} className="text-xs md:text-sm text-[#94a3b8] bg-[#111315] p-3 md:p-4 rounded-xl border border-white/5">
                           {task}
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="space-y-4 md:space-y-6">
                  <h4 className="text-base md:text-lg font-bold text-green-400 flex items-center gap-2">
                     <Lightbulb className="h-5 w-5" /> Tasks AI Cannot Replace
                  </h4>
                  <ul className="space-y-3 md:space-y-4">
                     {(data.task_analysis.non_replaceable || []).map((task, i) => (
                        <li key={i} className="text-xs md:text-sm text-[#94a3b8] bg-[#111315] p-3 md:p-4 rounded-xl border border-white/5">
                           {task}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* 🧑‍💼 Strategic Advice */}
          <section className="bg-[#1e293b]/20 border border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Rocket className="h-32 w-32" />
            </div>
            <SectionHeader>🧑‍💼 Strategic Advice</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
               <div className="space-y-3 md:space-y-4">
                  <h4 className="text-base md:text-lg font-bold text-blue-400">For Individuals</h4>
                  <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">
                     {data.strategic_advice.individuals}
                  </p>
               </div>
               <div className="space-y-3 md:space-y-4">
                  <h4 className="text-base md:text-lg font-bold text-purple-400">For Business Owners</h4>
                  <p className="text-[#94a3b8] text-xs md:text-sm leading-relaxed">
                     {data.strategic_advice.businesses}
                  </p>
               </div>
            </div>
          </section>

          {/* 2. User poll */}
          <section id="poll-section">
            <SectionHeader>Community Perception</SectionHeader>
            <StatusBox borderColor="border-yellow-500">
              {(data?.scores?.automation_risk ?? risk)}% chance of full automation within the next two decades
            </StatusBox>
            <p className="text-[#94a3b8] mb-8 leading-relaxed text-sm md:text-base">
              Our AI analysis estimates a {(data?.scores?.automation_risk ?? risk)}% chance of automation.
            </p>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 max-w-xl w-full mx-auto md:mx-0">
              <h4 className="text-xl md:text-2xl font-bold mb-4">What do you think the risk of automation is?</h4>
              
              {!isSignedIn ? (
                <div className="bg-[#111315] border border-white/10 rounded-xl p-6 text-center space-y-4 mb-6">
                  <p className="text-sm text-[#cbd5e1]">Please sign in to participate in the community poll.</p>
                  <SignInButton mode="modal">
                    <button className="bg-white text-black font-bold px-6 py-2 rounded-full hover:bg-gray-200 transition-colors text-xs">
                      Sign In to Vote
                    </button>
                  </SignInButton>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                    <button onClick={() => setChoice("highly_likely")} className={`px-4 py-2 rounded-md border text-sm ${choice==="highly_likely"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Highly likely</button>
                    <button onClick={() => setChoice("moderate")} className={`px-4 py-2 rounded-md border text-sm ${choice==="moderate"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Moderate</button>
                    <button onClick={() => setChoice("uncertain")} className={`px-4 py-2 rounded-md border text-sm ${choice==="uncertain"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Uncertain</button>
                    <button onClick={() => setChoice("low")} className={`px-4 py-2 rounded-md border text-sm ${choice==="low"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Low</button>
                    <button onClick={() => setChoice("no_chance")} className={`px-4 py-2 rounded-md border text-sm ${choice==="no_chance"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>No chance</button>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                    <button
                      onClick={async () => {
                        if (!choice) return;
                        try {
                          const res = await axios.post(`/api/polls/${job.slug}`, { option: choice }, { withCredentials: true });
                          setPollData(res.data);
                          setPollMessage("Poll submitted!");
                          setTimeout(() => setPollMessage(null), 2500);
                        } catch (err: any) {
                          setPollMessage(err.response?.data?.error || "Submission failed");
                          setTimeout(() => setPollMessage(null), 3500);
                        }
                      }}
                      disabled={!choice}
                      className="w-full sm:w-auto bg-[#00e5ff] hover:bg-[#00b8cc] text-black font-black px-8 py-3 rounded-xl transition-colors text-sm disabled:opacity-50"
                    >
                      Submit vote
                    </button>
                    {pollMessage && <span className={`text-sm ${pollMessage.includes("failed") || pollMessage.includes("already") ? "text-red-400" : "text-green-400"}`}>{pollMessage}</span>}
                  </div>
                </>
              )}

              {pollData && (
                <div className="space-y-3 md:space-y-2">
                  {([
                    { k: "highly_likely", label: "Highly likely", color: "bg-red-500" },
                    { k: "moderate", label: "Moderate", color: "bg-orange-500" },
                    { k: "uncertain", label: "Uncertain", color: "bg-yellow-500" },
                    { k: "low", label: "Low", color: "bg-green-500" },
                    { k: "no_chance", label: "No chance", color: "bg-blue-500" },
                  ] as Array<{ k: keyof typeof pollData; label: string; color: string }>).map((o) => {
                    const total =
                      pollData.highly_likely +
                      pollData.moderate +
                      pollData.uncertain +
                      pollData.low +
                      pollData.no_chance || 1;
                    const val = pollData[o.k];
                    const pct = Math.round((val / total) * 100);
                    return (
                      <div key={o.k} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="text-[#94a3b8]">{o.label}</span>
                          <span className="text-[#94a3b8]">{pct}%</span>
                        </div>
                        <div className="h-2 bg-[#111315] rounded">
                          <div className={`h-2 ${o.color} rounded`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <section>
            <SectionHeader>Sentiment</SectionHeader>
            <StatusBox borderColor="border-yellow-500">
              Trends based on community perception and automation risk
            </StatusBox>
            <SentimentChart data={sentimentData} />
          </section>

          <section>
            <SectionHeader>Risk drivers</SectionHeader>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-4 md:p-8 h-[400px] flex items-center justify-center relative">
              {data?.drivers && data.drivers.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart 
                    layout="vertical" 
                    data={data.drivers}
                    margin={{ top: 5, right: 30, left: isMobile ? 10 : 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                    <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} hide domain={[0, 100]} />
                    <YAxis 
                      type="category" 
                      dataKey="name" 
                      stroke="#cbd5e1" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false} 
                      width={isMobile ? 100 : 140}
                      tick={isMobile ? <WrappedTick /> : { fill: '#94a3b8' }}
                    />
                    <Tooltip 
                      content={<CustomTooltip isMobile={isMobile} />}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="impact" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={24}>
                      {data.drivers.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.impact > 70 ? '#ef4444' : entry.impact > 40 ? '#f59e0b' : '#22c55e'} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center space-y-2">
                  <BrainCircuit className="h-8 w-8 text-white/10 mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Identifying risk factors...</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <SectionHeader>Task impact</SectionHeader>
            <div className="bg-[#25282c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#ef4444]" style={{ width: `${data?.task_impact?.replaced || 0}%` }} />
                </div>
                <span className="text-xs">Replaced {data?.task_impact?.replaced || 0}%</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#f59e0b]" style={{ width: `${data?.task_impact?.augmented || 0}%` }} />
                </div>
                <span className="text-xs">Augmented {data?.task_impact?.augmented || 0}%</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#22c55e]" style={{ width: `${data?.task_impact?.preserved || 0}%` }} />
                </div>
                <span className="text-xs">Preserved {data?.task_impact?.preserved || 0}%</span>
              </div>
            </div>
          </section>

          {/* 3. Growth */}
          <section>
            <SectionHeader>Growth</SectionHeader>
            <StatusBox borderColor="border-green-500">
              {(data?.scores?.growth_potential ?? 0) > 60 ? "High" : (data?.scores?.growth_potential ?? 0) > 30 ? "Moderate" : "Low"} growth potential
            </StatusBox>
            <p className="text-[#94a3b8] mb-8 leading-relaxed">
              {data.future}
            </p>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 h-[400px] md:h-[450px] flex flex-col">
              <h4 className="text-lg md:text-xl font-bold mb-6">Total employment, and estimated job openings</h4>
              <div className="flex-grow w-full min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart 
                    data={(data?.employment_history || [])
                      .map((val, i) => {
                        let year, value;
                        if (typeof val === 'object' && val !== null) {
                          year = (val as any).year || (2015 + i);
                          value = Number((val as any).job_count || (val as any).value || (val as any).count || 0);
                        } else {
                          year = 2015 + i;
                          value = Number(val || 0);
                        }
                        return { year, value };
                      })
                      .filter((item, index, array) => {
                        // Filter out leading zeros to prevent empty space
                        if (item.value > 0) return true;
                        // Keep item if there's a non-zero value later in the array
                        return array.slice(index).some(laterItem => {
                          const laterVal = typeof laterItem === 'object' ? 
                            ((laterItem as any).job_count || (laterItem as any).value || (laterItem as any).count || 0) : 
                            laterItem;
                          return Number(laterVal) > 0;
                        });
                      })
                    }
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="#94a3b8" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                      interval={isMobile ? 4 : 2}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false}
                      width={50}
                      tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}
                    />
                    <Tooltip 
                      content={<CustomTooltip isMobile={isMobile} />}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {(data?.employment_history || []).map((_, index) => (
                        <Cell key={`cell-${index}`} fill={index < (data?.employment_history?.length || 0) / 2 ? "#336791" : "#4b5563"} />
                      ))}
                    </Bar>
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center flex-wrap gap-4 mt-6 text-[10px] md:text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2"><div className="h-3 w-3 bg-[#336791] rounded-full" /> Total employed</div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 bg-[#4b5563] rounded-full" /> Estimated openings</div>
              </div>
            </div>
          </section>

          {/* 4. Wages & Radar Chart */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <section className="space-y-8">
              <div>
                <SectionHeader>Wages</SectionHeader>
                <StatusBox borderColor="border-green-500">
                  {(data?.scores?.wage_score ?? 0) > 60 ? "High" : (data?.scores?.wage_score ?? 0) > 30 ? "Moderate" : "Low"} paid relative to other professions
                </StatusBox>
                <div className="space-y-4 text-[#94a3b8] mb-8 leading-relaxed text-sm md:text-base">
                  <p>Median annual wage for <span className="font-bold text-white">{job.title}</span> is currently estimated at <span className="font-bold text-white">{job.salary}</span>.</p>
                  <p>Alternative career paths: <span className="font-bold text-white">{(data?.alternatives || []).join(", ")}</span>.</p>
                </div>
              </div>

              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8">
                <h4 className="text-lg md:text-xl font-bold mb-6">Recommended certificate courses</h4>
                <ul className="grid grid-cols-1 gap-3 text-sm text-[#94a3b8]">
                  {(data?.certifications?.filter(c => !c.toLowerCase().includes("list")) || recommendCerts(job.title)).map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0" /> {c}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 h-[400px] md:h-[450px] flex flex-col">
                <h4 className="text-lg md:text-xl font-bold mb-6">Wages over time</h4>
                <div className="flex-grow w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data?.wage_history || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="year" 
                        stroke="#94a3b8" 
                        fontSize={9} 
                        tickLine={false} 
                        axisLine={false} 
                        interval={isMobile ? 4 : 2}
                      />
                      <YAxis 
                        stroke="#94a3b8" 
                        fontSize={9} 
                        tickLine={false} 
                        axisLine={false}
                        width={50}
                        tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        content={<CustomTooltip isMobile={isMobile} />}
                        cursor={{ fill: 'rgba(255,255,255,0.05)' }}       
                      />
                      <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px', fontSize: '10px' }} />
                      <Bar name="Occupation Wage" dataKey="job_wage" fill="#336791" radius={[4, 4, 0, 0]} />
                      <Bar name="National Median" dataKey="national_median" fill="#9f1239" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              {(data?.wage_forecast || []).length > 0 && (
                <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 h-[350px] md:h-[400px] flex flex-col">
                  <h4 className="text-lg md:text-xl font-bold mb-6">Wage forecast</h4>
                  <div className="flex-grow w-full min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={data?.wage_forecast || []} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="year" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} />
                        <YAxis 
                          stroke="#94a3b8" 
                          fontSize={9} 
                          tickLine={false} 
                          axisLine={false} 
                          width={50}
                          tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} 
                        />
                        <Tooltip 
                          content={<CustomTooltip isMobile={isMobile} />}
                        />
                        <Bar dataKey="forecast" fill="#4ade80" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </section>

            <div className="flex flex-col items-center space-y-4 pt-12">
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">AI Summary Score</p>
               <RadarChart 
                  data={{
                    calculated: risk,
                    polling: data?.scores?.automation_risk ?? 0,
                    growth: data?.scores?.growth_potential ?? 0,
                    wages: data?.scores?.wage_score ?? 0,
                    volume: data?.scores?.job_volume ?? 0
                  }} 
                />
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">AI Job Score</p>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-2xl font-black text-yellow-500">★ {(data?.scores?.overall_job_score ?? 0)}/10</span>
                  </div>
                </div>
                {(data?.regional_demand || []).length > 0 && (
                  <div className="w-full bg-[#25282c] border border-white/5 rounded-3xl p-4 md:p-6 h-[400px] flex flex-col">
                    <h4 className="text-lg md:text-xl font-bold mb-6">Regional demand</h4>
                    <div className="flex-grow w-full min-h-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart 
                          layout="vertical" 
                          data={data?.regional_demand || []} 
                          margin={{ top: 5, right: 30, left: isMobile ? 10 : 0, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                          <XAxis type="number" stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} hide />
                          <YAxis 
                            type="category" 
                            dataKey="region" 
                            stroke="#94a3b8" 
                            fontSize={9} 
                            tickLine={false} 
                            axisLine={false} 
                            width={isMobile ? 80 : 70} 
                            tick={isMobile ? <WrappedTick /> : { fill: '#94a3b8' }}
                          />
                          <Tooltip 
                            content={<CustomTooltip isMobile={isMobile} />}
                          />
                          <Bar dataKey="demand" fill="#60a5fa" radius={[0, 4, 4, 0]} barSize={20} />
                        </RechartsBarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
            </div>
          </div>

          {(data?.hiring_trend || []).length > 0 && (
            <section>
              <SectionHeader>Hiring trend (last 12 months)</SectionHeader>
              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-6 md:p-8 h-[350px] md:h-[400px] flex flex-col">
                <div className="flex-grow w-full min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data?.hiring_trend || []} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis 
                        dataKey="month" 
                        stroke="#94a3b8" 
                        fontSize={9} 
                        tickLine={false} 
                        axisLine={false}
                        angle={-45}
                        textAnchor="end"
                        height={50}
                        interval={0}
                      />
                      <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} axisLine={false} width={50} />
                      <Tooltip 
                        content={<CustomTooltip isMobile={isMobile} />}
                      />
                      <Bar name="Job Postings" dataKey="postings" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </section>
          )}

          {(data?.timeline || []).length > 0 && (
            <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8">
              <SectionHeader>Risk timeline</SectionHeader>
              <div className="space-y-4">
                {(data?.timeline || []).map((t, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="text-sm font-bold w-14">{t.year}</div>
                    <div className="flex-1">
                      <div className="text-sm">{t.event}</div>
                      <div className="text-xs text-[#94a3b8]">Risk change: {t.risk_change > 0 ? "+" : ""}{t.risk_change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Job description */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8">
            <SectionHeader>Job description</SectionHeader>
            <p className="text-[#94a3b8] mb-6 leading-relaxed">
              {job.description.startsWith("A ") || job.description.startsWith("An ") 
                ? `${getIndefiniteArticle(job.title)} ${job.description.split(' ').slice(1).join(' ')}`
                : job.description}
            </p>
          </section>

          {/* Next Steps Section */}
          <div className="w-full max-w-md bg-[#25282c] rounded-3xl p-6 md:p-8 border border-white/5 space-y-6 text-center mb-16 mx-auto">
            <h3 className="text-xl font-bold">Where Would You Like to Go Next?</h3>
            
            <div className="space-y-4">
              <p className="text-muted-foreground text-sm px-2">Share your results with friends and family.</p>
              
              <div className="flex flex-wrap justify-center gap-3">
                {isSignedIn ? (
                  <>
                    <a 
                      href={gmailLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 flex items-center justify-center" 
                      title="Share via Gmail"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                    <a 
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all hover:scale-110 flex items-center justify-center" 
                      title="WhatsApp"
                    >
                      <MessageCircle className="h-5 w-5" />
                    </a>
                  </>
                ) : (
                  <SignInButton mode="modal">
                    <button className="px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-sm font-medium transition-all">
                      Login to share results
                    </button>
                  </SignInButton>
                )}
              </div>
            </div>

            <div className="pt-2">
              {isSignedIn ? (
                <button 
                  onClick={() => handleShare("pdf")}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-500/10 border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/20 transition-all"
                >
                  <FileDown className="h-5 w-5" /> Download Analysis PDF
                </button>
              ) : (
                <SignInButton mode="modal">
                  <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-bold hover:bg-white/10 transition-all opacity-50 cursor-pointer">
                    <Download className="h-5 w-5" /> Login to download PDF
                  </button>
                </SignInButton>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-4 px-2">
              <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-sm md:text-base">
                <Search className="h-4 w-4" /> Get results for another job
              </Link>
              <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors text-sm md:text-base">
                <GitCompare className="h-4 w-4" /> Compare to another job
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
