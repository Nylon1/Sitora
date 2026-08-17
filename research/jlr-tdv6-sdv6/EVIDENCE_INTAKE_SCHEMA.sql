-- Stage 2 evidence-intake schema for the JLR 3.0 TDV6/SDV6 research project.
-- Apply in the Sitora Supabase project before relying on database persistence.
-- The web API has an email-delivery fallback so evidence is not lost if this table
-- has not yet been provisioned.

create table if not exists public.jlr_evidence_submissions (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  contributor_type text not null,
  contact_name text not null,
  email text not null,
  organisation text,
  vehicle_model text,
  vehicle_year text,
  registration_partial text,
  engine_code text,
  engine_serial_partial text,
  mileage_at_failure text,
  failure_date text,
  symptoms text not null,
  diagnosis text,
  engine_provenance text,
  service_history text,
  repair_outcome text,
  repair_cost text,
  warranty_outcome text,
  ssm_reference text,
  evidence_links text,
  additional_notes text,
  consent_to_research boolean not null default false,
  privacy_acknowledged boolean not null default false,
  source text not null default 'sitora-jlr-stage1-web',
  review_status text not null default 'new' check (review_status in ('new','triage','verification','verified','rejected','duplicate','needs-info')),
  evidence_grade text check (evidence_grade in ('A','B','C','D')),
  duplicate_of uuid references public.jlr_evidence_submissions(id),
  reviewer_notes text,
  submitted_at timestamptz not null default now(),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists jlr_evidence_submissions_status_idx
  on public.jlr_evidence_submissions (review_status, submitted_at desc);

create index if not exists jlr_evidence_submissions_vehicle_idx
  on public.jlr_evidence_submissions (vehicle_model, vehicle_year);

alter table public.jlr_evidence_submissions enable row level security;

-- No public SELECT/INSERT policy is intentionally defined.
-- Submissions are written server-side using the Supabase service role.
-- Public aggregate reporting should use a separate reviewed/anonymised view or API.
