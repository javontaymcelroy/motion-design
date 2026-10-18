// Brand tokens. Every color, size and motion value in the project comes from
// here. Change the brand by editing this file (and DESIGN.md), not components.
import { Easing } from "remotion";

export const colors = {
  bg: "#0B0B0F",
  surface: "#17171F",
  ink: "#F5F3EE",
  muted: "#9A98A6",
  accent: "#C6FF3D",
  accentInk: "#0B0B0F",
  glow: "#7C5CFF",
} as const;

// 9:16 reel. Safe area keeps key content clear of Instagram/TikTok UI
// (top bar, bottom caption + buttons, right-side action rail).
export const format = {
  width: 1080,
  height: 1920,
  fps: 30,
} as const;

export const safe = {
  top: 220,
  bottom: 420,
  left: 120,
  right: 120,
} as const;

// Type scale for a 1080px-wide frame. Never go below `body` for text the
// viewer must read.
export const type = {
  display: 156,
  headline: 112,
  title: 84,
  body: 48,
  label: 34,
  lineHeight: 1.02,
  tracking: -0.035, // em, for display/headline sizes
} as const;

export const radius = {
  pill: 999,
  card: 36,
} as const;

// Motion. Durations are in seconds; multiply by fps at the call site.
export const ease = {
  // Entrances: fast start, long soft settle.
  out: Easing.bezier(0.16, 1, 0.3, 1),
  // Exits: accelerate away.
  in: Easing.bezier(0.7, 0, 0.84, 0),
  // Moves between two on-screen states.
  inOut: Easing.bezier(0.65, 0, 0.35, 1),
  // Pops and overshoot (scale-ins, counters landing).
  pop: Easing.spring({ damping: 14, mass: 0.6, stiffness: 180 }),
  // Calm physical settle with no overshoot.
  settle: Easing.spring({ damping: 200 }),
} as const;

export const duration = {
  enter: 0.55,
  exit: 0.3,
  stagger: 0.1, // 3 frames at 30fps
  // eslint-disable-next-line @remotion/non-pure-animation -- scene transition length, not CSS
  transition: 0.4, // 12 frames at 30fps
  minHold: 1.2, // readable text stays fully visible at least this long
} as const;

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
