# /flow-doc — Generate Flow Documentation

Generate or update the flow documentation for this project.

Read `docs/flow/flows.json` (if it exists), `docs/PRD.md`, and explore `src/app/` to understand the current routes and pages.

---

## Step 1: Discover flows

Identify all main user flows by:
1. Listing all pages/routes in `src/app/`
2. Reading `docs/PRD.md` for intended user journeys
3. Reading existing `docs/flow/flows.json` for previously documented flows

For each flow, determine:
- Flow name and ID (kebab-case)
- Description (what the user is trying to do)
- Actors (User, System, External API, etc.)
- Steps (numbered, with: actor, action, screen/state, any notes)
- Whether it's a happy path or edge case flow

## Step 2: Write flows.json

Write `docs/flow/flows.json` following this exact structure:

```json
{
  "version": "1.0",
  "app": "{{PROJECT_NAME}}",
  "updated": "YYYY-MM-DD",
  "flows": [
    {
      "id": "flow-id",
      "name": "Human Readable Flow Name",
      "description": "What the user is trying to accomplish",
      "actors": ["User", "System"],
      "happy_path": true,
      "steps": [
        {
          "step": 1,
          "actor": "User",
          "action": "Navigates to the app",
          "screen": "Home",
          "notes": "Any relevant context"
        }
      ],
      "edge_cases": ["What happens if X fails", "What if the user is not logged in"]
    }
  ]
}
```

## Step 3: Regenerate index.html

Rewrite `docs/flow/index.html` as a self-contained single-page app that:
- Reads the `flows.json` inline (embed the JSON directly — no fetch needed)
- Shows each flow as a card with name, description, and step-by-step list
- Has a sidebar for navigating between flows
- Uses clean, readable styling (no external dependencies, inline CSS only)
- Shows edge cases for each flow
- Works by opening the file directly in a browser (no server needed)

## Step 4: Confirm

Report: "Flow documentation updated — [N] flows documented in docs/flow/flows.json and docs/flow/index.html."

Remind: "Open docs/flow/index.html in your browser to preview."
