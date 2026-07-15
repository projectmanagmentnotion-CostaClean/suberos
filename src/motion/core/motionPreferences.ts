import { motionBreakpoints } from '../config/breakpoints'
import { MotionPreferences } from '../types/motion.types'
import { isQaStaticMode } from '../../lib/qa/qaRuntime'

function getSearchParams() {
  return new URLSearchParams(window.location.search)
}

function getPointerType() {
  return window.matchMedia('(pointer: coarse)').matches ? 'coarse' : 'fine'
}

function getViewport() {
  return {
    height: window.innerHeight,
    width: window.innerWidth,
  }
}

export function readMotionPreferencesSnapshot(): MotionPreferences {
  if (typeof window === 'undefined') {
    return {
      debugMarkers: false,
      isTouchDevice: false,
      pointer: 'fine',
      prefersReducedMotion: true,
      profile: 'reduced',
      qaStatic: false,
      qaReducedMotion: false,
      reducedMotion: true,
      viewport: {
        height: 0,
        width: 0,
      },
    }
  }

  const params = getSearchParams()
  const qaStatic = isQaStaticMode()
  const qaReducedMotion = params.get('reduced-motion') === '1'
  const debugMarkers = import.meta.env.DEV && params.get('motion-debug') === '1'
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const viewport = getViewport()
  const pointer = getPointerType()
  const isTouchDevice =
    window.matchMedia('(hover: none)').matches ||
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window
  const reducedMotion = qaStatic || qaReducedMotion || prefersReducedMotion

  let profile: MotionPreferences['profile'] = 'balanced'

  if (reducedMotion) {
    profile = 'reduced'
  } else if (viewport.width >= motionBreakpoints.desktop && pointer === 'fine' && !isTouchDevice) {
    profile = 'full'
  }

  return {
    debugMarkers,
    isTouchDevice,
    pointer,
    prefersReducedMotion,
    profile,
    qaStatic,
    qaReducedMotion,
    reducedMotion,
    viewport,
  }
}
