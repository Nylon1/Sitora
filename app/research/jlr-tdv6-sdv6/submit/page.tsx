import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, ShieldCheck } from "lucide-react";
import { JlrEvidenceForm } from "@/components/research/jlr-evidence-form";

export const metadata: Metadata = {
  title: "Submit Evidence | JLR 3.0 TDV6/SDV6 Research",
  description:
    "Submit structured evidence for the Stage 2 public-interest investigation into JLR 3.0 TDV6/SDV6 catastrophic engine failures.",
};

export default function JlrEvidenceSubmissionPage() {
  return (
    <main className="min-h-screen bg-[#eef2f7] text-[#12203a]">
      <header className="border-b border-white/10 bg-[#07182d] text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <Link
            href="/research/jlr-tdv6-sdv6"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-200 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to research
          </Link>
          <a
            href="https://github.com/Nylon1/Sitora/issues/6"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-lg border border-white/15 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:bg-white/10 sm:inline-flex"
          >
            <Github className="h-4 w-4" />
            GitHub call for evidence
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0b2343] text-white">
        <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_15%_20%,rgba(218,111,66,.34),transparent_24%),radial-gradient(circle_at_85%_5%,rgba(48,105,170,.45),transparent_28%)]" />
        <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-xs font-bold tracking-[0.13em] text-[#e7b092] uppercase">
              <ShieldCheck className="h-4 w-4" />
              Stage 2 evidence intake
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.035em] md:text-6xl">
              Add your case to the public research record
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Owners, garages, engine rebuilders, engineers, warranty professionals and industry
              contributors can submit structured evidence here. The research welcomes evidence that
              supports, narrows or contradicts the current Stage 1 findings.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            ["Structured", "We collect comparable fields so cases can be de-duplicated and analysed."],
            ["Evidence-led", "A submission is a lead until documents and technical details have been checked."],
            ["Privacy-conscious", "Public reporting should be anonymised unless separate permission is given."],
          ].map(([title, body]) => (
            <div key={title} className="rounded-2xl border border-[#d7dce5] bg-white p-5">
              <p className="font-bold text-[#0d2b52]">{title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{body}</p>
            </div>
          ))}
        </div>

        <JlrEvidenceForm />
      </section>
    </main>
  );
}
