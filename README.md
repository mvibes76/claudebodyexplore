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

## Adding a real body model

Two different upgrades, sourced differently:

**1. Realistic body shape/skin** (swap for the primitive mannequin).
Get a rigged humanoid `.glb`:
- [MakeHuman](http://www.makehumancommunity.org) — free, open source, and its
  body sliders (height/weight/age/muscle) map almost 1:1 onto
  `src/types/body.ts`. Export as glTF/GLB, or export FBX and convert with
  Blender.
- Mixamo-rigged models (bone names like `mixamorig:Head` are already in
  `BONE_NAME_MAP`).
- Any rigged humanoid glTF, as long as its bone names are exact-match
  somewhere in `BONE_NAME_MAP` (add more candidates if not).

**2. Real anatomical layers** (actual muscle/organ/skeleton meshes instead
of colored placeholders). This is mostly licensed content — Zygote,
BioDigital, Complete Anatomy. Some free "flayed" anatomy models exist on
Sketchfab; check the license before using one in anything you ship.

**Steps once you have a file:**
1. Drop it at `public/models/body.glb` (or update the path).
2. Open `src/three/modelConfig.ts`, set `useRealModel: true`.
3. If the console warns about missing bones or layer meshes, add the
   real names you see in your DCC tool / glTF inspector to `BONE_NAME_MAP`
   or `LAYER_MESH_NAME_MATCH` in that same file. No other code changes.
4. If the file is broken or missing, `ModelErrorBoundary` catches it and
   falls back to the primitive mannequin automatically — check the
   console for why.

Nothing in `BodyModel.tsx`, `PoseControls.tsx`, `AnatomyLayerPanel.tsx`, etc.
needs to change either way — they all talk to the same pose/layer data
regardless of which geometry is rendering it.

## Swapping in real assets later


Everything placeholder is labeled as such in code comments, specifically:

- **Body mesh**: `src/three/PrimitiveMannequin.tsx` builds a primitive-geometry
  mannequin out of nested `<group>`s keyed by `JointId` (see
  `src/types/pose.ts`). `src/three/GLTFBodyModel.tsx` is the real-model
  equivalent — see "Adding a real body model" above.
- **Anatomy layers**: `LayerMesh` in `PrimitiveMannequin.tsx` currently draws a
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
