# Architecture

## System overview

_1–2 sentences describing what this system does and its main moving parts._

---

## Context diagram

_Who/what interacts with this system? Use this to orient anyone new._

```mermaid
graph TD
  User["👤 User (browser)"]
  App["🖥️ Next.js App"]
  DB["🗄️ Database"]
  External["🌐 External API (if any)"]

  User --> App
  App --> DB
  App --> External
```

---

## Layer structure

```
src/
  app/        ← Next.js pages, API routes, layout (framework layer)
  components/ ← React UI components (presentation layer)
  domain/     ← Pure business logic, no framework deps (domain layer)
  infra/      ← Database clients, API clients, file system (infrastructure layer)
  types/      ← Shared TypeScript types
```

**Rule:** `domain/` must never import from `app/`, `components/`, or `infra/`.
This keeps business logic testable and framework-independent.

---

## Data model

_Add an ER diagram when you have a schema. GitHub renders Mermaid inline._

```mermaid
erDiagram
  ENTITY_A {
    string id PK
    string name
    date created_at
  }
  ENTITY_B {
    string id PK
    string entity_a_id FK
  }
  ENTITY_A ||--o{ ENTITY_B : has
```

---

## Key flows

_Add sequence diagrams for non-obvious flows. One diagram per flow._

```mermaid
sequenceDiagram
  participant User
  participant App
  participant DB

  User->>App: Action
  App->>DB: Query
  DB-->>App: Result
  App-->>User: Response
```

---

## Infrastructure & deployment

| Concern | Choice | Why |
|---------|--------|-----|
| Hosting | Vercel | Auto-deploy from main branch |
| Database | _TBD_ | |
| Auth | _TBD_ | |

---

_Last updated: [date]_
