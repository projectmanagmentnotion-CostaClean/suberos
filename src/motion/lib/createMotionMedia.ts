import { gsap } from '../core/registerGsap'

export function createMotionMedia() {
  return gsap.matchMedia()
}
