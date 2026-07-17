import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoMark from "@/assets/services/4at-mark.png";
import { InteractiveSphere } from "./InteractiveSphere";

const slides = [
  {
    title: "Accounting",
    badge: "FINANCE, AUDIT & ADVISORY",
    line1: "YOUR BOOKS,",
    line2: "OUR EXPERTISE",
    line3: "ZERO OVERHEAD.",
    desc: (
      <>
        4AT embeds a <strong className="font-semibold text-white">dedicated offshore finance team</strong> into your operations for F&A, audit, assurance, and advisory, at a fraction of in-house cost. No recruitment. No bench time. Just precise, consistent execution.
      </>
    ),
    pills: [
      { text: "Month-End Close", highlight: "F&A" },
      { text: "Audit Readiness", prefix: "→ " },
      { text: "CFO Advisory", prefix: "→ " },
      { text: "Compliance", prefix: "→ " },
    ]
  },
  {
    title: "Audit",
    badge: "INDEPENDENT AUDIT & ASSURANCE",
    line1: "SHARP CONTROLS,",
    line2: "CLEAR INSIGHTS",
    line3: "ZERO FRICTION.",
    desc: (
      <>
        Rigorous statutory and internal audits that <strong className="font-semibold text-white">build trust with stakeholders</strong> and uncover operational efficiencies. We design audit workflows that run smoothly, giving you complete clarity.
      </>
    ),
    pills: [
      { text: "Statutory Audit", highlight: "Core" },
      { text: "Internal controls", prefix: "→ " },
      { text: "Risk Assessment", prefix: "→ " },
      { text: "Process Review", prefix: "→ " },
    ]
  },
  {
    title: "Assurance",
    badge: "RISK, COMPLIANCE & ASSURANCE",
    line1: "BUILT FOR TRUST,",
    line2: "SCALED FOR RIGOR",
    line3: "ZERO EXPOSURE.",
    desc: (
      <>
        Protect your enterprise with <strong className="font-semibold text-white">robust internal controls</strong>, governance frameworks, and compliance reporting designed for global standards. Real confidence, independently verified.
      </>
    ),
    pills: [
      { text: "Compliance", highlight: "SOX" },
      { text: "ESG Reporting", prefix: "→ " },
      { text: "Policy Frameworks", prefix: "→ " },
      { text: "Governance", prefix: "→ " },
    ]
  },
  {
    title: "Advisory",
    badge: "STRATEGIC ADVISORY & CONSULTING",
    line1: "SENIOR LEADERS,",
    line2: "SHAPING STRATEGY",
    line3: "ZERO PUFFERY.",
    desc: (
      <>
        Direct access to <strong className="font-semibold text-white">experienced finance professionals</strong> and strategists who help you navigate key transactions, ERP implementations, and scale business operations globally.
      </>
    ),
    pills: [
      { text: "Support", highlight: "M&A" },
      { text: "ERP Advisory", prefix: "→ " },
      { text: "Treasury Strategy", prefix: "→ " },
      { text: "Board Reporting", prefix: "→ " },
    ]
  },
  {
    title: "Technology",
    badge: "SMART TECHNOLOGY & INTEGRATION",
    line1: "SMART PLUGINS,",
    line2: "AUTOMATED WORKFLOWS",
    line3: "ZERO DELAY.",
    desc: (
      <>
        Integrate cutting-edge AI, <strong className="font-semibold text-white">clean ledger automation</strong>, and modern tech stacks into your existing ERP systems. Make your financial data fast, accurate, and completely reliable.
      </>
    ),
    pills: [
      { text: "Integrations", highlight: "AI" },
      { text: "Ledger Automation", prefix: "→ " },
      { text: "ERP Workflows", prefix: "→ " },
      { text: "Data Pipelines", prefix: "→ " },
    ]
  }
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const paused = false;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const handleNextSlide = () => {
    setIndex((i) => (i + 1) % slides.length);
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(handleNextSlide, 10000);
    return () => clearInterval(id);
  }, [index, paused]);

  return (
    <section
      id="top"
      ref={ref}
      className="dark relative min-h-screen w-full overflow-hidden bg-transparent text-white flex flex-col justify-between"
    >
      {/* Background Decorators & Perspective Grid (matching product page aesthetics) */}
      <div className="absolute inset-0 z-[-10] pointer-events-none overflow-hidden bg-transparent">


        {/* 3D Perspective Grid */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[250px] opacity-25"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167, 139, 250, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167, 139, 250, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            transform: "perspective(800px) rotateX(75deg)",
            transformOrigin: "bottom",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(circle at center, transparent 0%, rgba(4, 6, 15, 0.2) 50%, rgba(4, 6, 15, 0.8) 100%)",
          }}
        />
      </div>



      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-36 pb-12 flex-1 flex flex-col justify-between pointer-events-none"
      >
        {/* Top Spacer / Nav height balance */}
        <div />

        {/* Main Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mt-auto mb-16 w-full">
          {/* Left Text & CTA Column - Sized to lg:col-span-7 for optimal home page hero alignment */}
          <div className="lg:col-span-7 flex flex-col items-start w-full relative z-10">
            {/* Logo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-950/10 backdrop-blur-md px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-400"
            >
              <span 
                className="h-4 w-4 bg-sky-400 shrink-0"
                style={{
                  maskImage: `url(${logoMark.src})`,
                  WebkitMaskImage: `url(${logoMark.src})`,
                  maskSize: "contain",
                  WebkitMaskSize: "contain",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                }}
              />
              SERVICES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 text-[clamp(2.2rem,5.2vw,4.8rem)] font-black tracking-tight leading-[0.95] text-foreground max-w-5xl select-none"
            >
              <span className="block text-white opacity-95">
                Eleven services
              </span>
              <span className="block py-2.5 px-1 bg-gradient-to-r from-sky-400 via-purple-500 to-sky-400 bg-clip-text text-transparent filter drop-shadow-[0_4px_20px_rgba(99,102,241,0.25)] animate-gradient-x">
                One subscription
              </span>
              <span className="block text-zinc-700 text-[clamp(1.1rem,2.5vw,2.2rem)] font-black tracking-tight mt-2">
                AI and humans on every engagement
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-2xl"
            >
              <p className="text-base md:text-lg text-white leading-relaxed font-light">
                Whether you need your books closed, controls remediated, an audit prepared, or a CFO role filled, you get the same hybrid model: AI agents handle the science, and senior practitioners handle the art. You get one bill.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-row items-center gap-4 pointer-events-auto whitespace-nowrap"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-sky-400 hover:text-black transition-all duration-300 shadow-lg shadow-white/5 hover:shadow-sky-400/20 active:scale-95"
              >
                Start your subscription
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 hover:border-white transition-all duration-300 active:scale-95"
              >
                Talk to a senior practitioner
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-8 inline-flex flex-nowrap items-center rounded-lg border border-white/15 bg-[#0b1020]/85 p-1.5 text-[13px] font-medium tracking-wide text-white whitespace-nowrap overflow-x-auto max-w-full no-scrollbar"
            >
              <span className="px-4 py-2 border-r border-white/15 last:border-r-0">
                99.7% reconciliation accuracy
              </span>
              <span className="px-4 py-2 border-r border-white/15 last:border-r-0">
                Senior CPAs on every engagement
              </span>
              <span className="px-4 py-2 last:border-r-0">
                Live across 10+ countries
              </span>
            </motion.div>
          </div>

          {/* Right Holographic Interactive Sphere Column */}
          <div className="lg:col-span-5 flex items-center justify-center w-full relative z-10">
            <InteractiveSphere categoryIndex={index} onClick={handleNextSlide} />
          </div>
        </div>

      </motion.div>
    </section>
  );
}
