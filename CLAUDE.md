# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Stack

| Concern    | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 15 (App Router)                             |
| Language   | TypeScript (strict)                                 |
| Styling    | Tailwind CSS v4 + so-design-system                  |
| Backend    | _fill in_                                           |
| LLM        | _Ollama (local) / Anthropic API — see .env.example_ |
| Testing    | Vitest + Testing Library + Playwright               |
| Dev server | `npm run dev` → http://localhost:3000               |

## Dev server

Run at the start of every session:

```bash
npm run dev
```

Check `docs/HANDOFF.md` first if this is a continuation session.

## Key files

_Fill in after initial setup. 5–8 files max._

| File                   | Purpose                                                                                |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `docs/PRD.md`          | Product requirements + current state (what's built now)                                |
| `docs/ARCHITECTURE.md` | System design, cost model, ADR index                                                   |
| `docs/flow/flows.json` | Machine-readable app flows (LLM context)                                               |
| `docs/design/`         | HTML mockups — one per feature, reviewed before build                                  |
| `docs/research/`       | Research briefs + spike results — capability verdicts (permanent evidence)             |
| `features/`            | Per-feature artifacts: acceptance criteria + research brief + plan (permanent history) |
| `src/domain/`          | Business logic — test this first                                                       |
| `src/application/`     | Use cases — orchestrate domain logic                                                   |
| `src/app/page.tsx`     | Homepage                                                                               |

## DDD — Domain-Driven Design

This project is built around explicit **bounded contexts**. Each context owns its language, types, and logic.

**When adding a new domain area**, create `src/domain/[context-name]/`. Don't fold new concerns into an existing context unless they truly belong there.

**DDD vocabulary — use these terms consistently:**

| Term               | Meaning                                                        |
| ------------------ | -------------------------------------------------------------- |
| **Aggregate root** | Consistency boundary — all mutations go through it             |
| **Entity**         | Has an id, lives inside an aggregate                           |
| **Value object**   | No identity, replaced not mutated                              |
| **Value type**     | Immutable descriptor (e.g. an enum-like type)                  |
| **Domain service** | Stateless function on domain concepts                          |
| **Factory**        | Only constructor for aggregate members — assigns id + defaults |
| **Repository**     | Persistence interface for an aggregate (lives in infra/)       |

**Rules:**

- Mutations go through the aggregate root — never mutate children and sync around them
- Factories are the only constructors — don't build domain objects ad-hoc outside the domain layer
- Name the bounded context before writing domain code for a new area

## Layer rules

```
src/domain/       ← pure business logic, no framework imports — TEST FIRST (TDD)
src/application/  ← use cases, hooks, mapping types — imports domain/ only
src/infra/        ← DB, APIs, LLM adapters — no business logic, test with fakes
src/components/   ← UI only — no business logic, imports application/ + domain/
src/app/          ← Next.js pages and API routes
```

**Hard rules:**

- `domain/` never imports from any other layer — ever
- `application/` imports only `domain/` (and framework hooks like React)
- `components/` never imports from `infra/`
- Spot a violation? Fix it before adding any new code on top of it

## Session start

At the start of every continuation session:

1. Read `docs/HANDOFF.md` — last session's state and next actions
2. Check `features/` for any in-progress feature artifacts
3. Run `npm run dev` (see Dev server above)

## Development sequence

For medium / large work, follow this order. No skipping steps. No building before design is approved.

```
1. Understand       /explore or /kickoff    → problem statement, for whom, why now
2. Acceptance       /feature (Phase 2)      → features/[name]/acceptance-criteria.md
3. Tech discovery   researcher + /spike     → research-brief.md — only if new platform
                                              capabilities are involved
                                              ↑ GATE — no unproven capability enters the plan
4. Visual design    designer agent          → docs/design/[name].html
                                              ↑ GATE — Håkan approves screens
5. Tech design      /plan (lead)            → features/[name]/plan.md
                                              ↑ GATE — Håkan approves plan
6. Build            builder agent           → TDD → implement → all tests green
7. Review           reviewer agent (fresh)  → adversarial check vs acceptance criteria
                                              ↑ GATE — must pass before merge
8. Close            doc-keeper agent        → update living docs, archive artifacts
```

Discovery is two-sided: steps 1–2 from the user/functionality perspective, step 3 from the technical perspective. "We can't do X" is a hypothesis, never a verdict — it gets a researcher verdict (PROVEN / CONDITIONAL / BLOCKED / UNKNOWN) and a `/spike` on the real device if unresolved.

## The team — one lead, dispatched specialists

The **lead** is the main session (strongest model available). It talks to Håkan, holds the gates, makes architecture decisions, and dispatches work. It writes code itself only for tiny/small work. Specialists start cold — **the artifacts are the dispatch payload** (acceptance-criteria.md, research-brief.md, plan.md, design html). Full rules: `TEAM.md` in the devteam plugin.

| Agent       | Model  | Dispatched for                                           |
| ----------- | ------ | -------------------------------------------------------- |
| researcher  | sonnet | Prior art on GitHub/web, capability feasibility verdicts |
| designer    | sonnet | HTML mockups from acceptance criteria                    |
| builder     | sonnet | Implementation from approved plan + mockup               |
| test-writer | haiku  | Tests from an approved test plan                         |
| reviewer    | opus   | Pre-merge review — fresh context, diff + artifacts only  |
| doc-keeper  | haiku  | close-feature, handoff, flow-doc, standup                |

Models are aliases (tiers), never version strings — the setup survives model/plan changes untouched.

## Agent team — available commands

**The shared agents and commands come from the `devteam` plugin** (repo `hakanappelgren/claude-devteam`, enabled in `.claude/settings.json`). Type them as `/devteam:<name>`. Change them in that repo, never here — project-specific rules go in this file.

| Command                 | Purpose                                                                      |
| ----------------------- | ---------------------------------------------------------------------------- |
| `/kickoff`              | New project: full discovery → visual design → tech design → ready to build   |
| `/feature <name>`       | Build a feature: 7-phase sequence from understand to close                   |
| `/explore [topic]`      | Open-ended discovery — stay in problem space, no solutions yet               |
| `/design [name]`        | Visual design → HTML mockup in docs/design/[name].html                       |
| `/plan [name]`          | Tech design → architecture + layers + plan.md (requires capability evidence) |
| `/spike [capability]`   | Throwaway proof of a risky platform capability on the real device            |
| `/review [name]`        | Adversarial review vs acceptance criteria before merging                     |
| `/close-feature <name>` | Update living docs + archive feature artifacts after review passes           |
| `/pm [topic]`           | Deepen requirements, update PRD                                              |
| `/tech-lead [topic]`    | Research options, codebase health check, refactor                            |
| `/architect [topic]`    | Architecture decisions, write ADRs                                           |
| `/qa [topic]`           | Test plans, write E2E tests                                                  |
| `/retro`                | Sprint retrospective + update Lessons Learned                                |
| `/standup`              | Quick status: what shipped, what's next, any blockers                        |
| `/flow-doc`             | Regenerate docs/flow/ documentation                                          |
| `/handoff`              | Write session handoff before closing                                         |

## Effort calibration

Match effort to task size — don't over-engineer. **The lead classifies every incoming request against this table first**, then routes:

| Size       | Examples                                             | Process             | Who does the work                                      |
| ---------- | ---------------------------------------------------- | ------------------- | ------------------------------------------------------ |
| **Tiny**   | Typo, color change, one-liner                        | Just do it          | Lead, directly — no dispatch                           |
| **Small**  | Bug fix, add a field, minor style                    | Fix + test + commit | Lead, directly — no dispatch                           |
| **Medium** | New screen, new API endpoint                         | `/feature` process  | Lead orchestrates, agents execute                      |
| **Large**  | New domain area, new integration, new product branch | `/kickoff`-style    | Lead orchestrates, agents execute, full tech discovery |

Dispatching agents for tiny/small work is overkill — the machinery exists for medium/large only. When in doubt between small and medium, ask: does this need acceptance criteria? If yes, it's medium.

## Design rules

- Use semantic tokens everywhere: `bg-canvas`, `text-foreground`, `border-border`, etc.
- Never: `bg-white`, `text-black`, hardcoded hex values
- Dark mode required on every page (class-based, `dark` on `<html>`)
- Primary action color: `bg-brand` (#00968C) — one per screen max
- Cards: `border border-border shadow-sm rounded-lg p-5`

## Git rules

- Never commit to `main` directly
- Branch: `feature/short-name` or `fix/short-name`
- Conventional commits: `feat(scope): desc`, `fix(scope): desc`, `docs: desc`, `test: desc`
- Lint must pass (0 warnings) before every commit — it's a hard blocker
- Merge to `main` = production deploy via Vercel

## Environment variables

See `.env.example`. Copy to `.env.local` (gitignored).

| Variable            | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| `LLM_PROVIDER`      | `ollama` (default, local, free) or `anthropic`     |
| `OLLAMA_MODEL`      | Ollama model name (e.g. `llama3.2`)                |
| `ANTHROPIC_API_KEY` | Anthropic API key (only if LLM_PROVIDER=anthropic) |

## Testing rules — Claude owns this

Tests are not optional homework for later. They are part of the commit that introduces the logic.

**What to test (always):**

- `src/domain/` — every factory function and business rule. Pure functions, zero cost.
- `src/infra/` — every storage and API adapter. Use in-memory fakes or `fake-indexeddb` where needed.
- `src/application/` — any stateful logic that could silently break. Extract pure functions where possible; use `renderHook` for hooks only when the logic can't be extracted.

**What NOT to test:**

- UI components (`src/components/`) — only if they contain business logic. Not for rendering or layout.
- Styling, layout, visual appearance — zero value, high fragility.

**How to do it:**

1. Write one failing test describing the behavior before writing implementation.
2. Implement until it passes.
3. Add edge-case tests for anything surprising during implementation.
4. `npm test` must pass before every commit touching domain or application logic.

**Test file location:** `__tests__/` folder next to the file being tested. Name: `[thing].test.ts`.

**If you skip tests, say so explicitly** — don't silently omit them and call the task done.

---

## Red flags — stop and ask

- Deleting or migrating data
- Multiple valid architectural approaches — surface them, don't pick silently
- Scope that feels larger than the request
- Client data going into cloud or LLM API calls (needs consent check)
- Schema changes (check if migration needed for existing data)

---

## Lessons Learned

_Updated by `/retro`. Non-obvious rules discovered through experience._

<!-- Add lessons here as you discover them. Format:
- **YYYY-MM [title]**: What to always/never do, and why.
-->

- **2026-05 Always write the handoff**: Run `/handoff` before closing any session — even a short one. The mobile Claude Code agent starts cold and reads `HANDOFF.md` first. If it's blank, it has no context and will likely commit directly to `main` over an active feature branch, creating merge conflicts that cost more time than the handoff would have.

- **2026-05 Mobile agent must use feature branches**: When working from mobile (Claude Code agent), create a branch before any work — never commit to `main`. If `git status` shows `main` and `HANDOFF.md` is blank, stop and read HANDOFF before writing a single line of code.

- **2026-05 Migrate old patterns immediately**: When a new approach replaces an old one, migrate all existing instances in the same sprint — not later. Leaving a fallback chain as the permanent solution hides inconsistencies and makes the real state invisible. A fallback is acceptable as a one-commit deploy bridge, not as long-term architecture.

- **2026-05 Keep living docs current at session close**: `HANDOFF.md`, `ROADMAP.md`, and `ARCHITECTURE.md` must be updated when the work they describe changes — not at the next retro. A stale doc actively misleads the next session (human or agent).
