import Link from "next/link";
import { getProjectStates } from "@/lib/project-state";

export const dynamic = "force-dynamic";

const statusLabel: Record<string, string> = {
  concept: "Concept",
  prototype: "Prototype",
  build: "Build",
  pilot: "Pilot",
  live: "Live",
  paused: "Paused",
  archived: "Archived",
};

export default async function ProjectStatePage() {
  const projects = await getProjectStates();
  const active = projects.filter((project) => !["paused", "archived"].includes(project.status));
  const openIssues = projects.reduce((total, project) => total + project.open_issues.length, 0);
  const nextActions = projects.reduce((total, project) => total + project.next_actions.length, 0);

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Sitora Continuity</p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">Project State</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/60 md:text-base">
              One live checkpoint for strategy, implementation intent, unresolved decisions and the next action across Sitora projects.
            </p>
          </div>
          <Link
            href="/api/project-state"
            className="w-fit rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:border-cyan-300/50 hover:bg-cyan-300/10 hover:text-white"
          >
            View JSON API
          </Link>
        </div>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          <Metric label="Active projects" value={String(active.length)} />
          <Metric label="Open issues" value={String(openIssues)} />
          <Metric label="Queued next actions" value={String(nextActions)} />
        </section>

        <section className="grid gap-6">
          {projects.map((project) => (
            <article key={project.project_id} className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] shadow-2xl shadow-black/20">
              <div className="border-b border-white/10 p-6 md:p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-200">
                        {statusLabel[project.status] ?? project.status}
                      </span>
                      <span className="text-xs text-white/40">Updated {new Date(project.updated_at).toLocaleString("en-GB")}</span>
                    </div>
                    <h2 className="text-2xl font-semibold md:text-3xl">{project.name}</h2>
                    <p className="mt-3 max-w-4xl text-sm leading-6 text-white/65">{project.checkpoint_summary}</p>
                  </div>
                  {project.implementation?.branch ? (
                    <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-white/55">
                      <div className="text-white/35">Branch</div>
                      <div className="mt-1 font-mono text-white/80">{project.implementation.branch}</div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="grid gap-px bg-white/10 lg:grid-cols-3">
                <Panel title="Current state" items={project.current_state} />
                <Panel title="Next actions" items={project.next_actions} numbered />
                <Panel title="Open issues" items={project.open_issues} />
              </div>

              {project.recent_decisions.length ? (
                <div className="border-t border-white/10 p-6 md:p-8">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">Recent decisions</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    {project.recent_decisions.slice(0, 4).map((decision, index) => (
                      <div key={`${decision.date}-${index}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span className="text-xs text-white/35">{decision.date}</span>
                          <span className={`text-xs ${decision.status === "active" ? "text-emerald-300" : "text-amber-300"}`}>
                            {decision.status}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-white/80">{decision.decision}</p>
                        {decision.reason ? <p className="mt-2 text-xs leading-5 text-white/45">{decision.reason}</p> : null}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
      <div className="text-3xl font-semibold">{value}</div>
      <div className="mt-1 text-sm text-white/45">{label}</div>
    </div>
  );
}

function Panel({ title, items, numbered = false }: { title: string; items: string[]; numbered?: boolean }) {
  return (
    <div className="bg-[#080c1b] p-6 md:p-8">
      <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/45">{title}</h3>
      <div className="space-y-3">
        {items.length ? (
          items.map((item, index) => (
            <div key={`${title}-${index}`} className="flex gap-3 text-sm leading-6 text-white/70">
              <span className="mt-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-white/5 text-[10px] text-cyan-200">
                {numbered ? index + 1 : "•"}
              </span>
              <span>{item}</span>
            </div>
          ))
        ) : (
          <p className="text-sm text-white/35">None recorded.</p>
        )}
      </div>
    </div>
  );
}
