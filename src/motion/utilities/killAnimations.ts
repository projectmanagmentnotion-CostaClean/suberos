import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function killAnimations(targets: Array<gsap.core.Animation | ScrollTrigger | null | undefined>) {
  for (const target of targets) {
    if (!target) {
      continue
    }

    if ('kill' in target && typeof target.kill === 'function') {
      target.kill()
    }
  }
}
