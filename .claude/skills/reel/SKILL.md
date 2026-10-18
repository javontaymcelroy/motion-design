---
name: reel
description: Plan and build a brand-consistent 9:16 motion graphics video (Reel, TikTok, Short) in this repo. Use whenever the user asks to make, plan, storyboard, change or render a reel or short-form motion video, or invokes /reel with a topic or script.
---

# Making a reel

Follow these steps in order. The storyboard approval in step 3 is the only
point where you stop and wait for the user.

## 1. Brief

Collect: topic or script, the one thing the viewer should remember, audience,
handle for the CTA, target length (default 12–20s), voiceover yes/no, and any
reference clips. Infer what you reasonably can from the request. Ask only for
what you can't infer and that changes the video (usually the core message).

If the user describes or links a reference clip, check `docs/recipes/` for a
matching recipe. If there isn't one and the motion matters, write one first
with the `recipe` skill.

## 2. Read the system

Read `DESIGN.md` and `src/theme/tokens.ts`. Read the scene files you plan to
use so you know their props. Load `remotion-best-practices` before writing
Remotion code.

## 3. Storyboard → approval

Write `storyboards/<kebab-name>.json` following `src/storyboard/schema.ts`:

- `id` is PascalCase and becomes the composition id.
- One scene per idea. First scene `HookScene`, last `CTAScene`.
- `onScreenText` is exactly the words that will appear.
- `beats` describe what moves and when, in seconds, like a motion designer's notes.

Run `npm run check -- storyboards/<name>.json` and fix every error. Then show
the user a compact table (scene · seconds · on-screen text · key beat) and the
total length, and **wait for approval**. Make requested changes in the JSON and
re-run the check.

## 4. Build

1. Create `src/reels/<Id>.tsx` using `src/reels/SampleReel.tsx` as the
   pattern: parse the storyboard JSON, `scenesById`, a `TransitionSeries` with
   `durationInFrames={sceneFrames(s.<id>, fps)}` per scene and
   `push()`/`brandTiming()` between them (omit the transition for `cut`).
2. Register it in `src/Root.tsx` under the `Reels` folder with
   `totalFrames(storyboard, format.fps)` and `reelPropsSchema`.
3. Write text and props inline on each scene instance so they're editable in
   Studio.
4. Need a scene the library lacks? Build it in `src/scenes/` following the
   existing scenes (Backdrop + SafeColumn, tokens only, `Interactive.create`
   with `layout: "absolute-fill"`). Register it in the `Scenes` folder, add it to
   `SCENE_COMPONENTS` and the DESIGN.md table.

Voiceover reels: generate audio per `remotion-markup/voiceover.md`, transcribe
with the `remotion-captions` skill, show words with `KineticCaptions` inside
the scene sequences, and set scene `seconds` from the audio rather than reading
speed.

## 5. Review loop

```bash
npm run typecheck
npm run review -- storyboards/<name>.json
```

Read `out/review/<Id>/contact-sheet.png` (and single frames when something
looks off). For each scene, check:

- [ ] Readable text is inside the dashed safe area.
- [ ] No overflow, clipped descenders or bad wraps; breaks are deliberate `\n`.
- [ ] One focal point; accent used on exactly one idea.
- [ ] The "settled" frame is fully at rest, with nothing still animating.
- [ ] Contrast holds over the glow.
- [ ] Matches DESIGN.md (type scale, alignment, no raw values).

Fix and re-run until a pass finds nothing (normally 1–3 rounds). Also look at
2–3 frames mid-transition by rendering stills at a scene's start frame + 4–8
(`npx remotion still src/index.ts <Id> out/t.png --frame=N`).

## 6. Hand off

Start Studio (`npm run dev`) so the user can scrub and tweak. Render only when
they ask:

```bash
npx remotion render src/index.ts <Id> out/<Id>.mp4
```

Summarize what was built, the length, and anything you added to the library.
