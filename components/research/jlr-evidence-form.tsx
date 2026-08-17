"use client";

import { FormEvent, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  LockKeyhole,
  Send,
} from "lucide-react";

type FormState = {
  contributorType: string;
  contactName: string;
  email: string;
  organisation: string;
  vehicleModel: string;
  vehicleYear: string;
  registrationPartial: string;
  engineCode: string;
  engineSerialPartial: string;
  mileageAtFailure: string;
  failureDate: string;
  symptoms: string;
  diagnosis: string;
  engineProvenance: string;
  serviceHistory: string;
  repairOutcome: string;
  repairCost: string;
  warrantyOutcome: string;
  ssmReference: string;
  evidenceLinks: string;
  additionalNotes: string;
  consentToResearch: boolean;
  privacyAcknowledged: boolean;
};

const initialState: FormState = {
  contributorType: "Affected owner",
  contactName: "",
  email: "",
  organisation: "",
  vehicleModel: "",
  vehicleYear: "",
  registrationPartial: "",
  engineCode: "",
  engineSerialPartial: "",
  mileageAtFailure: "",
  failureDate: "",
  symptoms: "",
  diagnosis: "",
  engineProvenance: "Unknown",
  serviceHistory: "",
  repairOutcome: "",
  repairCost: "",
  warrantyOutcome: "",
  ssmReference: "",
  evidenceLinks: "",
  additionalNotes: "",
  consentToResearch: false,
  privacyAcknowledged: false,
};

const inputClass =
  "mt-2 w-full rounded-xl border border-[#ccd5e1] bg-white px-4 py-3 text-sm text-[#12203a] outline-none transition placeholder:text-slate-400 focus:border-[#b9623d] focus:ring-4 focus:ring-[#b9623d]/10";
const labelClass = "block text-sm font-semibold text-[#14233f]";

