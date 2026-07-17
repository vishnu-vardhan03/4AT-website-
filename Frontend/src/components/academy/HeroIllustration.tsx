"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { User, Briefcase, TrendingUp, BarChart3 } from "lucide-react";

export function HeroIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const isRevealed = true;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Mouse Parallax Motion Values (Framer Motion)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for smooth motion
  const springConfig = { stiffness: 70, damping: 20 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Map mouse positions to transform values
  const capX = useTransform(xSpring, [-400, 400], [-20, 20]);
  const capY = useTransform(ySpring, [-400, 400], [-20, 20]);

  // Floating cards have different parallax depths for a 3D effect
  const card1X = useTransform(xSpring, [-400, 400], [-35, 35]);
  const card1Y = useTransform(ySpring, [-400, 400], [-35, 35]);

  const card2X = useTransform(xSpring, [-400, 400], [-45, 45]);
  const card2Y = useTransform(ySpring, [-400, 400], [-45, 45]);

  const card3X = useTransform(xSpring, [-400, 400], [-30, 30]);
  const card3Y = useTransform(ySpring, [-400, 400], [-30, 30]);

  const card4X = useTransform(xSpring, [-400, 400], [-40, 40]);
  const card4Y = useTransform(ySpring, [-400, 400], [-40, 40]);

  // Ambient glows also shift slightly
  const glowX = useTransform(xSpring, [-400, 400], [-15, 15]);
  const glowY = useTransform(ySpring, [-400, 400], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] max-w-[600px] mx-auto flex items-center justify-center overflow-visible select-none cursor-default"
    >
      {/* Background Volumetric Glow behind Cap */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(168,109,255,0.25)_0%,transparent_70%)] filter blur-2xl pointer-events-none z-0"
      />

      {/* Ground Holographic Platform */}
      <div className="absolute bottom-[2%] sm:bottom-[5%] w-full h-[150px] pointer-events-none flex items-center justify-center overflow-visible z-10">
        <div className="absolute w-[500px] sm:w-[600px] h-[300px] top-[-50px] [perspective:500px] overflow-visible flex items-center justify-center">
          {/* Reflective Grid Plane */}
          <div
            className="absolute w-full h-full opacity-35"
            style={{
              transform: "rotateX(72deg)",
              backgroundImage: `
                linear-gradient(to right, rgba(83, 231, 255, 0.12) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(83, 231, 255, 0.12) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
              maskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
              WebkitMaskImage: "radial-gradient(ellipse at center, black 15%, transparent 75%)",
            }}
          />

          {/* Glowing Platform Base */}
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7 }}
            animate={isRevealed ? { opacity: 0.6, scale: 1 } : undefined}
            transition={{
              duration: prefersReducedMotion ? 0.3 : 0.8,
              delay: prefersReducedMotion ? 0 : 1.3,
              ease: "easeOut"
            }}
            className="absolute w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] flex items-center justify-center pointer-events-none"
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                transform: "rotateX(72deg)",
                background: "radial-gradient(circle, rgba(168, 109, 255, 0.18) 0%, transparent 65%)",
                border: "1.5px solid rgba(83, 231, 255, 0.25)",
                boxShadow: "0 0 60px rgba(168, 109, 255, 0.35), inset 0 0 40px rgba(83, 231, 255, 0.2)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Orbital Rings - Rotating continuously on Z axis, angled in 3D */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
        {/* Ring 1 - Purple/Cyan Mix */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            rotateX: 72,
            rotateY: 12,
          }}
          animate={{ rotateZ: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          <svg className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[420px] sm:max-h-[420px] lg:max-w-[500px] lg:max-h-[500px]" viewBox="0 0 500 500">
            <ellipse
              cx="250"
              cy="250"
              rx="210"
              ry="75"
              fill="none"
              stroke="rgba(120,90,255,0.4)"
              strokeWidth="1.2"
              className="drop-shadow-[0_0_8px_rgba(120,90,255,0.4)]"
            />
          </svg>
        </motion.div>

        {/* Ring 2 - Cyan Dominant */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            rotateX: 76,
            rotateY: -16,
          }}
          animate={{ rotateZ: -360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
        >
          <svg className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[420px] sm:max-h-[420px] lg:max-w-[500px] lg:max-h-[500px]" viewBox="0 0 500 500">
            <ellipse
              cx="250"
              cy="250"
              rx="235"
              ry="85"
              fill="none"
              stroke="rgba(90,220,255,0.3)"
              strokeWidth="1.2"
              className="drop-shadow-[0_0_8px_rgba(90,220,255,0.3)]"
            />
          </svg>
        </motion.div>

        {/* Ring 3 - Faint Purple */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            rotateX: 68,
            rotateY: 6,
          }}
          animate={{ rotateZ: 360 }}
          transition={{ repeat: Infinity, ease: "linear", duration: 45 }}
        >
          <svg className="w-full h-full max-w-[320px] max-h-[320px] sm:max-w-[420px] sm:max-h-[420px] lg:max-w-[500px] lg:max-h-[500px]" viewBox="0 0 500 500">
            <ellipse
              cx="250"
              cy="250"
              rx="185"
              ry="65"
              fill="none"
              stroke="rgba(168,109,255,0.25)"
              strokeWidth="1"
              className="drop-shadow-[0_0_6px_rgba(168,109,255,0.2)]"
            />
          </svg>
        </motion.div>
      </div>

      {/* Graduation Cap Asset with Slow Floating & Parallax */}
      <motion.div
        style={{ x: capX, y: capY }}
        className="relative z-20 flex items-center justify-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.85, y: prefersReducedMotion ? 0 : 30, filter: prefersReducedMotion ? "none" : "blur(10px)" }}
          animate={isRevealed ? { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 1.0,
            delay: prefersReducedMotion ? 0 : 0.6,
            ease: [0.16, 1, 0.3, 1] // ease-out-expo
          }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? {
              y: [0, -10, 0],
              rotateZ: [0, 0.6, -0.6, 0],
            } : {}}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.6
            }}
            className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] lg:w-[500px] lg:h-[500px] filter drop-shadow-[0_12px_45px_rgba(168,109,255,0.35)]"
          >
            <Image
              src="/GraduationCap.png"
              alt="Graduation Cap"
              fill
              priority
              sizes="(max-width: 640px) 340px, (max-width: 1024px) 440px, 500px"
              className="object-contain"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Glassmorphic Cards (Decorative Icons in 3D Orbits) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-35 overflow-visible">
        
        {/* Card 1 (Left): Profile Icon - Purple Glow */}
        <motion.div
          style={{ x: card1X, y: card1Y }}
          className="absolute top-[42%] left-[4%] sm:left-[8%] md:left-[10%] lg:left-[5%] z-30 hidden sm:flex"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7, y: prefersReducedMotion ? 0 : 20 }}
          animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.0,
            ease: [0.34, 1.56, 0.64, 1] // ease-out-back
          }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="group pointer-events-auto"
            style={{ perspective: "600px" }}
            onMouseMove={(e) => {
              if (prefersReducedMotion) return;
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
              const rx = -((e.clientY - cy) / (r.height / 2)) * 14;
              const ry = ((e.clientX - cx) / (r.width / 2)) * 14;
              const sx = ((e.clientX - r.left) / r.width) * 100;
              const sy = ((e.clientY - r.top) / r.height) * 100;
              el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              el.style.setProperty("--sx", `${sx}%`);
              el.style.setProperty("--sy", `${sy}%`);
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div
              className="card-inner flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-purple-400/40 group-hover:shadow-[0_0_25px_rgba(168,109,255,0.3)] transition-shadow duration-300 ease-out cursor-pointer relative overflow-hidden"
              style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(168,109,255,0.18) 0%, transparent 60%)" }} />
              <User className="w-6 h-6 text-[#A86DFF] filter drop-shadow-[0_0_8px_rgba(168,109,255,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Card 2 (Top-Right): Analytics Icon - Cyan Glow */}
        <motion.div
          style={{ x: card2X, y: card2Y }}
          className="absolute top-[12%] right-[22%] sm:right-[26%] md:right-[28%] lg:right-[25%] z-30 hidden sm:flex"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7, y: prefersReducedMotion ? 0 : 20 }}
          animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.12,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.62
            }}
            className="group pointer-events-auto"
            style={{ perspective: "600px" }}
            onMouseMove={(e) => {
              if (prefersReducedMotion) return;
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
              const rx = -((e.clientY - cy) / (r.height / 2)) * 14;
              const ry = ((e.clientX - cx) / (r.width / 2)) * 14;
              const sx = ((e.clientX - r.left) / r.width) * 100;
              const sy = ((e.clientY - r.top) / r.height) * 100;
              el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              el.style.setProperty("--sx", `${sx}%`);
              el.style.setProperty("--sy", `${sy}%`);
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div
              className="card-inner flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(83,231,255,0.3)] transition-shadow duration-300 ease-out cursor-pointer relative overflow-hidden"
              style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(83,231,255,0.18) 0%, transparent 60%)" }} />
              <TrendingUp className="w-6 h-6 text-[#53E7FF] filter drop-shadow-[0_0_8px_rgba(83,231,255,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Card 3 (Right): Briefcase Icon - Purple Glow */}
        <motion.div
          style={{ x: card3X, y: card3Y }}
          className="absolute top-[35%] right-[2%] sm:right-[6%] md:right-[8%] lg:right-[4%] z-30 hidden sm:flex"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7, y: prefersReducedMotion ? 0 : 20 }}
          animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.24,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.74
            }}
            className="group pointer-events-auto"
            style={{ perspective: "600px" }}
            onMouseMove={(e) => {
              if (prefersReducedMotion) return;
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
              const rx = -((e.clientY - cy) / (r.height / 2)) * 14;
              const ry = ((e.clientX - cx) / (r.width / 2)) * 14;
              const sx = ((e.clientX - r.left) / r.width) * 100;
              const sy = ((e.clientY - r.top) / r.height) * 100;
              el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              el.style.setProperty("--sx", `${sx}%`);
              el.style.setProperty("--sy", `${sy}%`);
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div
              className="card-inner flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-purple-400/40 group-hover:shadow-[0_0_25px_rgba(168,109,255,0.3)] transition-shadow duration-300 ease-out cursor-pointer relative overflow-hidden"
              style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(168,109,255,0.18) 0%, transparent 60%)" }} />
              <Briefcase className="w-6 h-6 text-[#A86DFF] filter drop-shadow-[0_0_8px_rgba(168,109,255,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
            </div>
          </motion.div>
        </motion.div>

        {/* Card 4 (Bottom-Right): Chart Icon - Cyan Glow */}
        <motion.div
          style={{ x: card4X, y: card4Y }}
          className="absolute bottom-[15%] right-[16%] sm:right-[20%] md:right-[22%] lg:right-[18%] z-30 hidden sm:flex"
          initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.7, y: prefersReducedMotion ? 0 : 20 }}
          animate={isRevealed ? { opacity: 1, scale: 1, y: 0 } : undefined}
          transition={{
            duration: prefersReducedMotion ? 0.3 : 0.5,
            delay: prefersReducedMotion ? 0 : 1.36,
            ease: [0.34, 1.56, 0.64, 1]
          }}
        >
          <motion.div
            animate={isRevealed && !prefersReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.86
            }}
            className="group pointer-events-auto"
            style={{ perspective: "600px" }}
            onMouseMove={(e) => {
              if (prefersReducedMotion) return;
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (!el) return;
              const r = el.getBoundingClientRect();
              const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
              const rx = -((e.clientY - cy) / (r.height / 2)) * 14;
              const ry = ((e.clientX - cx) / (r.width / 2)) * 14;
              const sx = ((e.clientX - r.left) / r.width) * 100;
              const sy = ((e.clientY - r.top) / r.height) * 100;
              el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              el.style.setProperty("--sx", `${sx}%`);
              el.style.setProperty("--sy", `${sy}%`);
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget.querySelector(".card-inner") as HTMLElement;
              if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
            }}
          >
            <div
              className="card-inner flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-[inset_0_1px_rgba(255,255,255,0.15),0_10px_30px_rgba(0,0,0,0.6)] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(83,231,255,0.3)] transition-shadow duration-300 ease-out cursor-pointer relative overflow-hidden"
              style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" style={{ background: "radial-gradient(circle at var(--sx, 50%) var(--sy, 50%), rgba(83,231,255,0.18) 0%, transparent 60%)" }} />
              <BarChart3 className="w-6 h-6 text-[#53E7FF] filter drop-shadow-[0_0_8px_rgba(83,231,255,0.6)] group-hover:scale-110 transition-transform duration-300 relative z-10" />
            </div>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
