import { useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { BODY_REGIONS } from '@/data/bodyRegions'
import { useSceneStore } from '@/state/useSceneStore'

/**
 * Invisible clickable spheres over each body region, positioned in the
 * mannequin's neutral-standing rest coordinates. Known Scene-1 limitation:
 * hitboxes do not follow the mannequin through non-neutral poses yet —
 * documented here for the future rig work rather than silently wrong.
 */
export default function BodyRegionHitboxes() {
  const setSelectedRegion = useSceneStore((s) => s.setSelectedRegion)
  const setHoveredRegion = useSceneStore((s) => s.setHoveredRegion)
  const hoveredRegion = useSceneStore((s) => s.hoveredRegion)
  const selectedRegion = useSceneStore((s) => s.selectedRegion)
  const mode = useSceneStore((s) => s.mode)
  const [cursorOver, setCursorOver] = useState(false)

  if (mode === 'wardrobe' || mode === 'simulation') return null

  return (
    <group
      onPointerMove={() => {
        document.body.style.cursor = cursorOver ? 'pointer' : 'default'
      }}
    >
      {BODY_REGIONS.map((region) => {
        const isHovered = hoveredRegion === region.id
        const isSelected = selectedRegion === region.id
        return (
          <mesh
            key={region.id}
            position={region.position}
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation()
              setSelectedRegion(region.id)
            }}
            onPointerOver={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              setHoveredRegion(region.id)
              setCursorOver(true)
              document.body.style.cursor = 'pointer'
            }}
            onPointerOut={(e: ThreeEvent<PointerEvent>) => {
              e.stopPropagation()
              setHoveredRegion(null)
              setCursorOver(false)
              document.body.style.cursor = 'default'
            }}
          >
            <sphereGeometry args={[region.radius, 12, 12]} />
            <meshBasicMaterial
              color={isSelected ? '#4ab0e8' : '#ffffff'}
              transparent
              opacity={isSelected ? 0.28 : isHovered ? 0.14 : 0.0}
              depthWrite={false}
            />
          </mesh>
        )
      })}
    </group>
  )
}
