// Validates a storyboard against the schema and the pacing rules in DESIGN.md.
// Usage: npm run check -- storyboards/my-reel.json
import { readFileSync } from "node:fs";
import { StoryboardSchema } from "../src/storyboard/schema.ts";
import { sceneWindows, totalFrames } from "../src/storyboard/timing.ts";

const FPS = 30;
const WORDS_PER_SECOND = 3; // comfortable on-screen reading pace
const READ_BUFFER = 0.8; // seconds of entrance animation before reading starts
const MAX_WORDS_PER_SCENE = 14;

const file = process.argv[2];
if (!file) {
  console.error("Usage: npm run check -- storyboards/<name>.json");
  process.exit(1);
}

const parsed = StoryboardSchema.safeParse(
  JSON.parse(readFileSync(file, "utf8")),
);
if (!parsed.success) {
  console.error(`✗ ${file} does not match the storyboard schema:`);
  for (const issue of parsed.error.issues) {
    console.error(`  - ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

const sb = parsed.data;
const errors = [];
const warnings = [];

const ids = sb.scenes.map((s) => s.id);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupes.length)
  errors.push(`duplicate scene ids: ${[...new Set(dupes)].join(", ")}`);

if (sb.scenes[0].component !== "HookScene") {
  warnings.push(
    "first scene is not a HookScene; the hook should land in the first second",
  );
}
if (sb.scenes.at(-1).component !== "CTAScene") {
  warnings.push("last scene is not a CTAScene");
}

const shortest = Math.min(...sb.scenes.map((s) => s.seconds));
if (sb.transition.type !== "cut" && sb.transition.seconds * 2 > shortest) {
  errors.push(
    `transition (${sb.transition.seconds}s) is more than half the shortest scene`,
  );
}

for (const scene of sb.scenes) {
  const words = scene.onScreenText
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  const needed = READ_BUFFER + words / WORDS_PER_SECOND;
  if (words > MAX_WORDS_PER_SCENE) {
    errors.push(
      `${scene.id}: ${words} words on screen (max ${MAX_WORDS_PER_SCENE}); split the scene`,
    );
  }
  if (scene.seconds < needed) {
    errors.push(
      `${scene.id}: ${scene.seconds}s is too short to read ${words} words (needs ≥ ${needed.toFixed(1)}s)`,
    );
  }
}

const seconds = totalFrames(sb, FPS) / FPS;
if (seconds < 6) warnings.push(`total ${seconds.toFixed(1)}s is very short`);
if (seconds > 60)
  warnings.push(
    `total ${seconds.toFixed(1)}s is over 60s; most reels should be 7–30s`,
  );

console.log(
  `${sb.id}: ${sb.scenes.length} scenes, ${seconds.toFixed(2)}s (${totalFrames(sb, FPS)} frames @ ${FPS}fps)`,
);
for (const w of sceneWindows(sb, FPS)) {
  console.log(
    `  ${w.scene.id.padEnd(14)} ${w.scene.component.padEnd(10)} frames ${w.start}–${w.end}`,
  );
}
for (const w of warnings) console.log(`⚠ ${w}`);
for (const e of errors) console.error(`✗ ${e}`);
if (errors.length) process.exit(1);
console.log("✓ storyboard OK");
