import { POSE_PRESETS } from '@/data/posePresets'
import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'

export default function PoseControls() {
  const mode = useSceneStore((s) => s.mode)
  const pose = useBodyStore((s) => s.pose)
  const setPoseById = useBodyStore((s) => s.setPoseById)

  if (mode !== 'pose' && mode !== 'simulation') return null

  return (
    <div className="bottombar">
      <div className="pose-list">
        {POSE_PRESETS.map((p) => (
          <button
            key={p.id}
            className={pose.id === p.id ? 'pose-chip active' : 'pose-chip'}
            onClick={() => setPoseById(p.id)}
            title={p.description}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
  )
}
