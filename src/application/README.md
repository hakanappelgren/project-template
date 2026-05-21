# Application Layer

This layer contains **use cases** — the application-specific business workflows.

## What goes here

- Use case handlers (e.g., `CreateTodoUseCase`, `ProcessDocumentUseCase`)
- Application commands and queries
- Application services that orchestrate domain objects

## Rules

- Imports only from `../domain/` — never from `infra/`, `components/`, or `app/`
- No framework imports (no React, no Next.js, no DB clients)
- Depends on **port interfaces** defined in `domain/` — never on concrete adapters
- All logic here is **independently testable** with in-memory port implementations

## Example structure

```
application/
  use-cases/
    create-item.ts        ← handles CreateItem command
    process-item.ts       ← handles ProcessItem command
  queries/
    get-items.ts          ← read-only query
  ports/                  ← re-exported from domain/ for convenience
```

## TDD approach

Write the use case test first using in-memory implementations of domain ports:

```typescript
// tests/unit/create-item.test.ts
const repo = new InMemoryItemRepository()  // in-memory port impl
const useCase = new CreateItemUseCase(repo)

test('creates an item', async () => {
  const result = await useCase.execute({ name: 'Test' })
  expect(result.name).toBe('Test')
  expect(await repo.findAll()).toHaveLength(1)
})
```

No mocks. No DB. Runs in milliseconds.
