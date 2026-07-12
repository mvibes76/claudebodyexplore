import { ANATOMY_LAYERS } from '@/data/anatomyLayers'
import { useSceneStore } from '@/state/useSceneStore'

export default function AnatomyLayerPanel() {
  const layers = useSceneStore((s) => s.layers)
  const setLayerVisible = useSceneStore((s) => s.setLayerVisible)
  const setLayerOpacity = useSceneStore((s) => s.setLayerOpacity)
  const setLayerHighlight = useSceneStore((s) => s.setLayerHighlight)
  const setLayerIsolated = useSceneStore((s) => s.setLayerIsolated)

  return (
    <aside className="panel panel-left">
      <h2 className="panel-title">Anatomy layers</h2>
      <p className="panel-hint">Placeholder tissue tints — swap-ready for licensed anatomical assets.</p>

      <div className="layer-list">
        {ANATOMY_LAYERS.map((layer) => {
          const state = layers[layer.id]
          return (
            <div className="layer-row" key={layer.id}>
              <div className="layer-row-top">
                <label className="layer-checkbox">
                  <input
                    type="checkbox"
                    checked={state.visible}
                    onChange={(e) => setLayerVisible(layer.id, e.target.checked)}
                  />
                  <span className="layer-swatch" style={{ background: layer.placeholderColor }} />
                  {layer.label}
                </label>
                <button
                  className={state.isolated ? 'chip chip-active' : 'chip'}
                  onClick={() => setLayerIsolated(layer.id, !state.isolated)}
                  title="Isolate this layer"
                >
                  Isolate
                </button>
              </div>

              <input
                className="opacity-slider"
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={state.opacity}
                onChange={(e) => setLayerOpacity(layer.id, parseFloat(e.target.value))}
              />

              <button
                className={state.highlight === 'highlight' ? 'chip chip-active' : 'chip'}
                onClick={() =>
                  setLayerHighlight(layer.id, state.highlight === 'highlight' ? 'none' : 'highlight')
                }
              >
                Highlight
              </button>

              <p className="layer-desc">{layer.description}</p>
            </div>
          )
        })}
      </div>
    </aside>
  )
}
