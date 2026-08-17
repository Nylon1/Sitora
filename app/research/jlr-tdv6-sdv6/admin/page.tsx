"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  FileSearch,
  KeyRound,
  RefreshCw,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";

type Submission = {
  id: string;
  reference_id: string;
  contributor_type: string;
  contact_name: string;
  email: string;
  organisation?: string | null;
  vehicle_model?: string | null;
  vehicle_year?: string | null;
  registration_partial?: string | null;
  engine_code?: string | null;
  engine_serial_partial?: string | null;
  mileage_at_failure?: string | null;
  failure_date?: string | null;
  symptoms: string;
  diagnosis?: string | null;
  engine_provenance?: string | null;
  service_history?: string | null;
  repair_outcome?: string | null;
  repair_cost?: string | null;
  warranty_outcome?: string | null;
  ssm_reference?: string | null;
  evidence_links?: string | null;
  additional_notes?: string | null;
  review_status: string;
  evidence_grade?: string | null;
  duplicate_of?: string | null;
  reviewer_notes?: string | null;
  submitted_at: string;
};

type Counts = {
  total: number;
  new: number;
  triage: number;
  verification: number;
  verified: number;
  duplicate: number;
  needsInfo: number;
  gradeA: number;
  gradeB: number;
  replacementEngines: number;
};

const statuses = ["new", "triage", "verification", "needs-info", "verified", "duplicate", "rejected"];
const grades = ["", "A", "B", "C", "D"];

