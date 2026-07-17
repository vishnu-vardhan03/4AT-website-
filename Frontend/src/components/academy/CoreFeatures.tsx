"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUpNumber } from "@/components/academy/CountUpNumber";
import { Target, Briefcase, Bot, Globe, Users, Star, Shield, IndianRupee } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  body: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  badges?: string[];
  graphic: React.ReactNode;
  spanClass?: string;
  glowColor?: string;
  themeColorClass?: string; // used for icon border/text coloring
  minHeightClass?: string;  // custom height targeting row 1 vs row 2
  fullGraphic?: boolean;    // let graphic fill the entire box
}

function BentoCard({
  id,
  title,
  body,
  icon: Icon,
  badges,
  graphic,
  spanClass = "",
  glowColor = "rgba(45, 212, 191, 0.08)",
  themeColorClass = "text-emerald-400 border-emerald-500/20 bg-emerald-500/5",
  minHeightClass = "min-h-[325px] sm:min-h-[240px] md:min-h-[385px] lg:min-h-[365px]",
  fullGraphic = false,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);

  function handleMouseEnter() {
    if (cardRef.current) {
      rectRef.current = cardRef.current.getBoundingClientRect();
    }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!rectRef.current) {
      if (cardRef.current) {
        rectRef.current = cardRef.current.getBoundingClientRect();
      } else {
        return;
      }
    }
    const left = rectRef.current.left;
    const top = rectRef.current.top;
    const x = e.clientX - left;
    const y = e.clientY - top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }

  function handleMouseLeave() {
    rectRef.current = null;
  }

  let hoverAccentColor = "rgba(52, 211, 153, 0.25)"; // green/emerald
  let badgeColors = "text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:shadow-[0_0_8px_rgba(45,212,191,0.25)]";
  let numColor = "text-emerald-400/80";
  let radialGlowBg = "rgba(16, 201, 129, 0.25)";
  let cardBorderGrad = "linear-gradient(to bottom right, rgba(16, 201, 129, 0.24) 0%, rgba(45, 212, 191, 0.15) 50%, rgba(16, 201, 129, 0.24) 100%)";
  let cardGlowShadow = "0 8px 32px rgba(0,0,0,0.6), inset 0 0 15px rgba(16, 201, 129, 0.04)";
  let cardHoverShadow = "0 16px 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(16, 201, 129, 0.18)";
  let iconGlowClass = "shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15),0_0_12px_rgba(16,201,129,0.35)] group-hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),0_0_20px_rgba(16,201,129,0.65)]";
  let imageContainerBorderClass = "border-emerald-500/15 group-hover:border-emerald-500/35 shadow-[0_0_10px_rgba(16,201,129,0.06)] group-hover:shadow-[0_0_15px_rgba(16,201,129,0.16)]";

  if (glowColor.includes("168") || glowColor.includes("139") || glowColor.includes("purple") || glowColor.includes("indigo")) {
    hoverAccentColor = "rgba(168, 85, 247, 0.25)"; // purple
    badgeColors = "text-purple-400 border-purple-500/20 bg-purple-500/5 hover:shadow-[0_0_8px_rgba(168,85,247,0.25)]";
    numColor = "text-purple-400/80";
    radialGlowBg = "rgba(168, 85, 247, 0.25)";
    cardBorderGrad = "linear-gradient(to bottom right, rgba(16, 85, 247, 0.24) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(16, 85, 247, 0.24) 100%)";
    cardGlowShadow = "0 8px 32px rgba(0,0,0,0.6), inset 0 0 15px rgba(168, 85, 247, 0.04)";
    cardHoverShadow = "0 16px 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(168, 85, 247, 0.18)";
    iconGlowClass = "shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15),0_0_12px_rgba(168,85,247,0.35)] group-hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),0_0_20px_rgba(168,85,247,0.65)]";
    imageContainerBorderClass = "border-purple-500/15 group-hover:border-purple-500/35 shadow-[0_0_10px_rgba(168,85,247,0.06)] group-hover:shadow-[0_0_15px_rgba(168,85,247,0.16)]";
  } else if (glowColor.includes("6,") || glowColor.includes("cyan")) {
    hoverAccentColor = "rgba(6, 182, 212, 0.25)"; // cyan
    badgeColors = "text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:shadow-[0_0_8px_rgba(6,182,212,0.25)]";
    numColor = "text-cyan-400/80";
    radialGlowBg = "rgba(6, 182, 212, 0.25)";
    cardBorderGrad = "linear-gradient(to bottom right, rgba(6, 182, 212, 0.24) 0%, rgba(56, 189, 248, 0.15) 50%, rgba(6, 182, 212, 0.24) 100%)";
    cardGlowShadow = "0 8px 32px rgba(0,0,0,0.6), inset 0 0 15px rgba(6, 182, 212, 0.04)";
    cardHoverShadow = "0 16px 40px rgba(0,0,0,0.8), inset 0 0 25px rgba(6, 182, 212, 0.18)";
    iconGlowClass = "shadow-[inset_0_1.5px_0_rgba(255,255,255,0.15),0_0_12px_rgba(6,182,212,0.35)] group-hover:shadow-[inset_0_1.5px_0_rgba(255,255,255,0.25),0_0_20px_rgba(6,182,212,0.65)]";
    imageContainerBorderClass = "border-cyan-500/15 group-hover:border-cyan-500/35 shadow-[0_0_10px_rgba(6,182,212,0.06)] group-hover:shadow-[0_0_15px_rgba(6,182,212,0.16)]";
  }

  const pColor1 = "rgba(52, 211, 153, 0.5)"; // green
  const pColor2 = "rgba(6, 182, 212, 0.5)"; // cyan
  const pColor3 = "rgba(168, 85, 247, 0.5)"; // purple

  let borderColor = "rgba(16, 201, 129, 0.35)";
  let glowShadow = "inset 0 0 18px rgba(16,201,129,0.18), inset 0 0 60px rgba(16,201,129,0.07)";
  if (glowColor.includes("168") || glowColor.includes("139") || glowColor.includes("purple") || glowColor.includes("indigo")) {
    borderColor = "rgba(168, 85, 247, 0.35)";
    glowShadow = "inset 0 0 18px rgba(168,85,247,0.18), inset 0 0 60px rgba(168,85,247,0.07)";
  } else if (glowColor.includes("6,") || glowColor.includes("cyan")) {
    borderColor = "rgba(6, 182, 212, 0.35)";
    glowShadow = "inset 0 0 18px rgba(6,182,212,0.18), inset 0 0 60px rgba(6,182,212,0.07)";
  }

  return (
    <div className={`bento-card-wrapper h-full ${spanClass}`}>
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`bento-card group relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8 h-full animate-card ${minHeightClass}`}
        style={{
          borderRadius: "16px",
          background: "#090B0F",
          border: `1px solid ${borderColor}`,
          boxShadow: `${glowShadow}, 0 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.04)`,
          transition: "box-shadow 250ms ease, transform 250ms ease",
          "--hover-accent": hoverAccentColor,
          "--card-border-grad": cardBorderGrad,
          "--card-glow-shadow": cardGlowShadow,
          "--card-hover-shadow": cardHoverShadow,
        } as React.CSSProperties}
      >
        {/* Interactive Radial Hover Glow */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-500 group-hover:opacity-100 z-0"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${glowColor}, transparent 80%)`,
          }}
        />
        
        {/* Static Right Corners Glow */}
        <div
          className="pointer-events-none absolute -inset-px opacity-[0.7] transition duration-500 group-hover:opacity-[0.1] z-0"
          style={{
            background: `radial-gradient(350px circle at 100% 0%, ${glowColor}, transparent 70%), radial-gradient(350px circle at 100% 100%, ${glowColor}, transparent 70%)`,
          }}
        />

        <div className="flex flex-col justify-between h-full relative z-10 w-full">
          {/* Upper Section: 2-Column Split Layout for Graphic and Heading/Description */}
          <div className="grid grid-cols-1 sm:grid-cols-[145px_1fr] gap-5 items-stretch w-full">
            
            {/* Left: Graphic and Icon Container (Stretches to match height on desktop sm:h-full) */}
            <div className={`relative flex flex-col items-center justify-center min-h-[135px] sm:h-full w-full sm:w-[145px] rounded-2xl bg-[#08090c] border overflow-hidden z-0 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.02)] transition-all duration-500 ${
              fullGraphic ? "p-0" : "p-2"
            } ${imageContainerBorderClass}`}>
              {/* Soft radial glow behind the illustration (very subtle to avoid muddy tint) */}
              <div 
                className="absolute w-32 h-32 rounded-full blur-2xl opacity-30 pointer-events-none transition-all duration-500 group-hover:opacity-45 group-hover:scale-110 z-0"
                style={{
                  background: `radial-gradient(circle, ${radialGlowBg} 0%, transparent 70%)`
                }}
              />

              {/* Faint floating particles around the illustration */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div 
                  className="absolute w-[3px] h-[3px] rounded-full top-[25%] left-[20%] animate-float-p1"
                  style={{ backgroundColor: pColor1, opacity: 0.4 }}
                />
                <div 
                  className="absolute w-[4px] h-[4px] rounded-full bottom-[25%] right-[20%] animate-float-p2"
                  style={{ backgroundColor: pColor2, opacity: 0.3 }}
                />
                <div 
                  className="absolute w-[3px] h-[3px] rounded-full top-[60%] right-[30%] animate-float-p3"
                  style={{ backgroundColor: pColor3, opacity: 0.4 }}
                />
              </div>

              {/* Circular Icon in Top-Left */}
              <div className={`absolute top-2.5 left-2.5 w-9.5 h-9.5 rounded-full border flex items-center justify-center transition-all duration-500 group-hover:scale-110 ${themeColorClass} ${iconGlowClass} z-20`}>
                <Icon className="w-4.5 h-4.5" />
              </div>

              {/* Visual Graphic Representation */}
              <div 
                className={`w-full h-full flex items-center justify-center z-10 ${
                  fullGraphic ? "relative" : "py-2 scale-90 transition-all duration-500 group-hover:scale-[0.93]"
                }`}
              >
                {graphic}
              </div>
            </div>

            {/* Right: Text Container (Heading & Description with increased vertical rhythm) */}
            <div className="flex flex-col justify-start pt-1.5 sm:pt-0">
              <span className={`text-[10px] font-mono tracking-[0.15em] uppercase font-semibold ${numColor}`}>
                {id}
              </span>
              <h3 className="mt-3.5 text-lg sm:text-xl font-bold leading-[1.2] tracking-tight text-white/95 font-display group-hover:text-white transition-colors duration-300">
                {title}
              </h3>
              <p className="mt-3 text-[13px] sm:text-[14px] font-normal leading-[1.6] text-white/65 font-sans tracking-wide group-hover:text-white/85 transition-colors duration-300">
                {body}
              </p>
            </div>
          </div>

          {/* Divider line between upper content zone and lower pills zone spanning the full width */}
          {badges && badges.length > 0 && (
            <div className="w-full h-[1px] bg-white/[0.06] mt-6 mb-4 relative z-10" />
          )}

          {/* Lower Section: Pills spanning the full card width */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-2 w-full relative z-10 mt-1">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className={`rounded-full border px-3.5 py-1 text-[10px] font-mono tracking-wider uppercase leading-tight font-medium transition-all duration-300 hover:-translate-y-0.5 cursor-default ${badgeColors}`}
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CoreFeatures({ sectionId = "core-features" }: { sectionId?: string }) {
  const containerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Fade-in headings
      gsap.fromTo(
        ".diff-heading",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".diff-heading",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Bento cards staggered entrance
      gsap.fromTo(
        ".bento-card-wrapper",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "transform",
          scrollTrigger: {
            trigger: ".bento-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Metrics strip stagger entrance
      gsap.fromTo(
        ".metric-block",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".metrics-strip",
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, containerRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id={sectionId}
      className="site-shell relative overflow-hidden bg-transparent section-padding text-white"
    >
      {/* Decorative Grid Mesh (Clean Neutral Overlay) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Embedded Animations CSS Stylesheet */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        .animate-road {
          stroke-dasharray: 6 4;
          animation: dash 3s linear infinite;
        }
        .group:hover .animate-road {
          animation: dash 1.5s linear infinite;
        }
        @keyframes float-hologram {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(1deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .float-visual {
          animation: float-hologram 5s ease-in-out infinite;
        }
        .bar-transition {
          transform-origin: bottom;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .group:hover .bar-1 { transform: scaleY(1.15); }
        .group:hover .bar-2 { transform: scaleY(1.25); }
        .group:hover .bar-3 { transform: scaleY(1.35); }

        .bento-card {
          position: relative;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          transition: background 0.5s ease-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease-out;
        }
        .bento-card:hover {
          transform: translateY(-2px) scale(1.005);
        }
      `}} />

      <div className="site-shell relative z-10">

        {/* [TOP HEADER ZONE] */}
        <div className="diff-heading flex flex-col items-start mb-16 lg:mb-20 max-w-4xl">
          {/* Green outline pill badge matching reference */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-emerald-400 font-mono mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            WHY OUR PRODUCT
          </div>

          <h2 className="section-title">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
              Finance,
            </span>{" "}
            Designed for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
              Outcomes.
            </span>
          </h2>

          {/* Separator timeline/slider line below heading */}
          <div className="w-full max-w-[280px] h-[2px] bg-white/10 rounded-full mt-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-purple-500 to-sky-500 rounded-full" />
            <div className="absolute top-1/2 left-[25%] -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          </div>

          <p className="section-desc">
            We engineered this platform specifically for the complexity, compliance demands, and pace of financial education. That means structured tracks built around real job roles, with SOX, IFRS, and Big 4 standards treated as foundation rather than add-ons.
          </p>
        </div>

        {/* [BENTO GRID WORKSPACE] */}
        <div className="bento-grid grid grid-cols-1 md:grid-cols-6 gap-6">

          {/* Card 01 - Career-aligned tracks */}
          <BentoCard
            id="01"
            title="Career-aligned tracks"
            body="Start with the job you want, then follow a learning path built backward from that destination."
            icon={Target}
            badges={["Career Destination", "Role-Based"]}
            glowColor="rgba(45, 212, 191, 0.08)"
            themeColorClass="text-emerald-400 border-emerald-500/20 bg-emerald-500/5"
            spanClass="col-span-1 md:col-span-2"
            minHeightClass="min-h-[320px] sm:min-h-[220px] md:min-h-[360px] lg:min-h-[340px]"
            graphic={
              <div className="relative w-full h-[140px] flex items-center justify-center float-visual">
                <svg className="w-full h-full max-w-[145px]" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="road-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.05" />
                      <stop offset="60%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.8" />
                    </linearGradient>
                    <linearGradient id="flag-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  {/* Perspective grid lines */}
                  <path d="M 20 140 L 180 140" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <path d="M 40 115 L 160 115" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                  <path d="M 60 90 L 140 90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                  {/* Glowing Road Path */}
                  <path d="M 30 140 C 65 130, 85 95, 75 75 C 65 55, 115 35, 135 25" stroke="url(#road-grad)" strokeWidth="5" strokeLinecap="round" fill="none" filter="url(#neon-glow)" />
                  <path d="M 30 140 C 65 130, 85 95, 75 75 C 65 55, 115 35, 135 25" stroke="#fff" strokeWidth="1" className="animate-road" strokeLinecap="round" fill="none" opacity="0.7" />

                  {/* Flagpole & Flag */}
                  <line x1="135" y1="25" x2="135" y2="5" stroke="#10b981" strokeWidth="1.5" />
                  <path d="M 135 5 L 152 10 L 135 15 Z" fill="url(#flag-grad)" filter="url(#neon-glow)" />

                  {/* Glow circles */}
                  <circle cx="30" cy="140" r="3" fill="#10b981" filter="url(#neon-glow)" />
                  <circle cx="75" cy="75" r="3" fill="#10b981" filter="url(#neon-glow)" />
                  <circle cx="135" cy="25" r="4.5" fill="#2dd4bf" filter="url(#neon-glow)" />
                </svg>
              </div>
            }
          />

          {/* Card 02 - Practical finance training */}
          <BentoCard
            id="02"
            title="Practical finance training"
            body="Learn the workflows, tools, and reporting logic used in real accounting, audit, tax, and FP&A environments."
            icon={Briefcase}
            badges={["Accounting", "Audit & Tax", "FP&A"]}
            glowColor="rgba(6, 182, 212, 0.1)"
            themeColorClass="text-cyan-400 border-cyan-500/20 bg-cyan-500/5"
            spanClass="col-span-1 md:col-span-2"
            minHeightClass="min-h-[320px] sm:min-h-[220px] md:min-h-[360px] lg:min-h-[340px]"
            graphic={
              <div className="relative w-full h-[140px] flex items-center justify-center float-visual">
                <svg className="w-full h-full max-w-[145px]" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="bar-grad-1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0284c7" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="bar-grad-2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#0891b2" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="bar-grad-3" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Platform Grid */}
                  <path d="M 25 125 L 175 125 L 145 95 L 55 95 Z" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

                  {/* Grid Lines */}
                  <line x1="82" y1="125" x2="102" y2="95" stroke="rgba(255,255,255,0.02)" />
                  <line x1="118" y1="125" x2="128" y2="95" stroke="rgba(255,255,255,0.02)" />

                  {/* Bar 1 */}
                  <rect x="60" y="65" width="18" height="55" rx="3" fill="url(#bar-grad-1)" stroke="#38bdf8" strokeWidth="1" className="bar-transition bar-1" />

                  {/* Bar 2 */}
                  <rect x="90" y="45" width="18" height="75" rx="3" fill="url(#bar-grad-2)" stroke="#06b6d4" strokeWidth="1" className="bar-transition bar-2" />

                  {/* Bar 3 */}
                  <rect x="120" y="25" width="18" height="95" rx="3" fill="url(#bar-grad-3)" stroke="#2dd4bf" strokeWidth="1" className="bar-transition bar-3" />

                  {/* Connecting Sparkline Chart Overlay */}
                  <path d="M 69 60 L 99 40 L 129 20" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                  <circle cx="69" cy="60" r="2.5" fill="#fff" />
                  <circle cx="99" cy="40" r="2.5" fill="#fff" />
                  <circle cx="129" cy="20" r="2.5" fill="#fff" />
                </svg>
              </div>
            }
          />

          {/* Card 03 - AI and automation exposure */}
          <BentoCard
            id="03"
            title="AI and automation exposure"
            body="Build fluency in the digital tools modern finance teams increasingly expect."
            icon={Bot}
            badges={["Digital Fluency", "Modern Tools"]}
            glowColor="rgba(139, 92, 246, 0.1)"
            themeColorClass="text-indigo-400 border-indigo-500/20 bg-indigo-500/5"
            spanClass="col-span-1 md:col-span-2"
            minHeightClass="min-h-[320px] sm:min-h-[220px] md:min-h-[360px] lg:min-h-[340px]"
            graphic={
              <div className="relative w-full h-[140px] flex items-center justify-center float-visual">
                <svg className="w-full h-full max-w-[145px]" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="cube-top" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="cube-left" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
                    </linearGradient>
                    <linearGradient id="cube-right" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>

                  {/* Isometric Cube Group */}
                  <g transform="translate(100, 75)">
                    {/* Shadow / Bottom Ring */}
                    <ellipse cx="0" cy="40" rx="45" ry="12" fill="none" stroke="rgba(167, 139, 250, 0.1)" strokeWidth="1" />
                    {/* Glow Orb in center */}
                    <circle cx="0" cy="0" r="22" fill="rgba(167, 139, 250, 0.05)" filter="url(#neon-glow)" />

                    {/* Left Face */}
                    <path d="M -35 0 L 0 18 L 0 50 L -35 32 Z" fill="url(#cube-left)" stroke="#a78bfa" strokeWidth="0.75" />

                    {/* Right Face */}
                    <path d="M 0 18 L 35 0 L 35 32 L 0 50 Z" fill="url(#cube-right)" stroke="#2dd4bf" strokeWidth="0.75" />

                    {/* Top Face */}
                    <path d="M -35 0 L 0 -18 L 35 0 L 0 18 Z" fill="url(#cube-top)" stroke="#c084fc" strokeWidth="0.75" />

                    {/* AI Text on Right Face */}
                    <text x="16" y="27" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif" transform="skewY(-17)" textAnchor="middle" filter="url(#neon-glow)">AI</text>

                    {/* Connected circuitry lines floating around */}
                    <circle cx="-45" cy="-15" r="2" fill="#a78bfa" />
                    <line x1="-45" y1="-15" x2="-35" y2="0" stroke="rgba(167, 139, 250, 0.25)" strokeWidth="0.5" />
                    <circle cx="45" cy="-12" r="2" fill="#2dd4bf" />
                    <line x1="45" y1="-12" x2="35" y2="0" stroke="rgba(45, 212, 191, 0.25)" strokeWidth="0.5" />
                  </g>
                </svg>
              </div>
            }
          />

          {/* Card 04 - Readiness for global standards */}
          <BentoCard
            id="04"
            title="Readiness for global standards"
            body="Train in the context of IFRS, SOX, audit discipline, and employer expectations from day one."
            icon={Globe}
            badges={["SOX & IFRS", "Employer Expectation"]}
            glowColor="rgba(56, 189, 248, 0.1)"
            themeColorClass="text-sky-400 border-sky-500/20 bg-sky-500/5"
            spanClass="col-span-1 md:col-span-3"
            minHeightClass="min-h-[290px] sm:min-h-[220px] md:min-h-[320px] lg:min-h-[300px]"
            fullGraphic={true}
            graphic={
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Background asset globe.png loaded from Generated_Assets */}
                <Image
                  src="/Generated_Assets/globe.png"
                  alt="Holographic Globe Icon"
                  fill
                  sizes="(max-width: 768px) 100vw, 145px"
                  className="object-cover opacity-85 mix-blend-lighten pointer-events-none filter drop-shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            }
          />

          {/* Card 05 - Assessment and placement support */}
          <BentoCard
            id="05"
            title="Assessment and placement support"
            body="Move through pre-assessment, post-training evaluation, and interview support before placement routing."
            icon={Users}
            badges={["Pre-Assessment", "Evaluation", "Interview Prep"]}
            glowColor="rgba(168, 85, 247, 0.1)"
            themeColorClass="text-purple-400 border-purple-500/20 bg-purple-500/5"
            spanClass="col-span-1 md:col-span-3"
            minHeightClass="min-h-[290px] sm:min-h-[220px] md:min-h-[320px] lg:min-h-[300px]"
            fullGraphic={true}
            graphic={
              <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                {/* Background asset stairway.png loaded from Generated_Assets */}
                <Image
                  src="/Generated_Assets/stairway.png"
                  alt="Holographic Stairway Icon"
                  fill
                  sizes="(max-width: 768px) 100vw, 145px"
                  className="object-cover opacity-85 mix-blend-lighten pointer-events-none filter drop-shadow-[0_0_20px_rgba(168,85,247,0.25)] transition-transform duration-700 group-hover:scale-105"
                  priority
                />
              </div>
            }
          />
        </div>

        {/* [FOOTER TIED STRIP - METRICS] */}
        <div className="metrics-strip mt-8 border border-white/[0.06] rounded-[24px] bg-[#0b0e1a]/40 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-y-0 divide-white/[0.06]">

          {/* Column 1 - 4.8★ */}
          <div className="metric-block p-6 sm:p-8 flex items-center gap-4 transition-colors hover:bg-white/[0.02] group">
            <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,201,129,0.2)] transition-all duration-300 group-hover:scale-110">
              <Star className="w-5.5 h-5.5 fill-emerald-400" />
            </div>
            <div>
              <span className="text-3xl font-extrabold tracking-tight text-white font-sans block leading-none">
                <CountUpNumber value="4.8★" duration={1.5} />
              </span>
              <span className="mt-2 text-[10px] font-semibold leading-[1.3] text-white/50 tracking-wider uppercase font-mono block max-w-[20ch]">
                AVERAGE RATING ACROSS ALL COURSES
              </span>
            </div>
          </div>

          {/* Column 2 - 141+ */}
          <div className="metric-block p-6 sm:p-8 flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/[0.06] transition-colors hover:bg-white/[0.02] group">
            <div className="w-12 h-12 rounded-full border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 group-hover:scale-110">
              <Users className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-3xl font-extrabold tracking-tight text-white font-sans block leading-none">
                <CountUpNumber value="141+" duration={1.5} />
              </span>
              <span className="mt-2 text-[10px] font-semibold leading-[1.3] text-white/50 tracking-wider uppercase font-mono block max-w-[20ch]">
                VERIFIED LEARNER REVIEWS
              </span>
            </div>
          </div>

          {/* Column 3 - 5 */}
          <div className="metric-block p-6 sm:p-8 flex items-center gap-4 border-t sm:border-t lg:border-t-0 lg:border-l border-white/[0.06] transition-colors hover:bg-white/[0.02] group">
            <div className="w-12 h-12 rounded-full border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,201,129,0.2)] transition-all duration-300 group-hover:scale-110">
              <Shield className="w-5.5 h-5.5" />
            </div>
            <div>
              <span className="text-3xl font-extrabold tracking-tight text-white font-sans block leading-none">
                <CountUpNumber value="5" duration={1.2} />
              </span>
              <span className="mt-2 text-[10px] font-semibold leading-[1.3] text-white/50 tracking-wider uppercase font-mono block max-w-[20ch]">
                SPECIALISED FINTECH TRACKS
              </span>
            </div>
          </div>

          {/* Column 4 - ₹999 */}
          <div className="metric-block p-6 sm:p-8 flex items-center gap-4 border-t sm:border-t sm:border-l border-white/[0.06] transition-colors hover:bg-white/[0.02] group">
            <div className="w-12 h-12 rounded-full border border-purple-500/30 bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 group-hover:scale-110">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div>
              <span className="text-3xl font-extrabold tracking-tight text-white font-sans block leading-none">
                ₹<CountUpNumber value="999" duration={1.5} />
              </span>
              <span className="mt-2 text-[10px] font-semibold leading-[1.3] text-white/50 tracking-wider uppercase font-mono block max-w-[20ch]">
                COMMITMENT FEE TO START
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
