"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardCheck, TrendingUp, MessageCircle, Users } from "lucide-react";
import { SectionPill } from "./SectionPill";

interface StepData {
  step: string;
  title: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  accentColor: string;
  accentRgb: string;
  glowColor: string;
  hoverGlowColor: string;
  iconColor: string;
}

const stepsData: StepData[] = [
  {
    step: "01",
    title: "Pre-assessment",
    description: "Choose your track & take a free eligibility check.",
    icon: ClipboardCheck,
    accentColor: "#4ade80", // Softer emerald green
    accentRgb: "74, 222, 128",
    glowColor: "rgba(20, 241, 149, 0.1)",
    hoverGlowColor: "rgba(20, 241, 149, 0.45)",
    iconColor: "text-emerald-400"
  },
  {
    step: "02",
    title: "Confirm seat",
    description: "Secure your spot with ₹999 + GST.",
    icon: TrendingUp,
    accentColor: "#67c8e8", // Softer cyan blue
    accentRgb: "103, 200, 232",
    glowColor: "rgba(42, 205, 255, 0.1)",
    hoverGlowColor: "rgba(42, 205, 255, 0.45)",
    iconColor: "text-cyan-400"
  },
  {
    step: "03",
    title: "Learn",
    description: "Hands-on training from industry experts.",
    icon: MessageCircle,
    accentColor: "#a78bfa", // Softer violet purple
    accentRgb: "167, 139, 250",
    glowColor: "rgba(156, 91, 255, 0.1)",
    hoverGlowColor: "rgba(156, 91, 255, 0.45)",
    iconColor: "text-purple-400"
  },
  {
    step: "04",
    title: "AI & ML",
    description: "Master AI-driven finance tools & automation.",
    icon: Users,
    accentColor: "#f472b6", // Softer pink
    accentRgb: "244, 114, 182",
    glowColor: "rgba(244, 114, 182, 0.1)",
    hoverGlowColor: "rgba(244, 114, 182, 0.45)",
    iconColor: "text-pink-400"
  },
  {
    step: "05",
    title: "Mentorship",
    description: "Finance-leader mentoring & career readiness.",
    icon: MessageCircle,
    accentColor: "#fbbf24", // Amber
    accentRgb: "251, 191, 36",
    glowColor: "rgba(251, 191, 36, 0.1)",
    hoverGlowColor: "rgba(251, 191, 36, 0.45)",
    iconColor: "text-amber-400"
  },
  {
    step: "06",
    title: "Assess & Place",
    description: "Post-assessment → interview → placement.",
    icon: TrendingUp,
    accentColor: "#4ade80", // Softer emerald green
    accentRgb: "74, 222, 128",
    glowColor: "rgba(20, 241, 149, 0.1)",
    hoverGlowColor: "rgba(20, 241, 149, 0.45)",
    iconColor: "text-emerald-400"
  }
];

