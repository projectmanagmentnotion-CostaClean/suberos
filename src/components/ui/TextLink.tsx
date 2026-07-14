import { AnchorHTMLAttributes, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type TextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode
  className?: string
  externalLabel?: string
}

export function TextLink({
  children,
  className,
  externalLabel = 'Enlace externo',
  rel,
  target,
  ...props
}: TextLinkProps) {
  const isExternal = target === '_blank'
  const computedRel = isExternal ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ') : rel

  return (
    <a className={cx('text-link', className)} rel={computedRel} target={target} {...props}>
      <span>{children}</span>
      {isExternal ? (
        <>
          <span className="text-link__icon" aria-hidden="true">
            ↗
          </span>
          <span className="sr-only">{externalLabel}</span>
        </>
      ) : null}
    </a>
  )
}
