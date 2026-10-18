import { Composition, Folder } from "remotion";
import { Backdrop } from "./components/Backdrop";
import { Counter } from "./components/Counter";
import { Kicker } from "./components/Kicker";
import { KineticCaptions } from "./components/KineticCaptions";
import { KineticText } from "./components/KineticText";
import {
  reelPropsSchema,
  SampleReel,
  sampleReelStoryboard,
} from "./reels/SampleReel";
import { CTAScene } from "./scenes/CTAScene";
import { HookScene } from "./scenes/HookScene";
import { ListScene } from "./scenes/ListScene";
import { StatScene } from "./scenes/StatScene";
import { totalFrames } from "./storyboard/timing";
import { format } from "./theme";

export const RemotionRoot = () => (
  <>
    <Folder name="Reels">
      <Composition
        id="SampleReel"
        component={SampleReel}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={totalFrames(sampleReelStoryboard, format.fps)}
        schema={reelPropsSchema}
        defaultProps={{ showGuides: false }}
      />
    </Folder>
    <Folder name="Scenes">
      <Composition
        id="HookScene"
        component={HookScene}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={96}
        defaultProps={{
          kicker: "Claude × Remotion",
          headline: "Motion design,\nwritten as code",
          highlight: ["code"],
        }}
      />
      <Composition
        id="StatScene"
        component={StatScene}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={102}
        defaultProps={{
          label: "This reel",
          value: 4,
          suffix: " scenes",
          caption: "built from one\ncomponent library",
        }}
      />
      <Composition
        id="ListScene"
        component={ListScene}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={126}
        defaultProps={{
          title: "The system",
          items: ["Brand tokens", "Storyboard first", "Still-frame review"],
        }}
      />
      <Composition
        id="CTAScene"
        component={CTAScene}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={96}
        defaultProps={{
          headline: "Same brand,\nevery video",
          highlight: ["every"],
          handle: "@yourhandle",
        }}
      />
    </Folder>
    <Folder name="Elements">
      <Composition
        id="KineticText"
        component={KineticText}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={60}
        defaultProps={{
          text: "Make it\nmove",
          highlight: ["move"],
          style: { position: "absolute", left: 120, top: 800 },
        }}
      />
      <Composition
        id="Kicker"
        component={Kicker}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={45}
        defaultProps={{
          text: "New drop",
          style: { position: "absolute", left: 120, top: 900 },
        }}
      />
      <Composition
        id="Counter"
        component={Counter}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={60}
        defaultProps={{
          value: 98,
          suffix: "%",
          style: { position: "absolute", left: 120, top: 760 },
        }}
      />
      <Composition
        id="Backdrop"
        component={Backdrop}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={150}
        defaultProps={{ glowY: 0.3 }}
      />
      <Composition
        id="KineticCaptions"
        component={KineticCaptions}
        width={format.width}
        height={format.height}
        fps={format.fps}
        durationInFrames={75}
        defaultProps={{
          style: { position: "absolute", left: 120, right: 120, top: 1300 },
          captions: [
            {
              text: "Every",
              startMs: 0,
              endMs: 300,
              timestampMs: 150,
              confidence: null,
            },
            {
              text: " word",
              startMs: 300,
              endMs: 620,
              timestampMs: 460,
              confidence: null,
            },
            {
              text: " lands",
              startMs: 620,
              endMs: 980,
              timestampMs: 800,
              confidence: null,
            },
            {
              text: " on",
              startMs: 1300,
              endMs: 1450,
              timestampMs: 1375,
              confidence: null,
            },
            {
              text: " the",
              startMs: 1450,
              endMs: 1600,
              timestampMs: 1525,
              confidence: null,
            },
            {
              text: " beat",
              startMs: 1600,
              endMs: 2400,
              timestampMs: 2000,
              confidence: null,
            },
          ],
        }}
      />
    </Folder>
  </>
);
