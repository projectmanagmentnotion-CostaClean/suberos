import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type HeroFoundationSceneOptions = {
  accent: Element | null
  headline: Element | null
  lines: HTMLElement[]
  metadata: Element | null
  scrollCue: Element | null
  visual: Element | null
}

export function createHeroFoundationScene(
  context: MotionSceneContext,
  { accent, headline, lines, metadata, scrollCue, visual }: HeroFoundationSceneOptions,
): SceneCleanup | void {
  if (!(headline instanceof HTMLElement) || !(visual instanceof HTMLElement)) {
    return
  }

  const targets = [
    accent instanceof HTMLElement ? accent : null,
    headline,
    metadata instanceof HTMLElement ? metadata : null,
    scrollCue instanceof HTMLElement ? scrollCue : null,
    visual,
    ...lines,
  ]

  if (context.profile === 'reduced') {
    clearMotionStyles(targets)
    return
  }

  const headlineShift = context.profile === 'full' ? -14 : -8
  const visualScale = context.profile === 'full' ? 1.12 : 1.06
  const visualY = context.breakpoint === 'mobile' ? -18 : context.profile === 'full' ? -48 : -28
  const cueY = context.breakpoint === 'mobile' ? 18 : 28
  const metaY = context.breakpoint === 'mobile' ? 12 : 20
  const lineShift = context.profile === 'full' ? 20 : 12

  const timeline = context.gsap.timeline({
    defaults: {
      ease: motionConfig.easings.soft,
    },
    scrollTrigger: {
      end: context.breakpoint === 'mobile' ? 'bottom top+=18%' : 'bottom top+=8%',
      id: `hero-foundation:${context.scope.id || 'hero'}`,
      invalidateOnRefresh: true,
      markers: context.preferences.debugMarkers,
      scrub: context.profile === 'full' ? 0.8 : 0.5,
      start: 'top top',
      trigger: context.scope,
    },
  })

  timeline.to(
    lines,
    {
      stagger: 0.04,
      xPercent: (index) => (index % 2 === 0 ? 0 : lineShift),
      yPercent: headlineShift,
    },
    0,
  )

  timeline.to(
    visual,
    {
      scale: visualScale,
      y: visualY,
    },
    0,
  )

  if (accent instanceof HTMLElement) {
    timeline.to(
      accent,
      {
        scale: context.profile === 'full' ? 1.14 : 1.08,
        y: visualY * 0.35,
      },
      0,
    )
  }

  if (metadata instanceof HTMLElement) {
    timeline.to(
      metadata,
      {
        autoAlpha: 0.56,
        y: metaY,
      },
      0,
    )
  }

  if (scrollCue instanceof HTMLElement) {
    timeline.to(
      scrollCue,
      {
        autoAlpha: 0,
        y: cueY,
      },
      0,
    )
  }

  return () => {
    timeline.kill()
    clearMotionStyles(targets)
  }
}
