"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Zap,
  Building2,
  Globe2,
  Phone,
  Mail,
  Target,
} from "lucide-react";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  businessType: string;
  hasWebsite: string;
  goals: string;
};

const initialForm: FormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  businessType: "",
  hasWebsite: "",
  goals: "",
};

const steps = [
  {
    id: 1,
    title: "Your details",
    description: "Tell us who you are",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Business info",
    description: "Tell us about the business",
    icon: Building2,
  },
  {
    id: 3,
    title: "Website status",
    description: "Where you are now",
    icon: Globe2,
  },
  {
    id: 4,
    title: "Your goals",
    description: "What you want this website to do",
    icon: Target,
  },
];

export default function ApplyPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const progress = useMemo(() => (step / steps.length) * 100, [step]);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function nextStep() {
    if (step < steps.length) setStep((prev) => prev + 1);
  }

  function prevStep() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  function validateCurrentStep() {
    if (step === 1) {
      return form.fullName.trim() && form.email.trim() && form.phone.trim();
    }
    if (step === 2) {
      return form.businessName.trim() && form.businessType.trim();
    }
    if (step === 3) {
      return form.hasWebsite.trim();
    }
    if (step === 4) {
      return form.goals.trim();
    }
    return false;
  }

  async function handleSubmit() {
    setLoading(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push("/success");
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const currentStepMeta = steps[step - 1];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-6 py-10 text-white lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,211,238,0.15),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(99,102,241,0.1),transparent_50%)]" />

        <motion.div
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute left-[10%] top-[10%] h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, -40, 0], y: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity }}
          className="absolute right-[10%] top-[20%] h-72 w-72 rounded-full bg-blue-500/20 blur-3xl"
        />

        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity }}
          className="absolute bottom-[0%] left-[35%] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl"
        />
      </div>

      <div className="absolute inset-0 opacity-[0.12]">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 backdrop-blur-xl hover:bg-white/[0.06]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to homepage
        </Link>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.06] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.5)] backdrop-blur-2xl lg:p-10"
          >
            <motion.div
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.25)]">
                <Sparkles className="h-4 w-4" />
                Free website application
              </div>

              <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                Apply in{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                  under a minute
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-white/70">
                This wizard is for serious business owners who want more trust,
                better visibility, and more enquiries.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Premium first impression",
                    text: "Your site should make your business look established immediately.",
                  },
                  {
                    icon: Zap,
                    title: "Built to convert",
                    text: "This is designed to turn visitors into real enquiries.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="group relative overflow-hidden rounded-[22px] border border-white/10 bg-[#0b1228]/80 p-5 transition"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-blue-500/0 opacity-0 transition group-hover:opacity-100" />

                    <div className="relative flex items-start gap-4">
                      <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                        <item.icon className="h-5 w-5" />
                      </div>

                      <div>
                        <h3 className="text-base font-bold">{item.title}</h3>
                        <p className="mt-2 text-sm text-white/65">{item.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                <div className="rounded-[22px] border border-amber-300/15 bg-amber-300/10 p-5 text-sm text-amber-100">
                  Limited spots available. Strong applications are prioritised first.
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#08101f]/92 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          >
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 lg:p-7">
              <div className="mb-6">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                      Step {step} of {steps.length}
                    </p>
                    <h2 className="mt-2 text-3xl font-black tracking-tight">
                      {currentStepMeta.title}
                    </h2>
                    <p className="mt-2 text-sm leading-7 text-white/65">
                      {currentStepMeta.description}
                    </p>
                  </div>

                  <div className="hidden rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-200 sm:block">
                    <currentStepMeta.icon className="h-6 w-6" />
                  </div>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 shadow-[0_0_20px_rgba(34,211,238,0.45)]"
                  />
                </div>

                <div className="mt-4 grid grid-cols-4 gap-2">
                  {steps.map((item, index) => (
                    <div
                      key={item.id}
                      className={`rounded-xl border px-3 py-3 text-center text-xs font-semibold ${
                        step >= item.id
                          ? "border-cyan-300/25 bg-cyan-300/10 text-cyan-200"
                          : "border-white/10 bg-white/[0.03] text-white/40"
                      }`}
                    >
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>

              <div className="min-h-[320px]">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          Full name
                        </span>
                        <div className="relative">
                          <Sparkles className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/60" />
                          <input
                            value={form.fullName}
                            onChange={(e) => updateField("fullName", e.target.value)}
                            placeholder="Your full name"
                            className="w-full rounded-[20px] border border-white/10 bg-[#091022] py-4 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          Email address
                        </span>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/60" />
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            placeholder="you@example.com"
                            className="w-full rounded-[20px] border border-white/10 bg-[#091022] py-4 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          Phone number
                        </span>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/60" />
                          <input
                            value={form.phone}
                            onChange={(e) => updateField("phone", e.target.value)}
                            placeholder="Your phone number"
                            className="w-full rounded-[20px] border border-white/10 bg-[#091022] py-4 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                          />
                        </div>
                      </label>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          Business name
                        </span>
                        <div className="relative">
                          <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/60" />
                          <input
                            value={form.businessName}
                            onChange={(e) => updateField("businessName", e.target.value)}
                            placeholder="Your business name"
                            className="w-full rounded-[20px] border border-white/10 bg-[#091022] py-4 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                          />
                        </div>
                      </label>

                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          Business type
                        </span>
                        <div className="relative">
                          <Target className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cyan-300/60" />
                          <input
                            value={form.businessType}
                            onChange={(e) => updateField("businessType", e.target.value)}
                            placeholder="e.g. Drapesey, plumbing, beauty salon"
                            className="w-full rounded-[20px] border border-white/10 bg-[#091022] py-4 pl-11 pr-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                          />
                        </div>
                      </label>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <span className="mb-2 block text-sm font-semibold text-white/75">
                        Do you already have a website?
                      </span>

                      <div className="grid gap-4 sm:grid-cols-2">
                        {["No", "Yes"].map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => updateField("hasWebsite", option)}
                            className={`rounded-[22px] border p-5 text-left transition ${
                              form.hasWebsite === option
                                ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.16)]"
                                : "border-white/10 bg-[#091022] text-white/75 hover:border-white/20"
                            }`}
                          >
                            <div className="text-base font-bold">{option}</div>
                            <div className="mt-2 text-sm text-white/55">
                              {option === "No"
                                ? "You are starting fresh."
                                : "You want to improve what you already have."}
                            </div>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step-4"
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -18 }}
                      transition={{ duration: 0.25 }}
                      className="space-y-4"
                    >
                      <label className="block">
                        <span className="mb-2 block text-sm font-semibold text-white/75">
                          What are your goals?
                        </span>
                        <textarea
                          value={form.goals}
                          onChange={(e) => updateField("goals", e.target.value)}
                          placeholder="Tell us what you want the website to help you achieve..."
                          rows={8}
                          className="min-h-[220px] w-full rounded-[20px] border border-white/10 bg-[#091022] px-4 py-4 text-sm outline-none placeholder:text-white/35 focus:border-cyan-300/40 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]"
                        />
                      </label>

                      <div className="rounded-[22px] border border-emerald-300/15 bg-emerald-300/10 p-5 text-sm text-emerald-100">
                        Strong applications are reviewed first. Clear business goals help.
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {errorMessage ? (
                <p className="mt-4 text-sm text-red-300">{errorMessage}</p>
              ) : null}

              <div className="mt-8 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1 || loading}
                  className="inline-flex items-center rounded-[18px] border border-white/10 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white/75 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </button>

                {step < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!validateCurrentStep() || loading}
                    className="inline-flex items-center rounded-[18px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_20px_50px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next step
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!validateCurrentStep() || loading}
                    className="inline-flex items-center rounded-[18px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 px-6 py-3 text-sm font-black text-slate-950 shadow-[0_20px_50px_rgba(34,211,238,0.28)] transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit application"}
                    {!loading && <CheckCircle2 className="ml-2 h-4 w-4" />}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}