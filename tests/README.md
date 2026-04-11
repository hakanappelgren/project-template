# Testing

## Where tests live

| Folder | What goes here |
|--------|----------------|
| `tests/` | Unit tests for domain logic and utilities |
| `tests/integration/` | Tests that hit a real DB or external API |
| Playwright (if added) | End-to-end browser tests |

## TDD for domain logic

For anything in `src/domain/` — write the test first:

1. Write a failing test that describes the expected behavior
2. Write the minimum code to make it pass
3. Refactor for clarity

For UI components and API routes, test after implementation is fine.

## Run tests

```bash
npm test           # run once
npm run test:watch # watch mode during development
```

## What to test

Test behavior, not implementation. A good test reads like a spec:

```ts
it('calculates the next check-in date as 30 days from the last contact', () => {
  const result = nextCheckIn({ lastContact: '2025-01-01', cadenceDays: 30 })
  expect(result).toBe('2025-01-31')
})
```

Don't test React internals, Next.js routing, or third-party library behavior.
