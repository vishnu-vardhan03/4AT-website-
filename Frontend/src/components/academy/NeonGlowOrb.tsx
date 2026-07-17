"use client";

import React from "react";

interface NeonGlowOrbProps {
  className?: string;
  size?: number;
  color?: string; // e.g. '#00e5c3'
  opacity?: number;
  blur?: number;
}

export function NeonGlowOrb({
  className = "",
  size = 300,
  color = "#00e5c3",
  opacity = 0.15,
  blur = 50,
}: NeonGlowOrbProps) {
  return (
    <div
      className={`absolute pointer-events-none z-0 rounded-full select-none ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        background: `radial-gradient(circle, ${color} 0%, rgba(0, 0, 0, 0) 70%)`,
        opacity: opacity,
        filter: `blur(${blur}px)`,
        willChange: "transform",
      }}
    >
      {/* Premium SVG Fractal Noise Overlay for grain/texture */}
      <div
        className="absolute inset-0 rounded-full mix-blend-overlay opacity-[0.25]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />
    </div>
  );
}
