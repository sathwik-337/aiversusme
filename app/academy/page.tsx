import type { Metadata } from "next";
import { academyCourseCatalog } from "@/app/data/academy-catalog";
import { db } from "@/lib/db";
import { academyCourses, academyModules } from "@/lib/db/schema";
import AcademyContent from "./AcademyContent";

export const metadata: Metadata = {
  title: "AI VS ME E-Learning",
  description: "Browse the AI VS ME e-learning course catalog.",
  openGraph: {
    title: "AI VS ME E-Learning",
    description: "Browse the AI VS ME e-learning course catalog.",
    url: "/academy",
    type: "website",
    images: [
      {
        url: "/ogtagacademy.jpeg",
        width: 1200,
        height: 630,
        alt: "AI VS ME E-Learning Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI VS ME E-Learning",
    description: "Browse the AI VS ME e-learning course catalog.",
    images: ["/ogtagacademy.jpeg"],
  },
};

export default async function AcademyPage() {
  const dbCourses = await db.select().from(academyCourses).catch(() => []);
  const dbModules = await db.select().from(academyModules).catch(() => []);

  const formattedDbCourses = dbCourses.map(course => ({
    slug: course.slug,
    title: course.title,
    level: course.level || "Beginner",
    duration: course.duration || "Self-paced",
    tagline: course.tagline || course.summary || "",
    isCoding: false,
    modules: dbModules.filter(m => m.course_id === course.id),
    outcomes: ["Expert-led training", "Hands-on projects", "Certificate of completion"],
    cardImageSrc: null,
  }));

  const allCourses = [...academyCourseCatalog, ...formattedDbCourses];

  return <AcademyContent allCourses={allCourses} />;
}
