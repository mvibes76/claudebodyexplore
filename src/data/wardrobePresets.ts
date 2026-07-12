import type { WardrobePreset } from '@/types/wardrobe'

// Wardrobe presets are independent from anatomy layers. Slot values are
// placeholder keys consumed by AnatomyLayerMeshes/BodyModel primitive
// geometry today, and should map to garment GLB asset ids later.
export const WARDROBE_PRESETS: WardrobePreset[] = [
  {
    id: 'minimal-anatomy',
    name: 'Minimal anatomy mode',
    description: 'No wardrobe. Best for anatomy layer inspection.',
    slots: {},
  },
  {
    id: 'museum-neutral',
    name: 'Museum neutral',
    description: 'Simple neutral-toned underlayer, matte finish.',
    slots: { upperBody: 'neutral-top', lowerBody: 'neutral-bottom' },
  },
  {
    id: 'medical',
    name: 'Medical / museum neutral',
    description: 'Clinical gown styling, pale blue-grey.',
    slots: { upperBody: 'medical-gown' },
  },
  {
    id: 'athletic',
    name: 'Athletic',
    description: 'Fitted athletic top and shorts.',
    slots: { upperBody: 'athletic-top', lowerBody: 'athletic-shorts', feet: 'athletic-shoes' },
  },
  {
    id: 'casual',
    name: 'Casual',
    description: 'Everyday casual shirt and pants.',
    slots: { upperBody: 'casual-shirt', lowerBody: 'casual-pants', feet: 'casual-shoes' },
  },
]
