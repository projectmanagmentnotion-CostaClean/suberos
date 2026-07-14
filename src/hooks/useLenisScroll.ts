import { useEffect } from 'react'

import { MotionPreferences } from '../motion/types/motion.types'
import { scrollEngine } from '../motion/core/scrollEngine'

type UseLenisScrollOptions = {
  preferences: MotionPreferences
}

export function useLenisScroll({ preferences }: UseLenisScrollOptions) {
  useEffect(() => {
    scrollEngine.start(preferences)

    return () => {
      scrollEngine.destroy()
    }
  }, [preferences])
}
