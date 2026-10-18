import {
  linearTiming,
  type TransitionPresentation,
  type TransitionPresentationComponentProps,
} from "@remotion/transitions";
import { interpolate } from "remotion";
import { colors, duration, ease, format } from "./tokens";

type PushProps = Record<string, never>;

// House transition: the outgoing scene sinks back and dims while the incoming
// scene pushes up from below.
const PushPresentation = ({
  children,
  presentationDirection,
  presentationProgress,
}: TransitionPresentationComponentProps<PushProps>) => {
  const p = ease.inOut(presentationProgress);

  if (presentationDirection === "exiting") {
    // Brand background behind the shrinking scene so no empty frame shows.
    return (
      <div
        style={{ position: "absolute", inset: 0, backgroundColor: colors.bg }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            borderRadius: interpolate(p, [0, 1], [0, 48]),
            scale: interpolate(p, [0, 1], [1, 0.92]),
            translate: `0px ${interpolate(p, [0, 1], [0, -120])}px`,
            opacity: interpolate(p, [0, 1], [1, 0.25]),
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        borderRadius: interpolate(p, [0, 1], [48, 0]),
        translate: `0px ${interpolate(p, [0, 1], [100, 0])}%`,
        boxShadow: "0 -30px 80px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
};

export const push = (): TransitionPresentation<PushProps> => ({
  component: PushPresentation,
  props: {},
});

export const transitionFrames = Math.round(duration.transition * format.fps);

export const brandTiming = () =>
  linearTiming({ durationInFrames: transitionFrames });
