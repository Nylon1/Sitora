<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sitora project continuity

Before making changes to an active Sitora project, read its current file in `project-state/projects/`.

Treat that file as the durable project checkpoint: it records the current blueprint, active decisions, open issues, and next actions. Git remains the source of truth for code; the project-state file is the source of truth for intent and continuity.

After a meaningful milestone, accepted architecture/UX decision, schema change, new blocker, or completed next action, update the relevant project-state file before finishing the work. Never silently overwrite history: mark superseded decisions as `superseded` and add the replacement decision.

If the user says `continue <project>`, read the project-state file first, then inspect recent code/commits as needed, and continue from the latest checkpoint unless the user redirects.

Run `npm run state:check` after editing project-state JSON.
