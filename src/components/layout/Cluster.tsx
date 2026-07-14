import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type ClusterGap = 'xs' | 'sm' | 'md' | 'lg'
type ClusterAlign = 'start' | 'center' | 'end' | 'stretch'
type ClusterJustify = 'start' | 'center' | 'between'

type ClusterProps<T extends ElementType = 'div'> = {
  as?: T
  gap?: ClusterGap
  align?: ClusterAlign
  justify?: ClusterJustify
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Cluster<T extends ElementType = 'div'>({
  as,
  align = 'center',
  children,
  className,
  gap = 'sm',
  justify = 'start',
  ...props
}: ClusterProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={cx(
        'cluster',
        `cluster--gap-${gap}`,
        `cluster--align-${align}`,
        `cluster--justify-${justify}`,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
