"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div className=" fixed top-0 left-0 right-0 h-[2px] origin-left z-[999] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400"
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}