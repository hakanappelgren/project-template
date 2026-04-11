# Project: {{PROJECT_NAME}}

## What This App Does
{{PROJECT_DESCRIPTION}}

## Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4
- **Backend**: _fill in — e.g. Supabase, Prisma + Postgres, none_
- **Testing**: Vitest + Testing Library
- **Dev server**: `npm run dev` → http://localhost:3000

## Who I'm Building For
Håkan is a non-technical management consultant and CEO. Keep solutions simple,
avoid over-engineering, and always explain what you're about to do before doing it.

## Working Preferences
- Explain your plan before making changes
- Keep changes small and focused — one thing at a time
- Write tests alongside code (TDD for domain logic in `src/domain/`)
- Comment code so the *why* is clear, not the what
- If you see a risk or a better approach, say so before proceeding

### Simplicity first
- Always choose the simplest solution that works
- No over-engineering, no clever abstractions unless clearly justified
- Avoid adding dependencies unless necessary

### Code quality (always, without being asked)
- Write automated tests for all meaningful logic and run them
- After writing code, self-review for obvious issues before presenting
- Refactor for readability if the code is hard to follow

### Workflow
- Commit early and often with clear, descriptive commit messages
- Before finishing any task: run tests, check for errors, confirm it works
- If something fails, explain what failed and why before trying to fix it

## Layer structure

```
src/domain/     ← Pure business logic. No framework imports. Test this with TDD.
src/infra/      ← DB, API calls, file system. No business logic here.
src/components/ ← React UI. No business logic here.
src/app/        ← Next.js pages and API routes.
```

**Rule:** `src/domain/` must never import from other layers. This keeps it independently testable.

## Dev Server — Run Automatically
At the start of every session, run the dev server:

```bash
npm run dev
```

Starts at **http://localhost:3000**.

## Key Files
_Fill in the 5–8 most important files with one-line descriptions after initial setup._

## Environment Variables
See `.env.example` for required variables. Copy to `.env.local` (gitignored) and fill in values.

## Branching & Deploy
- **Never commit directly to `main`**
- Work on feature branches: `feature/short-description` or `fix/short-description`
- Commit frequently with clear messages
- Merging to `main` triggers a Vercel production deploy

## Red Flags — Stop and Ask Me
- If the scope seems larger than expected
- If you're about to delete or overwrite something significant
- If there are multiple valid architectural approaches — surface them, don't pick one
- If I seem to be asking for something that will create problems later
