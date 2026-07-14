import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type ParallaxSceneOptions = {
  distance?: number
  target: Element | null
}

export function createParallaxScene(
  context: MotionSceneContext,
  { distance, target }: ParallaxSceneOptions,
): SceneCleanup | void {
  if (!(target instanceof HTMLElement) || context.profile === 'reduced') {
    if (target instanceof HTMLElement) {
      clearMotionStyles([target])
    }
    return
  }

  const parallaxDistance =
    distance ??
    (context.profile === 'full' ? motionConfig.parallax.fullDistance : motionConfig.parallax.balancedDistance)

  const tween = context.gsap.fromTo(
    target,
    {
      yPercent: -8,
    },
    {
      ease: 'none',
      scrollTrigger: {
        id: `parallax:${context.scope.id || context.scope.dataset.motionLabId || 'scene'}`,
        invalidateOnRefresh: true,
        markers: context.preferences.debugMarkers,
        scrub: context.profile === 'full' ? 1 : 0.6,
        start: 'top bottom',
        end: 'bottom top',
        trigger: context.scope,
      },
      yPercent: parallaxDistance / 10,
    },
  )

  return () => {
    tween.kill()
    clearMotionStyles([target])
  }
}
