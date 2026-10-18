import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { KineticText } from "../components/KineticText";
import {
  clamp,
  colors,
  displayFont,
  ease,
  monoFont,
  radius,
  type,
} from "../theme";
import { SafeColumn } from "./layout";

type CTASceneProps = {
  readonly headline: string;
  readonly highlight?: readonly string[];
  readonly handle: string;
  readonly action?: string;
};

// Closing scene: payoff line, then the handle and a single action.
const CTASceneInner = ({
  headline,
  highlight = [],
  handle,
  action = "Follow",
}: CTASceneProps) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const buttonAt = 0.9 * fps;

  return (
    <>
      <Backdrop name="Backdrop" glowY={0.7} />
      <SafeColumn gap={72} align="center">
        <KineticText
          name="Headline"
          text={headline}
          highlight={highlight}
          style={{ fontSize: type.headline, textAlign: "center" }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: interpolate(
              frame,
              [buttonAt, buttonAt + 8],
              [0, 1],
              clamp,
            ),
            scale: interpolate(frame, [buttonAt, buttonAt + 14], [0.6, 1], {
              ...clamp,
              easing: ease.pop,
              output: "perceptual-scale",
            }),
          }}
        >
          <span
            style={{
              fontFamily: monoFont,
              fontSize: type.body,
              fontWeight: 700,
              color: colors.ink,
            }}
          >
            {handle}
          </span>
          <span
            style={{
              padding: "20px 40px",
              borderRadius: radius.pill,
              backgroundColor: colors.accent,
              color: colors.accentInk,
              fontFamily: displayFont,
              fontSize: type.body,
              fontWeight: 800,
            }}
          >
            {action}
          </span>
        </div>
      </SafeColumn>
    </>
  );
};

const ctaSceneSchema = {
  headline: { type: "string", default: "Headline", description: "Headline" },
  handle: { type: "string", default: "@handle", description: "Handle" },
  action: { type: "string", default: "Follow", description: "Action" },
} as const satisfies InteractivitySchema;

export const CTAScene = Interactive.create({
  Component: CTASceneInner,
  layout: "absolute-fill",
  schema: ctaSceneSchema,
});
