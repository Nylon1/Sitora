import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const projectsDir = path.join(root, 'project-state', 'projects');
const required = [
  'project_id',
  'name',
  'status',
  'updated_at',
  'checkpoint_summary',
  'current_state',
  'next_actions',
  'open_issues',
  'recent_decisions',
];
const statuses = new Set(['concept', 'prototype', 'build', 'pilot', 'live', 'paused', 'archived']);

let failed = false;
const files = (await readdir(projectsDir)).filter((file) => file.endsWith('.json'));

for (const file of files) {
  const fullPath = path.join(projectsDir, file);
  let state;
  try {
    state = JSON.parse(await readFile(fullPath, 'utf8'));
  } catch (error) {
    console.error(`✗ ${file}: invalid JSON (${error.message})`);
    failed = true;
    continue;
  }

  const missing = required.filter((key) => !(key in state));
  if (missing.length) {
    console.error(`✗ ${file}: missing ${missing.join(', ')}`);
    failed = true;
  }

  if (state.status && !statuses.has(state.status)) {
    console.error(`✗ ${file}: invalid status "${state.status}"`);
    failed = true;
  }

  for (const key of ['current_state', 'next_actions', 'open_issues', 'recent_decisions']) {
    if (key in state && !Array.isArray(state[key])) {
      console.error(`✗ ${file}: ${key} must be an array`);
      failed = true;
    }
  }

  if (!missing.length && statuses.has(state.status)) {
    console.log(`✓ ${file}: ${state.status} — ${state.checkpoint_summary}`);
  }
}

if (!files.length) {
  console.error('✗ No project state files found.');
  failed = true;
}

if (failed) process.exit(1);
console.log(`Checked ${files.length} project state file(s).`);
