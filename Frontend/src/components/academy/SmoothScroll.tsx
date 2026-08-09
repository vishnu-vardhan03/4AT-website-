"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { shouldDisableExpensiveEffects } from "@/lib/performance";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Custom window interface for Lenis global reference
interface CustomWindow extends Window {
  __lenis?: Lenis | null;
}

// Custom easing matching recommended motion spec: cubic-bezier(0.22, 1, 0.36, 1)
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldDisableExpensiveEffects()) {
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    const smoothScrollToTarget = (target: HTMLElement | number | string) => {
      if (prefersReducedMotion) {
        if (typeof target === "number") {
          window.scrollTo({ top: target, behavior: "auto" });
        } else {
          const el = typeof target === "string" ? (document.querySelector(target) as HTMLElement) : target;
          if (el) {
            const top = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "auto" });
          }
        }
        return;
      }

      const activeLenis = (window as unknown as CustomWindow).__lenis || lenis;
      if (activeLenis) {
        activeLenis.scrollTo(target, {
          offset: -80,
          duration: 0.6,
          easing: easeOutCubic,
        });
      } else if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        const targetElement =
          typeof target === "string"
            ? (document.querySelector(target) as HTMLElement)
            : target;
        if (targetElement) {
          const top =
            targetElement.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    };

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable = target.closest("a, button");
      if (!clickable) return;

      const href =
        clickable.getAttribute("href") || clickable.getAttribute("data-href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex !== -1) {
        const pathPart = href.substring(0, hashIndex);
        const hashPart = href.substring(hashIndex);

        const currentPath = window.location.pathname;
        const isSamePage =
          !pathPart ||
          pathPart === currentPath ||
          pathPart === `${currentPath}/` ||
          (pathPart.endsWith("/academy") && currentPath.endsWith("/academy"));

        if (isSamePage && hashPart) {
          if (hashPart === "#" || hashPart === "#top") {
            e.preventDefault();
            smoothScrollToTarget(0);
            if (window.history && window.history.pushState) {
              window.history.pushState(null, "", window.location.pathname);
            }
          } else {
            try {
              const targetElement = document.querySelector(
                hashPart
              ) as HTMLElement;
              if (targetElement) {
                e.preventDefault();
                smoothScrollToTarget(targetElement);
                if (window.history && window.history.pushState) {
                  window.history.pushState(null, "", hashPart);
                }
              }
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });

    const handleVisibilityChange = () => {
      const tracks = document.querySelectorAll(".marquee-track");
      tracks.forEach((track) => {
        const element = track as HTMLElement;
        if (document.hidden) {
          element.style.animationPlayState = "paused";
        } else {
          element.style.animationPlayState = "";
        }
      });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const init = () => {
      if (prefersReducedMotion) return;

      lenis = new Lenis({
        duration: 0.6,
        easing: easeOutCubic,
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
      });

      (window as unknown as CustomWindow).__lenis = lenis;

      lenis.on("scroll", ScrollTrigger.update);
      lenis.on("scroll", ({ velocity }: { velocity: number }) => {
        window.dispatchEvent(
          new CustomEvent("lenis-velocity", { detail: { velocity } })
        );
      });
      tickerCallback = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(500, 33);
    };

    init();

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      if (lenis) {
        lenis.destroy();
        (window as unknown as CustomWindow).__lenis = null;
      }
    };
  }, []);

  // Handle route changes to smoothly scroll to top or target hash
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const hash = window.location.hash;
    if (hash) {
      const timer = setTimeout(() => {
        const targetElement = document.querySelector(hash) as HTMLElement;
        if (targetElement) {
          const activeLenis = (window as unknown as CustomWindow).__lenis;
          if (activeLenis) {
            activeLenis.scrollTo(targetElement, { offset: -80, duration: 0.6, easing: easeOutCubic });
          } else {
            const top =
              targetElement.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      const activeLenis = (window as unknown as CustomWindow).__lenis;
      if (activeLenis) {
        activeLenis.scrollTo(0, { immediate: false, duration: 0.5 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [pathname]);

  return <>{children}</>;
}
