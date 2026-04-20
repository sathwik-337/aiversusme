import type { AcademyCourse } from "@/app/data/academy";
import { aiBeginnersCourse } from "@/app/data/academy-ai-beginners";
import { aiEngineersCourse } from "@/app/data/academy-ai-engineers";
import { aiAdvancedCourse } from "@/app/data/academy-ai-advanced";
import { aiDoctorsCourse } from "@/app/data/academy-ai-doctors";
import { aiCybersecurityCourse } from "@/app/data/academy-ai-cybersecurity";
import { aiEverydayCourse } from "@/app/data/academy-ai-everyday";
import { aiHRCourse } from "@/app/data/academy-ai-hr";
import { aiPoliticiansCourse } from "@/app/data/academy-ai-politicians";
import { aiMarketingCourse } from "@/app/data/academy-ai-marketing";
import { aiEntrepreneursCourse } from "@/app/data/academy-ai-entrepreneurs";
import { aiEducatorsCourse } from "@/app/data/academy-ai-educators";
import { aiLawyersCourse } from "@/app/data/academy-ai-lawyers";

export const academyCourseCatalog: AcademyCourse[] = [
  {
    ...aiBeginnersCourse,
    cardImageSrc: "/academy/ai-for-beginners.jpg",
    cardImageAlt: "AI FOR BEGINNERS course artwork",
  },
  {
    ...aiEngineersCourse,
    cardImageSrc: "/academy/ai-for-engineers.jpg",
    cardImageAlt: "AI for Engineers course artwork",
  },
  {
    ...aiAdvancedCourse,
    cardImageSrc: "/academy/ai-for-advanced.png",
    cardImageAlt: "AI for Advanced Learners course artwork",
  },
  {
    ...aiDoctorsCourse,
    cardImageSrc: "/academy/ai-for-doctors.jpg",
    cardImageAlt: "AI FOR DOCTORS course artwork",
  },
  {
    ...aiCybersecurityCourse,
    cardImageSrc: "/academy/ai-for-cybersecurity.jpg",
    cardImageAlt: "AI FOR CYBERSECURITY course artwork",
  },
  {
    ...aiEverydayCourse,
    cardImageSrc: "/academy/ai-for-everyday.jpg",
    cardImageAlt: "AI FOR EVERYDAY course artwork",
  },
  {
    ...aiHRCourse,
    cardImageSrc: "/academy/ai-for-hr.jpeg",
    cardImageAlt: "AI FOR HR course artwork",
  },
  {
    ...aiPoliticiansCourse,
    cardImageSrc: "/academy/ai-for-politicians.png",
    cardImageAlt: "AI FOR POLITICIANS IN INDIA course artwork",
  },
  {
    ...aiMarketingCourse,
    cardImageSrc: "/academy/aiformarket.png",
    cardImageAlt: "AI FOR MARKETING course artwork",
  },
  {
    ...aiEntrepreneursCourse,
    cardImageSrc: "/academy/aiforentra.png",
    cardImageAlt: "AI FOR ENTREPRENEURS course artwork",
  },
  {
    ...aiEducatorsCourse,
    cardImageSrc: "/academy/aiforeducator.png",
    cardImageAlt: "AI FOR EDUCATORS course artwork",
  },
  {
    ...aiLawyersCourse,
    cardImageSrc: "/academy/aiforlaw.jpeg",
    cardImageAlt: "AI FOR LAWYERS course artwork",
  },
];

export function getAcademyCourseBySlug(slug: string): AcademyCourse | undefined {
  return academyCourseCatalog.find((course) => course.slug === slug);
}
