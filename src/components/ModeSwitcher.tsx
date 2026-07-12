import { useSceneStore, SceneMode } from '@/state/useSceneStore'

const MODES: { id: SceneMode; label: string }[] = [
  { id: 'explore', label: 'Explore' },
  { id: 'pose', label: 'Pose' },
  { id: 'anatomy', label: 'Anatomy' },
  { id: 'wardrobe', label: 'Wardrobe' },
  { id: 'issues', label: 'Issues' },
  { id: 'simulation', label: 'Simulation' },
]

export default function ModeSwitcher() {
  const mode = useSceneStore((s) => s.mode)
  const setMode = useSceneStore((s) => s.setMode)
  const resetCamera = useSceneStore((s) => s.resetCamera)
  const setCustomizationPanelOpen = useSceneStore((s) => s.setCustomizationPanelOpen)

  return (
    <header className="topbar">
      <div className="topbar-title">
        <span className="topbar-eyebrow">Human Exhibit</span>
        <h1>Interactive Body Viewer</h1>
      </div>

      <nav className="mode-switcher" aria-label="Scene mode">
        {MODES.map((m) => (
          <button
            key={m.id}
            className={mode === m.id ? 'mode-btn active' : 'mode-btn'}
            onClick={() => setMode(m.id)}
          >
            {m.label}
          </button>
        ))}
      </nav>

      <div className="topbar-actions">
        <button className="ghost-btn" onClick={() => setCustomizationPanelOpen(true)}>
          Customize
        </button>
        <button className="ghost-btn" onClick={resetCamera}>
          Reset camera
        </button>
      </div>
    </header>
  )
}
