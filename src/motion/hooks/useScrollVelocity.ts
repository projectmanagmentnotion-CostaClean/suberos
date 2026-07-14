import { RefObject, useEffect, useState } from 'react'

import { motionConfig } from '../config/motionConfig'
import { clampProgress } from '../utilities/clampProgress'
import { useMotionPreferences } from './useMotionPreferences'

type ScrollVelocityState = {
  direction: 'down' | 'idle' | 'up'
  velocity: number
}

export function useScrollVelocity(ref?: RefObject<HTMLElement | null>) {
  const preferences = useMotionPreferences()
  const [state, setState] = useState<ScrollVelocityState>({
    direction: 'idle',
    velocity: 0,
  })

  useEffect(() => {
    if (typeof window === 'undefined' || preferences.profile === 'reduced') {
      setState({
        direction: 'idle',
        velocity: 0,
      })
      return
    }

    let frame: number | null = null
    let lastY = window.scrollY
    let lastTime = performance.now()
    let smoothed = 0
    const element = ref?.current ?? null

    const update = () => {
      const now = performance.now()
      const nextY = window.scrollY
      const deltaY = nextY - lastY
      const deltaTime = Math.max(now - lastTime, 16)
      const rawVelocity = deltaY / deltaTime
      smoothed += (rawVelocity - smoothed) * motionConfig.velocity.smoothing
      const clamped = (clampProgress((smoothed + 1) / 2, 0, 1) * 2 - 1) * motionConfig.velocity.clamp

      setState({
        direction: clamped > 0.12 ? 'down' : clamped < -0.12 ? 'up' : 'idle',
        velocity: Number(clamped.toFixed(2)),
      })

      if (element) {
        element.style.setProperty('--motion-velocity', `${clamped}`)
      }

      lastY = nextY
      lastTime = now
      frame = null
    }

    const onScroll = () => {
      if (frame !== null) {
        return
      }

      frame = window.requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame !== null) {
        window.cancelAnimationFrame(frame)
      }
      if (element) {
        element.style.removeProperty('--motion-velocity')
      }
    }
  }, [preferences.profile, ref])

  return state
}