export function JlrEvidenceForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [reference, setReference] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setMessage("");

    try {
      const response = await fetch("/api/research/jlr-evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit evidence.");
      }

      setReference(data.referenceId || "");
      setStatus("success");
      setForm(initialState);
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to submit evidence.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7 md:p-9">
        <CheckCircle2 className="h-10 w-10 text-emerald-700" />
        <h3 className="mt-5 text-2xl font-bold text-[#10243f]">Evidence received</h3>
        <p className="mt-3 max-w-2xl leading-7 text-slate-700">
          Thank you. Your contribution has entered the Stage 2 review queue. It will not be
          treated as a verified case until the supporting material has been checked and
          de-duplicated.
        </p>
        {reference ? (
          <div className="mt-5 inline-flex rounded-full border border-emerald-300 bg-white px-4 py-2 font-mono text-sm font-bold text-emerald-800">
            Reference: {reference}
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 block text-sm font-semibold text-[#a84e2c] hover:underline"
        >
          Submit another case
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="overflow-hidden rounded-3xl border border-[#d7dce5] bg-white shadow-[0_24px_80px_rgba(15,32,58,0.08)]">
      <div className="border-b border-[#e5e8ee] bg-[#f7f9fc] px-6 py-5 md:px-8">
        <div className="flex items-start gap-4">
          <div className="rounded-xl bg-[#0d2b52] p-3 text-white">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#10243f]">Submit evidence to Stage 2</h3>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-600">
              Give us enough detail to classify and verify the case. You do not need every field.
              Please do not include a full VIN, home address, finance data or other unnecessary
              personal information.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-9 p-6 md:p-8">
        <fieldset>
          <legend className="text-xs font-bold tracking-[0.16em] text-[#a84e2c] uppercase">1. About you</legend>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>
              Contributor type *
              <select className={inputClass} value={form.contributorType} onChange={(e) => update("contributorType", e.target.value)}>
                <option>Affected owner</option>
                <option>Garage / engine specialist</option>
                <option>Engineer / researcher</option>
                <option>Warranty / insurance professional</option>
                <option>Regulator / public body</option>
                <option>Journalist</option>
                <option>Current / former industry employee</option>
                <option>Other</option>
              </select>
            </label>
            <label className={labelClass}>
              Name *
              <input className={inputClass} value={form.contactName} onChange={(e) => update("contactName", e.target.value)} required />
            </label>
            <label className={labelClass}>
              Email *
              <input type="email" className={inputClass} value={form.email} onChange={(e) => update("email", e.target.value)} required />
            </label>
            <label className={labelClass}>
              Organisation / garage
              <input className={inputClass} value={form.organisation} onChange={(e) => update("organisation", e.target.value)} />
            </label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-bold tracking-[0.16em] text-[#a84e2c] uppercase">2. Vehicle and engine</legend>
          <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <label className={labelClass}>Model<input className={inputClass} placeholder="e.g. Discovery 4" value={form.vehicleModel} onChange={(e) => update("vehicleModel", e.target.value)} /></label>
            <label className={labelClass}>Model year<input className={inputClass} placeholder="e.g. 2015" value={form.vehicleYear} onChange={(e) => update("vehicleYear", e.target.value)} /></label>
            <label className={labelClass}>Registration - partial only<input className={inputClass} placeholder="e.g. MA11 ***" value={form.registrationPartial} onChange={(e) => update("registrationPartial", e.target.value)} /></label>
            <label className={labelClass}>Engine code<input className={inputClass} placeholder="If known" value={form.engineCode} onChange={(e) => update("engineCode", e.target.value)} /></label>
            <label className={labelClass}>Engine serial - partial only<input className={inputClass} placeholder="If known" value={form.engineSerialPartial} onChange={(e) => update("engineSerialPartial", e.target.value)} /></label>
            <label className={labelClass}>Engine provenance<select className={inputClass} value={form.engineProvenance} onChange={(e) => update("engineProvenance", e.target.value)}><option>Unknown</option><option>Original engine</option><option>JLR replacement engine</option><option>JLR remanufactured engine</option><option>Independent replacement / rebuild</option></select></label>
            <label className={labelClass}>Mileage at failure<input className={inputClass} placeholder="e.g. 62,400 miles" value={form.mileageAtFailure} onChange={(e) => update("mileageAtFailure", e.target.value)} /></label>
            <label className={labelClass}>Failure date<input type="date" className={inputClass} value={form.failureDate} onChange={(e) => update("failureDate", e.target.value)} /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-bold tracking-[0.16em] text-[#a84e2c] uppercase">3. What happened</legend>
          <div className="mt-4 grid gap-5">
            <label className={labelClass}>Symptoms / evidence summary *<textarea className={`${inputClass} min-h-32`} placeholder="Knocking, oil-pressure warning, seizure, swarf, loss of power, diagnostic findings..." value={form.symptoms} onChange={(e) => update("symptoms", e.target.value)} required /></label>
            <label className={labelClass}>Confirmed diagnosis<textarea className={`${inputClass} min-h-28`} placeholder="What did the dealer, garage, engineer or teardown report actually conclude?" value={form.diagnosis} onChange={(e) => update("diagnosis", e.target.value)} /></label>
            <label className={labelClass}>Service history / oil-service context<textarea className={`${inputClass} min-h-24`} value={form.serviceHistory} onChange={(e) => update("serviceHistory", e.target.value)} /></label>
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-bold tracking-[0.16em] text-[#a84e2c] uppercase">4. Repair, warranty and documents</legend>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <label className={labelClass}>Repair outcome<textarea className={`${inputClass} min-h-24`} value={form.repairOutcome} onChange={(e) => update("repairOutcome", e.target.value)} /></label>
            <label className={labelClass}>Warranty / goodwill outcome<textarea className={`${inputClass} min-h-24`} value={form.warrantyOutcome} onChange={(e) => update("warrantyOutcome", e.target.value)} /></label>
            <label className={labelClass}>Repair / replacement cost<input className={inputClass} placeholder="e.g. £18,900 quoted" value={form.repairCost} onChange={(e) => update("repairCost", e.target.value)} /></label>
            <label className={labelClass}>SSM / technical reference<input className={inputClass} placeholder="e.g. SSM71816, SSM72578" value={form.ssmReference} onChange={(e) => update("ssmReference", e.target.value)} /></label>
            <label className={`${labelClass} md:col-span-2`}>Evidence links<textarea className={`${inputClass} min-h-24`} placeholder="Links to redacted documents, photos, videos, public posts or cloud files. Do not share publicly accessible unredacted personal documents." value={form.evidenceLinks} onChange={(e) => update("evidenceLinks", e.target.value)} /></label>
            <label className={`${labelClass} md:col-span-2`}>Anything else<textarea className={`${inputClass} min-h-24`} value={form.additionalNotes} onChange={(e) => update("additionalNotes", e.target.value)} /></label>
          </div>
        </fieldset>

        <div className="rounded-2xl border border-[#d8e1ec] bg-[#f7f9fc] p-5">
          <div className="flex gap-3">
            <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#0d2b52]" />
            <div className="space-y-4">
              <p className="text-sm leading-6 text-slate-700">
                Your contact details are for verification and follow-up. Public research should use
                anonymised case information unless you later give separate permission to identify you.
              </p>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#a84e2c]" checked={form.consentToResearch} onChange={(e) => update("consentToResearch", e.target.checked)} required />
                <span>I consent to this information being reviewed and used in the JLR Stage 2 research in anonymised form. *</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-slate-700">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-[#a84e2c]" checked={form.privacyAcknowledged} onChange={(e) => update("privacyAcknowledged", e.target.checked)} required />
                <span>I have removed unnecessary personal, financial and full-VIN information from anything I am sharing. *</span>
              </label>
            </div>
          </div>
        </div>

        {status === "error" ? (
          <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <span>{message}</span>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 border-t border-[#e5e8ee] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-slate-500">
            Submission is a research lead, not automatic verification. Cases will be checked for
            duplication, evidence quality and technical relevance before being counted in Stage 2.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#b65b35] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b65b35]/15 transition hover:bg-[#9f4929] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {status === "submitting" ? "Submitting…" : "Submit evidence"}
          </button>
        </div>
      </div>
    </form>
  );
}
