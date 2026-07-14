import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Divider } from '../../components/ui/Divider'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { homeContent } from '../../data/homeContent'
import { useScrollScene } from '../../motion/hooks/useScrollScene'
import { createStudioNarrativeScene } from '../../motion/scenes/createStudioNarrativeScene'

export function StudioSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const detailRef = useRef<HTMLElement | null>(null)
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([])

  useScrollScene(sectionRef, {
    dependencies: [homeContent.studio.statementLines.length],
    scene: (context) =>
      createStudioNarrativeScene(context, {
        detail: detailRef.current,
        lines: lineRefs.current.filter((line): line is HTMLSpanElement => Boolean(line)),
      }),
  })

  return (
    <Section aria-labelledby="estudio-title" className="studio-scene" id="estudio" ref={sectionRef}>
      <Container>
        <Grid className="studio-scene__grid" columns="content-aside" gap="lg">
          <Stack className="studio-scene__copy" gap="lg">
            <SectionHeader
              eyebrow={homeContent.studio.eyebrow}
              title={homeContent.studio.intro}
              titleId="estudio-title"
              width="wide"
            />
            <div className="studio-scene__statement">
              {homeContent.studio.statementLines.map((line, index) => (
                <span
                  className="studio-scene__line"
                  key={line}
                  ref={(element) => {
                    lineRefs.current[index] = element
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </Stack>

          <Surface className="studio-scene__detail" padding="lg" ref={detailRef}>
            <Stack gap="md">
              <p className="studio-scene__detail-label">Direccion editorial y produccion conectadas</p>
              <h3>{homeContent.studio.detailTitle}</h3>
              <p>{homeContent.studio.detailBody}</p>
              <Divider />
              <ul className="studio-scene__points">
                {homeContent.studio.detailPoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </Stack>
          </Surface>
        </Grid>
      </Container>
    </Section>
  )
}
