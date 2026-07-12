# Human Exhibit — Scene 1: Interactive Body Viewer

A browser-based prototype. React + TypeScript + Three.js (via React Three Fiber
+ Drei) + Zustand. Museum-grade, non-medical, non-sexual, educational tone.

## Run it

```
npm install
npm run dev
```

Open the printed localhost URL. Production build: `npm run build` (output in
`dist/`), preview with `npm run preview`.

## What's built (Scene 1 only, per spec — Scene 2 not started)

- Full-screen 3D viewport: orbit/zoom/pan, reset camera, studio lighting,
  dark museum background, grid floor, clickable body regions.
- Anatomy layer system: skin / muscles / skeleton / organs / circulatory /
  nervous. Each has visible toggle, opacity slider, highlight mode, isolate
  mode. Rendered today as tinted placeholder geometry — see "Swapping in
  real assets" below.
- Body customization panel: sex model, gender presentation, age range,
  height, weight, body type, skin tone, heritage-inspired preset. Heritage
  presets only ever change a skin-tone range and a hair placeholder label —
  never body shape. See `src/data/bodyPresets.ts`.
- Pose controls: 8 presets (neutral, arms out, walking step, sitting,
  kneeling, reaching, prayer/reflective, running start), driving a fake
  joint rig built from nested transform groups.
- Body region selection: 18 clickable regions, each with educational notes
  and related anatomy layers shown in the right panel.
- Issue Explorer: 8 sample educational issues across all 8 categories, each
  with a visual marker (glow/pin/heatmap/outline) and the required
  disclaimer ("This is educational visualization only and not a medical
  diagnosis.") rendered wherever an issue is shown.
- Wardrobe system: 5 presets, fully independent from anatomy layers.
- Simulation mode: idle breathing and weight-shift are live animations;
  walking/balance/joint-range are UI-present but marked "Scene 2" — the
  architecture is ready, the animation isn't built yet (per spec, scope is
  Scene 1 only).

## Architecture

```
/src
  /components   UI panels and mode-specific controls
  /data         Static/seed data — layers, regions, issues, poses, wardrobe, body presets
  /state        Zustand stores (useBodyStore, useSceneStore)
  /types        Shared TypeScript types for every subsystem
  /three        R3F/Three components — the actual 3D scene
```

State is split in two:
- `useBodyStore` — the body itself (customization, wardrobe, pose, sim toggles).
- `useSceneStore` — the viewing experience (mode, layer visibility, selection, camera).

## Swapping in real assets later

Everything placeholder is labeled as such in code comments, specifically:

- **Body mesh**: `src/three/BodyModel.tsx` builds a primitive-geometry
  mannequin out of nested `<group>`s keyed by `JointId` (see
  `src/types/pose.ts`). A real rigged GLB should expose bones with matching
  names (or a remap table) so `PosePreset` data works unchanged.
- **Anatomy layers**: `LayerMesh` in `BodyModel.tsx` currently draws a
  scaled-down colored primitive per layer. Swap this for real per-layer
  meshes/materials loaded from GLB, keyed by the same `AnatomyLayerId`.
- **Region hitboxes**: `src/three/BodyRegionHitboxes.tsx` uses fixed
  neutral-standing coordinates from `src/data/bodyRegions.ts`. Known Scene-1
  limitation: hitboxes don't yet follow the mannequin through non-neutral
  poses — flagged in-code for the next pass.
- **Wardrobe & body-part geometry**: slot values in
  `src/data/wardrobePresets.ts` are placeholder string keys, ready to become
  asset ids/paths once a garment pipeline exists.

## Explicitly out of scope for Scene 1 (the "ocean," not the "lake")

- Real licensed anatomical models.
- Full walking/balance/limp physics (Rapier/Cannon not wired in yet).
- Scene 2 and beyond (multi-scene navigation, save/share, etc).
