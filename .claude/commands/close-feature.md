# /close-feature — Close a Feature

Run after `/review` passes. Updates the project's living docs to reflect what shipped. Archives the feature artifacts.

**Feature:** $ARGUMENTS

---

## Step 1 — Update docs/PRD.md (always)

Find or create the "Current state" section. Add:
```
- **[Feature name]** ([date]): [one sentence — what it does and for whom]
```

This section is the honest answer to "what does this product actually do right now?" Keep it current.

---

## Step 2 — Update docs/ARCHITECTURE.md (if anything changed)

If any of these changed, update the doc:
- Layers touched (new modules in domain / application / infra)
- Data model (schema changes, new entities)
- Infrastructure (new service, new external dependency)
- Cost model (new paid service or changed usage)

If a significant decision was made during the build that isn't in an ADR yet, write it now.

---

## Step 3 — Check docs/flow/flows.json

If the feature added or changed a user flow, confirm `flows.json` reflects it.
If not, update it and run `/flow-doc` to regenerate the HTML visualiser.

---

## Step 4 — Confirm the feature folder

Check `features/[name]/` contains at minimum:
- `acceptance-criteria.md` ✓
- `plan.md` ✓

These stay permanently — they're the project history. Don't delete them.

---

## Step 5 — Done

Output:

> **[Feature name] closed** ([date]).
> Living docs updated: [list what changed — PRD / ARCHITECTURE / flows / ADR].
> `features/[name]/` archived. Ready for the next feature.
