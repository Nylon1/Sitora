"use client";

import { motion } from "framer-motion";

const stripItems = [
  ["More credibility", "Look established and trustworthy from the first click."],
  ["More visibility", "Give customers somewhere real to find you online."],
  ["More enquiries", "Turn traffic and attention into actual business leads."],
];

export function BenefitsStrip() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
      <div className="grid gap-6 rounded-[34px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_25px_80px_rgba(0,0,0,0.35)] backdrop-blur-2xl lg:grid-cols-3">
        {stripItems.map(([title, text], index) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="rounded-[26px] border border-white/10 bg-[#0a1126]/80 p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25"
            style={{ transform: "perspective(1000px) rotateX(4deg)" }}
          >
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/70">{text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
