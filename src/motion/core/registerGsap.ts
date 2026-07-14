import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

let registered = false

export function registerMotionPlugins() {
  if (registered) {
    return
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger, Flip)
  registered = true
}

export { Flip, gsap, ScrollTrigger, useGSAP }
