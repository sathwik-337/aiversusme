/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import { 
  Eye, EyeOff, Lock, User, ShieldCheck, Search, RefreshCw, XCircle, CheckCircle, 
  Users, Award, Ticket, PlusCircle, LayoutDashboard, LogOut, ChevronRight, Mail, Calendar, GraduationCap, Percent,
  BookOpen, FileText, FolderPlus, Trash2, Edit3, Save
} from "lucide-react";
import toast from "react-hot-toast";
import { generateCertificateNumber } from "@/lib/certificates-shared";

type AdminCert = {
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

type AdminUser = {
  id: string;
  clerk_user_id: string;
  email: string | null;
  full_name: string | null;
  image_url: string | null;
  created_at: string;
};

type Section = "certificates" | "users" | "coupons" | "generator" | "courses";

type CourseModuleDraft = {
  module_id: string;
  title: string;
  description: string;
  notes_url: string;
  quiz?: any[];
};

type AdminCourse = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  isStatic?: boolean;
  modules: any[];
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
  const [query, setQuery] = useState("");
  const [activeSection, setActiveSection] = useState<Section>("certificates");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Course management state
  const [courseList, setCourseList] = useState<AdminCourse[]>([]);
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
      if (!res.ok) throw new Error("Failed to generate");
      toast.success("Certificate generated successfully!", { id: tid });
      setGenData(prev => ({ ...prev, certificateNumber: generateCertificateNumber() }));
    } catch (err) {
      toast.error("Generation failed", { id: tid });
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
                  <div key={u.id} className="bg-zinc-950 border border-white/10 rounded-[24px] p-6 flex items-center gap-4 hover:border-white/20 transition-all">
                    <img src={u.image_url || "/avatar-placeholder.png"} className="h-12 w-12 rounded-full border border-white/10" alt="" />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{u.full_name || "Anonymous User"}</div>
                      <div className="text-xs text-zinc-500 truncate">{u.email}</div>
                      <div className="text-[10px] text-zinc-600 mt-1 uppercase tracking-wider">Joined {new Date(u.created_at).toLocaleDateString()}</div>
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

                    <div 
                      className="absolute font-sans font-bold text-red-600/60 -translate-y-1/2 uppercase tracking-widest"
                      style={{ 
                        left: "50%", 
                        top: "15%", 
                        fontSize: "10px",
                        transform: "translate(-50%, -50%) rotate(-5deg)",
                        border: "2px solid rgba(220, 38, 38, 0.4)",
                        padding: "4px 12px",
                        borderRadius: "4px"
                      }}
                    >
                      Valid for 1 Year from Issue
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
            <div className="h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
              <div className="h-20 w-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                <Ticket size={40} className="text-zinc-600" />
              </div>
              <h1 className="text-4xl font-bold">Coming Soon</h1>
              <p className="text-zinc-500 max-w-sm">We're building a powerful discount and voucher management system for the academy.</p>
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
                                    toast.info("Quiz preview logged to console");
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
  }
};
