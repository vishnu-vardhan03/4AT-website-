"use client";

import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Layers, 
  Cpu, 
  BookOpen, 
  Binary,
  CheckSquare,
  Target,
  Users,
  ChevronRight,
  Briefcase,
  FileText
} from "lucide-react";
import { NeonGlowOrb } from "@/components/academy/NeonGlowOrb";

// --- CUSTOM HIGH-FIDELITY SVG LOGOS MATCHING THE MOCKUP ---
const renderExcelLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="#107C41" />
    <path d="M6 6L14 18M14 6L6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 6h4v12h-4z" fill="white" opacity="0.2" />
  </svg>
);

const renderSapLogo = () => (
  <svg viewBox="0 0 36 20" className="w-[28px] h-[16px]" fill="none">
    <rect width="36" height="20" rx="3" fill="#008FD3" />
    <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" fontFamily="sans-serif" fontSize="9" fontWeight="900" fill="white" letterSpacing="-0.5">SAP</text>
  </svg>
);

const renderPowerBiLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
    <rect x="4" y="13" width="3.5" height="7" rx="0.5" fill="#F2C811" />
    <rect x="10.25" y="8" width="3.5" height="12" rx="0.5" fill="#F29F05" />
    <rect x="16.5" y="4" width="3.5" height="16" rx="0.5" fill="#E27602" />
  </svg>
);

const renderPythonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M11.898 0C5.69 0 6.05 2.688 6.05 2.688v2.484h5.952v.842H3.66S0 5.485 0 11.666c0 6.182 3.238 5.922 3.238 5.922h1.932v-2.71c0-2.484 2.05-4.664 4.545-4.664h5.885s2.327-.087 2.327-2.33v-5.2C17.927 2.688 17.65 0 11.898 0zm-3.238 1.62c.535 0 .968.434.968.97 0 .536-.433.97-.968.97a.97.97 0 0 1-.969-.97c0-.536.434-.97.97-.97z" fill="#306998" />
    <path d="M12.102 24c6.208 0 5.848-2.688 5.848-2.688v-2.484H12v-.842h8.34s3.66.529 3.66-5.652c0-6.182-3.238-5.922-3.238-5.922h-1.932v2.71c0 2.484-2.05 4.664-4.545 4.664H8.398s-2.327.087-2.327 2.33v5.2C6.071 21.312 6.35 24 12.102 24zm3.238-1.62a.97.97 0 0 1-.968-.97c0-.536.433-.97.968-.97.536 0 .97.434.97.97a.97.97 0 0 1-.97.97z" fill="#FFE873" />
  </svg>
);

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);


  // Card Refs
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);

  // --- STATE FOR CARD 1 (MISSION) ---
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  const centerX = 160;
  const centerY = 130;
  const radius = 95; // Mathematically calculated radius for symmetric spacing

  const constellationNodes = [
    { 
      name: "Excel Modeling", 
      icon: renderExcelLogo, 
      class: "text-emerald-400 border-emerald-400/30 hover:border-emerald-400/50 hover:bg-emerald-400/5", 
      particleColor: "#10C981", 
      glowFilter: "glow-green",
      labelAlign: "right" 
    },
    { 
      name: "SAP / NetSuite", 
      icon: renderSapLogo, 
      class: "text-sky-400 border-sky-400/30 hover:border-sky-400/50 hover:bg-sky-400/5", 
      particleColor: "#008FD3", 
      glowFilter: "glow-blue",
      labelAlign: "right" 
    },
    { 
      name: "Power BI", 
      icon: renderPowerBiLogo, 
      class: "text-amber-500 border-amber-500/30 hover:border-amber-500/50 hover:bg-amber-500/5", 
      particleColor: "#F29F05", 
      glowFilter: "glow-orange",
      labelAlign: "right" 
    },
    { 
      name: "AI & Analytics", 
      icon: () => <Cpu className="w-5 h-5 text-cyan-400" />, 
      class: "text-cyan-400 border-cyan-400/30 hover:border-cyan-400/50 hover:bg-cyan-400/5", 
      particleColor: "#43E6FF", 
      glowFilter: "glow-cyan",
      labelAlign: "right" 
    },
    { 
      name: "Python Automation", 
      icon: renderPythonLogo, 
      class: "text-yellow-500 border-yellow-500/30 hover:border-yellow-500/50 hover:bg-yellow-500/5", 
      particleColor: "#FFE873", 
      glowFilter: "glow-yellow",
      labelAlign: "bottom" 
    },
    { 
      name: "Accounting", 
      icon: () => <BookOpen className="w-5 h-5 text-purple-400" />, 
      class: "text-purple-400 border-purple-400/30 hover:border-purple-400/50 hover:bg-purple-400/5", 
      particleColor: "#A66BFF", 
      glowFilter: "glow-purple",
      labelAlign: "bottom" 
    }
  ];

  const calculatedNodes = constellationNodes.map((node, idx) => {
    // 6 nodes, equally spaced by 60 degrees. First node starts at top (-90 degrees)
    const angle = -Math.PI / 2 + idx * (Math.PI / 3);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return {
      ...node,
      x,
      y
    };
  });

  // --- STATE FOR CARD 2 (FOCUS) ---
  const [activeTab, setActiveTab] = useState(0); // 0: FP&A, 1: Audit, 2: US Tax

  const focusData = [
    {
      tab: "FP&A",
      skills: ["Excel Modeling", "Financial Forecasting", "Budget Planning", "Power BI", "Automation", "Business Analysis"],
      tools: ["excel", "sap", "powerbi", "python", "sql"],
      projects: ["Budget Forecast Model", "Variance Analysis Tool", "Executive Dashboard"]
    },
    {
      tab: "Audit",
      skills: ["Internal Audit", "SEC Compliance", "Risk Mitigation", "Controls Diagnostic", "Audit Trail Mapping", "SOX 404 Controls"],
      tools: ["excel", "sap", "powerbi", "sql"],
      projects: ["SOX 404 Assessment Plan", "Control Matrix Auditor", "Internal Audit Review"]
    },
    {
      tab: "US Tax",
      skills: ["Federal Taxation", "Corporate Filing", "Form 1040/1120 Mastery", "Tax Provisioning", "IRS Regulations Analysis"],
      tools: ["excel", "sap", "sql"],
      projects: ["Tax Provision Model", "Form 1120 Preparation Sheet", "Corporate Tax Return"]
    }
  ];

  // --- STATE FOR CARD 3 (VISION) ---
  const [hoveredVisionNode, setHoveredVisionNode] = useState<number | null>(null);

  // --- STATE FOR CARD 4 (APPROACH) ---
  const [activeStep, setActiveStep] = useState(0);

  const approachStages = [
    {
      title: "Train",
      subtitle: "Baseline Masterclass",
      desc: "Structured cohorts covering real-world finance concepts and modern tools.",
      icon: Target,
      color: "16, 201, 129"
    },
    {
      title: "Assess",
      subtitle: "Workflow Checks",
      desc: "Rigorous timed challenges matching realistic finance team work.",
      icon: FileText,
      color: "110, 168, 255"
    },
    {
      title: "Mentor",
      subtitle: "1-on-1 Reviews",
      desc: "Personal feedback on models, logic, and real-world scenarios.",
      icon: Users,
      color: "166, 107, 255"
    },
    {
      title: "Placement",
      subtitle: "Employer Matching",
      desc: "Direct integration into active hiring pipelines at top companies.",
      icon: Briefcase,
      color: "16, 201, 129"
    }
  ];

  // Mouse Movement Spotlight Trackers
  const handleMouseMove = (ref: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--mouse-x", `${x}px`);
    ref.current.style.setProperty("--mouse-y", `${y}px`);
  };



  // --- ScrollTrigger triggers for Entrance Animations ---
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Staggered reveals for cards
      const cards = [card1Ref.current, card2Ref.current, card3Ref.current, card4Ref.current];
      cards.forEach((card) => {
        if (!card) return;
        
        const animateElements = card.querySelectorAll(".bento-animate-item");
        gsap.fromTo(
          animateElements,
          { opacity: 0, y: 15, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.6,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      });

      // Approach timeline scroll observer
      ScrollTrigger.create({
        trigger: card4Ref.current,
        start: "top 75%",
        end: "bottom 25%",
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.25) setActiveStep(0);
          else if (progress < 0.5) setActiveStep(1);
          else if (progress < 0.75) setActiveStep(2);
          else setActiveStep(3);
        }
      });
    }, sectionRef.current || undefined);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="site-shell bg-transparent text-white section-padding overflow-x-hidden relative min-h-[100dvh] flex items-center"
    >
      <style>{`
        /* Cohesive Bento Card design system token matching Vercel/Nothing layout */
        .glass-bento-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          opacity: 0.015;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        .glass-bento-card {
          position: relative;
          background: #0A0B0F;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(var(--accent-color), 0.14);
          box-shadow:
            inset 0 0 60px rgba(var(--accent-color), 0.09),
            inset 0 1px 0 rgba(255,255,255,0.06),
            0 0 0 0.5px rgba(255,255,255,0.04),
            0 14px 50px rgba(0,0,0,0.35);
          border-radius: 22px;
          transition: all 220ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-bento-card:hover {
          transform: translateY(-3px);
          border-color: rgba(var(--accent-color), 0.26);
          box-shadow:
            inset 0 0 60px rgba(var(--accent-color), 0.17),
            inset 0 1px 0 rgba(255,255,255,0.09),
            0 0 0 0.5px rgba(255,255,255,0.06),
            0 14px 50px rgba(0,0,0,0.45);
        }

        /* Floating action badges with rotational hover dynamics */
        .premium-badge {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 46px;
          height: 46px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(var(--accent-color), 0.06);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(var(--accent-color), 0.28);
          color: rgb(var(--accent-color));
          box-shadow: 
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.06), 
            0 4px 12px rgba(0, 0, 0, 0.6),
            0 0 14px rgba(var(--accent-color), 0.18);
          transition: all 400ms cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 20;
        }

        .premium-badge:hover {
          transform: scale(1.08) rotate(4deg);
          border-color: rgba(var(--accent-color), 0.6);
          box-shadow: 
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.12), 
            0 0 20px rgba(var(--accent-color), 0.45);
        }

        /* Drift animation for watermarks */
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(6px, -5px) scale(1.02); }
        }
        .animate-watermark {
          animation: drift 15s ease-in-out infinite;
        }

        /* SVG vertical dashed line progress */
        .animate-dash-line {
          stroke-dasharray: 6 3;
          animation: dash-move 35s linear infinite;
        }
        @keyframes dash-move {
          to {
            stroke-dashoffset: -1000;
          }
        }

        /* Green constellation core node breathing pulse */
        @keyframes green-breathe {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 
              0 0 18px rgba(16, 201, 129, 0.35),
              0 0 35px rgba(16, 201, 129, 0.15),
              inset 0 0 12px rgba(67, 230, 255, 0.2);
            border-color: #10C981;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.04);
            box-shadow: 
              0 0 28px rgba(16, 201, 129, 0.55),
              0 0 55px rgba(16, 201, 129, 0.25),
              0 0 75px rgba(67, 230, 255, 0.2),
              inset 0 0 16px rgba(67, 230, 255, 0.3);
            border-color: #43E6FF;
          }
        }
        .animate-breathe {
          animation: green-breathe 4s ease-in-out infinite;
        }

        /* Horizontal progress timeline pulses */
        @keyframes pulse-ring {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--timeline-pulse-color), 0.4); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(var(--timeline-pulse-color), 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(var(--timeline-pulse-color), 0); }
        }
        .active-pulse-milestone {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Micro arrow sliding */
        @keyframes slide-right {
          0%, 100% { transform: translateX(0); opacity: 0.6; }
          50% { transform: translateX(4px); opacity: 1; }
        }
        .animate-slide-right {
          animation: slide-right 1.8s ease-in-out infinite;
        }

        /* Blueprint grid styling */
        .blueprint-grid {
          background-image: 
            linear-gradient(rgba(16, 201, 129, 0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 201, 129, 0.012) 1px, transparent 1px);
          background-size: 50px 50px;
          background-position: center center;
        }
        .blueprint-grid::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(16, 201, 129, 0.005) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 201, 129, 0.005) 1px, transparent 1px);
          background-size: 10px 10px;
          background-position: center center;
          pointer-events: none;
        }

        /* Horizontal timeline progress flow particles */
        @keyframes timeline-flow {
          0% { left: 8%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { left: 92%; opacity: 0; }
        }
        .timeline-flow-particle {
          position: absolute;
          top: 50%;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 0 8px #fff, 0 0 16px rgba(110, 168, 255, 0.8);
          transform: translateY(-50%);
          animation: timeline-flow 4s linear infinite;
        }
      `}</style>

      {/* Floating particles & subtle grid blueprints overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Soft Ambient Radial Gradients */}
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(166,107,255,0.06)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(110,168,255,0.04)_0%,transparent_70%)] blur-[120px]" />
        
        {/* Blueprint drafting grid */}
        <div className="blueprint-grid absolute inset-0 opacity-40" />


      </div>

      <div className="site-shell relative z-10 w-full">
        {/* Header Block */}
        <div className="max-w-[720px] mb-8 md:mb-10 flex flex-col gap-4 text-left">
          <div>
            <span className="section-eyebrow">
              ABOUT ACADEMY
            </span>
          </div>
          <h2 className="section-title">
            Where learning converts into <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 font-sans">career readiness</span>.
          </h2>
          <p className="section-desc">
            We do not teach courses to hand out certificates. We run structured cohorts mapped directly to modern financial analytics stacks, ensuring learners are fully operational before hiring pipelines begin.
          </p>
        </div>

        {/* Ambient background glow */}
        <div className="mt-16 lg:mt-24 relative">
          <NeonGlowOrb 
            className="left-1/2 md:left-3/4 top-[320px] md:top-0 -translate-x-1/2 -translate-y-1/2 z-0" 
            size={300} 
            opacity={0.16} 
            blur={40} 
          />
          {/* Asymmetric Bento-Style Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
          <div
            ref={card1Ref}
            onMouseMove={handleMouseMove(card1Ref)}
            className="lg:col-span-7 glass-bento-card p-6 overflow-hidden flex flex-col justify-between group h-[420px] relative"
            style={{ "--accent-color": "16, 201, 129", "--spotlight-color-rgb": "16, 201, 129" } as React.CSSProperties}
          >
          {/* Ambient gradient overlay — top-left emerald */}
            <div className="absolute inset-0 pointer-events-none z-0 rounded-[22px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,255,180,0.06) 0%, transparent 55%)" }} />
              <div className="absolute top-0 left-0 w-[240px] h-[240px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,255,180,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </div>
            {/* Spotlight Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(16, 201, 129, 0.08), transparent 80%)"
              }}
            />
            <div className="relative z-10 bento-animate-item">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-sans tracking-tight">
                Our Mission
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-ink-secondary leading-relaxed mt-4 max-w-full md:max-w-[48%] lg:max-w-[50%] font-medium">
                Equip emerging finance talent with practical, employer-relevant training across accounting, audit, tax, FP&A, automation, and modern finance tools.
              </p>
            </div>

            {/* Symmetrical Constellation Layout (Absolute positioned in the top 20% of the card, sticking to the right) */}
            <div className="absolute top-[8%] right-[0%] sm:right-[2%] md:right-[4%] w-[320px] h-[260px] pointer-events-none z-0">
              <div className="relative w-full h-full flex items-center justify-center scale-[1.15] sm:scale-[1.28] origin-center transition-all duration-300">
                {/* Soft breathing radial glow in background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,201,129,0.08)_0%,transparent_60%)] pointer-events-none" />
                
                {/* Subtle fading blueprint grid mask */}
                <div className="absolute inset-0 blueprint-grid opacity-[0.15] pointer-events-none [mask-image:radial-gradient(circle_at_center,black_30%,transparent_75%)]" />

                {/* Tiny glowing star particles inside Card 1 visualization */}
                <div className="absolute top-[20%] left-[30%] w-1 h-1 rounded-full bg-[#10C981] opacity-75 shadow-[0_0_8px_#10C981] animate-pulse" />
                <div className="absolute top-[75%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#43E6FF] opacity-60 shadow-[0_0_10px_#43E6FF] animate-pulse" style={{ animationDuration: "3s" }} />
                <div className="absolute top-[40%] right-[15%] w-1 h-1 rounded-full bg-[#A66BFF] opacity-80 shadow-[0_0_8px_#A66BFF] animate-pulse" style={{ animationDuration: "2.5s" }} />
                <div className="absolute bottom-[25%] right-[25%] w-1.5 h-1.5 rounded-full bg-[#10C981] opacity-70 shadow-[0_0_8px_#10C981] animate-pulse" style={{ animationDuration: "3.5s" }} />

                {/* Symmetrical connector lines inside 320x260 box */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 320 260" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    <filter id="glow-green" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-blue" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-orange" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-yellow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <filter id="glow-purple" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="2.5" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {calculatedNodes.map((node, idx) => (
                    <React.Fragment key={`path-${idx}`}>
                      {/* Background neon path glow */}
                      <path 
                        d={`M ${centerX},${centerY} L ${node.x.toFixed(2)},${node.y.toFixed(2)}`} 
                        stroke={node.particleColor} 
                        strokeWidth="2.5" 
                        opacity="0.12" 
                        fill="none" 
                      />
                      {/* Thinner neon foreground core line */}
                      <path 
                        id={`path-${idx}`} 
                        d={`M ${centerX},${centerY} L ${node.x.toFixed(2)},${node.y.toFixed(2)}`} 
                        stroke={hoveredNode === idx ? node.particleColor : "rgba(255, 255, 255, 0.18)"} 
                        strokeWidth="0.8" 
                        className="transition-all duration-350"
                        fill="none" 
                      />
                      {/* Midpoint glowing connector node */}
                      <circle 
                        cx={((centerX + node.x) / 2).toFixed(2)} 
                        cy={((centerY + node.y) / 2).toFixed(2)} 
                        r="2.2" 
                        fill={node.particleColor} 
                        filter={`url(#${node.glowFilter})`} 
                        opacity="0.85" 
                        className="animate-pulse"
                      />
                    </React.Fragment>
                  ))}

                  {/* High-intensity glow particles flowing along paths */}
                  {calculatedNodes.map((node, idx) => (
                    <React.Fragment key={`particles-${idx}`}>
                      <circle r="2.2" fill={node.particleColor} filter={`url(#${node.glowFilter})`}>
                        <animateMotion dur={`${2.8 + idx * 0.2}s`} repeatCount="indefinite" begin="0s">
                          <mpath href={`#path-${idx}`} />
                        </animateMotion>
                      </circle>
                      <circle r="1.5" fill={node.particleColor} filter={`url(#${node.glowFilter})`} opacity="0.6">
                        <animateMotion dur={`${2.8 + idx * 0.2}s`} repeatCount="indefinite" begin={`${(2.8 + idx * 0.2) / 2}s`}>
                          <mpath href={`#path-${idx}`} />
                        </animateMotion>
                      </circle>
                    </React.Fragment>
                  ))}

                  {/* High-speed interactive pulse particle back to center when hovered */}
                  {hoveredNode !== null && (
                    <circle r="3.5" fill={calculatedNodes[hoveredNode].particleColor} filter={`url(#${calculatedNodes[hoveredNode].glowFilter})`}>
                      <animateMotion dur="0.9s" repeatCount="indefinite">
                        <mpath href={`#path-${hoveredNode}`} />
                      </animateMotion>
                    </circle>
                  )}
                </svg>


                {/* Layered neon glow ring backing the center node */}
                <div 
                  className="absolute w-[92px] h-[92px] rounded-full border border-[#10C981]/25 bg-[#10C981]/[0.02] pointer-events-none z-10 animate-pulse"
                  style={{ left: `${centerX}px`, top: `${centerY}px`, transform: "translate(-50%, -50%)", animationDuration: '4s' }}
                />

                {/* Center node with gradient and breathe animation */}
                <div 
                  className="absolute w-20 h-20 rounded-full flex flex-col justify-center items-center select-none z-30 animate-breathe"
                  style={{ 
                    left: `${centerX}px`, 
                    top: `${centerY}px`, 
                    transform: "translate(-50%, -50%)",
                    background: "radial-gradient(circle at center, #161a1d 0%, #0d0d0d 100%)",
                    border: "2px solid #10C981",
                    boxShadow: "0 0 20px rgba(16, 201, 129, 0.4), inset 0 0 12px rgba(67, 230, 255, 0.25)"
                  }}
                >
                  <span className="text-[7.5px] font-mono font-extrabold text-[#10C981] uppercase tracking-[0.2em] leading-none">CENTRAL</span>
                  <span className="text-[10px] font-extrabold text-white text-center leading-tight mt-0.5">Practical<br/>Finance</span>
                </div>

                {/* Surrounding Nodes positioned symmetrically using polar calculations */}
                {calculatedNodes.map((node, idx) => {
                  const NodeContent = node.icon;
                  const isHovered = hoveredNode === idx;
                  const isDimmed = hoveredNode !== null && hoveredNode !== idx;

                  return (
                    <div
                      key={node.name}
                      onMouseEnter={() => setHoveredNode(idx)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={`absolute w-11 h-11 transition-all duration-300 z-20 ${
                        isDimmed ? "opacity-35 scale-95" : isHovered ? "scale-108" : ""
                      }`}
                      style={{ 
                        left: `${node.x}px`, 
                        top: `${node.y}px`, 
                        transform: "translate(-50%, -50%)" 
                      }}
                    >
                      <div className={`w-full h-full rounded-full border-[1.5px] flex items-center justify-center transition-all bg-[#121212]/95 ${node.class}`}>
                        <NodeContent />
                      </div>
                      
                      <span className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 text-[9px] font-bold text-white select-none whitespace-nowrap bg-[#090909]/80 px-2 py-0.5 rounded mt-0.5 border border-white/5 tracking-wide shadow-lg z-40">
                        {node.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Casing text (Structured footer with top border) */}
            <div className="w-[calc(100%+48px)] mx-[-24px] border-t border-white/[0.08] pt-4 px-6 relative z-10 bento-animate-item text-[11px] text-slate-400 font-sans tracking-normal select-none">
              Building future-ready finance talent.
            </div>
          </div>

          {/* ================= CARD 2: OUR FOCUS (02) ================= */}
          <div
            ref={card2Ref}
            id="about-card-02"
            onMouseMove={handleMouseMove(card2Ref)}
            className="lg:col-span-5 glass-bento-card p-6 overflow-hidden flex flex-col justify-between group h-[420px] relative"
            style={{ "--accent-color": "166, 107, 255", "--spotlight-color-rgb": "166, 107, 255" } as React.CSSProperties}
          >
          {/* Ambient gradient overlay — top-right violet */}
            <div className="absolute inset-0 pointer-events-none z-0 rounded-[22px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(225deg, rgba(165,110,255,0.06) 0%, transparent 55%)" }} />
              <div className="absolute top-0 right-0 w-[240px] h-[240px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(165,110,255,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </div>
            {/* Spotlight Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(166, 107, 255, 0.08), transparent 80%)"
              }}
            />
            <div className="relative z-10 bento-animate-item">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-sans tracking-tight">
                Our Focus
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-ink-secondary leading-relaxed mt-4 max-w-[42ch] font-medium">
                Build talent for real hiring demand by aligning training to the finance roles companies are actively trying to fill.
              </p>
            </div>

            {/* Interactive explorer widget (Removed scroll clipping to ensure absolute visibility) */}
            <div className="relative z-10 space-y-3 flex-grow mt-2.5 bento-animate-item">
              <div className="flex bg-white/5 border border-white/5 p-0.5 rounded-lg relative">
                <div 
                  className="absolute top-0.5 bottom-0.5 bg-gradient-to-r from-[#A66BFF] to-[#7C3AED] rounded shadow-[0_0_12px_rgba(166,107,255,0.45)] transition-all duration-300 ease-out"
                  style={{
                    left: `${activeTab * 33.33 + 0.5}%`,
                    width: '32.33%'
                  }}
                />
                {focusData.map((data, idx) => (
                  <button
                    key={data.tab}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab(idx);
                    }}
                    className={`flex-1 text-[10px] font-bold py-1.5 rounded relative z-10 cursor-pointer transition-colors ${
                      activeTab === idx ? "text-[#090909]" : "text-white/50 hover:text-white"
                    }`}
                  >
                    {data.tab}
                  </button>
                ))}
              </div>

              {/* Grid content box */}
              <div key={activeTab} className="space-y-3 animate-fade-in transition-all duration-300">
                {/* Skills wrap list (Unclipped height) */}
                <div className="space-y-1">
                  <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Skills you&apos;ll learn</div>
                  <div className="flex flex-wrap gap-1.5">
                    {focusData[activeTab].skills.map((skill) => (
                      <span key={skill} className="text-[9px] font-bold px-2.5 h-5 flex items-center justify-center rounded bg-white/[0.03] border border-white/5 text-white/80 whitespace-nowrap">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & Projects row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Custom logos Tool chips */}
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Tools you&apos;ll use</div>
                    <div className="flex gap-1.5 pt-0.5">
                      {focusData[activeTab].tools.map((tool) => {
                        const getToolGlowStyle = (t: string) => {
                          switch (t) {
                            case "excel": return { border: "1px solid rgba(16, 201, 129, 0.28)", boxShadow: "0 0 10px rgba(16, 201, 129, 0.15)", color: "#10C981" };
                            case "sap": return { border: "1px solid rgba(0, 143, 211, 0.28)", boxShadow: "0 0 10px rgba(0, 143, 211, 0.15)", color: "#008FD3" };
                            case "powerbi": return { border: "1px solid rgba(242, 159, 5, 0.28)", boxShadow: "0 0 10px rgba(242, 159, 5, 0.15)", color: "#F29F05" };
                            case "python": return { border: "1px solid rgba(255, 232, 115, 0.28)", boxShadow: "0 0 10px rgba(255, 232, 115, 0.15)", color: "#FFE873" };
                            case "sql": return { border: "1px solid rgba(166, 107, 255, 0.28)", boxShadow: "0 0 10px rgba(166, 107, 255, 0.15)", color: "#A66BFF" };
                            default: return {};
                          }
                        };
                        return (
                          <div 
                            key={tool} 
                            className="w-8.5 h-8.5 rounded flex items-center justify-center select-none bg-[#121212]/95 transition-all duration-300"
                            style={getToolGlowStyle(tool)}
                          >
                            {tool === "excel" && renderExcelLogo()}
                            {tool === "sap" && renderSapLogo()}
                            {tool === "powerbi" && renderPowerBiLogo()}
                            {tool === "python" && renderPythonLogo()}
                            {tool === "sql" && <Binary className="w-4 h-4 text-purple-400" />}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Projects checklist (Unclipped height) */}
                  <div className="space-y-1">
                    <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Projects you&apos;ll build</div>
                    <div className="space-y-1">
                      {focusData[activeTab].projects.map((proj) => (
                        <div key={proj} className="flex items-center gap-1 text-[9.5px] text-white/80 font-medium">
                          <CheckSquare className="w-2.5 h-2.5 text-[#A66BFF] shrink-0" />
                          <span className="truncate">{proj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Outcome tag fully visible inside h-[420px] */}
            <div className="relative z-10 mt-3 bento-animate-item">
              <div className="w-full py-2.5 rounded-lg border border-[#A66BFF]/35 bg-[#A66BFF]/8 shadow-[0_0_15px_rgba(166,107,255,0.08)] flex items-center justify-center gap-1.5 text-[9px] font-bold tracking-wider text-[#A66BFF] uppercase select-none">
                <span>Interview Ready</span>
                <ChevronRight className="w-3 h-3 text-[#A66BFF] animate-slide-right" />
                <span>Job Ready</span>
                <ChevronRight className="w-3 h-3 text-[#A66BFF] animate-slide-right" />
                <span>Placement Support</span>
              </div>
            </div>
          </div>

          {/* ================= CARD 3: OUR VISION (03) ================= */}
          <div
            ref={card3Ref}
            onMouseMove={handleMouseMove(card3Ref)}
            className="lg:col-span-4 glass-bento-card p-6 overflow-hidden flex flex-col justify-between group h-[370px] relative"
            style={{ "--accent-color": "110, 168, 255", "--spotlight-color-rgb": "110, 168, 255" } as React.CSSProperties}
          >
          {/* Ambient gradient overlay — bottom-left cyan */}
            <div className="absolute inset-0 pointer-events-none z-0 rounded-[22px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(315deg, rgba(0,210,255,0.06) 0%, transparent 55%)" }} />
              <div className="absolute bottom-0 left-0 w-[240px] h-[240px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,210,255,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </div>
            {/* Spotlight Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(110, 168, 255, 0.08), transparent 80%)"
              }}
            />
            <div className="relative z-10 bento-animate-item">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-sans tracking-tight">
                Our Vision
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-ink-secondary leading-relaxed mt-4 max-w-[42ch] font-medium">
                Develop finance professionals who can thrive in a world shaped by automation, analytics, compliance, and AI-enabled decision-making.
              </p>
            </div>

            {/* Vertical Flow Connector with custom SVG logos */}
            <div className="relative z-10 mt-3 flex-grow flex items-center bento-animate-item">
              <div className="relative w-full flex flex-col gap-2.5 pl-5 py-1">
                {/* Vertical upward line tracker (Glow & Core lines thickened by 1px) */}
                <div className="absolute left-[8px] top-2.5 bottom-2.5 w-[2px] pointer-events-none z-0">
                  <svg className="w-full h-full" viewBox="0 0 2 170" fill="none" preserveAspectRatio="none">
                    <line x1="1" y1="0" x2="1" y2="170" stroke="rgba(110, 168, 255, 0.25)" strokeWidth="3" />
                    <path id="upPath" d="M 1,170 L 1,0" stroke="rgba(110, 168, 255, 0.45)" strokeWidth="3" strokeDasharray="3 6" />
                    <circle r="2" fill="#6EA8FF" filter="url(#glow-blue)">
                      <animateMotion dur="2.2s" repeatCount="indefinite"><mpath href="#upPath" /></animateMotion>
                    </circle>
                    <circle r="1.5" fill="#43E6FF" filter="url(#glow-cyan)" opacity="0.8">
                      <animateMotion dur="3.5s" repeatCount="indefinite"><mpath href="#upPath" /></animateMotion>
                    </circle>
                  </svg>
                </div>

                {[
                  { label: "Python Automation", icon: renderPythonLogo, color: "text-[#6EA8FF] bg-[#6EA8FF]/5" },
                  { label: "AI Ledger Copilots", icon: () => <Cpu className="w-3.5 h-3.5" />, color: "text-[#43E6FF] bg-[#43E6FF]/5" },
                  { label: "Power BI Pipelines", icon: renderPowerBiLogo, color: "text-[#A66BFF] bg-[#A66BFF]/5" },
                  { label: "Financial Analytics", icon: () => <Layers className="w-3.5 h-3.5" />, color: "text-white bg-white/5" }
                ].map((chip, idx) => {
                  const NodeIcon = chip.icon;
                  const isHovered = hoveredVisionNode === idx;
                  const isDimmed = hoveredVisionNode !== null && hoveredVisionNode !== idx;

                  return (
                    <div
                      key={chip.label}
                      onMouseEnter={() => setHoveredVisionNode(idx)}
                      onMouseLeave={() => setHoveredVisionNode(null)}
                      className={`relative z-10 flex items-center gap-3.5 py-1 px-3 rounded-lg border transition-all duration-300 cursor-default select-none ${
                        isHovered 
                          ? "bg-[#161b26]/95 border-[#6EA8FF]/50 translate-x-1.5 shadow-[0_0_18px_rgba(110,168,255,0.18)]"
                          : isDimmed
                          ? "opacity-35 scale-95 border-white/5"
                          : "bg-[#121212]/90 border-white/5"
                      }`}
                    >
                      {isHovered && <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#6EA8FF] shadow-[0_0_10px_#6EA8FF] animate-pulse" />}

                      <div className={`w-7.5 h-7.5 rounded flex items-center justify-center border border-white/5 ${chip.color}`}>
                        <NodeIcon />
                      </div>
                      <span className="text-[10px] font-semibold text-white/90">{chip.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= CARD 4: OUR APPROACH (04) ================= */}
          <div
            ref={card4Ref}
            onMouseMove={handleMouseMove(card4Ref)}
            className="lg:col-span-8 glass-bento-card p-6 overflow-hidden flex flex-col justify-between group h-[370px] relative"
            style={{ "--accent-color": "16, 201, 129", "--spotlight-color-rgb": "16, 201, 129" } as React.CSSProperties}
          >
          {/* Ambient gradient overlay — bottom-right teal */}
            <div className="absolute inset-0 pointer-events-none z-0 rounded-[22px] overflow-hidden">
              <div className="absolute inset-0" style={{ background: "linear-gradient(45deg, rgba(0,220,180,0.06) 0%, transparent 55%)" }} />
              <div className="absolute bottom-0 right-0 w-[240px] h-[240px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,220,180,0.05) 0%, transparent 70%)", filter: "blur(40px)" }} />
            </div>
            {/* Spotlight Glow Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
              style={{
                background: "radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(16, 201, 129, 0.08), transparent 80%)"
              }}
            />
            <div className="relative z-10 bento-animate-item">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 font-sans tracking-tight">
                Our Approach
              </h3>
              <p className="text-[13.5px] sm:text-[14.5px] text-ink-secondary leading-relaxed mt-4 max-w-[58ch] font-medium">
                Train with real workflows, test with role-based assessments, refine through mentorship, and move forward with placement support.
              </p>
            </div>

            {/* Horizontal Timeline columns directly beneath */}
            <div className="relative z-10 mt-4 flex-grow flex flex-col justify-end bento-animate-item">
              
              {/* Progress Line axes */}
              <div className="relative w-full h-8 mb-4">
                <div className="absolute top-1/2 left-[8%] right-[8%] h-[1.5px] bg-white/5 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-[8%] right-[8%] h-[1.5px] bg-gradient-to-r from-[#10C981] via-[#43E6FF] via-[#A66BFF] to-[#10C981] -translate-y-1/2 z-0 opacity-80"
                />
                <div className="timeline-flow-particle" style={{ animationDelay: "0s" }} />
                <div className="timeline-flow-particle" style={{ animationDelay: "1.3s" }} />
                <div className="timeline-flow-particle" style={{ animationDelay: "2.6s" }} />

                {/* Tiny glowing intermediate nodes between milestones */}
                <div className="absolute top-1/2 left-[22%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#43E6FF] shadow-[0_0_8px_#43E6FF] opacity-80 z-10 animate-pulse" />
                <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#A66BFF] shadow-[0_0_8px_#A66BFF] opacity-80 z-10 animate-pulse" />
                <div className="absolute top-1/2 left-[78%] -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#43E6FF] shadow-[0_0_8px_#43E6FF] opacity-80 z-10 animate-pulse" />

                {/* Horizontal milestones */}
                <div className="absolute inset-x-0 top-0 bottom-0 flex justify-between items-center px-[8%]">
                  {approachStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isActive = activeStep === idx;
                    return (
                      <div key={stage.title} className="relative flex items-center justify-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStep(idx);
                          }}
                          className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 relative z-10 cursor-pointer ${
                            isActive
                              ? "scale-110 active-pulse-milestone"
                              : "hover:scale-105"
                          }`}
                          style={{
                            "--timeline-pulse-color": stage.color,
                            backgroundColor: isActive ? `rgba(${stage.color}, 0.2)` : `rgba(${stage.color}, 0.05)`,
                            borderColor: isActive ? `rgb(${stage.color})` : `rgba(${stage.color}, 0.4)`,
                            color: isActive ? `rgb(${stage.color})` : `rgba(${stage.color}, 0.7)`,
                            boxShadow: isActive 
                              ? `0 0 0 4px rgba(${stage.color}, 0.18), 0 0 22px rgba(${stage.color}, 0.55)` 
                              : `0 0 10px rgba(${stage.color}, 0.1)`
                          } as React.CSSProperties}
                        >
                          {isActive && (
                            <span className="absolute inset-[3px] rounded-full border border-white/25 z-0" />
                          )}
                          {isActive && (
                            <span className="absolute inset-[1px] rounded-full border border-white/10 z-0 animate-ping opacity-35" />
                          )}
                          <StageIcon className="w-5 h-5 relative z-10" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4 columns static descriptions */}
              <div className="grid grid-cols-4 gap-4 text-center border-t border-white/5 pt-3">
                {approachStages.map((stage, idx) => {
                  const isActive = activeStep === idx;
                  const isCompleted = activeStep > idx;

                  return (
                    <div 
                      key={stage.title} 
                      className={`flex flex-col items-center space-y-1 transition-all duration-300 cursor-pointer select-none`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStep(idx);
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <span className={`text-[12px] font-extrabold transition-colors ${
                          isActive ? "text-white" : isCompleted ? "text-white/60" : "text-white/30"
                        }`}>
                          {stage.title}
                        </span>
                        <span 
                          className="text-[7px] font-mono uppercase tracking-[0.2em] leading-none transition-colors"
                          style={{ color: isActive ? `rgb(${stage.color})` : '#64748b' }}
                        >
                          {stage.subtitle}
                        </span>
                      </div>
                      <p className={`text-[9.5px] text-slate-300 leading-relaxed transition-opacity text-center max-w-[16ch] ${
                        isActive ? "opacity-100" : isCompleted ? "opacity-60" : "opacity-30"
                      }`}>
                        {stage.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

            </div>

            <div className="w-[calc(100%+48px)] mx-[-24px] border-t border-white/[0.08] pt-4 px-6 relative z-10 bento-animate-item text-[9px] font-mono font-bold text-[#10C981] uppercase tracking-[0.25em] select-none mt-auto">
              TURNING TRAINING INTO PLACEMENT.
            </div>
          </div>

        </div>
      </div>
    </div>
    </section>
  );
}
