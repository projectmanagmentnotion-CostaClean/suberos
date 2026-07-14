import { useRef } from 'react'

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
import { refreshManager } from '../../motion/core/refreshManager'
import { ScrollTrigger } from '../../motion/core/registerGsap'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import { useScrollScene } from '../../motion/hooks/useScrollScene'
import { useScrollVelocity } from '../../motion/hooks/useScrollVelocity'
import { createHorizontalScene } from '../../motion/scenes/createHorizontalScene'
import { createParallaxScene } from '../../motion/scenes/createParallaxScene'
import { createPinnedScene } from '../../motion/scenes/createPinnedScene'

export function MotionLabPage() {
  const preferences = useMotionPreferences()
  const revealRef = useRef<HTMLElement | null>(null)
  const parallaxRef = useRef<HTMLElement | null>(null)
  const parallaxMediaRef = useRef<HTMLDivElement | null>(null)
  const pinnedRef = useRef<HTMLElement | null>(null)
  const pinnedCardRef = useRef<HTMLDivElement | null>(null)
  const horizontalRef = useRef<HTMLElement | null>(null)
  const horizontalViewportRef = useRef<HTMLDivElement | null>(null)
  const horizontalTrackRef = useRef<HTMLDivElement | null>(null)
  const velocityRef = useRef<HTMLElement | null>(null)
  const velocityState = useScrollVelocity(velocityRef)

  useElementReveal(revealRef, { selector: '[data-reveal-item]' })
  useElementReveal(velocityRef)

  useScrollScene(parallaxRef, {
    scene: (context) =>
      createParallaxScene(context, {
        target: parallaxMediaRef.current,
      }),
  })

  useScrollScene(pinnedRef, {
    scene: (context) =>
      createPinnedScene(context, {
        pinTarget: pinnedRef.current,
        target: pinnedCardRef.current,
      }),
  })

  useScrollScene(horizontalRef, {
    scene: (context) =>
      createHorizontalScene(context, {
        content: horizontalTrackRef.current,
        viewport: horizontalViewportRef.current,
      }),
  })

  return (
    <>
      <Section aria-labelledby="motion-lab-title" className="motion-lab" id="motion-lab" spacing="scene">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Internal QA"
              title="Motion Lab"
              body="Laboratorio interno para validar reveal, parallax, pinning, horizontal scroll, velocity y reduced motion antes del hero y el preloader cinematograficos."
              action={
                <Button onClick={() => refreshManager.requestRefresh('layout-change')} size="small" variant="secondary">
                  Solicitar refresh
                </Button>
              }
              width="wide"
            />
            <Grid columns="thirds" gap="md">
              <Surface padding="lg">
                <h3>Perfil actual</h3>
                <p>{preferences.profile}</p>
              </Surface>
              <Surface padding="lg">
                <h3>ScrollTriggers activos</h3>
                <p>{ScrollTrigger.getAll().length}</p>
              </Surface>
              <Surface padding="lg">
                <h3>Reduced motion</h3>
                <p>{preferences.reducedMotion ? 'Activo' : 'Desactivado'}</p>
              </Surface>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="motion-lab-reveal-title" id="motion-lab-reveal" ref={revealRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Reveal"
              title="Entrada editorial con stagger y fallback reduced."
              body="Los bloques se revelan de forma moderada cuando entran en viewport. En perfil reduced el contenido queda visible inmediatamente."
            />
            <Grid columns="thirds" gap="md">
              <Surface data-reveal-item="" padding="lg">
                <h3>Texto</h3>
                <p>Reutiliza el mismo sistema para titulares, bloques y media sin acoplar GSAP al componente base.</p>
              </Surface>
              <Surface data-reveal-item="" padding="lg">
                <h3>Media</h3>
                <p>Sirve como validación para futuras escenas con fotografia, video, canvas y secuencias.</p>
              </Surface>
              <Surface data-reveal-item="" padding="lg">
                <h3>CTA</h3>
                <p>Los estados interactivos siguen funcionando aunque JavaScript falle o reduced motion este activo.</p>
              </Surface>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="motion-lab-parallax-title" className="motion-lab__scene" id="motion-lab-parallax" ref={parallaxRef}>
        <Container>
          <Grid columns="content-aside" gap="lg">
            <Stack gap="lg">
              <SectionHeader
                eyebrow="Parallax"
                title="Profundidad controlada y limitada por perfil."
                body="La capa visual se desplaza con scrub suave. En mobile y reduced se degrada sin bloquear la lectura."
              />
              <TextLink href="?motion-lab=1&reduced-motion=1">Probar reduced motion en este laboratorio</TextLink>
            </Stack>
            <div ref={parallaxMediaRef}>
              <MediaFrame
                caption="Laboratorio interno: valida scrub y cleanup."
                fallback={<span>Parallax preview</span>}
                ratio="portrait"
                media={
                  <img
                    alt="Simbolo de SUBEROS dentro del laboratorio de motion"
                    height="512"
                    src="/branding/suberos-logo-symbol.webp"
                    width="494"
                  />
                }
              />
            </div>
          </Grid>
        </Container>
      </Section>

      <Section aria-labelledby="motion-lab-pinned-title" id="motion-lab-pinned" ref={pinnedRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Pinned"
              title="Pin controlado con fallback mobile."
              body="Esta escena no es el hero final. Solo valida pin, spacing, refresh y desmontaje sin saltos de layout."
            />
            <div className="motion-lab__pin-wrap">
              <Surface className="motion-lab__pin-card" padding="lg" ref={pinnedCardRef}>
                <h3>Escena fijada</h3>
                <p>
                  El pin solo se activa en perfiles no reducidos y fuera del fallback mobile. La intención aquí es
                  estructural, no decorativa.
                </p>
                <Divider />
                <p>Preparada para escenas futuras con narrativa escalonada y media local.</p>
              </Surface>
            </div>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="motion-lab-horizontal-title" id="motion-lab-horizontal" ref={horizontalRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Horizontal"
              title="Implementación de laboratorio para anchura, resize y cleanup."
              body="Se mantiene fuera de la navegación pública y no representa aún una sección final de portfolio."
            />
            <div className="motion-lab__horizontal-viewport" ref={horizontalViewportRef}>
              <div className="motion-lab__horizontal-track" ref={horizontalTrackRef}>
                {['Calculo de track', 'PinSpacing', 'Refresh', 'Reduced fallback', 'Cleanup'].map((item) => (
                  <Surface className="motion-lab__horizontal-card" key={item} padding="lg">
                    <h3>{item}</h3>
                    <p>Prueba interna para escenas desplazadas en horizontal sin overflow roto.</p>
                  </Surface>
                ))}
              </div>
            </div>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="motion-lab-velocity-title" id="motion-lab-velocity" ref={velocityRef}>
        <Container>
          <Stack gap="xl">
            <SectionHeader
              eyebrow="Velocity"
              title="Velocidad y dirección de scroll suavizadas."
              body="Esta demostración prepara futuras respuestas tipográficas o de imagen sin deformaciones agresivas."
            />
            <Grid columns="halves" gap="lg">
              <Surface padding="lg">
                <h3>Estado actual</h3>
                <p>Dirección: {velocityState.direction}</p>
                <p>Velocidad: {velocityState.velocity}</p>
              </Surface>
              <Surface className="motion-lab__velocity-card" padding="lg">
                <h3>Respuesta visual</h3>
                <p style={{ transform: `skewX(${velocityState.velocity * 0.4}deg)` }}>
                  El skew se limita y vuelve a cero para evitar mareo.
                </p>
              </Surface>
            </Grid>
          </Stack>
        </Container>
      </Section>
    </>
  )
}