export function HowItWorks({ sectionId = "selection-metrics" }: { sectionId?: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  // Five separate segments between the six nodes
  const seg1Ref = useRef<HTMLDivElement>(null);
  const seg2Ref = useRef<HTMLDivElement>(null);
  const seg3Ref = useRef<HTMLDivElement>(null);
  const seg4Ref = useRef<HTMLDivElement>(null);
  const seg5Ref = useRef<HTMLDivElement>(null);

  const particleRef = useRef<HTMLDivElement>(null);
  const nodeContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Spawns elegant stage-centered scatter particles and expanding waves (restrained, 450ms duration)
  const triggerNodeBurst = (nodeIdx: number) => {
    const container = nodeContainerRefs.current[nodeIdx];
    if (!container) return;

    const currentStep = stepsData[nodeIdx];
    if (!currentStep) return;

    const accentColor = currentStep.accentColor;
    const nodeCircleWrapper = container.querySelector(".pipeline-node-wrapper");
    if (!nodeCircleWrapper) return;

    // 1. Neon ring expands / Energy wave radiates outward directly around the stage icon (450ms duration)
    const wave = document.createElement("div");
    wave.className = "absolute rounded-full border pointer-events-none z-0";
    wave.style.borderColor = accentColor;
    wave.style.boxShadow = `0 0 16px ${accentColor}`;
    wave.style.width = "70px";
    wave.style.height = "70px";
    wave.style.left = "50%";
    wave.style.top = "50%";
    wave.style.transform = "translate(-50%, -50%) scale(1)";
    wave.style.opacity = "0.85";
    nodeCircleWrapper.appendChild(wave);

    gsap.to(wave, {
      scale: 1.45,
      opacity: 0,
      duration: 0.45,
      ease: "power3.out",
      onComplete: () => wave.remove()
    });

    // 2. Tiny energy particles burst around icon
    const burstCount = 10;
    for (let i = 0; i < burstCount; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-1.5 h-1.5 rounded-full pointer-events-none z-30";
      p.style.backgroundColor = accentColor;
      p.style.boxShadow = `0 0 8px ${accentColor}`;
      p.style.left = "50%";
      p.style.top = "50%";
      p.style.transform = "translate(-50%, -50%)";

      nodeCircleWrapper.appendChild(p);

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 28 + 16;
      const destX = Math.cos(angle) * distance;
      const destY = Math.sin(angle) * distance;

      gsap.to(p, {
        x: destX,
        y: destY,
        opacity: 0,
        scale: 0.1,
        duration: Math.random() * 0.4 + 0.3,
        ease: "power3.out",
        onComplete: () => p.remove()
      });
    }
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // DESKTOP: CSS sticky + GSAP scrub
    mm.add("(min-width: 768px)", () => {
      if (!wrapperRef.current || !sectionRef.current || !triggerRef.current || !particleRef.current) return;

      // Set clean initial styles matching Stage 01 Active state
      gsap.set(".pipeline-node-wrapper", { opacity: 0.45 });
      gsap.set(".stage-text-block", { opacity: 0.45, y: 12 });
      gsap.set(".active-ring-overlay", { opacity: 0, scale: 0.8 });
      gsap.set(".active-halo-overlay", { opacity: 0 });
      gsap.set(".hiw-content-wrapper", { y: 0 });

      // Inactive stage text styles
      gsap.set(".stage-label", { color: "rgba(255, 255, 255, 0.3)" });
      gsap.set(".stage-title", { color: "rgba(255, 255, 255, 0.55)" });
      gsap.set(".stage-desc", { color: "rgba(255, 255, 255, 0.45)" });

      // Stage 1 starts active initially
      gsap.set(".node-wrapper-0", { opacity: 1.0 });
      gsap.set(".node-circle-0", { scale: 1.08, borderColor: "#14F195", boxShadow: "0 0 24px rgba(20, 241, 149, 0.45)" });
      gsap.set(".node-icon-0", { color: "#14F195", scale: 1.08, filter: "brightness(1.25)" });
      gsap.set(".stage-text-block-0", { opacity: 1.0, y: 0 });
      gsap.set(".active-ring-overlay-0", { opacity: 0.18, scale: 1 });
      gsap.set(".active-halo-overlay-0", { opacity: 0.15 });
      gsap.set(".stage-label-0", { color: "#14F195" });
      gsap.set(".stage-title-0", { color: "#ffffff" });
      gsap.set(".stage-desc-0", { color: "rgba(255, 255, 255, 0.85)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "+=500%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      const nodePositions = ["8.333%", "25%", "41.667%", "58.333%", "75%", "91.667%"];
      const colors = ["#14F195", "#2ACDFF", "#9C5BFF", "#F472B6", "#FBBF24", "#14F195"];
      const segRefs = [seg1Ref, seg2Ref, seg3Ref, seg4Ref, seg5Ref];

      for (let i = 0; i < 5; i++) {
        const time = i * 1.0;
        const nextPos = nodePositions[i + 1];
        const nextColor = colors[i + 1];
        const currColor = colors[i];
        const segRef = segRefs[i];

        // 1. Particle travels & segment fills
        tl.to(particleRef.current, { left: nextPos, ease: "power1.inOut" }, time + 0.2);
        if (segRef.current) {
          tl.to(segRef.current, { width: "100%", opacity: 1.0, ease: "power1.inOut" }, time + 0.2);
        }

        // Particle color shift
        tl.to(particleRef.current, {
          boxShadow: `0 0 14px #fff, 0 0 28px ${nextColor}`,
          backgroundColor: nextColor,
          ease: "power1.inOut"
        }, time + 0.2);

        // 2. Stage i settles to completed state
        tl.to(`.stage-text-block-${i}`, { opacity: 0.7, y: 0, duration: 0.6 }, time + 0.2)
          .to(`.active-ring-overlay-${i}`, { opacity: 0, scale: 0.8, duration: 0.6 }, time + 0.2)
          .to(`.active-halo-overlay-${i}`, { opacity: 0, duration: 0.6 }, time + 0.2)
          .to(`.node-wrapper-${i}`, { opacity: 0.9, duration: 0.6 }, time + 0.2)
          .to(`.stage-label-${i}`, { color: "rgba(255, 255, 255, 0.5)", duration: 0.6 }, time + 0.2)
          .to(`.stage-title-${i}`, { color: "rgba(255, 255, 255, 0.7)", duration: 0.6 }, time + 0.2)
          .to(`.stage-desc-${i}`, { color: "rgba(255, 255, 255, 0.6)", duration: 0.6 }, time + 0.2)
          .to(`.node-circle-${i}`, {
            scale: 1.0,
            background: "rgba(7, 9, 13, 0.45)",
            borderColor: currColor,
            boxShadow: `0 0 12px ${currColor}38`,
            duration: 0.6
          }, time + 0.2);

        // 3. Stage i+1 activates
        const nextIdx = i + 1;
        tl.to(`.node-wrapper-${nextIdx}`, { opacity: 1.0, duration: 0.6 }, time + 0.3)
          .to(`.node-circle-${nextIdx}`, {
            scale: 1.08,
            background: `radial-gradient(circle at center, ${nextColor}1a 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, ${nextColor}, rgba(255,255,255,0.05)) border-box`,
            borderColor: nextColor,
            boxShadow: `0 0 24px ${nextColor}73`,
            duration: 0.6
          }, time + 0.3)
          .to(`.node-icon-${nextIdx}`, { color: nextColor, scale: 1.08, filter: "brightness(1.25)", duration: 0.5 }, time + 0.3)
          .to(`.active-ring-overlay-${nextIdx}`, { opacity: 0.18, scale: 1, duration: 0.5 }, time + 0.3)
          .to(`.active-halo-overlay-${nextIdx}`, { opacity: 0.15, duration: 0.5 }, time + 0.3)
          .to(`.stage-text-block-${nextIdx}`, { opacity: 1.0, y: 0, duration: 0.6 }, time + 0.3)
          .to(`.stage-label-${nextIdx}`, { color: nextColor, duration: 0.5 }, time + 0.3)
          .to(`.stage-title-${nextIdx}`, { color: "#ffffff", duration: 0.5 }, time + 0.3)
          .to(`.stage-desc-${nextIdx}`, { color: "rgba(255, 255, 255, 0.85)", duration: 0.5 }, time + 0.3);

        // 4. Reach Stage i+1 Node impact triggers
        const burstIdx = nextIdx;
        tl.call(() => {
          if (tl.scrollTrigger && tl.scrollTrigger.direction > 0) {
            triggerNodeBurst(burstIdx);
          }
        }, [], time + 0.8);

        tl.to(`.node-circle-${nextIdx}`, { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.18 }, time + 0.8)
          .to(`.node-circle-${nextIdx}`, { scale: 1.08, filter: "brightness(1.0)", duration: 0.35, ease: "power3.out" }, time + 1.0);
      }
    });

    // MOBILE: Vertical Scroll Trigger
    mm.add("(max-width: 767px)", () => {
      stepsData.forEach((_, idx) => {
        gsap.fromTo(`.node-wrapper-${idx}`,
          { opacity: 0.35 },
          {
            opacity: 1.0,
            duration: 0.5,
            scrollTrigger: {
              trigger: `.node-container-${idx}`,
              start: "top 75%",
              toggleActions: "play reverse play reverse"
            }
          }
        );

        gsap.fromTo(`.stage-text-block-${idx}`,
          { opacity: 0.35, y: 12 },
          {
            opacity: 1.0,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: `.node-container-${idx}`,
              start: "top 75%",
              toggleActions: "play reverse play reverse"
            }
          }
        );
      });
    });

    // Header reveal scroll interaction
    gsap.fromTo(
      ".hiw-header-fade",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <div ref={wrapperRef} id={sectionId} className="md:h-[550vh] relative">
    <div
      ref={sectionRef}
      className="w-full relative bg-[var(--color-canvas)] md:sticky md:top-0 md:h-screen h-auto border-t border-white/[0.03]"
    >
      {/* Container centers content vertically and spans full height on desktop */}
      <div className="relative w-full h-full z-10">

        {/* Decorative Grid Mesh */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
        <div className="absolute inset-0 pipeline-grid opacity-40 pointer-events-none" />

        <div className="site-shell relative z-10 w-full h-full">
          <div className="hiw-content-wrapper w-full min-h-[100dvh] md:h-full flex flex-col justify-between py-12 md:py-16 relative z-10">

            {/* Header Section */}
            <div className="hiw-header-fade flex flex-col items-start max-w-4xl w-full mb-6 md:mb-8">
              {/* Eyebrow */}
              <SectionPill className="mb-3 md:mb-4">
                SELECTION METRICS
              </SectionPill>

              <h2 className="section-title">
                Every learner is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">evaluated</span> <br /> before becoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">job-ready</span>.
              </h2>

              <p className="section-desc">
                We do not treat course completion as the same thing as readiness. Each learner moves through a structured evaluation process before placement support begins.
              </p>
            </div>

            {/* Pipeline Diagram Zone */}
            <div className="w-full flex-grow flex items-center justify-center py-4 md:py-6">

              <div ref={triggerRef} className="relative w-full">

                {/* Background Watermark centered behind the timeline/orbit */}
                <div className="absolute left-1/2 top-[35px] -translate-x-1/2 -translate-y-1/2 text-[100px] sm:text-[160px] lg:text-[220px] xl:text-[240px] font-black tracking-[0.14em] pl-[0.14em] text-white/[0.045] pointer-events-none select-none z-0 font-display text-center whitespace-nowrap">
                  PROCESS
                </div>

                {/* Desktop View Horizontal Connectors (Segmented across 6 nodes) */}
                {/* Segment 1: 01 (8.333%) -> 02 (25%) */}
                <div className="hidden md:block absolute top-[35px] left-[8.333%] w-[16.667%] h-[3px] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#262A31]" />
                  <div ref={seg1Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#14F195] to-[#2ACDFF] w-0 shadow-[0_0_8px_rgba(42,205,255,0.3)] brightness-[120%]" />
                </div>

                {/* Segment 2: 02 (25%) -> 03 (41.667%) */}
                <div className="hidden md:block absolute top-[35px] left-[25%] w-[16.667%] h-[3px] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#262A31]" />
                  <div ref={seg2Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2ACDFF] to-[#9C5BFF] w-0 shadow-[0_0_8px_rgba(156,91,255,0.3)] brightness-[120%]" />
                </div>

                {/* Segment 3: 03 (41.667%) -> 04 (58.333%) */}
                <div className="hidden md:block absolute top-[35px] left-[41.667%] w-[16.667%] h-[3px] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#262A31]" />
                  <div ref={seg3Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9C5BFF] to-[#F472B6] w-0 shadow-[0_0_8px_rgba(244,114,182,0.3)] brightness-[120%]" />
                </div>

                {/* Segment 4: 04 (58.333%) -> 05 (75%) */}
                <div className="hidden md:block absolute top-[35px] left-[58.333%] w-[16.667%] h-[3px] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#262A31]" />
                  <div ref={seg4Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F472B6] to-[#FBBF24] w-0 shadow-[0_0_8px_rgba(251,191,36,0.3)] brightness-[120%]" />
                </div>

                {/* Segment 5: 05 (75%) -> 06 (91.667%) */}
                <div className="hidden md:block absolute top-[35px] left-[75%] w-[16.667%] h-[3px] pointer-events-none z-0">
                  <div className="absolute inset-0 bg-[#262A31]" />
                  <div ref={seg5Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FBBF24] to-[#14F195] w-0 shadow-[0_0_8px_rgba(20,241,149,0.3)] brightness-[120%]" />
                </div>

                {/* Travelling particle at tip of active connector line */}
                <div
                  ref={particleRef}
                  className="hidden md:block absolute top-[35px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-[5] pointer-events-none"
                  style={{
                    left: "8.333%",
                    opacity: 1,
                    background: "#14F195",
                    boxShadow: "0 0 8px #fff, 0 0 14px #14F195"
                  }}
                >
                  <div className="absolute inset-[-3px] rounded-full blur-[2px] opacity-50 bg-inherit" />
                  <div className="absolute inset-[-7px] rounded-full blur-[5px] opacity-20 bg-inherit" />
                </div>

                {/* Nodes & Process Blocks Grid (Single horizontal row of 6 columns on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-2 relative z-10">
                  {stepsData.map((step, idx) => {
                    const IconComponent = step.icon;

                    return (
                      <div
                        key={step.step}
                        ref={(el) => {
                          nodeContainerRefs.current[idx] = el;
                        }}
                        className={`node-container-${idx} flex flex-col items-start lg:items-center text-left lg:text-center group transition-all duration-500`}
                      >

                        {/* Node Circle (70px size) */}
                        <div className={`pipeline-node-wrapper node-wrapper-${idx} relative mb-4 lg:mx-auto flex items-center justify-center`}>
                          <div
                            className={`active-halo-overlay active-halo-overlay-${idx} absolute inset-[-14px] rounded-full blur-[8px] pointer-events-none opacity-0`}
                            style={{ background: step.accentColor }}
                          />

                          <div
                            className={`active-ring-overlay active-ring-overlay-${idx} absolute inset-[-6px] rounded-full border border-dashed animate-spin-slow pointer-events-none opacity-0`}
                            style={{ borderColor: step.accentColor }}
                          />

                          <div
                            className={`pipeline-node node-circle-${idx} w-[70px] h-[70px] rounded-full border-[2px] flex items-center justify-center relative z-10 backdrop-blur-md`}
                            style={{
                              background: idx === 0
                                ? `radial-gradient(circle at center, ${step.glowColor} 0%, #0B0F12 100%)`
                                : "#0B0F12",
                              borderColor: idx === 0 ? step.accentColor : "rgba(255,255,255,0.08)",
                              boxShadow: idx === 0
                                ? `0 0 10px ${step.accentColor}2e, 0 0 18px ${step.accentColor}1a, 0 0 30px ${step.accentColor}0d`
                                : "none",
                            }}
                          >
                            <div
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                width: "78%", height: "78%",
                                top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                border: `1px solid ${idx === 0 ? step.accentColor + "38" : "rgba(255,255,255,0.06)"}`,
                              }}
                            />
                            <div
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                width: "56%", height: "56%",
                                top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                background: idx === 0 ? `${step.accentColor}14` : "transparent",
                              }}
                            />
                            <IconComponent className={`w-6 h-6 stroke-[1.5] transition-all duration-300 node-icon-${idx} relative z-10 ${
                              idx === 0 ? `${step.iconColor} brightness-110 node-icon-breathe` : `${step.iconColor} opacity-40`
                            }`} />
                          </div>
                        </div>

                        {/* Step Process Content */}
                        <div className={`stage-text-block stage-text-block-${idx} w-full max-w-[190px] lg:mx-auto flex flex-col items-start lg:items-center transform`}>
                          <span className={`stage-label stage-label-${idx} text-[10px] font-mono tracking-widest uppercase font-semibold mb-1 transition-colors duration-300`}>
                            STAGE {step.step}
                          </span>
                          <h3 className={`stage-title stage-title-${idx} text-sm sm:text-base lg:text-lg font-bold tracking-tight mb-1 leading-[1.2] font-display transition-all duration-300`}>
                            {step.title}
                          </h3>
                          <p className={`stage-desc stage-desc-${idx} text-white/72 text-[11px] sm:text-[12px] leading-[1.4] font-sans font-normal transition-colors duration-300`}>
                            {step.description}
                          </p>
                        </div>

                      </div>
                    );
                  })}
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="w-full mt-auto">
              <div className="w-full h-[1px] bg-white/12 mb-4 relative z-10" />
              <div className="text-left relative z-10 max-w-3xl px-4">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-white/55 uppercase block leading-relaxed font-semibold">
                  Only learners who successfully complete every evaluation stage proceed to placement support.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    </div>
  );
}
