"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Database, LineChart, Cpu, ShieldAlert, BarChart3, Check, X, Users, TrendingUp, Briefcase, Star } from "lucide-react";
import { CountUpNumber } from "@/components/academy/CountUpNumber";

const SECTION_CONTENT = {
  eyebrow: "For Recruiters",
  headline: ["Hire finance talent", "with real baseline", "readiness."],
  description: "4AT Academy helps employers access candidates who already understand the workflows, tools, and expectations behind modern finance roles — reducing ramp time and lowering the burden of training from scratch."
};

interface NodeData {
  id: string;
  trackIndex: string;
  title: string;
  angle: number; // Trigonometric angle (0 to 360)
  color: string; // Accent color hex
  rgb: string; // Accent RGB value
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
  tags: string[];
  outcome: string;
}

const NODES_DATA: NodeData[] = [
  {
    id: "accounting",
    trackIndex: "TRACK 01",
    title: "Accounting & ERP",
    angle: 270, // Top
    color: "#14F195", // Emerald Green
    rgb: "20, 241, 149",
    icon: Database,
    description: "Equipped with real baseline workflow exposure across modern corporate accounting databases and ERP systems.",
    tags: ["SAP", "QuickBooks", "NetSuite", "Tally"],
    outcome: "Industry-ready from day one"
  },
  {
    id: "fpna",
    trackIndex: "TRACK 02",
    title: "FP&A & Modeling",
    angle: 342, // Upper Right
    color: "#2ACDFF", // Cyan Blue
    rgb: "42, 205, 255",
    icon: LineChart,
    description: "Skilled in structural forecasting methods, capital planning models, and data-driven corporate budgeting.",
    tags: ["Budgeting", "Forecasting", "Financial modeling"],
    outcome: "Certified modeling specialist"
  },
  {
    id: "automation",
    trackIndex: "TRACK 03",
    title: "Automation & AI",
    angle: 54, // Lower Right
    color: "#9C5BFF", // Violet Purple
    rgb: "156, 91, 255",
    icon: Cpu,
    description: "Able to automate tabular workflows, build Power BI intelligence, and deploy standard RPA agents.",
    tags: ["Excel automation", "Power BI", "RPA", "AI workflows"],
    outcome: "Process automation expert"
  },
  {
    id: "audit",
    trackIndex: "TRACK 04",
    title: "Audit & Controls",
    angle: 126, // Lower Left
    color: "#3B82F6", // Deep Blue
    rgb: "59, 130, 246",
    icon: ShieldAlert,
    description: "Grounded in internal audit frameworks, SOX compliance regulations, and financial risk mitigation controls.",
    tags: ["Internal audit", "Compliance", "Risk controls", "SOX"],
    outcome: "Controls and compliance ready"
  },
  {
    id: "reporting",
    trackIndex: "TRACK 05",
    title: "Reporting & Analytics",
    angle: 198, // Upper Left
    color: "#0D9488", // Teal
    rgb: "13, 148, 136",
    icon: BarChart3,
    description: "Skilled in design of management reporting packages, ad-hoc analysis dashboards, and data pipelines.",
    tags: ["Power BI", "Tableau", "Financial reporting", "SQL"],
    outcome: "Data-driven insight delivery"
  }
];

