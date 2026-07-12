import { Grid } from '@react-three/drei'
import { useSceneStore } from '@/state/useSceneStore'

/**
 * Neutral museum-style studio lighting: soft key light, cool fill,
 * and a subtle rim light to separate the body from the dark backdrop.
 * A faint grid floor gives spatial reference without feeling clinical.
 */
export default function Lighting() {
  const mode = useSceneStore((s) => s.mode)

  return (
    <>
      <color attach="background" args={['#0b0c0f']} />
      <fog attach="fog" args={['#0b0c0f', 6, 16]} />

      <ambientLight intensity={0.35} color="#a9c4ff" />
      <directionalLight
        position={[2.5, 4, 3]}
        intensity={1.4}
        color="#fff4e0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#4a6bff" />
      <pointLight position={[0, 1.2, -2.5]} intensity={0.6} color="#ffffff" />

      {mode !== 'wardrobe' && (
        <Grid
          position={[0, 0, 0]}
          args={[10, 10]}
          cellColor="#1c1f26"
          sectionColor="#2a2e38"
          fadeDistance={9}
          fadeStrength={1.5}
          infiniteGrid
        />
      )}
    </>
  )
}
