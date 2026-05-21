# /feature — Feature Development Process

Feature to build: **$ARGUMENTS**

Work through this process in order. Show reasoning from each perspective. End with a plan for approval before writing any code.

Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/DOMAIN_MODEL.md`, and `docs/flow/flows.json` before starting.

---

## Step 1 — PM: Define the Feature

"PM hat on."

For the feature "$ARGUMENTS":

1. Write 2–3 user stories: "As a [user], I want [action] so that [outcome]."
2. Define acceptance criteria (the specific conditions that make this feature complete)
3. Identify what is NOT in scope for this feature (prevents scope creep)
4. Check: does this feature affect any existing flows in `docs/flow/flows.json`?

If the task is tiny (typo fix, one-liner, color change): skip to implementation directly, no process needed.
If the task is small (bug fix, minor addition): just propose the fix, confirm, implement.
If the task is medium or large: continue with steps 2–4.

---

## Step 2 — Tech Lead: Approach

"Tech Lead hat on."

1. How does this feature fit into the existing layer architecture?
2. What domain entities/value objects are needed?
3. What use cases go in `application/`?
4. What infra adapters (if any) are needed?
5. What are the edge cases and failure modes to handle?
6. Any technical risks or unknowns?

---

## Step 3 — Designer: UI Plan (if UI is involved)

"Designer hat on." (Skip this step if feature has no UI.)

1. Which screens are affected?
2. What's the user interaction flow?
3. Which components from so-design-system will you use?
4. Any new components needed?
5. Dark mode and accessibility considerations

---

## Step 4 — Implementation Plan

Write a concrete implementation plan:

- **Tests to write first** (TDD — list the test cases)
- **Domain changes** (new entities, value objects, domain logic)
- **Application changes** (new use cases)
- **Infra changes** (new adapters if needed)
- **UI changes** (components, pages)
- **Docs to update** (flows.json? PRD? ARCHITECTURE?)
- **Estimated effort** (tiny/small/medium/large)

End with: "Ready to implement when you approve. Anything to change?"

---

## Implementation (after approval)

Once approved:

1. Write failing tests first (TDD red phase)
2. Implement domain logic to make tests pass (green phase)
3. Implement application use cases
4. Implement infra adapters if needed
5. Build UI
6. Write E2E test for the flow
7. Update `docs/flow/flows.json` if any flow changed
8. Run `npm test` and `npm run test:e2e` — confirm all pass
9. Run `npm run lint && npm run typecheck` — confirm clean
10. Commit with conventional commit message: `feat(scope): description`
