"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { badgeCopy, partnerLogos } from "@/components/academy/data";
import Image from "next/image";
import { HeroIllustration } from "@/components/academy/HeroIllustration";
import { motion } from "framer-motion";

export function Hero({ children }: { children?: React.ReactNode }) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroMarqueeRef = useRef<HTMLDivElement>(null);
  const heroMarqueeTl = useRef<gsap.core.Tween | null>(null);
  const heroMarqueeTargetScale = useRef(1);
  const heroMarqueeCurrent = useRef(1);
  const heroMarqueeRaf = useRef<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isRevealed = true;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // GSAP-driven hero marquee with velocity-linked timeScale
  useEffect(() => {
    const track = heroMarqueeRef.current;
    if (!track) return;
    const halfWidth = track.scrollWidth / 2;
    heroMarqueeTl.current = gsap.to(track, {
      x: `-=${halfWidth}`,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((v: string | number) => parseFloat(String(v)) % halfWidth, "px"),
      },
    });
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const onVelocity = (e: Event) => {
      const vel = Math.abs((e as CustomEvent<{ velocity: number }>).detail?.velocity ?? 0);
      heroMarqueeTargetScale.current = 1 + Math.min(vel * 0.22, 3);
    };
    window.addEventListener("lenis-velocity", onVelocity);
    const tick = () => {
      heroMarqueeCurrent.current = lerp(heroMarqueeCurrent.current, heroMarqueeTargetScale.current, 0.07);
      heroMarqueeTargetScale.current = lerp(heroMarqueeTargetScale.current, 1, 0.04);
      heroMarqueeTl.current?.timeScale(heroMarqueeCurrent.current);
      heroMarqueeRaf.current = requestAnimationFrame(tick);
    };
    heroMarqueeRaf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("lenis-velocity", onVelocity);
      cancelAnimationFrame(heroMarqueeRaf.current);
      heroMarqueeTl.current?.kill();
    };
  }, []);

  const [, setNavState] = useState({
    navVisible: true,
    isPastHero: false,
    isAtTop: true,
  });

  const lastScrollRef = useRef(0);
  const navVisibleRef = useRef(true);
  const tickingRef = useRef(false);

  useEffect(() => {
    const updateNavState = () => {
      const currentScroll = window.scrollY;
      const heroHeight = window.innerHeight * 0.9;
      const nextIsPastHero = currentScroll > heroHeight;

      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (currentScroll / totalHeight) * 100 : 0;
      const scrollProgressBar = document.getElementById("scroll-progress");
      if (scrollProgressBar) {
        scrollProgressBar.style.width = `${progress}%`;
      }

      const scrollDiff = currentScroll - lastScrollRef.current;
      let nextNavVisible = navVisibleRef.current;

      if (currentScroll <= 100) {
        nextNavVisible = true;
      } else if (scrollDiff < -15) {
        nextNavVisible = true;
      } else if (scrollDiff > 15) {
        nextNavVisible = false;
      }

      navVisibleRef.current = nextNavVisible;
      const nextIsAtTop = currentScroll === 0;

      setNavState((prev) => {
        if (
          prev.navVisible === nextNavVisible &&
          prev.isPastHero === nextIsPastHero &&
          prev.isAtTop === nextIsAtTop
        ) {
          return prev;
        }
        return {
          navVisible: nextNavVisible,
          isPastHero: nextIsPastHero,
          isAtTop: nextIsAtTop,
        };
      });

      lastScrollRef.current = currentScroll;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(updateNavState);
    };

    // Canvas background faint particles drift loop
    const canvas = canvasRef.current;
    let animationFrameId: number;
    let resizeCanvas: () => void;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        let particles: Array<{
          x: number;
          y: number;
          initialY: number;
          size: number;
          speed: number;
          opacity: number;
          amplitude: number;
          angle: number;
          color: string;
        }> = [];

        resizeCanvas = () => {
          if (canvas) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
          }
        };

        const initParticles = () => {
          particles = [];
          const particleCount = Math.min(60, Math.floor((canvas.width * canvas.height) / 18000));
          for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const isTeal = Math.random() < 0.5;
            const rgb = isTeal ? "83, 231, 255" : "168, 109, 255";
            particles.push({
              x,
              y,
              initialY: y,
              size: Math.random() * 1.5 + 0.5,
              speed: 0.005 + Math.random() * 0.01,
              opacity: 0.1 + Math.random() * 0.25,
              amplitude: 10 + Math.random() * 15,
              angle: Math.random() * Math.PI * 2,
              color: rgb,
            });
          }
        };

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            p.angle += p.speed;
            p.y = p.initialY + Math.sin(p.angle) * p.amplitude;
            ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          });
          animationFrameId = requestAnimationFrame(draw);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        draw();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (resizeCanvas) {
        window.removeEventListener("resize", resizeCanvas);
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="site-shell relative w-full overflow-x-hidden bg-transparent min-h-[100dvh] flex flex-col justify-between"
    >
      {/* Deep-Space Background Layers */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : undefined}
        transition={{ duration: 1.5, delay: 0 }}
        className="absolute inset-0 bg-transparent z-0 overflow-hidden pointer-events-none"
      >
        {/* Subtle Star Field Layer */}
        <div
          className="absolute inset-0 opacity-[0.25] mix-blend-screen"
          style={{
            backgroundImage:
              "radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 150px 80px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 280px 220px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 450px 140px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 600px 310px, #fff, rgba(0,0,0,0)), radial-gradient(2.5px 2.5px at 800px 120px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 1000px 420px, #fff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 1200px 180px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 1400px 290px, #fff, rgba(0,0,0,0))",
            backgroundSize: "350px 350px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Twinkling Stars Overlay */}
        <div
          className="absolute inset-0 opacity-[0.15] animate-[pulse_4s_infinite]"
          style={{
            backgroundImage:
              "radial-gradient(1.5px 1.5px at 80px 120px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 380px 40px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 520px 180px, #fff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 730px 280px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 950px 90px, #fff, rgba(0,0,0,0)), radial-gradient(1px 1px at 1150px 340px, #fff, rgba(0,0,0,0))",
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
          }}
        />

        {/* Soft Purple Nebula */}
        <div className="absolute top-0 right-0 w-[65%] h-[65%] rounded-full bg-[radial-gradient(circle_at_80%_20%,rgba(168,109,255,0.14),transparent_65%)] filter blur-[120px]" />

        {/* Blue Ambient Glow */}
        <div className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-full bg-[radial-gradient(circle_at_20%_80%,rgba(83,231,255,0.08),transparent_60%)] filter blur-[100px]" />

        {/* Dark Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0a0a0a_95%)]" />

        {/* Dynamic Canvas Particles */}
        {!prefersReducedMotion && (
          <motion.canvas
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 0.35 } : undefined}
            transition={{ duration: 1.5, delay: 0 }}
            ref={canvasRef}
            className="absolute inset-0 w-full h-full mix-blend-screen"
          />
        )}
      </motion.div>

      {/* Desktop Left Sidebar Page Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isRevealed ? { opacity: 1 } : undefined}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
        className="absolute left-8 bottom-[18%] hidden xl:flex flex-col items-center gap-4 z-40 select-none pointer-events-none"
      >
        {/* Active Dot and 01 */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={isRevealed ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="flex items-center gap-2 text-xs font-bold text-white tracking-widest font-sans"
        >
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>01</span>
        </motion.div>

        {/* Divider Dots */}
        <div className="flex flex-col gap-2 opacity-30 py-2">
          <motion.div initial={{ opacity: 0 }} animate={isRevealed ? { opacity: 1 } : undefined} transition={{ delay: 1.0 }} className="w-1.5 h-1.5 rounded-full bg-white" />
          <motion.div initial={{ opacity: 0 }} animate={isRevealed ? { opacity: 1 } : undefined} transition={{ delay: 1.08 }} className="w-1.5 h-1.5 rounded-full bg-white" />
          <motion.div initial={{ opacity: 0 }} animate={isRevealed ? { opacity: 1 } : undefined} transition={{ delay: 1.16 }} className="w-1.5 h-1.5 rounded-full bg-white" />
          <motion.div initial={{ opacity: 0 }} animate={isRevealed ? { opacity: 1 } : undefined} transition={{ delay: 1.24 }} className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>

        {/* Vertical Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : undefined}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? {
              y: [0, 4, 0]
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6
            }}
            className="text-[10px] font-bold tracking-[0.25em] text-[#A7A9C4]/40 uppercase my-4 whitespace-nowrap"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
            }}
          >
            Scroll to explore
          </motion.div>
        </motion.div>

        {/* Long Vertical Line with pulsing dot */}
        <div className="w-[1px] h-32 bg-gradient-to-b from-white/20 via-white/10 to-transparent relative">
          <div className="absolute bottom-0 -left-1 w-2.5 h-2.5 rounded-full bg-[#A86DFF] shadow-[0_0_10px_#A86DFF] animate-pulse" />
        </div>
      </motion.div>

      {/* Hero Section Grid Area */}
      <div className="site-shell px-6 md:px-12 lg:px-20 relative z-10 flex-1 flex items-center justify-center pt-[110px] pb-[150px] lg:pt-[96px] lg:pb-[96px]">
        <div className="grid grid-cols-1 lg:grid-cols-[46%_54%] items-center gap-12 lg:gap-[64px] w-full">
          
          {/* Left Column: Children (HeroContent) */}
          <div className="w-full flex items-center justify-start z-20">
            {children}
          </div>

          {/* Right Column: HeroIllustration */}
          <div className="w-full flex items-center justify-center z-10 overflow-visible">
            <HeroIllustration />
          </div>

        </div>
      </div>

      {/* Glassmorphic Partner Logo Marquee */}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 16 }}
        animate={isRevealed ? { opacity: 1, y: 0 } : undefined}
        transition={{
          duration: 0.6,
          delay: 1.8,
          ease: [0.25, 1, 0.5, 1] // ease-out-quart
        }}
        className="absolute bottom-0 left-0 right-0 z-10 overflow-hidden bg-white/[0.02] backdrop-blur-lg border-t border-white/10 w-full"
      >
        <div className="flex flex-col md:flex-row items-center">
          
          {/* Left static label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isRevealed ? { opacity: 1 } : undefined}
            transition={{ duration: 0.5, delay: 1.9 }}
            className="z-10 flex items-center justify-center bg-transparent px-8 py-5 border-b md:border-b-0 md:border-r border-white/10 w-full md:w-auto md:min-w-[280px] backdrop-blur-xl"
          >
            <p className="text-center md:text-left text-xs font-semibold uppercase tracking-wider text-white/60 max-w-[220px]">
              {badgeCopy}
            </p>
          </motion.div>

          {/* Scrolling track */}
          <div
            className="overflow-hidden px-6 py-6 flex-1 w-full relative"
            style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
          >
            <div
              ref={heroMarqueeRef}
              className="flex min-w-max items-center gap-12 pr-12 will-change-transform"
              style={{ transform: "translateX(0px)" }}
            >
              {[...partnerLogos, ...partnerLogos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="relative h-7 w-20 shrink-0 opacity-100 grayscale invert brightness-200 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="96px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>


    </section>
  );
}
