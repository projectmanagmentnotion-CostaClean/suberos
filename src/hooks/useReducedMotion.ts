import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const params = new URLSearchParams(window.location.search)
    const forcedReducedMotion = params.get('reduced-motion') === '1'
    const update = () => setReducedMotion(mediaQuery.matches)

    if (forcedReducedMotion) {
      setReducedMotion(true)
      return
    }

    update()
    mediaQuery.addEventListener('change', update)

    return () => {
      mediaQuery.removeEventListener('change', update)
    }
  }, [])

  return reducedMotion
}
