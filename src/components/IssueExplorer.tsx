import { BODY_ISSUES } from '@/data/bodyIssues'
import { useSceneStore } from '@/state/useSceneStore'

const SEVERITY_COLOR: Record<string, string> = {
  info: '#4ab0e8',
  low: '#e8c94a',
  medium: '#ff8a3d',
  high: '#c21e1e',
}

export default function IssueExplorer() {
  const mode = useSceneStore((s) => s.mode)
  const activeIssue = useSceneStore((s) => s.activeIssue)
  const setActiveIssue = useSceneStore((s) => s.setActiveIssue)

  if (mode !== 'issues') return null

  return (
    <aside className="panel panel-left">
      <h2 className="panel-title">Issue explorer</h2>
      <p className="panel-hint disclaimer">
        Educational visualization only — not a medical diagnosis.
      </p>

      <div className="issue-list">
        {BODY_ISSUES.map((issue) => (
          <button
            key={issue.id}
            className={activeIssue?.id === issue.id ? 'issue-card active' : 'issue-card'}
            onClick={() => setActiveIssue(activeIssue?.id === issue.id ? null : issue)}
          >
            <div className="issue-card-top">
              <span
                className="severity-dot"
                style={{ background: SEVERITY_COLOR[issue.severity] }}
              />
              <span className="issue-title">{issue.title}</span>
            </div>
            <span className="issue-category">{issue.category}</span>
          </button>
        ))}
      </div>
    </aside>
  )
}
