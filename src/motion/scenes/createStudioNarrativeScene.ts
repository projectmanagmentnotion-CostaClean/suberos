import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type StudioNarrativeSceneOptions = {
  detail: Element | null
  lines: HTMLElement[]
}

export function createStudioNarrativeScene(
  context: MotionSceneContext,
  { detail, lines }: StudioNarrativeSceneOptions,
): SceneCleanup | void {
  const detailElement = detail instanceof HTMLElement ? detail : null
  const lineElements = lines.filter((line): line is HTMLElement => line instanceof HTMLElement)
  const targets = [...lineElements, detailElement]

  if (!lineElements.length) {
    return
  }

  if (context.profile === 'reduced') {
    clearMotionStyles(targets)
    return
  }

  const timeline = context.gsap.timeline({
    defaults: {
      ease: motionConfig.easings.soft,
    },
    scrollTrigger: {
      end: context.breakpoint === 'mobile' ? 'bottom top+=10%' : 'bottom top+=18%',
      id: `studio:${context.scope.id || 'studio'}`,
      invalidateOnRefresh: true,
      markers: context.preferences.debugMarkers,
      scrub: context.profile === 'full' ? 0.75 : 0.45,
      start: 'top 72%',
      trigger: context.scope,
    },
  })

  timeline.fromTo(
    lineElements,
    {
      autoAlpha: 0.22,
      yPercent: 18,
    },
    {
      autoAlpha: 1,
      stagger: 0.06,
      yPercent: 0,
    },
    0,
  )

  if (detailElement) {
    timeline.fromTo(
      detailElement,
      {
        autoAlpha: 0.42,
        y: 40,
      },
      {
        autoAlpha: 1,
        y: 0,
      },
      0.1,
    )
  }

  return () => {
    timeline.kill()
    clearMotionStyles(targets)
  }
}
