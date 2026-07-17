"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "./Button";

type EnrollmentCTAProps = {
  href: string;
  sectionId?: string;
};

export function EnrollmentCTA({ href, sectionId = "enroll" }: EnrollmentCTAProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const twitchRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered slide and lift reveal for CTA sections
      gsap.fromTo(
        ".cta-element-animate",
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 95%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Force instant refresh for newly mounted dynamic component trigger coordinates
      ScrollTrigger.refresh();

      if (twitchRef.current) {
        // Oscillate transform scale to create the "twitch" effect without triggering layout reflows
        gsap.to(twitchRef.current, {
          scaleX: 0.97,
          scaleY: 1.01,
          duration: 1.5,
          yoyo: true,
          repeat: -1,
          ease: "power1.inOut",
        });
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="site-shell bg-transparent section-padding overflow-x-hidden relative flex items-center justify-center min-h-[70vh]"
    >
      {/* Subtle gradient fade divider replacing the hard border */}
      <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#9C5BFF]/8 via-[#2ACDFF]/8 to-transparent blur-[60px] pointer-events-none opacity-10 z-20" />
      <style>{`
        @keyframes pulseGlow {
          0%, 100% { opacity: 0.12; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.25; transform: translate(-50%, -50%) scale(1.15); }
        }
        .pulse-glow {
          animation: pulseGlow 6s ease-in-out infinite;
        }
      `}</style>



      <div className="site-shell relative z-10 text-left">
        <div className="max-w-[800px] flex flex-col items-start">
          
          <span className="cta-element-animate section-eyebrow mb-6">
            TAKE THE NEXT STEP
          </span>

          <h2 className="cta-element-animate section-title text-left mb-8 mt-0">
            Ready to transition from learning to{" "}
            <span
              ref={twitchRef}
              style={{ willChange: "transform" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 inline-block tracking-[-0.02em] select-none"
            >
              outcomes?
            </span>
          </h2>

          <p className="cta-element-animate section-desc text-left max-w-[620px] mb-12 border-t border-b border-white/5 py-4 mt-6">
            Start your enrollment today. Join the ranks of finance professionals trained for the demands of the modern industry.
          </p>

          <div className="cta-element-animate flex flex-col md:flex-row gap-4 justify-start items-start w-full md:w-auto">
            <Button
              href={href}
              variant="primary"
              className="w-full md:w-auto px-10 py-5 text-sm rounded-xl font-bold hover-fine:shadow-cta transition-[transform,opacity,box-shadow,background-color,border-color] duration-300"
            >
              Enroll Now →
            </Button>
            <Button
              href="/academy#features"
              variant="secondary"
              className="w-full md:w-auto px-10 py-5 text-sm rounded-xl font-bold backdrop-blur-md bg-white/[0.02] border-white/10"
            >
              Assess Your Fit
            </Button>
            <Button
              href="/contact"
              variant="secondary"
              className="w-full md:w-auto px-10 py-5 text-sm rounded-xl font-bold backdrop-blur-md bg-white/[0.02] border-white/10"
            >
              Talk to an Advisor
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}

