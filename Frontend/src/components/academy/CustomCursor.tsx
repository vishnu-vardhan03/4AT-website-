"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState<"default" | "interactive" | "card">("default");

  // Track velocity for cursor morphing
  const prevX = useRef(0);
  const prevY = useRef(0);
  const velX = useRef(0);
  const velY = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || prefersReducedMotion) return;
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -200;
    let mouseY = -200;
    let ringX = -200;
    let ringY = -200;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      // Dot snaps to cursor instantly
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

      // Ring lazily follows (lerp)
      ringX = lerp(ringX, mouseX, 0.12);
      ringY = lerp(ringY, mouseY, 0.12);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      // Velocity for stretch
      velX.current = lerp(velX.current, mouseX - prevX.current, 0.3);
      velY.current = lerp(velY.current, mouseY - prevY.current, 0.3);
      prevX.current = mouseX;
      prevY.current = mouseY;

      const speed = Math.sqrt(velX.current ** 2 + velY.current ** 2);
      const clampedSpeed = Math.min(speed, 40);
      const stretch = 1 + clampedSpeed * 0.025;
      const squish = 1 / Math.sqrt(stretch);

      // Apply stretch to ring based on movement direction
      const angle = Math.atan2(velY.current, velX.current) * (180 / Math.PI);
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${stretch}) scaleY(${squish})`;

      rafId.current = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isCard = target.closest('[data-cursor-view="true"]');
      const isInteractive = target.closest("a") || target.closest("button") || target.closest('[role="button"]');
      if (isCard) setHoverState("card");
      else if (isInteractive) setHoverState("interactive");
      else setHoverState("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    rafId.current = requestAnimationFrame(tick);

    // Hide system cursor
    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-hide-system";
    styleEl.innerHTML = `
      @media (pointer: fine) {
        body, a, button, [role="button"], [data-cursor-view="true"] {
          cursor: none !important;
        }
      }
    `;
    document.head.appendChild(styleEl);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId.current);
      const styleNode = document.getElementById("custom-cursor-hide-system");
      if (styleNode) styleNode.remove();
    };
  }, [mounted]);

  if (!mounted) return null;

  // Dot: tiny 6px dot, solid white always
  // Ring: morphs size / mix-blend-mode on different states
  const isCard = hoverState === "card";
  const isInteractive = hoverState === "interactive";

  const ringSize = isCard ? 52 : isInteractive ? 38 : 28;
  const dotSize = isCard ? 0 : 6;
  const ringColor = isCard ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)";
  const ringBg = isCard ? "rgba(255,255,255,0.1)" : "transparent";

  return (
    <>
      {/* Velocity-stretched trailing ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden lg:block rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          borderColor: ringColor,
          backgroundColor: ringBg,
          willChange: "transform",
          mixBlendMode: isCard ? "difference" : "normal",
        }}
      >
        {isCard && (
          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold font-sans uppercase tracking-wider text-black select-none pointer-events-none">
            View
          </span>
        )}
      </div>

      {/* Instant dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] hidden lg:block rounded-full bg-white transition-[width,height,opacity] duration-200"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          opacity: dotSize === 0 ? 0 : 1,
          willChange: "transform",
        }}
      />
    </>
  );
}
