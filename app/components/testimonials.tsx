"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Shama Lopes",
    role: "Cyber Security Analyst",
    feedback:
      "AI vs ME presents a clear and forward-thinking vision of how artificial intelligence is reshaping modern careers. The platform communicates its purpose with clarity and professionalism.",
    initials: "",
    gradient: "from-blue-500 to-cyan-500",
    photo: "testimonials/Shama.jpeg",
    stars: 5,
  },
  {
    name: "Shreya K",
    role: "Software Developer",
    feedback:
      "The website effectively highlights the impact of automation on various professions. Its structured approach makes complex concepts easy to understand.",
    initials: "",
    gradient: "from-purple-500 to-pink-500",
    photo: "testimonials/Shreya1.jpeg",
    stars: 5,
  },
  {
    name: "Pranav S Shetty",
    role: "Software Engineer ",
    feedback:
      "A well-designed platform that combines insightful content with a clean and modern interface. The user experience is smooth and intuitive.",
    initials: "",
    gradient: "from-cyan-400 to-blue-600",
    photo: "testimonials/Pranav.jpeg",
    stars: 5,
  },
  {
    name: "Shravan Kumar UK",
    role: "Technical Trainer",
    feedback:
      "AI vs Me helped me discover my true strengths and confidently choose the right career path as a Technical Trainer. ",
    initials: "",
    gradient: "from-pink-500 to-rose-500",
    photo: "testimonials/Shravan.jpeg",
    stars: 5,
  },
  {
    name: "Sathwik",
    role: "UX Designer",
    feedback:
      "The platform successfully bridges the gap between technology and career awareness. It offers meaningful guidance for individuals navigating future job landscapes.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Sathwik.jpeg",
    stars: 5,
  },
  {
    name: "Prathika",
    role: "Software Developer",
    feedback:
      "A professional and engaging web experience that clearly explains the evolving relationship between humans and artificial intelligence.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Prathika.jpeg",
    stars: 5,
  },
  {
    name: "Karishma",
    role: "AI Engineer",
    feedback:
      "The clarity of information and structured presentation make this platform highly effective for understanding AI-driven career transformations.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Karishma.jpeg",
    stars: 5,
  },
  {
    name: "Dhanya",
    role: "Web Developer",
    feedback:
      "AI vs ME stands out for its ability to simplify complex AI concepts while maintaining depth and accuracy.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Dhanya.jpeg",
    stars: 5,
  },
  {
    name: "Shruthi",
    role: "UI/UX Developer",
    feedback:
      "The platform demonstrates strong design consistency and content relevance, making it both informative and visually appealing.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Shruthi.jpeg",
    stars: 5,
  },
  {
    name: "Shriya",
    role: "DevOps Engineer",
    feedback:
      "A thoughtfully executed website that encourages users to reflect on their career paths in an AI-driven world.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Shriya.jpeg",
    stars: 5,
  },
  {
    name: "Nandini",
    role: "Machine Learning Engineer",
    feedback:
      "The integration of AI insights with career analysis makes this platform both practical and impactful for users.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Nandini.jpeg",
    stars: 5,
  },
  {
    name: "Thabsheera",
    role: "Database Administrator",
    feedback:
      "AI vs ME effectively communicates its core idea through a balance of design, usability, and informative content.",
    initials: "",
    gradient: "from-emerald-400 to-teal-600",
    photo: "testimonials/Thabsheera.jpeg",
    stars: 5,
  },
  {
    name: "Zainul",
    role: "AI Developer",
    feedback:
      "A remarkable platform that provides deep insights into the intersection of AI and career growth, helping developers like me stay ahead.",
    initials: "",
    gradient: "from-blue-500 to-indigo-600",
    photo: "testimonials/zainul.jpeg",
    stars: 5,
  },
  {
    name: "Shaima",
    role: "AI Developer",
    feedback:
      "The platform's structured approach to explaining AI transformations is incredibly valuable for professionals navigating the modern job market.",
    initials: "",
    gradient: "from-purple-500 to-fuchsia-600",
    photo: "testimonials/shaima.jpeg",
    stars: 5,
  },
];

