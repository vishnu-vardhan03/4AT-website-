"use client";

import { motion } from "framer-motion";

interface SegmentDoodleProps {
  type: "cfo" | "firm" | "pe" | "ipo";
}

export function SegmentDoodle({ type }: SegmentDoodleProps) {
  const floatTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  const pulseTransition = {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  switch (type) {
    case "cfo": // CFOs and Controllers
      return (
        <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Main headquarters building outline */}
          <motion.rect
            x="30" y="32" width="40" height="48" rx="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          {/* Annex structure */}
          <motion.rect
            x="16" y="52" width="14" height="28" rx="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          {/* Windows inside building with corrected x/y coordinates */}
          <motion.rect x="37" y="40" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.15" animate={{ opacity: [0.2, 0.75, 0.2] }} transition={{ ...pulseTransition, delay: 0 }} />
          <motion.rect x="55" y="40" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.15" animate={{ opacity: [0.2, 0.75, 0.2] }} transition={{ ...pulseTransition, delay: 0.5 }} />
          <motion.rect x="37" y="54" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.15" animate={{ opacity: [0.2, 0.75, 0.2] }} transition={{ ...pulseTransition, delay: 1 }} />
          <motion.rect x="55" y="54" width="8" height="6" rx="1" fill="currentColor" fillOpacity="0.15" animate={{ opacity: [0.2, 0.75, 0.2] }} transition={{ ...pulseTransition, delay: 1.5 }} />

          {/* Floating digital dashboard nodes */}
          <motion.circle
            cx="76" cy="24" r="4.5" fill="currentColor"
            animate={{ y: [0, -6, 0] }}
            transition={floatTransition}
          />
          {/* Floating node link line */}
          <motion.path
            d="M 50 32 L 76 24"
            strokeDasharray="4 4"
            className="opacity-40"
            animate={{ strokeDashoffset: [0, 8] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      );

    case "firm": // Accounting firm owners
      return (
        <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Left Cuff */}
          <motion.path
            d="M 16 34 L 16 66 L 24 66 L 24 34 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Right Cuff */}
          <motion.path
            d="M 84 34 L 84 66 L 76 66 L 76 34 Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          {/* Left Hand clasping */}
          <motion.path
            d="M 24 42 C 34 42, 38 34, 48 42 L 52 46 C 55 49, 58 49, 61 46 C 63 44, 66 44, 68 47 L 76 56"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.2 }}
          />
          {/* Right Hand clasping */}
          <motion.path
            d="M 76 46 C 66 46, 62 54, 52 46 L 48 42 C 45 39, 42 39, 39 42 L 24 54"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, delay: 0.4 }}
          />
          {/* Central trust/handshake pulse node */}
          <motion.circle
            cx="50" cy="44" r="5" fill="currentColor" fillOpacity="0.2"
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
            transition={pulseTransition}
          />
        </svg>
      );

    case "pe": // PE-backed portfolio companies
      return (
        <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* Baseline */}
          <line x1="15" y1="80" x2="85" y2="80" className="opacity-30" />
          
          {/* Multiple rising trend bars aligned properly to baseline */}
          <motion.rect
            x="24" y="55" width="10" height="25" rx="2" fill="currentColor" fillOpacity="0.05"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8 }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.rect
            x="44" y="40" width="10" height="40" rx="2" fill="currentColor" fillOpacity="0.1"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: "bottom" }}
          />
          <motion.rect
            x="64" y="22" width="10" height="58" rx="2" fill="currentColor" fillOpacity="0.15"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ transformOrigin: "bottom" }}
          />

          {/* Upward trend path linking the bars exactly at their centers */}
          <motion.path
            d="M 29 55 L 49 40 L 69 22 L 85 14"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
          {/* Pulsating target point on the GP standard */}
          <motion.circle
            cx="85" cy="14" r="4.5" fill="currentColor"
            animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </svg>
      );

    case "ipo": // Pre-IPO finance teams
      return (
        <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {/* S-1 Horizon line */}
          <line x1="15" y1="78" x2="85" y2="78" className="opacity-30" strokeDasharray="3 3" />

          {/* Rising/orbiting rocket */}
          <motion.g
            animate={{ y: [0, -6, 0], rotate: [0, 4, 0] }}
            transition={floatTransition}
            style={{ transformOrigin: "50px 42px" }}
          >
            {/* Rocket fuselage */}
            <path d="M 50 14 C 55 24, 58 38, 58 52 H 42 C 42 38, 45 24, 50 14 Z" fill="currentColor" fillOpacity="0.1" />
            {/* Fins */}
            <path d="M 42 42 L 32 55 H 42 Z" />
            <path d="M 58 42 L 68 55 H 58 Z" />
            {/* Engine nozzle */}
            <path d="M 47 52 H 53 L 52 55 H 48 Z" />
            {/* Porthole */}
            <circle cx="50" cy="32" r="3.5" fill="currentColor" fillOpacity="0.2" />
            
            {/* Rocket exhaust flame */}
            <motion.path
              d="M 46 56 L 50 70 L 54 56 Z"
              fill="currentColor"
              animate={{ scaleY: [1, 1.4, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              style={{ transformOrigin: "50px 56px" }}
            />
          </motion.g>

          {/* Star particles */}
          <motion.circle cx="24" cy="28" r="1.5" fill="currentColor" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} />
          <motion.circle cx="76" cy="36" r="2" fill="currentColor" animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
        </svg>
      );

    default:
      return null;
  }
}
