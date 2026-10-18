# Recipe: word mask rise + marker

**Source:** house style (used by `KineticText`) · **Captured:** 2026-10-18

## What makes it work

Words appear to rise out of an invisible line instead of fading in, so the
headline reads as being "typed" with weight. The accent marker wipes in only
after its word lands, which makes the emphasis feel like a second beat.

## Beat sheet

| t (s) | Element | Motion | Duration | Easing | Notes |
| --- | --- | --- | --- | --- | --- |
| 0.00 | word 1 | translate Y 110% → 0, rotate 6° → 0 inside a clip mask | 0.55 | `ease.out` | origin bottom-left |
| +0.10 each | word n | same | 0.55 | `ease.out` | stagger 3f |
| word start + 0.33 | marker | scaleX 0 → 1 from left | 0.35 | `ease.inOut` | text flips to `accentInk` at +0.12s |

## Layout and type

Headline or display size, weight 800, tracking −0.035em, line height 1.02.
Left-aligned. Explicit `\n` line breaks.

## Mapping to this repo

| Beat | Component / prop | Status |
| --- | --- | --- |
| Word rise | `KineticText` | exists |
| Marker | `KineticText highlight={[...]}` | exists |
| Color-only emphasis | `highlightStyle="color"` | exists |

## Proof

`Elements/KineticText` in Studio; `HookScene` settled frame in
`npm run review -- storyboards/sample-reel.json`.
