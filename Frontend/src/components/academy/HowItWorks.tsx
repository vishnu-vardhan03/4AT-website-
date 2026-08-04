"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
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
    description: "Choose your track and take a free eligibility check.",
    icon: ClipboardCheck,
    accentColor: "#4ade80",
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
    accentColor: "#67c8e8",
    accentRgb: "103, 200, 232",
    glowColor: "rgba(42, 205, 255, 0.1)",
    hoverGlowColor: "rgba(42, 205, 255, 0.45)",
    iconColor: "text-cyan-400"
  },
  {
    step: "03",
    title: "Learn",
    description: "Hands-on training from industry practitioners.",
    icon: MessageCircle,
    accentColor: "#a78bfa",
    accentRgb: "167, 139, 250",
    glowColor: "rgba(156, 91, 255, 0.1)",
    hoverGlowColor: "rgba(156, 91, 255, 0.45)",
    iconColor: "text-purple-400"
  },
  {
    step: "04",
    title: "AI in Finance",
    description: "Learn to apply AI and automation across real finance work.",
    icon: Users,
    accentColor: "#f472b6",
    accentRgb: "244, 114, 182",
    glowColor: "rgba(244, 114, 182, 0.1)",
    hoverGlowColor: "rgba(244, 114, 182, 0.45)",
    iconColor: "text-pink-400"
  },
  {
    step: "05",
    title: "Mentorship",
    description: "Finance-leader mentoring and career readiness.",
    icon: MessageCircle,
    accentColor: "#fbbf24",
    accentRgb: "251, 191, 36",
    glowColor: "rgba(251, 191, 36, 0.1)",
    hoverGlowColor: "rgba(251, 191, 36, 0.45)",
    iconColor: "text-amber-400"
  },
  {
    step: "06",
    title: "Assess, Intern & Place",
    description: "Post-assessment → interview → internship → placement.",
    icon: TrendingUp,
    accentColor: "#4ade80",
    accentRgb: "74, 222, 128",
    glowColor: "rgba(20, 241, 149, 0.1)",
    hoverGlowColor: "rgba(20, 241, 149, 0.45)",
    iconColor: "text-emerald-400"
  }
];

// ── Animation constants ──────────────────────────────────────────────────────
const NODE_POSITIONS = ["8.333%", "25%", "41.667%", "58.333%", "75%", "91.667%"];
const NODE_COLORS    = ["#14F195", "#2ACDFF", "#9C5BFF", "#F472B6", "#FBBF24", "#14F195"];

const TRAVEL      = 1.1;   // travel time between nodes
const NODE_DWELL  = 0.45;  // pause/dwell time at each node (450ms)
const STEP_DUR    = TRAVEL + NODE_DWELL; // 1.55s total per step

const HOLD_START  = 0.5;   // hold at Stage 01 before particle moves
const HOLD_FWD    = 0.8;   // hold at Stage 06 before reset
const RESET_DUR   = 0.2;   // simultaneous reset fade duration
const N           = 5;     // number of connecting segments

const FWD_END    = HOLD_START + N * STEP_DUR - NODE_DWELL; // 7.8 s — forward pass done
const HOLD_END   = FWD_END + HOLD_FWD;                     // 8.6 s — hold ends, reset begins
const RESET_END  = HOLD_END + RESET_DUR;                   // 8.8 s — reset done, cycle repeats

