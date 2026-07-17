"use client";

import { Nav } from "@/components/layout/MainNav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "./Hero";
import { TrustBar } from "./TrustBar";
import { HybridReminder } from "./HybridReminder";
import { Services } from "./Services";
import { WhoWeServe } from "./WhoWeServe";
import { Engagement } from "./Engagement";
import { Testimonials } from "./Testimonials";
import { ContactCTA } from "./ContactCTA";

import ScrollProgress from "@/components/ui/ScrollProgress";
import MouseGlow from "@/components/ui/MouseGlow";

import { useEffect, useState } from "react";

export function ServicesPage() {
  const [stars, setStars] = useState<{
    left: string;
    top: string;
    size: number;
    opacity: number;
    type: "dot" | "glow" | "sparkle";
    twinkle: boolean;
    twinkleDelay: string;
    twinkleDuration: string;
  }[]>([]);

  useEffect(() => {
    const edgeDistribute = (x: number) => {
      const p = 1.55; // Gentle power curve to push stars towards the viewport boundaries
      return x < 0.5 
        ? 0.5 * Math.pow(2 * x, p) 
        : 1 - 0.5 * Math.pow(2 * (1 - x), p);
    };

    setStars(
      Array.from({ length: 100 }).map(() => {
        const rand = Math.random();
        let type: "dot" | "glow" | "sparkle" = "dot";
        let size = 2.5 + Math.random() * 0.8; // default dot size

        if (rand > 0.82) {
          type = "sparkle";
          size = 10 + Math.random() * 8; // larger sparkle size
        } else if (rand > 0.50) {
          type = "glow";
          size = 4.5 + Math.random() * 2.5; // medium glow size
        }

        const twinkle = Math.random() > 0.3; // 70% of stars twinkle

        // 35% of stars are uniform random to fill empty central spaces, 65% are corner-concentrated
        const useUniform = Math.random() < 0.35;
        const leftVal = useUniform ? Math.random() * 100 : edgeDistribute(Math.random()) * 100;
        const topVal = useUniform ? Math.random() * 100 : edgeDistribute(Math.random()) * 100;

        return {
          left: `${leftVal}%`,
          top: `${topVal}%`,
          size,
          opacity: type === "sparkle" ? 0.6 + Math.random() * 0.4 : 0.2 + Math.random() * 0.5,
          type,
          twinkle,
          twinkleDelay: `${Math.random() * 6}s`,
          twinkleDuration: `${4 + Math.random() * 5}s`,
        };
      })
    );
  }, []);

  return (
    <main id="top" className="services-page dark bg-background text-foreground antialiased min-h-screen relative">
      <ScrollProgress />
      <MouseGlow />

      {/* Twinkle keyframes style block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.85); }
          50% { opacity: var(--star-max-opacity, 0.8); transform: scale(1.15); }
        }
        .animate-star-twinkle {
          animation: starTwinkle var(--star-duration) ease-in-out infinite;
          animation-delay: var(--star-delay);
        }
      `}} />

      {/* Fixed Ambient Background Tint (stuck behind scrolling content) */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#011116] via-[#01030e] to-[#010e17] pointer-events-none z-0" />

      {/* Global Starfield Background Layer (Fixed parallax dots spanning the whole page) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {stars.map((star, idx) => {
          const isSparkle = star.type === "sparkle";
          const isGlow = star.type === "glow";

          const starStyles: React.CSSProperties & Record<`--${string}`, string | number> = {
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            // Inline variables for keyframe interpolation
            "--star-max-opacity": star.opacity,
            "--star-duration": star.twinkleDuration,
            "--star-delay": star.twinkleDelay,
          };

          if (isGlow) {
            starStyles.background = "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(14,165,233,0.3) 40%, rgba(14,165,233,0) 80%)";
          }

          return (
            <div
              key={idx}
              className={`absolute ${isSparkle ? 'flex items-center justify-center' : 'bg-white rounded-full'} ${star.twinkle ? 'animate-star-twinkle' : ''}`}
              style={starStyles}
            >
              {isSparkle && (
                <svg viewBox="0 0 24 24" className="w-full h-full text-white fill-current filter drop-shadow-[0_0_4px_rgba(224,242,254,0.9)]">
                  <path d="M12 2C12 2 13 8 14.5 9.5C16 11 22 12 22 12C22 12 16 13 14.5 14.5C13 16 12 22 12 22C12 22 11 16 9.5 14.5C8 13 2 12 2 12C2 12 8 11 9.5 9.5C11 8 12 2 12 2Z" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        <Nav />
        <Hero />
        
        <TrustBar />
        
        <HybridReminder />
        
        <Services />
        <WhoWeServe />
        <Engagement />
        
        <Testimonials />
        
        <ContactCTA />
        <Footer className="mx-3 mt-0 mb-0" />
      </div>
    </main>
  );
}
