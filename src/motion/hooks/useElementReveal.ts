import { RefObject } from 'react'

import { createRevealScene } from '../scenes/createRevealScene'
import { useScrollScene } from './useScrollScene'

type UseElementRevealOptions = {
  dependencies?: unknown[]
  selector?: string
}

export function useElementReveal(ref: RefObject<HTMLElement | null>, options: UseElementRevealOptions = {}) {
  const { dependencies = [], selector } = options

  useScrollScene(ref, {
    dependencies,
    scene: (context) => {
      const targets = selector
        ? Array.from(context.scope.querySelectorAll(selector))
        : [context.scope]

      return createRevealScene(context, { targets })
    },
  })
}
