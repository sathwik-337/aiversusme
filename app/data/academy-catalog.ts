import type { AcademyCourse } from "@/app/data/academy";
import { aiBeginnersCourse } from "@/app/data/academy-ai-beginners";
import { aiEngineersCourse } from "@/app/data/academy-ai-engineers";
import { aiAdvancedCourse } from "@/app/data/academy-ai-advanced";

export const academyCourseCatalog: AcademyCourse[] = [
  {
    ...aiBeginnersCourse,
    cardImageSrc: "/academy/ai-basics-card.svg",
    cardImageAlt: "AI FOR BEGINNERS course artwork",
  },
  {
    ...aiEngineersCourse,
    cardImageSrc: "/academy/ai-for-engineers-card.svg",
    cardImageAlt: "AI for Engineers course artwork",
  },
  {
    ...aiAdvancedCourse,
    cardImageSrc: "/academy/ai-advanced-card.svg",
    cardImageAlt: "AI for Advanced Learners course artwork",
  },
];

export function getAcademyCourseBySlug(slug: string): AcademyCourse | undefined {
  return academyCourseCatalog.find((course) => course.slug === slug);
}
