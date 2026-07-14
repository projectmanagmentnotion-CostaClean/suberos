import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { MotionPreferences } from '../../motion/types/motion.types'
import { CriticalAsset, PreloaderResolution, PreloaderState } from './preloader.types'

const SESSION_KEY = 'suberos.preloader.seen.v1'
const READINESS_THRESHOLD = 0.985

type UsePreloaderOptions = {
  assets: CriticalAsset[]
  preferences: MotionPreferences
}

function readSearchParams() {
  return new URLSearchParams(window.location.search)
}

function readRuntime(profile: MotionPreferences['profile']) {
  if (typeof window === 'undefined') {
    return {
      assetFail: false,
      forcePreloader: false,
      resetSession: false,
      skipPreloader: true,
    }
  }

  const searchParams = readSearchParams()
  const resetSession = searchParams.get('preloader') === 'reset'

  if (resetSession) {
    window.sessionStorage.removeItem(SESSION_KEY)
  }

  const forcePreloader = searchParams.get('preloader') === '1'
  const sessionSeen = window.sessionStorage.getItem(SESSION_KEY) === '1'

  return {
    assetFail: searchParams.get('asset-fail') === '1',
    forcePreloader,
    resetSession,
    skipPreloader: !forcePreloader && (profile === 'reduced' || sessionSeen),
  }
}

function preloadImage(src: string) {
  return new Promise<void>((resolve, reject) => {
    const image = new Image()

    image.onload = async () => {
      try {
        if ('decode' in image) {
          await image.decode()
        }
      } catch {
        // Ignore decode failures after successful load.
      }
      resolve()
    }
    image.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    image.src = src

    if (image.complete) {
      resolve()
    }
  })
}

function preloadFont(descriptor: string) {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return Promise.resolve()
  }

  return document.fonts.load(descriptor).then(() => undefined)
}

async function preloadAsset(asset: CriticalAsset) {
  if (asset.kind === 'font' && asset.descriptor) {
    await preloadFont(asset.descriptor)
    return
  }

  if (asset.kind === 'image' && asset.src) {
    await preloadImage(asset.src)
  }
}

export function usePreloader({ assets, preferences }: UsePreloaderOptions) {
  const initialRuntime = readRuntime(preferences.profile)
  const [state, setState] = useState<PreloaderState>(() => ({
    displayProgress: initialRuntime.skipPreloader ? 1 : 0,
    failedAssetIds: [],
    forced: initialRuntime.forcePreloader,
    loadedAssets: 0,
    phase: initialRuntime.skipPreloader ? 'skipped' : 'loading',
    resolvedBy: initialRuntime.skipPreloader ? 'session-skip' : null,
    totalAssets: assets.length,
    variant: preferences.profile,
  }))
  const targetProgressRef = useRef(0)
  const settledRef = useRef<PreloaderResolution | null>(null)

  const runtime = useMemo(() => readRuntime(preferences.profile), [preferences.profile])

  useEffect(() => {
    setState((current) => ({
      ...current,
      forced: runtime.forcePreloader,
      phase: runtime.skipPreloader ? 'skipped' : 'loading',
      totalAssets: assets.length,
      variant: preferences.profile,
    }))

    if (runtime.skipPreloader) {
      targetProgressRef.current = 1
      settledRef.current = 'session-skip'
      setState((current) => ({
        ...current,
        displayProgress: 1,
        forced: runtime.forcePreloader,
        phase: 'skipped',
        resolvedBy: 'session-skip',
        totalAssets: assets.length,
        variant: preferences.profile,
      }))
      return
    }

    let cancelled = false
    let loadedAssets = 0
    const failedAssetIds: string[] = []
    const timeoutMs = preferences.profile === 'full' ? 4200 : 3000
    const timeout = window.setTimeout(() => {
      if (cancelled || settledRef.current) {
        return
      }

      settledRef.current = 'timeout'
      targetProgressRef.current = 1
      setState((current) => ({
        ...current,
        failedAssetIds: [...failedAssetIds],
        forced: runtime.forcePreloader,
        loadedAssets,
        resolvedBy: 'timeout',
      }))
      window.sessionStorage.setItem(SESSION_KEY, '1')
    }, timeoutMs)

    targetProgressRef.current = 0
    settledRef.current = null
    setState((current) => ({
      ...current,
      displayProgress: 0,
      failedAssetIds: [],
      forced: runtime.forcePreloader,
      loadedAssets: 0,
      phase: 'loading',
      resolvedBy: null,
      totalAssets: assets.length,
      variant: preferences.profile,
    }))

    const onAssetSettled = (assetId: string, succeeded: boolean) => {
      loadedAssets += 1

      if (!succeeded) {
        failedAssetIds.push(assetId)
      }

      targetProgressRef.current = loadedAssets / Math.max(assets.length, 1)
      setState((current) => ({
        ...current,
        failedAssetIds: [...failedAssetIds],
        forced: runtime.forcePreloader,
        loadedAssets,
      }))

      if (loadedAssets === assets.length && !settledRef.current) {
        settledRef.current = 'assets-ready'
        targetProgressRef.current = 1
        setState((current) => ({
          ...current,
          resolvedBy: 'assets-ready',
        }))
        window.sessionStorage.setItem(SESSION_KEY, '1')
      }
    }

    void Promise.allSettled(
      assets.map(async (asset) => {
        try {
          await preloadAsset(asset)
          if (!cancelled) {
            onAssetSettled(asset.id, true)
          }
        } catch {
          if (!cancelled) {
            onAssetSettled(asset.id, false)
          }
        }
      }),
    ).finally(() => {
      window.clearTimeout(timeout)
    })

    return () => {
      cancelled = true
      window.clearTimeout(timeout)
    }
  }, [assets, preferences.profile, runtime.forcePreloader, runtime.skipPreloader])

  useEffect(() => {
    if (state.phase === 'skipped') {
      return
    }

    const tick = () => {
      setState((current) => {
        const target = targetProgressRef.current
        const delta = target - current.displayProgress
        const nextProgress =
          Math.abs(delta) < 0.01
            ? target
            : current.displayProgress + delta * (preferences.profile === 'full' ? 0.12 : 0.16)

        if (settledRef.current && nextProgress >= READINESS_THRESHOLD && current.phase === 'loading') {
          return {
            ...current,
            displayProgress: 1,
            phase: 'ready',
          }
        }

        return {
          ...current,
          displayProgress: Math.min(nextProgress, 1),
        }
      })
    }

    const interval = window.setInterval(tick, 33)

    return () => {
      window.clearInterval(interval)
    }
  }, [preferences.profile, state.phase])

  const markExiting = useCallback(() => {
    setState((current) => ({
      ...current,
      phase: current.phase === 'ready' ? 'exiting' : current.phase,
    }))
  }, [])

  const markComplete = useCallback(() => {
    setState((current) => ({
      ...current,
      displayProgress: 1,
      phase: 'complete',
    }))
  }, [])

  return {
    ...state,
    assetFailSimulation: runtime.assetFail,
    markComplete,
    markExiting,
    resetSession: runtime.resetSession,
    sessionKey: SESSION_KEY,
  }
}
