# Private Stage 2 evidence dashboard

The private evidence-review workspace is available at:

`/research/jlr-tdv6-sdv6/admin`

It is intentionally not linked from the public research page.

## Required environment variable

Set a long random deployment secret:

`JLR_RESEARCH_ADMIN_KEY=<strong-random-value>`

The browser prompts the authorised reviewer for this key and sends it only in the `x-jlr-admin-key` request header to the private admin API. The key is not committed to the repository.

The existing evidence API/database also requires:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY` (for email fallback/intake notifications)
- optional `JLR_RESEARCH_INBOX`

## Database prerequisite

Apply `research/jlr-tdv6-sdv6/EVIDENCE_INTAKE_SCHEMA.sql` to the Sitora Supabase project before relying on the dashboard. The public intake form can fall back to email delivery, but the dashboard requires the `jlr_evidence_submissions` table.

## Review workflow

1. **new** — received, not assessed.
2. **triage** — basic relevance and identity/vehicle checks underway.
3. **verification** — documentary or technical evidence being checked.
4. **needs-info** — potentially relevant but insufficient; contributor follow-up required.
5. **verified** — sufficiently supported for inclusion in the reviewed Stage 2 dataset.
6. **duplicate** — same vehicle/failure already represented elsewhere.
7. **rejected** — outside scope, unverifiable, spam or otherwise unsuitable.

## Evidence grades

- **A** — primary manufacturer/regulator/warranty/repair documentation with strong provenance.
- **B** — corroborated professional/technical evidence or a well-documented case with multiple independent records.
- **C** — structured owner evidence with useful supporting material but incomplete independent verification.
- **D** — indicative lead, anecdote or open-source signal; useful for investigation but not suitable for prevalence calculations.

A status of `verified` and a grade are separate judgements. A record should not be counted in public Stage 2 statistics merely because it has been submitted.

## Dashboard functions

The dashboard currently provides:

- searchable evidence queue;
- status filtering;
- aggregate queue counters;
- full structured submission review;
- reviewer notes;
- A-D grading;
- duplicate marking;
- replacement/remanufactured-engine signal count;
- verified-case count.

## Publication rule

No personal email, name, partial registration, serial information or free-text identifying material should be exposed through a future public analytics endpoint. Public reporting should be produced from a separate reviewed/anonymised view or aggregate API.
