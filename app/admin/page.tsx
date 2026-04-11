/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";

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

function toBasic(user: string, pass: string) {
  return "Basic " + btoa(`${user}:${pass}`);
}

export default function AdminPage() {
  const [authHeader, setAuthHeader] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<AdminCert[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("aiv_admin_auth");
    if (saved) setAuthHeader(saved);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (c) =>
        c.certificate_number.toLowerCase().includes(q) ||
        c.recipient_name.toLowerCase().includes(q) ||
        c.course_title.toLowerCase().includes(q) ||
        c.email_status.toLowerCase().includes(q)
    );
  }, [items, query]);

  async function load() {
    if (!authHeader) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/certificates", {
        headers: { "x-admin-auth": authHeader },
      });
      if (!res.ok) throw new Error("unauthorized");
      const data = (await res.json()) as AdminCert[];
      setItems(data);
    } finally {
      setLoading(false);
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const header = toBasic(username, password);
    // Optimistically save and try load
    sessionStorage.setItem("aiv_admin_auth", header);
    setAuthHeader(header);
    setTimeout(load, 0);
  }

  async function action(cert: string, next: "revoke" | "restore") {
    if (!authHeader) return;
    const res = await fetch("/api/admin/certificates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-auth": authHeader,
      },
      body: JSON.stringify({ certificateNumber: cert, action: next }),
    });
    if (res.ok) {
      await load();
    }
  }

  useEffect(() => {
    if (authHeader) {
      void load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authHeader]);

  if (!authHeader) {
    return (
      <section className="mx-auto max-w-sm px-6 py-20">
        <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-8 text-white">
          <h1 className="text-2xl font-semibold">Admin login</h1>
          <form onSubmit={login} className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-zinc-900 px-4 py-3 text-sm outline-none"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-white/15 bg-zinc-900 px-4 py-3 text-sm outline-none"
              required
            />
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Sign in
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 text-white">
      <div className="rounded-[32px] border border-white/10 bg-zinc-950 p-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold">Certificates</h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by id, name, course, status"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-full border border-white/15 bg-zinc-900 px-4 py-2 text-sm outline-none"
            />
            <button
              type="button"
              onClick={load}
              className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white hover:border-white/30 hover:bg-white/5"
            >
              Refresh
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-zinc-400">
                <th className="py-3 pr-4">Certificate ID</th>
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Course</th>
                <th className="py-3 pr-4">Grade</th>
                <th className="py-3 pr-4">Date</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-zinc-400">
                    Loading…
                  </td>
                </tr>
              ) : filtered.length ? (
                filtered.map((c) => {
                  const date = new Date(c.completed_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  const isRevoked = c.email_status?.toLowerCase() === "revoked";
                  return (
                    <tr key={c.certificate_number} className="border-t border-white/10">
                      <td className="py-3 pr-4 font-mono">{c.certificate_number}</td>
                      <td className="py-3 pr-4">{c.recipient_name}</td>
                      <td className="py-3 pr-4">{c.course_title}</td>
                      <td className="py-3 pr-4">
                        {c.grade} ({c.percentage}%)
                      </td>
                      <td className="py-3 pr-4">{date}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={
                            "rounded-full px-2 py-1 " +
                            (isRevoked ? "bg-red-500/20 text-red-300" : "bg-emerald-500/20 text-emerald-300")
                          }
                        >
                          {isRevoked ? "Revoked" : c.email_status || "Active"}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        {isRevoked ? (
                          <button
                            type="button"
                            onClick={() => void action(c.certificate_number, "restore")}
                            className="rounded-full border border-white/15 px-3 py-1 text-sm hover:border-white/30 hover:bg-white/5"
                          >
                            Restore
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => void action(c.certificate_number, "revoke")}
                            className="rounded-full border border-white/15 px-3 py-1 text-sm hover:border-white/30 hover:bg-white/5"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-zinc-400">
                    No certificates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

