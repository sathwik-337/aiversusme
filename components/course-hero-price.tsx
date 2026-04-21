"use client";

import CoursePrice from "./course-price";

interface CourseHeroPriceProps {
  price: number | undefined;
  originalPrice?: number;
}

export default function CourseHeroPrice({ price, originalPrice }: CourseHeroPriceProps) {
  return (
    <div className="mt-4 flex items-center gap-4">
      <CoursePrice 
        price={price} 
        originalPrice={originalPrice}
        className="text-3xl font-bold text-emerald-400" 
      />
    </div>
  );
}
