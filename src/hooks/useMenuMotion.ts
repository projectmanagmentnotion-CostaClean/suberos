import { MutableRefObject } from 'react'

import { gsap } from '../motion/core/registerGsap'
import { createMotionMedia } from '../motion/lib/createMotionMedia'
import { useGsapContext } from '../motion/hooks/useGsapContext'

type UseMenuMotionOptions = {
  isOpen: boolean
  isReady: boolean
  panelRef: MutableRefObject<HTMLElement | null>
  overlayRef: MutableRefObject<HTMLElement | null>
  itemRefs: MutableRefObject<Array<HTMLAnchorElement | null>>
  onCloseComplete: () => void
  reducedMotion: boolean
}

export function useMenuMotion({
  isOpen,
  isReady,
  itemRefs,
  onCloseComplete,
  overlayRef,
  panelRef,
  reducedMotion,
}: UseMenuMotionOptions) {
  useGsapContext(
    () => {
      if (!isReady || reducedMotion || !panelRef.current || !overlayRef.current) {
        return
      }

      const panel = panelRef.current
      const overlay = overlayRef.current
      const items = itemRefs.current.filter(Boolean)
      const mm = createMotionMedia()

      mm.add('(min-width: 0px)', () => {
        gsap.killTweensOf([panel, overlay, ...items])

        if (isOpen) {
          gsap.set(panel, { autoAlpha: 1 })
          gsap.set(overlay, { autoAlpha: 1 })

          const timeline = gsap.timeline()
          timeline
            .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22, ease: 'power1.out' }, 0)
            .fromTo(
              panel,
              { autoAlpha: 0, xPercent: 6 },
              { autoAlpha: 1, xPercent: 0, duration: 0.34, ease: 'power3.out' },
              0,
            )
            .fromTo(
              items,
              { autoAlpha: 0, y: 18 },
              { autoAlpha: 1, y: 0, duration: 0.28, ease: 'power3.out', stagger: 0.04 },
              0.06,
            )

          return
        }

        const timeline = gsap.timeline({ onComplete: onCloseComplete })
        timeline
          .to(items, {
            autoAlpha: 0,
            y: -10,
            duration: 0.14,
            ease: 'power2.in',
            stagger: { each: 0.02, from: 'end' },
          })
          .to(panel, { autoAlpha: 0, xPercent: 4, duration: 0.2, ease: 'power2.inOut' }, 0)
          .to(overlay, { autoAlpha: 0, duration: 0.18, ease: 'power1.out' }, 0.02)
      })

      return () => {
        mm.revert()
      }
    },
    {
      dependencies: [isOpen, isReady, reducedMotion],
      revertOnUpdate: true,
    },
  )
}
