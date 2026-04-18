/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  Eye, EyeOff, Lock, User, ShieldCheck, Search, RefreshCw, XCircle, CheckCircle, 
  Users, Award, Ticket, PlusCircle, LayoutDashboard, LogOut, ChevronRight, Mail, Calendar, GraduationCap, Percent,
  BookOpen, FileText, FolderPlus, Trash2, Edit3, Save, Download, CheckSquare, Square,
  MoveUp, MoveDown, MoveLeft, MoveRight, ZoomIn, ZoomOut, Settings, CreditCard,
  TrendingUp, BarChart2, PieChart as PieChartIcon, Activity, DollarSign
} from "lucide-react";
import toast from "react-hot-toast";
import { generateCertificateNumber } from "@/lib/certificates-shared";
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

export type AnalyticsData = {
  stats: {
    totalUsers: number;
    totalEnrollments: number;
    totalCertificates: number;
    totalRevenue: number;
  };
  enrollmentsOverTime: Array<{ date: string; count: number }>;
  courseDistribution: Array<{ courseSlug: string; count: number }>;
  quizPerformance: Array<{ courseSlug: string; avgScore: number }>;
  recentEnrollments: Array<{
    id: string;
    user_id: string;
    course_slug: string;
    amount: number;
    created_at: string;
  }>;
};

export type AdminCert = {
  certificate_number: string;
  recipient_name: string;
  recipient_email: string;
  course_title: string;
  grade: string;
  percentage: number;
  completed_at: string;
  email_status: string;
  email_sent_at: string | null;
  updated_at: string;
};

export type AdminUser = {
  id: string;
  clerk_user_id: string;
  email: string | null;
  full_name: string | null;
  image_url: string | null;
  credits: number;
  created_at: string;
};

export type AdminCoupon = {
  id: string;
  code: string;
  course_slug: string | null;
  discount_percentage: number;
  is_active: number;
  usage_limit: number;
  usage_count: number;
  created_at: string;
};

export type Section = "certificates" | "users" | "coupons" | "generator" | "courses" | "editor" | "analytics";

export type CourseModuleDraft = {
  module_id: string;
  title: string;
  description: string;
  notes_url: string;
  quiz?: any[];
};

export type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  isStatic?: boolean;
  modules: CourseModuleDraft[];
};

