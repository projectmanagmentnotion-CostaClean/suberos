import { FrameSequenceCache } from './FrameSequenceCache'
import { FrameSequenceLoader } from './FrameSequenceLoader'
import {
  createSequenceFrameKey,
  detectSequenceProfile,
  getFrameIndexFromProgress,
  getFrameSetByProfile,
  getSequenceCacheLimit,
  getSequenceConcurrency,
  getSequenceDprCap,
} from './sequence.utils'
import type {
  FrameSequenceControllerState,
  FrameSequenceEnvironment,
  FrameSequenceManifest,
  SequenceFrameSet,
} from './sequence.types'

type ControllerListener = () => void

const idleState: FrameSequenceControllerState = {
  activeProfile: null,
  cacheFrames: 0,
  canvasActive: false,
  currentFrame: 0,
  dprCap: 1,
  error: null,
  loadedFrames: 0,
  memoryBytes: 0,
  pageVisible: true,
  paused: false,
  phase: 'idle',
  renderCount: 0,
  sceneVisible: true,
  totalFrames: 0,
  usingFallback: true,
  viewportHeight: 0,
  viewportWidth: 0,
}

export class FrameSequenceController {
  private activeSet: SequenceFrameSet | null = null
  private cache = new FrameSequenceCache(0)
  private environment: FrameSequenceEnvironment = {
    motionProfile: 'balanced',
    reducedMotion: false,
    viewportHeight: 0,
    viewportWidth: 0,
  }
  private listeners = new Set<ControllerListener>()
  private loader: FrameSequenceLoader | null = null
  private manifest: FrameSequenceManifest | null = null
  private state: FrameSequenceControllerState = { ...idleState }

  configure(manifest: FrameSequenceManifest, environment: FrameSequenceEnvironment) {
    this.manifest = manifest
    this.environment = environment

    const nextProfile = detectSequenceProfile(environment, manifest)
    const nextSet = getFrameSetByProfile(manifest, nextProfile)
    const shouldFallback = environment.reducedMotion && manifest.reducedMotionDisabled
    const setChanged = nextSet?.profile !== this.activeSet?.profile

    if (!nextSet || shouldFallback) {
      this.loader?.dispose()
      this.loader = null
      this.activeSet = null
      this.cache.setMaxEntries(0)
      this.state = {
        ...this.state,
        activeProfile: nextProfile,
        cacheFrames: 0,
        canvasActive: false,
        currentFrame: 0,
        dprCap: 1,
        error: null,
        loadedFrames: 0,
        memoryBytes: 0,
        phase: 'fallback',
        totalFrames: 0,
        usingFallback: true,
        viewportHeight: environment.viewportHeight,
        viewportWidth: environment.viewportWidth,
      }
      this.emit()
      return
    }

    const maxEntries = getSequenceCacheLimit(nextSet.profile, environment.motionProfile)
    const maxConcurrency = getSequenceConcurrency(nextSet.profile, environment.motionProfile)

    this.cache.setMaxEntries(maxEntries)

    if (setChanged || !this.loader) {
      this.loader?.dispose()
      this.activeSet = nextSet
      this.loader = new FrameSequenceLoader({
        cache: this.cache,
        manifest,
        maxConcurrency,
        onUpdate: ({ error }) => {
          if (!error) {
            return
          }

          this.state = {
            ...this.state,
            canvasActive: false,
            error,
            phase: 'error',
            usingFallback: true,
          }
          this.syncStats()
          this.emit()
        },
        retryLimit: 1,
        set: nextSet,
      })
      this.state = {
        ...this.state,
        currentFrame: nextSet.startIndex,
        renderCount: 0,
      }
    } else {
      this.loader.setConcurrency(maxConcurrency)
    }

    this.state = {
      ...this.state,
      activeProfile: nextSet.profile,
      canvasActive: !this.state.paused,
      dprCap: getSequenceDprCap(nextSet.profile, environment.motionProfile),
      error: null,
      phase: 'poster',
      totalFrames: nextSet.frameCount,
      usingFallback: false,
      viewportHeight: environment.viewportHeight,
      viewportWidth: environment.viewportWidth,
    }
    this.syncStats()
    this.emit()
    this.ensureFrame(this.state.currentFrame)
  }

