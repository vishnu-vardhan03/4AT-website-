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
  const diagramContainerRef = useRef<HTMLDivElement>(null);

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
    const section = sectionRef.current;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── Header fade-in on first sight (breakpoint-independent) ──────────────
    gsap.set(".hiw-header-fade", { opacity: 0, y: 30 });
    const headerObs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        gsap.to(".hiw-header-fade", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        headerObs.disconnect();
      }
    }, { threshold: 0.1 });
    headerObs.observe(section);

    // ── Shared highlight tweens — identical visual language for every
    //    geometry (desktop % positions or mobile measured px positions).
    //    Keeping these in one place guarantees mobile and desktop can never
    //    visually drift apart, and there is only ever one animation system.
    const applyParticleColorTween = (tl: gsap.core.Timeline, color: string, t: number) => {
      tl.to(particleRef.current!, { backgroundColor: color, boxShadow: `0 0 14px #fff, 0 0 28px ${color}`, duration: TRAVEL, ease: "power1.inOut" }, t);
    };

    const applyOutgoingTweens = (tl: gsap.core.Timeline, idx: number, t: number) => {
      const cc = NODE_COLORS[idx];
      tl.to(`.node-wrapper-${idx}`,        { opacity: 0.9, duration: 0.35 }, t);
      tl.to(`.node-circle-${idx}`,         { scale: 1.0, background: "rgba(7,9,13,0.45)", borderColor: cc, boxShadow: `0 0 12px ${cc}38`, duration: 0.35 }, t);
      tl.to(`.node-icon-${idx}`,           { filter: "brightness(0.9)", duration: 0.35 }, t);
      tl.to(`.active-ring-overlay-${idx}`, { opacity: 0, scale: 0.8, duration: 0.35 }, t);
      tl.to(`.active-halo-overlay-${idx}`, { opacity: 0, duration: 0.35 }, t);
      tl.to(`.stage-text-block-${idx}`,    { opacity: 0.7, y: 0, duration: 0.35 }, t);
      tl.to(`.stage-label-${idx}`,         { color: "rgba(255,255,255,0.5)", duration: 0.35 }, t);
      tl.to(`.stage-title-${idx}`,         { color: "rgba(255,255,255,0.7)", duration: 0.35 }, t);
      tl.to(`.stage-desc-${idx}`,          { color: "rgba(255,255,255,0.6)", duration: 0.35 }, t);
    };

    const applyArrivalTweens = (tl: gsap.core.Timeline, idx: number, t: number) => {
      const nc = NODE_COLORS[idx];
      tl.to(`.node-wrapper-${idx}`,        { opacity: 1.0, duration: 0.35 }, t);
      tl.to(`.node-circle-${idx}`, {
        scale: 1.08,
        background: `radial-gradient(circle at center, ${nc}1a 0%, rgba(7,9,13,0.95) 100%) padding-box, linear-gradient(135deg, ${nc}, rgba(255,255,255,0.05)) border-box`,
        borderColor: nc,
        boxShadow: `0 0 24px ${nc}73`,
        duration: 0.35
      }, t);
      tl.to(`.node-icon-${idx}`,           { color: nc, scale: 1.08, filter: "brightness(1.25)", duration: 0.35 }, t);
      tl.to(`.active-ring-overlay-${idx}`, { opacity: 0.18, scale: 1, duration: 0.35 }, t);
      tl.to(`.active-halo-overlay-${idx}`, { opacity: 0.15, duration: 0.35 }, t);
      tl.to(`.stage-text-block-${idx}`,    { opacity: 1.0, y: 0, duration: 0.35 }, t);
      tl.to(`.stage-label-${idx}`,         { color: nc, duration: 0.35 }, t);
      tl.to(`.stage-title-${idx}`,         { color: "#ffffff", duration: 0.35 }, t);
      tl.to(`.stage-desc-${idx}`,          { color: "rgba(255,255,255,0.85)", duration: 0.35 }, t);

      tl.call(() => triggerNodeBurst(idx), [], t);
      tl.to(`.node-circle-${idx}`, { scale: 1.08 * 1.15, filter: "brightness(1.3)", duration: 0.14 }, t);
      tl.to(`.node-circle-${idx}`, { scale: 1.08, filter: "brightness(1.0)", duration: 0.22, ease: "power3.out" }, t + 0.14);
    };

    const applyResetTweens = (tl: gsap.core.Timeline, idx: number, t: number) => {
      tl.to(`.node-wrapper-${idx}`, { opacity: 0.92, duration: RESET_DUR, ease: "power2.in" }, t);
      tl.to(`.node-circle-${idx}`, {
        scale: 1.0,
        background: "#0B0F12",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "none",
        filter: "none",
        duration: RESET_DUR,
        ease: "power2.in"
      }, t);
      tl.to(`.node-icon-${idx}`,           { scale: 1.0, filter: "brightness(0.85) saturate(0.85)", duration: RESET_DUR, ease: "power2.in" }, t);
      tl.to(`.active-ring-overlay-${idx}`, { opacity: 0, scale: 0.8, duration: RESET_DUR }, t);
      tl.to(`.active-halo-overlay-${idx}`, { opacity: 0, duration: RESET_DUR }, t);
      tl.to(`.stage-text-block-${idx}`,    { opacity: 0.92, y: 0, duration: RESET_DUR, ease: "power2.in" }, t);
      tl.to(`.stage-label-${idx}`,         { color: "rgba(255,255,255,0.5)", duration: RESET_DUR }, t);
      tl.to(`.stage-title-${idx}`,         { color: "rgba(255,255,255,0.8)", duration: RESET_DUR }, t);
      tl.to(`.stage-desc-${idx}`,          { color: "rgba(255,255,255,0.65)", duration: RESET_DUR }, t);
    };

    // tl.set() version of the arrival state — used to re-activate Stage 01
    // instantly inside the repeating timeline at RESET_END.
    const applyActiveSetOnTimeline = (tl: gsap.core.Timeline, idx: number, t: number) => {
      const nc = NODE_COLORS[idx];
      tl.set(`.node-wrapper-${idx}`,        { opacity: 1.0 }, t);
      tl.set(`.node-circle-${idx}`,         { scale: 1.08, borderColor: nc, boxShadow: `0 0 24px ${nc}73` }, t);
      tl.set(`.node-icon-${idx}`,           { color: nc, scale: 1.08, filter: "brightness(1.25)" }, t);
      tl.set(`.stage-text-block-${idx}`,    { opacity: 1.0, y: 0 }, t);
      tl.set(`.active-ring-overlay-${idx}`, { opacity: 0.18, scale: 1 }, t);
      tl.set(`.active-halo-overlay-${idx}`, { opacity: 0.15 }, t);
      tl.set(`.stage-label-${idx}`,         { color: nc }, t);
      tl.set(`.stage-title-${idx}`,         { color: "#ffffff" }, t);
      tl.set(`.stage-desc-${idx}`,          { color: "rgba(255,255,255,0.85)" }, t);
    };

    const applyEntrancePulse = (tl: gsap.core.Timeline, idx: number) => {
      tl.call(() => triggerNodeBurst(idx), [], 0.04);
      tl.to(`.node-circle-${idx}`,         { scale: 1.08 * 1.18, filter: "brightness(1.5)", duration: 0.16 }, 0);
      tl.to(`.node-circle-${idx}`,         { scale: 1.08, filter: "brightness(1.0)", duration: 0.26, ease: "power3.out" }, 0.16);
      tl.to(`.active-ring-overlay-${idx}`, { opacity: 0.38, scale: 1.10, duration: 0.16 }, 0);
      tl.to(`.active-ring-overlay-${idx}`, { opacity: 0.18, scale: 1.0,  duration: 0.26, ease: "power3.out" }, 0.16);
      tl.to(`.active-halo-overlay-${idx}`, { opacity: 0.32, duration: 0.16 }, 0);
      tl.to(`.active-halo-overlay-${idx}`, { opacity: 0.15, duration: 0.26, ease: "power3.out" }, 0.16);
    };

    const applyFinalHoldGlow = (tl: gsap.core.Timeline, t: number) => {
      tl.to(".node-circle-5",         { boxShadow: `0 0 40px ${NODE_COLORS[5]}aa, 0 0 70px ${NODE_COLORS[5]}44`, duration: 0.35 }, t);
      tl.to(".active-halo-overlay-5", { opacity: 0.35, duration: 0.35 }, t);
    };

    const setDimmedBaseState = () => {
      gsap.set(".pipeline-node-wrapper", { opacity: 0.92 });
      gsap.set(".stage-text-block",      { opacity: 0.92, y: 0 });
      gsap.set(".active-ring-overlay",   { opacity: 0, scale: 0.8 });
      gsap.set(".active-halo-overlay",   { opacity: 0 });
      gsap.set(".stage-label",           { color: "rgba(255,255,255,0.5)" });
      gsap.set(".stage-title",           { color: "rgba(255,255,255,0.8)" });
      gsap.set(".stage-desc",            { color: "rgba(255,255,255,0.65)" });
    };

    const setNodeActiveInstant = (idx: number) => {
      const nc = NODE_COLORS[idx];
      gsap.set(`.node-wrapper-${idx}`,        { opacity: 1.0 });
      gsap.set(`.node-circle-${idx}`,         { scale: 1.08, borderColor: nc, boxShadow: `0 0 24px ${nc}73` });
      gsap.set(`.node-icon-${idx}`,           { color: nc, scale: 1.08, filter: "brightness(1.25)" });
      gsap.set(`.stage-text-block-${idx}`,    { opacity: 1.0, y: 0 });
      gsap.set(`.active-ring-overlay-${idx}`, { opacity: 0.18, scale: 1 });
      gsap.set(`.active-halo-overlay-${idx}`, { opacity: 0.15 });
      gsap.set(`.stage-label-${idx}`,         { color: nc });
      gsap.set(`.stage-title-${idx}`,         { color: "#ffffff" });
      gsap.set(`.stage-desc-${idx}`,          { color: "rgba(255,255,255,0.85)" });
    };

    // ════════════════════════════════════════════════════════════════════════
    // DESKTOP — autoplay particle timeline (horizontal, % positions)
    // ════════════════════════════════════════════════════════════════════════
    const setupDesktop = (): (() => void) => {
      if (!particleRef.current) return () => {};

      const segs = [seg1Ref, seg2Ref, seg3Ref, seg4Ref, seg5Ref];

      setDimmedBaseState();
      setNodeActiveInstant(0);
      gsap.set(particleRef.current, {
        left: NODE_POSITIONS[0],
        top: 35, // guard against a stale inline `top` left behind by a prior mobile-mode measurement
        backgroundColor: NODE_COLORS[0],
        boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
      });

      const _hold = { v: 0 }; // dummy object used only to extend timeline duration
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      tlRef.current = tl;

      // Stage 01 entrance pulse within the initial 0.5s hold
      applyEntrancePulse(tl, 0);

      // ── FORWARD PASS  t = HOLD_START → FWD_END ─────────────────────────
      for (let i = 0; i < N; i++) {
        const t  = HOLD_START + i * STEP_DUR;
        const ni = i + 1;
        const nc = NODE_COLORS[ni];
        const seg = segs[i];

        tl.to(particleRef.current!, { left: NODE_POSITIONS[ni], duration: TRAVEL, ease: "power1.inOut" }, t);
        applyParticleColorTween(tl, nc, t);

        if (seg.current) {
          tl.to(seg.current, { width: "100%", opacity: 1.0, duration: TRAVEL, ease: "power1.inOut" }, t);
        }

        applyOutgoingTweens(tl, i, t + 0.15);
        applyArrivalTweens(tl, ni, t + TRAVEL);
      }

      applyFinalHoldGlow(tl, FWD_END);
      tl.to(_hold, { v: 1, duration: HOLD_FWD }, FWD_END);

      for (let i = 0; i < 6; i++) applyResetTweens(tl, i, HOLD_END);
      for (let i = 0; i < N; i++) {
        const seg = segs[i];
        if (seg.current) tl.to(seg.current, { width: "0%", duration: RESET_DUR, ease: "power2.in" }, HOLD_END);
      }

      tl.set(particleRef.current!, {
        left: NODE_POSITIONS[0],
        backgroundColor: NODE_COLORS[0],
        boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
      }, RESET_END);
      applyActiveSetOnTimeline(tl, 0, RESET_END);

      const animObs = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          tl.play();
        }
      }, { threshold: 0.65 });
      animObs.observe(section);

      return () => {
        animObs.disconnect();
        tl.kill();
        if (tlRef.current === tl) tlRef.current = null;
      };
    };

    // ════════════════════════════════════════════════════════════════════════
    // MOBILE — autoplay particle timeline (vertical, real DOM-measured positions)
    // ════════════════════════════════════════════════════════════════════════
    const setupMobile = (): (() => void) => {
      if (!particleRef.current || !diagramContainerRef.current) return () => {};
      const container = diagramContainerRef.current;

      // Derive each node's actual center point from the rendered DOM, relative
      // to the same positioned ancestor the particle is absolutely positioned
      // within — never assume fixed coordinates for the vertical layout.
      const containerRect = container.getBoundingClientRect();
      const positions = stepsData.map((_, idx) => {
        const nodeEl = section.querySelector(`.node-circle-${idx}`) as HTMLElement | null;
        if (!nodeEl) return { left: 0, top: 0 };
        const r = nodeEl.getBoundingClientRect();
        return {
          left: r.left + r.width / 2 - containerRect.left,
          top:  r.top  + r.height / 2 - containerRect.top,
        };
      });

      setDimmedBaseState();
      setNodeActiveInstant(0);
      gsap.set(particleRef.current, {
        left: positions[0].left,
        top: positions[0].top,
        backgroundColor: NODE_COLORS[0],
        boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
      });

      const _hold = { v: 0 };
      const tl = gsap.timeline({ paused: true, repeat: -1 });
      tlRef.current = tl;

      applyEntrancePulse(tl, 0);

      for (let i = 0; i < N; i++) {
        const t  = HOLD_START + i * STEP_DUR;
        const ni = i + 1;
        const nc = NODE_COLORS[ni];

        // Particle travels DOWN through the measured node centers — smooth
        // 2D interpolation naturally follows the vertical timeline geometry.
        tl.to(particleRef.current!, { left: positions[ni].left, top: positions[ni].top, duration: TRAVEL, ease: "power1.inOut" }, t);
        applyParticleColorTween(tl, nc, t);

        applyOutgoingTweens(tl, i, t + 0.15);
        applyArrivalTweens(tl, ni, t + TRAVEL);
      }

      applyFinalHoldGlow(tl, FWD_END);
      tl.to(_hold, { v: 1, duration: HOLD_FWD }, FWD_END);

      for (let i = 0; i < 6; i++) applyResetTweens(tl, i, HOLD_END);

      tl.set(particleRef.current!, {
        left: positions[0].left,
        top: positions[0].top,
        backgroundColor: NODE_COLORS[0],
        boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
      }, RESET_END);
      applyActiveSetOnTimeline(tl, 0, RESET_END);

      // Lower threshold than desktop: the stacked vertical list is often
      // taller than the viewport, so 65% visibility of the whole section
      // may never occur. Start as soon as a meaningful portion is in view.
      const animObs = new IntersectionObserver((entries) => {
        if (entries[0]?.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          tl.play();
        }
      }, { threshold: 0.15 });
      animObs.observe(section);

      return () => {
        animObs.disconnect();
        tl.kill();
        if (tlRef.current === tl) tlRef.current = null;
      };
    };

    // ════════════════════════════════════════════════════════════════════════
    // REDUCED MOTION — static active state, no continuous animation
    // ════════════════════════════════════════════════════════════════════════
    const setupReducedMotion = (): (() => void) => {
      setDimmedBaseState();
      setNodeActiveInstant(0);
      if (particleRef.current) {
        gsap.set(particleRef.current, {
          backgroundColor: NODE_COLORS[0],
          boxShadow: `0 0 8px #fff, 0 0 14px ${NODE_COLORS[0]}`
        });
      }
      return () => {};
    };

    let currentIsDesktop = window.matchMedia("(min-width: 768px)").matches;
    let teardown: () => void = prefersReducedMotion
      ? setupReducedMotion()
      : currentIsDesktop
        ? setupDesktop()
        : setupMobile();

    // ── Resize / breakpoint handling ─────────────────────────────────────
    // Desktop geometry is percentage-based and already adapts on its own, so
    // only rebuild when crossing the mobile/desktop breakpoint, or whenever
    // still on mobile (its pixel geometry can shift at any width). This keeps
    // the particle attached to the real node centers and avoids stray jumps.
    let resizeTimer: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (prefersReducedMotion) return;
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const nowDesktop = window.matchMedia("(min-width: 768px)").matches;
        const crossedBreakpoint = nowDesktop !== currentIsDesktop;
        if (!crossedBreakpoint && nowDesktop) return; // pure desktop resize — % positions already correct

        const wasPlaying = hasStarted.current;
        teardown();
        currentIsDesktop = nowDesktop;
        teardown = nowDesktop ? setupDesktop() : setupMobile();
        if (wasPlaying) tlRef.current?.play();
      }, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimer) clearTimeout(resizeTimer);
      headerObs.disconnect();
      teardown();
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
        <div ref={diagramContainerRef} className="relative w-full" style={{ minHeight: "200px" }}>

          {/* ── Desktop watermark — horizontal word, hidden on mobile to prevent overflow ── */}
          <div className="hidden md:block absolute left-1/2 top-[35px] -translate-x-1/2 -translate-y-1/2 text-[160px] lg:text-[220px] xl:text-[240px] font-black tracking-[0.14em] pl-[0.14em] text-white/[0.045] pointer-events-none select-none z-0 font-display text-center whitespace-nowrap">
            PROCESS
          </div>

          {/* ── Mobile watermark — letters stacked vertically, upright, no rotation ── */}
          <div
            className="md:hidden absolute right-3 top-0 bottom-0 flex flex-col justify-around pointer-events-none select-none z-0"
            aria-hidden="true"
          >
            {["P","R","O","C","E","S","S"].map((letter, i) => (
              <span
                key={i}
                className="text-[3rem] sm:text-[3.5rem] font-black text-white/[0.07] font-display leading-none block"
              >
                {letter}
              </span>
            ))}
          </div>

          {/* ── Mobile-only vertical connector line through node centers ── */}
          <div className="md:hidden absolute left-[25px] top-[25px] bottom-[25px] w-[2px] bg-gradient-to-b from-[#14F195] via-[#9C5BFF] to-[#14F195] opacity-[0.18] pointer-events-none z-[1]" />

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
            className="absolute top-[35px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-[5] pointer-events-none"
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
                  className={`node-container-${idx} flex flex-row items-start gap-4 md:flex-col md:items-start lg:items-center text-left lg:text-center group transition-all duration-500`}
                  onMouseEnter={pauseAnim}
                  onMouseLeave={resumeAnim}
                >
                  {/* Node circle */}
                  <div className={`pipeline-node-wrapper node-wrapper-${idx} relative shrink-0 md:mb-4 lg:mx-auto flex items-center justify-center`}>

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
                      className={`pipeline-node node-circle-${idx} w-[50px] h-[50px] md:w-[70px] md:h-[70px] rounded-full border-[2px] flex items-center justify-center relative z-10 backdrop-blur-md`}
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
                  <div className={`stage-text-block stage-text-block-${idx} w-full max-w-none md:max-w-[190px] lg:mx-auto flex flex-col items-start lg:items-center transform`}>
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
              Every candidate is{" "}
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
