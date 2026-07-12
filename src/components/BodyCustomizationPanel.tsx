import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'
import { HERITAGE_PRESETS, BODY_TYPE_LABELS } from '@/data/bodyPresets'
import type { BodyType, AgeRange, GenderPresentation, SexModel } from '@/types/body'

export default function BodyCustomizationPanel() {
  const open = useSceneStore((s) => s.customizationPanelOpen)
  const setOpen = useSceneStore((s) => s.setCustomizationPanelOpen)
  const body = useBodyStore((s) => s.body)
  const setBody = useBodyStore((s) => s.setBody)

  if (!open) return null

  const selectedHeritage = HERITAGE_PRESETS.find((h) => h.id === body.heritagePreset)

  return (
    <div className="slideover-backdrop" onClick={() => setOpen(false)}>
      <div className="slideover" onClick={(e) => e.stopPropagation()}>
        <div className="slideover-header">
          <h2>Body customization</h2>
          <button className="ghost-btn" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>

        <div className="field-group">
          <label>Anatomical model</label>
          <div className="segmented">
            {(['female', 'male'] as SexModel[]).map((v) => (
              <button
                key={v}
                className={body.sexModel === v ? 'segment active' : 'segment'}
                onClick={() => setBody({ sexModel: v })}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Gender presentation</label>
          <div className="segmented">
            {(['feminine', 'masculine', 'androgynous'] as GenderPresentation[]).map((v) => (
              <button
                key={v}
                className={body.genderPresentation === v ? 'segment active' : 'segment'}
                onClick={() => setBody({ genderPresentation: v })}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Age range</label>
          <div className="segmented">
            {(['child', 'teen', 'adult', 'senior'] as AgeRange[]).map((v) => (
              <button
                key={v}
                className={body.ageRange === v ? 'segment active' : 'segment'}
                onClick={() => setBody({ ageRange: v })}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Height — {body.heightCm} cm</label>
          <input
            type="range"
            min={120}
            max={210}
            value={body.heightCm}
            onChange={(e) => setBody({ heightCm: parseInt(e.target.value, 10) })}
          />
        </div>

        <div className="field-group">
          <label>Weight — {body.weightKg} kg</label>
          <input
            type="range"
            min={30}
            max={150}
            value={body.weightKg}
            onChange={(e) => setBody({ weightKg: parseInt(e.target.value, 10) })}
          />
        </div>

        <div className="field-group">
          <label>Body type</label>
          <div className="segmented">
            {(Object.keys(BODY_TYPE_LABELS) as BodyType[]).map((v) => (
              <button
                key={v}
                className={body.bodyType === v ? 'segment active' : 'segment'}
                onClick={() => setBody({ bodyType: v })}
              >
                {BODY_TYPE_LABELS[v]}
              </button>
            ))}
          </div>
        </div>

        <div className="field-group">
          <label>Skin tone</label>
          <input
            type="color"
            value={body.skinTone}
            onChange={(e) => setBody({ skinTone: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label>Heritage-inspired preset</label>
          <select
            value={body.heritagePreset ?? 'none'}
            onChange={(e) => setBody({ heritagePreset: e.target.value })}
          >
            {HERITAGE_PRESETS.map((h) => (
              <option key={h.id} value={h.id}>
                {h.label}
              </option>
            ))}
          </select>
          {selectedHeritage && selectedHeritage.id !== 'none' && (
            <div className="tone-swatches">
              {selectedHeritage.skinToneRange.map((tone) => (
                <button
                  key={tone}
                  className="tone-swatch"
                  style={{ background: tone }}
                  onClick={() => setBody({ skinTone: tone })}
                  title={tone}
                />
              ))}
            </div>
          )}
          <p className="panel-hint">
            Heritage presets only ever adjust a neutral skin tone range and hair placeholder —
            never body shape.
          </p>
        </div>
      </div>
    </div>
  )
}
