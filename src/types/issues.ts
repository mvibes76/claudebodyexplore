// Educational "issue" markers. These are NOT medical diagnoses.
// Every surfaced issue must carry the disclaimer field and the UI must
// render it — enforced in IssueExplorer.tsx and RegionInfoPanel.tsx.

export type IssueCategory =
  | 'Posture'
  | 'Mobility'
  | 'Muscle strain'
  | 'Joint stress'
  | 'Skin observation'
  | 'Circulation'
  | 'Nerve pathway'
  | 'Organ system overview'

export type IssueSeverity = 'info' | 'low' | 'medium' | 'high'

export type MarkerType = 'glow' | 'pin' | 'heatmap' | 'outline'

export interface BodyIssue {
  id: string
  title: string
  category: IssueCategory
  bodyRegion: string
  severity: IssueSeverity
  description: string
  visualMarker: {
    type: MarkerType
    color: string
  }
  educationalNotes: string[]
  disclaimer: string
}

export const EDUCATIONAL_DISCLAIMER =
  'This is educational visualization only and not a medical diagnosis.'
