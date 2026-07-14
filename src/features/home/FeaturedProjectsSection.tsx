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
import { homeContent } from '../../data/homeContent'
import { featuredProjects } from '../../data/featuredProjects'
import { useElementReveal } from '../../motion/hooks/useElementReveal'

const publishedProjects = featuredProjects.filter((project) => project.status === 'published')

export function FeaturedProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, {
    selector: '.section-header, .project-spotlight, .project-spotlight__aside, .project-spotlight__note',
  })

  return (
    <Section aria-labelledby="projects-title" className="projects-scene" id="proyectos" ref={sectionRef}>
      <Container>
        <Stack gap="xl">
          <SectionHeader
            body={homeContent.projects.body}
            eyebrow={homeContent.projects.eyebrow}
            title={homeContent.projects.title}
            titleId="projects-title"
            width="wide"
          />

          {publishedProjects.map((project) => (
            <Grid className="project-spotlight" columns="halves" gap="lg" key={project.slug}>
              <Bleed inset="md">
                <MediaFrame
                  caption="Composicion editorial temporal mientras se aprueban capturas finales del proyecto."
                  media={
                    <div aria-hidden="true" className="project-spotlight__visual">
                      <div className="project-spotlight__screen project-spotlight__screen--phone">
                        <span>{project.name}</span>
                        <small>{project.category}</small>
                      </div>
                      <div className="project-spotlight__screen project-spotlight__screen--card">
                        <small>Mobile-first</small>
                        <span>Carta digital</span>
                      </div>
                      <div className="project-spotlight__rings" />
                    </div>
                  }
                  ratio="cinema"
                />
              </Bleed>

              <Stack className="project-spotlight__aside" gap="lg">
                <Surface padding="lg" tone="highlight">
                  <p className="project-spotlight__label">{project.category}</p>
                  <h3>{project.name}</h3>
                  <p>{project.summary}</p>
                  <p>{project.description}</p>
                  <ul className="project-spotlight__services">
                    {project.services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                  <Button href={project.href} variant="primary">
                    {project.linkLabel}
                  </Button>
                </Surface>

                <Surface className="project-spotlight__note" padding="lg">
                  <Stack gap="md">
                    <p className="project-spotlight__label">Estado del caso</p>
                    <Divider />
                    <ul className="project-spotlight__notes">
                      {project.notes.map((note) => (
                        <li key={note}>{note}</li>
                      ))}
                    </ul>
                    <p>{homeContent.projects.pendingNote}</p>
                  </Stack>
                </Surface>
              </Stack>
            </Grid>
          ))}
        </Stack>
      </Container>
    </Section>
  )
}
