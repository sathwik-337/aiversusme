import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import Footer from "@/app/components/footer";
import ChatbotProvider from "@/components/chatbot-provider";
import UserSync from "@/components/user-sync";
import { cn } from "@/lib/utils";
import Script from "next/script";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AI VS ME - Check Job Automation Risk & Get AI Career Insights",
  description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills. Analyze your career with AI.",
  keywords: ["AI automation risk", "job security", "future-proof skills", "career insights", "AI career analysis", "automation index", "AI job impact", "career future-proofing"],
  authors: [{ name: "AI VS ME Team" }],
  creator: "AI VS ME",
  publisher: "AI VS ME",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://aiversusme.com"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "AI VS ME - Check Job Automation Risk & Get AI Career Insights",
    description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills.",
    url: "https://aiversusme.com",
    siteName: "AI VS ME",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/aiversusme.jpeg",
        width: 1200,
        height: 630,
        alt: "AI VS ME - Job Automation Risk Analysis",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI VS ME - Check Job Automation Risk & Get AI Career Insights",
    description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills.",
    images: ["/aiversusme.jpeg"],
    creator: "@aiversusme",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn(
        "h-full antialiased",
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <head>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        />
        <Script
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebApplication",
                  "@id": "https://aiversusme.com/#website",
                  "name": "AI VS ME",
                  "description": "Analyze your job automation risk with AI-powered insights and discover future-proof skills.",
                  "url": "https://aiversusme.com",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "All",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                  },
                  "image": "https://aiversusme.com/aiversusme.jpeg",
                  "author": {
                    "@type": "Organization",
                    "@id": "https://aiversusme.com/#organization"
                  }
                },
                {
                  "@type": "Organization",
                  "@id": "https://aiversusme.com/#organization",
                  "name": "AI VS ME",
                  "url": "https://aiversusme.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://aiversusme.com/bgremovedlogo.png"
                  },
                  "sameAs": [
                    "https://twitter.com/aiversusme",
                    "https://linkedin.com/company/aiversusme"
                  ]
                },
                {
                  "@type": "WebSite",
                  "url": "https://aiversusme.com",
                  "name": "AI VS ME",
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://aiversusme.com/job/{search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black">
        <ClerkProvider>
          <Header />
          <UserSync />
          <main className="flex-grow">{children}</main>
          <Footer />
          <ChatbotProvider />
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#18181b",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "16px",
              },
            }}
          />
        </ClerkProvider>
      </body>
    </html>
  );
}
