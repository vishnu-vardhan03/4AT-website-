"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ClipboardCheck, TrendingUp, MessageCircle, Users } from "lucide-react";

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
    description: "Understand current skill level and identify the right starting track.",
    icon: ClipboardCheck,
    accentColor: "#4ade80", // Softer emerald green
    accentRgb: "74, 222, 128",
    glowColor: "rgba(20, 241, 149, 0.1)",
    hoverGlowColor: "rgba(20, 241, 149, 0.45)",
    iconColor: "text-emerald-400"
  },
  {
    step: "02",
    title: "Post-training Assessment",
    description: "Measure practical improvement and readiness after program completion.",
    icon: TrendingUp,
    accentColor: "#67c8e8", // Softer cyan blue
    accentRgb: "103, 200, 232",
    glowColor: "rgba(42, 205, 255, 0.1)",
    hoverGlowColor: "rgba(42, 205, 255, 0.45)",
    iconColor: "text-cyan-400"
  },
  {
    step: "03",
    title: "Interview Review",
    description: "Test confidence, communication, and role fit before placement routing.",
    icon: MessageCircle,
    accentColor: "#a78bfa", // Softer violet purple
    accentRgb: "167, 139, 250",
    glowColor: "rgba(156, 91, 255, 0.1)",
    hoverGlowColor: "rgba(156, 91, 255, 0.45)",
    iconColor: "text-purple-400"
  },
  {
    step: "04",
    title: "Targeted Mentorship",
    description: "Give extra support where a learner needs improvement before entering hiring conversations.",
    icon: Users,
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

  // Three separate segments between the four nodes
  const seg1Ref = useRef<HTMLDivElement>(null);
  const seg2Ref = useRef<HTMLDivElement>(null);
  const seg3Ref = useRef<HTMLDivElement>(null);

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
    wave.style.width = "82px";
    wave.style.height = "82px";
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

    // 2. Tiny energy particles burst around icon (do not cover text)
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
      const distance = Math.random() * 32 + 20; // restrained radius
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

    // DESKTOP: CSS sticky + GSAP scrub (no pin:true so Lenis never conflicts)
    mm.add("(min-width: 768px)", () => {
      if (!wrapperRef.current || !sectionRef.current || !triggerRef.current || !seg1Ref.current || !seg2Ref.current || !seg3Ref.current || !particleRef.current) return;

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
          end: "+=450%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        }
      });

      // --- STAGE 1 -> STAGE 2 (Time 0 to 1.0) ---

      // 1. Particle travels & segment 1 fills (travels 0.2 to 0.8, pauses 0.8 to 1.2)
      tl.to(particleRef.current, { left: "37.5%", ease: "power1.inOut" }, 0.2)
        .to(seg1Ref.current, { width: "100%", opacity: 1.0, ease: "power1.inOut" }, 0.2);

      // Particle color shifts to Cyan
      tl.to(particleRef.current, {
        boxShadow: "0 0 14px #fff, 0 0 28px #2ACDFF",
        backgroundColor: "#2ACDFF",
        ease: "power1.inOut"
      }, 0.2);

      // 2. Stage 1 softens/settles to completed state (opacity 90%, scale 1.0, soft glow, transparent glass fill)
      tl.to(".stage-text-block-0", { opacity: 0.7, y: 0, duration: 0.6 }, 0.2)
        .to(".active-ring-overlay-0", { opacity: 0, scale: 0.8, duration: 0.6 }, 0.2)
        .to(".active-halo-overlay-0", { opacity: 0, duration: 0.6 }, 0.2)
        .to(".node-wrapper-0", { opacity: 0.9, duration: 0.6 }, 0.2)
        .to(".stage-label-0", { color: "rgba(255, 255, 255, 0.5)", duration: 0.6 }, 0.2)
        .to(".stage-title-0", { color: "rgba(255, 255, 255, 0.7)", duration: 0.6 }, 0.2)
        .to(".stage-desc-0", { color: "rgba(255, 255, 255, 0.6)", duration: 0.6 }, 0.2)
        .to(".node-circle-0", {
          scale: 1.0,
          background: "rgba(7, 9, 13, 0.45)",
          borderColor: "#14F195",
          boxShadow: "0 0 12px rgba(20, 241, 149, 0.22)",
          duration: 0.6
        }, 0.2);

      // 3. Stage 2 activates (fades in as particle approaches)
      tl.to(".node-wrapper-1", { opacity: 1.0, duration: 0.6 }, 0.3)
        .to(".node-circle-1", {
          scale: 1.08,
          background: `radial-gradient(circle at center, rgba(42, 205, 255, 0.1) 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, #2ACDFF, rgba(255,255,255,0.05)) border-box`,
          borderColor: "#2ACDFF",
          boxShadow: "0 0 24px rgba(42, 205, 255, 0.45)",
          duration: 0.6
        }, 0.3)
        .to(".node-icon-1", { color: "#2ACDFF", scale: 1.08, filter: "brightness(1.25)", duration: 0.5 }, 0.3)
        .to(".active-ring-overlay-1", { opacity: 0.18, scale: 1, duration: 0.5 }, 0.3)
        .to(".active-halo-overlay-1", { opacity: 0.15, duration: 0.5 }, 0.3)
        .to(".stage-text-block-1", { opacity: 1.0, y: 0, duration: 0.6 }, 0.3)
        .to(".stage-label-1", { color: "#2ACDFF", duration: 0.5 }, 0.3)
        .to(".stage-title-1", { color: "#ffffff", duration: 0.5 }, 0.3)
        .to(".stage-desc-1", { color: "rgba(255, 255, 255, 0.85)", duration: 0.5 }, 0.3);

      // 4. Reach Stage 2 Node impact triggers (Trigger during pause at 0.8)
      tl.call(() => {
        if (tl.scrollTrigger && tl.scrollTrigger.direction > 0) {
          triggerNodeBurst(1);
        }
      }, [], 0.8);

      tl.to(".node-circle-1", { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.18 }, 0.8)
        .to(".node-circle-1", { scale: 1.08, filter: "brightness(1.0)", duration: 0.35, ease: "power3.out" }, 1.0);


      // --- STAGE 2 -> STAGE 3 (Time 1.0 to 2.0) ---

      // 1. Particle travels & segment 2 fills (travels 1.2 to 1.8, pauses 1.8 to 2.2)
      tl.to(particleRef.current, { left: "62.5%", ease: "power1.inOut" }, 1.2)
        .to(seg2Ref.current, { width: "100%", opacity: 1.0, ease: "power1.inOut" }, 1.2)
        .to(seg1Ref.current, { opacity: 0.7, duration: 0.5 }, 1.2);

      // Particle color shifts to Violet
      tl.to(particleRef.current, {
        boxShadow: "0 0 14px #fff, 0 0 28px #9C5BFF",
        backgroundColor: "#9C5BFF",
        ease: "power1.inOut"
      }, 1.2);

      // 2. Stage 2 softens/settles (opacity 90%, scale 1.0, soft glow, transparent glass fill)
      tl.to(".stage-text-block-1", { opacity: 0.7, y: 0, duration: 0.6 }, 1.2)
        .to(".active-ring-overlay-1", { opacity: 0, scale: 0.8, duration: 0.6 }, 1.2)
        .to(".active-halo-overlay-1", { opacity: 0, duration: 0.6 }, 1.2)
        .to(".node-wrapper-1", { opacity: 0.9, duration: 0.6 }, 1.2)
        .to(".stage-label-1", { color: "rgba(255, 255, 255, 0.5)", duration: 0.6 }, 1.2)
        .to(".stage-title-1", { color: "rgba(255, 255, 255, 0.7)", duration: 0.6 }, 1.2)
        .to(".stage-desc-1", { color: "rgba(255, 255, 255, 0.6)", duration: 0.6 }, 1.2)
        .to(".node-circle-1", {
          scale: 1.0,
          background: "rgba(7, 9, 13, 0.45)",
          borderColor: "#2ACDFF",
          boxShadow: "0 0 12px rgba(42, 205, 255, 0.22)",
          duration: 0.6
        }, 1.2);

      // 3. Stage 3 activates
      tl.to(".node-wrapper-2", { opacity: 1.0, duration: 0.6 }, 1.3)
        .to(".node-circle-2", {
          scale: 1.08,
          background: `radial-gradient(circle at center, rgba(156, 91, 255, 0.1) 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, #9C5BFF, rgba(255,255,255,0.05)) border-box`,
          borderColor: "#9C5BFF",
          boxShadow: "0 0 24px rgba(156, 91, 255, 0.45)",
          duration: 0.6
        }, 1.3)
        .to(".node-icon-2", { color: "#9C5BFF", scale: 1.08, filter: "brightness(1.25)", duration: 0.5 }, 1.3)
        .to(".active-ring-overlay-2", { opacity: 0.18, scale: 1, duration: 0.5 }, 1.3)
        .to(".active-halo-overlay-2", { opacity: 0.15, duration: 0.5 }, 1.3)
        .to(".stage-text-block-2", { opacity: 1.0, y: 0, duration: 0.6 }, 1.3)
        .to(".stage-label-2", { color: "#9C5BFF", duration: 0.5 }, 1.3)
        .to(".stage-title-2", { color: "#ffffff", duration: 0.5 }, 1.3)
        .to(".stage-desc-2", { color: "rgba(255, 255, 255, 0.85)", duration: 0.5 }, 1.3);

      // 4. Reach Stage 3 Node impact triggers
      tl.call(() => {
        if (tl.scrollTrigger && tl.scrollTrigger.direction > 0) {
          triggerNodeBurst(2);
        }
      }, [], 1.8);

      tl.to(".node-circle-2", { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.18 }, 1.8)
        .to(".node-circle-2", { scale: 1.08, filter: "brightness(1.0)", duration: 0.35, ease: "power3.out" }, 2.0);


      // --- STAGE 3 -> STAGE 4 (Time 2.0 to 3.0) ---

      // 1. Particle travels & segment 3 fills (travels 2.2 to 2.8, pauses 2.8 to 3.5)
      tl.to(particleRef.current, { left: "87.5%", ease: "power1.inOut" }, 2.2)
        .to(seg3Ref.current, { width: "100%", opacity: 1.0, ease: "power1.inOut" }, 2.2)
        .to(seg2Ref.current, { opacity: 0.7, duration: 0.5 }, 2.2);

      // Particle color shifts to Emerald
      tl.to(particleRef.current, {
        boxShadow: "0 0 14px #fff, 0 0 28px #14F195",
        backgroundColor: "#14F195",
        ease: "power1.inOut"
      }, 2.2);

      // 2. Stage 3 softens/settles (opacity 90%, scale 1.0, soft glow, transparent glass fill)
      tl.to(".stage-text-block-2", { opacity: 0.7, y: 0, duration: 0.6 }, 2.2)
        .to(".active-ring-overlay-2", { opacity: 0, scale: 0.8, duration: 0.6 }, 2.2)
        .to(".active-halo-overlay-2", { opacity: 0, duration: 0.6 }, 2.2)
        .to(".node-wrapper-2", { opacity: 0.9, duration: 0.6 }, 2.2)
        .to(".stage-label-2", { color: "rgba(255, 255, 255, 0.5)", duration: 0.6 }, 2.2)
        .to(".stage-title-2", { color: "rgba(255, 255, 255, 0.7)", duration: 0.6 }, 2.2)
        .to(".stage-desc-2", { color: "rgba(255, 255, 255, 0.6)", duration: 0.6 }, 2.2)
        .to(".node-circle-2", {
          scale: 1.0,
          background: "rgba(7, 9, 13, 0.45)",
          borderColor: "#9C5BFF",
          boxShadow: "0 0 12px rgba(156, 91, 255, 0.22)",
          duration: 0.6
        }, 2.2);

      // 3. Stage 4 activates
      tl.to(".node-wrapper-3", { opacity: 1.0, duration: 0.6 }, 2.3)
        .to(".node-circle-3", {
          scale: 1.08,
          background: `radial-gradient(circle at center, rgba(20, 241, 149, 0.1) 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, #14F195, rgba(255,255,255,0.05)) border-box`,
          borderColor: "#14F195",
          boxShadow: "0 0 24px rgba(20, 241, 149, 0.45)",
          duration: 0.6
        }, 2.3)
        .to(".node-icon-3", { color: "#14F195", scale: 1.08, filter: "brightness(1.25)", duration: 0.5 }, 2.3)
        .to(".active-ring-overlay-3", { opacity: 0.18, scale: 1, duration: 0.5 }, 2.3)
        .to(".active-halo-overlay-3", { opacity: 0.15, duration: 0.5 }, 2.3)
        .to(".stage-text-block-3", { opacity: 1.0, y: 0, duration: 0.6 }, 2.3)
        .to(".stage-label-3", { color: "#14F195", duration: 0.5 }, 2.3)
        .to(".stage-title-3", { color: "#ffffff", duration: 0.5 }, 2.3)
        .to(".stage-desc-3", { color: "rgba(255, 255, 255, 0.85)", duration: 0.5 }, 2.3);

      // 4. Reach Stage 4 Node impact triggers
      tl.call(() => {
        if (tl.scrollTrigger && tl.scrollTrigger.direction > 0) {
          triggerNodeBurst(3);
        }
      }, [], 2.8);

      tl.to(".node-circle-3", { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.18 }, 2.8)
        .to(".node-circle-3", { scale: 1.08, filter: "brightness(1.0)", duration: 0.35, ease: "power3.out" }, 3.0);

      // Settle Segment 3 active path to completed state at the end
      tl.to(seg3Ref.current, { opacity: 0.7, duration: 0.5 }, 2.8);

      // Hold the final stage completed state for a short moment before release to allow scrub lag to settle
      tl.to({}, { duration: 1.5 }, 2.8);
    });

    // MOBILE: Vertical Scroll Trigger
    mm.add("(max-width: 767px)", () => {
      stepsData.forEach((_, idx) => {
        // Node container fade vertical trigger (to active state)
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

        // Content fade/translate trigger
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
      className="site-shell w-full relative bg-[var(--color-canvas)] md:sticky md:top-0 md:h-screen h-auto border-t border-white/[0.03]"
    >
      {/* Container centers content vertically and spans full height on desktop */}
      <div className="relative w-full h-full z-10">

        {/* Decorative Grid Mesh (4% opacity) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 pipeline-grid opacity-40 pointer-events-none" />



        {/* Ambient background glows */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

        {/* Background Watermark centered behind entire timeline - completely static during scroll */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[120px] sm:text-[180px] lg:text-[240px] font-black tracking-[0.25em] text-white/[0.045] pointer-events-none select-none z-0 font-display select-none">
          PROCESS
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .animate-spin-slow {
            animation: spinSlow 12s linear infinite;
          }
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .animate-ping-slow {
            animation: pingSlow 2.8s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          }
          @keyframes pingSlow {
            0% { transform: scale(1); opacity: 0.8; }
            100% { transform: scale(1.25); opacity: 0; }
          }
          .shimmer-text {
            background: linear-gradient(90deg, #14F195, #2ACDFF, #9C5BFF, #14F195);
            background-size: 200% auto;
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: shimmerEffect 6s linear infinite;
            text-shadow: 0 0 40px rgba(42, 205, 255, 0.05);
          }
          @keyframes shimmerEffect {
            to { background-position: 200% center; }
          }
        `}} />

        <div className="site-shell px-6 md:px-12 lg:px-20 relative z-10 w-full h-full">
          {/* Inner Content Wrapper - full height flex layout: header top, stages center, footer bottom */}
          <div className="hiw-content-wrapper w-full min-h-[100dvh] md:h-full flex flex-col justify-between py-10 md:py-16 relative z-10">

            {/* Header Section */}
            <div className="hiw-header-fade flex flex-col items-start max-w-4xl w-full mb-8 md:mb-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase text-emerald-400 font-mono mb-3 md:mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Selection Metrics
              </div>

              <h2 className="section-title">
                Every learner is <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">evaluated</span> <br /> before becoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">job-ready</span>.
              </h2>

              <p className="section-desc">
                We do not treat course completion as the same thing as readiness. Each learner moves through a structured evaluation process before placement support begins.
              </p>
            </div>

            {/* Pipeline Diagram Zone - centered vertically */}
            <div className="w-full flex-grow flex items-center justify-center py-6 md:py-10">

              {/* Inner wrapper that has the exact height of the grid, containing both connecting lines and the grid */}
              <div ref={triggerRef} className="relative w-full">

                {/* Desktop View Horizontal Connectors (Segmented, 3px thickness) */}

                {/* Segment 1: Stage 01 (12.5%) -> Stage 02 (37.5%) */}
                <div className="hidden md:block absolute top-[42px] left-[12.5%] w-[25%] h-[3px] pointer-events-none z-0">
                  {/* Inactive track */}
                  <div className="absolute inset-0 bg-[#262A31]" />
                  {/* Active track */}
                  <div
                    ref={seg1Ref}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#14F195] to-[#2ACDFF] w-0 shadow-[0_0_8px_rgba(42,205,255,0.3)] brightness-[120%]"
                  />
                </div>

                {/* Segment 2: Stage 02 (37.5%) -> Stage 03 (62.5%) */}
                <div className="hidden md:block absolute top-[42px] left-[37.5%] w-[25%] h-[3px] pointer-events-none z-0">
                  {/* Inactive track */}
                  <div className="absolute inset-0 bg-[#262A31]" />
                  {/* Active track */}
                  <div
                    ref={seg2Ref}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2ACDFF] to-[#9C5BFF] w-0 shadow-[0_0_8px_rgba(156,91,255,0.3)] brightness-[120%]"
                  />
                </div>

                {/* Segment 3: Stage 03 (62.5%) -> Stage 04 (87.5%) */}
                <div className="hidden md:block absolute top-[42px] left-[62.5%] w-[25%] h-[3px] pointer-events-none z-0">
                  {/* Inactive track */}
                  <div className="absolute inset-0 bg-[#262A31]" />
                  {/* Active track */}
                  <div
                    ref={seg3Ref}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9C5BFF] to-[#14F195] w-0 shadow-[0_0_8px_rgba(20,241,149,0.3)] brightness-[120%]"
                  />
                </div>

                {/* Travelling particle at the tip of the active connector line */}
                <div
                  ref={particleRef}
                  className="hidden md:block absolute top-[42px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-[5] pointer-events-none"
                  style={{
                    left: "12.5%",
                    opacity: 1,
                    background: "#14F195",
                    boxShadow: "0 0 8px #fff, 0 0 14px #14F195"
                  }}
                >
                  {/* Core glow */}
                  <div className="absolute inset-[-3px] rounded-full blur-[2px] opacity-50 bg-inherit" />
                  {/* Secondary trail bloom */}
                  <div className="absolute inset-[-7px] rounded-full blur-[5px] opacity-20 bg-inherit" />
                </div>

                {/* Nodes & Process Blocks Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 relative z-10">
                  {stepsData.map((step, idx) => {
                    const IconComponent = step.icon;

                    return (
                      <div
                        key={step.step}
                        ref={(el) => {
                          nodeContainerRefs.current[idx] = el;
                        }}
                        className={`node-container-${idx} flex flex-col items-start md:items-center text-left group transition-all duration-500`}
                      >

                        {/* Premium Stage Node Circle (82px size, glass neon aesthetics for completed) */}
                        <div className={`pipeline-node-wrapper node-wrapper-${idx} relative mb-6 md:mx-auto flex items-center justify-center`}>
                          {/* Active Stage Halo Backing */}
                          <div
                            className={`active-halo-overlay active-halo-overlay-${idx} absolute inset-[-18px] rounded-full blur-[8px] pointer-events-none opacity-0`}
                            style={{ background: step.accentColor }}
                          />

                          {/* Outer glowing rotating ring */}
                          <div
                            className={`active-ring-overlay active-ring-overlay-${idx} absolute inset-[-8px] rounded-full border border-dashed animate-spin-slow pointer-events-none opacity-0`}
                            style={{ borderColor: step.accentColor }}
                          />

                          {/* Main Node Circle */}
                          <div
                            className={`pipeline-node node-circle-${idx} w-[82px] h-[82px] rounded-full border-[2px] flex items-center justify-center relative z-10 backdrop-blur-md`}
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
                            {/* Inner ring (78% of circle) */}
                            <div
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                width: "78%", height: "78%",
                                top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                border: `1px solid ${idx === 0 ? step.accentColor + "38" : "rgba(255,255,255,0.06)"}`,
                              }}
                            />
                            {/* Core fill (56%) */}
                            <div
                              className="absolute rounded-full pointer-events-none"
                              style={{
                                width: "56%", height: "56%",
                                top: "50%", left: "50%",
                                transform: "translate(-50%,-50%)",
                                background: idx === 0 ? `${step.accentColor}14` : "transparent",
                              }}
                            />
                            {/* Icon */}
                            <IconComponent className={`w-7 h-7 stroke-[1.5] transition-all duration-300 node-icon-${idx} relative z-10 ${
                              idx === 0 ? `${step.iconColor} brightness-110 node-icon-breathe` : `${step.iconColor} opacity-40`
                            }`} />
                          </div>
                        </div>

                        {/* Step Process Content */}
                        <div className={`stage-text-block stage-text-block-${idx} w-full max-w-[330px] md:mx-auto flex flex-col items-start transform`}>
                          <span className={`stage-label stage-label-${idx} text-[10px] font-mono tracking-widest uppercase font-semibold mb-1.5 transition-colors duration-300`}>
                            STAGE {step.step}
                          </span>
                          <h3 className={`stage-title stage-title-${idx} text-base sm:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight mb-1.5 leading-[1.2] font-display transition-all duration-300`}>
                            {step.title}
                          </h3>
                          <p className={`stage-desc stage-desc-${idx} text-white/72 text-[12px] sm:text-[13px] leading-[1.5] font-sans font-normal transition-colors duration-300`}>
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
