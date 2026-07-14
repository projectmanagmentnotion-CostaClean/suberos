import { homeAnchors } from '../../app/routes'
import { useRef } from 'react'

import { Cluster } from '../../components/layout/Cluster'
import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import { homeContent } from '../../data/homeContent'
import { siteServices } from '../../data/services'
import { useScrollScene } from '../../motion/hooks/useScrollScene'
import { createServicesNarrativeScene } from '../../motion/scenes/createServicesNarrativeScene'

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Array<HTMLElement | null>>([])
  const panelRefs = useRef<Array<HTMLElement | null>>([])

  useScrollScene(sectionRef, {
    dependencies: [siteServices.length],
    scene: (context) =>
      createServicesNarrativeScene(context, {
        items: itemRefs.current.filter((item): item is HTMLElement => Boolean(item)),
        panels: panelRefs.current.filter((panel): panel is HTMLElement => Boolean(panel)),
      }),
  })

  return (
    <Section aria-labelledby="services-title" className="services-scene" id="servicios" ref={sectionRef} tone="muted">
      <Container>
        <Stack gap="xl">
          <SectionHeader
            action={
              <Button href={homeAnchors.contacto} size="small" variant="secondary">
                Solicitar presupuesto
              </Button>
            }
            body={homeContent.services.body}
            eyebrow={homeContent.services.eyebrow}
            title={homeContent.services.title}
            titleId="services-title"
            width="wide"
          />

          <div className="services-scene__layout">
            <div className="services-scene__visual" aria-hidden="true">
              {siteServices.map((service, index) => (
                <Surface
                  className="services-scene__panel"
                  key={service.id}
                  padding="lg"
                  ref={(element) => {
                    panelRefs.current[index] = element
                  }}
                  tone="highlight"
                >
                  <p className="services-scene__panel-label">{service.visualEyebrow}</p>
                  <span className="services-scene__panel-index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.benefit}</p>
                  <p>{service.result}</p>
                </Surface>
              ))}
            </div>

            <div className="services-scene__list" role="list">
              {siteServices.map((service, index) => (
                <article
                  className="services-scene__item"
                  id={service.id}
                  key={service.id}
                  ref={(element) => {
                    itemRefs.current[index] = element
                  }}
                  role="listitem"
                >
                  <Cluster className="services-scene__item-head" gap="sm" justify="between">
                    <span className="services-scene__item-index">0{index + 1}</span>
                    <span className="services-scene__item-label">{service.visualEyebrow}</span>
                  </Cluster>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                  <p className="services-scene__item-result">{service.result}</p>
                  <TextLink href={service.ctaHref}>{service.ctaLabel}</TextLink>
                </article>
              ))}
            </div>
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
