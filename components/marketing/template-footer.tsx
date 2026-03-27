"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "Apply", href: "/apply" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function TemplateFooter() {
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-white/10 bg-[#050815]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[10%] h-56 w-56 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-[10%] top-[15%] h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {/* top CTA strip */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 rounded-[30px] border border-white/10 bg-white/[0.04] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:flex lg:items-center lg:justify-between lg:p-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <Sparkles className="h-3.5 w-3.5" />
              Limited campaign
            </div>

            <h3 className="mt-4 text-2xl font-black tracking-tight sm:text-3xl">
              Ready to launch something that actually brings customers?
            </h3>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
              Apply now and get your business online with a premium-looking
              website designed to build trust and generate enquiries.
            </p>
          </div>

          <a
            href="/apply"
            className="mt-6 inline-flex items-center justify-center rounded-[18px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 px-6 py-4 text-sm font-black text-slate-950 shadow-[0_20px_50px_rgba(34,211,238,0.28)] transition hover:scale-[1.03] lg:mt-0"
          >
            Apply Now
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </motion.div>

        {/* main footer grid */}
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          {/* brand */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/10 text-cyan-200 shadow-[0_0_28px_rgba(34,211,238,0.14)]">
                <Sparkles className="h-5 w-5" />
              </div>

              <div>
                <div className="text-2xl font-black tracking-tight text-white">
                  Launch<span className="text-cyan-300">Site</span>
                </div>
                <p className="text-sm text-white/50">
                  Websites that bring customers
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">
              Premium websites for serious business owners who want more trust,
              more visibility, and more enquiries.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 text-xs font-semibold text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Built for growth-focused businesses
            </div>
          </motion.div>

          {/* company links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
              Company
            </h4>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.company.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-cyan-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* legal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
              Legal
            </h4>
            <div className="mt-5 flex flex-col gap-3">
              {footerLinks.legal.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm text-white/60 transition hover:text-cyan-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* contact */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <h4 className="text-sm font-black uppercase tracking-[0.2em] text-white/85">
              Contact
            </h4>

            <div className="mt-5 flex flex-col gap-4">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <Mail className="mt-0.5 h-4 w-4 text-cyan-300" />
                <span>hello@sitora.com</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <Phone className="mt-0.5 h-4 w-4 text-cyan-300" />
                <span>0800 772 0367</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 text-cyan-300" />
                <span>United Kingdom</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom bar */}
        <div className="flex flex-col gap-4 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Sitora. All rights reserved.</p>
          <p>Built to help business owners get online properly.</p>
        </div>
      </div>
    </footer>
  );
}