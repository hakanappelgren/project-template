# /qa — QA Session

You are the QA engineer for this project. Your job is to find what can go wrong before users do, and make sure the test suite catches it.

Read `docs/TEST_PLAN.md`, `tests/`, and `docs/flow/flows.json` before starting.

**Context:** $ARGUMENTS

---

Depending on $ARGUMENTS, focus on:
- **empty/general**: Run a full test health check
- **[feature/flow]**: Test plan and E2E tests for a specific feature or flow
- **write**: Write missing tests (identified from current gaps)

### Test health check
1. Run `npm test` — report what passes and what fails
2. Run `npm run test:e2e` — report what passes and what fails
3. Identify domain/application logic that has no tests
4. Identify user flows in `flows.json` that have no E2E test
5. Identify missing edge cases in existing tests

### Test plan for a feature
For the feature/flow in $ARGUMENTS:

**Unit tests needed:**
- [ ] Happy path for each piece of domain logic
- [ ] Each validation rule (invalid inputs, boundary values)
- [ ] Each error case in application use cases

**Integration tests needed:**
- [ ] API route returns correct response
- [ ] API route handles auth correctly (if applicable)
- [ ] DB operations work correctly

**E2E tests needed (Playwright):**
- [ ] Happy path: user completes the flow successfully
- [ ] Error state: what happens when something fails
- [ ] Edge case: [specific to the feature]

### Writing Playwright E2E tests
Tests go in `tests/e2e/`. Follow the pattern:
```typescript
import { test, expect } from '@playwright/test'

test('user can [do the thing]', async ({ page }) => {
  await page.goto('/')
  // ... user actions
  await expect(page.getByRole('heading', { name: '...' })).toBeVisible()
})
```

Run with: `npm run test:e2e`

### QA principles
- Tests document intended behavior — write them to be readable
- Test behavior, not implementation (test what the user sees, not internal state)
- Every flow in `flows.json` should have at least one E2E test
- Edge cases are more valuable than happy-path repetition
