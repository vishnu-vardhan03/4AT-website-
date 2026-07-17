"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { featureCards, ratings, type FeatureCard } from "@/components/academy/data";
import { ScrollRevealText } from "@/components/academy/ScrollRevealText";
import { DecryptedText } from "@/components/academy/DecryptedText";
import { NeonGlowOrb } from "@/components/academy/NeonGlowOrb";

// Per-card ambient accent config (index 0–4)
const CARD_ACCENTS = [
  {
    // 01 — emerald
    gradient:   "linear-gradient(135deg, rgba(0,255,180,0.08) 0%, transparent 60%)",
    glow:       "rgba(0,255,180,0.18)",
    borderGlow: "rgba(0,255,180,0.10)",
    chipBorder: "rgba(0,255,180,0.14)",
    chipBg:     "rgba(0,255,180,0.04)",
    vignette:   "rgba(0,255,180,0.04)",
    hoverBorderGlow: "rgba(0,255,180,0.22)",
    mouseGlow:  "rgba(0,229,195,0.12)",
  },
  {
    // 02 — cyan
    gradient:   "linear-gradient(135deg, rgba(0,210,255,0.08) 0%, transparent 60%)",
    glow:       "rgba(0,210,255,0.18)",
    borderGlow: "rgba(0,210,255,0.10)",
    chipBorder: "rgba(0,210,255,0.14)",
    chipBg:     "rgba(0,210,255,0.04)",
    vignette:   "rgba(0,210,255,0.04)",
    hoverBorderGlow: "rgba(0,210,255,0.22)",
    mouseGlow:  "rgba(0,210,255,0.12)",
  },
  {
    // 03 — violet
    gradient:   "linear-gradient(135deg, rgba(170,100,255,0.09) 0%, transparent 60%)",
    glow:       "rgba(170,100,255,0.20)",
    borderGlow: "rgba(170,100,255,0.10)",
    chipBorder: "rgba(170,100,255,0.14)",
    chipBg:     "rgba(170,100,255,0.04)",
    vignette:   "rgba(170,100,255,0.04)",
    hoverBorderGlow: "rgba(170,100,255,0.24)",
    mouseGlow:  "rgba(170,100,255,0.12)",
  },
  {
    // 04 — teal
    gradient:   "linear-gradient(135deg, rgba(50,220,220,0.08) 0%, transparent 60%)",
    glow:       "rgba(50,220,220,0.18)",
    borderGlow: "rgba(50,220,220,0.10)",
    chipBorder: "rgba(50,220,220,0.14)",
    chipBg:     "rgba(50,220,220,0.04)",
    vignette:   "rgba(50,220,220,0.04)",
    hoverBorderGlow: "rgba(50,220,220,0.22)",
    mouseGlow:  "rgba(50,220,220,0.12)",
  },
  {
    // 05 — purple
    gradient:   "linear-gradient(135deg, rgba(185,110,255,0.08) 0%, transparent 60%)",
    glow:       "rgba(185,110,255,0.18)",
    borderGlow: "rgba(185,110,255,0.10)",
    chipBorder: "rgba(185,110,255,0.14)",
    chipBg:     "rgba(185,110,255,0.04)",
    vignette:   "rgba(185,110,255,0.04)",
    hoverBorderGlow: "rgba(185,110,255,0.22)",
    mouseGlow:  "rgba(185,110,255,0.12)",
  },
] as const;

