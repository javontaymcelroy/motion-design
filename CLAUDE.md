# motion-design

Brand-consistent motion graphics (Reels/TikTok/Shorts) built with Remotion.
Every video is assembled from the shared token + component system, so all
output looks like one brand.

## Read first

- `DESIGN.md`: art direction. Follow it for every visual decision.
- `.claude/skills/reel/SKILL.md`: the workflow for making a video. Use it
  whenever asked to make, plan or change a reel, even without `/reel`.
- Remotion's official skills in `.claude/skills/remotion-*` cover the API. Load
  `remotion-best-practices` before writing Remotion code. Don't guess APIs.

## Rules

- Colors, sizes, easing and durations come from `src/theme`. No raw hex values,
  pixel font sizes or bezier curves in scenes or reels.
- Reels are built from scenes in `src/scenes` and elements in `src/components`.
  If something is missing, add it to the library (see DESIGN.md → Scene
  library), don't hand-roll it inside a reel.
- A storyboard in `storyboards/` is written and approved before animation code.
  Reel scene durations are read from it via `sceneFrames()`; never hardcode them.
- Seconds × `fps` for all timing (`from={0.4 * fps}`), never raw frame numbers.
- Before calling a video done: `npm run check -- <storyboard>`,
  `npm run typecheck`, `npm run review -- <storyboard>`, then look at the
  contact sheet.
- Don't render the final MP4 unless asked; open Studio (`npm run dev`) instead.

## Commands

```bash
npm run dev                                    # Remotion Studio
npm run check -- storyboards/<name>.json       # schema + pacing rules
npm run review -- storyboards/<name>.json      # stills + contact sheet in out/review/<Id>/
npm run typecheck
npm run lint
npx remotion render src/index.ts <Id> out/<Id>.mp4
```

If Remotion can't download its headless browser (offline, sandboxed), set
`REMOTION_BROWSER_EXECUTABLE` to a local Chrome/Chromium binary. Both
`review` and `render` honor it.

## Layout

```
src/theme/        tokens.ts, fonts.ts, transitions.tsx (push)
src/components/   reusable elements (Interactive.create, layout "none")
src/scenes/       full-frame scenes (Interactive.create, layout "absolute-fill")
src/storyboard/   storyboard schema + timing helpers
src/reels/        one file per video, a TransitionSeries of scenes
src/Root.tsx      composition registry (Reels / Scenes / Elements folders)
storyboards/      approved plans, one JSON per video
docs/recipes/     motion breakdowns of reference clips
scripts/          check-storyboard, review-stills
public/fonts/     bundled brand fonts
```