export function CredibilityRecruiters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  // Interactive capability states
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // Fade transition states for card content switching
  const [renderedNodeId, setRenderedNodeId] = useState<string>("accounting");
  const [contentOpacity, setContentOpacity] = useState<number>(1);
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsAnimated(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Escape key listener to close active details panel
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedNodeId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Scroll trigger entrance animation for left content
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".recruiters-header-fade",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef.current || undefined);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      ctx.revert();
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    };
  }, []);

  const handleNodeHover = (id: string | null) => {
    setHoveredNodeId(id);
  };

  const handleNodeClick = (id: string) => {
    if (selectedNodeId === id) {
      // Toggle closed on secondary click
      setSelectedNodeId(null);
    } else if (selectedNodeId === null) {
      // Direct opening from core state
      setRenderedNodeId(id);
      setSelectedNodeId(id);
      setContentOpacity(1);
    } else {
      // Panel stays open, crossfade content transition: fade out (180ms), switch, fade in (250ms)
      setContentOpacity(0);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

      transitionTimeoutRef.current = setTimeout(() => {
        setRenderedNodeId(id);
        setSelectedNodeId(id);
        setContentOpacity(1);
      }, 180);
    }
  };

  const renderedNode = NODES_DATA.find((n) => n.id === renderedNodeId) || NODES_DATA[0];
  const RenderedIcon = renderedNode.icon;

  // Calculates trigonometry positioning percentage on circle
  const getPositionStyles = (angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    const x = Math.round((50 + 50 * Math.cos(rad)) * 10000) / 10000;
    const y = Math.round((50 + 50 * Math.sin(rad)) * 10000) / 10000;
    return { x, y };
  };

  const isPanelOpen = selectedNodeId !== null;

  return (
    <section
      ref={containerRef}
      id="credibility"
      className={`site-shell section-padding overflow-x-hidden relative recruiters-section-custom ${isAnimated ? "animate-active" : ""
        }`}
    >
      {/* Subtle gradient fade divider replacing the hard border */}
      <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-b from-[#9C5BFF]/8 via-[#2ACDFF]/8 to-transparent blur-[60px] pointer-events-none opacity-10 z-20" />

      <style>{`
        .recruiters-section-custom {
          background-color: transparent;
          color: #F0EFEB;
          --font-display: var(--font-space-grotesk), sans-serif;
          --font-body: var(--font-space-grotesk), sans-serif;
          position: relative;
        }

        .headline-custom {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #ffffff;
        }

        .descriptor-custom {
          font-size: 15px;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        @keyframes core-pulse {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50% { transform: scale(1.08); opacity: 0.95; }
        }

        .animate-spin-slow {
          animation: spinSlow 36s linear infinite;
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animation-play-state-paused {
          animation-play-state: paused !important;
        }

        @keyframes orbit-ring-glow {
          0% { opacity: 0.18; }
          100% { opacity: 0.24; }
        }
        .orbit-ring-pulse {
          animation: orbit-ring-glow 6s ease-in-out infinite alternate;
        }

        @keyframes core-breathing {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.03); }
        }
        .core-breathing-anim {
          animation: core-breathing 4s ease-in-out infinite;
        }

        @keyframes expanding-ring {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.18;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0;
          }
        }
        .expanding-ring-ripple {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 460px;
          height: 460px;
          border: 1.2px solid rgba(80, 220, 255, 0.15);
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
          animation: expanding-ring 4.5s linear infinite;
        }

        @keyframes slow-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(var(--x-drift, 15px), var(--y-drift, -15px)) scale(1.08); }
        }
        .floating-particle-custom {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.25;
          filter: blur(3px);
          animation: slow-float 18s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Decorative Grid Mesh & Ambient glows */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-40" />
      <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[130px] pointer-events-none" />

      <div className="site-shell relative z-10">

        {/* Split Layout: 42% Left, 58% Right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center justify-between">

          {/* LEFT SIDE (42% Width on Desktop) */}
          <div className="w-full lg:w-[41%] flex flex-col gap-8 recruiters-header-fade">

            {/* Header Content */}
            <div className="flex flex-col gap-5">
              <span className="section-eyebrow self-start">
                {SECTION_CONTENT.eyebrow}
              </span>
              <h2 className="section-title">
                Hire finance talent with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">real baseline</span> readiness.
              </h2>
              <p className="section-desc">
                4AT Academy helps employers access candidates who already understand the workflows, tools, and expectations behind modern finance roles — reducing ramp time and training burden.
              </p>
            </div>

            {/* Recruiter Metrics Panel (Mockup aligned) */}
            <div className="metrics-panel-custom rounded-[24px] border border-white/8 bg-[#0b0e1a]/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
              <div className="grid grid-cols-2">

                {/* Metric 1 */}
                <div className="flex items-center gap-4 py-6 px-5 border-r border-b border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full border border-[#2DD4BF]/30 flex items-center justify-center text-[#2DD4BF] bg-[#2DD4BF]/5 shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xl font-extrabold tracking-tight text-white leading-none font-sans">
                      <CountUpNumber value="2,400+" />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.08em] text-white/50 font-sans font-semibold mt-1">
                      Learners Enrolled
                    </span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex items-center gap-4 py-6 px-5 border-b border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full border border-[#60A5FA]/30 flex items-center justify-center text-[#60A5FA] bg-[#60A5FA]/5 shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xl font-extrabold tracking-tight text-white leading-none font-sans">
                      <CountUpNumber value="87%" />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.08em] text-white/50 font-sans font-semibold mt-1">
                      Placed in 90 Days
                    </span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-center gap-4 py-6 px-5 border-r border-white/[0.08]">
                  <div className="w-10 h-10 rounded-full border border-[#A855F7]/30 flex items-center justify-center text-[#A855F7] bg-[#A855F7]/5 shrink-0">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xl font-extrabold tracking-tight text-white leading-none font-sans">
                      <CountUpNumber value="140+" />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.08em] text-white/50 font-sans font-semibold mt-1">
                      Recruiters Network
                    </span>
                  </div>
                </div>

                {/* Metric 4 */}
                <div className="flex items-center gap-4 py-6 px-5">
                  <div className="w-10 h-10 rounded-full border border-[#34D399]/30 flex items-center justify-center text-[#34D399] bg-[#34D399]/5 shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xl font-extrabold tracking-tight text-[#34D399] leading-none font-sans">
                      <CountUpNumber value="4.9★" />
                    </span>
                    <span className="text-[9px] uppercase tracking-[0.08em] text-white/50 font-sans font-semibold mt-1">
                      Average Rating
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT SIDE: Radial Orbital Visualization (58% Width on Desktop) */}
          <div className="w-full lg:w-[57%] flex items-center justify-center relative min-h-[640px]">

            {/* Click Catcher Background Overlay: Closes detail panel on outside click */}
            {isPanelOpen && (
              <div
                className="absolute inset-0 cursor-default z-10"
                onClick={() => setSelectedNodeId(null)}
              />
            )}

            {/* Aspect Scale wrapper to shrink layout on mobile screens */}
            <div className="w-[500px] h-[500px] scale-[0.62] sm:scale-[0.8] md:scale-100 transform origin-center transition-transform duration-300 relative flex items-center justify-center">

              {/* Floating Background Particles */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-full">
                {[...Array(10)].map((_, i) => {
                  const size = 6 + (i % 3) * 3;
                  const left = 15 + (i * 27) % 70;
                  const top = 10 + (i * 23) % 80;
                  const driftX = 10 + (i * 12) % 25;
                  const driftY = -15 - (i * 9) % 20;
                  const duration = 12 + (i % 4) * 4;
                  return (
                    <div
                      key={i}
                      className="floating-particle-custom bg-white/10"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `${left}%`,
                        top: `${top}%`,
                        opacity: 0.25,
                        filter: "blur(3px)",
                        animation: `slow-float ${duration}s ease-in-out infinite alternate`,
                        "--x-drift": `${driftX}px`,
                        "--y-drift": `${driftY}px`
                      } as React.CSSProperties}
                    />
                  );
                })}
              </div>

              {/* Core SVG Connecting lines layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {NODES_DATA.map((node) => {
                  const isNodeSelected = selectedNodeId === node.id;
                  const isNodeHovered = hoveredNodeId === node.id;
                  const isLineActive = isNodeSelected || (selectedNodeId === null && isNodeHovered);

                  const pos = getPositionStyles(node.angle);
                  return (
                    <line
                      key={node.id}
                      x1="50%"
                      y1="50%"
                      x2={`${pos.x}%`}
                      y2={`${pos.y}%`}
                      stroke={isLineActive ? node.color : "rgba(255, 255, 255, 0.16)"}
                      strokeWidth={isLineActive ? "2" : "1"}
                      strokeDasharray={isLineActive ? "none" : "3 5"}
                      className="transition-all duration-500 ease-out"
                    />
                  );
                })}
              </svg>
              {/* Dotted Circular Orbit track with Polar/Radar Concentric Rings */}
              <svg className="absolute w-[460px] h-[460px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                <defs>
                  <linearGradient id="outer-orbit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
                    <stop offset="50%" stopColor="#A855F7" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.45" />
                  </linearGradient>
                  <linearGradient id="outer-orbit-glow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#A855F7" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {/* Wide outer halo — very soft, large spread */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="229"
                  fill="none"
                  stroke="url(#outer-orbit-glow)"
                  strokeWidth="28"
                  className="orbit-ring-pulse"
                  style={{ filter: "blur(22px)", opacity: 0.22 }}
                />
                {/* Tight glow backing — closer bloom around the ring line */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="229"
                  fill="none"
                  stroke="url(#outer-orbit-glow)"
                  strokeWidth="6"
                  className="orbit-ring-pulse"
                  style={{ filter: "blur(5px)", opacity: 0.55 }}
                />
                {/* Main Sharp Ring */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="229"
                  fill="none"
                  stroke="url(#outer-orbit-gradient)"
                  strokeWidth="1.4"
                  className="orbit-ring-pulse"
                  style={{ filter: "drop-shadow(0 0 14px rgba(34,211,238,0.6)) drop-shadow(0 0 6px rgba(168,85,247,0.45))" }}
                />
                {/* White specular highlight on the ring */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="229"
                  fill="none"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.7"
                  className="orbit-ring-pulse"
                />
                <circle cx="50%" cy="50%" r="190" fill="none" stroke="url(#outer-orbit-gradient)" strokeWidth="1" className="orbit-ring-pulse" style={{ opacity: 0.18 }} />
                <circle cx="50%" cy="50%" r="150" fill="none" stroke="url(#outer-orbit-gradient)" strokeWidth="1" className="orbit-ring-pulse" style={{ opacity: 0.16 }} />
                <circle cx="50%" cy="50%" r="110" fill="none" stroke="url(#outer-orbit-gradient)" strokeWidth="1" className="orbit-ring-pulse" style={{ opacity: 0.14 }} />
                <circle cx="50%" cy="50%" r="70" fill="none" stroke="url(#outer-orbit-gradient)" strokeWidth="1" className="orbit-ring-pulse" style={{ opacity: 0.12 }} />
                <circle cx="50%" cy="50%" r="30" fill="none" stroke="url(#outer-orbit-gradient)" strokeWidth="1" className="orbit-ring-pulse" style={{ opacity: 0.1 }} />
              </svg>

              {/* Radar Expanding Pulse Ripples */}
              {!isPanelOpen && (
                <div className="expanding-ring-ripple" />
              )}

              {/* Orbiting dots / Rotating particle container (Slow Clockwise, Pauses on selected lock) */}
              <div
                className={`absolute w-[460px] h-[460px] rounded-full pointer-events-none z-10 animate-spin-slow ${isPanelOpen ? "animation-play-state-paused" : ""
                  }`}
                style={{ animationDirection: "normal", animationDuration: "20s" }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE,0_0_5px_#22D3EE] border border-white/20" />
                <div className="absolute bottom-[10%] right-[15%] w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_10px_#34D399,0_0_5px_#34D399] border border-white/20" />
                <div className="absolute left-[8%] top-[30%] w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7,0_0_5px_#A855F7] border border-white/20" />
                <div className="absolute bottom-[20%] left-[25%] w-2 h-2 rounded-full bg-[#22D3EE] shadow-[0_0_10px_#22D3EE,0_0_5px_#22D3EE] border border-white/20" />
                <div className="absolute top-[25%] right-[20%] w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_10px_#A855F7,0_0_5px_#A855F7] border border-white/20" />
              </div>

              {/* Animated energy core shown in center when no node is selected (scales down when panel is active) */}
              <div
                className={`absolute left-1/2 top-1/2 w-[180px] h-[180px] flex items-center justify-center pointer-events-none z-10 transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${isPanelOpen ? "opacity-0 scale-50" : "opacity-100 scale-100 core-breathing-anim"
                  }`}
                style={{ transform: "translate(-50%, -50%)" }}
              >
                {/* Breathing radial glow that maps to active hovered node accent */}
                <div
                  className="absolute w-[280px] h-[280px] rounded-full blur-[60px] opacity-60 transition-all duration-500 ease-out"
                  style={{
                    background: "radial-gradient(circle, rgba(30,255,190,0.3) 0%, rgba(34,211,238,0.2) 30%, rgba(168,85,247,0.28) 65%, rgba(147,51,234,0.12) 85%, transparent 100%)",
                    filter: "blur(40px)"
                  }}
                />
                {/* Center Core dot (Glowing teal circle) */}
                <div className="absolute w-3.5 h-3.5 rounded-full bg-[#22D3EE] shadow-[0_0_12px_#22D3EE] border border-white/20" />
              </div>

              {/* Interactive Details Information Panel (Center aligned, scales/fades in) */}
              <div
                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] rounded-[22px] border p-6 backdrop-blur-xl z-20 pointer-events-auto transition-all duration-[350ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-center select-none ${isPanelOpen ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"
                  }`}
                style={{
                  background: "linear-gradient(145deg, #071020 0%, #050c1a 60%, #04091a 100%)",
                  borderColor: `${renderedNode.color}4d`,
                  boxShadow: `0 24px 60px rgba(2,6,20,0.92), 0 0 0 1px rgba(255,255,255,0.04), 0 0 24px ${renderedNode.color}3a, 0 0 60px ${renderedNode.color}18, inset 0 0 20px ${renderedNode.color}0a`
                }}
              >
                {/* Panel Close Button */}
                <button
                  onClick={() => setSelectedNodeId(null)}
                  className="absolute top-5 right-5 text-white/30 hover:text-white/80 active:scale-95 transition-all p-1.5 rounded-lg hover:bg-white/5 cursor-pointer z-30"
                  aria-label="Close details"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Inner Content Wrapper transitions opacity during updates */}
                <div
                  className="transition-all duration-300 flex flex-col"
                  style={{
                    opacity: contentOpacity,
                    transitionDuration: contentOpacity === 0 ? "180ms" : "250ms"
                  }}
                >
                  {/* Track Badge and Node Icon */}
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[9px] font-bold font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border bg-white/[0.01]"
                      style={{
                        borderColor: `${renderedNode.color}3a`,
                        color: renderedNode.color
                      }}
                    >
                      {renderedNode.trackIndex}
                    </span>
                    <div style={{ color: renderedNode.color }}>
                      <RenderedIcon className="w-4 h-4 shrink-0" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight text-white mt-4 font-sans leading-tight">
                    {renderedNode.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-white/70 leading-relaxed mt-2.5 min-h-[50px] font-sans">
                    {renderedNode.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="mt-4">
                    <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {renderedNode.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] border border-white/5 bg-white/[0.02] px-2 py-1 rounded-lg text-white/85 font-sans"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Outcome block */}
                  <div className="mt-4">
                    <span className="text-[9px] font-bold font-mono tracking-widest text-white/40 uppercase">
                      Employer Outcome
                    </span>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold text-white/95 font-sans">
                        {renderedNode.outcome}
                      </span>
                    </div>
                  </div>


                </div>

              </div>

              {/* Distributed Node Circle buttons */}
              {NODES_DATA.map((node) => {
                const isNodeSelected = selectedNodeId === node.id;
                const isNodeHovered = hoveredNodeId === node.id;
                const isNodeActive = isNodeSelected || (selectedNodeId === null && isNodeHovered);

                // If a panel is open, dim all nodes except the selected one
                const isDimmed = isPanelOpen && !isNodeSelected;

                const pos = getPositionStyles(node.angle);
                const NodeIcon = node.icon;

                return (
                  <button
                    key={node.id}
                    className={`absolute w-[68px] h-[68px] z-30 select-none group cursor-pointer flex flex-col items-center justify-center outline-none focus:outline-none transition-opacity duration-300 ${isDimmed ? "opacity-35" : "opacity-100"
                      }`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                    onMouseEnter={() => handleNodeHover(node.id)}
                    onMouseLeave={() => handleNodeHover(null)}
                    onClick={() => handleNodeClick(node.id)}
                  >

                    {/* Ring expand halo hover/selected animation */}
                    <div
                      className={`absolute w-[82px] h-[82px] rounded-full border border-dashed animate-spin-slow transition-all duration-500 pointer-events-none ${isNodeActive ? "opacity-20 scale-100" : "opacity-0 scale-[0.8]"
                        }`}
                      style={{ borderColor: node.color, animationDuration: "16s" }}
                    />

                    {/* Outer pulse glow halo backing */}
                    <div
                      className={`absolute inset-[-6px] rounded-full blur-[10px] transition-opacity duration-300 pointer-events-none ${isNodeActive ? "opacity-15" : isNodeHovered ? "opacity-12" : "opacity-0"
                        }`}
                      style={{ backgroundColor: node.color }}
                    />

                    {/* Main Node Circle */}
                    <div
                      className="w-14 h-14 rounded-full border-[1.5px] flex items-center justify-center relative overflow-hidden z-10 transition-all duration-[220ms] ease-out"
                      style={{
                        background: isNodeActive
                          ? `radial-gradient(circle at center, ${node.color}1a 0%, #07090D 100%)`
                          : "#07090D",
                        borderColor: isNodeActive ? node.color : `${node.color}55`,
                        boxShadow: isNodeActive
                          ? `0 0 15px ${node.color}66`
                          : `0 0 8px ${node.color}22`,
                        transform: isNodeActive ? "scale(1.15)" : isNodeHovered ? "scale(1.04)" : "scale(1)"
                      }}
                    >
                      <NodeIcon
                        className="w-5 h-5 stroke-[1.8] transition-all duration-500 group-hover:scale-108"
                        style={{ color: isNodeActive ? node.color : "rgba(255, 255, 255, 0.3)" }}
                      />
                    </div>

                    {/* Centered Node Label positioned below */}
                    <div
                      className="absolute top-[68px] left-1/2 -translate-x-1/2 text-center w-[120px] transition-all duration-300 pointer-events-none"
                    >
                      <span
                        className="text-[10px] font-bold tracking-tight block transition-colors duration-500 font-sans"
                        style={{ color: isNodeActive ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                      >
                        {node.title}
                      </span>
                    </div>

                    {/* Hover Tooltip (Title only) */}
                    <div
                      className={`absolute bottom-[76px] left-1/2 -translate-x-1/2 bg-[#0D1016] border border-white/10 rounded-lg px-2.5 py-1 z-40 transition-all duration-300 pointer-events-none shadow-xl ${isNodeHovered && !isNodeSelected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                        }`}
                    >
                      <span className="text-[10px] font-semibold text-white whitespace-nowrap block">
                        {node.title}
                      </span>
                    </div>

                  </button>
                );
              })}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
