// Renders review frames for every scene in a storyboard (mid-entrance and
// fully settled), with safe-area guides on, then tiles them into one contact
// sheet so the whole reel can be checked in a single image.
//
// Usage: npm run review -- storyboards/my-reel.json [--no-guides]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync } from "node:fs";
import path from "node:path";
import { StoryboardSchema } from "../src/storyboard/schema.ts";
import { sceneWindows } from "../src/storyboard/timing.ts";

const file = process.argv[2];
if (!file) {
  console.error(
    "Usage: npm run review -- storyboards/<name>.json [--no-guides]",
  );
  process.exit(1);
}
const showGuides = !process.argv.includes("--no-guides");

const sb = StoryboardSchema.parse(JSON.parse(readFileSync(file, "utf8")));
const outDir = path.join("out", "review", sb.id);
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

console.log("Bundling…");
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const inputProps = { showGuides };
// Optional: use an existing Chrome/Chromium instead of Remotion's download.
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE ?? null;
const composition = await selectComposition({
  serveUrl,
  id: sb.id,
  inputProps,
  browserExecutable,
});
const { fps } = composition;

const frames = [];
for (const [i, w] of sceneWindows(sb, fps).entries()) {
  const entrance = Math.min(
    w.soloStart + Math.round(0.35 * fps),
    w.soloEnd - 1,
  );
  const settled = Math.max(w.soloEnd - Math.round(0.25 * fps), entrance + 1);
  frames.push({ label: `${i + 1}-${w.scene.id}-a-entrance`, frame: entrance });
  frames.push({ label: `${i + 1}-${w.scene.id}-b-settled`, frame: settled });
}

const files = [];
for (const { label, frame } of frames) {
  const output = path.join(outDir, `${label}.png`);
  await renderStill({
    composition,
    serveUrl,
    inputProps,
    frame,
    output,
    scale: 0.5,
    browserExecutable,
  });
  files.push(output);
  console.log(`  frame ${String(frame).padStart(4)}  ${output}`);
}

// Contact sheet: two scenes per row, each as entrance | settled.
const sheet = path.join(outDir, "contact-sheet.png");
execFileSync("ffmpeg", [
  "-y",
  "-loglevel",
  "error",
  ...files.flatMap((f) => ["-i", f]),
  "-filter_complex",
  `${files.map((_, i) => `[${i}:v]`).join("")}xstack=inputs=${files.length}:layout=${xstackLayout(files.length, 4)}:fill=black,scale=iw/2:-1`,
  sheet,
]);
console.log(`\nContact sheet: ${sheet}`);

function xstackLayout(count, cols) {
  return Array.from({ length: count }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x =
      col === 0 ? "0" : Array.from({ length: col }, () => "w0").join("+");
    const y =
      row === 0 ? "0" : Array.from({ length: row }, () => "h0").join("+");
    return `${x}_${y}`;
  }).join("|");
}
