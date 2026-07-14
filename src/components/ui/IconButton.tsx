import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type IconButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'aria-label'> & {
  label: string
  children: ReactNode
  className?: string
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { children, className, label, type = 'button', ...props },
  ref,
) {
  return (
    <button aria-label={label} className={cx('icon-button', className)} ref={ref} type={type} {...props}>
      <span aria-hidden="true" className="icon-button__icon">
        {children}
      </span>
    </button>
  )
})
