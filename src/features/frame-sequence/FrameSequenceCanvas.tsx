import { useEffect, useRef, useState, useSyncExternalStore } from 'react'

import { FrameSequenceController } from '../../motion/sequences/FrameSequenceController'
import { cx } from '../../lib/utils/cx'

type FrameSequenceCanvasProps = {
  className?: string
  controller: FrameSequenceController
  fit?: 'contain' | 'cover'
}

type CanvasSize = {
  height: number
  width: number
}

function getDrawRect(
  canvasWidth: number,
  canvasHeight: number,
  sourceWidth: number,
  sourceHeight: number,
  fit: 'contain' | 'cover',
) {
  const sourceRatio = sourceWidth / sourceHeight
  const canvasRatio = canvasWidth / canvasHeight
  const useCover = fit === 'cover'
  const scale =
    useCover
      ? sourceRatio > canvasRatio
        ? canvasHeight / sourceHeight
        : canvasWidth / sourceWidth
      : sourceRatio > canvasRatio
        ? canvasWidth / sourceWidth
        : canvasHeight / sourceHeight

  const width = sourceWidth * scale
  const height = sourceHeight * scale
  const x = (canvasWidth - width) / 2
  const y = (canvasHeight - height) / 2

  return { height, width, x, y }
}

export function FrameSequenceCanvas({ className, controller, fit = 'cover' }: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const drawSignatureRef = useRef<string>('')
  const [size, setSize] = useState<CanvasSize>({ height: 0, width: 0 })
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)

  useEffect(() => {
    if (!viewportRef.current || typeof ResizeObserver === 'undefined') {
      return
    }

    const observer = new ResizeObserver((entries) => {
      const nextEntry = entries[0]

      if (!nextEntry) {
        return
      }

      const nextWidth = Math.round(nextEntry.contentRect.width)
      const nextHeight = Math.round(nextEntry.contentRect.height)
      setSize((current) =>
        current.width === nextWidth && current.height === nextHeight
          ? current
          : {
              height: nextHeight,
              width: nextWidth,
            },
      )
    })

    observer.observe(viewportRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!canvasRef.current || size.width <= 0 || size.height <= 0) {
      return
    }

    const resource = controller.getCurrentFrameResource()

    if (!resource || !state.canvasActive || state.usingFallback || state.phase !== 'ready') {
      return
    }

    const dpr = Math.min(window.devicePixelRatio || 1, state.dprCap)
    const signature = `${resource.key}:${size.width}:${size.height}:${dpr}:${fit}`

    if (drawSignatureRef.current === signature) {
      return
    }

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')

    if (!context) {
      return
    }

    canvas.width = Math.max(1, Math.round(size.width * dpr))
    canvas.height = Math.max(1, Math.round(size.height * dpr))
    canvas.style.width = `${size.width}px`
    canvas.style.height = `${size.height}px`

    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, canvas.width, canvas.height)
    context.scale(dpr, dpr)
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'

    const rect = getDrawRect(size.width, size.height, resource.width, resource.height, fit)
    context.drawImage(resource.resource, rect.x, rect.y, rect.width, rect.height)

    drawSignatureRef.current = signature
    controller.incrementRenderCount()
  }, [controller, fit, size.height, size.width, state.canvasActive, state.currentFrame, state.dprCap, state.phase, state.usingFallback])

  return (
    <div className={cx('frame-sequence-canvas', className)} ref={viewportRef}>
      <canvas aria-hidden="true" ref={canvasRef} />
    </div>
  )
}
