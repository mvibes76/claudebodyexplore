import type { BodyIssue } from '@/types/issues'
import { EDUCATIONAL_DISCLAIMER } from '@/types/issues'

// Sample educational issue markers. None of these are diagnoses — they are
// illustrative talking points an exhibit visitor or student can explore.
export const BODY_ISSUES: BodyIssue[] = [
  {
    id: 'forward-head-posture',
    title: 'Forward head posture',
    category: 'Posture',
    bodyRegion: 'neck',
    severity: 'low',
    description:
      'A common postural pattern where the head sits forward of the shoulders, often linked to long periods of screen use.',
    visualMarker: { type: 'outline', color: '#e8c94a' },
    educationalNotes: [
      'Every inch the head moves forward can multiply the effective load on the neck muscles.',
      'Commonly associated with desk work and phone use.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'lumbar-strain-zone',
    title: 'Lower back tension zone',
    category: 'Muscle strain',
    bodyRegion: 'back',
    severity: 'medium',
    description:
      'The lumbar region carries a large share of upper-body load and is a frequent site of general muscular tension.',
    visualMarker: { type: 'heatmap', color: '#c21e1e' },
    educationalNotes: [
      'The lumbar spine has the largest vertebrae, built for load-bearing rather than rotation.',
      'Core strength and hip mobility both influence load distribution here.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'knee-joint-stress',
    title: 'Knee joint stress point',
    category: 'Joint stress',
    bodyRegion: 'leftKnee',
    severity: 'medium',
    description:
      'The knee absorbs repeated impact during walking and running, concentrated at the joint line.',
    visualMarker: { type: 'glow', color: '#ff8a3d' },
    educationalNotes: [
      'The knee has no inherent rotational stability — it relies entirely on surrounding ligaments and muscles.',
      'Cartilage at the joint has very limited blood supply, which is why it heals slowly.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'shoulder-mobility-note',
    title: 'Shoulder mobility range',
    category: 'Mobility',
    bodyRegion: 'rightShoulder',
    severity: 'info',
    description:
      'The shoulder has the largest range of motion of any joint, made possible by a shallow socket.',
    visualMarker: { type: 'outline', color: '#4ab0e8' },
    educationalNotes: [
      'That mobility trade-off is why the shoulder is also one of the more frequently strained joints.',
      'Rotator cuff muscles are responsible for most of the fine stabilization.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'skin-observation-forearm',
    title: 'Surface skin observation zone',
    category: 'Skin observation',
    bodyRegion: 'leftArm',
    severity: 'info',
    description:
      'Illustrates a general area used in visual skin inspection education — texture, tone, and surface markers.',
    visualMarker: { type: 'pin', color: '#d9b99b' },
    educationalNotes: [
      'Skin is the largest organ in the human body, both by weight and surface area.',
      'It plays a central role in temperature regulation, sensation, and protection.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'circulatory-pulse-point',
    title: 'Circulatory pulse point',
    category: 'Circulation',
    bodyRegion: 'neck',
    severity: 'info',
    description: 'The carotid artery is a commonly referenced pulse point near the neck.',
    visualMarker: { type: 'glow', color: '#c21e1e' },
    educationalNotes: [
      'The heart pumps roughly 5 liters of blood per minute at rest.',
      'Pulse points exist where large arteries pass close to the skin surface.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'sciatic-pathway-note',
    title: 'Sciatic nerve pathway',
    category: 'Nerve pathway',
    bodyRegion: 'rightLeg',
    severity: 'info',
    description: 'The sciatic nerve is the longest and widest nerve in the human body.',
    visualMarker: { type: 'outline', color: '#e8c94a' },
    educationalNotes: [
      'It runs from the lower back through the hip and down the back of the leg.',
      'Irritation anywhere along its path can cause sensation to radiate along the whole route.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
  {
    id: 'digestive-overview',
    title: 'Digestive system overview',
    category: 'Organ system overview',
    bodyRegion: 'abdomen',
    severity: 'info',
    description: 'A general overview marker for the stomach, intestines, and associated organs.',
    visualMarker: { type: 'heatmap', color: '#8b3a5a' },
    educationalNotes: [
      'The small intestine, if uncoiled, is roughly 6-7 meters long in an adult.',
      'Digestion begins in the mouth with enzymes in saliva, not just in the stomach.',
    ],
    disclaimer: EDUCATIONAL_DISCLAIMER,
  },
]
