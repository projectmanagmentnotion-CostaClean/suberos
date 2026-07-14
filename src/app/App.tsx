import { lazy, Suspense } from 'react'

import { HomeExperience } from '../features/home/HomeExperience'
import { AppShell } from './AppShell'

const MotionLabPage = lazy(() =>
  import('../features/motion-lab/MotionLabPage').then((module) => ({
    default: module.MotionLabPage,
  })),
)

function isMotionLabEnabled() {
  if (typeof window === 'undefined') {
    return false
  }

  return new URLSearchParams(window.location.search).get('motion-lab') === '1'
}

export function App() {
  const motionLabEnabled = isMotionLabEnabled()

  return (
    <AppShell>
      {motionLabEnabled ? (
        <Suspense fallback={null}>
          <MotionLabPage />
        </Suspense>
      ) : (
        <HomeExperience />
      )}
    </AppShell>
  )
}
