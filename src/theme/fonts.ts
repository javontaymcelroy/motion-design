// Brand fonts are bundled in public/fonts so renders never depend on a font
// CDN (offline, CI and Lambda renders look identical to Studio).
// loadFont() blocks rendering until each file is ready.
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const displayFont = "Inter Tight";
export const monoFont = "JetBrains Mono";

loadFont({
  family: displayFont,
  url: staticFile("fonts/InterTight-Variable.woff2"),
  weight: "100 900",
  display: "block",
});

loadFont({
  family: monoFont,
  url: staticFile("fonts/JetBrainsMono-Variable.woff2"),
  weight: "100 800",
  display: "block",
});
