"use client";

import { motion } from "framer-motion";

interface BlueprintProps {
  serviceId: string;
}

export function ServiceBlueprintDoodle({ serviceId }: BlueprintProps) {
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

  const rotateTransition = (duration: number) => ({
    duration,
    repeat: Infinity,
    ease: "linear" as const,
  });

  const getBlueprintContent = () => {
    switch (serviceId) {
      case "01": // Accounting Process Outsourcing (Ledger, calculator, files)
        return (
          <>
            {/* Left Flow Ledger Card */}
            <rect x="20" y="30" width="65" height="40" rx="6" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <line x1="30" y1="42" x2="75" y2="42" className="stroke-sky-400/40" strokeWidth="1" />
            <line x1="30" y1="50" x2="60" y2="50" className="stroke-sky-400/40" strokeWidth="1" />
            <line x1="30" y1="58" x2="70" y2="58" className="stroke-sky-400/40" strokeWidth="1" />
            
            {/* Pulsating Dollar sign coin */}
            <motion.circle
              cx="65" cy="54" r="8"
              className="stroke-sky-400 fill-sky-400/10"
              strokeWidth="1.2"
              animate={{ scale: [1, 1.15, 1], fillOpacity: [0.1, 0.25, 0.1] }}
              transition={pulseTransition}
            />
            <text x="65" y="57" className="fill-sky-400 text-[8px] font-mono text-center font-bold" textAnchor="middle">$</text>

            {/* Connecting lines */}
            <path d="M 85 50 H 135 V 90 H 175" className="stroke-sky-400/60" strokeWidth="1.5" fill="none" />

            {/* Calculator/Register Graphic (Middle) */}
            <rect x="175" y="40" width="55" height="70" rx="4" className="stroke-purple-500/60 fill-[#0b1020]/40" strokeWidth="1.5" />
            <rect x="183" y="48" width="39" height="15" rx="2" className="stroke-purple-400 fill-[#0b1020]" />
            <text x="202" y="58" className="fill-purple-400 text-[8px] font-mono text-center" textAnchor="middle">45,290.00</text>
            {/* Grid of keys with slight hover scale simulator */}
            <rect x="185" y="70" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="197" y="70" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="209" y="70" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="185" y="82" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="197" y="82" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="209" y="82" width="8" height="8" rx="1" className="stroke-purple-400/40 fill-none" />
            <rect x="185" y="94" width="20" height="8" rx="1" className="stroke-purple-500 fill-purple-500/20" />

            {/* Receipts / Document stack (Right) */}
            <g transform="translate(290, 40)">
              {/* Back document (Static) */}
              <rect x="0" y="0" width="40" height="50" rx="3" className="stroke-sky-400/60 fill-none" strokeWidth="1.5" />
              <line x1="8" y1="12" x2="32" y2="12" className="stroke-sky-400/40" />
              <line x1="8" y1="20" x2="24" y2="20" className="stroke-sky-400/40" />
              <line x1="8" y1="28" x2="32" y2="28" className="stroke-sky-400/40" />
            </g>
            {/* Front sliding document (Animated) */}
            <g transform="translate(305, 55)">
              <motion.rect
                x="0" y="0" width="40" height="50" rx="3"
                className="stroke-purple-400/60 fill-[#05081c]"
                strokeWidth="1.5"
                animate={{ y: [0, -6, 0] }}
                transition={floatTransition}
              />
              <line x1="8" y1="12" x2="32" y2="12" className="stroke-purple-400/40" />
              <line x1="8" y1="20" x2="24" y2="20" className="stroke-purple-400/40" />
              <line x1="8" y1="28" x2="32" y2="28" className="stroke-purple-400/40" />
              
              {/* Pulsating checked indicator */}
              <motion.circle
                cx="28" cy="38" r="5"
                className="stroke-emerald-400 fill-emerald-400/20"
                strokeWidth="1"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={pulseTransition}
              />
              <path d="M 26 38 L 28 40 L 30 36" className="stroke-emerald-400" strokeWidth="1" fill="none" />
            </g>
          </>
        );

      case "02": // Virtual CFO Services (Growth charts, gauges, forecasting)
        return (
          <>
            {/* Left Gauge */}
            <circle cx="50" cy="70" r="28" className="stroke-sky-500/20 fill-[#0b1020]/20" strokeWidth="3" />
            <motion.path
              d="M 28 85 A 28 28 0 1 1 72 85"
              className="stroke-sky-400"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 0.75 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            {/* Animated Gauge Needle */}
            <motion.line
              x1="50" y1="70" x2="62" y2="52"
              className="stroke-purple-400"
              strokeWidth="2.5"
              strokeLinecap="round"
              animate={{ rotate: [-10, 15, -5, 20, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "50px 70px" }}
            />
            <circle cx="50" cy="70" r="4.5" className="fill-purple-400" />
            <text x="50" y="112" className="fill-zinc-400 text-[8px] font-mono" textAnchor="middle">ARR RUNRATE</text>

            <path d="M 78 70 H 155" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Strategic growth forecast line */}
            <rect x="155" y="35" width="100" height="65" rx="6" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <path d="M 165 85 H 245 M 165 45 V 85" className="stroke-purple-400/20" />
            {/* Target line */}
            <path d="M 165 75 L 185 62 L 205 68 L 225 50 L 245 42" className="stroke-purple-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            
            {/* Pulsating Target Core */}
            <motion.circle
              cx="245" cy="42" r="4"
              className="fill-emerald-400"
              animate={{ scale: [1, 1.3, 1] }}
              transition={pulseTransition}
            />

            {/* CFO forecasting card (Right) */}
            <rect x="290" y="35" width="85" height="70" rx="4" className="stroke-sky-400/60 fill-[#0b1020]/30" strokeWidth="1.2" />
            <text x="332" y="49" className="fill-sky-300 text-[7px] font-mono" textAnchor="middle">FORECAST MODELS</text>
            <rect x="300" y="60" width="65" height="8" rx="1.5" className="stroke-white/10 fill-white/[0.03]" />
            <rect x="300" y="74" width="65" height="8" rx="1.5" className="stroke-white/10 fill-white/[0.03]" />
            <rect x="300" y="88" width="65" height="8" rx="1.5" className="stroke-white/10 fill-white/[0.03]" />
            {/* Fill percentages */}
            <rect x="300" y="60" width="45" height="8" rx="1.5" className="fill-sky-400/60" />
            <rect x="300" y="74" width="30" height="8" rx="1.5" className="fill-purple-400/60" />
            <rect x="300" y="88" width="55" height="8" rx="1.5" className="fill-emerald-400/60" />
          </>
        );

      case "03": // Interim Resource Alignment (Team grid, profile silhouettes, schedules)
        return (
          <>
            {/* Profile Grid (Left) */}
            <rect x="20" y="30" width="45" height="35" rx="4" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <circle cx="42.5" cy="42" r="5" className="stroke-sky-400" strokeWidth="1" fill="none" />
            <path d="M 32.5 58 C 32.5 50, 52.5 50, 52.5 58" className="stroke-sky-400" strokeWidth="1" fill="none" />

            <rect x="20" y="75" width="45" height="35" rx="4" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <circle cx="42.5" cy="87" r="5" className="stroke-sky-400" strokeWidth="1" fill="none" />
            <path d="M 32.5 103 C 32.5 95, 52.5 95, 52.5 103" className="stroke-sky-400" strokeWidth="1" fill="none" />

            {/* Connecting lines - Aligned to end at 125 */}
            <path d="M 65 47 H 125" className="stroke-sky-400/60" strokeWidth="1.5" />
            <path d="M 65 92 H 125" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Schedule/Grid Planner (Middle) */}
            <rect x="125" y="30" width="110" height="80" rx="6" className="stroke-purple-500/60 fill-[#0b1020]/40" strokeWidth="1.5" />
            {/* Days grid */}
            <line x1="125" y1="50" x2="235" y2="50" className="stroke-purple-500/20" />
            <line x1="125" y1="70" x2="235" y2="70" className="stroke-purple-500/20" />
            <line x1="125" y1="90" x2="235" y2="90" className="stroke-purple-500/20" />
            <line x1="161.6" y1="30" x2="161.6" y2="110" className="stroke-purple-500/20" />
            <line x1="198.3" y1="30" x2="198.3" y2="110" className="stroke-purple-500/20" />
            
            {/* Active booking markers with pulsating opacity */}
            <motion.rect x="130" y="35" width="26" height="10" rx="1.5" className="fill-sky-400/80" animate={{ fillOpacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
            <motion.rect x="166" y="55" width="26" height="10" rx="1.5" className="fill-purple-400/80" animate={{ fillOpacity: [0.5, 0.9, 0.5] }} transition={{ duration: 2.2, repeat: Infinity }} />
            <motion.rect x="202" y="75" width="26" height="10" rx="1.5" className="fill-emerald-400/80" animate={{ fillOpacity: [0.5, 0.9, 0.5] }} transition={{ duration: 1.8, repeat: Infinity }} />

            {/* Clock/Rotation gear representing alignment speed (Right) */}
            <g transform="translate(290, 45)">
              <circle cx="25" cy="25" r="22" className="stroke-sky-400/40" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="25" cy="25" r="14" className="stroke-sky-400/60" strokeWidth="1.5" />
              <motion.line
                x1="25" y1="25" x2="25" y2="15"
                className="stroke-sky-400"
                strokeWidth="2"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={rotateTransition(8)}
                style={{ transformOrigin: "25px 25px" }}
              />
              <motion.line
                x1="25" y1="25" x2="33" y2="25"
                className="stroke-sky-400"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={rotateTransition(96)}
                style={{ transformOrigin: "25px 25px" }}
              />
            </g>
          </>
        );

      case "04": // Internal Controls & SOX Compliance (Vault door, shield, locks)
        return (
          <>
            {/* Big Vault Door Lock (Left) */}
            <circle cx="60" cy="70" r="30" className="stroke-purple-500/40 fill-[#0b1020]/40" strokeWidth="2.5" />
            <circle cx="60" cy="70" r="20" className="stroke-purple-400/60 fill-none" strokeWidth="1.5" />
            <circle cx="60" cy="70" r="10" className="stroke-purple-400 fill-[#0b1020]" strokeWidth="2" />
            {/* Spokes on Vault Dial (Animated Rotation) */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={rotateTransition(20)}
              style={{ transformOrigin: "60px 70px" }}
            >
              <line x1="60" y1="40" x2="60" y2="100" className="stroke-purple-400/60" strokeWidth="1.5" />
              <line x1="30" y1="70" x2="90" y2="70" className="stroke-purple-400/60" strokeWidth="1.5" />
              <line x1="39" y1="49" x2="81" y2="91" className="stroke-purple-400/30" strokeWidth="1" />
              <line x1="39" y1="91" x2="81" y2="49" className="stroke-purple-400/30" strokeWidth="1" />
            </motion.g>

            {/* Connecting systems path */}
            <path d="M 90 70 H 180" className="stroke-purple-400/60" strokeWidth="1.5" />

            {/* Checkmark Security Monitor (Middle) */}
            <rect x="180" y="35" width="85" height="65" rx="6" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <rect x="190" y="43" width="65" height="32" rx="3" className="stroke-sky-400/30 fill-none" />
            {/* Glowing checkmark inside monitor screen */}
            <motion.path
              d="M 213 58 L 221 66 L 235 50"
              className="stroke-sky-400"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={pulseTransition}
            />
            <text x="222" y="90" className="fill-zinc-400 text-[7px] font-mono" textAnchor="middle">ICFR COMPLIANT</text>

            {/* Padlock (Right) */}
            <g transform="translate(305, 45)">
              <rect x="0" y="16" width="30" height="24" rx="3" className="stroke-purple-400 fill-purple-400/10" strokeWidth="1.5" />
              <path d="M 6 16 V 10 A 9 9 0 0 1 24 10 V 16" className="stroke-purple-400" strokeWidth="1.5" fill="none" />
              <circle cx="15" cy="26" r="3" className="fill-purple-400" />
              <line x1="15" y1="29" x2="15" y2="34" className="stroke-purple-400" strokeWidth="1.5" />
            </g>
          </>
        );

      case "05": // Technical Accounting (Geometric formula layouts, balances)
        return (
          <>
            {/* Hexagon Formula Cluster with rotation (Left) */}
            <motion.g
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={floatTransition}
              style={{ transformOrigin: "50px 60px" }}
            >
              <polygon points="50,30 75,45 75,75 50,90 25,75 25,45" className="stroke-sky-500/40 fill-[#0b1020]/40" strokeWidth="1.5" />
              <polygon points="50,40 68,50 68,70 50,80 32,70 32,50" className="stroke-sky-400/20 fill-none" strokeWidth="1" />
              <circle cx="50" cy="60" r="4" className="fill-sky-400" />
              <line x1="50" y1="30" x2="50" y2="60" className="stroke-sky-400/60" />
              <line x1="75" y1="45" x2="50" y2="60" className="stroke-sky-400/60" />
              <line x1="25" y1="75" x2="50" y2="60" className="stroke-sky-400/60" />
            </motion.g>

            {/* Aligned to hexagon edge 75 to middle box 155 */}
            <path d="M 75 60 H 155" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Technical Rule Book / Accounting Memo blueprint (Middle) */}
            <rect x="155" y="30" width="85" height="80" rx="4" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <rect x="165" y="40" width="65" height="15" rx="1.5" className="stroke-purple-400/30 fill-purple-400/5" />
            <text x="197" y="50" className="fill-purple-400 text-[8px] font-mono" textAnchor="middle">MEMO WORK</text>
            <line x1="165" y1="65" x2="230" y2="65" className="stroke-white/10" />
            <line x1="165" y1="75" x2="220" y2="75" className="stroke-white/10" />
            <line x1="165" y1="85" x2="230" y2="85" className="stroke-white/10" />
            <line x1="165" y1="95" x2="195" y2="95" className="stroke-white/10" />

            {/* Scales of GAAP / IFRS Compliance (Right - Animated balance tilting) */}
            <g transform="translate(285, 45)">
              <motion.g
                animate={{ rotate: [-2, 2, -2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: "25px 18px" }}
              >
                <line x1="25" y1="10" x2="25" y2="55" className="stroke-sky-400" strokeWidth="2" />
                <line x1="5" y1="55" x2="45" y2="55" className="stroke-sky-400" strokeWidth="2.5" />
                {/* Scale beam */}
                <line x1="5" y1="18" x2="45" y2="18" className="stroke-sky-400" strokeWidth="2" />
                {/* Left hanging scale */}
                <line x1="5" y1="18" x2="0" y2="38" className="stroke-sky-400/40" />
                <line x1="5" y1="18" x2="10" y2="38" className="stroke-sky-400/40" />
                <path d="M -3 38 H 13" className="stroke-sky-400" strokeWidth="1.5" />
                {/* Right hanging scale */}
                <line x1="45" y1="18" x2="40" y2="38" className="stroke-sky-400/40" />
                <line x1="45" y1="18" x2="50" y2="38" className="stroke-sky-400/40" />
                <path d="M 37 38 H 53" className="stroke-sky-400" strokeWidth="1.5" />
              </motion.g>
            </g>
          </>
        );

      case "06": // Audit Outsourcing (stacked papers, scanner lens, partner nodes)
        return (
          <>
            {/* Document Stack (Left) */}
            <g transform="translate(25, 40)">
              <rect x="0" y="0" width="38" height="48" rx="2" className="stroke-purple-500/40 fill-none" strokeWidth="1.5" />
              <line x1="8" y1="10" x2="30" y2="10" className="stroke-purple-500/20" />
              <line x1="8" y1="18" x2="30" y2="18" className="stroke-purple-500/20" />
            </g>
            <g transform="translate(35, 52)">
              <rect x="0" y="0" width="38" height="48" rx="2" className="stroke-purple-500/60 fill-[#0b1020]" strokeWidth="1.5" />
              <line x1="8" y1="10" x2="30" y2="10" className="stroke-purple-400/40" />
              <line x1="8" y1="18" x2="30" y2="18" className="stroke-purple-400/40" />
              <line x1="8" y1="26" x2="22" y2="26" className="stroke-purple-400/40" />
              <line x1="8" y1="34" x2="26" y2="34" className="stroke-purple-400/40" />
            </g>

            {/* Aligned to papers edge 73 to middle box 155 */}
            <path d="M 73 70 H 155" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Magnifying scan interface (Middle - Animated Lens float) */}
            <rect x="155" y="30" width="90" height="80" rx="6" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            {/* Grid structure inside scope */}
            <line x1="165" y1="50" x2="235" y2="50" className="stroke-sky-400/10" />
            <line x1="165" y1="70" x2="235" y2="70" className="stroke-sky-400/10" />
            <line x1="165" y1="90" x2="235" y2="90" className="stroke-sky-400/10" />
            
            <motion.g
              animate={{ x: [0, 4, -4, 0], y: [0, -3, 3, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "200px 70px" }}
            >
              <circle cx="200" cy="70" r="18" className="stroke-sky-400 fill-sky-400/10" strokeWidth="1.5" />
              <line x1="212" y1="82" x2="228" y2="98" className="stroke-sky-400" strokeWidth="2.5" strokeLinecap="round" />
            </motion.g>

            {/* Partner alignment node bridges (Right) */}
            <g transform="translate(285, 45)">
              <circle cx="20" cy="20" r="8" className="stroke-purple-400 fill-none" strokeWidth="1.5" />
              <circle cx="20" cy="20" r="3" className="fill-purple-400" />
              <circle cx="55" cy="20" r="8" className="stroke-sky-400 fill-none" strokeWidth="1.5" />
              <circle cx="55" cy="20" r="3" className="fill-sky-400" />
              {/* Flow arrows */}
              <path d="M 30 16 H 45" className="stroke-sky-400" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M 45 24 H 30" className="stroke-purple-400" strokeWidth="1.2" strokeLinecap="round" />
            </g>
          </>
        );

      case "07": // Financial Audit Readiness (PBC portal, folder, checklists)
        return (
          <>
            {/* PBC portal tray (Left) */}
            <rect x="20" y="30" width="70" height="40" rx="4" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <text x="55" y="44" className="fill-sky-400 text-[8px] font-mono text-center" textAnchor="middle">PBC PORTAL</text>
            <rect x="30" y="52" width="50" height="8" rx="1.5" className="stroke-sky-400/30 fill-sky-400/10" />
            <circle cx="72" cy="56" r="2.5" className="fill-emerald-400" />

            {/* Aligned to portal edge 90 to middle box 155 */}
            <path d="M 90 50 H 155" className="stroke-purple-400/60" strokeWidth="1.5" />

            {/* Audit Ready Folder (Middle) */}
            <rect x="155" y="30" width="95" height="80" rx="6" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <path d="M 165 48 H 240 M 165 60 H 240 M 165 72 H 240" className="stroke-purple-500/20" />
            
            {/* Falling document blueprint inside folder (Animated) */}
            <motion.rect
              x="185" y="42" width="35" height="46" rx="2"
              className="stroke-sky-400 fill-[#0b1020]"
              strokeWidth="1.5"
              animate={{ y: [0, 8, 0] }}
              transition={floatTransition}
            />
            <line x1="192" y1="52" x2="213" y2="52" className="stroke-sky-400/40" />
            <line x1="192" y1="60" x2="208" y2="60" className="stroke-sky-400/40" />
            <line x1="192" y1="68" x2="213" y2="68" className="stroke-sky-400/40" />

            {/* Checklist with checkboxes (Right) */}
            <g transform="translate(290, 45)">
              <rect x="0" y="0" width="12" height="12" rx="2" className="stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" />
              <path d="M 2 6 L 5 9 L 10 3" className="stroke-emerald-400" strokeWidth="1.5" fill="none" />
              <line x1="22" y1="6" x2="80" y2="6" className="stroke-zinc-500" strokeWidth="2" />

              <rect x="0" y="22" width="12" height="12" rx="2" className="stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" />
              <path d="M 2 28 L 5 31 L 10 25" className="stroke-emerald-400" strokeWidth="1.5" fill="none" />
              <line x1="22" y1="28" x2="70" y2="28" className="stroke-zinc-500" strokeWidth="2" />
            </g>
          </>
        );

      case "08": // IPO Readiness (Rocket launcher, ascending bars, listing sequences)
        return (
          <>
            {/* Launchpad baseline */}
            <line x1="20" y1="100" x2="160" y2="100" className="stroke-purple-500/40" strokeWidth="2" />
            
            {/* Rocket frame */}
            <g transform="translate(45, 20)">
              {/* Rocket Body */}
              <path d="M 20 5 C 25 15, 28 30, 28 50 H 12 C 12 30, 15 15, 20 5 Z" className="stroke-sky-400 fill-sky-400/10" strokeWidth="1.5" />
              <path d="M 12 40 L 4 55 H 12 Z" className="stroke-sky-400" strokeWidth="1.5" />
              <path d="M 28 40 L 36 55 H 28 Z" className="stroke-sky-400" strokeWidth="1.5" />
              <circle cx="20" cy="22" r="3" className="stroke-purple-400" strokeWidth="1.2" />

              {/* Flame plume (Animated flicker) */}
              <motion.path
                d="M 16 52 L 20 70 L 24 52 Z"
                className="fill-purple-400"
                animate={{ scaleY: [1, 1.4, 0.9, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ transformOrigin: "20px 52px" }}
              />
            </g>

            {/* Launch platform tower */}
            <line x1="90" y1="30" x2="90" y2="100" className="stroke-sky-500/30" strokeWidth="2" strokeDasharray="3 3" />
            <line x1="72" y1="45" x2="90" y2="45" className="stroke-sky-500/40" />
            <line x1="72" y1="70" x2="90" y2="70" className="stroke-sky-500/40" />

            {/* Connected to middle box at 200 */}
            <path d="M 90 60 H 200" className="stroke-purple-400/60" strokeWidth="1.5" />

            {/* Ascending ticker screen (Middle) */}
            <rect x="200" y="30" width="95" height="75" rx="6" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <text x="247" y="44" className="fill-sky-400 text-[8px] font-mono text-center" textAnchor="middle">STOCK TICKER</text>
            <path d="M 205 75 L 220 60 L 235 68 L 255 50 L 275 56 L 290 42" className="stroke-emerald-400" strokeWidth="2" fill="none" />
            <circle cx="290" cy="42" r="3" className="fill-emerald-400" />

            {/* IPO checklist box (Right) */}
            <g transform="translate(325, 45)">
              <rect x="0" y="0" width="90" height="24" rx="4" className="stroke-purple-400/40 fill-none" strokeWidth="1.2" />
              <text x="45" y="14" className="fill-purple-300 text-[8px] font-mono" textAnchor="middle">S-1 AUDITED</text>
              <rect x="0" y="32" width="90" height="24" rx="4" className="stroke-sky-400/40 fill-none" strokeWidth="1.2" />
              <text x="45" y="46" className="fill-sky-300 text-[8px] font-mono" textAnchor="middle">SEC FILING</text>
            </g>
          </>
        );

      case "09": // Tax Advisory (Jurisdiction maps, tax percentages)
        return (
          <>
            {/* Entity Jurisdiction Map layout (Left - Pulsating Nodes) */}
            <rect x="20" y="30" width="75" height="50" rx="4" className="stroke-sky-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            
            <motion.circle cx="40" cy="50" r="4.5" className="fill-sky-400" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 3, repeat: Infinity }} />
            <motion.circle cx="70" cy="45" r="3.5" className="fill-purple-400" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }} />
            <motion.circle cx="55" cy="65" r="3.5" className="fill-emerald-400" animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />

            {/* Connecting structure lines */}
            <line x1="40" y1="50" x2="70" y2="45" className="stroke-white/20" strokeWidth="1.2" />
            <line x1="40" y1="50" x2="55" y2="65" className="stroke-white/20" strokeWidth="1.2" />
            <line x1="70" y1="45" x2="55" y2="65" className="stroke-white/20" strokeWidth="1.2" />
            <text x="57" y="94" className="fill-zinc-400 text-[8px] font-mono" textAnchor="middle">NEXUS ANALYSIS</text>

            {/* Aligned to map edge 95 to middle box 170 */}
            <path d="M 95 55 H 170" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Tax Provisions Calculator (Middle) */}
            <rect x="170" y="30" width="90" height="75" rx="6" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <text x="215" y="44" className="fill-purple-400 text-[8px] font-mono text-center" textAnchor="middle">TAX PROVISIONS</text>
            <line x1="180" y1="55" x2="250" y2="55" className="stroke-purple-500/20" />
            <line x1="180" y1="65" x2="235" y2="65" className="stroke-purple-500/20" />
            <line x1="180" y1="75" x2="245" y2="75" className="stroke-purple-500/20" />
            
            {/* Orbiting percentage container (Animated pulse) */}
            <motion.circle
              cx="230" cy="87" r="7"
              className="stroke-purple-400 fill-none"
              strokeWidth="1"
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={pulseTransition}
            />
            <text x="230" y="90" className="fill-purple-300 text-[8px] font-mono font-bold" textAnchor="middle">%</text>

            {/* Global Tax jurisdiction checkmarks (Right) */}
            <g transform="translate(290, 45)">
              <rect x="0" y="0" width="12" height="12" rx="2" className="stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" />
              <path d="M 2 6 L 5 9 L 10 3" className="stroke-emerald-400" strokeWidth="1.5" fill="none" />
              <text x="20" y="10" className="fill-zinc-300 text-[8px] font-mono">FEDERAL</text>

              <rect x="0" y="22" width="12" height="12" rx="2" className="stroke-emerald-400 fill-emerald-400/10" strokeWidth="1.5" />
              <path d="M 2 28 L 5 31 L 10 25" className="stroke-emerald-400" strokeWidth="1.5" fill="none" />
              <text x="20" y="32" className="fill-zinc-300 text-[8px] font-mono">STATE/LOCAL</text>
            </g>
          </>
        );

      case "10": // MacTax (Tax engine concentric circles, code, shield)
        return (
          <>
            {/* Concentric Tax orbits (Left) */}
            <circle cx="60" cy="70" r="30" className="stroke-sky-500/30 fill-none" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="60" cy="70" r="20" className="stroke-sky-400/50 fill-[#0b1020]/20" strokeWidth="1.5" />
            <circle cx="60" cy="70" r="10" className="stroke-sky-400 fill-sky-400/10" strokeWidth="1.5" />
            {/* Orbiting nodes (Animated rotation) */}
            <motion.circle
              cx="60" cy="40" r="3.5" className="fill-sky-400"
              animate={{ rotate: 360 }}
              transition={rotateTransition(10)}
              style={{ transformOrigin: "60px 70px" }}
            />
            <motion.circle
              cx="60" cy="90" r="3.5" className="fill-purple-400"
              animate={{ rotate: -360 }}
              transition={rotateTransition(15)}
              style={{ transformOrigin: "60px 70px" }}
            />

            {/* Left connector: orbit right edge (90) to code left edge (165) */}
            <path d="M 90 70 H 165" className="stroke-purple-400/60" strokeWidth="1.5" />

            {/* Automated Code Box (Middle) */}
            <rect x="165" y="30" width="110" height="75" rx="6" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <text x="220" y="44" className="fill-purple-400 text-[8px] font-mono text-center" textAnchor="middle">AUTOMATED CODE</text>
            <line x1="172" y1="54" x2="268" y2="54" className="stroke-purple-500/20" />
            {/* Code lines */}
            <text x="172" y="68" className="fill-sky-300 text-[7px] font-mono">{"const tax = calc(nexus);"}</text>
            <text x="172" y="78" className="fill-purple-300 text-[7px] font-mono">{"if (tax.liability > 0) {"}</text>
            <text x="182" y="88" className="fill-emerald-300 text-[7px] font-mono">{"triggerProvision();"}</text>
            <text x="172" y="98" className="fill-purple-300 text-[7px] font-mono">{"}"}</text>

            {/* Right connector: code right edge (275) to shield left edge (301) */}
            <path d="M 275 70 H 301" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Shield representing security check (Right) */}
            <g transform="translate(295, 45)">
              <path d="M 20 10 C 27 10, 34 13, 34 22 C 34 34, 20 45, 20 45 C 20 45, 6 34, 6 22 C 6 13, 13 10, 20 10 Z" className="stroke-sky-400 fill-sky-400/10" strokeWidth="1.5" />
              <path d="M 15 25 L 19 29 L 26 19" className="stroke-sky-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>
          </>
        );

      case "11": // Technology Services (cyber spheres, node meshes, code inputs)
        return (
          <>
            {/* Database cylinders (Left - Animated stack indicators) */}
            <g transform="translate(30, 30)">
              <ellipse cx="20" cy="10" rx="18" ry="5" className="stroke-sky-500 fill-sky-500/10" strokeWidth="1.5" />
              <path d="M 2 10 V 22 A 18 5 0 0 0 38 22 V 10" className="stroke-sky-500" strokeWidth="1.5" fill="none" />
              <ellipse cx="20" cy="22" rx="18" ry="5" className="stroke-sky-400/40 fill-[#0b1020]/20" strokeWidth="1.2" />
              <path d="M 2 22 V 34 A 18 5 0 0 0 38 34 V 22" className="stroke-sky-500" strokeWidth="1.5" fill="none" />
              <ellipse cx="20" cy="34" rx="18" ry="5" className="stroke-sky-400/60 fill-[#0b1020]/40" strokeWidth="1.5" />
            </g>

            {/* Aligned to database cylinder edge 48 to middle box 160 */}
            <path d="M 48 52 H 160" className="stroke-sky-400/60" strokeWidth="1.5" />

            {/* Neural AI agent node cluster (Middle - Slowly rotating network mesh) */}
            <rect x="160" y="30" width="100" height="80" rx="6" className="stroke-purple-500/50 fill-[#0b1020]/40" strokeWidth="1.5" />
            <circle cx="210" cy="70" r="24" className="stroke-purple-400/20 fill-none" strokeWidth="1" strokeDasharray="3 3" />
            
            <motion.g
              animate={{ rotate: 360 }}
              transition={rotateTransition(45)}
              style={{ transformOrigin: "210px 70px" }}
            >
              {/* Node elements */}
              <circle cx="210" cy="70" r="6" className="fill-purple-400" />
              <circle cx="190" cy="60" r="4.5" className="stroke-sky-400 fill-[#0b1020]" strokeWidth="1.5" />
              <circle cx="230" cy="60" r="4.5" className="stroke-sky-400 fill-[#0b1020]" strokeWidth="1.5" />
              <circle cx="190" cy="80" r="4.5" className="stroke-sky-400 fill-[#0b1020]" strokeWidth="1.5" />
              <circle cx="230" cy="80" r="4.5" className="stroke-sky-400 fill-[#0b1020]" strokeWidth="1.5" />
              {/* Connections */}
              <line x1="210" y1="70" x2="190" y2="60" className="stroke-purple-400/60" strokeWidth="1" />
              <line x1="210" y1="70" x2="230" y2="60" className="stroke-purple-400/60" strokeWidth="1" />
              <line x1="210" y1="70" x2="190" y2="80" className="stroke-purple-400/60" strokeWidth="1" />
              <line x1="210" y1="70" x2="230" y2="80" className="stroke-purple-400/60" strokeWidth="1" />
            </motion.g>

            {/* Code parameters (Right) */}
            <g transform="translate(285, 45)">
              <rect x="0" y="0" width="80" height="24" rx="4" className="stroke-sky-400/40 fill-[#05081c]" strokeWidth="1.2" />
              <text x="40" y="15" className="fill-sky-300 text-[8px] font-mono" textAnchor="middle">{"API CORE"}</text>
              <rect x="0" y="32" width="80" height="24" rx="4" className="stroke-purple-400/40 fill-[#05081c]" strokeWidth="1.2" />
              <text x="40" y="47" className="fill-purple-300 text-[8px] font-mono" textAnchor="middle">{"JSON DATA"}</text>
            </g>
          </>
        );
    }
  };

  return (
    <div className="relative w-full h-[150px] border border-white/10 bg-[#05081c]/80 rounded-xl overflow-hidden mb-6 flex items-center justify-center">
      {/* Grid lines background */}
      <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <svg className="w-full h-full" viewBox="0 0 500 150" fill="none">
        {getBlueprintContent()}
      </svg>
    </div>
  );
}
