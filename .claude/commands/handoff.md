# /handoff — Session Handoff

Write a handoff document to `docs/HANDOFF.md` so the next Claude session can pick up exactly where this one left off.

Gather context from:
- `git log --oneline -10` (recent commits)
- `git status` and `git diff --stat HEAD` (current state)
- `docs/PRD.md` (product context)
- Current task list if tracked in this session
- This conversation (what was worked on, decisions made, issues hit)

Write `docs/HANDOFF.md` with this structure:

---

# Session Handoff

**Date:** [today's date]
**Branch:** [current branch]
**Session summary:** [1–2 sentences: what was the goal of this session]

## Status

**Completed this session:**
- [list of what was finished]

**In progress / partially done:**
- [what's started but not finished, with specific file/state]

**Not started yet:**
- [what's planned but untouched]

## Current state

**Tests:** [passing / failing — which ones if failing]
**Lint:** [clean / issues — what if issues]
**Build:** [verified / unverified]

## Decisions made

[Any architectural or product decisions made this session that aren't captured in ADRs yet]

## Open questions

[Things that need Håkan's input or are unresolved]

## Next actions

1. [First thing the next session should do]
2. [Second thing]
3. [...]

## Context files to read first

- `docs/HANDOFF.md` (this file)
- `docs/PRD.md` (product context)
- `CLAUDE.md` (project rules)
- [any other specific files relevant to the next session]

---

After writing the file, confirm: "Handoff written to docs/HANDOFF.md — safe to end session."
