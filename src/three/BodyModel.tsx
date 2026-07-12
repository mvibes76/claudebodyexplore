import { Suspense } from 'react'
import PrimitiveMannequin from './PrimitiveMannequin'
import GLTFBodyModel from './GLTFBodyModel'
import ModelErrorBoundary from './ModelErrorBoundary'
import BodyRegionHitboxes from './BodyRegionHitboxes'
import { BODY_MODEL_CONFIG } from './modelConfig'

/**
 * Single entry point BodyViewer.tsx renders. Swapping the mannequin for a
 * real body is one flag in modelConfig.ts — nothing here needs to change.
 */
export default function BodyModel() {
  return (
    <>
      {BODY_MODEL_CONFIG.useRealModel ? (
        <ModelErrorBoundary fallback={<PrimitiveMannequin />}>
          <Suspense fallback={null}>
            <GLTFBodyModel />
          </Suspense>
        </ModelErrorBoundary>
      ) : (
        <PrimitiveMannequin />
      )}

      <BodyRegionHitboxes />
    </>
  )
}
