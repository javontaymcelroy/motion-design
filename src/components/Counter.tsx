import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { clamp, colors, displayFont, ease, type } from "../theme";

type CounterProps = {
  readonly value: number;
  readonly startValue?: number;
  readonly decimals?: number;
  readonly prefix?: string;
  readonly suffix?: string;
  // Seconds to count from startValue to value.
  readonly countDuration?: number;
  readonly style?: React.CSSProperties;
};

// Big number that counts up, then pops slightly when it lands.
const CounterInner: React.FC<CounterProps> = ({
  value,
  startValue = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  countDuration = 1.2,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const landAt = countDuration * fps;

  const current = interpolate(frame, [0, landAt], [startValue, value], {
    ...clamp,
    easing: ease.out,
  });

  return (
    <div
      style={{
        fontFamily: displayFont,
        fontSize: type.display * 1.6,
        fontWeight: 800,
        lineHeight: 0.9,
        letterSpacing: `${type.tracking * 1.4}em`,
        fontVariantNumeric: "tabular-nums",
        color: colors.ink,
        transformOrigin: "0% 100%",
        scale: interpolate(
          frame,
          [landAt - 4, landAt, landAt + 8],
          [1, 1.06, 1],
          {
            ...clamp,
            easing: ease.inOut,
          },
        ),
        ...style,
      }}
    >
      {prefix}
      {current.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      <span style={{ color: colors.accent }}>{suffix}</span>
    </div>
  );
};

const counterSchema = {
  ...Interactive.textSchema,
  value: {
    type: "number",
    default: 100,
    step: 1,
    description: "Value",
    hiddenFromList: false,
  },
  startValue: {
    type: "number",
    default: 0,
    step: 1,
    description: "Start value",
    hiddenFromList: false,
  },
  decimals: {
    type: "number",
    default: 0,
    min: 0,
    step: 1,
    description: "Decimals",
    hiddenFromList: false,
  },
  prefix: { type: "string", default: "", description: "Prefix" },
  suffix: { type: "string", default: "", description: "Suffix" },
  countDuration: {
    type: "number",
    default: 1.2,
    min: 0.1,
    step: 0.1,
    description: "Count duration (s)",
    hiddenFromList: false,
  },
} as const satisfies InteractivitySchema;

export const Counter = Interactive.create({
  Component: CounterInner,
  layout: "none",
  schema: counterSchema,
});
