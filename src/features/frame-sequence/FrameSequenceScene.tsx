import { PropsWithChildren, useEffect, useRef, useSyncExternalStore } from 'react'

import { FrameSequenceController } from '../../motion/sequences/FrameSequenceController'
import { FrameSequenceManifest } from '../../motion/sequences/sequence.types'
import { refreshManager } from '../../motion/core/refreshManager'
import { ScrollTrigger } from '../../motion/core/registerGsap'
import { useGsapContext } from '../../motion/hooks/useGsapContext'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import { cx } from '../../lib/utils/cx'
import { FrameSequenceCanvas } from './FrameSequenceCanvas'
import { FrameSequenceFallback } from './FrameSequenceFallback'
import './frame-sequence.css'

type FrameSequenceSceneProps = PropsWithChildren<{
  className?: string
  controller: FrameSequenceController
  debug?: boolean
  fallbackAlt: string
  fit?: 'contain' | 'cover'
  internalLabel?: string
  manifest: FrameSequenceManifest
  pin?: boolean
  scrub?: number
}>

export function FrameSequenceScene({
  children,
  className,
  controller,
  debug = false,
  fallbackAlt,
  fit = 'cover',
  internalLabel,
  manifest,
  pin = true,
  scrub = 0.35,
}: FrameSequenceSceneProps) {
  const preferences = useMotionPreferences()
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)
  const sceneRef = useRef<HTMLDivElement | null>(null)
  const mediaRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    controller.configure(manifest, {
      motionProfile: preferences.profile,
      reducedMotion: preferences.reducedMotion,
      viewportHeight: preferences.viewport.height,
      viewportWidth: preferences.viewport.width,
    })
  }, [controller, manifest, preferences])

  useEffect(() => {
    if (!mediaRef.current || typeof IntersectionObserver === 'undefined') {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        controller.setSceneVisible(entry?.isIntersecting ?? false)
      },
      {
        rootMargin: '25% 0px',
        threshold: 0.1,
      },
    )

    observer.observe(mediaRef.current)

    return () => {
      observer.disconnect()
      controller.setSceneVisible(false)
    }
  }, [controller])

  useEffect(() => {
    const handleVisibilityChange = () => {
      controller.setPageVisible(!document.hidden)
    }

    handleVisibilityChange()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [controller])

  useGsapContext(
    () => {
      if (!sceneRef.current || preferences.reducedMotion) {
        controller.setProgress(0)
        return
      }

      const shouldPin = pin && preferences.profile === 'full' && preferences.viewport.width >= 1024
      const trigger = preferences.profile === 'full' ? sceneRef.current : mediaRef.current ?? sceneRef.current
      const instance = ScrollTrigger.create({
        end: shouldPin ? '+=140%' : 'bottom top',
        id: `${manifest.id}-sequence`,
        invalidateOnRefresh: true,
        onEnter: () => controller.setSceneVisible(true),
        onEnterBack: () => controller.setSceneVisible(true),
        onLeave: () => controller.setSceneVisible(false),
        onLeaveBack: () => controller.setSceneVisible(false),
        onRefresh: (self) => controller.setProgress(self.progress),
        onUpdate: (self) => controller.setProgress(self.progress),
        pin: shouldPin,
        scrub,
        start: 'top top',
        trigger,
      })

      refreshManager.requestRefresh('layout-change')

      return () => {
        instance.kill()
      }
    },
    {
      dependencies: [controller, manifest.id, pin, preferences, scrub],
      revertOnUpdate: true,
    },
  )

  return (
    <div
      className={cx('frame-sequence-scene', className)}
      data-sequence-frame={state.currentFrame}
      data-sequence-phase={state.phase}
      data-sequence-profile={state.activeProfile ?? 'none'}
      data-sequence-total={state.totalFrames}
      ref={sceneRef}
    >
      <div className="frame-sequence-scene__media" data-qa="frame-sequence-media" ref={mediaRef}>
        <FrameSequenceFallback
          alt={fallbackAlt}
          fallbackImage={manifest.fallbackImage}
          poster={manifest.poster}
          title={manifest.title}
          useFallbackImage={state.usingFallback || state.phase === 'error'}
          visible={state.usingFallback || state.phase === 'poster' || state.phase === 'error'}
        />
        <FrameSequenceCanvas controller={controller} fit={fit} />
        {internalLabel ? <div className="frame-sequence-scene__badge">{internalLabel}</div> : null}
      </div>

      <div className="frame-sequence-scene__content">{children}</div>

      {debug ? (
        <div className="frame-sequence-scene__debug" data-qa="sequence-debug">
          <div>
            <span>Phase</span>
            <strong>{state.phase}</strong>
          </div>
          <div>
            <span>Profile</span>
            <strong>{state.activeProfile ?? 'none'}</strong>
          </div>
          <div>
            <span>Frame</span>
            <strong>
              {state.currentFrame} / {state.totalFrames}
            </strong>
          </div>
          <div>
            <span>Loaded</span>
            <strong>
              {state.loadedFrames} / {state.totalFrames}
            </strong>
          </div>
          <div>
            <span>Cache</span>
            <strong>{state.cacheFrames}</strong>
          </div>
          <div>
            <span>Memory</span>
            <strong>{Math.round(state.memoryBytes / 1024)} KB</strong>
          </div>
          <div>
            <span>DPR cap</span>
            <strong>{state.dprCap}</strong>
          </div>
          <div>
            <span>Canvas</span>
            <strong>{state.canvasActive ? 'active' : 'off'}</strong>
          </div>
          <div>
            <span>Fallback</span>
            <strong>{state.usingFallback ? 'yes' : 'no'}</strong>
          </div>
          <div>
            <span>Error</span>
            <strong>{state.error ?? 'none'}</strong>
          </div>
        </div>
      ) : null}
    </div>
  )
}
