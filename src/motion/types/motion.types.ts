import type gsap from 'gsap'
import type { ScrollTrigger } from 'gsap/ScrollTrigger'

export type MotionProfile = 'full' | 'balanced' | 'reduced'
export type MotionBreakpoint = 'desktop' | 'tablet' | 'mobile'

export type MotionPreferences = {
  debugMarkers: boolean
  isTouchDevice: boolean
  pointer: 'coarse' | 'fine'
  prefersReducedMotion: boolean
  profile: MotionProfile
  qaReducedMotion: boolean
  reducedMotion: boolean
  viewport: {
    height: number
    width: number
  }
}

export type SceneCleanup = () => void

export type MotionSceneOptions = {
  debugLabel?: string
  end?: string
  id?: string
  invalidateOnRefresh?: boolean
  pin?: boolean
  scrub?: boolean | number
  start?: string
  trigger?: Element | string | null
}

export type MotionSceneContext = {
  breakpoint: MotionBreakpoint
  gsap: typeof gsap
  preferences: MotionPreferences
  profile: MotionProfile
  scope: HTMLElement
  ScrollTrigger: typeof ScrollTrigger
}

export type ResponsiveValue<T> = {
  desktop?: T
  mobile?: T
  tablet?: T
}
