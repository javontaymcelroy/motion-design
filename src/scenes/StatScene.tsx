import {
  Interactive,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Counter } from "../components/Counter";
import { Kicker } from "../components/Kicker";
import { KineticText } from "../components/KineticText";
import { colors, type } from "../theme";
import { SafeColumn } from "./layout";

type StatSceneProps = {
  readonly label: string;
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly decimals?: number;
  readonly caption: string;
};

// One number, counted up, with a single line explaining why it matters.
const StatSceneInner = ({
  label,
  value,
  prefix,
  suffix,
  decimals,
  caption,
}: StatSceneProps) => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Backdrop name="Backdrop" glowY={0.55} />
      <SafeColumn gap={40}>
        <Kicker name="Label" text={label} />
        <Counter
          name="Counter"
          from={0.15 * fps}
          value={value}
          prefix={prefix}
          suffix={suffix}
          decimals={decimals}
        />
        <KineticText
          name="Caption"
          from={0.9 * fps}
          text={caption}
          style={{ fontSize: type.title, fontWeight: 700, color: colors.muted }}
        />
      </SafeColumn>
    </>
  );
};

const statSceneSchema = {
  label: { type: "string", default: "Label", description: "Label" },
  value: {
    type: "number",
    default: 100,
    step: 1,
    description: "Value",
    hiddenFromList: false,
  },
  prefix: { type: "string", default: "", description: "Prefix" },
  suffix: { type: "string", default: "", description: "Suffix" },
  decimals: {
    type: "number",
    default: 0,
    min: 0,
    step: 1,
    description: "Decimals",
    hiddenFromList: false,
  },
  caption: { type: "string", default: "Caption", description: "Caption" },
} as const satisfies InteractivitySchema;

export const StatScene = Interactive.create({
  Component: StatSceneInner,
  layout: "absolute-fill",
  schema: statSceneSchema,
});
