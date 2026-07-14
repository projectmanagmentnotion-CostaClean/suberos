import { PropsWithChildren, useEffect, useMemo, useState } from 'react'

import { MotionPreferencesContext } from '../core/motionPreferencesContext'
import { readMotionPreferencesSnapshot } from '../core/motionPreferences'
import { MotionPreferences } from '../types/motion.types'

export function MotionPreferencesProvider({ children }: PropsWithChildren) {
  const [preferences, setPreferences] = useState<MotionPreferences>(() => readMotionPreferencesSnapshot())

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const pointerFineQuery = window.matchMedia('(pointer: fine)')
    const pointerCoarseQuery = window.matchMedia('(pointer: coarse)')
    const hoverQuery = window.matchMedia('(hover: none)')

    const update = () => {
      setPreferences(readMotionPreferencesSnapshot())
    }

    update()

    reducedMotionQuery.addEventListener('change', update)
    pointerFineQuery.addEventListener('change', update)
    pointerCoarseQuery.addEventListener('change', update)
    hoverQuery.addEventListener('change', update)
    window.addEventListener('resize', update, { passive: true })

    return () => {
      reducedMotionQuery.removeEventListener('change', update)
      pointerFineQuery.removeEventListener('change', update)
      pointerCoarseQuery.removeEventListener('change', update)
      hoverQuery.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  const value = useMemo(() => preferences, [preferences])

  return <MotionPreferencesContext.Provider value={value}>{children}</MotionPreferencesContext.Provider>
}
