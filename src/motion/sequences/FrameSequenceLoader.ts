import { FrameSequenceCache } from './FrameSequenceCache'
import { buildSequenceFramePath, createSequenceFrameKey, getPreloadIndices } from './sequence.utils'
import type { FrameSequenceManifest, SequenceFrameResource, SequenceFrameSet, SequenceProfile } from './sequence.types'

type LoaderUpdatePayload = {
  error?: string | null
}

type QueueTask = {
  attempt: number
  index: number
  priority: number
  reject: (reason?: unknown) => void
  resolve: (value: SequenceFrameResource) => void
}

type FrameSequenceLoaderOptions = {
  cache: FrameSequenceCache
  manifest: FrameSequenceManifest
  maxConcurrency: number
  onUpdate?: (payload: LoaderUpdatePayload) => void
  retryLimit?: number
  set: SequenceFrameSet
}

export class FrameSequenceLoader {
  private abortControllers = new Map<number, AbortController>()
  private activeCount = 0
  private cache: FrameSequenceCache
  private disposed = false
  private keyPrefix: string
  private manifest: FrameSequenceManifest
  private maxConcurrency: number
  private onUpdate?: (payload: LoaderUpdatePayload) => void
  private pending = new Map<number, Promise<SequenceFrameResource>>()
  private queue: QueueTask[] = []
  private retryLimit: number
  private set: SequenceFrameSet

  constructor(options: FrameSequenceLoaderOptions) {
    this.cache = options.cache
    this.manifest = options.manifest
    this.maxConcurrency = options.maxConcurrency
    this.onUpdate = options.onUpdate
    this.retryLimit = options.retryLimit ?? 1
    this.set = options.set
    this.keyPrefix = `${options.manifest.id}:${options.set.profile}:`
  }

  abortNonCritical(keepIndices: number[] = []) {
    const keep = new Set(keepIndices)

    this.queue = this.queue.filter((task) => keep.has(task.index))

    for (const [index, controller] of this.abortControllers) {
      if (!keep.has(index)) {
        controller.abort()
        this.abortControllers.delete(index)
      }
    }
  }

  dispose() {
    this.disposed = true
    this.abortNonCritical()
    this.queue = []
    this.pending.clear()
  }

  getCachePrefix() {
    return this.keyPrefix
  }

  getLoadedFrame(index: number) {
    return this.cache.get(createSequenceFrameKey(this.manifest.id, this.set.profile, index))
  }

  setConcurrency(maxConcurrency: number) {
    this.maxConcurrency = Math.max(1, maxConcurrency)
    this.pump()
  }

  warmWindow(currentIndex: number) {
    const frameIndices = getPreloadIndices(
      this.set,
      currentIndex,
      this.manifest.preloadRadius,
      this.manifest.priorityFrames,
    )

    const keepKeys = new Set(
      frameIndices.map((index) => createSequenceFrameKey(this.manifest.id, this.set.profile as SequenceProfile, index)),
    )

    this.cache.pruneToKeys(keepKeys, this.keyPrefix)

    for (const index of frameIndices) {
      const priority = Math.abs(index - currentIndex)
      void this.ensureFrame(index, priority)
    }
  }

  ensureFrame(index: number, priority = 0) {
    const key = createSequenceFrameKey(this.manifest.id, this.set.profile, index)
    const cached = this.cache.get(key)

    if (cached) {
      return Promise.resolve(cached)
    }

    const pendingTask = this.pending.get(index)

    if (pendingTask) {
      return pendingTask
    }

    const promise = new Promise<SequenceFrameResource>((resolve, reject) => {
      this.queue.push({
        attempt: 0,
        index,
        priority,
        reject,
        resolve,
      })
      this.queue.sort((left, right) => left.priority - right.priority)
      this.pump()
    })

    this.pending.set(index, promise)
    return promise
  }

  private async decodeBlob(blob: Blob, src: string) {
    if ('createImageBitmap' in window) {
      try {
        return {
          resource: await createImageBitmap(blob),
          type: 'bitmap' as const,
        }
      } catch {
        // Fall through to Image decode for Safari or unsupported formats.
      }
    }

    return new Promise<{ resource: HTMLImageElement; type: 'image' }>((resolve, reject) => {
      const image = new Image()
      const objectUrl = URL.createObjectURL(blob)

      image.onload = async () => {
        try {
          if (typeof image.decode === 'function') {
            await image.decode()
          }
          resolve({
            resource: image,
            type: 'image',
          })
        } catch (error) {
          reject(error)
        } finally {
          URL.revokeObjectURL(objectUrl)
        }
      }

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl)
        reject(new Error(`Failed to decode frame "${src}".`))
      }

      image.src = objectUrl
    })
  }

  private async fetchFrame(index: number) {
    const src = buildSequenceFramePath(this.set, index)
    const controller = new AbortController()
    this.abortControllers.set(index, controller)

    try {
      const response = await fetch(src, {
        cache: 'force-cache',
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Frame request failed with ${response.status} for "${src}".`)
      }

      const blob = await response.blob()
      const decoded = await this.decodeBlob(blob, src)
      const width = decoded.resource.width
      const height = decoded.resource.height

      if (width !== this.set.width || height !== this.set.height) {
        throw new Error(`Frame "${src}" has unexpected dimensions ${width}x${height}.`)
      }

      return {
        bytes: blob.size,
        height,
        index,
        key: createSequenceFrameKey(this.manifest.id, this.set.profile, index),
        resource: decoded.resource,
        type: decoded.type,
        width,
      } satisfies SequenceFrameResource
    } finally {
      this.abortControllers.delete(index)
    }
  }

  private pump() {
    if (this.disposed) {
      return
    }

    while (this.activeCount < this.maxConcurrency && this.queue.length > 0) {
      const task = this.queue.shift()

      if (!task) {
        return
      }

      this.activeCount += 1

      void this.fetchFrame(task.index)
        .then((resource) => {
          if (this.disposed) {
            if (resource.type === 'bitmap') {
              ;(resource.resource as ImageBitmap).close()
            }
            return
          }

          this.cache.set(resource.key, resource)
          task.resolve(resource)
        })
        .catch((error) => {
          if (task.attempt < this.retryLimit && !this.disposed) {
            this.queue.push({
              ...task,
              attempt: task.attempt + 1,
            })
            this.queue.sort((left, right) => left.priority - right.priority)
            return
          }

          const message = error instanceof Error ? error.message : `Unknown frame error at ${task.index}.`
          this.onUpdate?.({ error: message })
          task.reject(error)
        })
        .finally(() => {
          this.activeCount = Math.max(0, this.activeCount - 1)
          this.pending.delete(task.index)
          this.pump()
        })
    }
  }
}
