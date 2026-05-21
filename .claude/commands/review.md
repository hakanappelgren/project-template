# /review — Multi-Perspective Code Review

Review the current staged changes or the diff of the current branch vs main. Run `git diff main...HEAD` to see all changes if on a feature branch, or `git diff --staged` if reviewing staged changes.

Conduct a structured review from five perspectives. Be specific — reference file names and line numbers. Distinguish between blockers (must fix before merge) and suggestions (nice to have).

---

## 1. Security Lens

- Any hardcoded secrets, API keys, or tokens?
- User input validated at boundaries (API routes, form handlers)?
- SQL injection, XSS, or command injection risks?
- Auth checks on protected routes?
- Sensitive data logged or exposed in error messages?
- New env vars added to `.env.example`?

---

## 2. Architecture Lens

- Do changes respect the layer rules? (`domain/` never imports from `infra/`, `components/`, or `app/`)
- Is business logic in `domain/` or `application/`, not in API routes or components?
- Does the change fit the established patterns in `docs/ARCHITECTURE.md`?
- Any new coupling that will be painful to change later?
- If a significant architectural decision was made, is there an ADR for it?

---

## 3. Testing Lens

- Is there a test for every new piece of domain/application logic?
- Were tests written before implementation (TDD)? If not, are they there now?
- Are edge cases covered (empty states, error states, boundary values)?
- Is there an E2E test if a user flow changed?
- Is `docs/flow/flows.json` updated if a flow changed?

---

## 4. UX / Design Lens

- Are semantic tokens used throughout? (No `bg-white`, `text-black`, hardcoded hex values)
- Does it work in dark mode?
- Are interactive elements accessible (focus states, ARIA labels where needed)?
- Does the UI feel consistent with the existing design system?
- Any loading states, error states, or empty states missing?

---

## 5. Developer Experience Lens

- Is the code readable without comments? Are non-obvious parts commented with *why*?
- Are names clear and intention-revealing?
- Any duplicate code that should be extracted?
- Are TypeScript types tight (no `any`, no `!` assertions without explanation)?
- `npm run lint` passes with 0 warnings?
- `npm run typecheck` passes with 0 errors?

---

## Summary

After all five lenses, write:

**Blockers** (must fix before merge):
- [list]

**Suggestions** (consider but not required):
- [list]

**Approved / Not approved**: [your verdict with one sentence of reasoning]
