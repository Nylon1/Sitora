import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
    : null;

function clean(value: unknown, max = 4000) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function referenceId() {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const suffix = crypto.randomUUID().slice(0, 8).toUpperCase();
  return `JLR-${date}-${suffix}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const submission = {
      reference_id: referenceId(),
      contributor_type: clean(body.contributorType, 80),
      contact_name: clean(body.contactName, 160),
      email: clean(body.email, 240).toLowerCase(),
      organisation: clean(body.organisation, 200),
      vehicle_model: clean(body.vehicleModel, 160),
      vehicle_year: clean(body.vehicleYear, 20),
      registration_partial: clean(body.registrationPartial, 30),
      engine_code: clean(body.engineCode, 80),
      engine_serial_partial: clean(body.engineSerialPartial, 100),
      mileage_at_failure: clean(body.mileageAtFailure, 40),
      failure_date: clean(body.failureDate, 40),
      symptoms: clean(body.symptoms, 5000),
      diagnosis: clean(body.diagnosis, 5000),
      engine_provenance: clean(body.engineProvenance, 120),
      service_history: clean(body.serviceHistory, 2500),
      repair_outcome: clean(body.repairOutcome, 3000),
      repair_cost: clean(body.repairCost, 80),
      warranty_outcome: clean(body.warrantyOutcome, 2500),
      ssm_reference: clean(body.ssmReference, 250),
      evidence_links: clean(body.evidenceLinks, 3000),
      additional_notes: clean(body.additionalNotes, 5000),
      consent_to_research: body.consentToResearch === true,
      privacy_acknowledged: body.privacyAcknowledged === true,
      submitted_at: new Date().toISOString(),
      source: "sitora-jlr-stage1-web",
    };

    const required: Array<[string, string]> = [
      ["contributor type", submission.contributor_type],
      ["name", submission.contact_name],
      ["email", submission.email],
      ["failure symptoms / evidence summary", submission.symptoms],
    ];

    for (const [label, value] of required) {
      if (!value) {
        return NextResponse.json(
          { error: `Please provide ${label}.` },
          { status: 400 },
        );
      }
    }

    if (!isValidEmail(submission.email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 },
      );
    }

    if (!submission.consent_to_research || !submission.privacy_acknowledged) {
      return NextResponse.json(
        { error: "Research consent and privacy acknowledgement are required." },
        { status: 400 },
      );
    }

    let stored = false;
    let emailed = false;

    if (supabase) {
      const { error } = await supabase
        .from("jlr_evidence_submissions")
        .insert([submission]);

      if (!error) {
        stored = true;
      } else {
        console.error("JLR evidence Supabase insert error:", error);
      }
    }

    if (resend) {
      try {
        const rows = Object.entries(submission)
          .filter(([key]) => !["consent_to_research", "privacy_acknowledged"].includes(key))
          .map(
            ([key, value]) =>
              `<tr><td style="padding:6px 10px;border-bottom:1px solid #ddd"><strong>${escapeHtml(key.replaceAll("_", " "))}</strong></td><td style="padding:6px 10px;border-bottom:1px solid #ddd">${escapeHtml(String(value || "—"))}</td></tr>`,
          )
          .join("");

        await resend.emails.send({
          from: "Sitora Research <onboarding@resend.dev>",
          to: [process.env.JLR_RESEARCH_INBOX || "hmaliks924@gmail.com"],
          replyTo: submission.email,
          subject: `JLR evidence submission ${submission.reference_id}`,
          html: `
            <h2>New JLR Stage 1 evidence submission</h2>
            <p><strong>Reference:</strong> ${escapeHtml(submission.reference_id)}</p>
            <p>This submission has consent to be used in the research in anonymised form. Personal identifiers should not be published without separate permission.</p>
            <table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:14px">${rows}</table>
          `,
        });
        emailed = true;
      } catch (emailError) {
        console.error("JLR evidence Resend error:", emailError);
      }
    }

    if (!stored && !emailed) {
      return NextResponse.json(
        {
          error:
            "The evidence service is temporarily unavailable. Please use the public GitHub call-for-evidence link instead.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({
      success: true,
      referenceId: submission.reference_id,
      stored,
    });
  } catch (error) {
    console.error("JLR evidence route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
