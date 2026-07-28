import React from "react";

interface SectionPillProps {
  children: React.ReactNode;
  className?: string;
  dotClassName?: string;
  textClassName?: string;
}

export function SectionPill({
  children,
  className = "",
  dotClassName = "",
  textClassName = "",
}: SectionPillProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 border border-[rgba(94,234,212,0.18)] bg-white/[0.02] hover:border-[rgba(94,234,212,0.35)] hover:bg-white/[0.04] rounded-full py-1.5 px-4 transition-all duration-300 select-none ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full bg-[#5EEAD4] animate-pulse shrink-0 ${dotClassName}`} />
      <span className={`text-[11px] font-bold uppercase tracking-[0.2em] text-[#5EEAD4] font-sans ${textClassName}`}>
        {children}
      </span>
    </div>
  );
}
