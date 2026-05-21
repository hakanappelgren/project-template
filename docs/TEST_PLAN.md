# Test Plan — {{PROJECT_NAME}}

## Testing philosophy

Red/Green TDD: write the failing test first, make it pass with minimal code, then refactor. Tests are not optional — they document intended behavior and enable confident refactoring.

---

## Test layers

### Unit tests (`tests/unit/`)
**What:** Domain logic and application use cases.
**Framework:** Vitest
**Speed:** <100ms per test. Zero external dependencies. Zero mocks (use in-memory port implementations).
**Coverage target:** 100% of `domain/` and `application/` logic.
**Run:** `npm test`

### Integration tests (`tests/integration/`)
**What:** API routes, infra adapters with real DB.
**Framework:** Vitest
**Speed:** Slower — hits real DB (test environment).
**Coverage target:** All critical API routes and DB operations.
**Run:** `npm test`

### E2E tests (`tests/e2e/`)
**What:** Critical user flows from the browser perspective.
**Framework:** Playwright
**Coverage:** At least one test per flow in `docs/flow/flows.json` (happy path + 1–2 edge cases).
**Run:** `npm run test:e2e`

---

## Test coverage map

_Update this table as you add tests._

| Area | Unit | Integration | E2E | Notes |
|------|------|-------------|-----|-------|
| _domain/[entity]_ | ⬜ | N/A | N/A | |
| _application/[use-case]_ | ⬜ | N/A | N/A | |
| _app/api/[route]_ | N/A | ⬜ | N/A | |
| _[main user flow]_ | N/A | N/A | ⬜ | |

Legend: ✅ covered, ⚠️ partial, ⬜ missing

---

## Naming conventions

```
tests/unit/[domain-or-use-case].test.ts
tests/integration/[route-or-adapter].test.ts
tests/e2e/[flow-name].spec.ts
```

---

## Running tests

```bash
npm test              # Unit + integration (Vitest)
npm run test:watch    # Watch mode
npm run test:e2e      # E2E (Playwright)
npm run test:e2e -- --ui  # Playwright UI mode
```

---

## TDD workflow

1. Write a failing test describing the desired behavior
2. Run `npm test` — confirm it fails with the right error
3. Write the minimum code to make it pass
4. Run `npm test` — confirm it passes
5. Refactor if needed — tests still pass

Never skip step 1. If you can't write a test first, the design probably needs to change.

---

_Last updated: [date]_
