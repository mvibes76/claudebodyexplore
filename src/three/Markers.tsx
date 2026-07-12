import { useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'
import { BODY_ISSUES } from '@/data/bodyIssues'
import { BODY_REGIONS } from '@/data/bodyRegions'
import { useSceneStore } from '@/state/useSceneStore'

function regionPosition(regionId: string): [number, number, number] {
  const region = BODY_REGIONS.find((r) => r.id === regionId)
  return region ? region.position : [0, 1, 0]
}

function PulsingMesh({ color, position, shape }: { color: string; position: [number, number, number]; shape: 'glow' | 'pin' | 'heatmap' | 'outline' }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const pulse = 1 + Math.sin(clock.elapsedTime * 3) * 0.15
    ref.current.scale.setScalar(pulse)
  })

  if (shape === 'glow') {
    return (
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.55} />
      </mesh>
    )
  }
  if (shape === 'pin') {
    return (
      <group position={[position[0], position[1] + 0.09, position[2]]}>
        <mesh position={[0, 0.05, 0]}>
          <coneGeometry args={[0.025, 0.07, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.02, 10, 10]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
        </mesh>
      </group>
    )
  }
  if (shape === 'heatmap') {
    return (
      <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.09, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
    )
  }
  // outline
  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[0.08, 0.006, 8, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.7} />
    </mesh>
  )
}

/**
 * Renders visual issue markers on the body. In Issues mode, all sample
 * issues show faint markers; the active (selected) issue is emphasized.
 */
export default function Markers() {
  const mode = useSceneStore((s) => s.mode)
  const activeIssue = useSceneStore((s) => s.activeIssue)

  const visibleIssues = useMemo(() => {
    if (mode !== 'issues') return activeIssue ? [activeIssue] : []
    return BODY_ISSUES
  }, [mode, activeIssue])

  if (visibleIssues.length === 0) return null

  return (
    <group>
      {visibleIssues.map((issue) => {
        const isActive = activeIssue?.id === issue.id
        return (
          <group key={issue.id} visible={mode === 'issues' ? true : isActive}>
            <PulsingMesh
              color={issue.visualMarker.color}
              position={regionPosition(issue.bodyRegion)}
              shape={issue.visualMarker.type}
            />
          </group>
        )
      })}
    </group>
  )
}
