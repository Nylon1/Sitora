"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Clock3 } from "lucide-react";
import { ApplyFormSection } from "@/components/marketing/apply-form-section";

const points = [
  {
    icon: ShieldCheck,
    title: "Professional from day one",
    text: "Your business gets a strong online presence that builds trust instantly.",
  },
  {
    icon: Zap,
    title: "Built to generate enquiries",
    text: "Structured to turn visitors into leads.",
  },
  {
    icon: Clock3,
    title: "Limited campaign spots",
    text: "We only take a small number of businesses.",
  },
];

export function FinalCTASection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[10%] h-64 w-64 bg-cyan-400/10 blur-3xl rounded-full" />
        <div className="absolute right-[10%] top-[20%] h-72 w-72 bg-blue-500/10 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 text-amber-300 text-sm">
            <Sparkles className="h-4 w-4" />
            Final step
          </div>

          <h2 className="mt-6 text-4xl font-black">
            Ready to stop losing customers?
          </h2>

          <p className="mt-4 text-white/70">
            If your business still has no website, you are missing enquiries every day.
          </p>

          <div className="mt-8 space-y-4">
            {points.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-4">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <div>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-white/60">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <a
            href="/apply"
            className="mt-8 inline-flex items-center bg-cyan-300 text-black px-6 py-3 rounded-xl font-bold"
          >
            Apply now <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </div>

        <ApplyFormSection />
      </div>
    </section>
  );
}