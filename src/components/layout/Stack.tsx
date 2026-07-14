import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'scene'

type StackProps<T extends ElementType = 'div'> = {
  as?: T
  gap?: StackGap
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Stack<T extends ElementType = 'div'>({
  as,
  children,
  className,
  gap = 'md',
  ...props
}: StackProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cx('stack', `stack--${gap}`, className)} {...props}>
      {children}
    </Component>
  )
}
