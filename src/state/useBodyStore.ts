import { create } from 'zustand'
import type { BodyPreset } from '@/types/body'
import type { WardrobePreset } from '@/types/wardrobe'
import type { PosePreset } from '@/types/pose'
import { DEFAULT_BODY_PRESET } from '@/data/bodyPresets'
import { WARDROBE_PRESETS } from '@/data/wardrobePresets'
import { POSE_PRESETS } from '@/data/posePresets'

interface BodyStore {
  body: BodyPreset
  setBody: (patch: Partial<BodyPreset>) => void

  wardrobe: WardrobePreset
  setWardrobe: (preset: WardrobePreset) => void

  pose: PosePreset
  setPoseById: (id: string) => void

  /** Idle animation toggle used by Simulation Mode. */
  simulation: {
    idleBreathing: boolean
    weightShift: boolean
  }
  toggleSimulation: (key: 'idleBreathing' | 'weightShift') => void
}

export const useBodyStore = create<BodyStore>((set) => ({
  body: DEFAULT_BODY_PRESET,
  setBody: (patch) => set((s) => ({ body: { ...s.body, ...patch } })),

  wardrobe: WARDROBE_PRESETS[0],
  setWardrobe: (preset) => set({ wardrobe: preset }),

  pose: POSE_PRESETS[0],
  setPoseById: (id) =>
    set(() => ({ pose: POSE_PRESETS.find((p) => p.id === id) ?? POSE_PRESETS[0] })),

  simulation: { idleBreathing: true, weightShift: false },
  toggleSimulation: (key) =>
    set((s) => ({ simulation: { ...s.simulation, [key]: !s.simulation[key] } })),
}))
