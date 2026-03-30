"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface JobSuggestion {
  title: string;
  slug: string;
  job_code?: string;
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
        console.log(`Fetching suggestions for: ${query} from origin: ${window.location.origin}`);
        const response = await fetch(`/api/jobs/search?q=${encodeURIComponent(query)}`, {
          cache: 'no-store'
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Suggestions received:", data);
        setSuggestions(data);
      } catch (err) {
        console.error("Fetch search error:", err);
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
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-500" />
          </div>
          <input
            className="flex h-12 w-full rounded-full border border-white/20 bg-black text-white pl-11 pr-4 py-2 text-sm placeholder-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            placeholder="Search job roles..."
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            suppressHydrationWarning
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-md bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#111827]"
          type="submit"
          suppressHydrationWarning
        >
          Analyze
        </button>
      </form>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[100] max-h-[400px] overflow-y-auto custom-scrollbar">
          <div className="py-1">
            {suggestions.map((job) => (
              <button
                key={job.slug}
                className="w-full text-left px-4 md:px-6 py-3 md:py-4 text-sm hover:bg-gray-50 transition-all flex items-center justify-between group border-b border-gray-50 last:border-0"
                onClick={() => handleSelect(job.slug)}
              >
                <div className="flex items-center gap-2 md:gap-3 flex-grow min-w-0">
                  <Search className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0" />
                  <span className="font-semibold text-gray-700 group-hover:text-black truncate">{job.title}</span>
                </div>
                {job.job_code && (
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-mono tracking-tighter opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity shrink-0 ml-2">
                    AIVSME : {job.job_code}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
