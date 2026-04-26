"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { getAcademyProgress } from "@/lib/academy-progress";
import CoursePrice from "./course-price";

interface CourseHeroPriceProps {
  price: number | undefined;
  originalPrice?: number;
  courseSlug?: string;
}

export default function CourseHeroPrice({ price, originalPrice, courseSlug }: CourseHeroPriceProps) {
  const { userId, isLoaded } = useAuth();
  const { user } = useUser();
  const isSpecialUser = user?.primaryEmailAddress?.emailAddress === "sathwikkamath31@gmail.com";
  
  const isEnrolled = isLoaded && userId && courseSlug 
    ? getAcademyProgress(userId, courseSlug).enrolled || isSpecialUser
    : false;

  return (
    <div className="mt-4 flex items-center gap-4">
      <CoursePrice 
        price={price} 
        originalPrice={originalPrice}
        isEnrolled={isEnrolled}
        className="text-3xl font-bold text-emerald-400" 
      />
    </div>
  );
}
