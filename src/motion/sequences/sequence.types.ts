import type { MotionProfile } from '../types/motion.types'

export type SequenceProfile = 'desktop' | 'tablet' | 'mobile'

export type SequenceExtension = 'avif' | 'webp' | 'jpg' | 'png'

export interface SequenceFrameSet {
  profile: SequenceProfile
  basePath: string
  frameCount: number
  startIndex: number
  filenamePattern: string
  extension: SequenceExtension
  width: number
  height: number
  estimatedTotalBytes?: number
}

export interface FrameSequenceManifest {
  id: string
  title: string
  poster: string
  fallbackImage: string
  aspectRatio: number
  sets: SequenceFrameSet[]
  preloadRadius: number
  priorityFrames: number[]
  loop?: boolean
  reducedMotionDisabled: boolean
  ownershipConfirmed: boolean
  publicationApproved: boolean
}

export type SequenceFrameResourceType = 'bitmap' | 'image'

export type SequenceFrameResource = {
  bytes: number
  height: number
  index: number
  key: string
  resource: HTMLImageElement | ImageBitmap
  type: SequenceFrameResourceType
  width: number
}

export type FrameSequencePhase = 'idle' | 'poster' | 'loading' | 'ready' | 'fallback' | 'error'

export type FrameSequenceControllerState = {
  activeProfile: SequenceProfile | null
  cacheFrames: number
  canvasActive: boolean
  currentFrame: number
  dprCap: number
  error: string | null
  loadedFrames: number
  memoryBytes: number
  pageVisible: boolean
  paused: boolean
  phase: FrameSequencePhase
  renderCount: number
  sceneVisible: boolean
  totalFrames: number
  usingFallback: boolean
  viewportHeight: number
  viewportWidth: number
}

export type FrameSequenceEnvironment = {
  motionProfile: MotionProfile
  reducedMotion: boolean
  viewportHeight: number
  viewportWidth: number
}

export type FrameSequenceCacheStats = {
  entries: number
  totalBytes: number
}
