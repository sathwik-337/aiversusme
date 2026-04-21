"use client";

import React, { useEffect, useState } from "react";
import { motion, animate } from "framer-motion";

interface GaugeProps {
  value: number; // 0 to 100
  size?: number;
  loading?: boolean;
}

export default function Gauge({ value, size = 300, loading = false }: GaugeProps) {
  const radius = 100;
  const strokeWidth = 40;
  const center = 120;
  const normalizedValue = loading ? 0 : Math.min(Math.max(value, 0), 100);
  
  // State for the displayed percentage value
  const [displayValue, setDisplayValue] = useState(0);

  // Calculate needle rotation: -90deg (0%) to 90deg (100%)
  const needleRotation = (normalizedValue / 100) * 180 - 90;

  useEffect(() => {
    if (loading) {
      setDisplayValue(0);
      return;
    }
    // Animate the numeric value from 0 to the target value
    const controls = animate(0, normalizedValue, {
      duration: 2.5,
      ease: "circOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [normalizedValue, loading]);

  return (
    <div className="flex flex-col items-center w-full max-w-full overflow-hidden">
      <svg
        viewBox="-40 0 320 160"
        className="w-full h-auto overflow-visible"
        style={{ maxWidth: size }}
      >
        {/* Gauge Background (Sectors) */}
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" /> {/* Green */}
            <stop offset="25%" stopColor="#84cc16" />
            <stop offset="50%" stopColor="#eab308" /> {/* Yellow */}
            <stop offset="75%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" /> {/* Red */}
          </linearGradient>
        </defs>

        {/* The Arc */}
        <path
          d="M 20 120 A 100 100 0 0 1 220 120"
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="butt"
        />

        {/* Labels */}
        <text x="20" y="145" fontSize="10" fill="#94a3b8" textAnchor="middle" className="font-medium">Minimal Risk</text>
        <text x="220" y="145" fontSize="10" fill="#94a3b8" textAnchor="middle" className="font-medium">Imminent Risk</text>

        {/* Needle */}
        <g transform={`translate(${center}, ${center})`}>
          <motion.g 
            initial={{ rotate: -90 }}
            animate={{ rotate: needleRotation }}
            transition={{ duration: 2.5, ease: "circOut" }}
          >
            {/* Invisible box to center the rotation point at (0,0) */}
            <rect x="-100" y="-100" width="200" height="200" fill="none" pointerEvents="none" />
            <path
              d="M -2 0 L 2 0 L 0 -90 Z"
              fill="#475569"
            />
            <circle cx={0} cy={0} r="6" fill="#475569" />
          </motion.g>
        </g>
      </svg>
      <div className="text-3xl md:text-4xl font-black mt-[-10px] md:mt-[-20px] text-white">
        {displayValue}%
      </div>
    </div>
  );
}
