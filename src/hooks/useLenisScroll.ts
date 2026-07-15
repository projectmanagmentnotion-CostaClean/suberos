import { useEffect, useRef } from 'react'

import { MotionPreferences } from '../motion/types/motion.types'
import { scrollEngine } from '../motion/core/scrollEngine'

type UseLenisScrollOptions = {
  preferences: MotionPreferences
}

export function useLenisScroll({ preferences }: UseLenisScrollOptions) {
  const { profile, reducedMotion } = preferences
  const preferencesRef = useRef(preferences)

  useEffect(() => {
    preferencesRef.current = preferences
  }, [preferences])

  useEffect(() => {
    scrollEngine.start(preferencesRef.current)

    return () => {
      scrollEngine.destroy()
    }
  }, [])

  useEffect(() => {
    scrollEngine.update(preferences)
  }, [preferences, profile, reducedMotion])
}
