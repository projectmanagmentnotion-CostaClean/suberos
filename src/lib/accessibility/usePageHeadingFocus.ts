import { useEffect } from 'react'

export function usePageHeadingFocus(id: string) {
  useEffect(() => {
    let frame = 0

    const focusHeading = () => {
      const heading = document.getElementById(id)

      if (!(heading instanceof HTMLElement)) {
        frame = window.requestAnimationFrame(focusHeading)
        return
      }

      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }

    frame = window.requestAnimationFrame(focusHeading)

    return () => {
      window.cancelAnimationFrame(frame)
    }
  }, [id])
}
