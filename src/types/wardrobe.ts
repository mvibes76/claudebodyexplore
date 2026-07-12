// Wardrobe is a system independent from anatomy layers. Anatomy layers
// describe what's visible *inside/on* the body; wardrobe describes what
// covers it. A GLB garment pipeline can later populate each slot string
// with an asset id/path instead of a placeholder primitive key.

export type WardrobeSlotId =
  | 'head'
  | 'upperBody'
  | 'lowerBody'
  | 'feet'
  | 'accessories'

export interface WardrobePreset {
  id: string
  name: string
  description: string
  slots: {
    head?: string
    upperBody?: string
    lowerBody?: string
    feet?: string
    accessories?: string[]
  }
}
