"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionTitle } from "@/components/ui/section-title";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Khan",
    business: "Plumbing",
    quote:
      "Within a week I started getting enquiries. Before this, I had nothing online. Now customers find me daily.",
  },
  {
    name: "Sarah Williams",
    business: "Beauty Salon",
    quote:
      "The website made my business look 10x more professional. Clients trust me before even speaking to me.",
  },
  {
    name: "Imran Ali",
    business: "Car Detailing",
    quote:
      "I was relying on word of mouth. Now I get leads through my website every week without chasing.",
  },
  {
    name: "David Clarke",
    business: "Electrician",
    quote:
      "Simple, clean, and effective. Customers actually message me after visiting the site.",
  },
  {
    name: "Ayesha Rahman",
    business: "Clothing Brand",
    quote:
      "This gave my brand credibility instantly. It finally feels like a real business.",
  },
  {
    name: "Mark Evans",
    business: "Flooring",
    quote:
      "Best decision I made. My competitors all had websites — now I can compete properly.",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 py-24 lg:px-10">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[15%] top-[30%] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
        className="relative z-10"
      >
        <SectionTitle
          eyebrow="Real results"
          title="Businesses already winning with their websites"
          text="These are real outcomes from businesses that went from invisible to getting enquiries."
          className="mx-auto text-center"
        />
      </motion.div>

      <div className="relative z-10 mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.5 }}
          >
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.25 }}
              className="relative h-full"
            >
              {/* glow */}
              <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/10 via-blue-500/8 to-indigo-500/10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

              <GlassCard className="group relative h-full rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.06]">
                {/* stars */}
                <div className="mb-4 flex gap-1 text-amber-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                {/* quote */}
                <p className="text-sm leading-7 text-white/75">
                  “{item.quote}”
                </p>

                {/* footer */}
                <div className="mt-6 border-t border-white/10 pt-4">
                  <p className="text-sm font-bold text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-cyan-200">
                    {item.business}
                  </p>
                </div>

                {/* glow orb */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
              </GlassCard>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}