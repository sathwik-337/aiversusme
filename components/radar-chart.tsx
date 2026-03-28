"use client";

import React from "react";

interface RadarChartProps {
  data: {
    calculated: number;
    polling: number;
    growth: number;
    wages: number;
    volume: number;
  };
  size?: number;
}

export default function RadarChart({ data, size = 250 }: RadarChartProps) {
  const center = size / 2;
  const radius = (size / 2) * 0.8;
  const points = 5;
  const angleStep = (Math.PI * 2) / points;

  const labels = ["calculated", "polling", "growth", "wages", "volume"];
  
  // Normalize values to 0-1 range for the chart
  const normalizedData = [
    data.calculated / 100,
    data.polling / 100,
    data.growth / 100,
    data.wages / 100,
    data.volume / 100,
  ];

  const getCoordinates = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * value * Math.cos(angle),
      y: center + radius * value * Math.sin(angle),
    };
  };

  const pathData = normalizedData
    .map((val, i) => {
      const { x, y } = getCoordinates(i, val);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + " Z";

  const padding = 60;
  
  return (
    <div className="flex flex-col items-center justify-center relative w-full max-w-full overflow-hidden">
      <svg
        viewBox={`${-padding} ${-padding/2} ${size + padding * 2} ${size + padding}`}
        className="w-full h-auto overflow-visible"
        style={{ maxWidth: size + padding * 2 }}
      >
        {/* Grid Circles */}
        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
          <circle
            key={r}
            cx={center}
            cy={center}
            r={radius * r}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        {labels.map((_, i) => {
          const { x, y } = getCoordinates(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#1e293b"
              strokeWidth="1"
            />
          );
        })}

        {/* Labels */}
        {labels.map((label, i) => {
          const { x, y } = getCoordinates(i, 1.15);
          return (
            <text
              key={label}
              x={x}
              y={y}
              fontSize="9"
              fill="#94a3b8"
              textAnchor="middle"
              dominantBaseline="middle"
              className="uppercase tracking-widest font-bold md:text-[10px]"
            >
              {label}
            </text>
          );
        })}

        {/* Data Shape */}
        <path
          d={pathData}
          fill="#fbbf24"
          fillOpacity="0.6"
          stroke="#fbbf24"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}
