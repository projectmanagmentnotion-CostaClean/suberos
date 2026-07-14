import { RefObject } from 'react'

import { registerMotionPlugins, useGSAP } from '../core/registerGsap'

type UseGsapContextOptions = {
  dependencies?: unknown[]
  revertOnUpdate?: boolean
  scope?: RefObject<Element | null> | Element | string
}

export function useGsapContext(callback: () => void | (() => void), options?: UseGsapContextOptions) {
  registerMotionPlugins()

  const normalizedOptions = options
    ? {
        ...options,
        scope: options.scope ?? undefined,
      }
    : undefined

  useGSAP(callback, normalizedOptions)
}
