import { Metadata } from "next";
import BlogsClient from "./BlogsClient";

export const metadata: Metadata = {
  title: "AI Career Insights & Future of Work Blog | AI VS ME",
  description: "Stay ahead of the curve with our latest articles on AI automation, job market trends, and career future-proofing strategies.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "AI Career Insights & Future of Work Blog | AI VS ME",
    description: "Stay ahead of the curve with our latest articles on AI automation, job market trends, and career future-proofing strategies.",
    url: "/blogs",
    type: "website",
  },
};

export default function BlogsPage() {
  return <BlogsClient />;
}
