import { MotionBreakpoint, ResponsiveValue } from '../types/motion.types'

export function getResponsiveValue<T>(value: ResponsiveValue<T> | T, breakpoint: MotionBreakpoint) {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const responsiveValue = value as ResponsiveValue<T>
    return responsiveValue[breakpoint] ?? responsiveValue.tablet ?? responsiveValue.mobile ?? responsiveValue.desktop
  }

  return value as T
}
