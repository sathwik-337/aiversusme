import type { AcademyCourse } from "@/app/data/academy";
import { aiBeginnersCourse } from "@/app/data/academy-ai-beginners";
import { aiEngineersCourse } from "@/app/data/academy-ai-engineers";
import { aiAdvancedCourse } from "@/app/data/academy-ai-advanced";
import { aiDoctorsCourse } from "@/app/data/academy-ai-doctors";
import { aiCybersecurityCourse } from "@/app/data/academy-ai-cybersecurity";
import { aiEverydayCourse } from "@/app/data/academy-ai-everyday";
import { aiHRCourse } from "@/app/data/academy-ai-hr";
import { aiPoliticiansCourse } from "@/app/data/academy-ai-politicians";

export const academyCourseCatalog: AcademyCourse[] = [
  {
    ...aiBeginnersCourse,
    cardImageSrc: "/AIBegin.jfif",
    cardImageAlt: "AI FOR BEGINNERS course artwork",
  },
  {
    ...aiEngineersCourse,
    cardImageSrc: "/AIEngin.jfif",
    cardImageAlt: "AI for Engineers course artwork",
  },
  {
    ...aiAdvancedCourse,
    cardImageSrc: "/aifora.png",
    cardImageAlt: "AI for Advanced Learners course artwork",
  },
  {
    ...aiDoctorsCourse,
    cardImageSrc: "/AIDoc.jfif",
    cardImageAlt: "AI FOR DOCTORS course artwork",
  },
  {
    ...aiCybersecurityCourse,
    cardImageSrc: "/AIcyb.jfif",
    cardImageAlt: "AI FOR CYBERSECURITY course artwork",
  },
  {
    ...aiEverydayCourse,
    cardImageSrc: "/AIEveryday.jfif",
    cardImageAlt: "AI FOR EVERYDAY course artwork",
  },
  {
    ...aiHRCourse,
    cardImageSrc: "/aiforhr.jpeg",
    cardImageAlt: "AI FOR HR course artwork",
  },
  {
    ...aiPoliticiansCourse,
    cardImageSrc: "/aiforpoli.png",
    cardImageAlt: "AI FOR POLITICIANS IN INDIA course artwork",
  },
];

export function getAcademyCourseBySlug(slug: string): AcademyCourse | undefined {
  return academyCourseCatalog.find((course) => course.slug === slug);
}
