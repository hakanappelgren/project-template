# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Stack

| Concern    | Choice                                              |
| ---------- | --------------------------------------------------- |
| Framework  | Next.js 16 (App Router)                             |
| Language   | TypeScript (strict)                                 |
| Styling    | Tailwind CSS v4 + so-design-system                  |
| Backend    | _fill in_                                           |
| LLM        | _Ollama (local) / Anthropic API — see .env.example_ |
| Testing    | Vitest + Testing Library + Playwright               |
| Dev server | `npm run dev` → http://localhost:3410               |

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

## Process

The team, agents, commands and the gated feature sequence come from the **devteam plugin** (`/devteam:feature`, `/devteam:kickoff`, `/devteam:handoff` …). Rules: the plugin's `TEAM.md`; sequence and size check: its `commands/feature.md`. Don't restate them here — this file holds only what is specific to this project.

- **Check it loaded:** at session start the skills list must contain `devteam:*` entries. If it doesn't, tell Håkan before any work — the session would run without the process. Fix: `claude plugin install devteam@hakan-devteam --scope user`, then a new session.
- **Size:** tiny/small → the lead does it directly (fix + test + commit). Medium/large → `/devteam:feature`. Does it need acceptance criteria? Then it's medium.
- **Håkan's gates:** the idea (Phase 1 — he wants to be there) and the acceptance criteria. Design only for a large UI change (3–5 alternatives, he picks). Plan only for large work.
- **One review:** the reviewer agent, fresh context. No CI review bot.
- **Parallel sessions:** skill `branch-per-session` — every task its own branch from a fresh `origin/main`, synced with `main` again before merge.

## Design rules

- Use semantic tokens everywhere: `bg-canvas`, `text-foreground`, `border-border`, etc.
- Never: `bg-white`, `text-black`, hardcoded hex values
- Dark mode required on every page (class-based, `dark` on `<html>`)
- Primary action color: `bg-brand` (#00968C) — one per screen max
- Cards: `border border-border shadow-sm rounded-lg p-5`
- Action buttons in a list sit in one fixed right-hand column, same position and order on every row — work down a list without moving the mouse across the screen (stacking below is fine on mobile)
- Before UI work counts as done: screenshot every changed screen (light + dark) and look at it — tests and HTTP 200 pass on an unstyled page

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
