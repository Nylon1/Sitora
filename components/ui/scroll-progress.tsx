"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 right-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 shadow-[0_0_18px_rgba(34,211,238,0.45)]"
    />
  );
}