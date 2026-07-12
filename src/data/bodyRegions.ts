export type BodyRegionId =
  | 'head'
  | 'neck'
  | 'chest'
  | 'abdomen'
  | 'back'
  | 'leftShoulder'
  | 'rightShoulder'
  | 'leftArm'
  | 'rightArm'
  | 'leftHand'
  | 'rightHand'
  | 'hip'
  | 'leftLeg'
  | 'rightLeg'
  | 'leftKnee'
  | 'rightKnee'
  | 'leftFoot'
  | 'rightFoot'

export interface BodyRegion {
  id: BodyRegionId
  label: string
  /** Approximate local position on the placeholder mannequin, in meters. */
  position: [number, number, number]
  /** Rough hit-test radius for the invisible hitbox sphere. */
  radius: number
  educationalNotes: string[]
  relatedLayers: Array<'skin' | 'muscles' | 'skeleton' | 'organs' | 'circulatory' | 'nervous'>
}

export const BODY_REGIONS: BodyRegion[] = [
  {
    id: 'head',
    label: 'Head',
    position: [0, 1.62, 0],
    radius: 0.16,
    educationalNotes: [
      'Houses the brain, sensory organs, and the start of the central nervous system.',
      'The skull is made of 22 bones, most fused together at sutures.',
    ],
    relatedLayers: ['skin', 'skeleton', 'nervous'],
  },
  {
    id: 'neck',
    label: 'Neck',
    position: [0, 1.42, 0],
    radius: 0.09,
    educationalNotes: [
      'Contains the cervical spine (7 vertebrae), major arteries, and the trachea.',
      'A common site for posture-related muscle tension.',
    ],
    relatedLayers: ['skeleton', 'muscles', 'circulatory'],
  },
  {
    id: 'chest',
    label: 'Chest',
    position: [0, 1.18, 0.08],
    radius: 0.22,
    educationalNotes: [
      'The rib cage protects the heart and lungs.',
      'Breathing is powered mainly by the diaphragm, a muscle at the base of the ribcage.',
    ],
    relatedLayers: ['skeleton', 'organs', 'muscles', 'circulatory'],
  },
  {
    id: 'abdomen',
    label: 'Abdomen',
    position: [0, 0.95, 0.08],
    radius: 0.2,
    educationalNotes: [
      'Contains the stomach, liver, intestines, and kidneys.',
      'Core muscles here stabilize the spine during nearly all movement.',
    ],
    relatedLayers: ['organs', 'muscles'],
  },
  {
    id: 'back',
    label: 'Back',
    position: [0, 1.1, -0.12],
    radius: 0.22,
    educationalNotes: [
      'The spine has 33 vertebrae grouped into 5 regions.',
      'Poor posture concentrates load on the lower lumbar region.',
    ],
    relatedLayers: ['skeleton', 'muscles', 'nervous'],
  },
  {
    id: 'leftShoulder',
    label: 'Left Shoulder',
    position: [-0.24, 1.36, 0],
    radius: 0.1,
    educationalNotes: ['The shoulder is the most mobile joint in the body, trading stability for range of motion.'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'rightShoulder',
    label: 'Right Shoulder',
    position: [0.24, 1.36, 0],
    radius: 0.1,
    educationalNotes: ['The shoulder is the most mobile joint in the body, trading stability for range of motion.'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'leftArm',
    label: 'Left Arm',
    position: [-0.32, 1.02, 0],
    radius: 0.09,
    educationalNotes: ['The upper arm bone (humerus) and forearm bones (radius, ulna) allow rotation of the hand.'],
    relatedLayers: ['skeleton', 'muscles', 'circulatory'],
  },
  {
    id: 'rightArm',
    label: 'Right Arm',
    position: [0.32, 1.02, 0],
    radius: 0.09,
    educationalNotes: ['The upper arm bone (humerus) and forearm bones (radius, ulna) allow rotation of the hand.'],
    relatedLayers: ['skeleton', 'muscles', 'circulatory'],
  },
  {
    id: 'leftHand',
    label: 'Left Hand',
    position: [-0.38, 0.66, 0],
    radius: 0.08,
    educationalNotes: ['Each hand has 27 bones, giving it exceptional fine-motor range.'],
    relatedLayers: ['skeleton', 'nervous'],
  },
  {
    id: 'rightHand',
    label: 'Right Hand',
    position: [0.38, 0.66, 0],
    radius: 0.08,
    educationalNotes: ['Each hand has 27 bones, giving it exceptional fine-motor range.'],
    relatedLayers: ['skeleton', 'nervous'],
  },
  {
    id: 'hip',
    label: 'Hip',
    position: [0, 0.78, 0],
    radius: 0.16,
    educationalNotes: ['The hip is a ball-and-socket joint that carries most of the body\u2019s weight while standing and walking.'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'leftLeg',
    label: 'Left Leg',
    position: [-0.11, 0.42, 0],
    radius: 0.11,
    educationalNotes: ['The femur is the longest and strongest bone in the human body.'],
    relatedLayers: ['skeleton', 'muscles', 'circulatory'],
  },
  {
    id: 'rightLeg',
    label: 'Right Leg',
    position: [0.11, 0.42, 0],
    radius: 0.11,
    educationalNotes: ['The femur is the longest and strongest bone in the human body.'],
    relatedLayers: ['skeleton', 'muscles', 'circulatory'],
  },
  {
    id: 'leftKnee',
    label: 'Left Knee',
    position: [-0.11, 0.22, 0.02],
    radius: 0.09,
    educationalNotes: ['The knee is a hinge joint stabilized by four major ligaments (ACL, PCL, MCL, LCL).'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'rightKnee',
    label: 'Right Knee',
    position: [0.11, 0.22, 0.02],
    radius: 0.09,
    educationalNotes: ['The knee is a hinge joint stabilized by four major ligaments (ACL, PCL, MCL, LCL).'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'leftFoot',
    label: 'Left Foot',
    position: [-0.11, 0.03, 0.05],
    radius: 0.09,
    educationalNotes: ['Each foot has 26 bones and absorbs roughly 1.5x body weight per stride while walking.'],
    relatedLayers: ['skeleton', 'muscles'],
  },
  {
    id: 'rightFoot',
    label: 'Right Foot',
    position: [0.11, 0.03, 0.05],
    radius: 0.09,
    educationalNotes: ['Each foot has 26 bones and absorbs roughly 1.5x body weight per stride while walking.'],
    relatedLayers: ['skeleton', 'muscles'],
  },
]
