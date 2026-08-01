"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Free tools", href: "/tools/healthcare-post-ideas" },
  { label: "Apply", href: "/apply" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 lg:px-6">
      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="mx-auto max-w-7xl"
      >
        <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-black/30 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_28%,transparent_72%,rgba(34,211,238,0.08))]" />
          <div className="pointer-events-none absolute -left-10 top-0 h-24 w-24 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex items-center justify-between px-5 py-4 lg:px-7">
            <a href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.14)]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div className="leading-tight">
                <div className="text-2xl font-black tracking-tight text-white">
                  Sitora<span className="text-cyan-300"> </span>
                </div>
                <div className="text-xs text-white/50">
                  Websites that bring customers
                </div>
              </div>
            </a>

            <nav className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 lg:flex">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index }}
                  whileHover={{ y: -2 }}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-white/70 transition hover:bg-white/[0.07] hover:text-white"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="/apply"
                className="group relative hidden overflow-hidden rounded-full border border-cyan-300/20 bg-gradient-to-r from-cyan-300/20 to-blue-400/20 px-5 py-3 text-sm font-bold text-cyan-100 shadow-[0_0_30px_rgba(34,211,238,0.16)] backdrop-blur-xl lg:inline-flex"
              >
                <span className="absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.28),transparent)] opacity-0 transition duration-500 group-hover:translate-x-full group-hover:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Apply Now
                  <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </a>

              <button
                onClick={() => setOpen(!open)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white lg:hidden"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-white/10 px-5 pb-5 pt-3 lg:hidden"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-4 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}

                  <a
                    href="/apply"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-300 to-blue-400 px-5 py-3 text-sm font-bold text-black"
                  >
                    Apply Now
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </header>
  );
}
