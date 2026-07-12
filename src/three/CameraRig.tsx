import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import * as THREE from 'three'
import { useSceneStore } from '@/state/useSceneStore'

const DEFAULT_CAMERA_POS = new THREE.Vector3(0, 1.2, 3.2)
const DEFAULT_TARGET = new THREE.Vector3(0, 1.0, 0)

/**
 * Wraps drei's OrbitControls and listens for `cameraResetToken` in the
 * scene store so the top bar's "Reset camera" button can smoothly return
 * the view to its default framing.
 */
export default function CameraRig() {
  const controlsRef = useRef<OrbitControlsImpl>(null)
  const resetToken = useSceneStore((s) => s.cameraResetToken)
  const { camera } = useThree()
  const resetting = useRef(false)

  useEffect(() => {
    if (resetToken === 0) return
    resetting.current = true
  }, [resetToken])

  useFrame(() => {
    if (!resetting.current || !controlsRef.current) return
    camera.position.lerp(DEFAULT_CAMERA_POS, 0.12)
    controlsRef.current.target.lerp(DEFAULT_TARGET, 0.12)
    controlsRef.current.update()
    if (camera.position.distanceTo(DEFAULT_CAMERA_POS) < 0.01) {
      resetting.current = false
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.08}
      minDistance={1.2}
      maxDistance={7}
      maxPolarAngle={Math.PI * 0.92}
      target={[0, 1.0, 0]}
    />
  )
}
