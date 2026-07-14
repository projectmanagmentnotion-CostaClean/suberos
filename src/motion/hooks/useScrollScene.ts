import { RefObject } from 'react'

import { motionMediaQueries } from '../config/breakpoints'
import { createMotionMedia } from '../lib/createMotionMedia'
import { MotionBreakpoint, MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { registerMotionPlugins, gsap, ScrollTrigger } from '../core/registerGsap'
import { useGsapContext } from './useGsapContext'
import { useMotionPreferences } from './useMotionPreferences'

type UseScrollSceneOptions = {
  dependencies?: unknown[]
  enabled?: boolean
  scene: (context: MotionSceneContext) => SceneCleanup | void
}

function getBreakpoint(width: number): MotionBreakpoint {
  if (width >= 1024) {
    return 'desktop'
  }

  if (width >= 640) {
    return 'tablet'
  }

  return 'mobile'
}

export function useScrollScene(ref: RefObject<HTMLElement | null>, { dependencies = [], enabled = true, scene }: UseScrollSceneOptions) {
  const preferences = useMotionPreferences()

  useGsapContext(
    () => {
      registerMotionPlugins()

      if (!enabled || !ref.current) {
        return
      }

      const scope = ref.current
      const breakpoint = getBreakpoint(preferences.viewport.width)
      const mm = createMotionMedia()
      const cleanups: Array<SceneCleanup | void> = []

      mm.add(
        {
          coarse: motionMediaQueries.coarsePointer,
          desktop: motionMediaQueries.desktop,
          fine: motionMediaQueries.finePointer,
          mobile: motionMediaQueries.mobile,
          reduced: motionMediaQueries.reduced,
          tablet: motionMediaQueries.tablet,
        },
        () => {
          const cleanup = scene({
            breakpoint,
            gsap,
            preferences,
            profile: preferences.profile,
            scope,
            ScrollTrigger,
          })
          cleanups.push(cleanup)
        },
      )

      return () => {
        for (const cleanup of cleanups) {
          cleanup?.()
        }
        mm.revert()
      }
    },
    {
      dependencies: [enabled, preferences, ...dependencies],
      revertOnUpdate: true,
    },
  )
}
