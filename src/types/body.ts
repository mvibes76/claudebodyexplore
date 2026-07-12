// Body customization data model.
// Kept intentionally flat and serializable so presets can be saved,
// shared, or later driven by a real morph-target / blend-shape rig.

export type SexModel = 'male' | 'female'
export type GenderPresentation = 'masculine' | 'feminine' | 'androgynous'
export type AgeRange = 'child' | 'teen' | 'adult' | 'senior'
export type BodyType = 'lean' | 'average' | 'athletic' | 'heavy' | 'custom'

export interface BodyPreset {
  id: string
  name: string
  sexModel: SexModel
  genderPresentation: GenderPresentation
  ageRange: AgeRange
  heightCm: number
  weightKg: number
  bodyType: BodyType
  skinTone: string
  /**
   * Optional neutral visual preset. Must only ever adjust visual defaults
   * (skin tone range, hair placeholder, naming metadata) — never body shape.
   * See /src/data/bodyPresets.ts for the enforced non-stereotyping rule.
   */
  heritagePreset?: string
}

export interface HeritagePreset {
  id: string
  label: string
  skinToneRange: string[]
  hairPlaceholder: string
}
