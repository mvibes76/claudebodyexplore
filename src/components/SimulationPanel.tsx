import { useBodyStore } from '@/state/useBodyStore'
import { useSceneStore } from '@/state/useSceneStore'

/**
 * Scene 1 only ships the UI + architecture for simulation mode, plus one
 * working animation (idle breathing / weight shift). Walking, balance, and
 * joint-range demos are wired up as disabled previews so Scene 2 can turn
 * them on without redesigning this panel.
 */
export default function SimulationPanel() {
  const mode = useSceneStore((s) => s.mode)
  const simulation = useBodyStore((s) => s.simulation)
  const toggleSimulation = useBodyStore((s) => s.toggleSimulation)

  if (mode !== 'simulation') return null

  return (
    <aside className="panel panel-left">
      <h2 className="panel-title">Simulation mode</h2>
      <p className="panel-hint">
        Foundation for movement simulation. Only breathing and weight shift are live in Scene 1.
      </p>

      <div className="sim-toggle-list">
        <label className="sim-toggle">
          <input
            type="checkbox"
            checked={simulation.idleBreathing}
            onChange={() => toggleSimulation('idleBreathing')}
          />
          Idle breathing
        </label>
        <label className="sim-toggle">
          <input
            type="checkbox"
            checked={simulation.weightShift}
            onChange={() => toggleSimulation('weightShift')}
          />
          Weight shift
        </label>

        <div className="sim-toggle sim-toggle-disabled">
          Walking preview
          <span className="tag">Scene 2</span>
        </div>
        <div className="sim-toggle sim-toggle-disabled">
          Balance preview
          <span className="tag">Scene 2</span>
        </div>
        <div className="sim-toggle sim-toggle-disabled">
          Joint range demo
          <span className="tag">Scene 2</span>
        </div>
      </div>
    </aside>
  )
}
