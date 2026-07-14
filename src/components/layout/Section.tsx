import { HTMLAttributes, ElementType, forwardRef, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type SectionTone = 'default' | 'muted' | 'hero' | 'raised'
type SectionSpacing = 'compact' | 'default' | 'scene'

type SectionProps = {
  as?: ElementType
  tone?: SectionTone
  spacing?: SectionSpacing
  className?: string
  children: ReactNode
} & Omit<HTMLAttributes<HTMLElement>, 'children' | 'className'>

export const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    as,
    children,
    className,
    spacing = 'default',
    tone = 'default',
    ...props
  },
  ref,
) {
  const Component = as ?? 'section'

  return (
    <Component className={cx('section', `section--${tone}`, `section--${spacing}`, className)} ref={ref} {...props}>
      {children}
    </Component>
  )
})
