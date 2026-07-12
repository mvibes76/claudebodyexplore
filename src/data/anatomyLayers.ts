import type { AnatomyLayer, AnatomyLayerStateMap } from '@/types/anatomy'

// PLACEHOLDER LAYER DEFINITIONS
// Colors and opacities are stand-ins for real anatomical materials/textures.
// Real assets: swap `placeholderColor` usage in AnatomyLayerMeshes.tsx for
// textured GLB meshes loaded per layer, keyed by the same `id`.
export const ANATOMY_LAYERS: AnatomyLayer[] = [
  {
    id: 'skin',
    label: 'Skin',
    description: 'Outer surface layer. Hidden automatically when deeper layers are isolated.',
    placeholderColor: '#d9b99b',
    defaultOpacity: 1,
    order: 0,
  },
  {
    id: 'muscles',
    label: 'Muscles',
    description: 'Skeletal muscle groups and major tendons.',
    placeholderColor: '#b23a2f',
    defaultOpacity: 0.85,
    order: 1,
  },
  {
    id: 'skeleton',
    label: 'Skeleton',
    description: 'Bone structure and joints.',
    placeholderColor: '#eae4d3',
    defaultOpacity: 0.9,
    order: 2,
  },
  {
    id: 'organs',
    label: 'Organs',
    description: 'Major internal organs and organ systems.',
    placeholderColor: '#8b3a5a',
    defaultOpacity: 0.85,
    order: 3,
  },
  {
    id: 'circulatory',
    label: 'Circulatory',
    description: 'Heart, arteries, and venous pathways.',
    placeholderColor: '#c21e1e',
    defaultOpacity: 0.75,
    order: 4,
  },
  {
    id: 'nervous',
    label: 'Nervous',
    description: 'Brain, spinal cord, and major nerve pathways.',
    placeholderColor: '#e8c94a',
    defaultOpacity: 0.75,
    order: 5,
  },
]

export const DEFAULT_LAYER_STATE: AnatomyLayerStateMap = ANATOMY_LAYERS.reduce(
  (acc, layer) => {
    acc[layer.id] = {
      visible: layer.id === 'skin',
      opacity: layer.defaultOpacity,
      highlight: 'none',
      isolated: false,
    }
    return acc
  },
  {} as AnatomyLayerStateMap,
)
