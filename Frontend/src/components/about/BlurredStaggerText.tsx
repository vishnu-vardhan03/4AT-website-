"use client";

import * as React from "react";
import { motion } from "framer-motion";

export const BlurredStagger = ({
  text = "we love hextaui.com ❤️",
  className = "",
}: {
  text: string;
  className?: string;
}) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.015,
      },
    },
  };

  const letterAnimation = {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      style={{ display: "inline", whiteSpace: "normal", overflowWrap: "normal", wordBreak: "normal" }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterAnimation}
          transition={{ duration: 0.35 }}
          className={className}
          style={{ display: "inline" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
};
