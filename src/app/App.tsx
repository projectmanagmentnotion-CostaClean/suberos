import { lazy, Suspense, useMemo } from 'react'

import { LegalPage } from '../features/legal/LegalPage'
import { HomeExperience } from '../features/home/HomeExperience'
import { NotFoundPage } from '../features/not-found/NotFoundPage'
import { getRouteMetadata } from '../data/seoPageMetadata'
import { isQaStaticMode } from '../lib/qa/qaRuntime'
import { useDocumentMetadata } from '../lib/seo/useDocumentMetadata'
import { AppShell } from './AppShell'
import { getAppRoute } from './routes'

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

const SequenceLabPage = lazy(() =>
  import('../features/sequence-lab/SequenceLabPage').then((module) => ({
    default: module.SequenceLabPage,
  })),
)

export function App() {
  const route = typeof window === 'undefined' ? getAppRoute({ pathname: '/', search: '' }) : getAppRoute(window.location)
  const metadata = useMemo(() => {
    const nextMetadata = getRouteMetadata(route)

    if (typeof window !== 'undefined' && isQaStaticMode()) {
      return {
        ...nextMetadata,
        canonicalUrl: null,
        ogUrl: null,
        jsonLd: null,
        robots: 'noindex,nofollow',
      }
    }

    return nextMetadata
  }, [route])

  useDocumentMetadata(metadata)

  return (
    <AppShell>
      {route.kind === 'motion-lab' ? (
        <Suspense fallback={null}>
          <MotionLabPage />
        </Suspense>
      ) : route.kind === 'sequence-lab' ? (
        <Suspense fallback={null}>
          <SequenceLabPage />
        </Suspense>
      ) : route.kind === 'portfolio-lab' ? (
        <Suspense fallback={null}>
          <PortfolioLabPage />
        </Suspense>
      ) : route.kind === 'legal' ? (
        <LegalPage slug={route.slug} />
      ) : route.kind === 'not-found' ? (
        <NotFoundPage pathname={route.pathname} />
      ) : (
        <HomeExperience />
      )}
    </AppShell>
  )
}
