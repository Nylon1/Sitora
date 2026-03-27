"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/section-title";
import { steps } from "@/lib/landing-data";

export function StepsSection() {
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
      <SectionTitle
        eyebrow="How it works"
        title="From application to launch in 3 simple steps"
        text="Straightforward, fast, and designed to move serious businesses from invisible to credible."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
            className="group rounded-[30px] border border-white/10 bg-white/[0.045] p-7 shadow-[0_18px_55px_rgba(0,0,0,0.28)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/25"
            style={{ transform: "perspective(1000px) rotateX(5deg)" }}
          >
            <div className="text-5xl font-black text-white/15 transition group-hover:text-cyan-300/40">{step.number}</div>
            <h3 className="mt-8 text-2xl font-bold">{step.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/70">{step.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}