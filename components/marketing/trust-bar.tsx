"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Users, Clock } from "lucide-react";

export function TrustBar() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Trusted by businesses",
      text: "Built for real companies",
    },
    {
      icon: Star,
      title: "Premium quality",
      text: "Modern, high-end design",
    },
    {
      icon: Users,
      title: "More enquiries",
      text: "Designed to convert",
    },
    {
      icon: Clock,
      title: "Fast turnaround",
      text: "Live in days, not weeks",
    },
  ];

  return (
    <section className="relative z-10 px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">

          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-200">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-sm font-bold text-white">
                    {item.title}
                  </p>
                  <p className="text-xs text-white/60">
                    {item.text}
                  </p>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}