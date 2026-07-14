import type { MotionProfile } from '../types/motion.types'
import type {
  FrameSequenceManifest,
  FrameSequenceEnvironment,
  SequenceFrameSet,
  SequenceProfile,
} from './sequence.types'

const sequenceProfileOrder: SequenceProfile[] = ['desktop', 'tablet', 'mobile']

export function clampSequenceProgress(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function buildSequenceFramePath(set: SequenceFrameSet, index: number) {
  const frameNumber = String(index).padStart(4, '0')

  return `${set.basePath}/${set.filenamePattern.replace('{index}', frameNumber)}.${set.extension}`
}

export function createSequenceFrameKey(manifestId: string, profile: SequenceProfile, index: number) {
  return `${manifestId}:${profile}:${index}`
}

export function detectSequenceProfile(environment: FrameSequenceEnvironment, manifest: FrameSequenceManifest): SequenceProfile | null {
  if (environment.reducedMotion) {
    return null
  }

  const availableProfiles = new Set(manifest.sets.map((set) => set.profile))
  const width = environment.viewportWidth

  if (environment.motionProfile === 'full') {
    if (width >= 1024 && availableProfiles.has('desktop')) {
      return 'desktop'
    }

    if (width >= 640 && availableProfiles.has('tablet')) {
      return 'tablet'
    }

    return availableProfiles.has('mobile') ? 'mobile' : getFirstAvailableProfile(manifest)
  }

  if (width >= 1024 && availableProfiles.has('tablet')) {
    return 'tablet'
  }

  if (width >= 640 && availableProfiles.has('tablet')) {
    return 'tablet'
  }

  if (availableProfiles.has('mobile')) {
    return 'mobile'
  }

  return getFirstAvailableProfile(manifest)
}

export function getFirstAvailableProfile(manifest: FrameSequenceManifest) {
  for (const profile of sequenceProfileOrder) {
    const set = manifest.sets.find((item) => item.profile === profile)

    if (set) {
      return set.profile
    }
  }

  return null
}

export function getFrameSetByProfile(manifest: FrameSequenceManifest, profile: SequenceProfile | null) {
  if (!profile) {
    return null
  }

  return manifest.sets.find((set) => set.profile === profile) ?? null
}

export function getFrameIndexFromProgress(set: SequenceFrameSet, progress: number, loop = false) {
  const normalized = clampSequenceProgress(progress)
  const offset = Math.round(normalized * Math.max(set.frameCount - 1, 0))
  const nextIndex = set.startIndex + offset

  if (!loop) {
    return nextIndex
  }

  const maxIndex = set.startIndex + set.frameCount - 1
  return nextIndex > maxIndex ? set.startIndex : nextIndex
}

export function getPreloadIndices(set: SequenceFrameSet, currentIndex: number, radius: number, priorityFrames: number[]) {
  const indices = new Set<number>()
  const min = set.startIndex
  const max = set.startIndex + set.frameCount - 1

  for (const frame of priorityFrames) {
    if (frame >= min && frame <= max) {
      indices.add(frame)
    }
  }

  for (let index = currentIndex - radius; index <= currentIndex + radius; index += 1) {
    if (index >= min && index <= max) {
      indices.add(index)
    }
  }

  indices.add(currentIndex)

  return Array.from(indices).sort((left, right) => Math.abs(left - currentIndex) - Math.abs(right - currentIndex))
}

export function getSequenceCacheLimit(profile: SequenceProfile | null, motionProfile: MotionProfile) {
  if (!profile || motionProfile === 'reduced') {
    return 0
  }

  if (profile === 'desktop' && motionProfile === 'full') {
    return 18
  }

  if (profile === 'tablet') {
    return 12
  }

  return 8
}

export function getSequenceConcurrency(profile: SequenceProfile | null, motionProfile: MotionProfile) {
  if (!profile || motionProfile === 'reduced') {
    return 0
  }

  if (profile === 'desktop' && motionProfile === 'full') {
    return 4
  }

  return 2
}

export function getSequenceDprCap(profile: SequenceProfile | null, motionProfile: MotionProfile) {
  if (!profile || motionProfile === 'reduced') {
    return 1
  }

  if (profile === 'desktop' && motionProfile === 'full') {
    return 2
  }

  return 1.5
}

export function isLocalSequencePath(path: string) {
  return path.startsWith('/')
}
