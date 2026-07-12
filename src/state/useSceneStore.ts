import { create } from 'zustand'
import type { AnatomyLayerId, AnatomyLayerStateMap, HighlightMode } from '@/types/anatomy'
import type { BodyRegionId } from '@/data/bodyRegions'
import type { BodyIssue } from '@/types/issues'
import { DEFAULT_LAYER_STATE } from '@/data/anatomyLayers'

export type SceneMode = 'explore' | 'pose' | 'anatomy' | 'wardrobe' | 'issues' | 'simulation'

interface SceneStore {
  mode: SceneMode
  setMode: (mode: SceneMode) => void

  layers: AnatomyLayerStateMap
  setLayerVisible: (id: AnatomyLayerId, visible: boolean) => void
  setLayerOpacity: (id: AnatomyLayerId, opacity: number) => void
  setLayerHighlight: (id: AnatomyLayerId, mode: HighlightMode) => void
  setLayerIsolated: (id: AnatomyLayerId, isolated: boolean) => void

  selectedRegion: BodyRegionId | null
  hoveredRegion: BodyRegionId | null
  setSelectedRegion: (id: BodyRegionId | null) => void
  setHoveredRegion: (id: BodyRegionId | null) => void

  activeIssue: BodyIssue | null
  setActiveIssue: (issue: BodyIssue | null) => void

  /** Bumped to trigger a camera reset inside CameraRig.tsx. */
  cameraResetToken: number
  resetCamera: () => void

  customizationPanelOpen: boolean
  setCustomizationPanelOpen: (open: boolean) => void
}

export const useSceneStore = create<SceneStore>((set) => ({
  mode: 'explore',
  setMode: (mode) => set({ mode }),

  layers: DEFAULT_LAYER_STATE,
  setLayerVisible: (id, visible) =>
    set((s) => ({ layers: { ...s.layers, [id]: { ...s.layers[id], visible } } })),
  setLayerOpacity: (id, opacity) =>
    set((s) => ({ layers: { ...s.layers, [id]: { ...s.layers[id], opacity } } })),
  setLayerHighlight: (id, mode) =>
    set((s) => ({ layers: { ...s.layers, [id]: { ...s.layers[id], highlight: mode } } })),
  setLayerIsolated: (id, isolated) =>
    set((s) => ({
      layers: Object.fromEntries(
        Object.entries(s.layers).map(([layerId, state]) => [
          layerId,
          layerId === id ? { ...state, isolated } : { ...state, isolated: false },
        ]),
      ) as SceneStore['layers'],
    })),

  selectedRegion: null,
  hoveredRegion: null,
  setSelectedRegion: (id) => set({ selectedRegion: id }),
  setHoveredRegion: (id) => set({ hoveredRegion: id }),

  activeIssue: null,
  setActiveIssue: (issue) => set({ activeIssue: issue }),

  cameraResetToken: 0,
  resetCamera: () => set((s) => ({ cameraResetToken: s.cameraResetToken + 1 })),

  customizationPanelOpen: false,
  setCustomizationPanelOpen: (open) => set({ customizationPanelOpen: open }),
}))
