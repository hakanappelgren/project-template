# The agent team

One lead, five specialists. The lead is the main session — it talks to Håkan, holds the gates, dispatches work, and integrates results. Specialists start cold: **the only context that crosses to them is files.** That's why the artifact discipline (acceptance-criteria.md, plan.md, research-brief.md, design html) is non-negotiable — the artifacts ARE the dispatch payload.

## Roster

| Agent | Model | Dispatched for | Why this tier |
|-------|-------|----------------|---------------|
| **Lead** (main session) | strongest available | Discovery with Håkan, gates, dispatch, integration, architecture | Judgment lives here |
| **researcher** | sonnet | Prior art, capability feasibility (GitHub + web) | Fan-out search, evidence gathering |
| **designer** | sonnet | HTML mockups from acceptance criteria | Well-specified creative work |
| **builder** | sonnet | Implementation from approved plan + mockup | Well-specified build work |
| **test-writer** | haiku | Tests from an approved test plan | Mechanical, pattern-following |
| **reviewer** | opus | Pre-merge review, fresh context | Independence + judgment |
| **doc-keeper** | haiku | close-feature, handoff, flow-doc, standup | Mechanical doc updates |

## Model policy

Models are specified as **aliases** (`opus`, `sonnet`, `haiku`), never version strings. Roles define a capability tier; the environment supplies whatever currently fills it. If the plan/tier changes (e.g. Fable available or not), nothing here needs to change — the lead is simply "the strongest model in the main session."

## Rules of engagement

1. **The lead never writes code on medium/large work.** It dispatches the builder. (Tiny/small work: lead just does it — see effort calibration in CLAUDE.md.)
2. **Architecture is never delegated down.** The lead (with Håkan) makes architecture decisions; specialists escalate instead of improvising.
3. **The reviewer stays clean.** It never sees the build conversation, the builder's report, or the lead's rationale. Diff + artifacts only. Giving it "helpful context" destroys the one thing it's for.
4. **Specialists report in fixed formats** (defined in each agent file). The lead reads reports, not transcripts.
5. **Escalation over improvisation.** Missing input, ambiguous plan, tempting scope creep → stop and report. A specialist that guesses is worse than one that asks.
6. **Impossibility claims are hypotheses.** Any "we can't do X" gets a researcher verdict (PROVEN / CONDITIONAL / BLOCKED / UNKNOWN) and, if unresolved, a `/spike`. Two projects stalled because this rule didn't exist yet.
