"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  { value: 24, suffix: "/7", label: "Online presence" },
  { value: 3, suffix: " sec", label: "To impress a visitor" },
  { value: 1, suffix: " page", label: "Can change everything" },
  { value: 100, suffix: "%", label: "Growth potential" },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function StatsGrid() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
      {/* glow background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-[30%] h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* floating feature chips */}
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {[
          "Designed to outperform your competitors",
          "Made to generate leads",
          "Built to convert visitors",
          "Premium layout and design",
          "Crafted for ambitious brands",
        ].map((text, i) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.05 }}
            className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/70 backdrop-blur-xl hover:border-cyan-300/20 hover:text-cyan-200"
          >
            {text}
          </motion.div>
        ))}
      </div>

      {/* stats grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.05] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] backdrop-blur-xl"
          >
            {/* glow hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-500/0 opacity-0 transition group-hover:opacity-100" />

            {/* light sweep */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                animate={{ x: ["-120%", "120%"] }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.12),transparent)] opacity-30"
              />
            </div>

            <div className="relative z-10">
              <div className="text-3xl font-black text-cyan-300 drop-shadow-[0_0_18px_rgba(34,211,238,0.3)]">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>

              <p className="mt-2 text-sm text-white/70">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}