// Storyboard contract. Every reel starts as a storyboard JSON in /storyboards
// that is approved before any animation code is written. The reel's scene
// timing is read from it, so the plan and the render can't drift apart.
//
// Kept to erasable TypeScript so scripts can import it with plain `node`.
import { z } from "zod";

export const SCENE_COMPONENTS = [
  "HookScene",
  "StatScene",
  "ListScene",
  "CTAScene",
] as const;

export const SceneSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/, "scene id must be kebab-case"),
  component: z.enum(SCENE_COMPONENTS),
  seconds: z.number().min(1.5).max(12),
  // Exactly the words that appear on screen, one entry per text element.
  onScreenText: z.array(z.string().min(1)).min(1),
  // What moves, when, in order. Written like a motion designer's notes.
  beats: z.array(z.string().min(1)).min(1),
  notes: z.string().optional(),
});

export const StoryboardSchema = z.object({
  id: z.string().regex(/^[A-Za-z0-9-]+$/, "id becomes the composition id"),
  title: z.string(),
  goal: z.string(),
  audience: z.string(),
  format: z.literal("reel-9x16"),
  // eslint-disable-next-line @remotion/non-pure-animation -- scene transition spec, not CSS
  transition: z.object({
    type: z.enum(["push", "fade", "cut"]),
    seconds: z.number().min(0).max(1),
  }),
  voiceover: z.string().nullable(),
  scenes: z.array(SceneSchema).min(1),
});

export type Storyboard = z.infer<typeof StoryboardSchema>;
export type StoryboardScene = z.infer<typeof SceneSchema>;
