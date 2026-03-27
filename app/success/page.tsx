import { CheckCircle2, ArrowRight, Sparkles, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

export default function SuccessPage() {
  const whatsappHref =
    "https://wa.me/447495696364?text=Hi%20I%20just%20applied%20for%20a%20free%20website";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#040714] px-6 py-16 text-white lg:px-10">
      {/* background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[10%] h-64 w-64 rounded-full bg-cyan-400/12 blur-3xl" />
        <div className="absolute right-[10%] top-[18%] h-72 w-72 rounded-full bg-blue-500/12 blur-3xl" />
        <div className="absolute bottom-[5%] left-[35%] h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_42%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* top badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200 shadow-[0_0_28px_rgba(110,231,183,0.14)]">
          <Sparkles className="h-4 w-4" />
          Application received
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* left side */}
          <div className="rounded-[34px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:p-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/10 text-emerald-200 shadow-[0_0_32px_rgba(110,231,183,0.18)]">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl">
              You’re in.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Your application has been submitted successfully. We’ll review your
              business and contact you if you’re a fit for the current campaign.
            </p>

            <div className="mt-8 rounded-[24px] border border-cyan-300/15 bg-cyan-300/10 p-5 text-sm leading-7 text-cyan-100/90">
              Serious business owners can speed things up by messaging us on WhatsApp.
              That helps us prioritise your application faster.
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-center rounded-[20px] bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 px-6 py-4 text-base font-black text-slate-950 shadow-[0_25px_60px_rgba(34,211,238,0.32)] transition hover:scale-[1.02]"
              >
                Message on WhatsApp
                <MessageCircle className="ml-2 h-5 w-5 transition group-hover:translate-x-1" />
              </a>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-[20px] border border-white/15 bg-white/[0.05] px-6 py-4 text-base font-semibold text-white/90 transition hover:bg-white/[0.08]"
              >
                Back to homepage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* right side */}
          <div className="rounded-[34px] border border-white/10 bg-white/[0.05] p-8 shadow-[0_25px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:p-10">
            <h2 className="text-2xl font-black tracking-tight">
              What happens next
            </h2>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-white/10 bg-[#0b1228]/75 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Application review</h3>
                    <p className="mt-2 text-sm leading-7 text-white/68">
                      We review your business details and decide whether you fit the
                      current campaign.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0b1228]/75 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                    <Zap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Fast-track option</h3>
                    <p className="mt-2 text-sm leading-7 text-white/68">
                      Businesses that message us directly can often move faster into
                      the next step.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0b1228]/75 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.22)]">
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-200">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold">Next contact</h3>
                    <p className="mt-2 text-sm leading-7 text-white/68">
                      If selected, we’ll contact you with the next step and explain
                      how the process works.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-[24px] border border-amber-300/15 bg-amber-300/10 p-5 text-sm leading-7 text-amber-100/90">
              Keep an eye on your email and WhatsApp. That’s where we’ll usually contact you first.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}