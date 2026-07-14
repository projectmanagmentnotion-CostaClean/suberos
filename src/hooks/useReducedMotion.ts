import { useMotionPreferences } from '../motion/hooks/useMotionPreferences'

export function useReducedMotion() {
  return useMotionPreferences().reducedMotion
}
