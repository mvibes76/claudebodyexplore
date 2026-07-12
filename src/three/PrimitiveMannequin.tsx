import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'
import { ANATOMY_LAYERS } from '@/data/anatomyLayers'
import type { AnatomyLayerId } from '@/types/anatomy'
import type { JointId, JointTransform } from '@/types/pose'

/**
 * PLACEHOLDER MANNEQUIN
 * ---------------------
 * This is a primitive-geometry stand-in for a real licensed anatomical GLB.
 * The joint hierarchy below (hips -> spine -> chest -> shoulders -> elbows,
 * hips -> upper leg -> knee -> ankle) is the "rigging interface" real models
 * should satisfy: a bone/node per JointId in /src/types/pose.ts, nested in
 * the same parent/child relationships, so PosePreset data keeps working
 * unchanged when swapped for a real skinned mesh.
 *
 * Anatomy layers (skin/muscles/skeleton/organs/circulatory/nervous) are
 * drawn as nested, tinted, semi-transparent geometry at each body part
 * rather than real tissue meshes. Swap the `<LayerMesh>` calls below for
 * real per-layer meshes/materials when licensed assets are available.
 */

type Vec3 = [number, number, number]

function lerpAngle(current: number, target: number, t: number) {
  return THREE.MathUtils.lerp(current, target, t)
}

interface LayerMeshProps {
  layerId: AnatomyLayerId
  geometry: 'sphere' | 'cylinder' | 'box'
  args: number[]
  position?: Vec3
  insetScale: number
}

/** Renders one anatomy-layer's placeholder geometry for a single body part, if that layer is currently visible (respecting isolate mode). */
function LayerMesh({ layerId, geometry, args, position = [0, 0, 0], insetScale }: LayerMeshProps) {
  const layers = useSceneStore((s) => s.layers)
  const skinTone = useBodyStore((s) => s.body.skinTone)
  const layerDef = ANATOMY_LAYERS.find((l) => l.id === layerId)!
  const state = layers[layerId]

  const anyIsolated = Object.values(layers).some((l) => l.isolated)
  const shouldShow = anyIsolated ? state.isolated : state.visible
  if (!shouldShow) return null

  const scaledArgs = args.map((a) => a * insetScale)
  const emissiveIntensity = state.highlight === 'highlight' ? 0.6 : 0
  const color = layerId === 'skin' ? skinTone : layerDef.placeholderColor

  return (
    <mesh position={position} castShadow receiveShadow>
      {geometry === 'sphere' && <sphereGeometry args={scaledArgs as [number, number, number]} />}
      {geometry === 'cylinder' && (
        <cylinderGeometry args={scaledArgs as [number, number, number, number]} />
      )}
      {geometry === 'box' && <boxGeometry args={scaledArgs as [number, number, number]} />}
      <meshStandardMaterial
        color={color}
        transparent
        opacity={state.opacity}
        emissive={color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.6}
      />
    </mesh>
  )
}

/** A body part rendered once per visible anatomy layer, nested (skin outermost, skeleton innermost). */
function BodyPart(props: {
  geometry: 'sphere' | 'cylinder' | 'box'
  args: number[]
  position?: Vec3
}) {
  const { geometry, args, position } = props
  return (
    <>
      <LayerMesh layerId="skin" geometry={geometry} args={args} position={position} insetScale={1} />
      <LayerMesh layerId="muscles" geometry={geometry} args={args} position={position} insetScale={0.9} />
      <LayerMesh layerId="skeleton" geometry={geometry} args={args} position={position} insetScale={0.45} />
    </>
  )
}

function useJointGroup(jointId: JointId, pose: Partial<Record<JointId, JointTransform>>) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (!ref.current) return
    const target = pose[jointId]
    const targetRotation = target?.rotation ?? [0, 0, 0]
    const targetPosition = target?.position ?? [0, 0, 0]
    ref.current.rotation.x = lerpAngle(ref.current.rotation.x, targetRotation[0], 0.15)
    ref.current.rotation.y = lerpAngle(ref.current.rotation.y, targetRotation[1], 0.15)
    ref.current.rotation.z = lerpAngle(ref.current.rotation.z, targetRotation[2], 0.15)
    ref.current.position.x = lerpAngle(ref.current.position.x, targetPosition[0], 0.15)
    ref.current.position.y = lerpAngle(ref.current.position.y, targetPosition[1], 0.15)
    ref.current.position.z = lerpAngle(ref.current.position.z, targetPosition[2], 0.15)
  })
  return ref
}

