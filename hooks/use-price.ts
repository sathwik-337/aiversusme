"use client";

import { useLocation } from "./use-location";

const PRICE_MAPPING: Record<number, { usd: string; inr: string }> = {
  999: { usd: "$19.99", inr: "₹999" },
  499: { usd: "$9.99", inr: "₹499" },
  99: { usd: "$1.99", inr: "₹99" },
  1999: { usd: "$39.99", inr: "₹1999" },
  1599: { usd: "$29.99", inr: "₹1599" },
};

export function getOriginalPrice(priceINR: number | undefined): number | undefined {
  if (priceINR === 999) return 1999;
  if (priceINR === 99) return 499;
  if (priceINR === 499) return 1599;
  return undefined;
}

export function usePrice(priceINR: number | undefined) {
  const { isIndia } = useLocation();

  if (priceINR === undefined || priceINR === 0) {
    return "FREE";
  }

  // During loading of location, show nothing or a placeholder to avoid jump
  if (isIndia === null) {
    return "...";
  }

  if (isIndia) {
    return `₹${priceINR}`;
  } else {
    // If we have a specific mapping, use it. Otherwise, do a rough conversion.
    const mapping = PRICE_MAPPING[priceINR];
    if (mapping) {
      return mapping.usd;
    }
    
    // Fallback conversion (approx 80 INR = 1 USD)
    const converted = (priceINR / 80).toFixed(2);
    return `$${converted}`;
  }
}

export function useFormattedPrice(priceINR: number | undefined) {
  const { isIndia } = useLocation();

  if (priceINR === undefined || priceINR === 0) {
    return {
      displayPrice: "FREE",
      currency: isIndia === false ? "USD" : "INR",
      isLoaded: isIndia !== null,
      isIndia: isIndia
    };
  }

  const mapping = PRICE_MAPPING[priceINR];

  return {
    displayPrice: isIndia === false ? (mapping?.usd || `$${(priceINR / 80).toFixed(2)}`) : `₹${priceINR}`,
    currency: isIndia === false ? "USD" : "INR",
    isLoaded: isIndia !== null,
    isIndia: isIndia
  };
}
