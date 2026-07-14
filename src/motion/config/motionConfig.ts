import { motionBreakpoints, motionMediaQueries } from './breakpoints'
import { motionDurations } from './durations'
import { motionEasings } from './easings'

export const motionConfig = {
  breakpoints: motionBreakpoints,
  durations: motionDurations,
  easings: motionEasings,
  mediaQueries: motionMediaQueries,
  parallax: {
    balancedDistance: 36,
    fullDistance: 72,
  },
  pinned: {
    defaultEnd: '+=120%',
    mobileFallbackEnd: '+=40%',
  },
  reveal: {
    balancedDistance: 28,
    fullDistance: 48,
    stagger: 0.08,
  },
  scroll: {
    desktopDuration: 1.05,
    mobileDuration: 0.9,
    refreshDebounceMs: 96,
  },
  velocity: {
    clamp: 12,
    smoothing: 0.18,
  },
} as const
