import { WARDROBE_PRESETS } from '@/data/wardrobePresets'
import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'

export default function WardrobePanel() {
  const mode = useSceneStore((s) => s.mode)
  const wardrobe = useBodyStore((s) => s.wardrobe)
  const setWardrobe = useBodyStore((s) => s.setWardrobe)

  if (mode !== 'wardrobe') return null

  return (
    <aside className="panel panel-left">
      <h2 className="panel-title">Wardrobe</h2>
      <p className="panel-hint">
        Independent from anatomy layers — clothing sits over whatever tissue layers are visible.
      </p>

      <div className="wardrobe-list">
        {WARDROBE_PRESETS.map((preset) => (
          <button
            key={preset.id}
            className={wardrobe.id === preset.id ? 'wardrobe-card active' : 'wardrobe-card'}
            onClick={() => setWardrobe(preset)}
          >
            <span className="wardrobe-name">{preset.name}</span>
            <span className="wardrobe-desc">{preset.description}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
