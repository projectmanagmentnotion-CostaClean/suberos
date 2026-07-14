import { RefObject } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

import { createMotionMedia } from '../lib/gsap/createMotionMedia'
import { useReducedMotion } from './useReducedMotion'

type ScrollAccentRef = RefObject<HTMLDivElement | null>

export function useScrollAccent(ref: ScrollAccentRef) {
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      if (!ref.current || reducedMotion) {
        return
      }

      const mm = createMotionMedia()

      mm.add('(min-width: 0px)', () => {
        const line = ref.current?.querySelector<HTMLElement>('.scroll-accent__line')
        if (!line) {
          return
        }

        gsap.fromTo(
          line,
          { scaleX: 0.2, transformOrigin: 'left center' },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              end: 'bottom 35%',
              scrub: 0.8,
            },
          },
        )

        gsap.fromTo(
          ref.current,
          { y: 0 },
          {
            y: -18,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 90%',
              end: 'bottom top',
              scrub: 0.8,
            },
          },
        )
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )
}
