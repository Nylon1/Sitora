"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import { BarChart3, MousePointerClick, ShieldCheck, Zap } from "lucide-react";

const floatingStats = [
  {
    title: "More Leads",
    value: "+42%",
    icon: Zap,
    className: "top-[-18px] left-[-26px]",
  },
  {
    title: "Trust Boost",
    value: "Premium",
    icon: ShieldCheck,
    className: "top-[18%] right-[-28px]",
  },
  {
    title: "Clicks",
    value: "24/7",
    icon: MousePointerClick,
    className: "bottom-[10%] left-[-18px]",
  },
  {
    title: "Growth",
    value: "Live",
    icon: BarChart3,
    className: "bottom-[-20px] right-[12%]",
  },
];

export function BrowserMockup() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const xPos = e.clientX - innerWidth / 2;
      const yPos = e.clientY - innerHeight / 2;

      mouseX.set(xPos);
      mouseY.set(yPos);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative mx-auto w-full max-w-[720px]">
      {/* Background glow field */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[5%] top-[8%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1.05, 1, 1.05], opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[8%] top-[20%] h-56 w-56 rounded-full bg-blue-500/20 blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[0%] left-[30%] h-48 w-48 rounded-full bg-indigo-500/15 blur-3xl"
        />
      </div>

      {/* Floating badges */}
      {floatingStats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [0, -10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              delay: 0.25 + index * 0.08,
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute z-30 hidden rounded-[18px] border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.28)] lg:block ${item.className}`}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-white/50">
                  {item.title}
                </p>
                <p className="text-sm font-black text-white">{item.value}</p>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Main 3D shell */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
        }}
        className="relative transition-transform duration-200"
      >
        {/* Glow rim */}
        <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-gradient-to-r from-cyan-400/20 via-blue-500/15 to-indigo-500/20 blur-3xl" />

        {/* Light sweep */}
        <motion.div
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 z-20 rounded-[34px] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.14),transparent)] opacity-30"
        />

        {/* Outer shell */}
        <div className="relative rounded-[30px] border border-white/10 bg-[#070d1d]/70 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-400" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white shadow-[0_20px_80px_rgba(0,0,0,0.28)]">
            <div className="border-b border-black/10 bg-white px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-[28px] font-black tracking-tight text-black">
                    Free Website Campaign
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-black/65">
                    Turn clicks into real business leads. Build trust and get more enquiries.
                  </p>
                </div>
                <div className="text-sm font-bold text-cyan-500">
                  More Enquiries
                </div>
              </div>

              <button className="mt-5 rounded-xl bg-black px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-neutral-800">
                Apply Now
              </button>
            </div>

            <div className="grid gap-4 bg-[#fbfbfb] p-5 md:grid-cols-3">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="h-2 w-20 rounded-full bg-cyan-300/80" />
                <div className="mt-4 h-2 w-full rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-4/5 rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-3/5 rounded-full bg-black/10" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="h-2 w-24 rounded-full bg-blue-300/80" />
                <div className="mt-4 h-2 w-full rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-3/4 rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-2/3 rounded-full bg-black/10" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm"
              >
                <div className="h-2 w-16 rounded-full bg-indigo-300/80" />
                <div className="mt-4 h-2 w-full rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-5/6 rounded-full bg-black/10" />
                <div className="mt-2 h-2 w-1/2 rounded-full bg-black/10" />
              </motion.div>
            </div>
          </div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-8 left-[12%] hidden h-24 w-[76%] rounded-[24px] border border-white/10 bg-white/[0.06] blur-[1px] backdrop-blur-xl lg:block"
          />
        </div>
      </motion.div>
    </div>
  );
}