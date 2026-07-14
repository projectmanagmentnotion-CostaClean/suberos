import { gsap } from '../core/registerGsap'

const CLEAR_PROPS = 'opacity,transform,clip-path,will-change,filter'

export function clearMotionStyles(targets: Iterable<Element | null | undefined>) {
  const elements = Array.from(targets).filter((target): target is Element => Boolean(target))
  if (!elements.length) {
    return
  }

  gsap.set(elements, { clearProps: CLEAR_PROPS })

  for (const element of elements) {
    element.removeAttribute('data-motion-state')
  }
}
