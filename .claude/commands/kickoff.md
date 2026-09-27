# /kickoff — New Project Kickoff

From "I have an idea" to "approved plan, ready to build the first slice."

For a feature on an existing project, use `/feature [name]` instead — it's the same sequence but scoped to one feature.

---

## The sequence

```
Phase 1: Understand      → open-ended exploration, problem space only
Phase 2: Acceptance      → what does v1 success look like, in testable terms?
Phase 3: Tech discovery  → prior art + capability risks (researcher agent)
                           /spike anything unproven                ← GATE: no unproven capability enters the plan
Phase 4: Visual design   → HTML mockup for every core screen      ← GATE: Håkan approves
Phase 5: Tech design     → stack, architecture, data model        ← GATE: Håkan approves
Phase 6: Ready           → first feature sliced, ready to build
```

Discovery is two-sided: Phases 1–2 understand the problem from the **user and functionality** perspective; Phase 3 tests it from the **technical** perspective — before anything gets designed on top of an assumption.

No product code until Phase 5 is approved (spike code doesn't count — it's throwaway by contract).

---

### Phase 1 — Understand (open-ended, no agenda)

Open with:
> "Tell me about what you want to build. Doesn't need to be clear yet — just start talking."

- One question at a time, earned by what was just said
- Reflect back before asking: "So what I'm hearing is..." — then one question
- Stay in problem space — no solutions, no libraries, no tech until Phase 4
- If a solution idea surfaces, park it: "Good — let's hold that. First I want to understand why this matters."
- End when the same themes keep coming back and Håkan starts nodding instead of exploring

End-of-phase summary (produce before moving on):

**The real problem:** [one sentence — not the surface request, the underlying need]
**For whom / in what situation:** [specific]
**Why this matters now:** [what changed, what's the trigger]
**What success looks like:** [observable — how would you know it worked?]
**What it's NOT:** [1–2 explicit exclusions]
**Still open:** [genuine unresolved questions — fine to carry some forward]

---

### Phase 2 — Acceptance criteria

What does a successful v1 look like? Testable, observable, specific.

Write to: `docs/acceptance-criteria.md`

```markdown
# Acceptance criteria — v1

## Core flows
- [ ] [User can do X — specific, testable]
- [ ] [User sees Y when Z happens]
- [ ] [Edge case: what happens when...]

## Error states
- [ ] [What happens when something fails]

## Out of scope (explicit)
- [thing not being built in v1]
- [thing not being built in v1]
```

Confirm with Håkan before continuing.

---

### Phase 3 — Technical discovery

The acceptance criteria now name the capabilities this project depends on. Before designing anything on top of them:

1. **Scan the criteria for platform capabilities** — audio, background execution, notifications, sensors, offline, file access, real-time, third-party auth (full list in `/spike`)
2. **Dispatch the researcher agent** with one question per risky capability: "Has someone solved this? Find production implementations." Output: `docs/research/[topic].md` with a verdict — PROVEN / CONDITIONAL / BLOCKED / UNKNOWN
3. **Prior art for the whole product**: also ask the researcher "who has built something like this?" — existing repos and products are design input, not competition
4. **CONDITIONAL or UNKNOWN → run `/spike`** on the real target device before continuing
5. **BLOCKED → back to Phase 2**: adjust acceptance criteria now, while it costs nothing

**GATE: no unproven capability enters the plan.** Present the verdicts to Håkan — this is also where "web app vs Capacitor wrapper vs native" gets decided, on evidence.

---

### Phase 4 — Visual design

Dispatch the **designer agent** (or run `/design [project name]`). Output: `docs/design/overview.html`.

Cover all core screens. Show: default state, empty state, error state per screen. The designer reads the research verdicts — no screen may promise a capability that research marked CONDITIONAL-unresolved or BLOCKED.

After writing: "Open `docs/design/overview.html` in your browser. Tell me what to change."

Iterate until approved. **Tech design does not start until screens are approved.**

---

### Phase 5 — Tech design

Now figure out how to build it. The lead runs this — architecture is never delegated down.

**Tech Lead** — Reference architecture (A/B/C/D from ARCHITECTURE.md), key libraries, risks
**Architect** — Data model, layer structure, security tier, cost model  
**QA** — Test strategy, definition of done for v1

Ground every risky part in the research briefs and spike results from Phase 3 — the plan cites mechanisms, not hopes.

Write to: `docs/plan.md` using the same format as `/plan`.

Wait for approval.

---

### Phase 6 — Ready to build

After approval:
> "Plan approved. The first feature is [first slice from plan]. Run `/feature [first slice]` when ready."

Suggest first git commit: project scaffold only, no product code yet.
