"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { SectionTitle } from "@/components/ui/section-title";
import { faqs } from "@/lib/landing-data";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggleFAQ(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-24 pt-20 lg:px-10">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[15%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-[25%] h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        <SectionTitle
          eyebrow="Questions"
          title="Everything serious business owners want to know"
          text="Still got questions? Here are the answers most business owners want before they apply."
          className="mx-auto text-center"
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.45 }}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.04] shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl transition duration-300 hover:border-cyan-300/20 hover:bg-white/[0.05]"
              >
                {/* Glow */}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_30%,transparent_72%,rgba(34,211,238,0.06))]" />
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />

                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="relative z-10 flex w-full items-center justify-between gap-4 px-6 py-6 text-left sm:px-8"
                >
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">
                      {faq.q}
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.12)]">
                    {isOpen ? (
                      <Minus className="h-5 w-5" />
                    ) : (
                      <Plus className="h-5 w-5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="relative z-10 border-t border-white/10 px-6 pb-6 pt-5 sm:px-8">
                        <p className="max-w-3xl text-sm leading-8 text-white/72 sm:text-base">
                          {faq.a}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}