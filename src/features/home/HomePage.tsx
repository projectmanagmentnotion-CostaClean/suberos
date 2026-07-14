import { useRef } from 'react'

import { Bleed } from '../../components/layout/Bleed'
import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { MediaFrame } from '../../components/ui/MediaFrame'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import { homeContent, processNotes, projectReadiness, siteServices } from '../../data/siteContent'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { ContactSection } from '../contact/ContactSection'
import { HeroSection } from './HeroSection'

export function HomePage() {
  const manifestoRef = useRef<HTMLElement | null>(null)
  const servicesRef = useRef<HTMLElement | null>(null)
  const projectsRef = useRef<HTMLElement | null>(null)
  const processRef = useRef<HTMLElement | null>(null)

  useElementReveal(manifestoRef, { selector: '.section-header, .surface' })
  useElementReveal(servicesRef, { selector: '.section-header, .service-card' })
  useElementReveal(projectsRef, { selector: '.section-header, .surface, .media-frame' })
  useElementReveal(processRef, { selector: '.section-header, .divider, .surface' })

  return (
    <>
      <HeroSection />

      <Section aria-labelledby="estudio-title" id="estudio" ref={manifestoRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Que es SUBEROS"
              title={homeContent.manifestoTitle}
              body={homeContent.manifestoBody}
            />
            <Grid className="manifesto-grid" columns="thirds" gap="md">
              <Surface as="article" padding="lg">
                <h3>Contenido real</h3>
                <p>
                  El baseline se apoya en servicios y datos confirmados de la web actual: branding, fotografia,
                  impresion digital, desarrollo web, telefono, email y ubicacion.
                </p>
              </Surface>
              <Surface as="article" padding="lg">
                <h3>Entrada cinematografica controlada</h3>
                <p>
                  El preloader y el hero usan carga real, reduced motion y una primera escena scroll-linked sin
                  bloquear navegacion, foco ni lectura.
                </p>
              </Surface>
              <Surface as="article" padding="lg">
                <h3>Escalabilidad</h3>
                <p>
                  La estructura separa layout, features, data y motion para evolucionar hacia portfolio, casos y
                  escenas mas complejas sin rehacer la base.
                </p>
              </Surface>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="services-title" id="servicios" ref={servicesRef} tone="muted">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              action={
                <Button href="#contacto" size="small" variant="secondary">
                  Solicitar presupuesto
                </Button>
              }
              body="La home publica actual confirma estas cuatro lineas de trabajo. Esta fase las organiza con mejor jerarquia, linking interno y CTA consistentes."
              eyebrow="Servicios"
              title="Capacidades confirmadas en la web actual, ordenadas para una experiencia mas clara."
            />
            <Grid className="service-grid" columns="cards" gap="md">
              {siteServices.map((service, index) => (
                <Surface as="article" className="service-card" id={service.id} key={service.id} padding="lg">
                  <span className="service-card__index">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <TextLink href="#contacto">Solicitar informacion</TextLink>
                </Surface>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="projects-title" id="proyectos" ref={projectsRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              body="No se han inventado clientes, resultados ni testimonios. En esta fase se prepara el sistema para incorporar proyectos reales con media local, rutas y transiciones controladas."
              eyebrow="Proyectos"
              title="La arquitectura ya esta lista para convertir activos y casos verificados en escenas editoriales."
              width="wide"
            />
            <Grid columns="halves" gap="lg">
              <Bleed inset="md">
                <MediaFrame
                  caption="Asset propio verificado y servido localmente."
                  fallback={<span>Logo de SUBEROS</span>}
                  media={
                    <img
                      alt="Simbolo de SUBEROS sobre fondo oscuro"
                      height="512"
                      src="/branding/suberos-logo-symbol.webp"
                      width="494"
                    />
                  }
                  overlay={<div aria-hidden="true" className="media-frame__shade" />}
                  ratio="square"
                />
              </Bleed>
              <Grid columns="cards" gap="md">
                {projectReadiness.map((item) => (
                  <Surface as="article" key={item.title} padding="lg">
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </Surface>
                ))}
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="process-title" id="proceso" ref={processRef} tone="raised">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              body="Mientras se confirman casos y escenas futuras, este sprint organiza el flujo editorial y deja preparado el sitio para motion mas complejo sin bloquear lectura, teclado ni reduced motion."
              eyebrow="Proceso"
              title="El shell ya define un recorrido claro desde la propuesta de valor hasta el contacto."
            />
            <Divider />
            <Grid columns="thirds" gap="md">
              {processNotes.map((item, index) => (
                <Surface as="article" key={item.title} padding="lg">
                  <p className="service-card__index">0{index + 1}</p>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </Surface>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Section>

      <ContactSection />
    </>
  )
}
