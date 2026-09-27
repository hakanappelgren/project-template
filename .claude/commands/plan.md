# /plan — Tech Design

Turns approved acceptance criteria and approved visual design into a buildable tech plan. This is Phase 4 of `/feature` — run after `/design` is approved.

---

## Before starting

Check that both exist:
- `features/[name]/acceptance-criteria.md` — confirmed by Håkan ✓
- `docs/design/[name].html` — approved by Håkan ✓

If visual design hasn't been approved yet:
> "Design needs approval before we plan the tech. Run `/design [feature]`, get Håkan's sign-off, then come back here."

---

## Step 0 — Capability risk check (before anything else)

Does this feature depend on a platform capability not already proven in this codebase? (Audio, background execution, notifications, sensors, offline, file access, real-time, third-party auth — full list in `/spike`.)

For each such capability, evidence must already exist:
- `features/[name]/research-brief.md` (or `docs/research/[topic].md`) with verdict **PROVEN**, or
- a recorded **spike result** proving it works on the real target device

**Missing or CONDITIONAL/UNKNOWN → stop.** Dispatch the researcher agent and/or run `/spike` first:
> "The plan depends on [capability] and we haven't proven it works. A plan built on an unproven assumption is a stall scheduled for later. Running technical discovery first."

A plan may never contain the phrase "should work" about a platform capability.

---

## Step 1 — Tech Lead: how does this fit?

- How does this fit the existing architecture and patterns?
- Any new libraries or dependencies? (justify each — default is no new deps)
- Which reference architecture is this touching? (A/B/C/D from ARCHITECTURE.md)
- Technical risks or unknowns worth calling out before building
- **Prior art**: has the researcher found how others build this? Reference the mechanism from the research brief — don't reinvent what a production repo already demonstrates

---

## Step 2 — DDD: bounded context and model

Answer these before touching any code:

- **Which bounded context does this belong to?** (existing context or new one?)
- **New aggregate, entity, or value object needed?** Name it in the ubiquitous language.
- **Does this change the aggregate root?** If yes, why — and is the consistency boundary still right?
- **Is this truly a domain concern, or is it infrastructure/UI?** Only domain logic goes in `domain/`.
- If introducing a new bounded context: name it, state its responsibility in one sentence, and create its directory before writing any types.

---

## Step 3 — Architect: system design

- Which layers are touched? (domain / application / infra / components / app)
- Data model changes — any schema migration needed for existing data?
- New ADR needed? (significant decision that future-you needs to understand)
- Security implications — client data, auth, API calls?
- Cost model impact — any new paid service?

---

## Step 4 — QA: test strategy

- Edge cases not already in acceptance criteria?
- Test strategy: which parts need unit / integration / E2E?
- First failing tests to write (TDD starting point)
- Definition of done — must match acceptance criteria exactly, nothing more

---

## Step 5 — Write the plan

Write to `features/[name]/plan.md`:

```markdown
# Plan — [feature name]
_Date: [today]_

## What we're building
[one sentence — the feature and what problem it solves]

## Out of scope
[explicit list — what we decided not to build]

## Capability risks
[Per platform capability this feature depends on:
**[capability]** — [PROVEN / spike result] — [mechanism, one line] — [source: research-brief / spike]
Or: "none — no new platform capabilities"]

## Domain model

**Bounded context:** [which context — or "new: [name]" if adding one]
**Aggregate root:** [which aggregate owns this change]
**New types:** [entity / value object / value type — name and brief description, or "none"]
**Ubiquitous language additions:** [new terms this feature introduces, or "none"]

## How we're building it

**Layers touched:** [list]
**Data model changes:** [yes/no — describe if yes]
**New dependencies:** [list with one-line justification, or "none"]
**Key decisions:** [anything a future reader needs to understand]
**ADR needed:** [yes/no — topic if yes]

## First slice
[The smallest thing that validates the approach and could ship alone]

## Tests to write first (TDD)
- [ ] [failing test 1 — domain logic]
- [ ] [failing test 2 — edge case]
- [ ] [failing test 3 — application use case]

## Docs to update after build
- [ ] PRD.md current state (always)
- [ ] ARCHITECTURE.md (if layers or data model changed)
- [ ] flows.json (if flow changed)
- [ ] ADR (if needed)
- [ ] SECURITY.md (if security tier changed)
```

Then:
> "Plan written to `features/[name]/plan.md`. Ready to build — or anything to adjust first?"

No code until Håkan approves.
