# /retro — Sprint Retrospective

Run a retrospective on recent work and update project docs with learnings.

Read `git log --oneline -20`, `docs/HANDOFF.md`, `CLAUDE.md`, and `docs/PRD.md` before starting.

---

## Step 1: What went well?

Identify 3–5 things that worked well this sprint:
- Features shipped cleanly
- Tests that caught real bugs
- Decisions that proved correct
- Team processes that helped

## Step 2: What was harder than it should have been?

Identify 2–4 friction points:
- Things that took longer than expected and why
- Mistakes Claude made that had to be corrected
- Unclear requirements that caused rework
- Missing tests that led to bugs
- Patterns that felt awkward in the codebase

## Step 3: Update Lessons Learned

For each item from Step 2 that reveals a recurring pattern or rule, add it to the **Lessons Learned** section in `CLAUDE.md`. Format:

```
## Lessons Learned

- **[Date] [Short title]**: [What Claude should always/never do] because [reason].
```

Example:
```
- **2026-05 Schema changes**: Always check if existing SQLite data needs migration before changing schema. Dropping and recreating loses user data.
```

Only add lessons that are non-obvious and would prevent a future mistake. Don't add things already obvious from the code or covered by lint/types.

## Step 4: Backlog grooming

Based on what was shipped and what was learned:
- What should move to the next sprint?
- Any technical debt worth scheduling?
- Any ADRs that need updating based on what we learned?

Update `docs/ROADMAP.md` with the next sprint plan.

## Step 5: Summary

Output: "Retro complete. [N] lessons added to CLAUDE.md. ROADMAP.md updated. Ready for next sprint."
