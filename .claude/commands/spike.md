# /spike — Prove the Riskiest Assumption

A spike is a **throwaway proof** that a technical capability actually works on the real target device, built *before* the tech plan is approved. Evidence before architecture.

**Context:** $ARGUMENTS (the capability to prove, e.g. "background audio playback on iPhone")

---

## When a spike is required

Any feature or project that depends on a **platform capability** the team hasn't already proven in this codebase:

- Audio/video playback (especially backgrounded, locked screen, silent switch)
- Background execution, downloads, sync
- Push notifications
- Sensors, camera, microphone, geolocation
- Offline behavior / PWA installation
- File system access
- Real-time (websockets, WebRTC)
- Third-party APIs with auth flows

Rule of thumb: if the researcher's verdict is **CONDITIONAL** or **UNKNOWN**, spike it. If **PROVEN** with a mechanism we've used before, skip. If **BLOCKED**, don't spike — change the plan.

---

## Rules

1. **Throwaway by contract.** Spike code lives in `spikes/[name]/` and never migrates into `src/`. The *knowledge* migrates — into the research brief and the plan. Delete or leave the folder; either way it's dead code by definition. (`spikes/` is gitignored — commit the findings, not the code.)
2. **Small.** Target 30–100 lines, max half a day. If a spike grows past that, the question is wrong — split it or escalate to the lead.
3. **No process.** No TDD, no layers, no lint standards, no design tokens. Ugly is correct here.
4. **Real device.** Platform capabilities get proven on the actual target — Håkan's iPhone, not the simulator, not desktop Chrome. The iOS simulator lies about background behavior.
5. **One question per spike.** "Does audio keep playing when the PWA is backgrounded on iOS?" — not "does the audio system work?"

---

## Sequence

1. Read `features/[name]/research-brief.md` — the spike implements the researcher's "Recommended spike", using the mechanism the research found
2. Build the minimal proof in `spikes/[name]/`
3. Tell Håkan exactly how to test it on the real device, step by step
4. Record the result

---

## Recording the result

Append to the research brief (or create `docs/research/[topic].md` if none exists):

```markdown
## Spike result — [date]
**Question:** [the one question]
**Setup:** [device, OS version, browser/PWA/native, mechanism used]
**Result:** WORKS / WORKS WITH CONDITIONS / FAILS
**Conditions:** [exact circumstances, e.g. "audio element yes, Web Audio API no; Safari tab yes, installed PWA no"]
**Consequence for the plan:** [one sentence — what the tech design must do because of this]
**Escalation path if conditions are unacceptable:** [e.g. "wrap in Capacitor for native audio session"]
```

Then update `features/[name]/plan.md` → "Capability risks" section with the verdict.

---

## The gate

**No tech plan is approved while it depends on an unspiked CONDITIONAL or UNKNOWN capability.** This is a hard gate, same rank as design approval. A plan built on an unproven assumption is a stall scheduled for later.
