import { ScrollTrigger } from './registerGsap'

type RefreshReason =
  | 'font-ready'
  | 'image-load'
  | 'layout-change'
  | 'menu-state'
  | 'orientationchange'
  | 'preloader-finish'
  | 'resize'
  | 'route-change'
  | 'scroll-engine'
  | 'visibility-return'

class RefreshManager {
  private imageListeners = new Map<HTMLImageElement, () => void>()
  private initialized = false
  private refreshTimer: number | null = null
  private resizeHandler: (() => void) | null = null
  private orientationHandler: (() => void) | null = null

  attach() {
    if (this.initialized || typeof window === 'undefined') {
      return
    }

    this.initialized = true
    this.resizeHandler = () => this.requestRefresh('resize')
    this.orientationHandler = () => this.requestRefresh('orientationchange')

    window.addEventListener('resize', this.resizeHandler, { passive: true })
    window.addEventListener('orientationchange', this.orientationHandler)
    this.watchFonts()
    this.watchImages()
  }

  detach() {
    if (!this.initialized || typeof window === 'undefined') {
      return
    }

    this.initialized = false

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }

    if (this.orientationHandler) {
      window.removeEventListener('orientationchange', this.orientationHandler)
    }

    this.resizeHandler = null
    this.orientationHandler = null

    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer)
      this.refreshTimer = null
    }

    for (const [image, listener] of this.imageListeners) {
      image.removeEventListener('load', listener)
    }
    this.imageListeners.clear()
  }

  requestRefresh(reason: RefreshReason) {
    if (typeof window === 'undefined') {
      return
    }
    void reason

    if (this.refreshTimer) {
      window.clearTimeout(this.refreshTimer)
    }

    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null
      ScrollTrigger.refresh()
    }, 96)
  }

  private watchFonts() {
    if (typeof document === 'undefined' || !('fonts' in document)) {
      return
    }

    document.fonts.ready.then(() => {
      this.requestRefresh('font-ready')
    })
  }

  private watchImages() {
    if (typeof document === 'undefined') {
      return
    }

    for (const image of Array.from(document.images)) {
      if (image.complete) {
        continue
      }

      const listener = () => {
        image.removeEventListener('load', listener)
        this.imageListeners.delete(image)
        this.requestRefresh('image-load')
      }

      image.addEventListener('load', listener, { once: true })
      this.imageListeners.set(image, listener)
    }
  }
}

export const refreshManager = new RefreshManager()
