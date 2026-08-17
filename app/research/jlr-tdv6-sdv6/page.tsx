import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Building2,
  Car,
  CheckCircle2,
  Download,
  FileSearch,
  FolderOpen,
  Gauge,
  Github,
  Globe2,
  Landmark,
  Menu,
  Mic2,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wrench,
  XCircle,
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

const navItems = [
  ["Overview", "#overview"],
  ["Findings", "#findings"],
  ["International", "#international"],
  ["Evidence", "#evidence"],
  ["Timeline", "#timeline"],
  ["Call for evidence", "#contribute"],
];

const metrics = [
  { value: "3", label: "vehicles", icon: Car },
  { value: "7", label: "engine failures", icon: Gauge },
  { value: "600+", label: "DVSA documents", icon: FolderOpen },
  { value: "68,828", label: "China recall", icon: Globe2 },
  { value: "1,338", label: "China warranty / claim cases", icon: Users },
  { value: "50→30 μm", label: "JLR tolerance change", icon: Scale },
];

const matters = [
  {
    icon: ShieldAlert,
    title: "Public safety",
    body: "Sudden catastrophic failure can interrupt motive power and create an immediate road-safety risk.",
  },
  {
    icon: Scale,
    title: "Consumer cost",
    body: "Five-figure repair costs can approach the residual value of the vehicle and expose owners to repeated loss.",
  },
  {
    icon: Gauge,
    title: "Replacement engines",
    body: "Remanufactured engines are central to the remedy, making their engineering specification a key research question.",
  },
  {
    icon: Landmark,
    title: "Regulatory scrutiny",
    body: "Different overseas recall responses raise questions about UK technical equivalence and regulatory decision-making.",
  },
];

const findings = [
  {
    title: "JLR documented crankshaft and bearing failure",
    body: "SSM72578 records crankshaft/crankshaft-bearing failure, rotation of main-bearing shells, seizure, metallic debris and severe knocking in the 3.0 TDV6.",
    status: "Primary manufacturer evidence",
  },
  {
    title: "A documented 50 μm → 30 μm engineering change",
    body: "JLR recorded a reduction in maximum crankshaft main-bearing run-out tolerance from 50 microns to 30 microns from a specified engine number.",
    status: "Primary manufacturer evidence",
  },
  {
    title: "China recalled 68,828 vehicles",
    body: "The official Chinese defect record links the recall to crankshaft assembly/manufacturing issues, bearing lubrication and premature wear, with an improved-engine remedy where risk was found.",
    status: "Primary regulator evidence",
  },
  {
    title: "South Korea intervened and later re-recalled",
    body: "South Korean authorities took recall action involving JLR diesel vehicles and later undertook re-recall activity, requiring direct comparison with UK specifications.",
    status: "Primary regulator evidence",
  },
  {
    title: "DVSA identified more than 600 potentially relevant documents",
    body: "DVSA confirmed that its responsive material includes customer communications and manufacturer information. The figure is not 600 confirmed defect cases, but it establishes a substantial regulatory record.",
    status: "Primary correspondence",
  },
  {
    title: "Replacement-engine questions remain unresolved",
    body: "JLR confirmed that a relevant replacement engine is remanufactured and that no brand-new complete assembly is available. The key question is what corrective engineering changes are incorporated.",
    status: "Primary correspondence",
  },
];

const countries = [
  {
    country: "United Kingdom",
    code: "UK",
    action: "No equivalent crank-bearing recall identified",
    scope: "DVSA holds 600+ potentially relevant documents",
    remedy: "Open question",
  },
  {
    country: "China",
    code: "CN",
    action: "Recall",
    scope: "68,828 vehicles",
    remedy: "Improved engine where risk identified",
  },
  {
    country: "South Korea",
    code: "KR",
    action: "Recall + re-recall",
    scope: "JLR diesel vehicles",
    remedy: "Further technical comparison required",
  },
  {
    country: "United States",
    code: "US",
    action: "No equivalent recall identified in Stage 1",
    scope: "JLR technical communications preserved by NHTSA",
    remedy: "No equivalent field remedy identified",
  },
  {
    country: "Canada",
    code: "CA",
    action: "Comparator only",
    scope: "Separate seizure-related engine recall",
    remedy: "Safety comparator, not defect equivalence",
  },
];

