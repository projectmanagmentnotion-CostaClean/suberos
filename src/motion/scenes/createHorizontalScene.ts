import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type HorizontalSceneOptions = {
  content: Element | null
  viewport: Element | null
}

export function createHorizontalScene(
  context: MotionSceneContext,
  { content, viewport }: HorizontalSceneOptions,
): SceneCleanup | void {
  if (!(content instanceof HTMLElement) || !(viewport instanceof HTMLElement)) {
    return
  }

  if (context.profile === 'reduced' || context.breakpoint === 'mobile') {
    clearMotionStyles([content, viewport])
    return
  }

  const distance = Math.max(content.scrollWidth - viewport.clientWidth, 0)
  if (!distance) {
    return
  }

  const tween = context.gsap.to(content, {
    ease: 'none',
    x: -distance,
    scrollTrigger: {
      end: `+=${distance}`,
      id: `horizontal:${context.scope.id || context.scope.dataset.motionLabId || 'scene'}`,
      invalidateOnRefresh: true,
      markers: context.preferences.debugMarkers,
      pin: viewport,
      pinSpacing: true,
      scrub: context.profile === 'full' ? 1 : 0.5,
      start: 'top top+=88',
      trigger: context.scope,
    },
  })

  return () => {
    tween.kill()
    clearMotionStyles([content, viewport])
  }
}
