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
  metadataBase: new URL("https://aiversusme.com"),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  openGraph: {
    title: "AI VS ME - Check Job Automation Risk & Get AI Career Insights",
    description: "Find out the automation risk for your job, get AI-powered career insights, and discover future-proof skills.",
    url: "https://aiversusme.com",
    siteName: "AI VS ME",
    type: "website",
    images: [
      {
        url: "https://aiversusme.com/aiversusume.jpeg",
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
    images: ["https://aiversusme.com/aiversusumite.jpeg"],
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
          id="schema-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "AI VS ME",
              description: "Analyze your job automation risk with AI-powered insights and discover future-proof skills.",
              url: "https://aiversusme.com",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              image: "https://aiversusme.com/aiversusme.jpeg",
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
