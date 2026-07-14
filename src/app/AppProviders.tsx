import { PropsWithChildren } from 'react'

import { useLenisScroll } from '../hooks/useLenisScroll'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function AppProviders({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion()

  useLenisScroll({ enabled: !reducedMotion })

  return <>{children}</>
}
