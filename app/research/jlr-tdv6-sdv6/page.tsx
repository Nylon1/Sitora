import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  FileSearch,
  Github,
  Scale,
  ShieldCheck,
  Wrench,
} from "lucide-react";

export const metadata: Metadata = {
  title: "JLR 3.0 TDV6/SDV6 Engine Failures | Stage 1 Research",
  description:
    "Stage 1 public-interest research into JLR 3.0 TDV6/SDV6 catastrophic engine failures, international recalls, UK regulatory response and replacement-engine questions.",
  openGraph: {
    title: "JLR 3.0 TDV6/SDV6 Catastrophic Engine Failures",
    description:
      "Preliminary public-interest research, international regulatory comparison and open call for evidence.",
    type: "article",
  },
};

const metrics = [
  {
    value: "3",
    label: "JLR vehicles",
    note: "Primary case study",
  },
  {
    value: "7",
    label: "engine failures",
    note: "Across the three vehicles",
  },
  {
    value: "600+",
    label: "DVSA documents",
    note: "Identified as potentially relevant",
  },
  {
    value: "68,828",
    label: "vehicles recalled in China",
    note: "Official regulator record",
  },
  {
    value: "1,338",
    label: "Chinese warranty / claim cases",
    note: "Recorded in the recall file",
  },
  {
    value: "50 → 30 μm",
    label: "crankshaft run-out tolerance",
    note: "Engineering change recorded by JLR",
  },
];

const findings = [
  {
    title: "Manufacturer technical knowledge",
    body:
      "JLR SSM72578 formally documents 3.0 TDV6 crankshaft/crankshaft-bearing failure, identifies rotation of main-bearing shells and lists seizure, metallic debris, severe knocking and oil-pressure warnings.",
    status: "Primary manufacturer evidence",
  },
  {
    title: "A documented engineering change",
    body:
      "The same JLR communication records a reduction in maximum main-bearing crankshaft run-out from 50 microns to 30 microns from a specified engine number. The reason for the change and the affected population remain key Stage 2 questions.",
    status: "Primary manufacturer evidence",
  },
  {
    title: "China used an ‘improved engine’ remedy",
    body:
      "China’s official defect authority recorded a 68,828-vehicle recall linked to crankshaft assembly/manufacturing issues, insufficient bearing lubrication, premature wear and potential interruption of engine power. The remedy included free replacement with an improved engine where risk was identified.",
    status: "Primary regulator evidence",
  },
  {
    title: "South Korea also intervened",
    body:
      "South Korean authorities undertook recall action in 2018 and later re-recall activity involving JLR diesel engines. The technical equivalence of those vehicles to the UK population requires direct comparison rather than assumption.",
    status: "Primary regulator evidence",
  },
  {
    title: "DVSA holds a substantial record",
    body:
      "DVSA confirmed to the investigator that it had located more than 600 documents that may be relevant to the wider FOIA request, including customer communications and manufacturer information. This is not 600 confirmed defect cases, but it establishes a significant regulatory evidence base.",
    status: "Primary correspondence",
  },
  {
    title: "Replacement-engine questions remain",
    body:
      "JLR confirmed in correspondence that a relevant replacement engine is remanufactured and that no brand-new complete assembly is available. The unresolved question is which design improvements distinguish today’s replacement from earlier engines associated with crankshaft/bearing concerns.",
    status: "Primary correspondence",
  },
];

const openQuestions = [
  "What is the confirmed UK failure population, by engine code, production period and mileage?",
  "What engineering analysis led JLR to reduce crankshaft run-out tolerance from 50 μm to 30 μm?",
  "What exactly was changed in the ‘improved engine’ used as a recall remedy in China?",
  "Are those same changes present in UK service or remanufactured replacement engines, including LR127427 where applicable?",
  "What did JLR tell DVSA about the Chinese and South Korean recalls, and why was equivalent UK recall action not undertaken?",
  "How often have JLR replacement or remanufactured engines subsequently suffered materially similar failures?",
  "How many JLR-branded extended-warranty claims involved crankshaft/main-bearing failure, and how were inherent-defect exclusions applied?",
  "Can independent specialists provide de-duplicated, anonymised workshop data sufficient to establish a conservative minimum UK case count?",
];

