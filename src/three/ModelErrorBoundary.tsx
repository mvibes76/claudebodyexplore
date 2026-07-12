import { Component, ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Wraps GLTFBodyModel. If the configured .glb is missing or fails to
 * parse, this renders the primitive mannequin instead of a blank crash —
 * the mode UI keeps working while a console error tells you why.
 */
export default class ModelErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error(
      '[ModelErrorBoundary] Failed to load the real body model — falling back to the primitive mannequin. Check BODY_MODEL_CONFIG.modelPath in modelConfig.ts.',
      error,
    )
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
