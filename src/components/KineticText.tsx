import type React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  type InteractivitySchema,
} from "remotion";
import { clamp, colors, displayFont, duration, ease, type } from "../theme";

type KineticTextProps = {
  // Use "\n" for a forced line break.
  readonly text: string;
  // Words (case-insensitive, punctuation ignored) that get the accent treatment.
  readonly highlight?: readonly string[];
  readonly highlightStyle?: "marker" | "color";
  readonly stagger?: number;
  readonly style?: React.CSSProperties;
};

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

// Headline that rises in word by word from behind a mask. Highlighted words
// get an accent marker that wipes in once the word has landed.
const KineticTextInner: React.FC<KineticTextProps> = ({
  text,
  highlight = [],
  highlightStyle = "marker",
  stagger = duration.stagger,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const highlighted = new Set(highlight.map(normalize));

  let wordIndex = 0;
  const lines = text.split("\n").map((line) =>
    line
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, index: wordIndex++ })),
  );

  return (
    <div
      style={{
        fontFamily: displayFont,
        fontSize: type.headline,
        fontWeight: 800,
        lineHeight: type.lineHeight,
        letterSpacing: `${type.tracking}em`,
        color: colors.ink,
        margin: 0,
        ...style,
      }}
    >
      {lines.map((words, lineIndex) => (
        <div key={lineIndex} style={{ display: "block" }}>
          {words.map(({ word, index }) => {
            const start = index * stagger * fps;
            const isHighlight = highlighted.has(normalize(word));
            const markerStart = start + duration.enter * fps * 0.6;

            return (
              <span
                key={index}
                style={{
                  display: "inline-block",
                  overflow: "clip",
                  overflowClipMargin: "0.12em",
                  paddingBottom: "0.08em",
                  marginRight: "0.24em",
                  verticalAlign: "top",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    position: "relative",
                    translate: interpolate(
                      frame,
                      [start, start + duration.enter * fps],
                      ["0px 110%", "0px 0%"],
                      { ...clamp, easing: ease.out },
                    ),
                    rotate: interpolate(
                      frame,
                      [start, start + duration.enter * fps],
                      ["6deg", "0deg"],
                      { ...clamp, easing: ease.out },
                    ),
                    transformOrigin: "0% 100%",
                    color:
                      isHighlight && highlightStyle === "color"
                        ? colors.accent
                        : undefined,
                  }}
                >
                  {isHighlight && highlightStyle === "marker" ? (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          inset: "0.06em -0.12em 0.02em -0.12em",
                          backgroundColor: colors.accent,
                          borderRadius: "0.08em",
                          transformOrigin: "0% 50%",
                          scale: interpolate(
                            frame,
                            [markerStart, markerStart + 0.35 * fps],
                            ["0 1", "1 1"],
                            { ...clamp, easing: ease.inOut },
                          ),
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          color:
                            frame >= markerStart + 0.12 * fps
                              ? colors.accentInk
                              : undefined,
                        }}
                      >
                        {word}
                      </span>
                    </>
                  ) : (
                    word
                  )}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const kineticTextSchema = {
  ...Interactive.textSchema,
  text: { type: "string", default: "Make it move", description: "Text" },
  highlightStyle: {
    type: "enum",
    default: "marker",
    description: "Highlight style",
    variants: { marker: {}, color: {} },
  },
  stagger: {
    type: "number",
    default: duration.stagger,
    min: 0,
    step: 0.01,
    description: "Stagger (s)",
    hiddenFromList: false,
  },
} as const satisfies InteractivitySchema;

export const KineticText = Interactive.create({
  Component: KineticTextInner,
  layout: "none",
  schema: kineticTextSchema,
});
