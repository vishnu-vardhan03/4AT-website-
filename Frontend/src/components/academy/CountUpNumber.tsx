"use client";

import { useEffect, useRef } from "react";
import { useInView, animate, type AnimationPlaybackControls } from "framer-motion";

interface CountUpNumberProps {
  value: string; // e.g., "1L+", "141+", "92%", "4.9", "2,400+"
  className?: string;
  duration?: number;
  delay?: number;
}

export function CountUpNumber({ value, className = "", duration = 1.5, delay = 0 }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const getInitialValue = () => {
    const cleanValue = value.replace(/,/g, "");
    const numericMatch = cleanValue.match(/^([\d.]+)/);
    if (!numericMatch) return value;
    const suffix = value.replace(/[\d,.]+/, "");
    return "0" + suffix;
  };

  useEffect(() => {
    if (!isInView) return;

    const cleanValue = value.replace(/,/g, "");
    const numericMatch = cleanValue.match(/^([\d.]+)/);
    if (!numericMatch) {
      if (ref.current) ref.current.textContent = value;
      return;
    }

    const targetNumber = parseFloat(numericMatch[1]);
    const suffix = value.replace(/[\d,.]+/, "");

    let controls: AnimationPlaybackControls | undefined;

    const timeout = setTimeout(() => {
      controls = animate(0, targetNumber, {
        duration,
        ease: [0.16, 1, 0.3, 1], // premium custom ease
        onUpdate: (latest) => {
          if (!ref.current) return;
          const formatted = Number.isInteger(targetNumber)
            ? Math.floor(latest).toLocaleString()
            : latest.toFixed(1);
          ref.current.textContent = formatted + suffix;
        },
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (controls) controls.stop();
    };
  }, [isInView, value, duration, delay]);

  return (
    <span ref={ref} className={className}>
      {getInitialValue()}
    </span>
  );
}
