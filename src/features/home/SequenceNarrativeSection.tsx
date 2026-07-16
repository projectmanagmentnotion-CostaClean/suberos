import { useEffect, useMemo } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { homeAnchors } from '../../app/routes'
import { homeContent } from '../../data/homeContent'
import { FrameSequenceScene } from '../frame-sequence/FrameSequenceScene'
import { FrameSequenceController } from '../../motion/sequences/FrameSequenceController'
import { getSequenceLabManifest } from '../../motion/sequences/sequenceManifest'

export function SequenceNarrativeSection() {
  const controller = useMemo(() => new FrameSequenceController(), [])
  const manifest = useMemo(() => getSequenceLabManifest(), [])

  useEffect(() => {
    return () => {
      controller.dispose()
    }
  }, [controller])

  return (
    <Section
      aria-labelledby="sequence-narrative-title"
      className="sequence-narrative"
      data-qa="section-sequence-narrative"
      spacing="scene"
    >
      <Container>
        <Stack gap="xl">
          <div className="sequence-narrative__intro">
            <p className="sequence-narrative__eyebrow">{homeContent.sequence.eyebrow}</p>
            <div className="sequence-narrative__heading">
              <h2 id="sequence-narrative-title">{homeContent.sequence.title}</h2>
              <p>{homeContent.sequence.body}</p>
            </div>
          </div>

          <FrameSequenceScene
            className="sequence-narrative__scene"
            controller={controller}
            fallbackAlt="Secuencia editorial abstracta de SUBEROS que representa la union entre imagen, soporte y experiencia digital."
            internalLabel={homeContent.sequence.badge}
            manifest={manifest}
            scrub={0.5}
          >
            <Grid className="sequence-narrative__overlay" columns="halves" gap="lg">
              <Surface className="sequence-narrative__panel" padding="lg">
                <p className="sequence-narrative__label">Direccion integrada</p>
                <h3>{homeContent.sequence.panelTitle}</h3>
                <p>{homeContent.sequence.panelBody}</p>
              </Surface>
              <div className="sequence-narrative__aside">
                <ul className="sequence-narrative__points">
                  {homeContent.sequence.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <Button href={homeAnchors.contacto} size="small" variant="secondary">
                  {homeContent.sequence.cta}
                </Button>
              </div>
            </Grid>
          </FrameSequenceScene>
        </Stack>
      </Container>
    </Section>
  )
}
