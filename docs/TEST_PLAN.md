# Test Plan — {{PROJECT_NAME}}

## Philosophy

Test things that can **silently break** without a visible error. Skip tests that just restate the code or are too fragile to survive a refactor.

Good tests: domain rules, coordinate math, data transformations, storage round-trips, stateful hook logic.
Bad tests: rendering output, CSS, things that are just a React prop pass-through.

---

## What to test and where

| Layer | Framework | When | Threshold |
|-------|-----------|------|-----------|
| `src/domain/` | Vitest | Always — write before implementing | Every factory fn + every business rule |
| `src/infra/` | Vitest | Always — use fake adapters (fake-indexeddb etc.) | Every public function |
| `src/application/` | Vitest | When logic is non-trivial or has caused bugs | Extract pure fns where possible; renderHook as last resort |
| `src/components/` | — | Only if it contains business logic | Skip rendering/layout tests |
| E2E | Playwright | One per major flow, after the flow is stable | Happy path + the most important error state |

---

## Coverage map

_Update as you add tests._

| Area | Test file | Status |
|------|-----------|--------|
| `domain/[entity]` | `domain/[entity]/__tests__/[entity].test.ts` | ⬜ |
| `infra/[adapter]` | `infra/[adapter]/__tests__/[adapter].test.ts` | ⬜ |
| `application/[hook]` | `application/[hook]/__tests__/[logic].test.ts` | ⬜ |
| _[main user flow]_ | `tests/e2e/[flow].spec.ts` | ⬜ |

Legend: ✅ covered · ⚠️ partial · ⬜ missing

---

## Running tests

```bash
npm test              # Vitest (unit + integration)
npm run test:watch    # Watch mode during development
npm run test:e2e      # Playwright E2E
```

---

## TDD workflow (domain + application layer)

1. Write a failing test that describes the intended behavior
2. `npm test` — confirm it fails with the right error (not a syntax error)
3. Write the minimum code to make it pass
4. `npm test` — confirm green
5. Refactor if needed — tests still green

Do not skip step 1. If you find it hard to write a test first, the function probably needs to be simpler or better named.

---

## Regression rule

When a bug is fixed, add a test that would have caught it. Name the test after what it prevents. Example:
```ts
it('does NOT overwrite connections when a node is dragged — regression for edge-wiping bug', () => {
```

This turns past pain into future protection.

---

_Last updated: {{date}}_
