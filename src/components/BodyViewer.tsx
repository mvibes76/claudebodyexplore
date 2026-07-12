import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import Lighting from '@/three/Lighting'
import CameraRig from '@/three/CameraRig'
import BodyModel from '@/three/BodyModel'
import Markers from '@/three/Markers'

/**
 * Full-screen 3D viewport. This is the only place a <Canvas> is mounted —
 * everything else in the app is regular DOM/UI laid over the top of it.
 */
export default function BodyViewer() {
  return (
    <div className="viewport">
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.2], fov: 42 }}
        dpr={[1, 2]}
        onPointerMissed={() => {
          // Clicking empty space clears the selected region.
          document.dispatchEvent(new CustomEvent('viewport-empty-click'))
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <BodyModel />
          <Markers />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  )
}
