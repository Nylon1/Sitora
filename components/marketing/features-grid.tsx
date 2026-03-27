"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionTitle } from "@/components/ui/section-title";
import { features } from "@/lib/landing-data";

export function FeaturesGrid() {
  return (
    <section
      id="features"
      className="relative mx-auto max-w-7xl overflow-hidden px-6 py-20 lg:px-10"
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[10%] h-52 w-52 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-[20%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[0%] left-[35%] h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="relative z-10"
      >
        <SectionTitle
          eyebrow="Why this works"
          title="This is not just a website. It is your digital first impression."
          text="Most small businesses do not need more noise. They need a sharper online presence that makes people trust them faster and contact them sooner."
          className="mx-auto text-center"
        />
      </motion.div>

      <div className="relative z-10 mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: index * 0.08,
                duration: 0.55,
                ease: "easeOut",
              }}
            >
              <motion.div
                whileHover={{ y: -8, scale: 1.015 }}
                transition={{ duration: 0.25 }}
                className="relative h-full"
              >
                {/* card glow */}
                <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-gradient-to-br from-cyan-400/10 via-blue-500/8 to-indigo-500/10 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100" />

                <GlassCard className="group relative h-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition duration-300 hover:border-cyan-300/25 hover:bg-white/[0.055]">
                  {/* top sheen */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,transparent_72%,rgba(34,211,238,0.08))]" />

                  {/* glow orb */}
                  <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: -4, scale: 1.06 }}
                      transition={{ duration: 0.2 }}
                      className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.14)]"
                    >
                      <Icon className="h-5 w-5" />
                    </motion.div>

                    <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-white/68">
                      {item.text}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}