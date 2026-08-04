"use client";

import { useRef, useLayoutEffect } from "react";
import { Users, Check } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionPill } from "./SectionPill";

interface AudienceCard {
  id: string;
  level: string;
  subEyebrow: string;
  accentClass: string;
  bulletAccentClass: string;
  badgeColors: string;
  title: string;
  description: string;
  bullets: string[];
  idealForText: string;
  watermark: string;
  cardBg: string;
  cardBorderGrad: string;
  cardHoverBorderGrad: string;
  cardGlowShadow: string;
  cardHoverShadow: string;
  tags: string[];
}

const cardsData: AudienceCard[] = [
  {
    id: "01",
    level: "LEVEL 01",
    subEyebrow: "Freshers",
    accentClass: "text-emerald-400",
    bulletAccentClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    badgeColors: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
    title: "Freshers Track",
    description: "Build role clarity and your first credible finance portfolio.",
    bullets: [
      "Structured MNC accounting and audit tracks",
      "Interview and resume calibration from day one",
      "Tool-first learning with guided mentorship"
    ],
    idealForText: "Students and freshers starting their finance career.",
    watermark: "01",
    cardBg: "linear-gradient(to bottom, rgba(16, 201, 129, 0.05), rgba(9, 11, 17, 0)) padding-box, radial-gradient(circle at top left, rgba(16, 201, 129, 0.1) 0%, transparent 60%) padding-box, linear-gradient(#090b11, #06070a) padding-box",
    cardBorderGrad: "linear-gradient(to bottom right, rgba(16, 201, 129, 0.28) 0%, rgba(16, 201, 129, 0.15) 50%, rgba(16, 201, 129, 0.26) 100%)",
    cardHoverBorderGrad: "linear-gradient(to bottom right, rgba(16, 201, 129, 0.5) 0%, rgba(16, 201, 129, 0.25) 50%, rgba(16, 201, 129, 0.45) 100%)",
    cardGlowShadow: "0 4px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(16, 201, 129, 0.04)",
    cardHoverShadow: "0 12px 30px rgba(0,0,0,0.9), inset 0 0 25px rgba(16, 201, 129, 0.18)",
    tags: ["INTERVIEW READY", "ROLE READY", "PORTFOLIO READY"]
  },
  {
    id: "02",
    level: "LEVEL 02+",
    subEyebrow: "Professionals",
    accentClass: "text-purple-400",
    bulletAccentClass: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    badgeColors: "border-purple-500/20 bg-purple-500/5 text-purple-400",
    title: "Professionals Track",
    description: "Move from experience to specialization with sharper compliance exposure.",
    bullets: [
      "Advanced IFRS, SOX, IA, and FP&A pathways",
      "Promotion-oriented project simulations",
      "Placement support for global finance teams"
    ],
    idealForText: "Professionals and analysts seeking career acceleration.",
    watermark: "02",
    cardBg: "linear-gradient(to bottom, rgba(139, 92, 246, 0.05), rgba(9, 11, 17, 0)) padding-box, radial-gradient(circle at top right, rgba(139, 92, 246, 0.1) 0%, transparent 60%) padding-box, linear-gradient(#090b11, #06070a) padding-box",
    cardBorderGrad: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.28) 0%, rgba(139, 92, 246, 0.15) 50%, rgba(139, 92, 246, 0.26) 100%)",
    cardHoverBorderGrad: "linear-gradient(to bottom right, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0.25) 50%, rgba(139, 92, 246, 0.45) 100%)",
    cardGlowShadow: "0 4px 20px rgba(0,0,0,0.8), inset 0 0 15px rgba(139, 92, 246, 0.04)",
    cardHoverShadow: "0 12px 30px rgba(0,0,0,0.9), inset 0 0 25px rgba(139, 92, 246, 0.18)",
    tags: ["IFRS", "SOX", "FP&A", "COMPLIANCE"]
  }
];

