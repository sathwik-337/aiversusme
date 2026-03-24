"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { cn } from "@/lib/utils";

interface JobSuggestion {
  title: string;
  slug: string;
}


export default function SearchAutocomplete({ className = "" }: { className?: string }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<JobSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const response = await axios.get(`/api/jobs/search?q=${query}`);
        setSuggestions(response.data);
      } catch (err) {
        console.error("Failed to fetch suggestions:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/job/${slug}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSelect(suggestions[0].slug);
    }
  };

  return (
    <div className={cn("w-full space-y-2 relative", className)} ref={containerRef}>
      <form className="flex space-x-2" onSubmit={handleSubmit}>
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            className="flex h-12 w-full rounded-full border border-white/20 bg-black text-white px-9 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            placeholder="Search job roles (e.g., Software Developer)"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#111827]"
          type="submit"
        >
          Analyze
        </button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-50 overflow-hidden">
          {suggestions.map((job) => (
            <button
              key={job.slug}
              className="w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors flex items-center gap-2"
              onClick={() => handleSelect(job.slug)}
            >
              <Search className="h-3 w-3 text-muted-foreground" />
              {job.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
