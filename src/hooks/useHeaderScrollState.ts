import { useEffect, useState } from 'react'

export function useHeaderScrollState(offset = 24) {
  const [isElevated, setIsElevated] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsElevated(window.scrollY > offset)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [offset])

  return isElevated
}
