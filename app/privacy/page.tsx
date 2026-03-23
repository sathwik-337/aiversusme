"use client";

import { useState } from "react";

const sections = [
  {
    number: "01",
    title: "Introduction",
    content: [
      'Welcome to AI vs ME ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy.',
      "This Privacy Policy explains how we collect, use, and safeguard your information when you visit aiversusme.com and use our services.",
      "By using our platform, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    number: "02",
    title: "Information We Collect",
    content: [
      "Account Information: Name and email address collected via Clerk authentication when you sign up or log in.",
      "Contact Form Data: Name, email, subject, and message when you submit our contact form.",
      "Usage Data: Job titles you search for, pages you visit, and how you interact with our platform.",
      "Technical Data: IP address, browser type, device information, and cookies for analytics and performance purposes.",
    ],
  },
  {
    number: "03",
    title: "How We Use Your Information",
    content: [
      "Provide and improve our AI job automation analysis services.",
      "Respond to your contact form inquiries and support requests.",
      "Authenticate your identity and manage your account securely via Clerk.",
      "Analyze usage patterns to improve platform performance and user experience.",
      "Send service-related communications when necessary.",
    ],
  },
  {
    number: "04",
    title: "AI-Generated Content Disclaimer",
    content: [
      "All job automation risk scores, career insights, and recommendations provided on AI vs ME are AI-generated and for informational purposes only.",
      "They do not constitute professional career advice. We strongly recommend verifying any insights independently before making career or employment decisions.",
      "We are not liable for decisions made based on our AI-generated content.",
    ],
  },
  {
    number: "05",
    title: "Data Sharing & Third Parties",
    content: [
      "We do not sell your personal data.",
      "Clerk: For user authentication and account management.",
      "Resend: For sending contact form email notifications.",
      "Vercel / Hosting providers: For website hosting and deployment.",
      "All third parties are bound by their own privacy policies and applicable data protection laws.",
    ],
  },
  {
    number: "06",
    title: "Cookies",
    content: [
      "We use cookies and similar tracking technologies to enhance your experience on our platform.",
      "These include session cookies for authentication and analytics cookies to understand how users interact with our site.",
      "You can control cookie settings through your browser preferences.",
    ],
  },
  {
    number: "07",
    title: "Your Rights & Contact",
    content: [
      "The right to access, correct, or delete the personal data we hold about you.",
      "The right to withdraw consent at any time.",
      "The right to lodge a complaint with a supervisory authority.",
      "Data retention: Account data is retained until you delete your account. Contact form submissions are retained for up to 12 months.",
      "To exercise any of these rights, contact us at: karishma.cs22@sahyadri.edu.in | +91 82443 56751",
    ],
  },
];

export default function PrivacyPage() {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const toggle = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-20">

        {/* HEADER */}
        <div className="mb-16">
          <span className="inline-block text-blue-400 text-xs font-semibold uppercase tracking-[0.2em] mb-5">
            Legal
          </span>
          <h1 className="text-7xl md:text-8xl font-bold text-white leading-tight mb-5">
            Privacy<br />Policy
          </h1>
          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <span>Last updated: March 2026</span>
            <span className="w-1 h-1 rounded-full bg-gray-600 inline-block" />
            <span>AI vs ME</span>
          </div>
        </div>

        {/* ACCORDION */}
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => {
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen ? "bg-white/[0.06]" : "bg-white/[0.02] hover:bg-white/[0.04]"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isOpen ? "bg-blue-500/25 text-blue-400" : "bg-white/[0.08] text-gray-400"
                    }`}>
                      {section.number}
                    </div>
                    <span className={`text-lg font-semibold ${isOpen ? "text-white" : "text-gray-200"}`}>
                      {section.title}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                    isOpen ? "bg-blue-500/20 rotate-180" : "bg-white/[0.06]"
                  }`}>
                    <svg
                      className={`w-4 h-4 ${isOpen ? "text-blue-400" : "text-gray-400"}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m19 9-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-7 pb-7">
                    <div className="border-t border-white/[0.08] pt-5">
                      <ul className="flex flex-col gap-4">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-4">
                            <div className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                            <p className="text-gray-300 text-base leading-relaxed">{item}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CONTACT CARD */}
        <div className="mt-12 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-8">
          <p className="text-white font-semibold text-lg mb-4">AI vs ME</p>
          <div className="flex flex-col gap-2">
            <p className="text-gray-400 text-base">
              Email:{" "}
              <a
                href="mailto:karishma.cs22@sahyadri.edu.in"
                className="text-blue-400 hover:text-blue-300 transition underline underline-offset-4"
              >
                karishma.cs22@sahyadri.edu.in
              </a>
            </p>
            <p className="text-gray-400 text-base">Phone: +91 82443 56751</p>
          </div>
        </div>

      </div>
    </main>
  );
}