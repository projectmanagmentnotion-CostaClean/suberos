import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Divider } from '../../components/ui/Divider'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { homeContent } from '../../data/homeContent'
import { processSteps } from '../../data/processSteps'
import { useElementReveal } from '../../motion/hooks/useElementReveal'

export function ProcessSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, { selector: '.section-header, .divider, .process-scene__step' })

  return (
    <Section aria-labelledby="process-title" className="process-scene" data-qa="section-process" id="proceso" ref={sectionRef} tone="raised">
      <Container>
        <Stack gap="xl">
          <SectionHeader
            body={homeContent.process.body}
            eyebrow={homeContent.process.eyebrow}
            title={homeContent.process.title}
            titleId="process-title"
            width="wide"
          />
          <Divider />
          <Grid className="process-scene__grid" columns="cards" gap="md">
            {processSteps.map((step) => (
              <Surface as="article" className="process-scene__step" key={step.id} padding="lg">
                <p className="process-scene__index">{step.index}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </Surface>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
