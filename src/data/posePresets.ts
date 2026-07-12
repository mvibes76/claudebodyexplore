import type { PosePreset } from '@/types/pose'

// Fake-rig pose presets for the primitive mannequin. Each entry maps a joint
// id to a rotation applied to that joint's transform group in BodyModel.tsx.
// When a real rigged GLB lands, these same ids should map to skeleton bones
// (via a name remap table) so this data does not need to change.
export const POSE_PRESETS: PosePreset[] = [
  {
    id: 'neutral-standing',
    name: 'Neutral standing',
    description: 'Default resting stance, arms relaxed at the sides.',
    joints: {},
  },
  {
    id: 'arms-out',
    name: 'Arms out',
    description: 'Arms extended horizontally, useful for full-body inspection.',
    joints: {
      leftShoulder: { rotation: [0, 0, Math.PI / 2] },
      rightShoulder: { rotation: [0, 0, -Math.PI / 2] },
    },
  },
  {
    id: 'walking-step',
    name: 'Walking step',
    description: 'Mid-stride pose with opposing arm and leg swing.',
    joints: {
      leftShoulder: { rotation: [0.5, 0, 0] },
      rightShoulder: { rotation: [-0.5, 0, 0] },
      leftHip: { rotation: [-0.4, 0, 0] },
      rightHip: { rotation: [0.4, 0, 0] },
      leftKnee: { rotation: [0.3, 0, 0] },
      rightKnee: { rotation: [0.1, 0, 0] },
    },
  },
  {
    id: 'sitting',
    name: 'Sitting',
    description: 'Seated pose with hips and knees bent to ninety degrees.',
    joints: {
      leftHip: { rotation: [-Math.PI / 2, 0, 0] },
      rightHip: { rotation: [-Math.PI / 2, 0, 0] },
      leftKnee: { rotation: [Math.PI / 2, 0, 0] },
      rightKnee: { rotation: [Math.PI / 2, 0, 0] },
      spine: { rotation: [0, 0, 0], position: [0, -0.28, 0] },
    },
  },
  {
    id: 'kneeling',
    name: 'Kneeling',
    description: 'One knee down, torso upright — a common reflective or resting pose.',
    joints: {
      leftHip: { rotation: [-1.9, 0, 0] },
      leftKnee: { rotation: [1.9, 0, 0] },
      rightHip: { rotation: [-0.9, 0, 0] },
      rightKnee: { rotation: [1.6, 0, 0] },
      spine: { rotation: [0, 0, 0], position: [0, -0.22, 0] },
    },
  },
  {
    id: 'reaching',
    name: 'Reaching',
    description: 'One arm extended upward and forward, as if reaching for an object.',
    joints: {
      rightShoulder: { rotation: [-2.4, 0, -0.3] },
      rightElbow: { rotation: [0.2, 0, 0] },
      spine: { rotation: [0.15, 0, 0] },
    },
  },
  {
    id: 'prayer-reflective',
    name: 'Prayer / reflective',
    description: 'Head bowed slightly, hands drawn together at chest height.',
    joints: {
      head: { rotation: [0.35, 0, 0] },
      leftShoulder: { rotation: [0.9, 0.3, 0.2] },
      rightShoulder: { rotation: [0.9, -0.3, -0.2] },
      leftElbow: { rotation: [1.7, 0, 0] },
      rightElbow: { rotation: [1.7, 0, 0] },
    },
  },
  {
    id: 'running-start',
    name: 'Running start',
    description: 'Low, forward-leaning start position with a driving arm swing.',
    joints: {
      spine: { rotation: [0.5, 0, 0] },
      leftShoulder: { rotation: [-0.9, 0, 0] },
      rightShoulder: { rotation: [0.9, 0, 0] },
      leftHip: { rotation: [-0.8, 0, 0] },
      rightHip: { rotation: [0.5, 0, 0] },
      leftKnee: { rotation: [0.2, 0, 0] },
      rightKnee: { rotation: [1.1, 0, 0] },
    },
  },
]
