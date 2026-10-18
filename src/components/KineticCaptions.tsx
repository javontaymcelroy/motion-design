import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { clamp, colors, displayFont, ease, type } from "../theme";

type KineticCaptionsProps = {
  readonly captions: Caption[];
  // Tokens closer together than this are shown on the same page.
  readonly combineWithinMs?: number;
  readonly style?: React.CSSProperties;
};

// Word-synced captions for voiceover reels. The spoken word is accented and
// pops in; upcoming words on the page are dimmed.
const KineticCaptionsInner: React.FC<KineticCaptionsProps> = ({
  captions,
  combineWithinMs = 900,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const nowMs = (frame / fps) * 1000;

  const { pages } = createTikTokStyleCaptions({
    captions,
    combineTokensWithinMilliseconds: combineWithinMs,
  });
  const page = pages.find(
    (p) => nowMs >= p.startMs && nowMs < p.startMs + p.durationMs,
  );

  return (
    <div
      style={{
        fontFamily: displayFont,
        fontSize: type.title,
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: `${type.tracking}em`,
        textAlign: "center",
        color: colors.ink,
        whiteSpace: "pre-wrap",
        textShadow: "0 6px 24px rgba(0,0,0,0.45)",
        ...style,
      }}
    >
      {page?.tokens.map((token) => {
        const active = nowMs >= token.fromMs && nowMs < token.toMs;
        const spoken = nowMs >= token.fromMs;
        const startFrame = (token.fromMs / 1000) * fps;

        return (
          <span
            key={token.fromMs}
            style={{
              display: "inline-block",
              color: active ? colors.accent : colors.ink,
              opacity: spoken ? 1 : 0.35,
              scale: interpolate(
                frame,
                [startFrame, startFrame + 5],
                [1.18, 1],
                {
                  ...clamp,
                  easing: ease.pop,
                },
              ),
            }}
          >
            {token.text}
          </span>
        );
      })}
    </div>
  );
};

const kineticCaptionsSchema = {
  ...Interactive.textSchema,
  ...Interactive.captionsSchema,
  combineWithinMs: {
    type: "number",
    default: 900,
    min: 0,
    step: 50,
    description: "Combine within (ms)",
    hiddenFromList: false,
  },
} as const satisfies InteractivitySchema;

export const KineticCaptions = Interactive.create({
  Component: KineticCaptionsInner,
  layout: "none",
  schema: kineticCaptionsSchema,
});