function Organs() {
  const layers = useSceneStore((s) => s.layers)
  const anyIsolated = Object.values(layers).some((l) => l.isolated)
  const state = layers.organs
  if (anyIsolated ? !state.isolated : !state.visible) return null
  const layerDef = ANATOMY_LAYERS.find((l) => l.id === 'organs')!
  const mat = (
    <meshStandardMaterial
      color={layerDef.placeholderColor}
      transparent
      opacity={state.opacity}
      emissive={layerDef.placeholderColor}
      emissiveIntensity={state.highlight === 'highlight' ? 0.6 : 0}
    />
  )
  return (
    <group>
      {/* heart */}
      <mesh position={[0.03, 0.14, 0.05]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        {mat}
      </mesh>
      {/* lungs */}
      <mesh position={[-0.09, 0.1, 0.02]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        {mat}
      </mesh>
      <mesh position={[0.11, 0.1, 0.02]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        {mat}
      </mesh>
      {/* stomach / intestines block (abdomen-local coords) */}
      <mesh position={[0.02, -0.18, 0.02]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        {mat}
      </mesh>
    </group>
  )
}

function CirculatoryAndNervous() {
  const layers = useSceneStore((s) => s.layers)
  const anyIsolated = Object.values(layers).some((l) => l.isolated)
  const circ = layers.circulatory
  const nerv = layers.nervous
  const circDef = ANATOMY_LAYERS.find((l) => l.id === 'circulatory')!
  const nervDef = ANATOMY_LAYERS.find((l) => l.id === 'nervous')!

  const showCirc = anyIsolated ? circ.isolated : circ.visible
  const showNerv = anyIsolated ? nerv.isolated : nerv.visible

  return (
    <group>
      {showCirc && (
        <mesh position={[0, -0.05, 0.06]}>
          <cylinderGeometry args={[0.012, 0.012, 0.9, 8]} />
          <meshStandardMaterial
            color={circDef.placeholderColor}
            transparent
            opacity={circ.opacity}
            emissive={circDef.placeholderColor}
            emissiveIntensity={circ.highlight === 'highlight' ? 0.7 : 0.15}
          />
        </mesh>
      )}
      {showNerv && (
        <mesh position={[0, -0.05, -0.05]}>
          <cylinderGeometry args={[0.01, 0.01, 0.95, 8]} />
          <meshStandardMaterial
            color={nervDef.placeholderColor}
            transparent
            opacity={nerv.opacity}
            emissive={nervDef.placeholderColor}
            emissiveIntensity={nerv.highlight === 'highlight' ? 0.7 : 0.15}
          />
        </mesh>
      )}
    </group>
  )
}

export default function PrimitiveMannequin() {
  const pose = useBodyStore((s) => s.pose)
  const body = useBodyStore((s) => s.body)
  const simulation = useBodyStore((s) => s.simulation)

  const heightScale = useMemo(() => body.heightCm / 170, [body.heightCm])
  const widthScale = useMemo(() => {
    const typeFactor = { lean: 0.9, average: 1, athletic: 1.05, heavy: 1.2, custom: 1 }[body.bodyType]
    return typeFactor
  }, [body.bodyType])

  const spineRef = useJointGroup('spine', pose.joints)
  const neckRef = useJointGroup('neck', pose.joints)
  const headRef = useJointGroup('head', pose.joints)
  const lShoulderRef = useJointGroup('leftShoulder', pose.joints)
  const lElbowRef = useJointGroup('leftElbow', pose.joints)
  const rShoulderRef = useJointGroup('rightShoulder', pose.joints)
  const rElbowRef = useJointGroup('rightElbow', pose.joints)
  const lHipRef = useJointGroup('leftHip', pose.joints)
  const lKneeRef = useJointGroup('leftKnee', pose.joints)
  const rHipRef = useJointGroup('rightHip', pose.joints)
  const rKneeRef = useJointGroup('rightKnee', pose.joints)

  const chestRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!chestRef.current) return
    if (simulation.idleBreathing) {
      const breathe = Math.sin(clock.elapsedTime * 1.4) * 0.012
      chestRef.current.scale.set(1 + breathe * 0.4, 1 + breathe, 1 + breathe * 0.4)
    } else {
      chestRef.current.scale.set(1, 1, 1)
    }
  })

  const rootRef = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (!rootRef.current) return
    if (simulation.weightShift) {
      rootRef.current.position.x = Math.sin(clock.elapsedTime * 0.8) * 0.04
      rootRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.8) * 0.02
    } else {
      rootRef.current.position.x = THREE.MathUtils.lerp(rootRef.current.position.x, 0, 0.1)
      rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, 0, 0.1)
    }
  })

  return (
    <group ref={rootRef} scale={[widthScale, heightScale, widthScale]}>
      {/* Hips: static pose root (no dedicated JointId — sits below the spine joint) */}
      <group position={[0, 0.78, 0]}>
        <BodyPart geometry="box" args={[0.26, 0.18, 0.16]} />

        {/* Spine -> chest -> neck -> head */}
        <group ref={spineRef} position={[0, 0.1, 0]}>
          <group ref={chestRef} position={[0, 0.2, 0.01]}>
            <BodyPart geometry="box" args={[0.32, 0.34, 0.19]} />
            <Organs />
            <CirculatoryAndNervous />

            <group ref={lShoulderRef} position={[-0.2, 0.14, 0]}>
              <BodyPart geometry="cylinder" args={[0.045, 0.04, 0.26, 12]} position={[0, -0.13, 0]} />
              <group ref={lElbowRef} position={[0, -0.26, 0]}>
                <BodyPart geometry="cylinder" args={[0.035, 0.03, 0.24, 12]} position={[0, -0.12, 0]} />
                <BodyPart geometry="sphere" args={[0.045, 10, 10]} position={[0, -0.28, 0]} />
              </group>
            </group>

            <group ref={rShoulderRef} position={[0.2, 0.14, 0]}>
              <BodyPart geometry="cylinder" args={[0.045, 0.04, 0.26, 12]} position={[0, -0.13, 0]} />
              <group ref={rElbowRef} position={[0, -0.26, 0]}>
                <BodyPart geometry="cylinder" args={[0.035, 0.03, 0.24, 12]} position={[0, -0.12, 0]} />
                <BodyPart geometry="sphere" args={[0.045, 10, 10]} position={[0, -0.28, 0]} />
              </group>
            </group>

            <group ref={neckRef} position={[0, 0.2, 0]}>
              <BodyPart geometry="cylinder" args={[0.055, 0.06, 0.12, 12]} />
              <group ref={headRef} position={[0, 0.16, 0]}>
                <BodyPart geometry="sphere" args={[0.11, 16, 16]} />
              </group>
            </group>
          </group>
        </group>

        {/* Legs */}
        <group ref={lHipRef} position={[-0.09, -0.05, 0]}>
          <BodyPart geometry="cylinder" args={[0.06, 0.05, 0.36, 12]} position={[0, -0.18, 0]} />
          <group ref={lKneeRef} position={[0, -0.36, 0]}>
            <BodyPart geometry="cylinder" args={[0.045, 0.04, 0.34, 12]} position={[0, -0.17, 0]} />
            <BodyPart geometry="box" args={[0.08, 0.05, 0.16]} position={[0, -0.36, 0.03]} />
          </group>
        </group>

        <group ref={rHipRef} position={[0.09, -0.05, 0]}>
          <BodyPart geometry="cylinder" args={[0.06, 0.05, 0.36, 12]} position={[0, -0.18, 0]} />
          <group ref={rKneeRef} position={[0, -0.36, 0]}>
            <BodyPart geometry="cylinder" args={[0.045, 0.04, 0.34, 12]} position={[0, -0.17, 0]} />
            <BodyPart geometry="box" args={[0.08, 0.05, 0.16]} position={[0, -0.36, 0.03]} />
          </group>
        </group>
      </group>
    </group>
  )
}
