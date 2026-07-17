"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface RingLayer {
  id: string;
  label: string;
  color: string;
  size: number;
  rotationSpeed: number;
  direction: 1 | -1;
  hoverOffset: { x: number; y: number };
  borderStyle: string;
}

interface SphereGroup {
  coreColor: string;
  glowColor: string;
  layers: RingLayer[];
}

export function InteractiveSphere({ categoryIndex = 0, onClick }: { categoryIndex?: number; onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  // Group definitions corresponding to the 5 slides in Hero.tsx
  const groups: SphereGroup[] = [
    // 0. Accounting
    {
      coreColor: "from-cyan-400 to-sky-500",
      glowColor: "rgba(34, 211, 238, 0.4)",
      layers: [
        {
          id: "acc-1",
          label: "GAAP Compliance",
          color: "rgba(34, 211, 238, 0.8)", // Cyan
          size: 256,
          rotationSpeed: 15,
          direction: 1,
          hoverOffset: { x: 45, y: -45 },
          borderStyle: "border-dashed",
        },
        {
          id: "acc-2",
          label: "CFO Advisory",
          color: "rgba(56, 189, 248, 0.8)", // Sky
          size: 192,
          rotationSpeed: 10,
          direction: -1,
          hoverOffset: { x: -45, y: 45 },
          borderStyle: "border-solid",
        },
        {
          id: "acc-3",
          label: "Month-End Close",
          color: "rgba(99, 102, 241, 0.8)", // Indigo
          size: 128,
          rotationSpeed: 7,
          direction: 1,
          hoverOffset: { x: 0, y: -65 },
          borderStyle: "border-double",
        },
      ],
    },
    // 1. Audit
    {
      coreColor: "from-purple-400 to-violet-600",
      glowColor: "rgba(167, 139, 250, 0.4)",
      layers: [
        {
          id: "aud-1",
          label: "Statutory Audit",
          color: "rgba(167, 139, 250, 0.8)", // Purple
          size: 256,
          rotationSpeed: 12,
          direction: -1,
          hoverOffset: { x: -50, y: -30 },
          borderStyle: "border-solid",
        },
        {
          id: "aud-2",
          label: "Risk Assessment",
          color: "rgba(139, 92, 246, 0.8)", // Violet
          size: 192,
          rotationSpeed: 14,
          direction: 1,
          hoverOffset: { x: 50, y: 30 },
          borderStyle: "border-dashed",
        },
        {
          id: "aud-3",
          label: "Internal Controls",
          color: "rgba(34, 211, 238, 0.8)", // Cyan
          size: 128,
          rotationSpeed: 8,
          direction: -1,
          hoverOffset: { x: 0, y: 60 },
          borderStyle: "border-double",
        },
      ],
    },
    // 2. Assurance
    {
      coreColor: "from-indigo-400 to-blue-600",
      glowColor: "rgba(99, 102, 241, 0.4)",
      layers: [
        {
          id: "asr-1",
          label: "Compliance Auditing",
          color: "rgba(99, 102, 241, 0.8)", // Indigo
          size: 256,
          rotationSpeed: 16,
          direction: 1,
          hoverOffset: { x: 40, y: 40 },
          borderStyle: "border-double",
        },
        {
          id: "asr-2",
          label: "ESG Reporting",
          color: "rgba(167, 139, 250, 0.8)", // Purple
          size: 192,
          rotationSpeed: 9,
          direction: -1,
          hoverOffset: { x: -40, y: -40 },
          borderStyle: "border-solid",
        },
        {
          id: "asr-3",
          label: "SOX Assurance",
          color: "rgba(56, 189, 248, 0.8)", // Sky
          size: 128,
          rotationSpeed: 11,
          direction: 1,
          hoverOffset: { x: 55, y: -20 },
          borderStyle: "border-dashed",
        },
      ],
    },
    // 3. Advisory
    {
      coreColor: "from-rose-400 to-pink-600",
      glowColor: "rgba(251, 113, 133, 0.4)",
      layers: [
        {
          id: "adv-1",
          label: "Board Reporting",
          color: "rgba(251, 113, 133, 0.8)", // Rose
          size: 256,
          rotationSpeed: 10,
          direction: -1,
          hoverOffset: { x: -35, y: 55 },
          borderStyle: "border-dashed",
        },
        {
          id: "adv-2",
          label: "M&A Advisory",
          color: "rgba(167, 139, 250, 0.8)", // Purple
          size: 192,
          rotationSpeed: 13,
          direction: 1,
          hoverOffset: { x: 35, y: -55 },
          borderStyle: "border-solid",
        },
        {
          id: "adv-3",
          label: "ERP Strategy",
          color: "rgba(244, 63, 94, 0.8)", // Pink
          size: 128,
          rotationSpeed: 7,
          direction: -1,
          hoverOffset: { x: -60, y: -10 },
          borderStyle: "border-double",
        },
      ],
    },
    // 4. Technology
    {
      coreColor: "from-emerald-400 to-teal-500",
      glowColor: "rgba(52, 211, 153, 0.4)",
      layers: [
        {
          id: "tech-1",
          label: "Ledger Automation",
          color: "rgba(52, 211, 153, 0.8)", // Emerald
          size: 256,
          rotationSpeed: 18,
          direction: 1,
          hoverOffset: { x: 55, y: 20 },
          borderStyle: "border-solid",
        },
        {
          id: "tech-2",
          label: "API Integrations",
          color: "rgba(45, 212, 191, 0.8)", // Teal
          size: 192,
          rotationSpeed: 11,
          direction: -1,
          hoverOffset: { x: -55, y: -20 },
          borderStyle: "border-dashed",
        },
        {
          id: "tech-3",
          label: "Data Pipelines",
          color: "rgba(34, 211, 238, 0.8)", // Cyan
          size: 128,
          rotationSpeed: 13,
          direction: 1,
          hoverOffset: { x: 0, y: -60 },
          borderStyle: "border-double",
        },
      ],
    },
  ];

  // Safeguard active group index selection
  const activeGroup = groups[categoryIndex % groups.length];

  return (
    <div className="relative w-full h-[450px] flex items-center justify-center pointer-events-auto select-none">
      {/* Interactive Trigger Wrapper */}
      <motion.div
        className="relative w-72 h-72 flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        style={{ perspective: 1000, scale: 1.15 }}
      >
        {/* Central Glowing AI Core (morphing color gradients and shadow styles) */}
        <motion.div
          className={`absolute rounded-full bg-gradient-to-tr ${activeGroup.coreColor} z-10 flex items-center justify-center`}
          animate={{
            scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.1, 1],
            boxShadow: isHovered
              ? `0 0 40px ${activeGroup.glowColor.replace("0.4", "0.8")}, 0 0 80px rgba(255, 255, 255, 0.2)`
              : `0 0 20px ${activeGroup.glowColor}, 0 0 40px rgba(255, 255, 255, 0.1)`,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "55px",
            height: "55px",
          }}
        >
          {/* Core Symbol / Tech Dot */}
          <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
        </motion.div>

        {/* Ambient Halo behind the core */}
        <motion.div 
          className="absolute w-36 h-36 rounded-full blur-xl pointer-events-none"
          animate={{
            background: activeGroup.glowColor.replace("0.4", "0.15"),
          }}
          transition={{ duration: 0.5 }}
        />

        {/* Rotating Concentric Shells (morphing sizes, border styles, and labels) */}
        {activeGroup.layers.map((layer) => (
          <motion.div
            key={layer.id}
            className={`absolute rounded-full border-2 ${layer.borderStyle} flex items-center justify-center`}
            style={{
              borderColor: layer.color,
            }}
            animate={{
              rotate: [0, 360 * layer.direction],
              x: 0,
              y: 0,
              scale: isHovered ? 1.05 : 1,
              width: `${layer.size}px`,
              height: `${layer.size}px`,
              rotateX: isHovered ? 0 : 65,
              rotateY: isHovered ? 0 : 15,
            }}
            transition={{
              rotate: {
                duration: 25 - layer.rotationSpeed,
                repeat: Infinity,
                ease: "linear",
              },
              x: { duration: 0.6, ease: "easeOut" },
              y: { duration: 0.6, ease: "easeOut" },
              scale: { duration: 0.6, ease: "easeOut" },
              width: { duration: 0.5, ease: "easeInOut" },
              height: { duration: 0.5, ease: "easeInOut" },
              rotateX: { duration: 0.8, ease: "easeOut" },
              rotateY: { duration: 0.8, ease: "easeOut" },
            }}
          >
            {/* Tiny Node Indicators along the rings */}
            <div 
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: layer.color,
                boxShadow: `0 0 10px ${layer.color}`,
                top: "-1px",
              }}
            />
            <div 
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: layer.color,
                boxShadow: `0 0 10px ${layer.color}`,
                bottom: "-1px",
              }}
            />

          </motion.div>
        ))}

        {/* Static Labels positioned relative to the rings on hover */}
        {activeGroup.layers.map((layer, idx) => (
          <motion.div
            key={`label-${layer.id}`}
            className="absolute pointer-events-none whitespace-nowrap bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-full border text-[11px] font-extrabold tracking-wider uppercase text-white shadow-lg shadow-black/40 z-20"
            style={{
              borderColor: layer.color,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.8,
              x: isHovered ? layer.hoverOffset.x * 1.5 : 0,
              y: isHovered ? layer.hoverOffset.y * 1.5 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 90,
              damping: 14,
              delay: idx * 0.05,
            }}
          >
            {layer.label}
          </motion.div>
        ))}

        {/* Dynamic Connection Beams (Holographic Laser Lines) */}
        {isHovered &&
          activeGroup.layers.map((layer) => (
            <svg
              key={`line-${layer.id}`}
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              style={{
                transform: "translate3d(0, 0, 0)",
              }}
            >
              <motion.line
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${layer.hoverOffset.x}px)`}
                y2={`calc(50% + ${layer.hoverOffset.y}px)`}
                stroke={layer.color}
                strokeWidth="1.5"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.4 }}
                transition={{ duration: 0.6 }}
              />
            </svg>
          ))}
      </motion.div>
    </div>
  );
}