const timeline = [
  {
    vehicle: "Vehicle 1",
    events: [
      "Engine seizure / crankshaft failure",
      "Metallic swarf and internal contamination",
      "Later repeat catastrophic failure",
    ],
    count: "2+ failures",
  },
  {
    vehicle: "Vehicle 2",
    events: [
      "Bottom-end knocking",
      "Metal fragments in oil filter",
      "Warranty review referenced SSM71816",
    ],
    count: "2 failures",
  },
  {
    vehicle: "Vehicle 3",
    events: [
      "Repeated bottom-end symptoms",
      "Replacement-engine history",
      "Further catastrophic failure",
    ],
    count: "3 failures",
  },
];

const evidenceCards = [
  {
    label: "Exhibit A",
    title: "Warranty review",
    body: "Primary case material describing repeated failure, metallic contamination and a reference to SSM71816.",
    href: "https://github.com/Nylon1/Sitora/blob/main/research/jlr-tdv6-sdv6/FINDINGS.md",
  },
  {
    label: "Exhibit B",
    title: "JLR replacement-engine correspondence",
    body: "Correspondence confirming a remanufactured replacement engine and no brand-new complete assembly in the case.",
    href: "https://github.com/Nylon1/Sitora/blob/main/research/jlr-tdv6-sdv6/FINDINGS.md",
  },
  {
    label: "Exhibit C",
    title: "DVSA FOIA record",
    body: "DVSA confirmation that more than 600 documents may be relevant, including customer and manufacturer material.",
    href: "https://github.com/Nylon1/Sitora/blob/main/research/jlr-tdv6-sdv6/SOURCES.md",
  },
  {
    label: "Open record",
    title: "Stage 1 research repository",
    body: "Methodology, findings, source register, open questions and contribution guidance in a version-controlled public record.",
    href: "https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6",
  },
];

const contributionTracks = [
  { icon: Users, title: "Owners", body: "Share diagnoses, invoices, repair history, warranty decisions and replacement-engine details.", cta: "Submit evidence" },
  { icon: Wrench, title: "Garages & technicians", body: "Provide anonymised case counts, failure modes, job records, teardown photographs and repeat-failure data.", cta: "Contribute cases" },
  { icon: FileSearch, title: "Engineers & experts", body: "Peer review the technical interpretation and contribute alternative explanations, metallurgy or lubrication analysis.", cta: "Review the research" },
  { icon: Building2, title: "Regulators & industry", body: "Correct the record, explain international differences and provide the underlying engineering and field data.", cta: "Provide evidence" },
  { icon: Mic2, title: "Journalists", body: "Use the open evidence record, source register and public contribution trail for further investigation.", cta: "Open media record" },
];

