# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + so-design-system |
| Backend | _fill in_ |
| LLM | _Ollama (local) / Anthropic API — see .env.example_ |
| Testing | Vitest + Testing Library + Playwright |
| Dev server | `npm run dev` → http://localhost:3000 |

## Dev server

Run at the start of every session:

```bash
npm run dev
```

Check `docs/HANDOFF.md` first if this is a continuation session.

## Key files

_Fill in after initial setup. 5–8 files max._

| File | Purpose |
|------|---------|
| `docs/PRD.md` | Product requirements |
| `docs/ARCHITECTURE.md` | System design, cost model, ADR index |
| `docs/flow/flows.json` | Machine-readable app flows (LLM context) |
| `src/domain/` | Business logic — test this first |
| `src/application/` | Use cases — orchestrate domain logic |
| `src/app/page.tsx` | Homepage |

## Layer rules

```
src/domain/       ← pure business logic, no framework imports — TEST FIRST (TDD)
src/application/  ← use cases, commands, queries — imports domain/ only
src/infra/        ← DB, APIs, LLM adapters — no business logic
src/components/   ← UI only — no business logic
src/app/          ← Next.js pages and API routes
```

**Critical:** `domain/` must never import from any other layer. `application/` imports only `domain/`.

## Agent team — available commands

| Command | Purpose |
|---------|---------|
| `/kickoff` | Full project discovery (run once at project start) |
| `/feature <name>` | Build a feature (discovery → plan → implement) |
| `/review` | Multi-perspective code review before merging |
| `/pm [topic]` | Deepen requirements, update PRD |
| `/design [topic]` | Design UX flows and screens |
| `/tech-lead [topic]` | Research options, health check, refactor |
| `/architect [topic]` | Architecture decisions, ADRs |
| `/qa [topic]` | Test plans, write E2E tests |
| `/standup` | Quick status update |
| `/flow-doc` | Regenerate docs/flow/ documentation |
| `/handoff` | Write session handoff before closing |
| `/retro` | Sprint retrospective + update Lessons Learned |

## Effort calibration

Match effort to task size — don't over-engineer:

| Size | Examples | Process |
|------|---------|---------|
| **Tiny** | Typo, color change, one-liner | Just do it |
| **Small** | Bug fix, add a field, minor style | Fix + test + commit |
| **Medium** | New screen, new API endpoint | `/feature` process |
| **Large** | New domain area, new integration | `/kickoff`-style |

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

| Variable | Purpose |
|----------|---------|
| `LLM_PROVIDER` | `ollama` (default, local, free) or `anthropic` |
| `OLLAMA_MODEL` | Ollama model name (e.g. `llama3.2`) |
| `ANTHROPIC_API_KEY` | Anthropic API key (only if LLM_PROVIDER=anthropic) |

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
