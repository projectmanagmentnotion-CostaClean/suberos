import { ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type FullBleedMediaProps = {
  children: ReactNode
  className?: string
}

export function FullBleedMedia({ children, className }: FullBleedMediaProps) {
  return <div className={cx('full-bleed-media', className)}>{children}</div>
}
