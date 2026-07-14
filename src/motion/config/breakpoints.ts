export const motionBreakpoints = {
  desktop: 1024,
  mobile: 0,
  tablet: 640,
} as const

export const motionMediaQueries = {
  coarsePointer: '(pointer: coarse)',
  desktop: `(min-width: ${motionBreakpoints.desktop}px)`,
  finePointer: '(pointer: fine)',
  mobile: `(max-width: ${motionBreakpoints.tablet - 1}px)`,
  reduced: '(prefers-reduced-motion: reduce)',
  tablet: `(min-width: ${motionBreakpoints.tablet}px) and (max-width: ${motionBreakpoints.desktop - 1}px)`,
} as const
