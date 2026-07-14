import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type StatementSceneOptions = {
  body: Element | null
  lines: HTMLElement[]
}

export function createStatementScene(
  context: MotionSceneContext,
  { body, lines }: StatementSceneOptions,
): SceneCleanup | void {
  const bodyElement = body instanceof HTMLElement ? body : null
  const lineElements = lines.filter((line): line is HTMLElement => line instanceof HTMLElement)
  const targets = [...lineElements, bodyElement]

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
      end: 'bottom top+=20%',
      id: `statement:${context.scope.id || 'statement'}`,
      invalidateOnRefresh: true,
      markers: context.preferences.debugMarkers,
      scrub: context.profile === 'full' ? 0.65 : 0.35,
      start: 'top 82%',
      trigger: context.scope,
    },
  })

  timeline.fromTo(
    lineElements,
    {
      autoAlpha: 0.18,
      scale: 0.94,
      y: 42,
    },
    {
      autoAlpha: 1,
      scale: 1,
      stagger: 0.08,
      y: 0,
    },
    0,
  )

  if (bodyElement) {
    timeline.fromTo(
      bodyElement,
      {
        autoAlpha: 0.4,
        y: 24,
      },
      {
        autoAlpha: 1,
        y: 0,
      },
      0.12,
    )
  }

  return () => {
    timeline.kill()
    clearMotionStyles(targets)
  }
}