export default function JlrResearchAdminPage() {
  const [adminKey, setAdminKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [counts, setCounts] = useState<Counts | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Submission | null>(null);

  async function load(key = adminKey, status = statusFilter, q = query) {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      if (status) params.set("status", status);
      if (q.trim()) params.set("q", q.trim());
      const res = await fetch(`/api/research/jlr-evidence/admin?${params.toString()}`, {
        headers: { "x-jlr-admin-key": key },
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Unable to load evidence queue");
      setSubmissions(body.submissions || []);
      setCounts(body.counts || null);
      setUnlocked(true);
      if (selected) {
        const refreshed = (body.submissions || []).find((row: Submission) => row.id === selected.id);
        if (refreshed) setSelected(refreshed);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to load evidence queue");
      if (!unlocked) setUnlocked(false);
    } finally {
      setLoading(false);
    }
  }

  async function saveReview(row: Submission, patch: Partial<Submission>) {
    setError("");
    const next = { ...row, ...patch };
    try {
      const res = await fetch("/api/research/jlr-evidence/admin", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "x-jlr-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: next.id,
          reviewStatus: next.review_status,
          evidenceGrade: next.evidence_grade || "",
          reviewerNotes: next.reviewer_notes || "",
          duplicateOf: next.duplicate_of || "",
        }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error || "Unable to save review");
      setSelected(body.submission);
      setSubmissions((current) => current.map((item) => (item.id === row.id ? body.submission : item)));
      await load(adminKey, statusFilter, query);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to save review");
    }
  }

  const statCards = useMemo(() => {
    if (!counts) return [];
    return [
      ["Total leads", counts.total, Users],
      ["New", counts.new, AlertTriangle],
      ["In verification", counts.verification, FileSearch],
      ["Verified", counts.verified, CheckCircle2],
      ["Grade A/B", counts.gradeA + counts.gradeB, ShieldCheck],
      ["Replacement engines", counts.replacementEngines, RefreshCw],
    ] as const;
  }, [counts]);

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#06192f] px-5 py-20 text-white">
        <div className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl backdrop-blur">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#c56f47]/15 text-[#f0a06f]">
            <KeyRound className="h-6 w-6" />
          </div>
          <h1 className="mt-6 text-3xl font-black tracking-tight">JLR research dashboard</h1>
          <p className="mt-3 leading-7 text-slate-300">
            Private review workspace for Stage 2 evidence triage, verification, grading and duplicate control.
          </p>
          <label className="mt-7 block text-sm font-bold text-slate-200">Admin key</label>
          <input
            type="password"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && adminKey && load(adminKey)}
            className="mt-2 w-full rounded-xl border border-white/15 bg-black/20 px-4 py-3 outline-none ring-[#c56f47] focus:ring-2"
            placeholder="Enter JLR_RESEARCH_ADMIN_KEY"
          />
          {error && <p className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p>}
          <button
            onClick={() => load(adminKey)}
            disabled={!adminKey || loading}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#c56f47] px-5 py-3 font-extrabold text-white disabled:opacity-50"
          >
            <ClipboardCheck className="h-4 w-4" /> {loading ? "Opening…" : "Open review workspace"}
          </button>
          <p className="mt-5 text-xs leading-5 text-slate-400">
            The key is sent only in request headers and is not embedded in the public application bundle.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#eef3f7] text-[#0b1e36]">
      <header className="border-b border-slate-200 bg-[#06192f] text-white">
        <div className="mx-auto flex max-w-[1550px] flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-xs font-bold tracking-[.18em] text-[#f0a06f] uppercase">Private Stage 2 workspace</p>
            <h1 className="mt-1 text-2xl font-black">JLR evidence review dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && load()}
              placeholder="Reference, owner, model, engine…"
              className="min-w-[260px] rounded-xl border border-white/10 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-slate-400"
            />
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setTimeout(() => load(adminKey, e.target.value, query), 0); }} className="rounded-xl border border-white/10 bg-[#0b2746] px-4 py-2.5 text-sm text-white">
              <option value="">All statuses</option>
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
            <button onClick={() => load()} className="inline-flex items-center gap-2 rounded-xl bg-[#c56f47] px-4 py-2.5 text-sm font-bold"><Search className="h-4 w-4" /> Search</button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1550px] px-5 py-8 lg:px-8">
        {error && <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {statCards.map(([label, value, Icon]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-[#c56f47]" /><span className="text-2xl font-black">{value}</span></div>
              <p className="mt-3 text-xs font-bold tracking-wide text-slate-500 uppercase">{label}</p>
            </div>
          ))}
        </section>

        <div className="mt-7 grid gap-6 xl:grid-cols-[.92fr_1.08fr]">
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
              <div><h2 className="font-black">Evidence queue</h2><p className="text-xs text-slate-500">{submissions.length} records shown</p></div>
              <button onClick={() => load()} className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"><RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} /></button>
            </div>
            <div className="max-h-[72vh] overflow-y-auto">
              {submissions.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">No submissions match this view.</div>
              ) : submissions.map((row) => (
                <button key={row.id} onClick={() => setSelected(row)} className={`block w-full border-b border-slate-100 p-4 text-left transition hover:bg-slate-50 ${selected?.id === row.id ? "bg-[#fff4ed]" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs font-bold text-[#a95835]">{row.reference_id}</p>
                      <p className="mt-1 font-bold">{row.vehicle_model || row.organisation || row.contributor_type}</p>
                    </div>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-600">{row.review_status}</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-600">{row.symptoms}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-500">
                    <span>{row.contributor_type}</span><span>•</span><span>{row.mileage_at_failure || "Mileage unknown"}</span><span>•</span><span>{new Date(row.submitted_at).toLocaleDateString("en-GB")}</span>
                    {row.evidence_grade && <><span>•</span><strong>Grade {row.evidence_grade}</strong></>}
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
            {!selected ? (
              <div className="grid min-h-[520px] place-items-center text-center text-slate-500"><div><FileSearch className="mx-auto h-10 w-10 text-slate-300" /><p className="mt-3 font-semibold">Select a submission to review</p></div></div>
            ) : (
              <ReviewPanel row={selected} onChange={setSelected} onSave={saveReview} />
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function ReviewPanel({ row, onChange, onSave }: { row: Submission; onChange: (row: Submission) => void; onSave: (row: Submission, patch: Partial<Submission>) => Promise<void> }) {
  const fields: Array<[string, string | null | undefined]> = [
    ["Contributor", `${row.contact_name} · ${row.email}`],
    ["Organisation", row.organisation],
    ["Vehicle", [row.vehicle_model, row.vehicle_year].filter(Boolean).join(" · ")],
    ["Registration", row.registration_partial],
    ["Engine", [row.engine_code, row.engine_serial_partial].filter(Boolean).join(" · ")],
    ["Mileage", row.mileage_at_failure],
    ["Failure date", row.failure_date],
    ["Engine provenance", row.engine_provenance],
    ["Repair cost", row.repair_cost],
    ["SSM / bulletin", row.ssm_reference],
  ];
  return (
    <div>
      <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="font-mono text-xs font-black text-[#a95835]">{row.reference_id}</p><h2 className="mt-1 text-2xl font-black">{row.vehicle_model || "Evidence submission"}</h2><p className="mt-1 text-sm text-slate-500">Submitted {new Date(row.submitted_at).toLocaleString("en-GB")}</p></div>
        <span className="rounded-full bg-[#eef3f7] px-3 py-1.5 text-xs font-bold text-slate-600">{row.contributor_type}</span>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {fields.filter(([,value]) => value).map(([label,value]) => <div key={label} className="rounded-xl bg-slate-50 p-3"><p className="text-[10px] font-black tracking-[.12em] text-slate-400 uppercase">{label}</p><p className="mt-1 text-sm font-semibold text-slate-700">{value}</p></div>)}
      </div>

      <TextBlock label="Symptoms / evidence summary" value={row.symptoms} />
      <TextBlock label="Diagnosis" value={row.diagnosis} />
      <TextBlock label="Service history" value={row.service_history} />
      <TextBlock label="Repair outcome" value={row.repair_outcome} />
      <TextBlock label="Warranty outcome" value={row.warranty_outcome} />
      <TextBlock label="Evidence links" value={row.evidence_links} />
      <TextBlock label="Additional notes" value={row.additional_notes} />

      <div className="mt-6 rounded-2xl border border-[#e4c5b4] bg-[#fff7f2] p-4">
        <h3 className="font-black text-[#7e3f25]">Research review</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-xs font-bold text-slate-600">Review status
            <select value={row.review_status} onChange={(e) => onChange({ ...row, review_status: e.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm">
              {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
            </select>
          </label>
          <label className="text-xs font-bold text-slate-600">Evidence grade
            <select value={row.evidence_grade || ""} onChange={(e) => onChange({ ...row, evidence_grade: e.target.value || null })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm">
              {grades.map((grade) => <option key={grade || "none"} value={grade}>{grade ? `Grade ${grade}` : "Not graded"}</option>)}
            </select>
          </label>
        </div>
        {row.review_status === "duplicate" && <label className="mt-4 block text-xs font-bold text-slate-600">Duplicate of submission UUID<input value={row.duplicate_of || ""} onChange={(e) => onChange({ ...row, duplicate_of: e.target.value })} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm" /></label>}
        <label className="mt-4 block text-xs font-bold text-slate-600">Reviewer notes<textarea value={row.reviewer_notes || ""} onChange={(e) => onChange({ ...row, reviewer_notes: e.target.value })} rows={5} className="mt-1 block w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm" placeholder="Verification checks, contradictions, follow-up needed, technical relevance…" /></label>
        <button onClick={() => onSave(row, row)} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0b2746] px-5 py-3 text-sm font-extrabold text-white"><ClipboardCheck className="h-4 w-4" /> Save review</button>
      </div>
    </div>
  );
}

function TextBlock({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return <div className="mt-5"><p className="text-[10px] font-black tracking-[.14em] text-slate-400 uppercase">{label}</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{value}</p></div>;
}