function FeatureTile({ card, index }: { card: FeatureCard; index: number }) {
  const cardRef = useRef<HTMLElement>(null);
  const accent = CARD_ACCENTS[index] ?? CARD_ACCENTS[0];

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }

  // Border mapping — internal dividers only, no outer edges
  const borderClasses = [
    "border-b lg:border-r border-[#151e2e]",
    "border-b lg:border-r border-[#151e2e]",
    "border-b lg:border-r-0 border-[#151e2e]",
    "border-b lg:border-b-0 lg:border-r border-[#151e2e]",
    "border-b-0 lg:border-none border-[#151e2e]",
  ][index];

  // Corner tile rounding — handled by parent card overflow-hidden, tiles stay flat
  return (
    <div className={`feature-tile-wrapper h-full ${card.span === "double" ? "lg:col-span-2" : ""}`}>
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className={`feature-tile group relative flex h-full min-h-[360px] flex-col justify-between overflow-hidden rounded-none px-6 py-8 duration-250 sm:px-8 sm:py-9 lg:min-h-[460px] ${borderClasses}`}
        style={{
          background: "#090B0F",
          transition: "transform 250ms ease, box-shadow 250ms ease",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
          (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.6), 0 0 30px ${accent.hoverBorderGlow}`;
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0px)";
          (e.currentTarget as HTMLElement).style.boxShadow = "none";
        }}
      >
        {/* Ambient directional gradient overlay — the core color layer */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: accent.gradient }}
        />

        {/* Large radial bloom glow — sits behind content */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 z-0 rounded-full"
          style={{
            width: "300px",
            height: "300px",
            background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)`,
            filter: "blur(90px)",
            opacity: 0.65,
          }}
        />

        {/* Corner vignette accent */}
        <div
          className="pointer-events-none absolute top-0 left-0 w-32 h-32 z-0"
          style={{
            background: `radial-gradient(circle at top left, ${accent.vignette} 0%, transparent 70%)`,
          }}
        />

        {/* Mouse-follow cursor blob */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover-fine:opacity-100 z-1"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${accent.mouseGlow}, transparent 80%)`,
          }}
        />

        <div className="relative z-10">
          <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#00e5c3]/70 font-mono">
            {card.id}
          </p>
          <h3 className="mt-8 lg:mt-12 text-h3 font-bold leading-[1.25] tracking-[-0.02em] text-white font-sans group-hover-fine:text-accent transition-colors duration-300">
            {card.title}
          </h3>
          <p className="mt-4 text-small font-normal leading-[1.65] tracking-[0.015em] text-ink-secondary font-sans max-w-[58ch]">
            {card.body}
          </p>
        </div>

        <div className="relative z-10 mt-8 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-3.5 py-1.5 text-[11px] font-semibold leading-none tracking-[0.04em] font-sans text-white/70 transition-colors duration-200"
              style={{
                border: `1px solid ${accent.chipBorder}`,
                background: accent.chipBg,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}


export function Features({ sectionId = "programs" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Heading block reveal
      gsap.fromTo(
        ".features-heading",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".features-heading",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // Staggered tile reveals — each tile lifts in individually
      const tiles = gsap.utils.toArray(".feature-tile-wrapper");
      if (tiles.length > 0) {
        gsap.fromTo(
          tiles,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-grid",
              start: "top 80%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }

      // Ratings strip — staggered scale+fade
      const stats = gsap.utils.toArray(".feature-stat");
      if (stats.length > 0) {
        gsap.fromTo(
          stats,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".features-stats-grid",
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full">
      <section
        ref={sectionRef}
        id={sectionId}
        className="site-shell section-padding relative overflow-hidden"
      >
        {/* Background ambient radial glow */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00e5c3]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="features-heading relative z-10 flex flex-col gap-6">
          {/* Eyebrow Label */}
          <div>
            <span className="section-eyebrow">
              WHY OUR PRODUCT
            </span>
          </div>

          {/* Main heading and description layout */}
          <div className="flex flex-col lg:flex-row justify-between lg:items-stretch gap-8 lg:gap-12">
            <div id="why-our-product-heading" className="max-w-[560px] shrink-0 relative">
              <NeonGlowOrb 
                className="left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
                size={180}
                opacity={0.22}
                blur={30}
              />
              <h2 className="section-title relative z-10">
                Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Finance,</span>
                <br />
                Designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400">Outcomes.</span>
              </h2>
            </div>

            {/* Vertical Divider */}
            <div className="w-full h-px bg-[#151e2e] lg:w-px lg:h-auto lg:self-stretch lg:my-2" />

            <div className="lg:pt-2.5 max-w-[560px]">
              <ScrollRevealText
                text="We engineered this platform specifically for the complexity, compliance demands, and pace of financial education. That means structured tracks built around real job roles, with SOX, IFRS, and Big 4 standards treated as foundation rather than add-ons."
                className="section-desc"
              />
            </div>
          </div>
        </div>

        {/* Premium Card: Bento Grid + Ratings wrapped as one cohesive surface */}
        <div className="mt-16 lg:mt-24 relative z-10">
          {/* Soft radial glow behind the card */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,255,180,0.09) 0%, transparent 70%)",
              borderRadius: "32px",
            }}
          />
          {/* The card itself */}
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "32px",
              background: "linear-gradient(160deg, #0d1210 0%, #0a0f0d 50%, #090d0c 100%)",
              border: "1px solid rgba(0,255,180,0.35)",
              boxShadow: "0 0 0 1px rgba(0,255,180,0.08), 0 0 20px rgba(0,255,180,0.14), 0 0 60px rgba(0,255,180,0.07), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Bento Grid — internal dividers kept, outer border removed */}
            <div className="features-grid grid grid-cols-1 gap-0 lg:grid-cols-3">
              {featureCards.map((card, index) => (
                <FeatureTile key={card.id} card={card} index={index} />
              ))}
            </div>

            {/* Ratings Footer — internal dividers kept, outer x/b border removed */}
            <div className="features-stats-grid grid grid-cols-2 border-t border-[#151e2e] sm:grid-cols-4">
              {ratings.map((stat, index) => {
                const statBorderClasses = [
                  "border-r border-b border-[#151e2e] sm:border-b-0",
                  "border-b border-[#151e2e] sm:border-r sm:border-b-0",
                  "border-r border-[#151e2e]",
                  "",
                ][index];

                return (
                  <div
                    key={stat.label}
                    className={`feature-stat flex min-h-[160px] flex-col items-center justify-center px-6 py-8 text-center last:border-r-0 ${statBorderClasses}`}
                  >
                    <p className="feature-stat-value text-[38px] font-bold tracking-tight text-[#151e2e] leading-none font-sans">
                      <DecryptedText text={stat.value} speed={50} delay={index * 100} />
                    </p>
                    <p className="feature-stat-label mt-3 max-w-[18ch] text-[12px] font-semibold leading-[1.4] uppercase tracking-wider text-[#4a6a7a] font-mono">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
