import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type GridColumns = 'halves' | 'thirds' | 'content-aside' | 'cards'
type GridGap = 'sm' | 'md' | 'lg'

type GridProps<T extends ElementType = 'div'> = {
  as?: T
  columns?: GridColumns
  gap?: GridGap
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Grid<T extends ElementType = 'div'>({
  as,
  children,
  className,
  columns = 'cards',
  gap = 'md',
  ...props
}: GridProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cx('grid', `grid--${columns}`, `grid--gap-${gap}`, className)} {...props}>
      {children}
    </Component>
  )
}