function toBasic(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

export default function AdminPage() {
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<AdminCert[]>([]);
  const [usersList, setUsersList] = useState<AdminUser[]>([]);
  const [couponsList, setCouponsList] = useState<AdminCoupon[]>([]);
  const [query, setQuery] = useState("");
  const [couponStatusFilter, setCouponStatusFilter] = useState<"all" | "active" | "expired">("all");
  const [activeSection, setActiveSection] = useState<Section>("certificates");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  async function loadAnalytics() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/analytics", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || "Failed to load analytics");
      }
      const data = await res.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error(err);
      toast.error(err instanceof Error ? err.message : "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  // Coupon management state
  const [couponDraft, setCouponDraft] = useState({
    type: "coupon" as "coupon" | "voucher",
    discountPercentage: 10,
    usageLimit: 1, // Default to 1 as per user request
    count: 1,
    courseSlug: "", // Default to all courses
  });
  const [selectedCouponIds, setSelectedCouponIds] = useState<string[]>([]);

  async function loadCoupons() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to load coupons (${res.status})`);
      }
      const data = await res.json();
      setCouponsList(data);
    } catch (err) {
      console.error("Load Coupons Error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to load coupons");
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!authHeader) return;
    const isBulk = couponDraft.count > 1;
    const tid = toast.loading(isBulk ? `Generating ${couponDraft.count} codes...` : "Generating code...");
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": authHeader,
        },
        body: JSON.stringify(couponDraft),
      });
      if (!res.ok) throw new Error("Failed to generate");
      toast.success(isBulk ? `${couponDraft.count} codes generated!` : "Code generated!", { id: tid });
      loadCoupons();
    } catch (err) {
      toast.error("Failed to generate", { id: tid });
    }
  }

  async function handleDeleteCoupon(id: string) {
    if (!authHeader || !confirm("Are you sure?")) return;
    const tid = toast.loading("Deleting...");
    try {
      const res = await fetch(`/api/admin/coupons?ids=${id}`, {
        method: "DELETE",
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Deleted", { id: tid });
      loadCoupons();
      setSelectedCouponIds(prev => prev.filter(sid => sid !== id));
    } catch (err) {
      toast.error("Failed to delete", { id: tid });
    }
  }

  async function handleBulkDeleteCoupons() {
    if (!authHeader || selectedCouponIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedCouponIds.length} coupons?`)) return;
    
    const tid = toast.loading(`Deleting ${selectedCouponIds.length} coupons...`);
    try {
      const res = await fetch(`/api/admin/coupons?ids=${selectedCouponIds.join(",")}`, {
        method: "DELETE",
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("Bulk delete failed");
      toast.success(`Deleted ${selectedCouponIds.length} coupons`, { id: tid });
      loadCoupons();
      setSelectedCouponIds([]);
    } catch (err) {
      toast.error("Failed to perform bulk delete", { id: tid });
    }
  }

  async function handleDownloadCouponsPDF() {
    const couponsToDownload = selectedCouponIds.length > 0 
      ? couponsList.filter(c => selectedCouponIds.includes(c.id))
      : filteredCoupons;

    if (couponsToDownload.length === 0) {
      toast.error("No coupons to download");
      return;
    }

    const tid = toast.loading("Generating PDF...");
    try {
      const { downloadCouponsPDF } = await import("@/lib/pdf-generator");
      await downloadCouponsPDF(couponsToDownload, courseList);
      toast.success("PDF Downloaded", { id: tid });
    } catch (err) {
      console.error("PDF Generation Error:", err);
      toast.error("Failed to generate PDF", { id: tid });
    }
  }

  // Course management state
  const [courseList, setCourseList] = useState<AdminCourse[]>([]);

  // Editor state
  const [editorCoords, setEditorCoords] = useState({
     name: { x: 208.625, y: 120, size: 12 },
     title: { x: 209.625, y: 149, size: 14 },
     date: { x: 159, y: 203, size: 5.5 },
     grade: { x: 224.625, y: 203, size: 6 },
     number: { x: 320, y: 203, size: 5.5 },
   });
  const [editorSvg, setEditorSvg] = useState<string | null>(null);
  const [editorLoading, setEditorLoading] = useState(false);

  async function updateEditorPreview() {
    if (!authHeader) return;
    setEditorLoading(true);
    try {
      const res = await fetch("/api/admin/certificates/preview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": authHeader,
        },
        body: JSON.stringify({
          coordinates: editorCoords,
          data: {
            recipientName: "Sathwik Kamath",
            courseTitle: "AI FOR BEGINNERS",
            certificateNumber: "AIVSMEFDB235",
            grade: "A+",
            percentage: 100,
          }
        }),
      });
      const data = await res.json();
      if (data.svg) setEditorSvg(data.svg);
    } catch (err) {
      console.error(err);
    } finally {
      setEditorLoading(false);
    }
  }

  useEffect(() => {
    if (activeSection === "editor" && authHeader) {
      updateEditorPreview();
    }
  }, [editorCoords, activeSection, authHeader]);

  const moveField = (field: keyof typeof editorCoords, axis: 'x' | 'y' | 'size', delta: number) => {
    setEditorCoords(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [axis]: Number((prev[field][axis] + delta).toFixed(3))
      }
    }));
  };
  const [courseDraft, setCourseDraft] = useState({
    id: "",
    title: "",
    slug: "",
    description: "",
  });
  const [moduleDrafts, setModuleDrafts] = useState<CourseModuleDraft[]>([]);

  const handleEditCourse = (course: AdminCourse) => {
    setCourseDraft({
      id: course.id,
      title: course.title,
      slug: course.slug,
      description: course.description || "",
    });
    setModuleDrafts(course.modules.map(m => ({
      module_id: m.module_id,
      title: m.title,
      description: m.description || "",
      notes_url: m.notes_url || "",
      quiz: m.quiz || [],
    })));
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteCourse = async (id: string) => {
    if (!authHeader || !confirm("Are you sure you want to delete this course?")) return;
    const tid = toast.loading("Deleting course...");
    try {
      const res = await fetch(`/api/admin/courses?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Course deleted", { id: tid });
      loadCourses();
    } catch (err) {
      toast.error("Failed to delete", { id: tid });
    }
  };

  const addModuleRow = () => {
    setModuleDrafts([...moduleDrafts, { module_id: "", title: "", description: "", notes_url: "" }]);
  };

  const updateModuleRow = (index: number, field: keyof CourseModuleDraft, value: string) => {
    const updated = [...moduleDrafts];
    updated[index] = { ...updated[index], [field]: value };
    setModuleDrafts(updated);
  };

  const removeModuleRow = (index: number) => {
    setModuleDrafts(moduleDrafts.filter((_, i) => i !== index));
  };

  // Generator state
  const [genData, setGenData] = useState({
    recipientName: "",
    recipientEmail: "",
    courseTitle: "AI for Engineers",
    courseSlug: "ai-for-engineers",
    grade: "A",
    percentage: "95",
    completedAt: new Date().toISOString().split('T')[0],
    certificateNumber: ""
  });

  const activeTemplate = COURSE_TEMPLATES[genData.courseSlug] || COURSE_TEMPLATES["ai-for-engineers"];

  useEffect(() => {
    if (!genData.certificateNumber) {
      setGenData(prev => ({ ...prev, certificateNumber: generateCertificateNumber() }));
    }
  }, [genData.certificateNumber]);

  const filteredCerts = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (c: AdminCert) =>
        c.certificate_number.toLowerCase().includes(q) ||
        c.recipient_name.toLowerCase().includes(q) ||
        c.course_title.toLowerCase().includes(q) ||
        c.email_status.toLowerCase().includes(q)
    );
  }, [items, query]);

  const filteredUsers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return usersList;
    return usersList.filter(
      (u: AdminUser) =>
        (u.full_name?.toLowerCase() || "").includes(q) ||
        (u.email?.toLowerCase() || "").includes(q)
    );
  }, [usersList, query]);

  const filteredCoupons = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = couponsList;

    if (couponStatusFilter === "active") {
      list = list.filter(c => c.is_active === 1 && (c.usage_limit === -1 || c.usage_count < c.usage_limit));
    } else if (couponStatusFilter === "expired") {
      list = list.filter(c => c.is_active === 0 || (c.usage_limit !== -1 && c.usage_count >= c.usage_limit));
    }

    if (!q) return list;
    return list.filter(
      (c: AdminCoupon) =>
        c.code.toLowerCase().includes(q)
    );
  }, [couponsList, query, couponStatusFilter]);

  async function handleUpdateCredits(userId: string, currentCredits: number) {
    const newCredits = prompt(`Update credits for ${userId}:`, currentCredits.toString());
    if (newCredits === null) return;
    const creditsNum = parseInt(newCredits);
    if (isNaN(creditsNum)) {
      alert("Please enter a valid number");
      return;
    }

    const tid = toast.loading("Updating credits...");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": authHeader!,
        },
        body: JSON.stringify({ userId, credits: creditsNum }),
      });

      if (!res.ok) throw new Error("Failed to update credits");
      toast.success("Credits updated", { id: tid });
      loadUsers();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update credits", { id: tid });
    }
  }

  async function loadCertificates() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("Failed to load certificates");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load certificates");
    } finally {
      setLoading(false);
    }
  }

  async function loadUsers() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsersList(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  async function loadCourses() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/courses", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || `Failed to load courses: ${res.status}`);
      }
      const data = await res.json();
      setCourseList(data);
    } catch (err) {
      console.error("Course load error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddCourse(e: React.FormEvent) {
    e.preventDefault();
    if (!authHeader) return;
    
    if (!courseDraft.title || !courseDraft.slug) {
      toast.error("Title and Slug are required");
      return;
    }

    const tid = toast.loading(courseDraft.id ? "Updating course..." : "Adding course...");
    try {
      const res = await fetch("/api/admin/courses", {
        method: courseDraft.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": authHeader,
        },
        body: JSON.stringify({
          ...courseDraft,
          modules: moduleDrafts,
        }),
      });

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        throw new Error(errBody.error || "Failed to save course");
      }
      
      toast.success(courseDraft.id ? "Course updated!" : "Course added!", { id: tid });
      setCourseDraft({ id: "", title: "", slug: "", description: "" });
      setModuleDrafts([]);
      loadCourses();
    } catch (err) {
      console.error("Save course error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save course", { id: tid });
    }
  }

  useEffect(() => {
    if (authHeader) {
      if (activeSection === "certificates") loadCertificates();
      if (activeSection === "users") loadUsers();
      if (activeSection === "courses") loadCourses();
      if (activeSection === "coupons") loadCoupons();
      if (activeSection === "analytics") loadAnalytics();
    }
  }, [authHeader, activeSection]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const header = toBasic(username, password);
    setLoading(true);
    const tid = toast.loading("Verifying credentials...");
    try {
      const res = await fetch("/api/admin/certificates", {
        headers: { "x-admin-auth": header },
      });
      if (res.status === 401) {
        toast.error("Invalid username or password", { id: tid });
        return;
      }
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setItems(data);
      setAuthHeader(header);
      toast.success("Welcome, Admin!", { id: tid });
    } catch (err) {
      console.error(err);
      toast.error("An error occurred during login", { id: tid });
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    if (!authHeader) return;
    const tid = toast.loading("Generating certificate...");
    try {
      const res = await fetch("/api/admin/generate-certificate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-auth": authHeader
        },
        body: JSON.stringify(genData)
      });
      const payload: unknown = await res.json().catch(() => null);
      const payloadRecord =
        payload && typeof payload === "object" ? (payload as Record<string, unknown>) : {};
      if (!res.ok) {
        const message =
          typeof payloadRecord.error === "string" && payloadRecord.error
            ? payloadRecord.error
            : "Failed to generate certificate";
        throw new Error(message);
      }
      const generatedNumber =
        typeof payloadRecord.certificateNumber === "string" && payloadRecord.certificateNumber
          ? payloadRecord.certificateNumber
          : genData.certificateNumber;
      const downloadUrl =
        typeof payloadRecord.downloadUrl === "string" && payloadRecord.downloadUrl
          ? payloadRecord.downloadUrl
          : `/api/certificates/${generatedNumber}?download=1`;

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `${generatedNumber}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Certificate generated and downloaded!", { id: tid });
      setGenData(prev => ({ ...prev, certificateNumber: generateCertificateNumber() }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Generation failed", { id: tid });
    }
  }

  if (!mounted) return null;

  if (!authHeader) {
    return (
      <section className="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 pt-32 pb-20">
        <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 p-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
          
          <div className="relative mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
              <ShieldCheck className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Admin login</h1>
            <p className="mt-2 text-sm text-zinc-400">Secure access to management console</p>
          </div>

          <form onSubmit={login} className="relative space-y-4">
            <div className="group relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/50 pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-white/20 focus:bg-zinc-900 transition-all"
                required
              />
            </div>

            <div className="group relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-white transition-colors">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-900/50 pl-11 pr-12 py-3.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-white/20 focus:bg-zinc-900 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-4 text-zinc-500 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-bold text-black hover:bg-zinc-200 transition-colors"
            >
              Sign in to Dashboard
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/10 bg-zinc-950 flex flex-col fixed inset-y-0 left-0 pt-32 z-40">
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
              <ShieldCheck className="text-white h-6 w-6" />
            </div>
            <span className="font-bold text-lg tracking-tight truncate">AIVSME Admin</span>
          </div>

          <nav className="space-y-2">
            <SidebarItem 
              icon={<Activity size={20} />} 
              label="Analytics" 
              active={activeSection === "analytics"} 
              onClick={() => setActiveSection("analytics")}
            />
            <SidebarItem 
              icon={<LayoutDashboard size={20} />} 
              label="Certificates" 
              active={activeSection === "certificates"} 
              onClick={() => setActiveSection("certificates")}
            />
            <SidebarItem 
              icon={<Users size={20} />} 
              label="Users" 
              active={activeSection === "users"} 
              onClick={() => setActiveSection("users")}
            />
            <SidebarItem 
              icon={<PlusCircle size={20} />} 
              label="Generator" 
              active={activeSection === "generator"} 
              onClick={() => setActiveSection("generator")}
            />
            <SidebarItem 
              icon={<Ticket size={20} />} 
              label="Coupons" 
              active={activeSection === "coupons"} 
              onClick={() => setActiveSection("coupons")}
            />
            <SidebarItem 
              icon={<BookOpen size={20} />} 
              label="Courses" 
              active={activeSection === "courses"} 
              onClick={() => setActiveSection("courses")}
            />
            <SidebarItem 
              icon={<Settings size={20} />} 
              label="Cert Editor" 
              active={activeSection === "editor"} 
              onClick={() => setActiveSection("editor")}
            />
          </nav>
        </div>

        <div className="p-6 border-t border-white/10 mt-auto">
          <button 
            onClick={() => setAuthHeader(null)}
            className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors w-full px-2 py-3"
          >
            <LogOut size={20} />
            <span className="font-medium">Sign out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8 pt-36">
        <div className="max-w-6xl mx-auto">
          {activeSection === "analytics" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Platform Analytics</h1>
                  <p className="text-zinc-400 mt-1">Real-time overview of enrollments, revenue, and performance</p>
                </div>
                <button onClick={loadAnalytics} className="p-2 hover:bg-white/5 rounded-xl border border-white/10 transition-colors">
                  <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  icon={<Users className="text-blue-400" />} 
                  label="Total Users" 
                  value={analyticsData?.stats.totalUsers.toLocaleString() || "0"} 
                  trend="+12%" 
                />
                <StatCard 
                  icon={<BookOpen className="text-purple-400" />} 
                  label="Enrollments" 
                  value={analyticsData?.stats.totalEnrollments.toLocaleString() || "0"} 
                  trend="+8%" 
                />
                <StatCard 
                  icon={<Award className="text-emerald-400" />} 
                  label="Certificates" 
                  value={analyticsData?.stats.totalCertificates.toLocaleString() || "0"} 
                  trend="+5%" 
                />
                <StatCard 
                  icon={<DollarSign className="text-amber-400" />} 
                  label="Total Revenue" 
                  value={`₹${analyticsData?.stats.totalRevenue.toLocaleString() || "0"}`} 
                  trend="+15%" 
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Enrollments Over Time */}
                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <TrendingUp size={20} className="text-blue-400" />
                      Enrollments (30 Days)
                    </h2>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData?.enrollmentsOverTime || []}>
                        <defs>
                          <linearGradient id="colorEnroll" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis 
                          dataKey="date" 
                          stroke="#71717a" 
                          fontSize={12} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(str) => {
                            const date = new Date(str);
                            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                          }}
                        />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEnroll)" strokeWidth={2} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Course Distribution */}
                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <PieChartIcon size={20} className="text-purple-400" />
                      Course Distribution
                    </h2>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={analyticsData?.courseDistribution || []}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="count"
                          nameKey="courseSlug"
                        >
                          {(analyticsData?.courseDistribution || []).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#ef4444'][index % 5]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Legend verticalAlign="bottom" height={36}/>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Quiz Performance */}
                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <BarChart2 size={20} className="text-emerald-400" />
                      Avg Quiz Scores (%)
                    </h2>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analyticsData?.quizPerformance || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                        <XAxis dataKey="courseSlug" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#09090b', border: '1px solid #ffffff10', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="avgScore" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Activity size={20} className="text-amber-400" />
                      Recent Enrollments
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {analyticsData?.recentEnrollments?.map((enr, i) => (
                      <div key={enr.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold text-xs">
                            {enr.course_slug?.substring(0, 2).toUpperCase() || "AC"}
                          </div>
                          <div>
                            <div className="font-bold text-sm truncate max-w-[150px]">{enr.course_slug}</div>
                            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">{new Date(enr.created_at).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-emerald-400 text-sm">₹{enr.amount / 100}</div>
                          <div className="text-[10px] text-zinc-500">PAID</div>
                        </div>
                      </div>
                    ))}
                    {(!analyticsData?.recentEnrollments || analyticsData.recentEnrollments.length === 0) && (
                      <div className="py-12 text-center text-zinc-600 italic">No recent activity.</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "certificates" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Certificates</h1>
                  <p className="text-zinc-400 mt-1">Manage all issued academy certificates</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-white/20"
                    />
                  </div>
                  <button onClick={loadCertificates} className="p-2 hover:bg-white/5 rounded-xl border border-white/10">
                    <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
                  </button>
                </div>
              </div>

              <div className="bg-zinc-950 border border-white/10 rounded-[32px] overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="bg-white/5 text-zinc-400 border-b border-white/10">
                      <th className="p-6 font-medium">ID</th>
                      <th className="p-6 font-medium">Recipient</th>
                      <th className="p-6 font-medium">Course</th>
                      <th className="p-6 font-medium">Result & Dates</th>
                      <th className="p-6 font-medium text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCerts.map((c: AdminCert) => {
                      const date = new Date(c.completed_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      });
                      const isRevoked = c.email_status?.toLowerCase() === "revoked";
                      const completionDate = new Date(c.completed_at);
                      const expiryDate = new Date(completionDate);
                      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
                      const isExpired = new Date() > expiryDate;

                      return (
                        <tr key={c.certificate_number} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="p-6 font-mono text-zinc-300">
                            {c.certificate_number}
                          </td>
                          <td className="p-6">
                            <div className="font-semibold text-white">{c.recipient_name}</div>
                            <div className="text-xs text-zinc-500">{c.recipient_email}</div>
                          </td>
                          <td className="p-6">
                            <div className="font-medium text-white">{c.course_title}</div>
                          </td>
                          <td className="p-6">
                            <div className="text-white">{c.grade} ({c.percentage}%)</div>
                            <div className="flex flex-col text-xs mt-1">
                              <span className="text-zinc-500">Issued: {date}</span>
                              <span className={isExpired ? "text-red-400 font-medium" : "text-zinc-500"}>
                                Expires: {expiryDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                              </span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <div className="flex flex-col items-center gap-2">
                              <span
                                className={
                                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider " +
                                  (isRevoked ? "bg-red-500/10 text-red-400 border border-red-500/20" : 
                                   isExpired ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" :
                                   "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20")
                                }
                              >
                                {isRevoked ? (
                                  <>
                                    <XCircle size={12} />
                                    Revoked
                                  </>
                                ) : isExpired ? (
                                  <>
                                    <XCircle size={12} />
                                    Expired
                                  </>
                                ) : (
                                  <>
                                    <CheckCircle size={12} />
                                    {c.email_status || "Active"}
                                  </>
                                )}
                              </span>
                              <a
                                href={`/api/certificates/${c.certificate_number}?download=1`}
                                download={`${c.certificate_number}.pdf`}
                                className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-[11px] font-semibold text-zinc-200 transition hover:bg-white/10 border border-white/10"
                              >
                                <FileText size={12} />
                                PDF
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Enrolled Users</h1>
                  <p className="text-zinc-400 mt-1">Total users registered on the platform</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search users..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="bg-zinc-900 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-white/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((u: AdminUser) => (
                  <div key={u.id} className="bg-zinc-950 border border-white/10 rounded-[24px] p-6 flex flex-col gap-4 hover:border-white/20 transition-all">
                    <div className="flex items-center gap-4">
                      <img src={u.image_url || "/avatar-placeholder.png"} className="h-12 w-12 rounded-full border border-white/10" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="font-bold truncate">{u.full_name || "Anonymous User"}</div>
                        <div className="text-xs text-zinc-500 truncate">{u.email}</div>
                        <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">Joined {new Date(u.created_at).toLocaleDateString()}</div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <CreditCard size={14} />
                        </div>
                        <div className="text-sm font-bold">{u.credits} Credits</div>
                      </div>
                      <button 
                        onClick={() => handleUpdateCredits(u.clerk_user_id, u.credits)}
                        className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                      >
                        Edit Credits
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "generator" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Certificate Generator</h1>
                <form onSubmit={handleGenerate} className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        value={genData.recipientName}
                        onChange={e => setGenData({...genData, recipientName: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="john@example.com"
                        value={genData.recipientEmail}
                        onChange={e => setGenData({...genData, recipientEmail: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Course Title</label>
                    <select 
                      value={genData.courseTitle}
                      onChange={e => {
                        const title = e.target.value;
                        const slug = title.toLowerCase().replace(/ /g, '-');
                        setGenData({...genData, courseTitle: title, courseSlug: slug});
                      }}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20 appearance-none"
                    >
                      <option value="AI for Engineers">AI for Engineers</option>
                      <option value="AI for Beginners">AI for Beginners</option>
                      <option value="AI for Advanced Learners">AI for Advanced Learners</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Grade</label>
                      <input 
                        type="text" 
                        value={genData.grade}
                        onChange={e => setGenData({...genData, grade: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Percentage</label>
                      <input 
                        type="number" 
                        value={genData.percentage}
                        onChange={e => setGenData({...genData, percentage: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Date</label>
                      <input 
                        type="date" 
                        value={genData.completedAt}
                        onChange={e => setGenData({...genData, completedAt: e.target.value})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Certificate Number (Auto)</label>
                    <input 
                      type="text" 
                      readOnly
                      value={genData.certificateNumber}
                      className="w-full bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-zinc-500 outline-none"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                  >
                    <Award size={20} />
                    Issue Certificate
                  </button>
                </form>
              </div>

              <div className="space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Eye size={20} /> Live Preview
                </h2>
                <div className="bg-zinc-900/50 border border-white/10 rounded-[32px] aspect-[1.414/1] relative overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Background Template */}
                    <img 
                      src={activeTemplate.image} 
                      alt="Certificate Template" 
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Dynamic Overlays */}
                    <div 
                      className="absolute font-serif font-bold italic text-black text-center -translate-x-1/2 -translate-y-1/2"
                      style={{ 
                        left: activeTemplate.coords.name.x, 
                        top: activeTemplate.coords.name.y, 
                        fontSize: `${activeTemplate.coords.name.size * 0.9}px`,
                        width: '80%'
                      }}
                    >
                      {genData.recipientName || "Recipient Name"}
                    </div>

                    <div 
                      className="absolute font-serif font-bold text-black -translate-y-1/2"
                      style={{ 
                        left: activeTemplate.coords.date.x, 
                        top: activeTemplate.coords.date.y, 
                        fontSize: `${activeTemplate.coords.date.size * 0.9}px` 
                      }}
                    >
                      {new Date(genData.completedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>

                    <div 
                      className="absolute font-serif font-bold text-black -translate-y-1/2"
                      style={{ 
                        left: activeTemplate.coords.grade.x, 
                        top: activeTemplate.coords.grade.y, 
                        fontSize: `${activeTemplate.coords.grade.size * 0.9}px` 
                      }}
                    >
                      {genData.grade} ({genData.percentage}%)
                    </div>

                    <div 
                      className="absolute font-mono font-bold text-black -translate-y-1/2"
                      style={{ 
                        left: activeTemplate.coords.number.x, 
                        top: activeTemplate.coords.number.y, 
                        fontSize: `${activeTemplate.coords.number.size * 0.9}px` 
                      }}
                    >
                      {genData.certificateNumber}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex gap-3 text-blue-400">
                  <LayoutDashboard size={20} />
                  <p className="text-xs leading-relaxed">The generator creates a permanent record in the database. The recipient will be able to download their PDF/SVG certificate using the ID provided.</p>
                </div>
              </div>
            </div>
          )}

          {activeSection === "coupons" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Coupon Management</h1>
                  <p className="text-zinc-400 mt-1">Generate and manage course discount codes</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-zinc-950 border border-white/10 rounded-2xl p-1">
                    <button 
                      onClick={() => setCouponStatusFilter("all")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${couponStatusFilter === "all" ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                      All
                    </button>
                    <button 
                      onClick={() => setCouponStatusFilter("active")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${couponStatusFilter === "active" ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                      Active
                    </button>
                    <button 
                      onClick={() => setCouponStatusFilter("expired")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${couponStatusFilter === "expired" ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}
                    >
                      Expired
                    </button>
                  </div>
                  <div className="relative w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search codes..."
                      value={query}
                      onChange={e => setQuery(e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Generator Form */}
                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <PlusCircle size={20} /> Generate New
                  </h2>
                  <form onSubmit={handleGenerateCoupon} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Type</label>
                      <select 
                        value={couponDraft.type}
                        onChange={e => setCouponDraft({...couponDraft, type: e.target.value as any})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20 appearance-none"
                      >
                        <option value="coupon">100% Coupon (AIVSMEC)</option>
                        <option value="voucher">Custom % Voucher (AIVSMEV)</option>
                      </select>
                    </div>

                    {couponDraft.type === "coupon" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Applicable Course</label>
                        <select 
                          value={couponDraft.courseSlug}
                          onChange={e => setCouponDraft({...couponDraft, courseSlug: e.target.value})}
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20 appearance-none"
                        >
                          <option value="">All Courses</option>
                          {courseList.map(c => (
                            <option key={c.id} value={c.slug}>{c.title}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {couponDraft.type === "voucher" && (
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Credits</label>
                        <input 
                          type="number" 
                          min="1"
                          value={couponDraft.discountPercentage}
                          onChange={e => setCouponDraft({...couponDraft, discountPercentage: parseInt(e.target.value) || 1})}
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                        <p className="text-[10px] text-zinc-500 ml-1">Number of course credits granted</p>
                      </div>
                    )}

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Usage Limit</label>
                      <input 
                        type="number" 
                        min="-1"
                        value={couponDraft.usageLimit}
                        onChange={e => setCouponDraft({...couponDraft, usageLimit: parseInt(e.target.value) || -1})}
                        placeholder="-1 for unlimited"
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                      <p className="text-[10px] text-zinc-500 ml-1">-1 for unlimited uses</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Quantity (Max 500)</label>
                      <input 
                        type="number" 
                        min="1"
                        max="500"
                        value={couponDraft.count}
                        onChange={e => setCouponDraft({...couponDraft, count: Math.min(Math.max(parseInt(e.target.value) || 1, 1), 500)})}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                      />
                      <p className="text-[10px] text-zinc-500 ml-1">Generate multiple codes at once</p>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                    >
                      <Ticket size={20} />
                      Generate Code
                    </button>
                  </form>
                </div>

                {/* Coupons List */}
                <div className="lg:col-span-2 bg-zinc-950 border border-white/10 rounded-[32px] p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-bold">Existing Codes</h2>
                      {selectedCouponIds.length > 0 && (
                        <div className="px-2 py-1 bg-white text-black text-[10px] font-bold rounded-md">
                          {selectedCouponIds.length} SELECTED
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCouponIds.length > 0 && (
                        <button 
                          onClick={handleBulkDeleteCoupons} 
                          className="text-xs px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg border border-red-500/20 font-bold transition-all flex items-center gap-1.5"
                        >
                          <Trash2 size={14} /> Delete Selected
                        </button>
                      )}
                      <button 
                        onClick={handleDownloadCouponsPDF} 
                        className="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 font-bold transition-all flex items-center gap-1.5"
                      >
                        <Download size={14} /> Download PDF
                      </button>
                      {filteredCoupons.length > 0 && (
                        <button 
                          onClick={() => {
                            const codes = filteredCoupons.map(c => c.code).join('\n');
                            navigator.clipboard.writeText(codes);
                            toast.success("Filtered codes copied to clipboard");
                          }} 
                          className="text-xs px-3 py-1.5 hover:bg-white/5 rounded-lg border border-white/10 font-bold"
                        >
                          Copy All
                        </button>
                      )}
                      <button onClick={loadCoupons} className="p-2 hover:bg-white/5 rounded-lg border border-white/10">
                        <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                      </button>
                    </div>
                  </div>

                  {filteredCoupons.length > 0 && (
                    <div className="mb-4 flex items-center gap-2 px-2">
                      <button 
                        onClick={() => {
                          if (selectedCouponIds.length === filteredCoupons.length) {
                            setSelectedCouponIds([]);
                          } else {
                            setSelectedCouponIds(filteredCoupons.map(c => c.id));
                          }
                        }}
                        className="text-[10px] font-bold uppercase text-zinc-500 hover:text-white transition-colors"
                      >
                        {selectedCouponIds.length === filteredCoupons.length ? 'Deselect All' : 'Select All Filtered'}
                      </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    {filteredCoupons.length === 0 ? (
                      <div className="py-12 text-center text-zinc-600 italic">No coupons found.</div>
                    ) : (
                      filteredCoupons.map((c) => {
                        const isExpired = c.is_active === 0 || (c.usage_limit !== -1 && c.usage_count >= c.usage_limit);
                        const isSelected = selectedCouponIds.includes(c.id);

                        return (
                          <div 
                            key={c.id} 
                            onClick={() => {
                              setSelectedCouponIds(prev => 
                                prev.includes(c.id) 
                                  ? prev.filter(id => id !== c.id) 
                                  : [...prev, c.id]
                              );
                            }}
                            className={`flex items-center justify-between p-4 border rounded-2xl transition-all cursor-pointer group ${
                              isSelected 
                                ? 'bg-white/5 border-white/20' 
                                : 'bg-zinc-900/50 border-white/5 hover:border-white/10'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`transition-colors ${isSelected ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                              </div>
                              <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                                isExpired 
                                  ? 'bg-zinc-800 text-zinc-500' 
                                  : (c.code.startsWith('AIVSMEC') ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400')
                              }`}>
                                <Percent size={20} />
                              </div>
                              <div>
                                <div className={`font-mono font-bold text-lg ${isExpired ? 'line-through text-zinc-600' : ''}`}>
                                  {c.code}
                                </div>
                                <div className="text-xs text-zinc-500 flex items-center gap-2">
                                  {c.code.startsWith('AIVSMEV') ? `${c.discount_percentage} Credits` : `${c.discount_percentage}% off`} • Used {c.usage_count} / {c.usage_limit === -1 ? '∞' : c.usage_limit}
                                  {c.course_slug && (
                                    <span className="px-1.5 py-0.5 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded border border-blue-500/20 uppercase tracking-tighter">
                                      {courseList.find(course => course.slug === c.course_slug)?.title || c.course_slug}
                                    </span>
                                  )}
                                  {isExpired && (
                                    <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 text-[10px] font-bold rounded border border-red-500/20 uppercase tracking-tighter">
                                      {c.is_active === 0 ? "Inactive/Expired" : "Expired"}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteCoupon(c.id);
                              }}
                              className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "editor" && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">Certificate Editor</h1>
                  <button 
                    onClick={() => {
                      const code = `default: {\n    name: { x: ${editorCoords.name.x}, y: ${editorCoords.name.y}, size: ${editorCoords.name.size} },\n    title: { x: ${editorCoords.title.x}, y: ${editorCoords.title.y}, size: ${editorCoords.title.size} },\n    date: { x: ${editorCoords.date.x}, y: ${editorCoords.date.y}, size: ${editorCoords.date.size} },\n    grade: { x: ${editorCoords.grade.x}, y: ${editorCoords.grade.y}, size: ${editorCoords.grade.size} },\n    number: { x: ${editorCoords.number.x}, y: ${editorCoords.number.y}, size: ${editorCoords.number.size} },\n  },`;
                      navigator.clipboard.writeText(code);
                      toast.success("Coordinates copied to clipboard!");
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs hover:bg-emerald-600 transition-all"
                  >
                    <Save size={14} /> Copy Coordinates
                  </button>
                </div>

                <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-8">
                  {(Object.keys(editorCoords) as Array<keyof typeof editorCoords>).map((field) => (
                    <div key={field} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">{field} Field</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500">X: {editorCoords[field].x}</span>
                          <span className="text-[10px] font-mono text-zinc-500">Y: {editorCoords[field].y}</span>
                          <span className="text-[10px] font-mono text-zinc-500">S: {editorCoords[field].size}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">Position X</label>
                          <div className="flex items-center gap-1 bg-zinc-900 rounded-xl p-1 border border-white/5">
                            <button onClick={() => moveField(field, 'x', -1)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><MoveLeft size={16} /></button>
                            <input 
                              type="number" 
                              value={editorCoords[field].x} 
                              onChange={(e) => moveField(field, 'x', parseFloat(e.target.value) - editorCoords[field].x)}
                              className="w-full bg-transparent text-center text-xs font-mono outline-none"
                            />
                            <button onClick={() => moveField(field, 'x', 1)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><MoveRight size={16} /></button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">Position Y</label>
                          <div className="flex items-center gap-1 bg-zinc-900 rounded-xl p-1 border border-white/5">
                            <button onClick={() => moveField(field, 'y', -1)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><MoveUp size={16} /></button>
                            <input 
                              type="number" 
                              value={editorCoords[field].y} 
                              onChange={(e) => moveField(field, 'y', parseFloat(e.target.value) - editorCoords[field].y)}
                              className="w-full bg-transparent text-center text-xs font-mono outline-none"
                            />
                            <button onClick={() => moveField(field, 'y', 1)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><MoveDown size={16} /></button>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold text-zinc-600 uppercase ml-1">Font Size</label>
                          <div className="flex items-center gap-1 bg-zinc-900 rounded-xl p-1 border border-white/5">
                            <button onClick={() => moveField(field, 'size', -0.5)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><ZoomOut size={16} /></button>
                            <input 
                              type="number" 
                              value={editorCoords[field].size} 
                              onChange={(e) => moveField(field, 'size', parseFloat(e.target.value) - editorCoords[field].size)}
                              className="w-full bg-transparent text-center text-xs font-mono outline-none"
                            />
                            <button onClick={() => moveField(field, 'size', 0.5)} className="p-2 hover:bg-white/5 rounded-lg text-zinc-400"><ZoomIn size={16} /></button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Eye size={20} /> Live Preview
                  </h2>
                  {editorLoading && <RefreshCw size={16} className="animate-spin text-zinc-500" />}
                </div>
                
                <div className="bg-zinc-900/50 border border-white/10 rounded-[32px] aspect-[1.414/1] relative overflow-hidden flex items-center justify-center p-4">
                  {editorSvg ? (
                    <div 
                      className="w-full h-full"
                      dangerouslySetInnerHTML={{ __html: editorSvg }}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-4 text-zinc-600">
                      <RefreshCw size={32} className="animate-spin" />
                      <p className="text-sm font-medium">Generating preview...</p>
                    </div>
                  )}
                </div>

                <div className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-[24px] flex gap-4 text-amber-200/70">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-amber-200">How to use</h4>
                    <p className="text-xs leading-relaxed mt-1">Use the arrows to fine-tune positions. Once satisfied, click "Copy Coordinates" and paste them into the <code>lib/certificates.ts</code> file under <code>COURSE_COORDINATES</code>.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === "courses" && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">Course Management</h1>
                  <p className="text-zinc-400 mt-1">Create courses and add multiple modules with PDF notes</p>
                </div>
              </div>

              <form onSubmit={handleAddCourse} className="space-y-8">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                  {/* Course Details */}
                  <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                      <Edit3 size={20} /> Course Details
                    </h2>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Title</label>
                        <input 
                          type="text" 
                          required
                          value={courseDraft.title}
                          onChange={e => setCourseDraft({...courseDraft, title: e.target.value})}
                          placeholder="AI for Advanced Learners"
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Slug</label>
                        <input 
                          type="text" 
                          required
                          value={courseDraft.slug}
                          onChange={e => setCourseDraft({...courseDraft, slug: e.target.value})}
                          placeholder="ai-for-advanced-learners"
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Description</label>
                        <textarea 
                          rows={4}
                          value={courseDraft.description}
                          onChange={e => setCourseDraft({...courseDraft, description: e.target.value})}
                          placeholder="Technical deep-dive into AI..."
                          className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-white/20 resize-none"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                      >
                        <Save size={20} />
                        {courseDraft.id ? "Update Course" : "Publish Course"}
                      </button>
                      {courseDraft.id && (
                        <button 
                          type="button"
                          onClick={() => {
                            setCourseDraft({ id: "", title: "", slug: "", description: "" });
                            setModuleDrafts([]);
                          }}
                          className="w-full bg-zinc-900 text-white font-bold py-4 rounded-2xl border border-white/10 hover:bg-zinc-800 transition-all"
                        >
                          Cancel Editing
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Modules Section */}
                  <div className="xl:col-span-2 bg-zinc-950 border border-white/10 rounded-[32px] p-8 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <FolderPlus size={20} /> Modules
                      </h2>
                      <button 
                        type="button"
                        onClick={addModuleRow}
                        className="text-xs bg-white/5 border border-white/10 hover:bg-white/10 px-4 py-2 rounded-lg font-bold transition-all"
                      >
                        + Add Module
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                      {moduleDrafts.length === 0 ? (
                        <div className="h-32 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center text-zinc-600 italic">
                          No modules added yet. Click "+ Add Module" to start.
                        </div>
                      ) : (
                        moduleDrafts.map((m, idx) => (
                          <div key={idx} className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl space-y-4 relative group">
                            <button 
                              type="button"
                              onClick={() => removeModuleRow(idx)}
                              className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-zinc-500">ID</label>
                                <input 
                                  type="text" 
                                  placeholder="01"
                                  value={m.module_id}
                                  onChange={e => updateModuleRow(idx, "module_id", e.target.value)}
                                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/20"
                                />
                              </div>
                              <div className="md:col-span-2 space-y-1">
                                <label className="text-[10px] font-bold uppercase text-zinc-500">Title</label>
                                <input 
                                  type="text" 
                                  placeholder="Introduction to..."
                                  value={m.title}
                                  onChange={e => updateModuleRow(idx, "title", e.target.value)}
                                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/20"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-zinc-500">Description</label>
                                <input 
                                  type="text" 
                                  placeholder="Brief overview..."
                                  value={m.description}
                                  onChange={e => updateModuleRow(idx, "description", e.target.value)}
                                  className="w-full bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/20"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-zinc-500">Notes URL (PDF)</label>
                                <div className="flex gap-2">
                                  <input 
                                    type="text" 
                                    placeholder="/academy/notes/m01.pdf"
                                    value={m.notes_url}
                                    onChange={e => updateModuleRow(idx, "notes_url", e.target.value)}
                                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-white/20"
                                  />
                                  <div className="relative">
                                    <input
                                      type="file"
                                      accept=".pdf"
                                      onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (file && authHeader) {
                                          const tid = toast.loading(`Uploading ${file.name}...`);
                                          try {
                                            const formData = new FormData();
                                            formData.append("file", file);
                                            const res = await fetch("/api/admin/upload", {
                                              method: "POST",
                                              headers: { "x-admin-auth": authHeader },
                                              body: formData,
                                            });
                                            if (!res.ok) throw new Error("Upload failed");
                                            const data = await res.json();
                                            updateModuleRow(idx, "notes_url", data.url);
                                            toast.success("File uploaded successfully", { id: tid });
                                          } catch (err) {
                                            toast.error("Failed to upload file", { id: tid });
                                          }
                                        }
                                      }}
                                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <button type="button" className="bg-zinc-800 p-2 rounded-lg hover:bg-zinc-700 transition-colors h-full flex items-center justify-center">
                                      <FileText size={16} />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Quiz Status */}
                            <div className="pt-2 flex items-center justify-between border-t border-white/5">
                              <div className="flex items-center gap-2">
                                <div className={`h-2 w-2 rounded-full ${m.quiz && m.quiz.length > 0 ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                                <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-wider">
                                  {m.quiz && m.quiz.length > 0 ? `${m.quiz.length} Quiz Questions Auto-Generated` : 'Quiz will be auto-generated on save'}
                                </span>
                              </div>
                              {m.quiz && m.quiz.length > 0 && (
                                <button 
                                  type="button"
                                  onClick={() => {
                                    console.log("Quiz details:", m.quiz);
                                    toast("Quiz preview logged to console");
                                  }}
                                  className="text-[10px] text-blue-400 hover:text-blue-300 font-bold transition-colors"
                                >
                                  PREVIEW QUIZ
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </form>

              {/* Course Inventory */}
              <div className="bg-zinc-950 border border-white/10 rounded-[32px] p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Existing Courses</h2>
                  <button onClick={loadCourses} className="p-2 hover:bg-white/5 rounded-lg border border-white/10">
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                  </button>
                </div>
                <div className="space-y-4">
                  {courseList.length === 0 ? (
                    <div className="py-12 text-center text-zinc-600 italic">No courses found in database.</div>
                  ) : (
                    courseList.map((c: AdminCourse) => (
                      <div key={c.id} className="flex items-center justify-between p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-white/10 transition-all">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                            <BookOpen size={20} />
                          </div>
                          <div>
                            <div className="font-bold">{c.title}</div>
                            <div className="text-xs text-zinc-500">
                              Slug: {c.slug} • {c.modules?.length || 0} Modules
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleEditCourse(c)}
                            disabled={!!c.isStatic}
                            className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => handleDeleteCourse(c.id)}
                            disabled={!!c.isStatic}
                            className="p-2 hover:bg-red-500/10 rounded-lg text-zinc-500 hover:text-red-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${active ? 'bg-white text-black' : 'text-zinc-500 hover:bg-white/5 hover:text-white'}`}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-semibold text-sm">{label}</span>
      </div>
      <ChevronRight size={16} className={`transition-transform ${active ? 'rotate-0' : '-rotate-90 opacity-0 group-hover:opacity-100'}`} />
    </button>
  );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend?: string }) {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-[24px] p-6 hover:border-white/20 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
          {icon}
        </div>
        {trend && (
          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      <div className="text-2xl font-bold tracking-tight text-white">{value}</div>
      <div className="text-xs text-zinc-500 font-medium uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

const COURSE_TEMPLATES: Record<string, { image: string, coords: any }> = {
  "ai-for-advanced-learners": {
    image: "/academy/1.png",
    coords: {
      name: { x: "50%", y: "47.1%", size: 24 },
      date: { x: "80.6%", y: "66.1%", size: 7.4 },
      grade: { x: "37%", y: "70.5%", size: 7.6 },
      number: { x: "16.7%", y: "84%", size: 8.4 },
    }
  },
  "ai-for-engineers": {
    image: "/academy/2.png",
    coords: {
      name: { x: "48.9%", y: "40.4%", size: 24 },
      date: { x: "65.6%", y: "58.8%", size: 7.4 },
      grade: { x: "22.7%", y: "62.5%", size: 7.6 },
      number: { x: "19.1%", y: "87.3%", size: 8.4 },
    }
  },
  "ai-for-beginners": {
    image: "/academy/3.png",
    coords: {
      name: { x: "48.9%", y: "42%", size: 24 },
      date: { x: "65.6%", y: "62.1%", size: 7.4 },
      grade: { x: "22.7%", y: "65.5%", size: 7.6 },
      number: { x: "19.1%", y: "87.3%", size: 8.4 },
    }
  },
  "ai-for-hr": {
    image: "/academy/2.png",
    coords: {
      name: { x: "48.9%", y: "40.4%", size: 24 },
      date: { x: "65.6%", y: "58.8%", size: 7.4 },
      grade: { x: "22.7%", y: "62.5%", size: 7.6 },
      number: { x: "19.1%", y: "87.3%", size: 8.4 },
    }
  }
};
