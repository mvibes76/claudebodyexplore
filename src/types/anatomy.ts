// Anatomy layer type definitions.
// Real layers will eventually be swapped for licensed anatomical GLB meshes.
// Until then, each layer renders as a labeled placeholder mesh group.

export type AnatomyLayerId =
  | 'skin'
  | 'muscles'
  | 'skeleton'
  | 'organs'
  | 'circulatory'
  | 'nervous'

export type HighlightMode = 'none' | 'highlight'

export interface AnatomyLayer {
  id: AnatomyLayerId
  label: string
  description: string
  /** Placeholder tint. Swap for real material/texture when GLB assets land. */
  placeholderColor: string
  defaultOpacity: number
  /** Order in which layers stack when rendered together, outermost first. */
  order: number
}

export interface AnatomyLayerState {
  visible: boolean
  opacity: number
  highlight: HighlightMode
  /** When true, this layer renders alone and all other layers are hidden. */
  isolated: boolean
}

export type AnatomyLayerStateMap = Record<AnatomyLayerId, AnatomyLayerState>
