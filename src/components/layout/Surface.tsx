import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type SurfaceTone = 'default' | 'muted' | 'highlight'
type SurfacePadding = 'sm' | 'md' | 'lg'

type SurfaceProps<T extends ElementType = 'div'> = {
  as?: T
  tone?: SurfaceTone
  padding?: SurfacePadding
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Surface<T extends ElementType = 'div'>({
  as,
  children,
  className,
  padding = 'md',
  tone = 'default',
  ...props
}: SurfaceProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cx('surface', `surface--${tone}`, `surface--padding-${padding}`, className)} {...props}>
      {children}
    </Component>
  )
}