// Renders a single testimonial card
function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div className="group relative flex flex-col md:flex-row bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-10 md:p-14 gap-10 w-full">
      {/* hover glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />

      {/* Photo + identity */}
      <div className="flex-shrink-0 flex flex-col items-center gap-4 md:w-56">
        <div
          className={cn(
            "relative w-32 h-32 md:w-44 md:h-44 rounded-full ring-2 ring-white/10 overflow-hidden shadow-xl bg-gradient-to-br flex items-center justify-center",
            t.gradient
          )}
        >
          <img
            src={t.photo}
            alt={t.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold select-none">
            {t.initials}
          </span>
        </div>
        <div className="text-center">
          <h4 className="text-white font-semibold text-lg leading-tight">{t.name}</h4>
          <p className="text-cyan-400 text-base font-medium mt-1">{t.role}</p>
          {/* <p className="text-gray-500 text-sm mt-0.5">{t.company}</p> */}
          <div className="flex gap-1 mt-2 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < t.stars ? "text-yellow-400" : "text-gray-600"}
                fill={i < t.stars ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="hidden md:block w-px bg-white/10 self-stretch" />
      <div className="md:hidden h-px w-full bg-white/10" />

      {/* Quote */}
      <div className="flex flex-col justify-center flex-1 z-10">
        <Quote className="text-cyan-400/20 w-14 h-14 mb-6" />
        <p className="text-gray-200 text-xl md:text-2xl leading-relaxed">
          &ldquo;{t.feedback}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [displayed, setDisplayed] = useState(0); // what's visible during animation
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (next: number, dir: "left" | "right") => {
      if (sliding || next === current) return;
      setDirection(dir);
      setDisplayed(current);   // freeze current card as the "outgoing" one
      setSliding(true);

      // After animation completes, snap to new card
      setTimeout(() => {
        setCurrent(next);
        setSliding(false);
      }, 420);
    },
    [sliding, current]
  );

  const prev = () =>
    goTo((current - 1 + testimonials.length) % testimonials.length, "left");
  const next = () =>
    goTo((current + 1) % testimonials.length, "right");

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((c) => {
        const nextIdx = (c + 1) % testimonials.length;
        setDirection("right");
        setDisplayed(c);
        setSliding(true);
        setTimeout(() => setSliding(false), 420);
        return nextIdx;
      });
    }, 5000);
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  // The card index that is visually "leaving"
  const outgoing = displayed;
  // The card index that is "entering"
  const incoming = current;

  return (
    <section
      className="relative w-full py-24 px-4 md:px-8 bg-black overflow-hidden"
      id="testimonials"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
            <Star size={14} className="text-cyan-400" fill="currentColor" />
            <span>User Feedback</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            What People Are Saying
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
            Real feedback from users navigating their careers with AI insights.
          </p>
        </div>

        {/* Slider viewport */}
        <div className="relative px-6 md:px-8">
          {/* Clipping container — hides the cards outside the frame */}
          <div className="overflow-hidden rounded-[2rem]">
            <div className="relative w-full" style={{ minHeight: "260px" }}>

              {/* OUTGOING card — slides out */}
              {sliding && (
                <div
                  className="absolute inset-0 w-full"
                  style={{
                    animation: `slideOut${direction === "right" ? "Left" : "Right"} 420ms cubic-bezier(0.4,0,0.2,1) forwards`,
                  }}
                >
                  <TestimonialCard t={testimonials[outgoing]} />
                </div>
              )}

              {/* INCOMING card — slides in */}
              <div
                key={incoming}
                className="w-full"
                style={
                  sliding
                    ? {
                      animation: `slideIn${direction === "right" ? "Right" : "Left"} 420ms cubic-bezier(0.4,0,0.2,1) forwards`,
                    }
                    : {}
                }
              >
                <TestimonialCard t={testimonials[incoming]} />
              </div>
            </div>
          </div>

          {/* Keyframe styles */}
          <style>{`
            @keyframes slideOutLeft {
              from { transform: translateX(0); opacity: 1; }
              to   { transform: translateX(-100%); opacity: 0; }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); opacity: 1; }
              to   { transform: translateX(100%); opacity: 0; }
            }
            @keyframes slideInRight {
              from { transform: translateX(100%); opacity: 0; }
              to   { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInLeft {
              from { transform: translateX(-100%); opacity: 0; }
              to   { transform: translateX(0); opacity: 1; }
            }
          `}</style>

          {/* Prev / Next buttons */}
          <button
            onClick={() => { prev(); resetTimer(); }}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm z-20"
            suppressHydrationWarning
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => { next(); resetTimer(); }}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm z-20"
            suppressHydrationWarning
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2.5 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => { goTo(idx, idx > current ? "right" : "left"); resetTimer(); }}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={cn(
                "rounded-full transition-all duration-300",
                idx === current
                  ? "w-6 h-2 bg-cyan-400"
                  : "w-2 h-2 bg-white/20 hover:bg-white/40"
              )}
              suppressHydrationWarning
            />
          ))}
        </div>

        <p className="text-center text-gray-600 text-sm mt-3">
          {current + 1} / {testimonials.length}
        </p>
      </div>
    </section>
  );
}