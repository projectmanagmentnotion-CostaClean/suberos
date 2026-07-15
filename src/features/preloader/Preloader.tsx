import { useEffect, useMemo, useRef } from 'react'

import { isolateElements } from '../../lib/accessibility/isolateElements'
import { refreshManager } from '../../motion/core/refreshManager'
import { gsap } from '../../motion/core/registerGsap'
import { useGsapContext } from '../../motion/hooks/useGsapContext'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import { PreloaderLogo } from './PreloaderLogo'
import { PreloaderProgress } from './PreloaderProgress'
import { CriticalAsset } from './preloader.types'
import { usePreloader } from './usePreloader'
import './preloader.css'

type PreloaderProps = {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const preferences = useMotionPreferences()
  const rootRef = useRef<HTMLDivElement | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const logoRef = useRef<HTMLDivElement | null>(null)
  const sheenRef = useRef<HTMLDivElement | null>(null)
  const exitStartedRef = useRef(false)

  const assets = useMemo<CriticalAsset[]>(
    () => [
      {
        id: 'hero-visual',
        kind: 'image',
        src:
          typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('asset-fail') === '1'
            ? '/branding/suberos-logo-symbol-missing.webp'
            : '/branding/suberos-logo-symbol.webp',
      },
    ],
    [],
  )

  const preloader = usePreloader({
    assets,
    preferences,
  })
  const { displayProgress, failedAssetIds, forced, markComplete, phase, resolvedBy } = preloader

  useEffect(() => {
    if (phase === 'skipped' || phase === 'complete') {
      onComplete()
    }
  }, [onComplete, phase])

  useEffect(() => {
    if (!rootRef.current || phase === 'skipped' || phase === 'complete') {
      return
    }

    const main = document.querySelector<HTMLElement>('#main-content')
    const mainSiblings = main
      ? Array.from(main.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement && child !== rootRef.current,
        )
      : []

    const releaseIsolation = isolateElements([
      document.querySelector<HTMLElement>('[data-site-header]'),
      document.querySelector<HTMLElement>('[data-site-footer]'),
      ...mainSiblings,
    ])

    rootRef.current.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        event.preventDefault()
        rootRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      releaseIsolation()
    }
  }, [phase])

  useGsapContext(
    () => {
      const header = document.querySelector<HTMLElement>('[data-site-header]')

      if (header) {
        gsap.set(header, {
          autoAlpha: 0,
          pointerEvents: 'none',
          y: -16,
        })
      }

      if (phase !== 'loading' || !logoRef.current || !sheenRef.current) {
        return
      }

      const timeline = gsap.timeline({
        repeat: -1,
        repeatDelay: preferences.profile === 'full' ? 0.18 : 0.3,
      })

      timeline
        .fromTo(
          logoRef.current,
          { autoAlpha: 0, scale: 0.94, yPercent: 4 },
          { autoAlpha: 1, duration: 0.42, ease: 'power2.out', scale: 1, yPercent: 0 },
          0,
        )
        .to(
          sheenRef.current,
          {
            duration: preferences.profile === 'full' ? 1.05 : 0.82,
            ease: 'power2.inOut',
            xPercent: 160,
          },
          0.12,
        )
        .set(sheenRef.current, { xPercent: -60 })

      return () => {
        timeline.kill()
      }
    },
    {
      dependencies: [phase, preferences.profile],
      revertOnUpdate: true,
    },
  )

  useEffect(() => {
    if (
      exitStartedRef.current ||
      !resolvedBy ||
      displayProgress < 1 ||
      !rootRef.current ||
      !panelRef.current ||
      !logoRef.current
    ) {
      return
    }

    exitStartedRef.current = true

    const header = document.querySelector<HTMLElement>('[data-site-header]')

    if (preferences.profile === 'reduced') {
      const reducedTimeline = gsap.timeline({
        defaults: {
          ease: 'power2.out',
        },
        onComplete: () => {
          refreshManager.requestRefresh('preloader-finish')
          markComplete()
          onComplete()
        },
      })

      if (header) {
        reducedTimeline.to(
          header,
          {
            autoAlpha: 1,
            duration: 0.18,
            pointerEvents: 'auto',
            y: 0,
          },
          0,
        )
      }

      reducedTimeline.to(
        rootRef.current,
        {
          autoAlpha: 0,
          duration: 0.22,
        },
        0,
      )

      return () => {
        reducedTimeline.kill()
      }
    }

    const timeline = gsap.timeline({
      defaults: {
        ease: preferences.profile === 'full' ? 'power3.inOut' : 'power2.inOut',
      },
      onComplete: () => {
        refreshManager.requestRefresh('preloader-finish')
        markComplete()
        onComplete()
      },
    })

    timeline
      .to(
        panelRef.current,
        {
          clipPath: 'inset(0 0 100% 0 round 0)',
          duration: preferences.profile === 'full' ? 0.96 : 0.74,
        },
        0.12,
      )
      .to(
        logoRef.current,
        {
          autoAlpha: 0,
          duration: 0.26,
        },
        0.18,
      )
      .to(
        rootRef.current,
        {
          autoAlpha: 0,
          duration: preferences.profile === 'full' ? 0.28 : 0.22,
        },
        0.52,
      )

    if (header) {
      timeline.to(
        header,
        {
          autoAlpha: 1,
          duration: 0.24,
          pointerEvents: 'auto',
          y: 0,
        },
        0.64,
      )
    }

    return () => {
      timeline.kill()
    }
  }, [displayProgress, markComplete, onComplete, preferences.profile, resolvedBy])

  if (phase === 'skipped' || phase === 'complete') {
    return null
  }

  return (
    <div
      aria-describedby="preloader-assistive"
      aria-labelledby="preloader-title"
      aria-modal="true"
      className="preloader"
      data-phase={phase}
      data-preloader-root=""
      ref={rootRef}
      role="dialog"
      tabIndex={-1}
    >
      <div className="preloader__backdrop" />
      <div className="preloader__grain" />
      <div className="preloader__panel" ref={panelRef}>
        <div className="preloader__header">
          <h2 className="sr-only" id="preloader-title">
            Carga inicial de SUBEROS
          </h2>
          <span className="preloader__eyebrow">
            {preferences.profile === 'full'
              ? 'Sesion inicial / experiencia completa'
              : preferences.profile === 'balanced'
                ? 'Sesion inicial / vista agil'
                : 'Sesion inicial / reduced'}
          </span>
          <span className="preloader__hint">{forced ? 'QA / forced preload' : 'Critical assets loading'}</span>
        </div>

        <div className="preloader__center">
          <div ref={logoRef}>
            <PreloaderLogo className="preloader__logo" />
            <div className="preloader__sheen" ref={sheenRef} />
          </div>
          <PreloaderProgress progress={displayProgress} />
        </div>

        <div className="preloader__footer">
          <span className="preloader__hint">
            {failedAssetIds.length ? `Fallback ready / ${failedAssetIds.length} asset error` : 'Hero visual ready for first paint'}
          </span>
          <span className="preloader__eyebrow">
            {resolvedBy === 'timeout'
              ? 'Safety timeout resolved'
              : resolvedBy === 'assets-ready'
                ? 'Assets ready'
                : 'Preparing entry'}
          </span>
        </div>
      </div>
      <span className="preloader__assistive" id="preloader-assistive">
        Cargando activos criticos de la primera vista.
      </span>
    </div>
  )
}
