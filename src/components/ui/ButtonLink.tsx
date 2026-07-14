import { AnchorHTMLAttributes } from 'react'

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  tone?: 'primary' | 'ghost'
}

export function ButtonLink({ children, className = '', tone = 'primary', ...props }: ButtonLinkProps) {
  const classes = `button-link button-link--${tone} ${className}`.trim()

  return (
    <a className={classes} {...props}>
      {children}
    </a>
  )
}
