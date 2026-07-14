import { useRef } from 'react'

import { useScrollAccent } from '../../hooks/useScrollAccent'

type ScrollAccentProps = {
  label: string
}

export function ScrollAccent({ label }: ScrollAccentProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useScrollAccent(ref)

  return (
    <div className="scroll-accent" ref={ref} data-scroll-accent>
      <span>{label}</span>
      <div className="scroll-accent__line" aria-hidden="true" />
    </div>
  )
}
