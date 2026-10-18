import {
  Interactive,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Kicker } from "../components/Kicker";
import { KineticText } from "../components/KineticText";
import { type } from "../theme";
import { SafeColumn } from "./layout";

type HookSceneProps = {
  readonly kicker: string;
  readonly headline: string;
  readonly highlight?: readonly string[];
};

// Opening scene. One claim, big, landed inside the first second.
const HookSceneInner = ({
  kicker,
  headline,
  highlight = [],
}: HookSceneProps) => {
  const { fps } = useVideoConfig();

  return (
    <>
      <Backdrop name="Backdrop" glowY={0.32} />
      <SafeColumn gap={56}>
        <Kicker name="Kicker" text={kicker} />
        <KineticText
          name="Headline"
          from={0.2 * fps}
          text={headline}
          highlight={highlight}
          style={{ fontSize: type.display }}
        />
      </SafeColumn>
    </>
  );
};

const hookSceneSchema = {
  kicker: { type: "string", default: "Kicker", description: "Kicker" },
  headline: { type: "string", default: "Headline", description: "Headline" },
} as const satisfies InteractivitySchema;

export const HookScene = Interactive.create({
  Component: HookSceneInner,
  layout: "absolute-fill",
  schema: hookSceneSchema,
});
