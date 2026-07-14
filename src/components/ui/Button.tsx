import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cx } from '../../lib/utils/cx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'small' | 'medium' | 'large'

type CommonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  loading?: boolean
  size?: ButtonSize
  variant?: ButtonVariant
}

type ButtonAsButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'className' | 'disabled'> & {
    href?: never
  }

type ButtonAsLinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children' | 'className'> & {
    href: string
  }

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps

function getButtonClasses({
  className,
  loading,
  size,
  variant,
}: Pick<CommonProps, 'className' | 'loading' | 'size' | 'variant'>) {
  return cx(
    'button',
    `button--${variant ?? 'primary'}`,
    `button--${size ?? 'medium'}`,
    loading && 'is-loading',
    className,
  )
}

export function Button(props: ButtonProps) {
  if (typeof (props as ButtonAsLinkProps).href === 'string') {
    const linkProps = props as ButtonAsLinkProps
    const {
      children,
      className,
      disabled = false,
      href,
      loading = false,
      rel,
      size = 'medium',
      target,
      variant = 'primary',
      ...anchorProps
    } = linkProps
    const classes = getButtonClasses({ className, loading, size, variant })
    const computedRel =
      target === '_blank'
        ? [rel, 'noopener', 'noreferrer'].filter(Boolean).join(' ')
        : rel
    const content = (
      <>
        <span className="button__label">{children}</span>
        {loading ? <span className="button__spinner" aria-hidden="true" /> : null}
      </>
    )

    return (
      <a
        className={classes}
        href={href}
        rel={computedRel}
        target={target}
        aria-disabled={disabled || undefined}
        {...anchorProps}
      >
        {content}
      </a>
    )
  }

  const buttonPropsSource = props as ButtonAsButtonProps
  const {
    children,
    className,
    disabled = false,
    loading = false,
    size = 'medium',
    type = 'button',
    variant = 'primary',
    ...buttonProps
  } = buttonPropsSource
  const classes = getButtonClasses({ className, loading, size, variant })
  const content = (
    <>
      <span className="button__label">{children}</span>
      {loading ? <span className="button__spinner" aria-hidden="true" /> : null}
    </>
  )

  return (
    <button className={classes} disabled={disabled || loading} type={type} {...buttonProps}>
      {content}
    </button>
  )
}
