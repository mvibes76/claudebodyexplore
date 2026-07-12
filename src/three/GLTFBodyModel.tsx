import { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'
import { ANATOMY_LAYERS } from '@/data/anatomyLayers'
import type { JointId, JointTransform } from '@/types/pose'
import { BODY_MODEL_CONFIG, BONE_NAME_MAP, LAYER_MESH_NAME_MATCH } from './modelConfig'
import type { AnatomyLayerId } from '@/types/anatomy'

function resolveBone(scene: THREE.Object3D, jointId: JointId): THREE.Object3D | null {
  for (const name of BONE_NAME_MAP[jointId]) {
    const found = scene.getObjectByName(name)
    if (found) return found
  }
  return null
}

function findLayerMeshes(scene: THREE.Object3D): Record<AnatomyLayerId, THREE.Mesh[]> {
  const result = {} as Record<AnatomyLayerId, THREE.Mesh[]>
  for (const layer of ANATOMY_LAYERS) result[layer.id] = []

  scene.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return
    const nameLower = child.name.toLowerCase()
    for (const layer of ANATOMY_LAYERS) {
      const matches = LAYER_MESH_NAME_MATCH[layer.id]
      if (matches.some((m) => nameLower.includes(m))) {
        result[layer.id].push(child)
      }
    }
  })

  return result
}

/**
 * Loads BODY_MODEL_CONFIG.modelPath and drives it exactly like the
 * primitive mannequin: same pose data, same anatomy-layer store, same
 * skin-tone control. Only the geometry source changes.
 *
 * If your model has no mesh matching a given layer's name patterns (most
 * realistic scans won't have organ/circulatory/nervous meshes), that
 * layer's toggle in the UI simply has nothing to show/hide — it does not
 * error, it just has no effect for that layer until a matching mesh
 * exists.
 */
export default function GLTFBodyModel() {
  const { scene } = useGLTF(BODY_MODEL_CONFIG.modelPath)
  const pose = useBodyStore((s) => s.pose)
  const skinTone = useBodyStore((s) => s.body.skinTone)
  const layers = useSceneStore((s) => s.layers)

  const bonesRef = useRef<Partial<Record<JointId, THREE.Object3D>>>({})
  const layerMeshesRef = useRef<Record<AnatomyLayerId, THREE.Mesh[]>>(
    {} as Record<AnatomyLayerId, THREE.Mesh[]>,
  )
  const restRotations = useRef<Partial<Record<JointId, THREE.Euler>>>({})

  useEffect(() => {
    const bones: Partial<Record<JointId, THREE.Object3D>> = {}
    const jointIds = Object.keys(BONE_NAME_MAP) as JointId[]
    for (const jointId of jointIds) {
      const bone = resolveBone(scene, jointId)
      if (bone) {
        bones[jointId] = bone
        restRotations.current[jointId] = bone.rotation.clone()
      } else {
        console.warn(
          `[GLTFBodyModel] No bone found for joint "${jointId}". Checked names: ${BONE_NAME_MAP[jointId].join(', ')}. Add the real bone name to BONE_NAME_MAP in modelConfig.ts.`,
        )
      }
    }
    bonesRef.current = bones
    layerMeshesRef.current = findLayerMeshes(scene)

    const foundAnyLayerMesh = Object.values(layerMeshesRef.current).some((m) => m.length > 0)
    if (!foundAnyLayerMesh) {
      console.warn(
        '[GLTFBodyModel] No anatomy-layer meshes matched by name. Layer toggles will have no visual effect until meshes are named per LAYER_MESH_NAME_MATCH in modelConfig.ts.',
      )
    }
  }, [scene])

  // Drive bone rotations from the same PosePreset data the mannequin uses.
  useFrame(() => {
    const bones = bonesRef.current
    for (const [jointId, bone] of Object.entries(bones) as [JointId, THREE.Object3D][]) {
      const target: JointTransform | undefined = pose.joints[jointId]
      const rest = restRotations.current[jointId] ?? new THREE.Euler()
      const targetRotation = target?.rotation ?? [0, 0, 0]
      bone.rotation.x = THREE.MathUtils.lerp(bone.rotation.x, rest.x + targetRotation[0], 0.15)
      bone.rotation.y = THREE.MathUtils.lerp(bone.rotation.y, rest.y + targetRotation[1], 0.15)
      bone.rotation.z = THREE.MathUtils.lerp(bone.rotation.z, rest.z + targetRotation[2], 0.15)
    }
  })

  // Toggle/tint layer meshes to match the anatomy layer panel.
  useEffect(() => {
    const anyIsolated = Object.values(layers).some((l) => l.isolated)
    for (const layer of ANATOMY_LAYERS) {
      const meshes = layerMeshesRef.current[layer.id] ?? []
      const state = layers[layer.id]
      const shouldShow = anyIsolated ? state.isolated : state.visible
      for (const mesh of meshes) {
        mesh.visible = shouldShow
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.transparent = true
          mat.opacity = state.opacity
          if (layer.id === 'skin') mat.color.set(skinTone)
        }
      }
    }
  }, [layers, skinTone])

  return <primitive object={scene} />
}