  dispose() {
    this.loader?.dispose()
    this.loader = null
    this.activeSet = null
    this.cache.clear()
    this.listeners.clear()
    this.state = { ...idleState }
  }

  getCurrentFrameResource() {
    if (!this.manifest || !this.activeSet) {
      return null
    }

    const key = createSequenceFrameKey(this.manifest.id, this.activeSet.profile, this.state.currentFrame)
    return this.cache.get(key)
  }

  getSnapshot = () => this.state

  incrementRenderCount() {
    this.state = {
      ...this.state,
      renderCount: this.state.renderCount + 1,
    }
    this.emit()
  }

  setPageVisible(visible: boolean) {
    this.state = {
      ...this.state,
      pageVisible: visible,
    }

    if (!visible) {
      this.loader?.abortNonCritical([this.state.currentFrame])
    } else {
      this.ensureFrame(this.state.currentFrame)
    }

    this.emit()
  }

  setPaused(paused: boolean) {
    this.state = {
      ...this.state,
      canvasActive: !paused && !this.state.usingFallback,
      paused,
    }
    this.emit()
  }

  setProgress(progress: number) {
    if (!this.activeSet || !this.loader || this.state.paused || this.state.phase === 'fallback') {
      return
    }

    const nextFrame = getFrameIndexFromProgress(this.activeSet, progress, this.manifest?.loop ?? false)

    if (nextFrame === this.state.currentFrame) {
      return
    }

    this.state = {
      ...this.state,
      currentFrame: nextFrame,
      phase: this.state.phase === 'ready' ? 'ready' : 'loading',
    }
    this.emit()
    this.ensureFrame(nextFrame)
  }

  setSceneVisible(visible: boolean) {
    this.state = {
      ...this.state,
      sceneVisible: visible,
    }

    if (!visible) {
      this.loader?.abortNonCritical([this.state.currentFrame])
    } else {
      this.ensureFrame(this.state.currentFrame)
    }

    this.emit()
  }

  subscribe = (listener: ControllerListener) => {
    this.listeners.add(listener)

    return () => {
      this.listeners.delete(listener)
    }
  }

  private emit() {
    for (const listener of this.listeners) {
      listener()
    }
  }

  private ensureFrame(frameIndex: number) {
    if (!this.loader || !this.activeSet || !this.manifest) {
      return
    }

    if (!this.state.pageVisible || !this.state.sceneVisible || this.state.paused) {
      return
    }

    this.state = {
      ...this.state,
      phase: this.state.phase === 'ready' ? 'ready' : 'loading',
    }
    this.emit()

    void this.loader
      .ensureFrame(frameIndex, 0)
      .then(() => {
        this.loader?.warmWindow(frameIndex)
        this.state = {
          ...this.state,
          canvasActive: true,
          error: null,
          phase: 'ready',
          usingFallback: false,
        }
        this.syncStats()
        this.emit()
      })
      .catch(() => {
        this.state = {
          ...this.state,
          canvasActive: false,
          phase: 'error',
          usingFallback: true,
        }
        this.syncStats()
        this.emit()
      })
  }

  private syncStats() {
    if (!this.loader) {
      this.state = {
        ...this.state,
        cacheFrames: 0,
        loadedFrames: 0,
        memoryBytes: 0,
      }
      return
    }

    const stats = this.cache.getStats(this.loader.getCachePrefix())

    this.state = {
      ...this.state,
      cacheFrames: stats.entries,
      loadedFrames: stats.entries,
      memoryBytes: stats.totalBytes,
    }
  }
}
