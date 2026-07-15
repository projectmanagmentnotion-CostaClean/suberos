import type { MouseEvent } from 'react'

type SkipLinkProps = {
  href: string
  label: string
}

export function SkipLink({ href, label }: SkipLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!href.startsWith('#')) {
      return
    }

    const target = document.querySelector<HTMLElement>(href)

    if (!target) {
      return
    }

    event.preventDefault()
    target.focus({ preventScroll: true })
    target.scrollIntoView({ block: 'start' })
    window.history.replaceState(null, '', href)
  }

  return (
    <a className="skip-link" href={href} onClick={handleClick}>
      {label}
    </a>
  )
}
