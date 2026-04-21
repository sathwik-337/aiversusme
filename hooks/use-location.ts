"use client";

import { useState, useEffect } from "react";

export function useLocation() {
  const [isIndia, setIsIndia] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkLocation() {
      // 1. Manual Override for Testing
      const params = new URLSearchParams(window.location.search);
      const override = params.get('country');
      if (override) {
        console.log(`Manual location override: ${override}`);
        setIsIndia(override.toUpperCase() === 'IN');
        return;
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

      async function tryFetch(url: string, isIpApi: boolean = false) {
        try {
          const res = await fetch(url, {
            signal: controller.signal,
            headers: isIpApi ? { 'Accept': 'application/json' } : {}
          });
          if (!res.ok) return null;
          
          if (url.includes('cloudflare')) {
            const text = await res.text();
            const match = text.match(/loc=([A-Z]{2})/);
            return match ? match[1] : null;
          }

          const data = await res.json();
          return isIpApi ? data.country_code : (data.countryCode || data.country);
        } catch (e) {
          return null;
        }
      }

      // Try multiple services in order
      let countryCode = 
        await tryFetch("https://ipapi.co/json/", true) || 
        await tryFetch("https://ip-api.com/json/") ||
        await tryFetch("https://www.cloudflare.com/cdn-cgi/trace") ||
        await tryFetch("https://api.country.is/");

      // Final zero-network fallback: Check timezone
      if (!countryCode) {
        const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (tz.includes('Calcutta') || tz.includes('Kolkata')) {
          countryCode = 'IN';
        } else {
          // If timezone is clearly NOT India (like Europe/Amsterdam), we can assume non-India
          countryCode = 'UNKNOWN'; 
        }
      }

      if (countryCode) {
        console.log(`Detected location: ${countryCode}`);
        setIsIndia(countryCode === "IN");
      } else {
        console.log("Location detection failed, defaulting to India");
        setIsIndia(true);
      }
      
      clearTimeout(timeoutId);
    }

    checkLocation();
  }, []);

  return { isIndia };
}
