import { HTMLAttributes, ElementType, forwardRef, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type SurfaceTone = 'default' | 'muted' | 'highlight'
type SurfacePadding = 'sm' | 'md' | 'lg'

type SurfaceProps = {
  as?: ElementType
  tone?: SurfaceTone
  padding?: SurfacePadding
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>

export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  {
    as,
    children,
    className,
    padding = 'md',
    tone = 'default',
    ...props
  },
  ref,
) {
  const Component = as ?? 'div'

  return (
    <Component
      className={cx('surface', `surface--${tone}`, `surface--padding-${padding}`, className)}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  )
})
