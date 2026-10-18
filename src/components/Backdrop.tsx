import type React from "react";
import {
  Interactive,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { colors } from "../theme";

type BackdropProps = {
  readonly glowColor?: string;
  // 0–1, vertical anchor of the glow.
  readonly glowY?: number;
  readonly grain?: boolean;
  readonly style?: React.CSSProperties;
};

// Full-frame background: brand color, a slow drifting glow and film grain.
// Every scene starts with this so cuts never land on a flat, dead frame.
const BackdropInner: React.FC<BackdropProps> = ({
  glowColor = colors.glow,
  glowY = 0.3,
  grain = true,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const t = frame / fps;
  const cx = 50 + Math.sin(t * 0.6) * 12;
  const cy = glowY * 100 + Math.cos(t * 0.45) * 6;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: colors.bg,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(60% 38% at ${cx}% ${cy}%, ${glowColor}55 0%, ${glowColor}00 70%)`,
        }}
      />
      {grain ? (
        <svg
          width={width}
          height={height}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.07,
            mixBlendMode: "screen",
          }}
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="2"
              seed={Math.floor(frame / 2)}
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      ) : null}
    </div>
  );
};

const backdropSchema = {
  glowColor: { type: "color", default: colors.glow, description: "Glow color" },
  glowY: {
    type: "number",
    default: 0.3,
    min: 0,
    max: 1,
    step: 0.01,
    description: "Glow Y",
    hiddenFromList: false,
  },
  grain: { type: "boolean", default: true, description: "Grain" },
} as const satisfies InteractivitySchema;

export const Backdrop = Interactive.create({
  Component: BackdropInner,
  layout: "none",
  schema: backdropSchema,
});
