'use client';

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const disclaimerSections = [
  {
    id: "no-guarantee",
    title: "1. No Guarantee of Accuracy",
    content: (
      <p>
        The information provided by AI VS ME, including AI risk scores, salary data, and career suggestions, is for informational purposes only. We use a combination of public data, AI models, and statistical analysis, but we do not guarantee the accuracy, completeness, or reliability of any information on this platform. Career decisions should not be made solely based on the data presented here.
      </p>
    )
  },
  {
    id: "not-financial-advice",
    title: "2. Not Financial or Career Advice",
    content: (
      <p>
        AI VS ME is not a financial advisor, career counselor, or legal professional. The content on this site is not intended to be a substitute for professional advice. Always seek the advice of a qualified professional with any questions you may have regarding your career, finances, or legal situation.
      </p>
    )
  },
  {
    id: "third-party-links",
    title: "3. Third-Party Links",
    content: (
      <p>
        Our website may contain links to third-party websites or services that are not owned or controlled by AI VS ME. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that AI VS ME shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
      </p>
    )
  },
  {
    id: "limitation-of-liability",
    title: "4. Limitation of Liability",
    content: (
      <p>
        In no event shall AI VS ME, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
      </p>
    )
  },
  {
    id: "changes",
    title: "5. Changes to This Disclaimer",
    content: (
      <p>
        We reserve the right to modify this disclaimer at any time. We will notify you of any changes by posting the new disclaimer on this page. You are advised to review this disclaimer periodically for any changes. Changes to this disclaimer are effective when they are posted on this page.
      </p>
    )
  }
];

export default function Disclaimer() {
  const [activeId, setActiveId] = useState<string>("no-guarantee");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      let currentSection = activeId;
      for (const section of disclaimerSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            currentSection = section.id;
          }
        }
      }
      setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  return (
    <div id="disclaimer" className="min-h-screen bg-black text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-white pb-32">
      
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      <div className="w-full pt-[80px] md:pt-[110px] pb-12 px-6 relative border-b border-white/10 bg-black/50 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-500">
            Disclaimer
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Please read this disclaimer carefully before using our service.
          </p>
          <div className="mt-8 text-sm text-gray-500 uppercase tracking-widest font-medium">
            Last Updated: March 2026
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16 relative">
        
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm border-b border-white/10 pb-4">
              Table of Contents
            </h3>
            <ul className="flex flex-col gap-3 border-l-2 border-white/5 space-y-1">
              {disclaimerSections.map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => {
                      const el = document.getElementById(section.id);
                      if (el) {
                        const yOffset = -100;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      "text-left pl-4 py-1.5 text-sm transition-all duration-300 relative block w-full",
                      activeId === section.id 
                        ? "text-cyan-400 font-medium" 
                        : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    <span className={cn(
                      "absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300",
                      activeId === section.id ? "bg-cyan-500 scale-100 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-transparent scale-0"
                    )} />
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="flex-1 max-w-3xl animate-in fade-in duration-1000 delay-150">
          <div className="flex flex-col gap-16">
            {disclaimerSections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 group"
              >
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 font-bold opacity-80 transition-opacity group-hover:opacity-100">
                      {section.title.split('.')[0]}.
                    </span>
                    <span className="group-hover:text-cyan-100 transition-colors">
                      {section.title.split('. ').slice(1).join('. ')}
                    </span>
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-4 transition-all duration-500 group-hover:from-cyan-500/30" />
                </div>
                
                <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-strong:text-white/90">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}
