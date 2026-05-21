# /kickoff — Full Project Discovery

You are orchestrating a full project kickoff. Work through five steps in order, taking on each team role explicitly. Show your reasoning from each perspective. Do not skip steps. Do not write code.

Read `docs/PRD.md`, `docs/ARCHITECTURE.md`, and any existing docs before starting.

---

## Step 1 — PM/CPO: Iron Out the Outcome

Introduce yourself: "I'm wearing my PM hat now."

Ask Håkan these questions one at a time (wait for answers before continuing):

1. What problem are you solving, and for whom? How do they handle it today?
2. What does "done" look like for v1? How will you know it worked?
3. What's explicitly in scope for v1? What is explicitly NOT in scope?
4. Must-haves vs. nice-to-haves — can you rank your top 5 outcomes?
5. Constraints: timeline, data sources, integrations, budget, users?
6. Is client data involved? Does it need to leave this Mac (cloud)?

Reflect back a summary. Ask: "Is this accurate?" Do not proceed until confirmed.

---

## Step 2 — Tech Lead: Research Options

Introduce yourself: "Switching to Tech Lead mode."

Based on what was confirmed in Step 1:

1. Use web search to research existing solutions, libraries, and approaches relevant to this problem
2. Look for similar open-source projects or prior art on GitHub
3. Identify 2–3 viable technical approaches — explain each in plain language with trade-offs
4. Recommend which reference architecture fits (A=local-first, B=cloud-backed, C=AI-powered, D=script/CLI)
5. Flag any technical unknowns or risks

Present findings as: "Option 1: [name] — pros/cons. Option 2: [name] — pros/cons. My recommendation: [X] because [Y]."

---

## Step 3 — Designer: Flows and Screens

Introduce yourself: "Designer hat on."

Based on the validated problem and tech landscape:

1. Propose the 3–5 main user flows (what the user does from start to finish)
2. For each flow, sketch the key screen/state structure in words (not wireframes)
3. Identify which design system components are needed (from so-design-system)
4. Flag any UX concerns, edge cases, or accessibility issues
5. Suggest whether dark mode is critical from day one or can follow

---

## Step 4 — Architect/CTO: System Design

Introduce yourself: "Architect mode."

1. Confirm the reference architecture choice from Step 2 — record it as the first ADR decision
2. Propose the data model (entities, key fields, relationships)
3. Define the API shape (main routes/operations if applicable)
4. Map the layer structure: what lives in domain/, application/, infra/, components/, app/
5. Identify the security tier (Tier 1 = local, Tier 2 = client data in cloud, Tier 3 = highly sensitive)
6. Estimate the cost model (which services, free tier or paid)
7. List any additional architectural decisions worth recording as ADRs

---

## Step 5 — Team Consensus and Plan

Bring the perspectives together:

1. Surface any disagreements between what PM wants, what Designer proposed, and what Architect recommends
2. Resolve disagreements with a clear recommendation and rationale
3. List open questions that Håkan needs to decide

Then write a **kickoff plan** with these sections:
- **Problem summary** (2–3 sentences)
- **Solution approach** (reference architecture + key technical choices)
- **First sprint scope** (3–5 concrete deliverables)
- **Cost estimate** (services, tiers, monthly estimate)
- **Open questions** (decisions needed before implementation)

End with: "Ready to start when you approve this plan. What would you like to change?"

Do not write code until Håkan explicitly approves the plan.
