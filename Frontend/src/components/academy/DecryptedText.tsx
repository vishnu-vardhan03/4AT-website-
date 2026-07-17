"use client";

import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface DecryptedTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function DecryptedText({ text, className = "", speed = 30, delay = 0 }: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

  useEffect(() => {
    if (!isInView) return;

    let isCancelled = false;
    let iteration = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const startAnimation = () => {
      interval = setInterval(() => {
        if (isCancelled) return;

        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        // Resolves character by character
        iteration += 0.4;
      }, speed);
    };

    const timeout = setTimeout(startAnimation, delay);

    return () => {
      isCancelled = true;
      if (interval) clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInView, text, speed, delay]);

  return (
    <span ref={ref} className={className}>
      {displayText || text}
    </span>
  );
}
