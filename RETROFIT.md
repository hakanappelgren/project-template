# Retrofit — bring an existing project onto this template

There is **one version of the process**: this template. Old and new do not live in parallel. Existing projects get retrofitted the next time they're touched — not all at once, and never as a big-bang migration.

## How to run it

Open a Claude session in the project and say:

> Read `../\_template/RETROFIT.md` and apply it to this project.

(Adjust the path — from `projects/active/[name]` the template is at `../../_template/`.)

## Steps (for the agent running this)

### 1. Copy the agent team

Copy `_template/.claude/agents/` → `[project]/.claude/agents/` wholesale. These are project-independent; overwrite is safe.

### 2. Sync the commands

Copy from `_template/.claude/commands/` → `[project]/.claude/commands/`:

- `spike.md` — new, copy as-is
- `kickoff.md`, `feature.md`, `plan.md`, `review.md` — replace, **unless** the project's copy has project-specific edits (diff first; if edited, merge the new phases in rather than overwriting)
- All others — replace with template versions if the project's copies are unmodified

### 3. Merge CLAUDE.md — carefully

**Never overwrite the project's CLAUDE.md.** It contains project truth (stack, key files, lessons learned). Merge in only these sections from the template:

- **Development sequence** (now 8 steps with tech discovery) — replace the old sequence block
- **The team — one lead, dispatched specialists** — new section, insert after Development sequence
- **Agent team — available commands** — add the `/spike` row
- **Effort calibration** — replace with the 4-column version (adds "Who does the work")

Leave untouched: Stack, Key files, DDD, Layer rules, Design rules, Git rules, Testing rules, Red flags, Lessons Learned.

### 4. Add the new directories and gitignore entry

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

- `.claude/agents/` has 6 agent files + README
- `/spike` appears in the project's command list and CLAUDE.md
- CLAUDE.md sequence shows 8 steps including tech discovery
- Report to Håkan: what was copied, what was merged, what conflicts needed judgment

## Rollout policy

Retrofit **lazily**: when a project is next touched for real work, retrofit first, then start the work. Don't retrofit all ten active projects in one sitting — it front-loads effort into projects that may never be touched again.