const openQuestions = [
  "What is the confirmed UK failure population by engine code, production period and mileage?",
  "What engineering analysis led to the 50 μm → 30 μm run-out tolerance change?",
  "What exactly was changed in the ‘improved engine’ used as a recall remedy in China?",
  "Are the same changes present in UK service/remanufactured engines, including LR127427 where applicable?",
  "What did JLR tell DVSA about China and South Korea, and why did UK action differ?",
  "How often have JLR replacement/remanufactured engines subsequently suffered materially similar failures?",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-xs font-bold tracking-[0.22em] text-[#c56f47] uppercase">{children}</p>;
}

export default function JlrResearchPage() {
  return (
    <main className="min-h-screen bg-[#f4f7fa] text-[#0b1e36]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#06192f]/95 text-white shadow-[0_8px_30px_rgba(0,0,0,.18)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-5 px-5 py-3 lg:px-8">
          <a href="#overview" className="flex min-w-0 items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#cc7a4e]/60 bg-[#0a2441] text-[#f0a06f] shadow-inner"><Gauge className="h-5 w-5" /></div>
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold tracking-wide md:text-base">JLR 3.0 TDV6/SDV6</div>
              <div className="truncate text-xs text-slate-300">Catastrophic Engine Failures</div>
            </div>
          </a>
          <nav className="hidden items-center gap-6 text-xs font-semibold text-slate-200 xl:flex">
            {navItems.map(([label, href]) => <a key={href} href={href} className="transition hover:text-[#f0a06f]">{label}</a>)}
          </nav>
          <a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-lg border border-[#d27a4c]/70 px-4 py-2 text-xs font-bold text-white transition hover:bg-[#c56f47] sm:inline-flex"><Download className="h-4 w-4" /> Read paper</a>
          <Menu className="h-5 w-5 text-slate-300 xl:hidden" />
        </div>
      </header>

      <section id="overview" className="relative isolate overflow-hidden bg-[#06192f] text-white">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_35%,rgba(60,126,171,.28),transparent_30%),radial-gradient(circle_at_20%_10%,rgba(198,111,71,.14),transparent_26%),linear-gradient(125deg,#06192f_0%,#071d36_54%,#0a2847_100%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:56px_56px]" />
        <div className="absolute right-[-10%] top-[14%] -z-10 h-[440px] w-[440px] rounded-full border border-white/10 shadow-[0_0_120px_rgba(48,122,178,.2)]" />
        <div className="absolute right-[4%] top-[26%] -z-10 h-[270px] w-[270px] rounded-full border-[36px] border-white/[0.035]" />
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 pb-28 pt-16 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:pb-36 lg:pt-24">
          <div>
            <div className="mb-6 flex flex-wrap gap-2 text-[11px] font-bold tracking-[0.16em] uppercase">
              <span className="rounded-full border border-[#d78255]/40 bg-[#c56f47]/10 px-3 py-1.5 text-[#f3b28c]">Stage 1</span>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-slate-300">Public-interest research</span>
              <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-slate-300">Open call for evidence</span>
            </div>
            <h1 className="max-w-5xl text-5xl font-black leading-[.97] tracking-[-.045em] sm:text-6xl lg:text-7xl">JLR 3.0 TDV6/SDV6<span className="block text-slate-200">catastrophic engine failures</span></h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 lg:text-xl">A transparent research record examining repeated crankshaft and main-bearing failure, manufacturer technical knowledge, replacement engines, consumer harm and international regulatory action.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#c56f47] px-5 py-3.5 text-sm font-extrabold text-white shadow-[0_12px_35px_rgba(197,111,71,.28)] transition hover:bg-[#d47a50]"><BookOpen className="h-4 w-4" /> Read Stage 1 paper <ArrowRight className="h-4 w-4" /></a>
              <a href="https://github.com/Nylon1/Sitora/blob/main/research/jlr-tdv6-sdv6/README.md" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.05] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.1]"><FileSearch className="h-4 w-4" /> One-page overview</a>
              <a href="https://github.com/Nylon1/Sitora/issues/6" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-[#d78255]/55 px-5 py-3.5 text-sm font-bold text-[#f6d1bd] transition hover:bg-[#c56f47]/10"><Users className="h-4 w-4" /> Submit evidence</a>
            </div>
          </div>
          <aside className="self-end rounded-3xl border border-white/10 bg-white/[0.055] p-7 shadow-[0_30px_90px_rgba(0,0,0,.24)] backdrop-blur-md">
            <SectionLabel>Core research question</SectionLabel>
            <p className="mt-4 text-2xl font-bold leading-9 text-white">Was there a recurring catastrophic crankshaft/main-bearing failure mechanism within sections of this engine population; was it adequately corrected; and was the UK response proportionate compared with overseas action?</p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-slate-300"><div className="rounded-xl border border-white/10 bg-[#06192f]/40 p-4">Not a national prevalence estimate</div><div className="rounded-xl border border-white/10 bg-[#06192f]/40 p-4">Not a finding of wrongdoing</div></div>
          </aside>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-16 max-w-[1500px] px-5 lg:px-8">
        <div className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,30,50,.14)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {metrics.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex min-h-28 items-center gap-4 border-b border-r border-slate-200 p-5 last:border-r-0 sm:last:border-b-0 xl:border-b-0"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#edf3f8] text-[#0a3157]"><Icon className="h-5 w-5" /></div><div><div className="text-2xl font-black tracking-[-.03em] text-[#b7542f]">{value}</div><div className="mt-1 text-xs font-bold leading-4 text-slate-700">{label}</div></div></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8">
        <div className="grid gap-10 xl:grid-cols-[.95fr_1.05fr]">
          <div>
            <SectionLabel>Why this matters</SectionLabel>
            <h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-[#081d34] md:text-4xl">A technical issue with public consequences</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {matters.map(({ icon: Icon, title, body }) => <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_12px_35px_rgba(10,30,50,.06)]"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#edf3f8] text-[#082a4b]"><Icon className="h-5 w-5" /></div><h3 className="mt-5 text-lg font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p></article>)}
            </div>
          </div>
          <div id="findings">
            <SectionLabel>Key Stage 1 findings</SectionLabel>
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_12px_35px_rgba(10,30,50,.05)]">
              {findings.map((finding) => <article key={finding.title} className="grid gap-4 border-b border-slate-200 p-6 last:border-b-0 md:grid-cols-[42px_1fr]"><div className="grid h-9 w-9 place-items-center rounded-full bg-[#0b2b4d] text-white"><CheckCircle2 className="h-5 w-5" /></div><div><div className="flex flex-wrap items-center gap-2"><h3 className="font-extrabold text-[#0a2039]">{finding.title}</h3><span className="rounded-full bg-[#f4ebe5] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#a34d2e] uppercase">{finding.status}</span></div><p className="mt-2 text-sm leading-6 text-slate-600">{finding.body}</p></div></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="international" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8">
          <div className="max-w-3xl"><SectionLabel>International comparison</SectionLabel><h2 className="mt-3 text-3xl font-black tracking-[-.035em] md:text-4xl">Different jurisdictions, different responses</h2><p className="mt-4 text-base leading-7 text-slate-600">The comparison does not assume the vehicle populations are technically identical. It identifies the engineering and regulatory questions that Stage 2 must resolve.</p></div>
          <div className="mt-9 overflow-x-auto rounded-2xl border border-slate-200">
            <table className="min-w-[980px] w-full border-collapse text-left text-sm"><thead className="bg-[#081d34] text-white"><tr><th className="px-5 py-4 font-bold">Country</th><th className="px-5 py-4 font-bold">Regulatory action</th><th className="px-5 py-4 font-bold">Scope / signal</th><th className="px-5 py-4 font-bold">Engine remedy / question</th></tr></thead><tbody>{countries.map((row) => <tr key={row.country} className="border-t border-slate-200 odd:bg-[#f8fafc]"><td className="px-5 py-4"><div className="flex items-center gap-3 font-extrabold"><span className="grid h-8 w-10 place-items-center rounded-md border border-slate-200 bg-white text-[10px] text-slate-500">{row.code}</span>{row.country}</div></td><td className="px-5 py-4 font-semibold text-slate-800">{row.action}</td><td className="px-5 py-4 text-slate-600">{row.scope}</td><td className="px-5 py-4 text-slate-600">{row.remedy}</td></tr>)}</tbody></table>
          </div>
        </div>
      </section>

      <section id="timeline" className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"><div><SectionLabel>Case-study timeline</SectionLabel><h2 className="mt-3 text-3xl font-black tracking-[-.035em] md:text-4xl">Three vehicles. Seven engine failures.</h2></div><p className="max-w-xl text-sm leading-6 text-slate-600">The family case does not establish national prevalence. It provides a structured repeated-failure case for comparison against manufacturer and regulator records.</p></div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">{timeline.map((item, index) => <article key={item.vehicle} className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_45px_rgba(10,30,50,.06)]"><div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-[#d77b4f]/10" /><div className="flex items-center justify-between gap-4"><div><div className="text-xs font-bold tracking-[.18em] text-[#b7542f] uppercase">Case {index + 1}</div><h3 className="mt-1 text-xl font-black">{item.vehicle}</h3></div><span className="rounded-full bg-[#082947] px-3 py-1.5 text-xs font-extrabold text-white">{item.count}</span></div><div className="mt-6 space-y-0">{item.events.map((event, eventIndex) => <div key={event} className="grid grid-cols-[22px_1fr] gap-3"><div className="relative flex justify-center"><div className="mt-1.5 h-2.5 w-2.5 rounded-full bg-[#c56f47] ring-4 ring-[#f6e8df]" />{eventIndex !== item.events.length - 1 && <div className="absolute top-4 h-[calc(100%-8px)] w-px bg-slate-200" />}</div><p className="pb-5 text-sm leading-6 text-slate-600">{event}</p></div>)}</div></article>)}</div>
      </section>

      <section id="evidence" className="bg-[#071c33] text-white">
        <div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8">
          <div className="grid gap-10 xl:grid-cols-[1fr_350px]">
            <div><SectionLabel>Evidence & exhibits</SectionLabel><h2 className="mt-3 text-3xl font-black tracking-[-.035em] md:text-4xl">A public record, not a closed dossier</h2><p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">Primary records, methodology, source registers and open questions are separated from online signals and anecdotal material so readers can see the evidential weight of each claim.</p>
              <div className="mt-9 grid gap-4 md:grid-cols-2">{evidenceCards.map((card) => <a key={card.title} href={card.href} target="_blank" rel="noreferrer" className="group rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-[#d37b50]/50 hover:bg-white/[0.07]"><div className="flex items-start gap-4"><div className="grid h-14 w-12 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#0d2d4d] text-[#f1a274]"><FileSearch className="h-5 w-5" /></div><div><div className="text-[10px] font-black tracking-[.17em] text-[#e59063] uppercase">{card.label}</div><h3 className="mt-1 font-extrabold text-white">{card.title}</h3><p className="mt-2 text-sm leading-6 text-slate-300">{card.body}</p><div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#f0a06f]">View record <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></div></div></div></a>)}</div>
            </div>
            <aside className="rounded-2xl border border-[#d17a4d]/30 bg-[#0a2745] p-6 shadow-[0_20px_50px_rgba(0,0,0,.25)]"><BookOpen className="h-7 w-7 text-[#f1a274]" /><h3 className="mt-5 text-2xl font-black">Stage 1 research paper</h3><p className="mt-3 text-sm leading-6 text-slate-300">Open findings, methodology, source register, unanswered questions and structured contribution guidance.</p><a href="https://github.com/Nylon1/Sitora/tree/main/research/jlr-tdv6-sdv6" target="_blank" rel="noreferrer" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-extrabold text-[#08223d] transition hover:bg-slate-100"><Download className="h-4 w-4" /> Open full research record</a><a href="https://github.com/Nylon1/Sitora/issues/6" target="_blank" rel="noreferrer" className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/[0.06]"><Github className="h-4 w-4" /> Call for evidence</a></aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8"><div className="grid gap-10 xl:grid-cols-[.8fr_1.2fr]"><div><SectionLabel>Stage 2</SectionLabel><h2 className="mt-3 text-3xl font-black tracking-[-.035em] md:text-4xl">Questions that still need answers</h2><p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Stage 1 defines questions precisely enough that they can be answered, contradicted or narrowed with engineering data rather than opinion.</p></div><ol className="grid gap-3">{openQuestions.map((question, index) => <li key={question} className="grid grid-cols-[36px_1fr] gap-3 rounded-xl border border-slate-200 bg-white p-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#edf3f8] text-xs font-black text-[#0a3157]">{index + 1}</span><span className="self-center text-sm font-semibold leading-6 text-slate-700">{question}</span></li>)}</ol></div></section>

      <section id="contribute" className="border-t border-slate-200 bg-white"><div className="mx-auto max-w-[1500px] px-5 py-20 lg:px-8"><div className="max-w-3xl"><SectionLabel>Call for contributions</SectionLabel><h2 className="mt-3 text-3xl font-black tracking-[-.035em] md:text-4xl">Help strengthen, correct or challenge the record</h2><p className="mt-4 text-base leading-7 text-slate-600">Contrary evidence is explicitly welcome. The aim is a reproducible evidence base that can withstand scrutiny from engineers, regulators, JLR, journalists and affected motorists.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">{contributionTracks.map(({ icon: Icon, title, body, cta }) => <a key={title} href="https://github.com/Nylon1/Sitora/issues/6" target="_blank" rel="noreferrer" className="group rounded-2xl border border-slate-200 bg-[#f8fafc] p-5 transition hover:-translate-y-1 hover:border-[#d17a4d]/40 hover:bg-white hover:shadow-[0_15px_40px_rgba(10,30,50,.08)]"><div className="grid h-11 w-11 place-items-center rounded-xl bg-[#082947] text-white"><Icon className="h-5 w-5" /></div><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{body}</p><div className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#b7542f]">{cta} <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></div></a>)}</div></div></section>

      <section className="bg-[#f3eee8]"><div className="mx-auto max-w-[1500px] px-5 py-12 lg:px-8"><div className="grid gap-5 md:grid-cols-2"><div className="rounded-2xl border border-[#ddcfc3] bg-white p-6"><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#0a3157]" /><h3 className="font-extrabold">Evidence standard</h3></div><p className="mt-3 text-sm leading-6 text-slate-600">Primary manufacturer and regulator records carry the greatest evidential weight. Professional and owner material is labelled accordingly. Online repetition is treated as a research lead, not proof.</p></div><div className="rounded-2xl border border-[#ddcfc3] bg-white p-6"><div className="flex items-center gap-3"><XCircle className="h-5 w-5 text-[#a44d2e]" /><h3 className="font-extrabold">What Stage 1 does not claim</h3></div><p className="mt-3 text-sm leading-6 text-slate-600">It does not claim every engine is defective, calculate a national failure rate, establish wrongdoing, or assume that overseas and UK engine populations are technically identical.</p></div></div></div></section>

      <footer className="bg-[#06192f] text-white"><div className="mx-auto flex max-w-[1500px] flex-col gap-6 px-5 py-8 lg:px-8 xl:flex-row xl:items-center xl:justify-between"><div className="flex items-center gap-3"><div className="grid h-9 w-9 place-items-center rounded-lg border border-[#cc7a4e]/50 bg-[#0a2441] text-[#f0a06f]"><Gauge className="h-4 w-4" /></div><div><div className="text-sm font-extrabold">JLR 3.0 TDV6/SDV6</div><div className="text-xs text-slate-400">Stage 1 public-interest research</div></div></div><div className="text-xs leading-5 text-slate-400">Preliminary evidence review · Open call for contributions · Version 1.0 · 17 August 2026</div><div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-300"><a href="#findings" className="hover:text-white">Findings</a><a href="#international" className="hover:text-white">International</a><a href="#evidence" className="hover:text-white">Evidence</a><a href="#contribute" className="hover:text-white">Contribute</a></div></div></footer>
    </main>
  );
}
