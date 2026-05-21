# ADR-001: Stack and Reference Architecture

**Date:** {{DATE}}
**Status:** Accepted
**Deciders:** Håkan + team

---

## Context

Every project needs a baseline stack decision. We want consistency across projects for reduced cognitive load, shared tooling, and accumulated expertise. The stack must support: TypeScript safety, TDD, clean architecture (domain/application/infra separation), rapid Vercel deployment, and local-first privacy when needed.

## Decision

**Framework:** Next.js 15 with App Router
**Language:** TypeScript (strict mode)
**Styling:** Tailwind CSS v4 + so-design-system (SeventyOne brand tokens + components)
**Testing:** Vitest (unit + integration) + Playwright (E2E)
**Deployment:** Vercel (auto-deploy from main)

**Reference architecture selected:** _[Pattern A / B / C / D — fill in at kickoff]_

_Fill in the specific data storage, LLM, and auth choices below after kickoff._

**Data storage:** _[SQLite / Supabase / file system]_
**LLM:** _[Ollama local / Anthropic API / none]_
**Auth:** _[None / Supabase Auth]_

## Alternatives considered

| Option | Why not chosen |
|--------|----------------|
| Vite + React (no Next.js) | Next.js gives API routes + SSR + deployment in one; Vite needs separate backend |
| Remix | Less ecosystem, less Vercel integration, smaller community |
| Plain Express backend | More moving parts; Next.js API routes sufficient at this scale |
| JavaScript (no TS) | TypeScript strict mode catches errors Claude and humans miss |
| CSS modules / styled-components | Tailwind utility-first is faster and AI agents understand it deeply |

## Consequences

**Benefits:**
- Consistent with all other Håkan projects — shared knowledge, shared tooling
- Next.js App Router + Vercel = zero-config deployment
- TypeScript strict catches errors at compile time — safe for agent delegation
- so-design-system gives brand-consistent UI without design decisions per project
- Vitest is fast and integrates with Testing Library

**Trade-offs:**
- Next.js adds some complexity vs plain React for fully client-side tools
- Tailwind v4 API is newer — some community patterns still use v3

**Risks:**
- None significant at this scale