export function TargetAudience({ sectionId = "audience-spectrum" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Header reveal
      gsap.fromTo(
        ".audience-header-animate",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // 2. Cards entrance
      gsap.fromTo(
        ".audience-card-animate",
        { opacity: 0, y: 80, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardContainerRef.current,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className="w-full section-padding relative overflow-hidden bg-transparent text-white border-t border-white/[0.03]"
    >
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient glows behind cards */}
      <div className="absolute bottom-[20%] right-1/4 translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />



      <div className="site-shell relative z-10">
        {/* Header Section */}
        <div className="diff-heading flex flex-col items-start mb-12 max-w-4xl audience-header-animate">
          {/* Neon pill eyebrow */}
          <SectionPill className="mb-6">
            WHO IS IT FOR
          </SectionPill>

          <h2 className="section-title">
            Built for two different <span className="career-journeys-gradient font-sans">career journeys</span> <br /> without compromising either.
          </h2>

          <p className="section-desc">
            Whether you&apos;re starting your finance career or building on existing experience, each pathway is designed around your current stage while leading to the same placement-ready outcome.
          </p>
        </div>

        {/* Dual Cards Grid */}
        <div
          ref={cardContainerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-14 w-full relative z-10"
        >
          {cardsData.map((card) => (
            <div
              key={card.id}
              className="audience-card-animate audience-card group relative rounded-[28px] pt-[30px] px-[36px] pb-[30px] min-h-[260px] sm:min-h-[190px] md:min-h-[270px] lg:min-h-[250px] flex flex-col justify-between overflow-hidden"
              style={{
                "--card-bg": card.cardBg,
                "--card-border-grad": card.cardBorderGrad,
                "--card-hover-border-grad": card.cardHoverBorderGrad,
                "--card-glow-shadow": card.cardGlowShadow,
                "--card-hover-shadow": card.cardHoverShadow,
              } as React.CSSProperties}
            >
              {/* Glowing Top-Left Corner Dot/Node */}
              <div
                className="absolute top-0 left-[48px] w-4 h-[2px] z-20"
                style={{
                  backgroundColor: card.id === "01" ? "#10c981" : "#8b5cf6",
                  boxShadow: card.id === "01" ? "0 0 12px rgba(16,201,129,0.8)" : "0 0 12px rgba(139,92,246,0.8)"
                }}
              />

              {/* Internal soft neon glow backing */}
              <div
                className="absolute w-[240px] h-[240px] rounded-full blur-[70px] pointer-events-none z-0 opacity-20 transition-opacity duration-500 group-hover:opacity-30"
                style={{
                  background: card.id === "01" ? "rgba(16, 201, 129, 0.4)" : "rgba(139, 92, 246, 0.4)",
                  top: "-60px",
                  right: "-60px"
                }}
              />

              {/* Large Watermark Number */}
              <div
                className={`absolute right-6 top-4 text-[190px] font-bold font-mono tracking-tighter leading-none select-none pointer-events-none z-0 transition-opacity duration-500 opacity-[0.09] group-hover:opacity-15 ${card.id === "01" ? "text-emerald-400" : "text-purple-400"
                  }`}
              >
                {card.watermark}
              </div>

              <div>
                {/* Eyebrow badge and dot */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${card.id === "01" ? "bg-emerald-400 shadow-[0_0_8px_#10b981]" : "bg-purple-400 shadow-[0_0_8px_#a855f7]"}`} />
                  <span className={`inline-block text-[10px] font-bold tracking-widest px-3.5 py-1.5 rounded-full border font-mono ${card.badgeColors}`}>
                    {card.level}
                  </span>
                  <span className="ml-auto text-[11px] font-mono text-white/20 select-none">
                    {card.id === "01" ? "STAGE_01" : "STAGE_02"}
                  </span>
                </div>

                {/* Sub-eyebrow */}
                <div className={`text-[12px] font-mono uppercase tracking-wider font-semibold mb-3 ${card.id === "01" ? "text-emerald-400/90" : "text-purple-400/90"}`}>
                  {card.subEyebrow}
                </div>

                {/* Title */}
                <h3 className="text-3xl font-bold text-white tracking-tight mb-4 transition-colors duration-300 font-display">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-[14px] leading-[1.7] mb-5 max-w-[70%] font-sans font-normal">
                  {card.description}
                </p>

                {/* Bullet points */}
                <ul className="space-y-3 relative z-10">
                  {card.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <span className={`relative shrink-0 mt-1 select-none w-[22px] h-[22px] rounded-full flex items-center justify-center border ${card.bulletAccentClass}`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </span>
                      <p className="text-white/70 text-[14px] leading-relaxed font-sans font-normal max-w-[70%]">
                        {bullet}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ideal For Section */}
              <div className="w-full mt-5 relative z-10">
                <div className="w-full h-[1px] bg-white/10 mb-4" />
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 border ${
                    card.id === "01"
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      : "border-purple-500/20 bg-purple-500/10 text-purple-400"
                  }`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <p className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${
                      card.id === "01" ? "text-emerald-400" : "text-purple-400"
                    }`}>Ideal For</p>
                    <p className="text-white/55 text-[13px] leading-relaxed font-sans font-normal">{card.idealForText}</p>
                  </div>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
