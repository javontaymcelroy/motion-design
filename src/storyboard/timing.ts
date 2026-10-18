import type { Storyboard, StoryboardScene } from "./schema";

export const sceneFrames = (scene: StoryboardScene, fps: number) =>
  Math.round(scene.seconds * fps);

export const transitionFramesFor = (storyboard: Storyboard, fps: number) =>
  storyboard.transition.type === "cut"
    ? 0
    : Math.round(storyboard.transition.seconds * fps);

// Scenes overlap during transitions, so the total is shorter than the sum.
export const totalFrames = (storyboard: Storyboard, fps: number) => {
  const overlap =
    transitionFramesFor(storyboard, fps) * (storyboard.scenes.length - 1);
  return (
    storyboard.scenes.reduce((sum, s) => sum + sceneFrames(s, fps), 0) - overlap
  );
};

// Where each scene sits on the reel's timeline, including the frames it is
// fully on screen (not mid-transition).
export const sceneWindows = (storyboard: Storyboard, fps: number) => {
  const t = transitionFramesFor(storyboard, fps);
  let start = 0;

  return storyboard.scenes.map((scene, i) => {
    const frames = sceneFrames(scene, fps);
    const window = {
      scene,
      start,
      end: start + frames,
      soloStart: i === 0 ? start : start + t,
      soloEnd:
        i === storyboard.scenes.length - 1
          ? start + frames
          : start + frames - t,
    };
    start += frames - t;
    return window;
  });
};

export const scenesById = (storyboard: Storyboard) =>
  Object.fromEntries(storyboard.scenes.map((s) => [s.id, s])) as Record<
    string,
    StoryboardScene
  >;
