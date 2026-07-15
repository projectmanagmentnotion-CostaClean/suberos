import { useEffect, useMemo, useSyncExternalStore } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { ApprovalBadge } from '../../components/ui/ApprovalBadge'
import { Button } from '../../components/ui/Button'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import { usePageHeadingFocus } from '../../lib/accessibility/usePageHeadingFocus'
import { FrameSequenceScene } from '../frame-sequence/FrameSequenceScene'
import { FrameSequenceController } from '../../motion/sequences/FrameSequenceController'
import { getSequenceLabManifest } from '../../motion/sequences/sequenceManifest'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import '../portfolio-lab/portfolio-lab.css'

export function SequenceLabPage() {
  const controller = useMemo(() => new FrameSequenceController(), [])
  const preferences = useMotionPreferences()
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot, controller.getSnapshot)
  const params = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search)
  const shouldFailAssets = params?.get('asset-fail') === '1'
  const manifest = useMemo(() => getSequenceLabManifest({ failFrames: shouldFailAssets }), [shouldFailAssets])

  usePageHeadingFocus('sequence-lab-title')

  useEffect(() => {
    return () => {
      controller.dispose()
    }
  }, [controller])

  return (
    <div className="portfolio-lab" id="sequence-lab-root">
      <Section aria-labelledby="sequence-lab-title" className="portfolio-lab__section" spacing="scene">
        <Container>
          <Stack gap="xl">
            <Stack className="section-header section-header--wide portfolio-lab__hero" gap="sm">
              <p className="eyebrow">Internal sequence QA</p>
              <h1 id="sequence-lab-title">Sequence Lab</h1>
              <p className="section-header__body">
                Laboratorio interno para validar un motor canvas scroll-linked con fallback, reduced motion, carga
                progresiva y control de memoria antes de integrar secuencias reales de SUBEROS.
              </p>
            </Stack>

            <Grid columns="thirds" gap="md">
              <h2 className="sr-only">Resumen del laboratorio</h2>
              <Surface padding="lg">
                <h3>Motion profile</h3>
                <p>{preferences.profile}</p>
              </Surface>
              <Surface padding="lg">
                <h3>Canvas state</h3>
                <p>{state.canvasActive ? 'Active' : 'Fallback only'}</p>
              </Surface>
              <Surface padding="lg">
                <h3>Asset fail</h3>
                <p>{shouldFailAssets ? 'Forced' : 'Normal'}</p>
              </Surface>
            </Grid>

            <Surface padding="lg" tone="highlight">
              <Stack gap="md">
                <div className="portfolio-lab__tag-row">
                  <ApprovalBadge tone="review">Internal only</ApprovalBadge>
                  <ApprovalBadge tone="warning">Noindex</ApprovalBadge>
                  <ApprovalBadge tone={manifest.publicationApproved ? 'approved' : 'warning'}>
                    {manifest.publicationApproved ? 'Approved' : 'Private lab asset'}
                  </ApprovalBadge>
                </div>
                <p>La secuencia del laboratorio es abstracta, propia y no representa ningun proyecto real publicado.</p>
                <TextLink href="#sequence-lab-scene">Ir a la escena tecnica</TextLink>
              </Stack>
            </Surface>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="sequence-lab-scene-title" className="portfolio-lab__section" id="sequence-lab-scene">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              action={
                <Button
                  aria-pressed={state.paused}
                  onClick={() => controller.setPaused(!state.paused)}
                  size="small"
                  variant="secondary"
                >
                  {state.paused ? 'Resume loader' : 'Pause loader'}
                </Button>
              }
              body="La escena usa posters y fallback siempre presentes en HTML. El canvas solo se activa cuando el perfil, el viewport y el estado de la pestana lo permiten."
              eyebrow="Canvas engine"
              title="Abstract motion sequence"
              titleId="sequence-lab-scene-title"
              width="wide"
            />

            <FrameSequenceScene
              controller={controller}
              debug={true}
              fallbackAlt="Fallback estatico de la secuencia abstracta del laboratorio interno de SUBEROS"
              internalLabel="Sequence QA only"
              manifest={manifest}
            >
              <Grid columns="halves" gap="lg">
                <Surface padding="lg">
                  <h3>Scroll integration</h3>
                  <p>
                    Un unico ScrollTrigger controla el progreso del frame. No se crea un ticker paralelo ni una segunda
                    instancia global de RAF.
                  </p>
                </Surface>
                <Surface padding="lg">
                  <h3>Reduced motion</h3>
                  <p>En `reduced` la secuencia no carga frames y la escena cae a fallback estatico legible sin pin ni scrub.</p>
                </Surface>
              </Grid>
            </FrameSequenceScene>
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
