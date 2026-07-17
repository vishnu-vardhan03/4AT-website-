"use client";

import { motion } from "framer-motion";

interface DoodleProps {
  serviceId: string;
  sizeClass?: string;
}

export function ServiceDoodle({ serviceId, sizeClass = "w-24 h-24" }: DoodleProps) {
  // Common motion configurations for consistent feel
  const floatTransition = {
    duration: 5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  };

  const drawTransition = {
    duration: 1.5,
    ease: "easeInOut" as const,
  };

  const renderDoodle = () => {
    switch (serviceId) {
      case "01": // Accounting Process Outsourcing
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Ledger background grid */}
            <motion.rect
              x="15" y="15" width="70" height="70" rx="8"
              strokeDasharray="4 4"
              className="opacity-40"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={floatTransition}
            />
            {/* Balance lines */}
            <line x1="25" y1="35" x2="75" y2="35" className="opacity-50" />
            <line x1="25" y1="50" x2="75" y2="50" className="opacity-50" />
            <line x1="25" y1="65" x2="75" y2="65" className="opacity-50" />
            {/* Floating digital coins/nodes */}
            <motion.circle
              cx="35" cy="50" r="6" fill="currentColor" fillOpacity="0.1"
              animate={{ y: [0, -8, 0], scale: [1, 1.1, 1] }}
              transition={{ ...floatTransition, delay: 0 }}
            />
            <motion.circle
              cx="55" cy="35" r="4" fill="currentColor" fillOpacity="0.1"
              animate={{ y: [0, -6, 0] }}
              transition={{ ...floatTransition, delay: 1 }}
            />
            <motion.circle
              cx="65" cy="65" r="5" fill="currentColor" fillOpacity="0.1"
              animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
              transition={{ ...floatTransition, delay: 0.5 }}
            />
            {/* Dynamic connector path */}
            <motion.path
              d="M 35 50 Q 50 25 55 35 T 65 65"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={drawTransition}
            />
          </svg>
        );

      case "02": // Virtual CFO Services
        return (
          <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Grid background */}
            <path d="M15 85 H85 M15 15 V85" className="opacity-30" />
            <line x1="15" y1="50" x2="85" y2="50" strokeDasharray="3 3" className="opacity-20" />
            <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="3 3" className="opacity-20" />
            
            {/* Growth Curve */}
            <motion.path
              d="M 20 75 Q 40 70 55 45 T 80 20"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={drawTransition}
            />
            {/* Glowing target node */}
            <motion.circle
              cx="80" cy="20" r="5" fill="currentColor"
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            {/* Star badge representing direction */}
            <motion.polygon
              points="50,20 53,27 60,27 55,32 57,39 50,35 43,39 45,32 40,27 47,27"
              fill="currentColor" fillOpacity="0.15"
              animate={{ rotate: 360, y: [0, -4, 0] }}
              transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, y: floatTransition }}
            />
          </svg>
        );

      case "03": // Interim Resource Alignment
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Two interlocking puzzle gears */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "38px 50px" }}
            >
              <circle cx="38" cy="50" r="16" strokeDasharray="6 4" className="opacity-70" />
              <circle cx="38" cy="50" r="8" fill="currentColor" fillOpacity="0.1" />
            </motion.g>
            <motion.g
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "62px 50px" }}
            >
              <circle cx="62" cy="50" r="12" strokeDasharray="4 3" className="opacity-50" />
              <circle cx="62" cy="50" r="6" fill="currentColor" fillOpacity="0.05" />
            </motion.g>
            {/* Flow line connection */}
            <motion.path
              d="M 20 50 H 80"
              strokeDasharray="5 5"
              animate={{ strokeDashoffset: [0, -10] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="opacity-40"
            />
          </svg>
        );

      case "04": // Internal Controls & SOX Compliance
        return (
          <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Shield outline */}
            <motion.path
              d="M 50 15 C 65 15, 80 20, 80 35 C 80 60, 50 85, 50 85 C 50 85, 20 60, 20 35 C 20 20, 35 15, 50 15 Z"
              strokeDasharray="200"
              initial={{ strokeDashoffset: 200 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
            {/* Glowing inner checkmark */}
            <motion.path
              d="M 38 48 L 47 57 L 62 38"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            />
            {/* Outer protection rings */}
            <motion.circle
              cx="50" cy="48" r="30"
              strokeDasharray="6 8"
              className="opacity-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        );

      case "05": // Technical Accounting
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Structural geometric matrix */}
            <motion.polygon
              points="50,15 80,35 80,65 50,85 20,65 20,35"
              className="opacity-20"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={floatTransition}
              style={{ transformOrigin: "50px 50px" }}
            />
            <motion.polygon
              points="50,25 70,40 70,60 50,75 30,60 30,40"
              className="opacity-40"
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={floatTransition}
              style={{ transformOrigin: "50px 50px" }}
            />
            {/* Center core point */}
            <motion.circle
              cx="50" cy="50" r="6" fill="currentColor" fillOpacity="0.2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Node markers */}
            <circle cx="50" cy="15" r="3" fill="currentColor" />
            <circle cx="80" cy="35" r="3" fill="currentColor" />
            <circle cx="20" cy="65" r="3" fill="currentColor" />
            {/* Connecting laser lines */}
            <line x1="50" y1="15" x2="50" y2="50" className="opacity-60" />
            <line x1="80" y1="35" x2="50" y2="50" className="opacity-60" />
            <line x1="20" y1="65" x2="50" y2="50" className="opacity-60" />
          </svg>
        );

      case "06": // Audit Outsourcing
        return (
          <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Document sheet */}
            <motion.rect
              x="25" y="15" width="40" height="55" rx="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={drawTransition}
            />
            <line x1="33" y1="28" x2="57" y2="28" className="opacity-50" />
            <line x1="33" y1="40" x2="57" y2="40" className="opacity-50" />
            <line x1="33" y1="52" x2="48" y2="52" className="opacity-50" />

            {/* Floating Lens / Magnifying Glass */}
            <motion.g
              animate={{ x: [0, 8, -4, 0], y: [0, -6, 6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="62" cy="55" r="12" fill="#05081c" fillOpacity="0.8" stroke="currentColor" strokeWidth="2.5" />
              <line x1="70.5" y1="63.5" x2="82" y2="75" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              {/* Scan flash */}
              <motion.circle
                cx="62" cy="55" r="8" fill="currentColor"
                animate={{ opacity: [0.05, 0.25, 0.05] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.g>
          </svg>
        );

      case "07": // Financial Audit Readiness
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Calendar base or folder */}
            <motion.path
              d="M 20 30 L 40 30 L 48 20 L 80 20 L 80 75 A 5 5 0 0 1 75 80 L 25 80 A 5 5 0 0 1 20 75 Z"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={drawTransition}
            />
            {/* Rising sheets representing organization */}
            <motion.path
              d="M 30 45 H 70 M 30 57 H 70"
              strokeDasharray="4 4"
              className="opacity-60"
            />
            {/* Checked readiness indicator */}
            <motion.circle
              cx="72" cy="62" r="9"
              fill="#05081c"
              stroke="currentColor"
              animate={{ scale: [1, 1.1, 1] }}
              transition={floatTransition}
            />
            <motion.path
              d="M 68 62 L 71 65 L 77 59"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );

      case "08": // IPO Readiness
        return (
          <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Global orbit ring */}
            <ellipse cx="50" cy="55" rx="35" ry="12" className="opacity-30" transform="rotate(-15 50 55)" />

            {/* Launching Rocket */}
            <motion.g
              animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Rocket body */}
              <path d="M 50 20 C 53 35, 56 45, 56 60 L 44 60 C 44 45, 47 20, 50 20 Z" fill="currentColor" fillOpacity="0.1" />
              {/* Rocket tip & fins */}
              <path d="M 44 52 L 36 62 L 44 60 Z" />
              <path d="M 56 52 L 64 62 L 56 60 Z" />
              {/* Center point */}
              <circle cx="50" cy="45" r="2" fill="currentColor" />
            </motion.g>

            {/* Flame/exhaust trail */}
            <motion.path
              d="M 47 64 L 50 78 L 53 64 Z"
              fill="currentColor"
              animate={{ scaleY: [1, 1.4, 0.9, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 64px" }}
            />
          </svg>
        );

      case "09": // Tax Advisory
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Balance scales representing Tax structure */}
            <line x1="50" y1="20" x2="50" y2="75" strokeWidth="2.5" />
            <line x1="30" y1="75" x2="70" y2="75" strokeWidth="3" />
            
            {/* Moving scale beam */}
            <motion.g
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={floatTransition}
              style={{ transformOrigin: "50px 30px" }}
            >
              <line x1="25" y1="30" x2="75" y2="30" strokeWidth="2.5" />
              {/* Left Pan */}
              <line x1="25" y1="30" x2="18" y2="55" className="opacity-60" />
              <line x1="25" y1="30" x2="32" y2="55" className="opacity-60" />
              <path d="M 14 55 H 36" strokeWidth="2" />
              {/* Right Pan */}
              <line x1="75" y1="30" x2="68" y2="55" className="opacity-60" />
              <line x1="75" y1="30" x2="82" y2="55" className="opacity-60" />
              <path d="M 64 55 H 86" strokeWidth="2" />
            </motion.g>
          </svg>
        );

      case "10": // MacTax
        return (
          <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Double concentric circles with rotating nodes */}
            <circle cx="50" cy="50" r="32" strokeDasharray="3 3" className="opacity-30" />
            <circle cx="50" cy="50" r="22" className="opacity-20" />
            
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              <circle cx="50" cy="18" r="4.5" fill="currentColor" />
              <circle cx="50" cy="82" r="3" fill="currentColor" className="opacity-60" />
            </motion.g>
            
            {/* Tax Percentage central glyph */}
            <motion.g
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ transformOrigin: "50px 50px" }}
            >
              {/* % symbol */}
              <line x1="40" y1="60" x2="60" y2="40" strokeWidth="3" strokeLinecap="round" />
              <circle cx="42" cy="42" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="58" cy="58" r="3" fill="none" stroke="currentColor" strokeWidth="2" />
            </motion.g>
          </svg>
        );

      case "11": // Technology Services (AI & private stacks)
        return (
          <svg className="w-full h-full text-sky-400" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
            {/* Neural network / AI mesh */}
            <motion.g
              animate={{ scale: [0.98, 1.02, 0.98], rotate: [0, 1, -1, 0] }}
              transition={floatTransition}
              style={{ transformOrigin: "50px 50px" }}
            >
              {/* Nodes */}
              <circle cx="50" cy="30" r="5" fill="currentColor" fillOpacity="0.2" />
              <circle cx="30" cy="60" r="4" fill="currentColor" fillOpacity="0.2" />
              <circle cx="70" cy="60" r="4" fill="currentColor" fillOpacity="0.2" />
              <circle cx="50" cy="75" r="5.5" fill="currentColor" fillOpacity="0.2" />

              {/* Laser connectors */}
              <motion.line
                x1="50" y1="30" x2="30" y2="60"
                strokeDasharray="40"
                initial={{ strokeDashoffset: 40 }}
                animate={{ strokeDashoffset: 0 }}
                transition={drawTransition}
              />
              <line x1="50" y1="30" x2="70" y2="60" />
              <line x1="30" y1="60" x2="50" y2="75" />
              <line x1="70" y1="60" x2="50" y2="75" />
              <line x1="50" y1="30" x2="50" y2="75" strokeDasharray="3 3" className="opacity-40" />
            </motion.g>

            {/* Glowing orbital ring */}
            <motion.ellipse
              cx="50" cy="54" rx="36" ry="10"
              className="opacity-40"
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 54px" }}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`flex items-center justify-center p-2 rounded-xl bg-white/[0.01] border border-white/5 shadow-inner ${sizeClass}`}
      whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.12)" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {renderDoodle()}
    </motion.div>
  );
}
