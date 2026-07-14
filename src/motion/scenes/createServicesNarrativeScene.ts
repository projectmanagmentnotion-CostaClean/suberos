import { motionConfig } from '../config/motionConfig'
import { MotionSceneContext, SceneCleanup } from '../types/motion.types'
import { clearMotionStyles } from '../utilities/clearMotionStyles'

type ServicesNarrativeSceneOptions = {
  items: HTMLElement[]
  panels: HTMLElement[]
}

export function createServicesNarrativeScene(
  context: MotionSceneContext,
  { items, panels }: ServicesNarrativeSceneOptions,
): SceneCleanup | void {
  const itemElements = items.filter((item): item is HTMLElement => item instanceof HTMLElement)
  const panelElements = panels.filter((panel): panel is HTMLElement => panel instanceof HTMLElement)
  const targets = [...itemElements, ...panelElements]

  if (!itemElements.length || !panelElements.length) {
    return
  }

  const showPanel = (index: number) => {
    panelElements.forEach((panel, panelIndex) => {
      panel.dataset.active = panelIndex === index ? 'true' : 'false'
    })

    itemElements.forEach((item, itemIndex) => {
      item.dataset.active = itemIndex === index ? 'true' : 'false'
    })
  }

  showPanel(0)

  if (context.profile === 'reduced' || context.breakpoint === 'mobile') {
    clearMotionStyles(targets)
    return () => {
      panelElements.forEach((panel) => {
        delete panel.dataset.active
      })
      itemElements.forEach((item) => {
        delete item.dataset.active
      })
      clearMotionStyles(targets)
    }
  }

  context.gsap.set(panelElements, {
    autoAlpha: (index) => (index === 0 ? 1 : 0),
    scale: (index) => (index === 0 ? 1 : 0.96),
    y: (index) => (index === 0 ? 0 : 18),
  })

  const itemTween = context.gsap.fromTo(
    itemElements,
    {
      autoAlpha: 0.36,
      y: 38,
    },
    {
      autoAlpha: 1,
      duration: motionConfig.durations.scene,
      ease: motionConfig.easings.enter,
      stagger: 0.08,
      scrollTrigger: {
        id: `services-list:${context.scope.id || 'services'}`,
        invalidateOnRefresh: true,
        markers: context.preferences.debugMarkers,
        start: 'top 76%',
        trigger: context.scope,
      },
      y: 0,
    },
  )

  const triggers = itemElements.map((item, index) =>
    context.ScrollTrigger.create({
      end: 'bottom center',
      id: `services-item:${index}`,
      invalidateOnRefresh: true,
      markers: context.preferences.debugMarkers,
      onEnter: () => {
        showPanel(index)
        context.gsap.to(panelElements, {
          autoAlpha: (panelIndex) => (panelIndex === index ? 1 : 0),
          duration: context.profile === 'full' ? 0.42 : 0.26,
          overwrite: true,
          scale: (panelIndex) => (panelIndex === index ? 1 : 0.96),
          y: (panelIndex) => (panelIndex === index ? 0 : 18),
        })
      },
      onEnterBack: () => {
        showPanel(index)
        context.gsap.to(panelElements, {
          autoAlpha: (panelIndex) => (panelIndex === index ? 1 : 0),
          duration: context.profile === 'full' ? 0.42 : 0.26,
          overwrite: true,
          scale: (panelIndex) => (panelIndex === index ? 1 : 0.96),
          y: (panelIndex) => (panelIndex === index ? 0 : 18),
        })
      },
      start: 'top center',
      trigger: item,
    }),
  )

  return () => {
    itemTween.kill()
    triggers.forEach((trigger) => trigger.kill())
    panelElements.forEach((panel) => {
      delete panel.dataset.active
    })
    itemElements.forEach((item) => {
      delete item.dataset.active
    })
    clearMotionStyles(targets)
  }
}
