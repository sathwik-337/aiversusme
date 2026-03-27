"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronDown, MessageSquare, User } from "lucide-react";

interface Comment {
  id: string;
  name: string;
  email?: string;
  content: string;
  created_at: string;
}

interface CommentsSectionProps {
  jobSlug: string;
  initialCommentsCount: number;
}

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold tracking-tight mb-6">{children}</h2>
);

export default function CommentsSection({ jobSlug, initialCommentsCount }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/comments/${jobSlug}`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [jobSlug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.content) return;

    setPosting(true);
    setMessage(null);
    try {
      const response = await axios.post(`/api/comments/${jobSlug}`, formData);
      setComments([response.data, ...comments]);
      setFormData({ name: "", email: "", content: "" });
      setMessage({ type: "success", text: "Comment posted successfully!" });
    } catch (error) {
      console.error("Failed to post comment:", error);
      setMessage({ type: "error", text: "Failed to post comment. Please try again." });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mt-20">
      <section className="mb-20">
        <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-12">
          <SectionHeader>Comments ({comments.length || initialCommentsCount})</SectionHeader>
          <button className="flex items-center gap-2 text-xs font-bold text-[#94a3b8] bg-white/5 px-3 py-1.5 rounded-md">
            Latest <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {/* Post Comment Form */}
        <div className="space-y-8 mb-16">
          <p className="text-sm font-bold text-blue-400">Leave a reply about this occupation</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              className="w-full bg-[#111315] border border-white/10 rounded-lg p-4 h-32 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
              placeholder="Comment"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                className="bg-[#111315] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <input
                type="email"
                className="bg-[#111315] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                placeholder="Email (optional, not published)"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={posting}
                className="bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] font-bold px-6 py-2 rounded-lg transition-colors text-sm border border-[#00e5ff]/30 disabled:opacity-50"
              >
                {posting ? "Posting..." : "Post Comment"}
              </button>
              {message && (
                <span className={`text-sm ${message.type === "success" ? "text-green-400" : "text-red-400"}`}>
                  {message.text}
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Comments List */}
        <div className="space-y-6">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
            </div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-[#111315] border border-white/5 rounded-2xl p-6 flex gap-4">
                <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-white">{comment.name}</span>
                    <span className="text-[10px] text-[#94a3b8] uppercase tracking-widest">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-[#cbd5e1] leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 text-[#94a3b8] border border-dashed border-white/10 rounded-2xl">
              <MessageSquare className="h-10 w-10 mx-auto mb-4 opacity-20" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
