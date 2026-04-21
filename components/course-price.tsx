"use client";

import { useFormattedPrice, getOriginalPrice } from "@/hooks/use-price";

interface CoursePriceProps {
  price: number | undefined;
  className?: string;
  originalPrice?: number;
}

export default function CoursePrice({ price, className, originalPrice: manualOriginalPrice }: CoursePriceProps) {
  const { displayPrice, isLoaded } = useFormattedPrice(price);
  const calculatedOriginalPrice = getOriginalPrice(price);
  const originalPrice = manualOriginalPrice || calculatedOriginalPrice;
  const { displayPrice: displayOriginalPrice } = useFormattedPrice(originalPrice);

  if (!isLoaded) {
    return <span className={className}>...</span>;
  }

  return (
    <div className="flex items-center gap-2">
      <span className={className}>
        {displayPrice}
      </span>
      {originalPrice && price !== undefined && originalPrice > price && (
        <span className="text-sm text-zinc-500 line-through">
          {displayOriginalPrice}
        </span>
      )}
    </div>
  );
}
