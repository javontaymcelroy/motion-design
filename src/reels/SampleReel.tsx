import { TransitionSeries } from "@remotion/transitions";
import { useVideoConfig } from "remotion";
import { z } from "zod";
import storyboardJson from "../../storyboards/sample-reel.json";
import { SafeAreaGuides } from "../components/SafeAreaGuides";
import { CTAScene } from "../scenes/CTAScene";
import { HookScene } from "../scenes/HookScene";
import { ListScene } from "../scenes/ListScene";
import { StatScene } from "../scenes/StatScene";
import { StoryboardSchema } from "../storyboard/schema";
import { sceneFrames, scenesById } from "../storyboard/timing";
import { brandTiming, push } from "../theme/transitions";

export const sampleReelStoryboard = StoryboardSchema.parse(storyboardJson);
const s = scenesById(sampleReelStoryboard);

export const reelPropsSchema = z.object({
  showGuides: z.boolean(),
});

// Scene timing comes from storyboards/sample-reel.json. Text and props are
// inline so they stay editable in Studio.
export const SampleReel = ({ showGuides }: z.infer<typeof reelPropsSchema>) => {
  const { fps } = useVideoConfig();

  return (
    <>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Hook"
          durationInFrames={sceneFrames(s.hook, fps)}
        >
          <HookScene
            name="Hook"
            kicker="Claude × Remotion"
            headline={"Motion design,\nwritten as code"}
            highlight={["code"]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={push()}
          timing={brandTiming()}
        />
        <TransitionSeries.Sequence
          name="Stat"
          durationInFrames={sceneFrames(s.stat, fps)}
        >
          <StatScene
            name="Stat"
            label="This reel"
            value={4}
            suffix=" scenes"
            caption={"built from one\ncomponent library"}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={push()}
          timing={brandTiming()}
        />
        <TransitionSeries.Sequence
          name="System"
          durationInFrames={sceneFrames(s.system, fps)}
        >
          <ListScene
            name="System"
            title="The system"
            items={["Brand tokens", "Storyboard first", "Still-frame review"]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={push()}
          timing={brandTiming()}
        />
        <TransitionSeries.Sequence
          name="CTA"
          durationInFrames={sceneFrames(s.cta, fps)}
        >
          <CTAScene
            name="CTA"
            headline={"Same brand,\nevery video"}
            highlight={["every"]}
            handle="@yourhandle"
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {showGuides ? <SafeAreaGuides /> : null}
    </>
  );
};
