import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
      )
    : null;

const allowedStatuses = new Set([
  "new",
  "triage",
  "verification",
  "verified",
  "rejected",
  "duplicate",
  "needs-info",
]);
const allowedGrades = new Set(["A", "B", "C", "D", ""]);

function authorised(request: Request) {
  const expected = process.env.JLR_RESEARCH_ADMIN_KEY;
  const supplied = request.headers.get("x-jlr-admin-key") || "";
  return Boolean(expected && supplied && supplied === expected);
}

function unavailable() {
  return NextResponse.json(
    {
      error:
        "Evidence database is not configured. Apply EVIDENCE_INTAKE_SCHEMA.sql and confirm Supabase environment variables.",
    },
    { status: 503 },
  );
}

export async function GET(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!supabase) return unavailable();

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || "";
  const query = (searchParams.get("q") || "").trim().slice(0, 120);

  let db = supabase
    .from("jlr_evidence_submissions")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(500);

  if (status && allowedStatuses.has(status)) db = db.eq("review_status", status);
  if (query) {
    const escaped = query.replaceAll(",", " ");
    db = db.or(
      `reference_id.ilike.%${escaped}%,contact_name.ilike.%${escaped}%,email.ilike.%${escaped}%,organisation.ilike.%${escaped}%,vehicle_model.ilike.%${escaped}%,engine_code.ilike.%${escaped}%`,
    );
  }

  const { data, error } = await db;
  if (error) {
    console.error("JLR admin list error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: allRows, error: countError } = await supabase
    .from("jlr_evidence_submissions")
    .select("review_status,evidence_grade,contributor_type,engine_provenance");

  if (countError) {
    console.error("JLR admin stats error:", countError);
  }

  const rows = allRows || [];
  const counts = {
    total: rows.length,
    new: rows.filter((r) => r.review_status === "new").length,
    triage: rows.filter((r) => r.review_status === "triage").length,
    verification: rows.filter((r) => r.review_status === "verification").length,
    verified: rows.filter((r) => r.review_status === "verified").length,
    duplicate: rows.filter((r) => r.review_status === "duplicate").length,
    needsInfo: rows.filter((r) => r.review_status === "needs-info").length,
    gradeA: rows.filter((r) => r.evidence_grade === "A").length,
    gradeB: rows.filter((r) => r.evidence_grade === "B").length,
    replacementEngines: rows.filter((r) =>
      String(r.engine_provenance || "").toLowerCase().match(/replacement|remanufact/),
    ).length,
  };

  return NextResponse.json({ submissions: data || [], counts });
}

export async function PATCH(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
  }
  if (!supabase) return unavailable();

  const body = await request.json();
  const id = typeof body.id === "string" ? body.id : "";
  const reviewStatus = typeof body.reviewStatus === "string" ? body.reviewStatus : "";
  const evidenceGrade = typeof body.evidenceGrade === "string" ? body.evidenceGrade : "";
  const reviewerNotes =
    typeof body.reviewerNotes === "string" ? body.reviewerNotes.trim().slice(0, 10000) : "";
  const duplicateOf = typeof body.duplicateOf === "string" ? body.duplicateOf.trim() : "";

  if (!id || !allowedStatuses.has(reviewStatus) || !allowedGrades.has(evidenceGrade)) {
    return NextResponse.json({ error: "Invalid review update" }, { status: 400 });
  }

  const update: Record<string, unknown> = {
    review_status: reviewStatus,
    evidence_grade: evidenceGrade || null,
    reviewer_notes: reviewerNotes || null,
    reviewed_at: new Date().toISOString(),
  };

  if (reviewStatus === "duplicate") {
    update.duplicate_of = duplicateOf || null;
  } else {
    update.duplicate_of = null;
  }

  const { data, error } = await supabase
    .from("jlr_evidence_submissions")
    .update(update)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    console.error("JLR admin update error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, submission: data });
}
