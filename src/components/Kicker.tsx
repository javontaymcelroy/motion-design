import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import {
  clamp,
  colors,
  duration,
  ease,
  monoFont,
  radius,
  type,
} from "../theme";

type KickerProps = {
  readonly text: string;
  readonly style?: React.CSSProperties;
};

// Small uppercase label that sets up the line below it. Slides in from the
// left with a pulsing accent dot.
const KickerInner: React.FC<KickerProps> = ({ text, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 28px 16px 22px",
        borderRadius: radius.pill,
        backgroundColor: colors.surface,
        border: `2px solid ${colors.ink}1A`,
        color: colors.ink,
        fontFamily: monoFont,
        fontSize: type.label,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity: interpolate(frame, [0, duration.enter * fps], [0, 1], {
          ...clamp,
          easing: ease.out,
        }),
        translate: interpolate(
          frame,
          [0, duration.enter * fps],
          ["-40px 0px", "0px 0px"],
          {
            ...clamp,
            easing: ease.out,
          },
        ),
        ...style,
      }}
    >
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: radius.pill,
          backgroundColor: colors.accent,
          scale: interpolate(
            Math.sin((frame / fps) * Math.PI * 2),
            [-1, 1],
            [0.75, 1.1],
          ),
        }}
      />
      {text}
    </div>
  );
};

const kickerSchema = {
  ...Interactive.textSchema,
  text: { type: "string", default: "New", description: "Text" },
} as const satisfies InteractivitySchema;

export const Kicker = Interactive.create({
  Component: KickerInner,
  layout: "none",
  schema: kickerSchema,
});
