import Lenis from 'lenis'

import { MotionPreferences } from '../types/motion.types'
import { refreshManager } from './refreshManager'
import { gsap, ScrollTrigger } from './registerGsap'

class ScrollEngine {
  private enabled = false
  private lenis: Lenis | null = null
  private tickerHandler: ((time: number) => void) | null = null
  private visibilityHandler: (() => void) | null = null

  private getDuration(preferences: MotionPreferences) {
    return preferences.profile === 'full' ? 1.05 : 0.9
  }

  start(preferences: MotionPreferences) {
    if (preferences.reducedMotion) {
      this.destroy()
      return
    }

    if (this.lenis) {
      this.update(preferences)
      return
    }

    this.lenis = new Lenis({
      autoRaf: false,
      duration: this.getDuration(preferences),
      smoothWheel: true,
      syncTouch: false,
    })
    this.enabled = true

    this.tickerHandler = (timeInSeconds: number) => {
      this.lenis?.raf(timeInSeconds * 1000)
    }

    this.lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(this.tickerHandler)
    gsap.ticker.lagSmoothing(0)

    this.visibilityHandler = () => {
      if (!this.lenis) {
        return
      }

      if (document.hidden) {
        this.lenis.stop()
        return
      }

      this.lenis.start()
      refreshManager.requestRefresh('visibility-return')
    }

    document.addEventListener('visibilitychange', this.visibilityHandler)
    refreshManager.requestRefresh('scroll-engine')
  }

  update(preferences: MotionPreferences) {
    if (preferences.reducedMotion) {
      this.destroy()
      return
    }

    if (!this.lenis) {
      this.start(preferences)
      return
    }

    this.lenis.options.duration = this.getDuration(preferences)
  }

  destroy() {
    this.enabled = false

    if (this.lenis) {
      this.lenis.off('scroll', ScrollTrigger.update)
      this.lenis.destroy()
      this.lenis = null
    }

    if (this.tickerHandler) {
      gsap.ticker.remove(this.tickerHandler)
      this.tickerHandler = null
    }

    if (this.visibilityHandler) {
      document.removeEventListener('visibilitychange', this.visibilityHandler)
      this.visibilityHandler = null
    }
  }

  getInstance() {
    return this.lenis
  }

  isActive() {
    return this.enabled && Boolean(this.lenis)
  }
}

export const scrollEngine = new ScrollEngine()
