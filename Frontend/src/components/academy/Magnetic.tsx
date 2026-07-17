"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Magnetic({ children, range = 60, strength = 0.35 }: { children: React.ReactElement, range?: number, strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const quickX = useSpring(x, springConfig);
  const quickY = useSpring(y, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (prefersReducedMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.hypot(distanceX, distanceY);

    if (distance < range) {
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  }, [prefersReducedMotion, range, strength, x, y]);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  if (prefersReducedMotion) {
    return children;
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: quickX, y: quickY }}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
