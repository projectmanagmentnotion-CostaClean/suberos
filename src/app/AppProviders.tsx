import { PropsWithChildren, useEffect } from 'react'

import { useLenisScroll } from '../hooks/useLenisScroll'
import { refreshManager } from '../motion/core/refreshManager'
import { MotionPreferencesProvider } from '../motion/hooks/MotionPreferencesProvider'
import { useMotionPreferences } from '../motion/hooks/useMotionPreferences'

function MotionRuntimeProvider({ children }: PropsWithChildren) {
  const preferences = useMotionPreferences()

  useLenisScroll({ preferences })

  useEffect(() => {
    refreshManager.attach()

    return () => {
      refreshManager.detach()
    }
  }, [])

  return <>{children}</>
}

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <MotionPreferencesProvider>
      <MotionRuntimeProvider>{children}</MotionRuntimeProvider>
    </MotionPreferencesProvider>
  )
}