export function HowItWorks({ sectionId = "selection-metrics", hideHeader = false }: { sectionId?: string; hideHeader?: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Five segment fill-bar refs
  const seg1Ref = useRef<HTMLDivElement>(null);
  const seg2Ref = useRef<HTMLDivElement>(null);
  const seg3Ref = useRef<HTMLDivElement>(null);
  const seg4Ref = useRef<HTMLDivElement>(null);
  const seg5Ref = useRef<HTMLDivElement>(null);

  const particleRef      = useRef<HTMLDivElement>(null);
  const nodeContainerRefs = useRef<(HTMLDivElement | null)[]>([]);

  const tlRef      = useRef<gsap.core.Timeline | null>(null);
  const hasStarted = useRef(false);

  // Spawns energy wave + scatter particles at the arrived node (450 ms, restrained)
  const triggerNodeBurst = (nodeIdx: number) => {
    const container = nodeContainerRefs.current[nodeIdx];
    if (!container) return;
    const step = stepsData[nodeIdx];
    if (!step) return;
    const col = step.accentColor;
    const wrapper = container.querySelector(".pipeline-node-wrapper");
    if (!wrapper) return;

    // Neon ring wave
    const wave = document.createElement("div");
    wave.className = "absolute rounded-full border pointer-events-none z-0";
    wave.style.cssText = `border-color:${col};box-shadow:0 0 16px ${col};width:70px;height:70px;left:50%;top:50%;transform:translate(-50%,-50%) scale(1);opacity:0.85`;
    wrapper.appendChild(wave);
    gsap.to(wave, { scale: 1.45, opacity: 0, duration: 0.45, ease: "power3.out", onComplete: () => wave.remove() });

    // Micro-particle burst
    for (let i = 0; i < 10; i++) {
      const p = document.createElement("div");
      p.className = "absolute w-1.5 h-1.5 rounded-full pointer-events-none z-30";
      p.style.cssText = `background-color:${col};box-shadow:0 0 8px ${col};left:50%;top:50%;transform:translate(-50%,-50%)`;
      wrapper.appendChild(p);
      const angle = Math.random() * Math.PI * 2;
      const dist  = Math.random() * 28 + 16;
      gsap.to(p, {
        x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
        opacity: 0, scale: 0.1,
        duration: Math.random() * 0.4 + 0.3,
        ease: "power3.out",
        onComplete: () => p.remove()
      });
    }
  };

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const observers: IntersectionObserver[] = [];
    let tl: gsap.core.Timeline | null = null;

    // ── Header fade-in on first sight ──────────────────────────────────────
    gsap.set(".hiw-header-fade", { opacity: 0, y: 30 });
    const headerObs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        gsap.to(".hiw-header-fade", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        headerObs.disconnect();
      }
    }, { threshold: 0.1 });
    headerObs.observe(sectionRef.current);
    observers.push(headerObs);

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    // ════════════════════════════════════════════════════════════════════════
    // DESKTOP — autoplay particle timeline
    // ════════════════════════════════════════════════════════════════════════
    if (isDesktop) {
      if (!particleRef.current) return;

      const segs = [seg1Ref, seg2Ref, seg3Ref, seg4Ref, seg5Ref];

      // ── Set initial state (Stage 01 active, rest dim) ──────────────────
      gsap.set(".pipeline-node-wrapper", { opacity: 0.92 });
      gsap.set(".stage-text-block",      { opacity: 0.92, y: 0 });
      gsap.set(".active-ring-overlay",   { opacity: 0, scale: 0.8 });
      gsap.set(".active-halo-overlay",   { opacity: 0 });
      gsap.set(".stage-label",           { color: "rgba(255,255,255,0.5)" });
      gsap.set(".stage-title",           { color: "rgba(255,255,255,0.8)" });
      gsap.set(".stage-desc",            { color: "rgba(255,255,255,0.65)" });

      gsap.set(".node-wrapper-0",        { opacity: 1.0 });
      gsap.set(".node-circle-0",         { scale: 1.08, borderColor: "#14F195", boxShadow: "0 0 24px rgba(20,241,149,0.45)" });
      gsap.set(".node-icon-0",           { color: "#14F195", scale: 1.08, filter: "brightness(1.25)" });
      gsap.set(".stage-text-block-0",    { opacity: 1.0, y: 0 });
      gsap.set(".active-ring-overlay-0", { opacity: 0.18, scale: 1 });
      gsap.set(".active-halo-overlay-0", { opacity: 0.15 });
      gsap.set(".stage-label-0",         { color: "#14F195" });
      gsap.set(".stage-title-0",         { color: "#ffffff" });
      gsap.set(".stage-desc-0",          { color: "rgba(255,255,255,0.85)" });

      // ── Build the repeating timeline ────────────────────────────────────
      const _hold = { v: 0 }; // dummy object used only to extend timeline duration
      tl = gsap.timeline({ paused: true, repeat: -1 });
      tlRef.current = tl;

      // ── STAGE 01 ENTRANCE (t = 0 → 0.4 s, within the 0.5 s hold) ──────────
      // Pulse the first node so the viewer sees it light up before the
      // particle starts moving — scale up, ring swell, halo brighten, burst.
      tl.call(() => triggerNodeBurst(0), [], 0.04);
      tl.to(".node-circle-0",         { scale: 1.08 * 1.18, filter: "brightness(1.5)", duration: 0.16 }, 0);
      tl.to(".node-circle-0",         { scale: 1.08, filter: "brightness(1.0)", duration: 0.26, ease: "power3.out" }, 0.16);
      tl.to(".active-ring-overlay-0", { opacity: 0.38, scale: 1.10, duration: 0.16 }, 0);
      tl.to(".active-ring-overlay-0", { opacity: 0.18, scale: 1.0,  duration: 0.26, ease: "power3.out" }, 0.16);
      tl.to(".active-halo-overlay-0", { opacity: 0.32, duration: 0.16 }, 0);
      tl.to(".active-halo-overlay-0", { opacity: 0.15, duration: 0.26, ease: "power3.out" }, 0.16);

      // ── FORWARD PASS  t = HOLD_START → FWD_END (0.5 → 7.8 s) ───────────────
      // The particle sits at Stage 01 from t=0 → t=HOLD_START (0.5 s),
      // letting the first node be seen before movement begins.
      for (let i = 0; i < N; i++) {
        const t  = HOLD_START + i * STEP_DUR;  // offset every segment by step duration
        const ni = i + 1;            // next node index
        const nc = NODE_COLORS[ni];  // next colour
        const cc = NODE_COLORS[i];   // current colour
        const seg = segs[i];

        // Glowing particle travels to next node
        tl.to(particleRef.current!, { left: NODE_POSITIONS[ni], duration: TRAVEL, ease: "power1.inOut" }, t);
        tl.to(particleRef.current!, { backgroundColor: nc, boxShadow: `0 0 14px #fff, 0 0 28px ${nc}`, duration: TRAVEL, ease: "power1.inOut" }, t);

        // Connector segment illuminates
        if (seg.current) {
          tl.to(seg.current, { width: "100%", opacity: 1.0, duration: TRAVEL, ease: "power1.inOut" }, t);
        }

        // Node i → completed (dim slightly; visited highlight preserved)
        tl.to(`.node-wrapper-${i}`,        { opacity: 0.9, duration: 0.35 }, t + 0.15);
        tl.to(`.node-circle-${i}`,         { scale: 1.0, background: "rgba(7,9,13,0.45)", borderColor: cc, boxShadow: `0 0 12px ${cc}38`, duration: 0.35 }, t + 0.15);
        tl.to(`.node-icon-${i}`,           { filter: "brightness(0.9)", duration: 0.35 }, t + 0.15);
        tl.to(`.active-ring-overlay-${i}`, { opacity: 0, scale: 0.8, duration: 0.35 }, t + 0.15);
        tl.to(`.active-halo-overlay-${i}`, { opacity: 0, duration: 0.35 }, t + 0.15);
        tl.to(`.stage-text-block-${i}`,    { opacity: 0.7, y: 0, duration: 0.35 }, t + 0.15);
        tl.to(`.stage-label-${i}`,         { color: "rgba(255,255,255,0.5)", duration: 0.35 }, t + 0.15);
        tl.to(`.stage-title-${i}`,         { color: "rgba(255,255,255,0.7)", duration: 0.35 }, t + 0.15);
        tl.to(`.stage-desc-${i}`,          { color: "rgba(255,255,255,0.6)", duration: 0.35 }, t + 0.15);

        // Node ni → active (glow up, text brighten) - starts upon arrival
        const arrT = t + TRAVEL;
        tl.to(`.node-wrapper-${ni}`,        { opacity: 1.0, duration: 0.35 }, arrT);
        tl.to(`.node-circle-${ni}`, {
          scale: 1.08,
          background: `radial-gradient(circle at center, ${nc}1a 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, ${nc}, rgba(255,255,255,0.05)) border-box`,
          borderColor: nc,
          boxShadow: `0 0 24px ${nc}73`,
          duration: 0.35
        }, arrT);
        tl.to(`.node-icon-${ni}`,           { color: nc, scale: 1.08, filter: "brightness(1.25)", duration: 0.35 }, arrT);
        tl.to(`.active-ring-overlay-${ni}`, { opacity: 0.18, scale: 1, duration: 0.35 }, arrT);
        tl.to(`.active-halo-overlay-${ni}`, { opacity: 0.15, duration: 0.35 }, arrT);
        tl.to(`.stage-text-block-${ni}`,    { opacity: 1.0, y: 0, duration: 0.35 }, arrT);
        tl.to(`.stage-label-${ni}`,         { color: nc, duration: 0.35 }, arrT);
        tl.to(`.stage-title-${ni}`,         { color: "#ffffff", duration: 0.35 }, arrT);
        tl.to(`.stage-desc-${ni}`,          { color: "rgba(255,255,255,0.85)", duration: 0.35 }, arrT);

        // Impact burst + scale pulse on arrival
        tl.call(() => triggerNodeBurst(ni), [], arrT);
        tl.to(`.node-circle-${ni}`, { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.14 }, arrT);
        tl.to(`.node-circle-${ni}`, { scale: 1.08, filter: "brightness(1.0)", duration: 0.22, ease: "power3.out" }, arrT + 0.14);
      }

      // Intensify Stage 06 glow while holding at end of cycle
      tl.to(".node-circle-5",         { boxShadow: `0 0 40px ${NODE_COLORS[5]}aa, 0 0 70px ${NODE_COLORS[5]}44`, duration: 0.35 }, FWD_END);
      tl.to(".active-halo-overlay-5", { opacity: 0.35, duration: 0.35 }, FWD_END);

      // ── HOLD at Stage 06 (FWD_END → HOLD_END, 0.8 s) ────────────────────
      tl.to(_hold, { v: 1, duration: HOLD_FWD }, FWD_END);

      // ── SIMULTANEOUS RESET (HOLD_END → RESET_END, 0.2 s) ───────────────
      // All nodes and connectors fade to their default inactive state together.
      for (let i = 0; i < 6; i++) {
        tl.to(`.node-wrapper-${i}`, { opacity: 0.92, duration: RESET_DUR, ease: "power2.in" }, HOLD_END);
        tl.to(`.node-circle-${i}`, {
          scale: 1.0,
          background: "#0B0F12",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "none",
          filter: "none",
          duration: RESET_DUR,
          ease: "power2.in"
        }, HOLD_END);
        tl.to(`.node-icon-${i}`,           { scale: 1.0, filter: "brightness(0.85) saturate(0.85)", duration: RESET_DUR, ease: "power2.in" }, HOLD_END);
        tl.to(`.active-ring-overlay-${i}`, { opacity: 0, scale: 0.8, duration: RESET_DUR }, HOLD_END);
        tl.to(`.active-halo-overlay-${i}`, { opacity: 0, duration: RESET_DUR }, HOLD_END);
        tl.to(`.stage-text-block-${i}`,    { opacity: 0.92, y: 0, duration: RESET_DUR, ease: "power2.in" }, HOLD_END);
        tl.to(`.stage-label-${i}`,         { color: "rgba(255,255,255,0.5)", duration: RESET_DUR }, HOLD_END);
        tl.to(`.stage-title-${i}`,         { color: "rgba(255,255,255,0.8)", duration: RESET_DUR }, HOLD_END);
        tl.to(`.stage-desc-${i}`,          { color: "rgba(255,255,255,0.65)", duration: RESET_DUR }, HOLD_END);
      }
      for (let i = 0; i < N; i++) {
        const seg = segs[i];
        if (seg.current) tl.to(seg.current, { width: "0%", duration: RESET_DUR, ease: "power2.in" }, HOLD_END);
      }

      // ── INSTANT REPOSITION + STAGE 01 RE-ACTIVATION at RESET_END ─────────
      // tl.set() inside a repeat:-1 timeline runs each cycle, giving GSAP the
      // correct "from" values it needs to start the next forward pass cleanly.
      tl.set(particleRef.current!, {
        left: NODE_POSITIONS[0],
        backgroundColor: NODE_COLORS[0],
        boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
      }, RESET_END);
      tl.set(".node-wrapper-0",        { opacity: 1.0 }, RESET_END);
      tl.set(".node-circle-0",         { scale: 1.08, borderColor: "#14F195", boxShadow: "0 0 24px rgba(20,241,149,0.45)" }, RESET_END);
      tl.set(".node-icon-0",           { color: "#14F195", scale: 1.08, filter: "brightness(1.25)" }, RESET_END);
      tl.set(".stage-text-block-0",    { opacity: 1.0, y: 0 }, RESET_END);
      tl.set(".active-ring-overlay-0", { opacity: 0.18, scale: 1 }, RESET_END);
      tl.set(".active-halo-overlay-0", { opacity: 0.15 }, RESET_END);
      tl.set(".stage-label-0",         { color: "#14F195" }, RESET_END);
      tl.set(".stage-title-0",         { color: "#ffffff" }, RESET_END);
      tl.set(".stage-desc-0",          { color: "rgba(255,255,255,0.85)" }, RESET_END);

      // ── IntersectionObserver — trigger once on section enter ─────────────
      const animObs = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          tl!.play();
        }
      }, { threshold: 0.65 });
      animObs.observe(sectionRef.current!);
      observers.push(animObs);

    // ════════════════════════════════════════════════════════════════════════
    // MOBILE — simple per-card IntersectionObserver fade-in (no scroll lock)
    // ════════════════════════════════════════════════════════════════════════
    } else {
      stepsData.forEach((_, idx) => {
        const el = nodeContainerRefs.current[idx];
        if (!el) return;
        gsap.set(el, { opacity: 0, y: 16 });

        const nodeObs = new IntersectionObserver((entries) => {
          if (entries[0]?.isIntersecting) {
            gsap.to(el, { opacity: 1.0, y: 0, duration: 0.55, delay: idx * 0.06, ease: "power2.out" });
            nodeObs.disconnect();
          }
        }, { threshold: 0.2 });
        nodeObs.observe(el);
        observers.push(nodeObs);
      });
    }

    return () => {
      observers.forEach(obs => obs.disconnect());
      if (tlRef.current) { tlRef.current.kill(); tlRef.current = null; }
    };
  }, []);

  // Hover — pause / resume the autoplay animation
  const pauseAnim  = () => { tlRef.current?.pause(); };
  const resumeAnim = () => { tlRef.current?.resume(); };

  const diagram = (
    <>
      {/* ── Pipeline Diagram ──────────────────────────────────────────── */}
      <div className="w-full py-4 md:py-6">
        {/* overflow-visible so the PROCESS watermark is never clipped;
            horizontal overflow is contained by the section's overflow-x-clip */}
        <div className="relative w-full" style={{ minHeight: "200px" }}>

          {/* Background watermark */}
          <div className="absolute left-1/2 top-[35px] -translate-x-1/2 -translate-y-1/2 text-[100px] sm:text-[160px] lg:text-[220px] xl:text-[240px] font-black tracking-[0.14em] pl-[0.14em] text-white/[0.045] pointer-events-none select-none z-0 font-display text-center whitespace-nowrap">
            PROCESS
          </div>

          {/* Desktop horizontal connectors (segmented across 6 nodes) */}

          {/* Segment 1: 01 (8.333%) → 02 (25%) */}
          <div className="hidden md:block absolute top-[35px] left-[8.333%] w-[16.667%] h-[3px] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#262A31]" />
            <div ref={seg1Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#14F195] to-[#2ACDFF] w-0 shadow-[0_0_8px_rgba(42,205,255,0.3)] brightness-[120%]" />
          </div>

          {/* Segment 2: 02 (25%) → 03 (41.667%) */}
          <div className="hidden md:block absolute top-[35px] left-[25%] w-[16.667%] h-[3px] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#262A31]" />
            <div ref={seg2Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#2ACDFF] to-[#9C5BFF] w-0 shadow-[0_0_8px_rgba(156,91,255,0.3)] brightness-[120%]" />
          </div>

          {/* Segment 3: 03 (41.667%) → 04 (58.333%) */}
          <div className="hidden md:block absolute top-[35px] left-[41.667%] w-[16.667%] h-[3px] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#262A31]" />
            <div ref={seg3Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#9C5BFF] to-[#F472B6] w-0 shadow-[0_0_8px_rgba(244,114,182,0.3)] brightness-[120%]" />
          </div>

          {/* Segment 4: 04 (58.333%) → 05 (75%) */}
          <div className="hidden md:block absolute top-[35px] left-[58.333%] w-[16.667%] h-[3px] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#262A31]" />
            <div ref={seg4Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#F472B6] to-[#FBBF24] w-0 shadow-[0_0_8px_rgba(251,191,36,0.3)] brightness-[120%]" />
          </div>

          {/* Segment 5: 05 (75%) → 06 (91.667%) */}
          <div className="hidden md:block absolute top-[35px] left-[75%] w-[16.667%] h-[3px] pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#262A31]" />
            <div ref={seg5Ref} className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#FBBF24] to-[#14F195] w-0 shadow-[0_0_8px_rgba(20,241,149,0.3)] brightness-[120%]" />
          </div>

          {/* Glowing energy particle — travels along the connectors */}
          <div
            ref={particleRef}
            className="hidden md:block absolute top-[35px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-[5] pointer-events-none"
            style={{
              left: "8.333%",
              background: "#14F195",
              boxShadow: "0 0 8px #fff, 0 0 14px #14F195"
            }}
          >
            {/* Inner glow rings — slightly tighter for a crisper, faster-feeling trail */}
            <div className="absolute inset-[-2px] rounded-full blur-[2px] opacity-45 bg-inherit" />
            <div className="absolute inset-[-5px] rounded-full blur-[4px] opacity-15 bg-inherit" />
          </div>

          {/* Nodes & process-block grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-2 relative z-10">
            {stepsData.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.step}
                  ref={(el) => { nodeContainerRefs.current[idx] = el; }}
                  className={`node-container-${idx} flex flex-col items-start lg:items-center text-left lg:text-center group transition-all duration-500`}
                  onMouseEnter={pauseAnim}
                  onMouseLeave={resumeAnim}
                >
                  {/* Node circle */}
                  <div className={`pipeline-node-wrapper node-wrapper-${idx} relative mb-4 lg:mx-auto flex items-center justify-center`}>

                    {/* Ambient halo (activated by GSAP) */}
                    <div
                      className={`active-halo-overlay active-halo-overlay-${idx} absolute inset-[-14px] rounded-full blur-[8px] pointer-events-none opacity-0`}
                      style={{ background: step.accentColor }}
                    />

                    {/* Dashed orbit ring (activated by GSAP) */}
                    <div
                      className={`active-ring-overlay active-ring-overlay-${idx} absolute inset-[-6px] rounded-full border border-dashed animate-spin-slow pointer-events-none opacity-0`}
                      style={{ borderColor: step.accentColor }}
                    />

                    {/* Main node circle */}
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
                      {/* Inner concentric ring */}
                      <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: "78%", height: "78%",
                          top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          border: `1px solid ${idx === 0 ? step.accentColor + "38" : "rgba(255,255,255,0.06)"}`,
                        }}
                      />
                      {/* Inner glow core */}
                      <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                          width: "56%", height: "56%",
                          top: "50%", left: "50%",
                          transform: "translate(-50%,-50%)",
                          background: idx === 0 ? `${step.accentColor}14` : "transparent",
                        }}
                      />
                      <IconComponent
                        className={`w-6 h-6 stroke-[1.5] transition-all duration-300 node-icon-${idx} relative z-10 ${
                          idx === 0
                            ? `${step.iconColor} brightness-110 node-icon-breathe`
                            : `${step.iconColor} opacity-70`
                        }`}
                      />
                    </div>
                  </div>

                  {/* Step text */}
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


    </>
  );

  if (hideHeader) {
    return (
      <div ref={sectionRef} className="w-full relative py-4">
        {diagram}
      </div>
    );
  }

  return (
    // Natural-height section — no sticky, no scroll-lock wrapper
    <div
      ref={sectionRef}
      id={sectionId}
      className="w-full relative bg-[var(--color-canvas)] overflow-x-clip"
    >
      {/* Decorative Grid Mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      <div className="absolute inset-0 pipeline-grid opacity-40 pointer-events-none" />

      <div className="site-shell relative z-10 w-full">
        <div className="hiw-content-wrapper w-full flex flex-col py-14 md:py-20 gap-10 md:gap-14 relative z-10">

          {/* ── Header ───────────────────────────────────────────────────── */}
          <div className="hiw-header-fade flex flex-col items-start max-w-4xl w-full">
            <SectionPill className="mb-3 md:mb-4">
              HOW IT WORKS
            </SectionPill>

            <h2 className="section-title">
              Every learner is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
                evaluated
              </span>{" "}
              <br />
              before becoming{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">
                job-ready
              </span>
              .
            </h2>

            <p className="section-desc">
              We do not treat course completion as the same thing as readiness.
              Each learner moves through a structured evaluation process before
              placement support begins.
            </p>
          </div>

          {diagram}

        </div>
      </div>
    </div>
  );
}
