import { useEffect } from 'react'
import BodyViewer from '@/components/BodyViewer'
import ModeSwitcher from '@/components/ModeSwitcher'
import AnatomyLayerPanel from '@/components/AnatomyLayerPanel'
import WardrobePanel from '@/components/WardrobePanel'
import IssueExplorer from '@/components/IssueExplorer'
import SimulationPanel from '@/components/SimulationPanel'
import RegionInfoPanel from '@/components/RegionInfoPanel'
import PoseControls from '@/components/PoseControls'
import BodyCustomizationPanel from '@/components/BodyCustomizationPanel'
import { useSceneStore } from '@/state/useSceneStore'

export default function App() {
  const mode = useSceneStore((s) => s.mode)
  const setSelectedRegion = useSceneStore((s) => s.setSelectedRegion)

  useEffect(() => {
    const clear = () => setSelectedRegion(null)
    document.addEventListener('viewport-empty-click', clear)
    return () => document.removeEventListener('viewport-empty-click', clear)
  }, [setSelectedRegion])

  return (
    <div className="app-shell">
      <BodyViewer />

      <ModeSwitcher />

      {(mode === 'explore' || mode === 'anatomy') && <AnatomyLayerPanel />}
      <WardrobePanel />
      <IssueExplorer />
      <SimulationPanel />

      <RegionInfoPanel />

      <PoseControls />

      <BodyCustomizationPanel />
    </div>
  )
}
