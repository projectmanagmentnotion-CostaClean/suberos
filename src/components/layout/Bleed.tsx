import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type BleedInset = 'sm' | 'md' | 'lg'

type BleedProps<T extends ElementType = 'div'> = {
  as?: T
  inset?: BleedInset
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Bleed<T extends ElementType = 'div'>({
  as,
  children,
  className,
  inset = 'md',
  ...props
}: BleedProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component className={cx('bleed', `bleed--${inset}`, className)} {...props}>
      {children}
    </Component>
  )
}
