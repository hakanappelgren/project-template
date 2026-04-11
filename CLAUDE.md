# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## Stack

| Concern | Choice |
|---------|--------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| Backend | _fill in_ |
| Testing | Vitest + Testing Library |
| Dev server | `npm run dev` → http://localhost:3000 |

## Dev server

Run at the start of every session:

```bash
npm run dev
```

## Key files

_Fill in after initial setup. 5–8 files max._

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage |

## Layer rules

```
src/domain/   ← pure business logic, no framework imports — test this with TDD
src/infra/    ← DB, APIs, storage — no business logic
src/components/ ← UI only
src/app/      ← Next.js pages and API routes
```

`src/domain/` must never import from other layers.

## Environment variables

See `.env.example`. Copy to `.env.local` (gitignored).

| Variable | Purpose |
|----------|---------|

## Branching

- Never commit to `main` directly
- Branch: `feature/short-name` or `fix/short-name`
- Merge to `main` = production deploy via Vercel

## Red flags — stop and ask

_Add anything project-specific that I should pause on._

- Deleting or migrating data
- Multiple valid architectural approaches
- Scope that feels larger than the request
