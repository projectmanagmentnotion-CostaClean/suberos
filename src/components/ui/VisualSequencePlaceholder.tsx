import { AssetPlaceholder } from './AssetPlaceholder'

type VisualSequencePlaceholderProps = {
  frameCount: number
  label: string
}

export function VisualSequencePlaceholder({ frameCount, label }: VisualSequencePlaceholderProps) {
  return (
    <div className="visual-sequence-placeholder">
      <AssetPlaceholder label={label} title={`${frameCount} frames planned`} variant="sequence" />
      <p className="visual-sequence-placeholder__meta">Secuencia interna pendiente de produccion y aprobacion.</p>
    </div>
  )
}
