import { workShowcaseDisciplines } from '../../data/workShowcase'
import { cx } from '../../lib/utils/cx'

type AssetPlaceholderProps = {
  className?: string
  label?: string
  title?: string
  variant?: 'discipline-grid' | 'hero' | 'sequence' | 'service'
}

export function AssetPlaceholder({
  className,
  label = 'SUBEROS visual system',
  title = 'Editorial composition',
  variant = 'discipline-grid',
}: AssetPlaceholderProps) {
  return (
    <div aria-hidden="true" className={cx('asset-placeholder', `asset-placeholder--${variant}`, className)}>
      <div className="asset-placeholder__grain" />
      <div className="asset-placeholder__grid" />
      <div className="asset-placeholder__glow" />
      <div className="asset-placeholder__badge">{label}</div>
      <div className="asset-placeholder__logo">
        <img alt="" height="256" src="/branding/suberos-logo-symbol.webp" width="247" />
      </div>
      <div className="asset-placeholder__headline">{title}</div>
      {variant === 'discipline-grid' ? (
        <div className="asset-placeholder__panels">
          {workShowcaseDisciplines.map((discipline) => (
            <div className="asset-placeholder__panel" key={discipline.id}>
              <small>{discipline.label}</small>
              <span>{discipline.title}</span>
            </div>
          ))}
        </div>
      ) : null}
      {variant === 'service' ? (
        <div className="asset-placeholder__service-copy">
          <span>Materiales</span>
          <span>Tipografia</span>
          <span>Direccion visual</span>
        </div>
      ) : null}
    </div>
  )
}
