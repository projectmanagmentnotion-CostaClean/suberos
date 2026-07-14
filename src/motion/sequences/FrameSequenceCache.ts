import type { FrameSequenceCacheStats, SequenceFrameResource } from './sequence.types'

type CacheEntry = {
  key: string
  value: SequenceFrameResource
}

export class FrameSequenceCache {
  private entries = new Map<string, CacheEntry>()
  private maxEntries: number

  constructor(maxEntries: number) {
    this.maxEntries = Math.max(0, maxEntries)
  }

  clear() {
    for (const entry of this.entries.values()) {
      this.disposeEntry(entry.value)
    }

    this.entries.clear()
  }

  delete(key: string) {
    const entry = this.entries.get(key)

    if (!entry) {
      return
    }

    this.disposeEntry(entry.value)
    this.entries.delete(key)
  }

  get(key: string) {
    const entry = this.entries.get(key)

    if (!entry) {
      return null
    }

    this.entries.delete(key)
    this.entries.set(key, entry)

    return entry.value
  }

  getStats(prefix?: string): FrameSequenceCacheStats {
    let entries = 0
    let totalBytes = 0

    for (const [key, entry] of this.entries) {
      if (prefix && !key.startsWith(prefix)) {
        continue
      }

      entries += 1
      totalBytes += entry.value.bytes
    }

    return { entries, totalBytes }
  }

  has(key: string) {
    return this.entries.has(key)
  }

  pruneToKeys(keepKeys: Set<string>, prefix?: string) {
    for (const [key] of this.entries) {
      if (prefix && !key.startsWith(prefix)) {
        continue
      }

      if (!keepKeys.has(key)) {
        this.delete(key)
      }
    }

    this.enforceLimit()
  }

  set(key: string, value: SequenceFrameResource) {
    if (this.maxEntries === 0) {
      this.disposeEntry(value)
      return
    }

    const existing = this.entries.get(key)

    if (existing) {
      this.disposeEntry(existing.value)
      this.entries.delete(key)
    }

    this.entries.set(key, { key, value })
    this.enforceLimit()
  }

  setMaxEntries(maxEntries: number) {
    this.maxEntries = Math.max(0, maxEntries)
    this.enforceLimit()
  }

  private disposeEntry(entry: SequenceFrameResource) {
    if (entry.type === 'bitmap') {
      ;(entry.resource as ImageBitmap).close()
    }
  }

  private enforceLimit() {
    if (this.maxEntries <= 0) {
      this.clear()
      return
    }

    while (this.entries.size > this.maxEntries) {
      const oldestKey = this.entries.keys().next().value

      if (!oldestKey) {
        break
      }

      this.delete(oldestKey)
    }
  }
}
