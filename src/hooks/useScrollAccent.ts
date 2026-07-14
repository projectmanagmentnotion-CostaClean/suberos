import { RefObject } from 'react'

import { createParallaxScene } from '../motion/scenes/createParallaxScene'
import { createRevealScene } from '../motion/scenes/createRevealScene'
import { useScrollScene } from '../motion/hooks/useScrollScene'

type ScrollAccentRef = RefObject<HTMLDivElement | null>

export function useScrollAccent(ref: ScrollAccentRef) {
  useScrollScene(ref, {
    scene: (context) => {
      const line = context.scope.querySelector('.scroll-accent__line')

      const revealCleanup = createRevealScene(context, {
        distance: 18,
        stagger: 0,
        targets: line ? [line] : [],
      })
      const parallaxCleanup = createParallaxScene(context, {
        distance: 18,
        target: context.scope,
      })

      return () => {
        revealCleanup?.()
        parallaxCleanup?.()
      }
    },
  })
}
