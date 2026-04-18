"use client";

import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { 
  BookOpen, 
  GraduationCap, 
  Trophy, 
  Clock, 
  ChevronRight, 
  CreditCard,
  LayoutDashboard,
  Loader2,
  AlertCircle,
  Award,
  Activity,
  Sparkles,
  ArrowRight,
  Download,
  CheckCircle2
} from "lucide-react";
import toast from "react-hot-toast";

type EnrolledCourse = {
  slug: string;
  title: string;
  thumbnail: string;
  progress: number;
  enrolledAt: string;
  totalModules: number;
  completedModules: number;
};

type Certificate = {
  number: string;
  courseTitle: string;
  courseSlug: string;
  completedAt: string;
  grade: string;
  percentage: number;
};

type RecentActivity = {
  id: string;
  courseTitle: string;
  courseSlug: string;
  score: number;
  totalQuestions: number;
  type: string;
  createdAt: string;
};

type Recommendation = {
  slug: string;
  title: string;
  thumbnail: string;
  level: string;
  tagline: string;
};

type DashboardData = {
  user: {
    credits: number;
  };
  enrolledCourses: EnrolledCourse[];
  certificates: Certificate[];
  recentActivity: RecentActivity[];
  recommendations: Recommendation[];
};

export default function StudentDashboard() {
  const { isLoaded, userId } = useAuth();
  const { user } = useUser();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voucherCode, setVoucherCode] = useState("");
  const [isRedeeming, setIsRedeeming] = useState(false);

  async function fetchDashboardData() {
    if (!userId) return;
    try {
      setLoading(true);
      const res = await fetch("/api/academy/student/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
      setError("Unable to load your dashboard. Please try again later.");
      toast.error("Error loading dashboard");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isLoaded && userId) {
      fetchDashboardData();
    }
  }, [isLoaded, userId]);

  async function handleRedeemVoucher(e: React.FormEvent) {
    e.preventDefault();
    if (!voucherCode.trim() || isRedeeming) return;

    const tid = toast.loading("Redeeming voucher...");
    try {
      setIsRedeeming(true);
      const res = await fetch("/api/academy/student/redeem-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: voucherCode.trim() }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to redeem voucher");
      }

      toast.success(result.message || "Voucher redeemed successfully!", { id: tid });
      setVoucherCode("");
      // Refresh dashboard data to show updated credits
      await fetchDashboardData();
    } catch (err: any) {
      toast.error(err.message || "Invalid voucher code", { id: tid });
    } finally {
      setIsRedeeming(false);
    }
  }

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="h-8 w-8 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center">
        <AlertCircle className="h-12 w-12 text-zinc-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Please Sign In</h1>
        <p className="text-zinc-400 mb-6">You need to be signed in to view your student dashboard.</p>
        <Link 
          href="/sign-in" 
          className="bg-emerald-500 text-black px-6 py-2 rounded-full font-bold hover:bg-emerald-400 transition-all"
        >
          Sign In
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 text-center">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-zinc-400 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-zinc-800 text-white px-6 py-2 rounded-full font-bold hover:bg-zinc-700 transition-all"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="relative pt-32 pb-12 px-6 lg:px-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/10 to-transparent -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-emerald-400 mb-4 font-bold text-xs uppercase tracking-widest">
                <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                <LayoutDashboard size={14} />
                <span>Student Dashboard</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-4">
                HELLO, <span className="text-emerald-500 uppercase">{user?.firstName || "LEARNER"}!</span>
              </h1>
              <p className="text-zinc-400 text-lg max-w-2xl font-medium">
                Your learning hub for AI excellence. You have completed <span className="text-white font-bold">{data?.enrolledCourses.filter(c => c.progress === 100).length} courses</span> so far.
              </p>
            </div>
            
            {/* Credits Card */}
            <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-[40px] p-8 md:w-80 shadow-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Sparkles size={64} className="text-emerald-500" />
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                  <CreditCard size={20} />
                </div>
                <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">Wallet Balance</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-black text-white tracking-tighter">{data?.user.credits || 0}</span>
                <span className="text-sm text-emerald-500 font-black uppercase tracking-widest">Credits</span>
              </div>
              <Link href="/academy" className="mt-6 flex items-center justify-between group/link text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                <span>Enrol in more courses</span>
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={<BookOpen size={24} />} 
            label="Enrolled" 
            value={data?.enrolledCourses.length || 0} 
            sublabel="Courses"
            color="blue"
          />
          <StatCard 
            icon={<Trophy size={24} />} 
            label="Finished" 
            value={data?.enrolledCourses.reduce((acc, c) => acc + c.completedModules, 0) || 0} 
            sublabel="Modules"
            color="amber"
          />
          <StatCard 
            icon={<Award size={24} />} 
            label="Earned" 
            value={data?.certificates.length || 0} 
            sublabel="Certificates"
            color="purple"
          />
          <StatCard 
            icon={<Clock size={24} />} 
            label="Avg Speed" 
            value={`${data?.enrolledCourses.length ? Math.round(data.enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / data.enrolledCourses.length) : 0}%`} 
            sublabel="Progress"
            color="emerald"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Courses & Recommendations */}
          <div className="lg:col-span-8 space-y-12">
            {/* Courses Section */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black tracking-tighter flex items-center gap-3">
                  <GraduationCap className="text-emerald-500" size={32} />
                  CONTINUE LEARNING
                </h2>
                {data?.enrolledCourses && data.enrolledCourses.length > 0 && (
                  <span className="text-xs font-bold bg-white/5 border border-white/10 px-3 py-1 rounded-full text-zinc-400">
                    {data.enrolledCourses.length} TOTAL
                  </span>
                )}
              </div>

              {data?.enrolledCourses.length === 0 ? (
                <div className="bg-zinc-950 border border-dashed border-white/10 rounded-[40px] p-16 text-center">
                  <div className="mx-auto h-20 w-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
                    <BookOpen className="text-zinc-700" size={40} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Your library is empty</h3>
                  <p className="text-zinc-500 max-w-sm mx-auto mb-10">
                    Discover our professional AI courses and start building your future today.
                  </p>
                  <Link 
                    href="/academy" 
                    className="inline-flex bg-emerald-500 text-black px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                  >
                    Explore Courses
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data?.enrolledCourses.map((course) => (
                    <CourseCard key={course.slug} course={course} />
                  ))}
                </div>
              )}
            </section>

            {/* Recommendations Section */}
            {data?.recommendations && data.recommendations.length > 0 && (
              <section className="space-y-6">
                <h2 className="text-2xl font-black tracking-tighter flex items-center gap-3">
                  <Sparkles className="text-amber-400" size={24} />
                  RECOMMENDED FOR YOU
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {data.recommendations.map((rec) => (
                    <Link 
                      key={rec.slug} 
                      href={`/academy/${rec.slug}`}
                      className="group bg-zinc-900/30 border border-white/5 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all"
                    >
                      <div className="aspect-[16/9] relative overflow-hidden">
                        <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                      </div>
                      <div className="p-4">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{rec.level}</span>
                        <h4 className="font-bold text-sm line-clamp-1 mt-1">{rec.title}</h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Activity, Certificates & Voucher */}
          <div className="lg:col-span-4 space-y-8">
            {/* Voucher Redemption */}
            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-6 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 h-24 w-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
              <h3 className="text-sm font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                <CreditCard size={16} className="text-emerald-500" />
                Redeem Voucher
              </h3>
              <form onSubmit={handleRedeemVoucher} className="space-y-3">
                <input 
                  type="text" 
                  placeholder="CODE-XXXX" 
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
                  className="w-full bg-black border border-white/10 rounded-2xl px-5 py-3 text-sm font-mono outline-none focus:border-emerald-500/50 transition-all"
                />
                <button 
                  type="submit"
                  disabled={!voucherCode.trim() || isRedeeming}
                  className="w-full bg-emerald-500 text-black py-3 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50"
                >
                  {isRedeeming ? "Processing..." : "Claim Credits"}
                </button>
              </form>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-[40px] p-8 space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                <Activity size={20} className="text-blue-400" />
                Recent Progress
              </h3>
              <div className="space-y-6">
                {data?.recentActivity && data.recentActivity.length > 0 ? (
                  data.recentActivity.map((activity) => (
                    <div key={activity.id} className="relative pl-6 border-l-2 border-white/5">
                      <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-zinc-900 border-2 border-emerald-500" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          {new Date(activity.createdAt).toLocaleDateString()}
                        </span>
                        <h4 className="text-sm font-bold line-clamp-1">{activity.courseTitle}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded ${activity.score / activity.totalQuestions >= 0.6 ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                            {Math.round((activity.score / activity.totalQuestions) * 100)}% SCORE
                          </span>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">
                            {activity.type === 'module_quiz' ? 'MODULE QUIZ' : 'FINAL EXAM'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-600 text-sm italic py-4">No recent activity yet.</p>
                )}
              </div>
            </div>

            {/* Certificates */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-[40px] p-8 space-y-6">
              <h3 className="text-lg font-black uppercase tracking-widest flex items-center gap-3">
                <Award size={20} className="text-purple-400" />
                Achievements
              </h3>
              <div className="space-y-4">
                {data?.certificates && data.certificates.length > 0 ? (
                  data.certificates.map((cert) => (
                    <div key={cert.number} className="group flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-purple-500/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                          <Trophy size={20} />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold line-clamp-1">{cert.courseTitle}</h4>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">Grade: {cert.grade}</span>
                        </div>
                      </div>
                      <Link 
                        href={`/api/certificates/${cert.number}?download=1`}
                        className="p-2 bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors"
                      >
                        <Download size={16} />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center bg-white/5 rounded-3xl border border-dashed border-white/10">
                    <Award size={32} className="mx-auto text-zinc-800 mb-2" />
                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest px-4">Complete a course to earn certificates</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({ icon, label, value, sublabel, color }: { icon: React.ReactNode, label: string, value: string | number, sublabel: string, color: string }) {
  const colorMap: Record<string, string> = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/5 rounded-[32px] p-6 hover:border-white/20 transition-all group relative overflow-hidden">
      <div className="flex items-start justify-between relative z-10">
        <div>
          <div className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">{label}</div>
          <div className="flex items-baseline gap-2">
            <div className="text-4xl font-black text-white tracking-tighter">{value}</div>
            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{sublabel}</div>
          </div>
        </div>
        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
      <div className={`absolute -bottom-12 -right-12 h-24 w-24 blur-3xl opacity-10 rounded-full ${color === 'blue' ? 'bg-blue-500' : color === 'amber' ? 'bg-amber-500' : color === 'purple' ? 'bg-purple-500' : 'bg-emerald-500'}`} />
    </div>
  );
}

function CourseCard({ course }: { course: EnrolledCourse }) {
  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm border border-white/10 rounded-[40px] overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 flex flex-col h-full shadow-2xl hover:shadow-emerald-500/5">
      {/* Thumbnail */}
      <div className="aspect-[16/10] relative overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${course.progress === 100 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-white/10 text-white border-white/10'}`}>
            {course.progress === 100 ? <CheckCircle2 size={12} /> : <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
            {course.progress === 100 ? "Finished" : "Active"}
          </div>
        </div>
        <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
          <div className="text-[10px] font-black text-white/70 uppercase tracking-widest">
            {course.completedModules} / {course.totalModules} MODULES
          </div>
          <div className="text-xl font-black text-white">{course.progress}%</div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-black tracking-tight mb-6 line-clamp-2 leading-[1.1]">
          {course.title}
        </h3>

        {/* Progress Bar */}
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-8">
          <div 
            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out"
            style={{ width: `${course.progress}%` }}
          />
        </div>

        <Link 
          href={`/academy/${course.slug}`}
          className={`mt-auto w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all duration-300 group/btn ${
            course.progress === 100 
            ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white' 
            : 'bg-white text-black hover:bg-emerald-500 hover:text-white shadow-xl shadow-white/5 hover:shadow-emerald-500/20'
          }`}
        >
          <span>{course.progress === 100 ? "Review Course" : "Resume Course"}</span>
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
