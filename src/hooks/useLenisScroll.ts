import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

type UseLenisScrollOptions = {
  enabled: boolean
}

export function useLenisScroll({ enabled }: UseLenisScrollOptions) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const lenis = new Lenis({
      autoRaf: false,
      duration: 1.05,
      smoothWheel: true,
      syncTouch: false,
    })

    const updateScroll = (timeInSeconds: number) => {
      lenis.raf(timeInSeconds * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(updateScroll)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.off('scroll', ScrollTrigger.update)
      gsap.ticker.remove(updateScroll)
      lenis.destroy()
    }
  }, [enabled])
}
