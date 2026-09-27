# /review — Code Review

**Context:** $ARGUMENTS (feature name — used to find acceptance criteria)

Multi-perspective review before merging. Acceptance criteria comes first — that's the north star. Everything else is secondary.

**Run this via the reviewer agent, fresh context** (`.claude/agents/reviewer.md`). The lead dispatches it with the feature name only — never the build conversation, the builder's report, or rationale. If you are the lead reading this: don't review code you orchestrated the building of; independence is the point. Running `/review` inline is acceptable only for small work that had no build dispatch.

---

## Before reviewing

1. Read `features/[name]/acceptance-criteria.md` (or `docs/acceptance-criteria.md` for kickoff)
2. Read `docs/design/[name].html` — the approved visual design
3. Run `git diff main...HEAD` (feature branch) or `git diff --staged` (staged)

---

## 1. Acceptance criteria check ← start here

Go through each item in the acceptance criteria file:

- [ ] Does the implementation satisfy this criterion?
- [ ] Is each edge case handled?
- [ ] Did anything out-of-scope creep in?

**If any criterion is unmet → stop here.** Write blockers (see Verdict section). Don't continue to the lenses.

---

## 2. Security lens

- Hardcoded secrets, API keys, or tokens?
- User input validated at all boundaries (API routes, form handlers)?
- SQL injection, XSS, command injection risks?
- Auth checks on protected routes?
- Sensitive data in logs or error messages?
- New env vars added to `.env.example`?

---

## 3. Architecture lens

- Layer rules respected? (`domain/` never imports from `infra/`, `components/`, or `app/`)
- Business logic in `domain/` or `application/`, not in API routes or components?
- Fits the established patterns in `docs/ARCHITECTURE.md`?
- New coupling that will be painful later?
- Significant architectural decision made → ADR written?

---

## 4. Testing lens

- Test for every new piece of domain/application logic?
- Tests written before implementation (TDD)? If not, are they there now?
- Edge cases covered (empty, error, boundary values)?
- E2E test if a user flow changed?
- `docs/flow/flows.json` updated if a flow changed?

---

## 5. UX / design lens

- Does the implementation match `docs/design/[name].html`?
- Semantic tokens used throughout? No `bg-white`, `text-black`, hardcoded hex?
- Dark mode works on all new screens?
- Interactive elements accessible (focus states, ARIA labels)?
- Loading, error, and empty states present?

---

## 6. Developer experience lens

- Code readable without comments? Non-obvious parts explain *why*, not what?
- Names are clear and intention-revealing?
- No duplicate code that should be extracted?
- TypeScript types tight? No `any`, no unexplained `!` assertions?
- `npm run lint` → 0 warnings?
- `npm run typecheck` → 0 errors?

---

## Verdict

**Approved** when: all acceptance criteria met, no security blockers, tests pass, lint and typecheck clean.

**Not approved** when: any acceptance criterion unmet, or any blocker found in the lenses.

If not approved, write `features/[name]/review-blockers.md`:

```markdown
# Review blockers — [feature name] — [date]

## Acceptance criteria failures
- [ ] [criterion not met — what's missing]

## Other blockers (must fix before merge)
- [ ] [what and why it's a blocker]

## Suggestions (not blockers — consider but not required)
- [suggestion]

Fix blockers → re-run `/review [name]`.
```

The verdict is binary. Suggestions are not blockers. Blockers block. No merging over them.
