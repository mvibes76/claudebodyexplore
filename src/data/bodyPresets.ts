import type { BodyPreset, HeritagePreset } from '@/types/body'

export const DEFAULT_BODY_PRESET: BodyPreset = {
  id: 'default-adult',
  name: 'Default adult',
  sexModel: 'female',
  genderPresentation: 'feminine',
  ageRange: 'adult',
  heightCm: 170,
  weightKg: 68,
  bodyType: 'average',
  skinTone: '#d9b99b',
}

// IMPORTANT: heritage presets only ever change neutral visual defaults
// (a skin tone range to pick from, and a hair placeholder style/label).
// They must NEVER drive height, weight, or body-type defaults — doing so
// would encode body-shape stereotypes by nationality/ethnicity, which this
// app explicitly refuses to do. See types/body.ts HeritagePreset.
export const HERITAGE_PRESETS: HeritagePreset[] = [
  { id: 'none', label: 'None / unspecified', skinToneRange: ['#d9b99b'], hairPlaceholder: 'generic' },
  { id: 'east-asian-inspired', label: 'East Asian–inspired', skinToneRange: ['#e8c9a0', '#d9b483', '#c99a68'], hairPlaceholder: 'straight-dark' },
  { id: 'south-asian-inspired', label: 'South Asian–inspired', skinToneRange: ['#c99a68', '#a9744a', '#8a5a36'], hairPlaceholder: 'wavy-dark' },
  { id: 'sub-saharan-african-inspired', label: 'Sub-Saharan African–inspired', skinToneRange: ['#7a4a2e', '#5c3620', '#3d2414'], hairPlaceholder: 'coily' },
  { id: 'northern-european-inspired', label: 'Northern European–inspired', skinToneRange: ['#f2d9c4', '#e8c9a8', '#d9b99b'], hairPlaceholder: 'straight-light' },
  { id: 'mediterranean-inspired', label: 'Mediterranean–inspired', skinToneRange: ['#d9b483', '#c99a68', '#a9744a'], hairPlaceholder: 'wavy-medium' },
  { id: 'latin-american-inspired', label: 'Latin American–inspired', skinToneRange: ['#d9b99b', '#c99a68', '#a9744a'], hairPlaceholder: 'wavy-dark' },
  { id: 'middle-eastern-inspired', label: 'Middle Eastern–inspired', skinToneRange: ['#d9b483', '#c99a68', '#a9744a'], hairPlaceholder: 'wavy-dark' },
  { id: 'pacific-islander-inspired', label: 'Pacific Islander–inspired', skinToneRange: ['#a9744a', '#8a5a36', '#7a4a2e'], hairPlaceholder: 'wavy-dark' },
  { id: 'indigenous-american-inspired', label: 'Indigenous American–inspired', skinToneRange: ['#c99a68', '#a9744a', '#8a5a36'], hairPlaceholder: 'straight-dark' },
]

export const BODY_TYPE_LABELS: Record<BodyPreset['bodyType'], string> = {
  lean: 'Lean',
  average: 'Average',
  athletic: 'Athletic',
  heavy: 'Heavy',
  custom: 'Custom',
}
