import { homeAnchors } from '../../app/routes'
import { useRef } from 'react'

import { Bleed } from '../../components/layout/Bleed'
import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { EditorialMedia } from '../../components/ui/EditorialMedia'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { AssetPlaceholder } from '../../components/ui/AssetPlaceholder'
import { homeContent } from '../../data/homeContent'
import { workShowcaseDisciplines, workShowcaseNotes } from '../../data/workShowcase'
import { useElementReveal } from '../../motion/hooks/useElementReveal'

export function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, {
    selector: '.section-header, .work-spotlight, .work-spotlight__aside, .work-spotlight__note',
  })

  return (
    <Section aria-labelledby="work-title" className="work-scene" data-qa="section-work" id="trabajo" ref={sectionRef}>
      <Container>
        <Stack gap="xl">
          <SectionHeader
            body={homeContent.work.body}
            eyebrow={homeContent.work.eyebrow}
            title={homeContent.work.title}
            titleId="work-title"
            width="wide"
          />

          <Grid className="work-spotlight" columns="halves" gap="lg">
            <Bleed inset="md">
              <EditorialMedia className="work-spotlight__media">
                <AssetPlaceholder
                  label="SUBEROS visual portfolio"
                  title="Fotografia, identidad, produccion y web"
                  variant="discipline-grid"
                />
              </EditorialMedia>
            </Bleed>

            <Stack className="work-spotlight__aside" gap="lg">
              <Surface padding="lg" tone="highlight">
                <p className="work-spotlight__label">{homeContent.work.eyebrow}</p>
                <h3>{homeContent.work.asideTitle}</h3>
                <p>{homeContent.work.asideBody}</p>
                <ul className="work-spotlight__disciplines">
                  {workShowcaseDisciplines.map((discipline) => (
                    <li key={discipline.id}>
                      <strong>{discipline.title}</strong>
                      <span>{discipline.summary}</span>
                    </li>
                  ))}
                </ul>
                <Stack className="work-spotlight__actions" gap="sm">
                  <Button href={homeAnchors.servicios} variant="primary">
                    Ver servicios
                  </Button>
                  <Button href={homeAnchors.contacto} variant="ghost">
                    Cuentanos tu proyecto
                  </Button>
                </Stack>
              </Surface>

              <Surface className="work-spotlight__note" padding="lg">
                <Stack gap="md">
                  <p className="work-spotlight__label">{homeContent.work.notesTitle}</p>
                  <Divider />
                  <ul className="work-spotlight__notes">
                    {workShowcaseNotes.map((note) => (
                      <li key={note}>{note}</li>
                    ))}
                  </ul>
                </Stack>
              </Surface>
            </Stack>
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
