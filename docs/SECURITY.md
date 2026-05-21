# Security — {{PROJECT_NAME}}

## Security tier

_Selected at kickoff._

- [ ] **Tier 1 — Personal/local**: Data on Mac only. No cloud DB, no client data.
- [ ] **Tier 2 — Client/company data in cloud**: Cloud DB with RLS, EU region, HTTPS.
- [ ] **Tier 3 — Highly sensitive**: Local only, no cloud services, Ollama for AI.

**Selected tier:** _[X]_

---

## Data classification

_What data does this app handle?_

| Data type | Sensitivity | Storage | In LLM prompts? |
|-----------|-------------|---------|----------------|
| _Example: user notes_ | _Low_ | _Local SQLite_ | _No_ |
| _Example: client data_ | _High_ | _Supabase (EU)_ | _With consent only_ |

---

## Controls in place

### Authentication
- [ ] Not required (personal use only)
- [ ] Supabase Auth
- [ ] _Other_

### Authorization
- [ ] Not required (single user)
- [ ] Supabase RLS policies (tested in `tests/integration/`)
- [ ] _Other_

### Secrets management
- Production secrets: Vercel environment variables
- Local secrets: `.env.local` (gitignored, never committed)
- No secrets in code, logs, or error messages

### Data in transit
- HTTPS enforced by Vercel (automatic)
- No sensitive data in query strings or URL params

### LLM data handling
- Default LLM: Ollama (local — data never leaves Mac)
- If using Anthropic API: no client data in prompts without explicit consent documented below

**Anthropic API usage consent record:**
_If client data is used in Anthropic API calls, document here: client name, data types, date consent obtained._

---

## Threat model

_What are the realistic threats for this app?_

| Threat | Likelihood | Impact | Mitigation |
|--------|-----------|--------|-----------|
| _Unauthorized access to app_ | _Low (personal)_ | _Medium_ | _No auth needed for local_ |
| _Secrets committed to git_ | _Medium_ | _High_ | _.gitignore, pre-commit check_ |
| _Client data in LLM_ | _Medium_ | _High_ | _Ollama default, consent rule_ |

---

## Checklist (verify before going live with client data)

- [ ] All secrets in Vercel env vars, not in code
- [ ] `.env.local` in `.gitignore`
- [ ] No `console.log` of sensitive data
- [ ] RLS policies tested if using Supabase
- [ ] Client consent documented if using cloud LLM
- [ ] Vercel region set to EU if EU user data
- [ ] `npm audit --audit-level=high` passes

---

_Last updated: [date]_
