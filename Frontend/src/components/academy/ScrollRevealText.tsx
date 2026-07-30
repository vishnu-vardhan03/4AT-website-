"use client";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  return (
    <span className={className}>
      {text}
    </span>
  );
}
