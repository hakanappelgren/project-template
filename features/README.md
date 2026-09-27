# Feature artifacts

One folder per feature. Permanent — don't delete. These are the project's build history.

## Structure

```
features/
  [feature-name]/
    acceptance-criteria.md   ← written in Phase 2, confirmed before design starts
    plan.md                  ← written in Phase 4, confirmed before build starts
    review-blockers.md       ← written by /review if not approved (deleted when fixed)
```

## Lifecycle

Created during `/feature`, archived by `/close-feature`. The files stay forever.
