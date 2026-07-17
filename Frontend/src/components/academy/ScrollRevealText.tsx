"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollRevealTextProps {
  text: string;
  className?: string;
}

export function ScrollRevealText({ text, className = "" }: ScrollRevealTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const words = text.split(" ");

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const spans = gsap.utils.toArray(".sr-word", containerRef.current);
      if (spans.length > 0) {
        gsap.fromTo(spans,
          { opacity: 0.25, y: 4 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.1, 
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              end: "bottom 65%",
              scrub: 0.5
            }
          }
        );
      }
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, [text]);

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => (
        <span
          key={i}
          className="sr-word mr-[0.25em] inline-block select-none"
          style={{ willChange: "transform, opacity" }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
