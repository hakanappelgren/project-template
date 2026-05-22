# Feature

Build a feature — from idea to implemented, tested, documented code.

---

## Size check first

**Tiny** (typo, config tweak, one-liner)? Just propose the fix and do it — no process.

**Small** (bug fix, minor addition)? Describe what you'll do, implement, test, commit.

**Medium or Large**? Continue below.

---

## Medium / Large features

### Step 1 — Explore first (don't skip this)

If the feature idea is still fuzzy, or you're not sure exactly what to build, start with `/explore [feature name]`. Come back here when the problem is clear.

If you already know exactly what you want, describe it in one clear sentence and carry on.

---

### Step 2 — Plan

Run the `/plan` sequence from here:

**Tech Lead** — how does this fit the existing architecture? What's the approach? Any new dependencies or patterns?

**Designer** (if there's UI) — which screens are affected? What's the interaction flow? Which design system components handle this — anything new needed?

**Architect** — layer changes, data model changes, any new ADR needed?

**QA** — edge cases, test strategy, definition of done.

End with the written plan. Wait for approval.

---

### Step 3 — Implementation (after approval only)

1. Write failing tests first (TDD red)
2. Domain logic — make tests pass (green)
3. Application use cases (if needed)
4. Infra adapters (if needed)
5. UI
6. E2E test for the flow
7. Update `flows.json` if the flow changed
8. `npm test` — all green
9. Lint + typecheck — clean
10. Conventional commit: `feat(scope): description`
