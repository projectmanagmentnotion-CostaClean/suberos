import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type PinnedSceneOptions = {
  end?: string
  pinTarget?: Element | null
  target: Element | null
}

export function createPinnedScene(
  context: MotionSceneContext,
  { end, pinTarget, target }: PinnedSceneOptions,
): SceneCleanup | void {
  if (!(target instanceof HTMLElement)) {
    return
  }

  if (context.profile === 'reduced' || context.breakpoint === 'mobile') {
    clearMotionStyles([target, pinTarget ?? null])
    return
  }

  const tween = context.gsap.fromTo(
    target,
    {
      autoAlpha: 0.86,
      y: 48,
    },
    {
      autoAlpha: 1,
      duration: motionConfig.durations.slow,
      ease: motionConfig.easings.soft,
      scrollTrigger: {
        end: end ?? motionConfig.pinned.defaultEnd,
        id: `pin:${context.scope.id || context.scope.dataset.motionLabId || 'scene'}`,
        invalidateOnRefresh: true,
        markers: context.preferences.debugMarkers,
        pin: pinTarget ?? target,
        pinSpacing: true,
        scrub: 0.4,
        start: 'top top+=96',
        trigger: context.scope,
      },
      y: 0,
    },
  )

  return () => {
    tween.kill()
    clearMotionStyles([target, pinTarget ?? null])
  }
}
