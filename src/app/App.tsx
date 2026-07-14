import { lazy, Suspense } from 'react'

import { HomeExperience } from '../features/home/HomeExperience'
import { AppShell } from './AppShell'

const PortfolioLabPage = lazy(() =>
  import('../features/portfolio-lab/PortfolioLabPage').then((module) => ({
    default: module.PortfolioLabPage,
  })),
)

const MotionLabPage = lazy(() =>
  import('../features/motion-lab/MotionLabPage').then((module) => ({
    default: module.MotionLabPage,
  })),
)

function getAppMode() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const params = new URLSearchParams(window.location.search)

  if (params.get('portfolio-lab') === '1') {
    return 'portfolio-lab'
  }

  if (params.get('motion-lab') === '1') {
    return 'motion-lab'
  }

  return 'home'
}

export function App() {
  const appMode = getAppMode()

  return (
    <AppShell>
      {appMode === 'motion-lab' ? (
        <Suspense fallback={null}>
          <MotionLabPage />
        </Suspense>
      ) : appMode === 'portfolio-lab' ? (
        <Suspense fallback={null}>
          <PortfolioLabPage />
        </Suspense>
      ) : (
        <HomeExperience />
      )}
    </AppShell>
  )
}
