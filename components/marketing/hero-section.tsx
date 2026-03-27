"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { BrowserMockup } from "@/components/marketing/browser-mockup";
import { benefits } from "@/lib/landing-data";

const particles = [
  { size: "h-2 w-2", left: "left-[8%]", top: "top-[18%]", delay: 0, duration: 6 },
  { size: "h-1.5 w-1.5", left: "left-[18%]", top: "top-[60%]", delay: 0.6, duration: 7 },
  { size: "h-2.5 w-2.5", left: "left-[42%]", top: "top-[22%]", delay: 1.2, duration: 8 },
  { size: "h-1.5 w-1.5", left: "left-[55%]", top: "top-[68%]", delay: 1.8, duration: 7.5 },
  { size: "h-2 w-2", left: "left-[72%]", top: "top-[30%]", delay: 0.9, duration: 6.5 },
  { size: "h-1.5 w-1.5", left: "left-[84%]", top: "top-[58%]", delay: 1.5, duration: 8.5 },
];

export function HeroSection() {
  const { scrollY } = useScroll();
  const mockupY = useTransform(scrollY, [0, 600], [0, -50]);
  const textY = useTransform(scrollY, [0, 600], [0, -20]);

  return (
    <section className="relative mx-auto grid max-w-7xl items-start gap-20 overflow-hidden px-6 pb-24 pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:pt-20">
      {/* Global background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.14),transparent_35%),radial-gradient(circle_at_80%_25%,rgba(99,102,241,0.14),transparent_35%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.1),transparent_40%)]" />

        <motion.div
          animate={{ opacity: [0.45, 0.7, 0.45] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/35 to-black/70"
        />

        {/* Glow clusters */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[-5%] top-[5%] h-72 w-72 rounded-full bg-cyan-400/18 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.18, 0.35, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[2%] top-[10%] h-80 w-80 rounded-full bg-blue-500/16 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.12, 0.28, 0.12] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-8%] left-[30%] h-80 w-80 rounded-full bg-indigo-500/16 blur-3xl"
        />

        {/* Particle field */}
        {particles.map((particle, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: [0.15, 0.85, 0.15],
              y: [0, -18, 0],
              x: [0, 6, 0],
            }}
            transition={{
              delay: particle.delay,
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${particle.left} ${particle.top} ${particle.size} rounded-full bg-cyan-200/80 shadow-[0_0_20px_rgba(103,232,249,0.8)]`}
          />
        ))}

        {/* faint grid */}
        <div className="absolute inset-0 opacity-[0.045] [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      {/* Left side */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-sm font-medium text-amber-200 backdrop-blur-xl shadow-[0_0_30px_rgba(251,191,36,0.15)]"
        >
          <Sparkles className="h-4 w-4" />
          Limited spots available
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-6xl font-black leading-[0.92] tracking-tight sm:text-7xl lg:text-8xl"
        >
          No website =
          <span className="block bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(125,211,252,0.25)]">
            LESS customers
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/70"
        >
          Your competitors are getting the customers that should be yours.
          We build websites that actually bring enquiries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col gap-4 sm:flex-row"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            href="/apply"
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-300 to-blue-400 px-6 py-4 font-bold text-black shadow-[0_20px_60px_rgba(34,211,238,0.3)] transition"
          >
            <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.4),transparent)] opacity-0 transition group-hover:translate-x-full group-hover:opacity-100" />
            Get Your Free Website
            <ArrowRight className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href="#how-it-works"
            className="rounded-2xl border border-white/20 px-6 py-4 text-white transition hover:bg-white/5"
          >
            How It Works
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {benefits.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 + index * 0.08 }}
              whileHover={{ y: -4 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
            >
              <CheckCircle2 className="mb-2 h-4 w-4 text-cyan-300" />
              <p className="text-sm text-white/80">{item}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Right side */}
   <motion.div
  style={{ y: mockupY }}
  initial={{ opacity: 0, y: 30, scale: 0.97 }}
  animate={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.8 }}
  className="relative z-10 flex justify-center lg:-mt-6"
>
  <div className="relative">

    {/* Glow background */}
    <div className="absolute inset-0 -z-10 blur-3xl opacity-60 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full" />

    {/* Floating image */}
    <motion.img
      src="/hero-illustration.jpg"
      alt="Website growth illustration"
      className="w-[320px] sm:w-[420px] lg:w-[500px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.6)]"
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />

    {/* Subtle shine overlay */}
    <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.2),transparent_60%)]" />

  </div>
</motion.div>
    </section>
  );
}