# Art direction

The rules every video in this repo follows. Values live in
`src/theme/tokens.ts`. This file explains how to use them. If a rule here and a
token disagree, the token wins; fix this file.

## Feel

Confident, editorial, fast. Dark canvas, one loud accent, big type. Motion is
snappy on entry and calm at rest: things arrive with intent, then hold still
long enough to read. Nothing wiggles for its own sake.

## Format

- 1080 × 1920, 30 fps, 9:16 (Reels, TikTok, Shorts).
- **Safe area:** 220px top, 420px bottom, 120px each side. Everything the
  viewer must read sits inside it (`SafeColumn`). Backgrounds and glows fill the
  full frame. Decorative bleed (marker highlights, shadows) may cross the safe
  line by at most ~20px.
- Target length 7–30s. The hook lands inside the first second.

## Color

| Token | Use |
| --- | --- |
| `bg` `#0B0B0F` | Canvas. Every scene starts on `Backdrop`, never a flat fill. |
| `surface` `#17171F` | Pills, cards, raised UI. |
| `ink` `#F5F3EE` | Primary text. |
| `muted` `#9A98A6` | Supporting text only; never the main point. |
| `accent` `#C6FF3D` | One idea per scene: the highlighted word, the number's unit, the CTA button. |
| `accentInk` | Text on accent. |
| `glow` `#7C5CFF` | Backdrop glow only. Never text. |

Accent is rationed. If two things in a frame are accent, one of them is wrong.

## Typography

- **Inter Tight** (display): headlines 800, captions/items 700. Tight
  tracking (−0.035em), line height 1.02.
- **JetBrains Mono** (labels): kickers, index numbers, handles. Uppercase +
  0.08em tracking for kickers.
- Scale (1080 wide): display 156 · headline 112 · title 84 · body 48 · label 34.
  Nothing the viewer must read goes below 48 except kickers and labels (34).
- Use `\n` in text for deliberate line breaks. Don't let the browser decide
  where a headline wraps.

## Layout

- One focal point per scene. Decide what the viewer sees first; make it the
  biggest thing.
- Left-aligned by default. Centered only for the CTA.
- Max 14 on-screen words per scene. Over that, split the scene.

## Motion

| Token | Value | Use |
| --- | --- | --- |
| `ease.out` | bezier(0.16, 1, 0.3, 1) | All entrances. |
| `ease.in` | bezier(0.7, 0, 0.84, 0) | Exits (rare, transitions usually handle them). |
| `ease.inOut` | bezier(0.65, 0, 0.35, 1) | Moving between two on-screen states; marker wipes. |
| `ease.pop` | spring, damping 14 | Buttons, counters landing. Small overshoot. |
| `ease.settle` | spring, damping 200 | Physical moves with no overshoot. |
| `duration.enter` | 0.55s | Standard entrance. |
| `duration.stagger` | 0.1s (3f) | Between words/items in a group. |
| `duration.transition` | 0.4s (12f) | Scene-to-scene. |
| `duration.minHold` | 1.2s | Fully readable text stays still at least this long. |

Principles:

1. **Never linear.** Every `interpolate` gets an `easing` from `ease`.
2. **Text enters by word, masked.** Words rise from behind a clip, staggered.
   Use `KineticText`. Don't fade whole paragraphs in.
3. **Sequence, don't stack.** Elements in a scene enter in reading order,
   0.2–0.9s apart: kicker → headline → support → action.
4. **Payoff after landing.** Emphasis (marker wipe, counter pop) fires after the
   element has arrived, not during.
5. **Pacing:** on-screen reading speed is 3 words/second plus 0.8s for
   entrances. `npm run check` enforces this.
6. **Transitions:** the house transition is `push()` (outgoing sinks and dims,
   incoming pushes up). Use it between every scene unless a storyboard says
   otherwise. Hard `cut` for beats that should hit, like a reveal on a music hit.
7. Only `useCurrentFrame()`-driven animation. CSS transitions/animations do not
   render.

## Scene library

| Scene | For | Props |
| --- | --- | --- |
| `HookScene` | Opening claim | kicker, headline, highlight[] |
| `StatScene` | One number that matters | label, value, prefix/suffix, decimals, caption |
| `ListScene` | 2–4 steps or points | title, items[], beat |
| `CTAScene` | Close + follow | headline, highlight[], handle, action |

Elements: `KineticText`, `Kicker`, `Counter`, `Backdrop`, `KineticCaptions`.

When a video needs something the library can't do, build a new scene or
element that uses these tokens, register it in `Root.tsx`, add it to the table
above (and to `SCENE_COMPONENTS` for scenes), then use it. Never inline a
one-off style in a reel file.
