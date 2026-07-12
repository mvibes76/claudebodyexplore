import { BODY_REGIONS } from '@/data/bodyRegions'
import { BODY_ISSUES } from '@/data/bodyIssues'
import { ANATOMY_LAYERS } from '@/data/anatomyLayers'
import { useSceneStore } from '@/state/useSceneStore'
import { EDUCATIONAL_DISCLAIMER } from '@/types/issues'

export default function RegionInfoPanel() {
  const selectedRegion = useSceneStore((s) => s.selectedRegion)
  const activeIssue = useSceneStore((s) => s.activeIssue)
  const setActiveIssue = useSceneStore((s) => s.setActiveIssue)
  const mode = useSceneStore((s) => s.mode)

  if (mode === 'wardrobe') return null

  // Issues mode: show the selected issue's detail instead of region info.
  if (mode === 'issues' && activeIssue) {
    return (
      <aside className="panel panel-right">
        <h2 className="panel-title">{activeIssue.title}</h2>
        <span className="tag">{activeIssue.category}</span>
        <p className="region-desc">{activeIssue.description}</p>
        <h3 className="panel-subtitle">Notes</h3>
        <ul className="notes-list">
          {activeIssue.educationalNotes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
        <p className="panel-hint disclaimer">{activeIssue.disclaimer}</p>
        <button className="ghost-btn" onClick={() => setActiveIssue(null)}>
          Clear
        </button>
      </aside>
    )
  }

  if (!selectedRegion) {
    return (
      <aside className="panel panel-right panel-empty">
        <h2 className="panel-title">Region info</h2>
        <p className="panel-hint">Click a body region in the viewport to inspect it.</p>
      </aside>
    )
  }

  const region = BODY_REGIONS.find((r) => r.id === selectedRegion)
  if (!region) return null

  const relatedIssues = BODY_ISSUES.filter((i) => i.bodyRegion === selectedRegion)

  return (
    <aside className="panel panel-right">
      <h2 className="panel-title">{region.label}</h2>

      <h3 className="panel-subtitle">Educational notes</h3>
      <ul className="notes-list">
        {region.educationalNotes.map((note, i) => (
          <li key={i}>{note}</li>
        ))}
      </ul>

      <h3 className="panel-subtitle">Related anatomy layers</h3>
      <div className="related-layers">
        {region.relatedLayers.map((layerId) => {
          const layer = ANATOMY_LAYERS.find((l) => l.id === layerId)
          if (!layer) return null
          return (
            <span className="tag" key={layerId}>
              <span className="tag-dot" style={{ background: layer.placeholderColor }} />
              {layer.label}
            </span>
          )
        })}
      </div>

      {relatedIssues.length > 0 && (
        <>
          <h3 className="panel-subtitle">Issue markers here</h3>
          <div className="related-layers">
            {relatedIssues.map((issue) => (
              <button
                key={issue.id}
                className="tag tag-button"
                onClick={() => setActiveIssue(issue)}
              >
                {issue.title}
              </button>
            ))}
          </div>
          <p className="panel-hint disclaimer">{EDUCATIONAL_DISCLAIMER}</p>
        </>
      )}
    </aside>
  )
}
