import { HTMLAttributes } from 'react'

import { cx } from '../../lib/utils/cx'

type DividerProps = HTMLAttributes<HTMLHRElement>

export function Divider({ className, ...props }: DividerProps) {
  return <hr className={cx('divider', className)} {...props} />
}
