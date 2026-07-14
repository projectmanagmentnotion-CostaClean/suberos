import { ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type MediaRatio = 'square' | 'portrait' | 'landscape' | 'cinema' | 'auto'

type MediaFrameProps = {
  media?: ReactNode
  caption?: string
  overlay?: ReactNode
  fallback?: ReactNode
  ratio?: MediaRatio
  className?: string
}

export function MediaFrame({
  caption,
  className,
  fallback,
  media,
  overlay,
  ratio = 'landscape',
}: MediaFrameProps) {
  return (
    <figure className={cx('media-frame', `media-frame--${ratio}`, className)}>
      <div className="media-frame__viewport">
        {media ? media : <div className="media-frame__fallback">{fallback}</div>}
        {overlay ? <div className="media-frame__overlay">{overlay}</div> : null}
      </div>
      {caption ? <figcaption className="media-frame__caption">{caption}</figcaption> : null}
    </figure>
  )
}
