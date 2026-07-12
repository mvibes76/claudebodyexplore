// Pose system. Joint names are string keys so this interface works whether
// the underlying model is a primitive mannequin (Scene 1) or a real rigged
// skeleton loaded from a GLB (future scene). A real rig should expose bone
// names matching these joint ids, or provide a joint-name remap table.

export type JointId =
  | 'head'
  | 'neck'
  | 'spine'
  | 'leftShoulder'
  | 'leftElbow'
  | 'rightShoulder'
  | 'rightElbow'
  | 'leftHip'
  | 'leftKnee'
  | 'leftAnkle'
  | 'rightHip'
  | 'rightKnee'
  | 'rightAnkle'

export interface JointTransform {
  /** Euler rotation in radians: [x, y, z]. */
  rotation: [number, number, number]
  /** Optional local position offset, used sparingly (e.g. weight shift). */
  position?: [number, number, number]
}

export interface PosePreset {
  id: string
  name: string
  description: string
  joints: Partial<Record<JointId, JointTransform>>
}
