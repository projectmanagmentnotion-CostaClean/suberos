import sequenceLabManifestData from './manifests/suberos-sequence-lab.manifest.json'
import { isLocalSequencePath } from './sequence.utils'
import type { FrameSequenceManifest } from './sequence.types'

export function validateSequenceManifest(manifest: FrameSequenceManifest) {
  const errors: string[] = []

  if (!manifest.id.trim()) {
    errors.push('Manifest id is required.')
  }

  if (!isLocalSequencePath(manifest.poster) || !isLocalSequencePath(manifest.fallbackImage)) {
    errors.push(`Manifest "${manifest.id}" must use local poster and fallback paths.`)
  }

  if (!manifest.ownershipConfirmed) {
    errors.push(`Manifest "${manifest.id}" is missing ownership confirmation.`)
  }

  if (manifest.sets.length === 0) {
    errors.push(`Manifest "${manifest.id}" has no frame sets.`)
  }

  for (const set of manifest.sets) {
    if (!isLocalSequencePath(set.basePath)) {
      errors.push(`Manifest "${manifest.id}" contains a non-local base path "${set.basePath}".`)
    }

    if (set.width <= 0 || set.height <= 0 || set.frameCount <= 0) {
      errors.push(`Manifest "${manifest.id}" contains invalid dimensions or frame count in "${set.profile}".`)
    }
  }

  return {
    errors,
    valid: errors.length === 0,
  }
}

export const sequenceLabManifest = sequenceLabManifestData as FrameSequenceManifest

export function getSequenceLabManifest(options: { failFrames?: boolean } = {}) {
  if (!options.failFrames) {
    return sequenceLabManifest
  }

  return {
    ...sequenceLabManifest,
    sets: sequenceLabManifest.sets.map((set) => ({
      ...set,
      basePath: `${set.basePath}-missing`,
    })),
  } satisfies FrameSequenceManifest
}
