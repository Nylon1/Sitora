# Sitora Project State

This folder is the durable source of truth for active Sitora projects.

## Why it exists
Chat memory is useful for strategy, but it is not a guaranteed production log. This layer preserves the exact project state in the repository so a new chat, coding agent, or developer can resume from the latest checkpoint.

## Rules
1. Read the relevant file in `project-state/projects/` before making project changes.
2. Treat `current_state`, `next_actions`, `open_issues`, and `recent_decisions` as the live checkpoint.
3. Update the project file after every meaningful production milestone, schema change, architecture decision, accepted UX change, or blocker.
4. Do not delete historical decisions. Mark superseded decisions with `status: "superseded"` and add the replacement decision.
5. Keep `updated_at`, `updated_by`, and `checkpoint_summary` current.
6. Code/repository state is authoritative for implementation; project-state explains intent, current status, and what happens next.

## Resume protocol
When a user says `continue <project>`:
1. Read the project's state file.
2. Check the latest relevant commits/PRs if implementation may have moved.
3. Summarise the current checkpoint in one short paragraph.
4. Continue from `next_actions[0]` unless the user redirects.

## Files
- `schema.json` — structure expected for project state files.
- `projects/*.json` — one current state file per project.

The system is deliberately simple: Git is the version history, JSON is the machine-readable state, and this README defines the workflow.
