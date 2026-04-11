import type { AcademyCourse } from "@/app/data/academy";
import { academyMiniCourse } from "@/app/data/academy-mini-course";

export const academyCourseCatalog: AcademyCourse[] = [
  {
    ...academyMiniCourse,
    cardImageSrc: "/academy/ai-basics-card.svg",
    cardImageAlt: "AI for Beginners course artwork",
  },
];
