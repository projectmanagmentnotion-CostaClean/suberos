import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type RevealSceneOptions = {
  distance?: number
  end?: string
  stagger?: number
  start?: string
  targets: Element[]
}

export function createRevealScene(
  context: MotionSceneContext,
  { distance, end = 'top 68%', stagger, start = 'top 88%', targets }: RevealSceneOptions,
): SceneCleanup | void {
  const elements = targets.filter((target): target is HTMLElement => target instanceof HTMLElement)
  if (!elements.length) {
    return
  }

  if (context.profile === 'reduced') {
    clearMotionStyles(elements)
    return
  }

  const revealDistance =
    distance ??
    (context.profile === 'full' ? motionConfig.reveal.fullDistance : motionConfig.reveal.balancedDistance)
  const revealStagger = stagger ?? motionConfig.reveal.stagger

  elements.forEach((element) => {
    element.dataset.motionState = 'armed'
  })

  const tween = context.gsap.fromTo(
    elements,
    {
      autoAlpha: 0,
      y: revealDistance,
    },
    {
      autoAlpha: 1,
      duration: motionConfig.durations.scene,
      ease: motionConfig.easings.enter,
      stagger: revealStagger,
      y: 0,
      scrollTrigger: {
        id: `reveal:${context.scope.id || context.scope.dataset.motionLabId || 'scene'}`,
        invalidateOnRefresh: true,
        markers: context.preferences.debugMarkers,
        start,
        end,
        trigger: context.scope,
      },
    },
  )

  return () => {
    tween.kill()
    clearMotionStyles(elements)
  }
}
