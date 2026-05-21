## What and why

_1–2 sentences: what changed and why._

## Task size

- [ ] Tiny — no process needed (typo, one-liner, color change)
- [ ] Small — fix + test + commit
- [ ] Medium — `/feature` process used
- [ ] Large — `/kickoff`-style process used

## Checklist

**Code quality**
- [ ] Lint passes: `npm run lint -- --max-warnings 0`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] No `any` types added without a `// reason` comment

**Testing (TDD)**
- [ ] Tests written before implementation (or added now if tiny/small)
- [ ] All unit + integration tests pass: `npm test`
- [ ] E2E test added/updated if a user flow changed: `npm run test:e2e`

**Documentation**
- [ ] `docs/PRD.md` updated if product behavior changed
- [ ] `docs/ARCHITECTURE.md` updated if structure changed
- [ ] `docs/flow/flows.json` updated if a flow changed (run `/flow-doc`)
- [ ] ADR created if an architectural decision was made
- [ ] `docs/SECURITY.md` updated if data handling changed

**Design**
- [ ] Semantic tokens used (no `bg-white`, `text-black`, hardcoded hex)
- [ ] Dark mode tested
- [ ] Loading, error, and empty states handled

**Security**
- [ ] No secrets in code or logs
- [ ] `.env.example` updated if new env vars added
- [ ] `npm audit --audit-level=high` clean
- [ ] Client data not sent to cloud LLM without consent (if applicable)

## Screenshots (UI changes)

_Before / After — delete if not applicable._
