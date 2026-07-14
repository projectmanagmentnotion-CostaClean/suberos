import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type ContainerSize = 'narrow' | 'content' | 'wide' | 'full'

type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
  size?: ContainerSize
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Container<T extends ElementType = 'div'>({
  as,
  children,
  className,
  size = 'wide',
  ...props
}: ContainerProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cx('container', `container--${size}`, className)} {...props}>
      {children}
    </Component>
  )
}
