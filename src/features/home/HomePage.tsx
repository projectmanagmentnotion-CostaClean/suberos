import { Bleed } from '../../components/layout/Bleed'
import { Cluster } from '../../components/layout/Cluster'
import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { ScrollAccent } from '../../components/motion/ScrollAccent'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { MediaFrame } from '../../components/ui/MediaFrame'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import { homeContent, processNotes, projectReadiness, siteServices } from '../../data/siteContent'
import { ContactSection } from '../contact/ContactSection'

export function HomePage() {
  return (
    <>
      <Section className="hero" id="inicio" aria-labelledby="home-title" tone="hero" spacing="scene">
        <Container>
          <Grid className="hero__layout" columns="content-aside" gap="lg">
            <Stack className="hero__copy" gap="md">
              <p className="hero__eyebrow">{homeContent.heroEyebrow}</p>
            <h1 id="home-title">{homeContent.heroTitle}</h1>
            <p className="hero__body">{homeContent.heroBody}</p>
              <Cluster className="hero__actions" gap="sm">
                <Button href="#contacto" variant="primary" size="large">
                {homeContent.heroPrimaryCta}
                </Button>
                <Button href="#servicios" variant="ghost" size="large">
                {homeContent.heroSecondaryCta}
                </Button>
              </Cluster>
              <Cluster className="hero__meta" gap="md">
                <TextLink href={`mailto:${homeContent.heroContactEmail}`}>{homeContent.heroContactEmail}</TextLink>
                <TextLink href={`tel:${homeContent.heroContactPhoneHref}`}>{homeContent.heroContactPhone}</TextLink>
              </Cluster>
            </Stack>
            <MediaFrame
              className="hero__panel"
              ratio="portrait"
              caption={homeContent.heroPanelCaption}
              media={
                <img
                  className="hero__panel-logo"
                  src="/branding/suberos-logo-symbol.webp"
                  alt="Simbolo de SUBEROS"
                  width="494"
                  height="512"
                />
              }
              overlay={
                <div className="hero__panel-copy">
                  <span>{homeContent.heroPanelEyebrow}</span>
                  <p>{homeContent.heroPanelBody}</p>
                </div>
              }
            />
          </Grid>
        </Container>
      </Section>

      <Section id="estudio" aria-labelledby="estudio-title">
        <Container>
          <Stack gap="xl">
          <ScrollAccent label="Editorial reveal validation" />
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
              <h3>Motion seguro</h3>
              <p>
                GSAP, ScrollTrigger y Lenis quedan centralizados con limpieza, reduced motion real y una
                animacion de validacion ligada al scroll.
              </p>
            </Surface>
            <Surface as="article" padding="lg">
              <h3>Escalabilidad</h3>
              <p>
                La estructura ya separa layout, features, data, hooks y librerias para facilitar escenas
                cinematograficas posteriores sin rehacer la base.
              </p>
            </Surface>
          </Grid>
          </Stack>
        </Container>
      </Section>

      <Section id="servicios" aria-labelledby="services-title" tone="muted">
        <Container>
          <Stack gap="xl">
          <SectionHeader
            eyebrow="Servicios"
            title="Capacidades confirmadas en la web actual, ordenadas para una experiencia mas clara."
            body="La home publica actual confirma estas cuatro lineas de trabajo. Esta fase las organiza con mejor jerarquia, linking interno y CTA consistentes."
            action={
              <Button href="#contacto" size="small" variant="secondary">
                Solicitar presupuesto
              </Button>
            }
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

      <Section id="proyectos" aria-labelledby="projects-title">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Proyectos"
              title="La arquitectura ya esta lista para convertir activos y casos verificados en escenas editoriales."
              body="No se han inventado clientes, resultados ni testimonios. En esta fase se prepara el sistema para incorporar proyectos reales con media local, rutas y transiciones controladas."
              width="wide"
            />
            <Grid columns="halves" gap="lg">
              <Bleed inset="md">
                <MediaFrame
                  caption="Asset propio verificado y servido localmente."
                  ratio="square"
                  fallback={<span>Logo de SUBEROS</span>}
                  media={
                    <img
                      src="/branding/suberos-logo-symbol.webp"
                      alt="Simbolo de SUBEROS sobre fondo oscuro"
                      width="494"
                      height="512"
                    />
                  }
                  overlay={<div className="media-frame__shade" aria-hidden="true" />}
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

      <Section id="proceso" aria-labelledby="process-title" tone="raised">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Proceso"
              title="El shell ya define un recorrido claro desde la propuesta de valor hasta el contacto."
              body="Mientras se confirman casos y escenas futuras, este sprint organiza el flujo editorial y deja preparado el sitio para motion mas complejo sin bloquear lectura, teclado ni reduced motion."
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
