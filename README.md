# motion-design

Brand-consistent motion graphics for Reels, TikTok and Shorts, built by Claude
Code with [Remotion](https://remotion.dev).

The consistency comes from the system, not the prompt:

| Layer | Where | Job |
| --- | --- | --- |
| Remotion Agent Skills | `.claude/skills/remotion-*` | Correct, current Remotion API usage |
| Art direction | `DESIGN.md` | Palette, type, layout, motion rules |
| Tokens | `src/theme/` | The only source of colors, sizes, easing, durations, fonts |
| Component library | `src/components/`, `src/scenes/` | Reels are assembled from these, not written from scratch |
| Storyboard | `storyboards/*.json` | Plan approved before animating; drives scene timing |
| Checks | `npm run check`, `npm run review` | Pacing rules, plus stills and a contact sheet with safe-area guides |
| Workflow skills | `/reel`, `/recipe` | Brief → storyboard → build → review, and turning reference clips into reusable recipes |

## Quick start

```bash
npm install
npm run dev                                         # Studio → Reels/SampleReel
npm run check -- storyboards/sample-reel.json
npm run review -- storyboards/sample-reel.json      # out/review/SampleReel/contact-sheet.png
npx remotion render src/index.ts SampleReel out/SampleReel.mp4
```

Then in Claude Code:

```
/reel 15s reel on why designers should learn motion, handle @yourhandle
```

## Making it yours

1. Edit `src/theme/tokens.ts` (colors, type scale, easing) and swap the fonts
   in `public/fonts` + `src/theme/fonts.ts`.
2. Update `DESIGN.md` to match. Claude reads it before every video.
3. Run `npm run review -- storyboards/sample-reel.json` and check the sample in
   the new brand.
4. When you see a reel you like, run `/recipe` with a screen recording or a
   description to add its motion to the library.

Remotion is free for individuals and teams of up to 3; larger companies need a
[company license](https://www.remotion.pro/license).
