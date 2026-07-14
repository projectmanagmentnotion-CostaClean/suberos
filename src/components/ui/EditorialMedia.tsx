import { ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type EditorialMediaProps = {
  children: ReactNode
  className?: string
}

export function EditorialMedia({ children, className }: EditorialMediaProps) {
  return <div className={cx('editorial-media', className)}>{children}</div>
}
