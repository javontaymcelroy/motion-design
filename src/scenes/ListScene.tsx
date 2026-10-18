import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { KineticText } from "../components/KineticText";
import { clamp, colors, duration, ease, monoFont, type } from "../theme";
import { SafeColumn } from "./layout";

type ListSceneProps = {
  readonly title: string;
  // Up to 4 short items. Each enters on its own beat.
  readonly items: readonly string[];
  // Seconds between items.
  readonly beat?: number;
};

const ListSceneInner = ({ title, items, beat = 0.45 }: ListSceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const firstItemAt = 0.6;

  return (
    <>
      <Backdrop name="Backdrop" glowY={0.2} />
      <SafeColumn gap={64}>
        <KineticText
          name="Title"
          text={title}
          style={{ fontSize: type.headline }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 36,
            width: "100%",
          }}
        >
          {items.map((item, i) => {
            const start = (firstItemAt + i * beat) * fps;
            return (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 32,
                  paddingBottom: 28,
                  borderBottom: `2px solid ${colors.ink}1F`,
                  opacity: interpolate(
                    frame,
                    [start, start + duration.enter * fps],
                    [0, 1],
                    {
                      ...clamp,
                      easing: ease.out,
                    },
                  ),
                  translate: interpolate(
                    frame,
                    [start, start + duration.enter * fps],
                    ["0px 48px", "0px 0px"],
                    { ...clamp, easing: ease.out },
                  ),
                }}
              >
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: type.label,
                    fontWeight: 700,
                    color: colors.accent,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <KineticText
                  name={`Item ${i + 1}`}
                  from={start}
                  text={item}
                  style={{ fontSize: type.title, fontWeight: 700 }}
                />
              </div>
            );
          })}
        </div>
      </SafeColumn>
    </>
  );
};

const listSceneSchema = {
  title: { type: "string", default: "Title", description: "Title" },
  beat: {
    type: "number",
    default: 0.45,
    min: 0.1,
    step: 0.05,
    description: "Beat (s)",
    hiddenFromList: false,
  },
} as const satisfies InteractivitySchema;

export const ListScene = Interactive.create({
  Component: ListSceneInner,
  layout: "absolute-fill",
  schema: listSceneSchema,
});
