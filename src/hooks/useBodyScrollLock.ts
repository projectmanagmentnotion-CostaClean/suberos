import { useEffect } from 'react'

let activeLocks = 0
let lockedScrollY = 0
let lockedStyles: Partial<CSSStyleDeclaration> | null = null

function lockBodyScroll() {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return
  }

  if (activeLocks === 0) {
    lockedScrollY = window.scrollY
    lockedStyles = {
      overflow: document.body.style.overflow,
      overscrollBehavior: document.body.style.overscrollBehavior,
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
      left: document.body.style.left,
      right: document.body.style.right,
      touchAction: document.body.style.touchAction,
    }

    document.body.style.overflow = 'hidden'
    document.body.style.overscrollBehavior = 'contain'
    document.body.style.position = 'fixed'
    document.body.style.top = `${-lockedScrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.touchAction = 'none'
  }

  activeLocks += 1
}

function unlockBodyScroll() {
  if (typeof document === 'undefined' || typeof window === 'undefined' || activeLocks === 0) {
    return
  }

  activeLocks -= 1

  if (activeLocks > 0) {
    return
  }

  document.body.style.overflow = lockedStyles?.overflow ?? ''
  document.body.style.overscrollBehavior = lockedStyles?.overscrollBehavior ?? ''
  document.body.style.position = lockedStyles?.position ?? ''
  document.body.style.top = lockedStyles?.top ?? ''
  document.body.style.left = lockedStyles?.left ?? ''
  document.body.style.right = lockedStyles?.right ?? ''
  document.body.style.width = lockedStyles?.width ?? ''
  document.body.style.touchAction = lockedStyles?.touchAction ?? ''

  window.scrollTo({ top: lockedScrollY, behavior: 'auto' })
  lockedStyles = null
}

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) {
      return
    }

    lockBodyScroll()

    return () => {
      unlockBodyScroll()
    }
  }, [locked])
}
