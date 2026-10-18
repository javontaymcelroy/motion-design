---
name: recipe
description: Turn a reference motion clip (a Reel, TikTok, ad, or description of one) into a reusable motion recipe in docs/recipes/, mapped onto this repo's tokens and components. Use when the user shares or describes a clip and says they want that look, feel, or animation style.
---

# Capturing a motion recipe

The goal is to make a reference reproducible: describe the motion precisely
enough that it can be rebuilt from the design system every time.

1. **Get the reference.** If you can't open the link (Instagram and TikTok
   usually block automated fetching), ask the user for a screen recording
   dropped in `references/` (git-ignored) or a beat-by-beat description. With a
   local file, extract frames to study it:
   `ffmpeg -i references/clip.mp4 -vf fps=10,scale=270:-1 out/ref/%03d.png`
   then tile a range into a sheet and read it.
2. **Break it down** by copying `docs/recipes/_template.md` to
   `docs/recipes/<kebab-name>.md` and filling in every section. Express timing
   in seconds and easing as one of the `ease.*` tokens (or a new curve with
   its bezier values if none fits).
3. **Map to the library.** For each beat, name the existing component that
   does it or say what's missing. Missing pieces become new components or
   props, built to DESIGN.md rules, not one-off code.
4. **Prove it.** Build the smallest composition that shows the recipe (an
   Elements entry or a scene) and check it with stills.
5. If the recipe changes the house style (new easing, new transition), update
   `tokens.ts` and `DESIGN.md` together, and tell the user.
