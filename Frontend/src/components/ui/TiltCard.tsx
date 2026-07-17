"use client";

import { useTilt } from "@/hooks/useTilt";

interface Props {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  style?: React.CSSProperties;
}

export default function TiltCard({ children, className = "", glowColor = "rgba(167,139,250,0.18)" , style, }: Props) {
  const { ref, onMove, onLeave } = useTilt(10);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative overflow-hidden ${className}`}
       style={style}
      // style={{ transformStyle: "preserve-3d" }}
    >
      {/* Mouse-follow glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(280px circle at var(--gx, 50%) var(--gy, 50%), ${glowColor}, transparent 70%)`,
          opacity: "var(--glow-opacity, 0)",
        }}
      />
      {children}
    </div>
  );
}
