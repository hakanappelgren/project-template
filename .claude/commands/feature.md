# /feature — Build a Feature

## Size check first — this decides everything downstream

| Size | Examples | Who does it | Process |
|------|----------|-------------|---------|
| **Tiny** | Typo, one-liner, config | Lead, directly | Just do it — no process, no dispatch |
| **Small** | Bug fix, minor addition | Lead, directly | Describe → fix → test → commit |
| **Medium / Large** | New screen, endpoint, domain area | Lead orchestrates, agents execute | Full sequence below. No skipping. |

Dispatching agents for tiny/small work is overkill — don't. The full machinery below exists for medium/large only.

---

## The sequence

```
Phase 1:  Understand      → problem statement, for whom, why now
Phase 2:  Acceptance      → what "done" looks like in testable terms
Phase 2b: Tech discovery  → only if new platform capabilities involved
                            researcher agent + /spike               ← GATE if triggered
Phase 3:  Visual design   → designer agent → Håkan approves screens  ← GATE
Phase 4:  Tech design     → lead: architecture + layers + plan.md    ← GATE
Phase 5:  Build           → builder agent: TDD → implement → green
Phase 6:  Review          → reviewer agent, fresh context            ← GATE
Phase 7:  Close           → doc-keeper agent: living docs, archive
```

Each gate is a real stop. Move forward only on explicit approval. Never build before design is approved. Never merge before review passes.

The lead runs Phases 1, 2, 2b (dispatch), and 4 itself — understanding and architecture are never delegated. Phases 3, 5, 6, 7 are dispatched; the artifacts written in earlier phases are the dispatch payload.

---

### Phase 1 — Understand the problem

If the feature is fuzzy, open with:
> "Tell me about this feature. What problem does it solve, for whom?"

Stay in problem space — no solutions yet. One question at a time.

Produce before moving on:
- **The real problem** (not the surface request)
- **For whom** and in what situation
- **Why now** — what's the trigger
- **What it's NOT** — explicit exclusions

---

### Phase 2 — Acceptance criteria

Before screens. Before tech. What does "done" look like in observable, testable terms?

Write to: `features/[name]/acceptance-criteria.md`

```
# Acceptance criteria — [feature name]

## Must work
- [ ] [what the user sees / does when it works — specific, testable]
- [ ] [edge case 1]
- [ ] [edge case 2]

## Error states
- [ ] [what happens when X fails]

## Out of scope (explicit)
- [thing 1 not being built]
- [thing 2 not being built]
```

Don't move on until Håkan confirms this file.

---

### Phase 2b — Technical discovery (conditional)

Scan the confirmed criteria: does this feature depend on a **platform capability not already proven in this codebase**? (Audio, background execution, notifications, sensors, offline, file access, real-time, third-party auth — full list in `/spike`.)

**No → skip to Phase 3.** Most features skip this.

**Yes →**
1. Dispatch the **researcher agent**, one question per capability. Output: `features/[name]/research-brief.md` with verdict — PROVEN / CONDITIONAL / BLOCKED / UNKNOWN
2. CONDITIONAL or UNKNOWN → `/spike` on the real target device
3. BLOCKED → back to Phase 2, adjust the criteria with Håkan now — not after the mockup is approved

**GATE (when triggered): no unproven capability enters the plan.** "We can't do X" is a hypothesis until the researcher or a spike settles it — two projects stalled on unverified impossibility claims before this rule existed.

---

### Phase 3 — Visual design

Dispatch the **designer agent** (or run `/design [feature name]`). It produces `docs/design/[name].html` from the confirmed acceptance criteria and the research brief if one exists.

After it reports: "Open `docs/design/[name].html` in your browser. Tell me what to change."

Iterate until Håkan says approved. **No tech work until design is approved.**

---

### Phase 4 — Tech design

The lead runs this — architecture is never delegated down. Work from the acceptance criteria, approved design, and research brief.

**DDD first** — Which bounded context? New entity/value object/aggregate? Name things in the ubiquitous language before writing code.
**Tech Lead** — How does this fit the existing codebase? New dependencies (justify each)? Risks?
**Architect** — Layers touched. Data model changes. Layer violations to fix? ADR needed?
**QA** — Test strategy per acceptance criteria. First failing tests (TDD starting point). Definition of done.

Write to: `features/[name]/plan.md` (see `/plan` for format — including the Capability risks section).

Don't build until Håkan approves the plan.

---

### Phase 5 — Build

Dispatch the **builder agent**. Its inputs — nothing else needed:
- `features/[name]/acceptance-criteria.md`
- `features/[name]/plan.md`
- `docs/design/[name].html`
- `features/[name]/research-brief.md` (if it exists)

The builder follows TDD rules and build order defined in `.claude/agents/builder.md`. It reports back: criteria coverage, test results, deviations, deferred items.

If the builder escalates (ambiguous plan, missing input, needed dependency), the lead resolves it — with Håkan if it changes scope or architecture. Deferred tests in the report → dispatch the **test-writer agent** before review.

---

### Phase 6 — Review

Dispatch the **reviewer agent** — fresh context, by design. Give it only:
- The feature name (it runs the diff itself)
- Nothing else. **Not the build conversation, not the builder's report, not rationale.** Independence is the whole point.

Not approved → blockers in `features/[name]/review-blockers.md` → lead dispatches fixes to the builder → re-dispatch the reviewer (fresh again).
No merging over blockers. Ever.

---

### Phase 7 — Close

Dispatch the **doc-keeper agent** to run `/close-feature [name]`: PRD current state, ARCHITECTURE if changed, archive feature artifacts.

Done.
