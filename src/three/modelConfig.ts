import type { JointId } from '@/types/pose'
import type { AnatomyLayerId } from '@/types/anatomy'

/**
 * Flip this on once a real .glb sits in /public/models. Everything else
 * in this file tells GLTFBodyModel.tsx how to find bones and layer meshes
 * inside that file — it does not need code changes, just this config.
 */
export const BODY_MODEL_CONFIG = {
  useRealModel: false,
  modelPath: '/models/body.glb',
}

/**
 * Bone-name candidates per joint, checked in order (first match wins).
 * Different rigging tools name bones differently — Mixamo prefixes
 * everything with "mixamorig:", Blender/MakeHuman exports are often bare
 * lowercase names. Add more candidates here if your rig uses something
 * else; the resolver just needs one of these strings to exist as an
 * exact bone name in the model.
 */
export const BONE_NAME_MAP: Record<JointId, string[]> = {
  head: ['mixamorig:Head', 'Head', 'head'],
  neck: ['mixamorig:Neck', 'Neck', 'neck'],
  spine: ['mixamorig:Spine1', 'Spine1', 'spine_01', 'spine'],
  leftShoulder: ['mixamorig:LeftArm', 'LeftArm', 'upperarm_l', 'shoulder.L'],
  leftElbow: ['mixamorig:LeftForeArm', 'LeftForeArm', 'lowerarm_l', 'forearm.L'],
  rightShoulder: ['mixamorig:RightArm', 'RightArm', 'upperarm_r', 'shoulder.R'],
  rightElbow: ['mixamorig:RightForeArm', 'RightForeArm', 'lowerarm_r', 'forearm.R'],
  leftHip: ['mixamorig:LeftUpLeg', 'LeftUpLeg', 'thigh_l', 'upperleg.L'],
  leftKnee: ['mixamorig:LeftLeg', 'LeftLeg', 'calf_l', 'lowerleg.L'],
  leftAnkle: ['mixamorig:LeftFoot', 'LeftFoot', 'foot_l', 'foot.L'],
  rightHip: ['mixamorig:RightUpLeg', 'RightUpLeg', 'thigh_r', 'upperleg.R'],
  rightKnee: ['mixamorig:RightLeg', 'RightLeg', 'calf_r', 'lowerleg.R'],
  rightAnkle: ['mixamorig:RightFoot', 'RightFoot', 'foot_r', 'foot.R'],
}

/**
 * Anatomy layers are matched by a case-insensitive substring test against
 * each mesh's name in the loaded scene. Name your meshes in Blender (or
 * whatever tool exports the .glb) so at least one of these substrings
 * appears — e.g. "Body_Skin", "Muscle_Group_03", "Skeleton_Ribcage".
 * If your model has no separate mesh for a layer (most realistic body
 * scans won't have organs/circulatory/nervous meshes), that layer simply
 * has nothing to toggle and stays on the placeholder path — see
 * GLTFBodyModel.tsx.
 */
export const LAYER_MESH_NAME_MATCH: Record<AnatomyLayerId, string[]> = {
  skin: ['skin', 'body_surface'],
  muscles: ['muscle'],
  skeleton: ['bone', 'skeleton', 'skull', 'rib'],
  organs: ['organ', 'heart', 'lung', 'liver', 'stomach', 'intestine'],
  circulatory: ['artery', 'vein', 'circulat'],
  nervous: ['nerve', 'spinal_cord', 'brain'],
}
