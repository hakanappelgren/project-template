# Plan

Turns a clear problem into a buildable plan. Run this after `/explore`, or when you already know exactly what you want to build.

---

## Input

Pick up from wherever we are:
- The summary from an `/explore` session
- `$ARGUMENTS` describing what to build
- "Continue from our explore" — just carry on

If the problem still feels fuzzy, say so:

> "Before we plan, we should be clear on what we're solving. Either run `/explore [topic]` first, or tell me the problem in one sentence and we'll sharpen it before going further."

---

## Step 1 — Tech Lead: Research

Before any design or architecture decisions, survey the landscape:

- What existing solutions, libraries, or patterns are relevant?
- 2–3 viable approaches — plain-language pros/cons, not a spec
- Which reference architecture fits?
  - **A** — local-first (SQLite, file system, no cloud)
  - **B** — cloud-backed (Supabase, Postgres + RLS)
  - **C** — AI-powered (Anthropic or Ollama as adapter)
  - **D** — script/CLI (Python, no web UI)
- Technical risks and unknowns worth flagging

---

## Step 2 — Designer: Flows and screens

Based on the understood problem:

- What does the user actually do? (main flow, in plain steps)
- Key screens — structure in words, not wireframes
- Which components from the design system handle this?
- Anything new needed? Accessibility, dark mode, edge states?

---

## Step 3 — Architect: System design

- Select the reference architecture and note if it needs an ADR
- Data model and API shape
- Which layers are touched? (domain / application / infra / UI)
- Security tier — personal, client data, or sensitive?
- Cost model impact — does anything change?

---

## Step 4 — QA: What could go wrong

- Edge cases that didn't come up in product/design
- What's the test strategy? Unit / integration / E2E?
- Definition of done — what does "finished" actually mean?

---

## Step 5 — Written plan for approval

Produce this document. Keep it short enough to read in 2 minutes:

---

**Problem:** [one sentence]
**Solution:** [what we're building]
**Out of scope:** [explicit — don't leave this vague]

**How we'll build it:**
- Reference architecture: [A/B/C/D + reason]
- Layers touched: [which ones and what changes]
- Key technical decisions: [anything worth recording]

**First slice:** [the smallest thing that validates the approach]

**Tests to write first (TDD):**
- [failing test 1]
- [failing test 2]

**Docs to update after:** PRD / ARCHITECTURE / flows.json / ADR / SECURITY — [whichever apply]

**Still open:** [genuine unresolved questions — fine to carry some forward]

---

Then ask:

> "Does this plan work, or do you want to adjust anything before we start?"

No code written until Håkan approves.