const contributionTracks = [
  {
    icon: Wrench,
    title: "Engine specialists & garages",
    body:
      "Submit anonymised job counts, confirmed failure modes, original vs replacement-engine status, mileage and repeat-failure data.",
  },
  {
    icon: ShieldCheck,
    title: "Affected owners",
    body:
      "Share diagnostic reports, invoices, warranty decisions, replacement-engine information and failure chronology. Personal details should be redacted.",
  },
  {
    icon: FileSearch,
    title: "Engineers & researchers",
    body:
      "Challenge the technical hypotheses, provide engineering-change records, teardown evidence, metallurgy, lubrication analysis or alternative explanations.",
  },
  {
    icon: Scale,
    title: "Regulators & industry",
    body:
      "Correct the record, provide contrary evidence, explain international differences and disclose the data needed to resolve the open questions.",
  },
];

const evidenceRules = [
  "Primary manufacturer and regulator records carry the greatest evidential weight.",
  "Professional repair evidence is valuable but must be separated from audited prevalence data.",
  "Owner cases are strongest when supported by diagnosis, mileage, invoices and engine provenance.",
  "Forums and online repetition are treated as research leads, not proof of causation or prevalence.",
  "Contrary evidence and factual corrections are expressly invited.",
];

export default function JlrResearchPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] text-[#18231d]">
      <section className="border-b border-[#cfc9bd] bg-[#10271f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[#d5c6a3] uppercase">
              <BookOpen className="h-4 w-4" />
              Sitora Research
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-[#d8dfda]">
              <span className="rounded-full border border-white/15 px-3 py-1.5">Stage 1</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">Version 1.0</span>
              <span className="rounded-full border border-white/15 px-3 py-1.5">17 August 2026</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-[#cfc9bd] bg-[#f4f1ea]">
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#d9d3c7_1px,transparent_1px),linear-gradient(90deg,#d9d3c7_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.25fr_.75fr] lg:px-8 lg:py-28">
          <div>
            <p className="mb-5 text-sm font-semibold tracking-[0.2em] text-[#8b5b3f] uppercase">
              Preliminary public-interest investigation
            </p>
            <h1 className="max-w-5xl font-serif text-5xl leading-[1.02] font-semibold tracking-[-0.035em] text-[#122119] md:text-7xl">
              JLR 3.0 TDV6/SDV6 catastrophic engine failures
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#425048] md:text-xl">
              A transparent Stage 1 research record examining manufacturer technical knowledge,
              crankshaft and main-bearing failure, replacement engines, consumer harm and the
              difference between UK and overseas regulatory action.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#173b2e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0f2c21]"
              >
                Read the open research record <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/Nylon1/Sitora/issues/6"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#8d8a80] bg-white/60 px-5 py-3 text-sm font-semibold text-[#173b2e] transition hover:bg-white"
              >
                Contribute evidence <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          <aside className="self-end rounded-[2rem] border border-[#bfb8aa] bg-[#fffdf8]/90 p-7 shadow-[0_20px_70px_rgba(47,52,46,0.08)] backdrop-blur">
            <p className="text-xs font-bold tracking-[0.16em] text-[#8b5b3f] uppercase">Core question</p>
            <p className="mt-4 font-serif text-2xl leading-9 text-[#15251d]">
              Was there a recurring catastrophic crankshaft/main-bearing failure mechanism within
              sections of this engine population; was it adequately corrected; and was the UK
              response proportionate when compared with overseas action?
            </p>
            <div className="mt-6 border-t border-[#d9d1c4] pt-5 text-sm leading-6 text-[#5a655e]">
              This research does not claim that every engine is defective, establish a national
              failure rate or make a finding of legal liability or regulatory wrongdoing.
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-[#cfc9bd] bg-[#ebe6db]">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[#c7c0b4] bg-[#c7c0b4] sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-[#f8f5ee] p-6">
                <div className="font-serif text-4xl font-semibold tracking-[-0.03em] text-[#173b2e]">
                  {metric.value}
                </div>
                <div className="mt-2 text-sm font-bold text-[#24342b]">{metric.label}</div>
                <div className="mt-1 text-xs leading-5 text-[#6a716d]">{metric.note}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[#8b5b3f] uppercase">Stage 1 findings</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight font-semibold tracking-[-0.025em] text-[#122119]">
              What is established so far
            </h2>
            <p className="mt-5 max-w-md leading-7 text-[#58635d]">
              The research separates verified documentary findings from professional corroboration,
              open-source signals and questions that remain unresolved.
            </p>
          </div>
          <div className="space-y-5">
            {findings.map((finding, index) => (
              <article key={finding.title} className="rounded-2xl border border-[#d2ccbf] bg-[#fffdf8] p-6 md:p-7">
                <div className="flex gap-5">
                  <span className="font-serif text-2xl text-[#aa7657]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-[#7d725f] uppercase">{finding.status}</p>
                    <h3 className="mt-2 text-xl font-bold text-[#173228]">{finding.title}</h3>
                    <p className="mt-3 leading-7 text-[#515e56]">{finding.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#12271f] text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr]">
            <div>
              <p className="text-sm font-semibold tracking-[0.18em] text-[#d1b88d] uppercase">Open questions</p>
              <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.025em]">What Stage 2 must resolve</h2>
              <p className="mt-5 max-w-md leading-7 text-[#cbd7d0]">
                These questions are deliberately framed so they can be answered, contradicted or
                narrowed using engineering records, regulator correspondence and structured case data.
              </p>
            </div>
            <ol className="grid gap-3">
              {openQuestions.map((question, index) => (
                <li key={question} className="grid grid-cols-[2.25rem_1fr] gap-3 rounded-xl border border-white/10 bg-white/[0.045] p-4">
                  <span className="font-serif text-lg text-[#d6bd91]">{index + 1}</span>
                  <span className="leading-7 text-[#eef3f0]">{question}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold tracking-[0.18em] text-[#8b5b3f] uppercase">Open research</p>
          <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.025em] text-[#122119]">
            Help strengthen, correct or challenge the record
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#58635d]">
            The objective is not to collect the largest number of allegations. It is to build a
            reproducible evidence base that can withstand scrutiny from engineers, regulators,
            manufacturers, journalists and affected motorists.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {contributionTracks.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-[#d2ccbf] bg-[#fffdf8] p-6">
              <Icon className="h-6 w-6 text-[#8b5b3f]" />
              <h3 className="mt-5 text-xl font-bold text-[#173228]">{title}</h3>
              <p className="mt-3 leading-7 text-[#58635d]">{body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://github.com/Nylon1/Sitora/issues/6"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#173b2e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0f2c21]"
          >
            Open the call for evidence <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="https://github.com/Nylon1/Sitora/blob/main/research/jlr-tdv6-sdv6/EVIDENCE_SUBMISSION_TEMPLATE.md"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#9e998d] bg-white px-5 py-3 text-sm font-semibold text-[#173b2e] hover:bg-[#f7f3ea]"
          >
            Evidence submission template <FileSearch className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="border-y border-[#cfc9bd] bg-[#e7e1d5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-[#8b5b3f] uppercase">Research standard</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#122119]">How evidence is weighted</h2>
          </div>
          <ul className="space-y-3">
            {evidenceRules.map((rule) => (
              <li key={rule} className="flex gap-3 leading-7 text-[#4b5851]">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#9b6a4d]" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="rounded-[2rem] border border-[#bdb5a8] bg-[#fffdf8] p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold tracking-[0.18em] text-[#8b5b3f] uppercase">Transparent source record</p>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#122119]">
                The full research record is version-controlled on GitHub
              </h2>
              <p className="mt-4 leading-7 text-[#58635d]">
                Read the methodology, detailed findings, source register, contribution guidance and
                open Stage 2 research questions. Changes can be reviewed through Git history and pull requests.
              </p>
            </div>
            <a
              href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#173b2e] px-5 py-3 text-sm font-semibold text-[#173b2e] hover:bg-[#173b2e] hover:text-white"
            >
              View repository <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#cfc9bd] bg-[#10271f] text-[#cbd5cf]">
        <div className="mx-auto max-w-7xl px-6 py-8 text-sm leading-6 lg:px-8">
          <p className="font-semibold text-white">Stage 1 research status</p>
          <p className="mt-1 max-w-4xl">
            Preliminary public-interest research. Not a final determination of defect prevalence,
            engineering causation, legal liability or regulatory failure. Evidence that corrects or
            contradicts the current record is expressly welcome.
          </p>
        </div>
      </footer>
    </main>
  );
}
