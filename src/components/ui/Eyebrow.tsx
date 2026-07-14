import { HTMLAttributes } from 'react'

import { cx } from '../../lib/utils/cx'

type EyebrowProps = HTMLAttributes<HTMLParagraphElement>

export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <p className={cx('eyebrow', className)} {...props}>
      {children}
    </p>
  )
}
