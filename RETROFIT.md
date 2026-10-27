# Retrofit — bring an existing project onto this template

There is **one version of the process**: this template. Old and new do not live in parallel. Existing projects get retrofitted the next time they're touched — not all at once, and never as a big-bang migration.

## How to run it

Open a Claude session in the project and say:

> Read `../\_template/RETROFIT.md` and apply it to this project.

(Adjust the path — from `projects/active/[name]` the template is at `../../_template/`.)

## Steps (for the agent running this)

### 1. Enable the devteam plugin

The agents and commands are **not copied** into projects any more — they come from the `devteam` plugin (`hakanappelgren/claude-devteam`). Add the `extraKnownMarketplaces` + `enabledPlugins` blocks from `_template/.claude/settings.json` to `[project]/.claude/settings.json` (create it if missing; never touch `settings.local.json`).

Pre-commit hook: copy it too, but only if the project has `npm run lint` and `npm run typecheck`. For a non-Node project, adapt it to an equivalent cheap check (e.g. `python3 -m py_compile` + `bash -n` for a Python/shell project) and test it blocks a broken file before committing.

### 2. Remove old local copies of agents and commands

If the project has `.claude/agents/` or `.claude/commands/` copied from an older template, delete them — otherwise they shadow the plugin and drift. Diff first: any **project-specific** rule in them moves into the project's CLAUDE.md before deleting. Project-only skills/commands that never came from the template stay.

### 3. Merge CLAUDE.md — carefully

**Never overwrite the project's CLAUDE.md.** It contains project truth (stack, key files, lessons learned). Merge in only these sections from the template:

- **Session start** — read HANDOFF, check ROADMAP NOW and `features/`
- **Development sequence** (8 steps with tech discovery) — replace the old sequence block
- **The team — one lead, dispatched specialists** — new section, insert after Development sequence
- **Agent team — available commands** — replace with the template's version (it says commands are `/devteam:<name>` and come from the plugin)
- **Effort calibration** — replace with the 4-column version (adds "Who does the work"); adapt the examples to the product

Leave untouched: Stack, Key files, DDD, Layer rules, Design rules, Git rules, Testing rules, Red flags, Lessons Learned. Don't import template sections that don't fit the stack (DDD/layer/design rules are Next.js-specific).

### 4. Add the living docs, directories and gitignore entry

- `docs/ROADMAP.md` — if missing, create it in the format from `~/dev/CLAUDE.md` (frontmatter + NOW/NEXT/LATER/Done). Without it the project shows as `unclassified` in the portfolio. If the PRD has a backlog, move it here and leave a link — never keep the plan in two places.
- `docs/HANDOFF.md` — copy from the template and fill in for this session
- `features/README.md` — copy from the template
- Create `docs/research/` with a `.gitkeep`
- Add to `.gitignore`:
  ```
  # Spikes — throwaway proofs, never committed (findings go in docs/research/)
  spikes/
  ```

### 5. Backfill known capability verdicts (the valuable step)

Ask Håkan: **"Has this project ever stalled on something that 'couldn't be done'?"**

For each answer, dispatch the researcher agent to settle it properly and write `docs/research/[topic].md` with a real verdict. Past stalls are usually CONDITIONAL, not BLOCKED — a settled verdict can un-stall a parked project.

Known examples to check if relevant:

- Background audio on iOS: silent switch mutes Web Audio API but NOT `<audio>` elements; Safari tab background playback works with audio element + Media Session API; installed PWAs get suspended → escalation: Capacitor wrapper
- Background downloads: page-JS fetch gets throttled in background tabs; check mechanism used

### 6. Do NOT backfill history

Closed features stay as they are. No retroactive research briefs, no re-reviews. The new process applies from the next piece of work onward.

### 7. Verify

- `.claude/settings.json` enables `devteam@hakan-devteam`; no stale `.claude/agents/` or template-copied `.claude/commands/` left
- The pre-commit hook passes on the current code and blocks a broken file
- CLAUDE.md sequence shows 8 steps including tech discovery; commands section points to `/devteam:<name>`
- `docs/ROADMAP.md` exists and the project is no longer `unclassified` after re-running `python3 ~/Obsidian/Work/40\ Projects/portfolio/generate.py`
- Report to Håkan: what was copied, what was merged, what was skipped as not fitting the stack, what conflicts needed judgment

## Rollout policy

Retrofit **lazily**: when a project is next touched for real work, retrofit first, then start the work. Don't retrofit all ten active projects in one sitting — it front-loads effort into projects that may never be touched again.
