import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerMotionPlugins() {
  if (registered) {
    return
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger)
  registered = true
}

export { gsap, ScrollTrigger, useGSAP }
