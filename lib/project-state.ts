import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

export type ProjectDecision = {
  date: string;
  decision: string;
  reason?: string;
  status: "active" | "superseded";
};

export type ProjectState = {
  project_id: string;
  name: string;
  status: "concept" | "prototype" | "build" | "pilot" | "live" | "paused" | "archived";
  updated_at: string;
  updated_by?: string;
  checkpoint_summary: string;
  vision?: string;
  non_negotiables?: string[];
  architecture?: string[];
  current_state: string[];
  next_actions: string[];
  open_issues: string[];
  recent_decisions: ProjectDecision[];
  implementation?: {
    repository?: string;
    branch?: string;
    database?: string;
    deployment?: string;
  };
};

const projectsDir = path.join(process.cwd(), "project-state", "projects");

export async function getProjectStates(): Promise<ProjectState[]> {
  const files = (await readdir(projectsDir)).filter((file) => file.endsWith(".json"));
  const projects = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(path.join(projectsDir, file), "utf8");
      return JSON.parse(raw) as ProjectState;
    }),
  );

  return projects.sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at));
}

export async function getProjectState(projectId: string): Promise<ProjectState | null> {
  const projects = await getProjectStates();
  return projects.find((project) => project.project_id === projectId) ?? null;
}
