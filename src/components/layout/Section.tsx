import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type SectionTone = 'default' | 'muted' | 'hero' | 'raised'
type SectionSpacing = 'compact' | 'default' | 'scene'

type SectionProps<T extends ElementType = 'section'> = {
  as?: T
  tone?: SectionTone
  spacing?: SectionSpacing
  className?: string
  children: ReactNode
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Section<T extends ElementType = 'section'>({
  as,
  children,
  className,
  spacing = 'default',
  tone = 'default',
  ...props
}: SectionProps<T>) {
  const Component = as ?? 'section'

  return (
    <Component className={cx('section', `section--${tone}`, `section--${spacing}`, className)} {...props}>
      {children}
    </Component>
  )
}
