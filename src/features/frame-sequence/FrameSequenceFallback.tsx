import { cx } from '../../lib/utils/cx'

type FrameSequenceFallbackProps = {
  alt: string
  className?: string
  poster: string
  fallbackImage: string
  useFallbackImage: boolean
  title: string
  visible: boolean
}

export function FrameSequenceFallback({
  alt,
  className,
  fallbackImage,
  poster,
  useFallbackImage,
  title,
  visible,
}: FrameSequenceFallbackProps) {
  const src = useFallbackImage ? fallbackImage : poster

  return (
    <div className={cx('frame-sequence-fallback', visible && 'is-visible', className)}>
      <img alt={alt} className="frame-sequence-fallback__image" decoding="async" height="900" src={src} width="1600" />
      <div aria-hidden="true" className="frame-sequence-fallback__overlay">
        <span className="frame-sequence-fallback__eyebrow">Sequence fallback</span>
        <strong>{title}</strong>
      </div>
    </div>
  )
}
