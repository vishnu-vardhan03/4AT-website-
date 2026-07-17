"use client";

import { useRef, useCallback } from "react";

export function useTilt(maxAngle = 12) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateX(${-dy * maxAngle}deg) rotateY(${dx * maxAngle}deg) scale(1.02)`;
    el.style.transition = "transform 0.08s ease";

    // Dynamic glow position
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    el.style.setProperty("--gx", `${x}%`);
    el.style.setProperty("--gy", `${y}%`);
    el.style.setProperty("--glow-opacity", "1");
  }, [maxAngle]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)";
    el.style.transition = "transform 0.4s cubic-bezier(.22,1,.36,1)";
    el.style.setProperty("--glow-opacity", "0");
  }, []);

  return { ref, onMove, onLeave };
}
