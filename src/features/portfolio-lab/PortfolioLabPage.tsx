import { useEffect, useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { ApprovalBadge } from '../../components/ui/ApprovalBadge'
import { AssetPlaceholder } from '../../components/ui/AssetPlaceholder'
import { Button } from '../../components/ui/Button'
import { ProjectDraftCard } from '../../components/ui/ProjectDraftCard'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import {
  getPortfolioProjectsByStatus,
  getPortfolioValidationSummary,
  portfolioProjects,
} from '../../data/portfolioProjects'
import { refreshManager } from '../../motion/core/refreshManager'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { useMotionPreferences } from '../../motion/hooks/useMotionPreferences'
import './portfolio-lab.css'

function DraftPreviewContent() {
  const summary = getPortfolioValidationSummary()
  const reviewItems = getPortfolioProjectsByStatus('review')
  const approvedItems = getPortfolioProjectsByStatus('approved')

  return (
    <Stack gap="xl">
      <Grid columns="thirds" gap="md">
        <Surface padding="lg">
          <h3>Drafts</h3>
          <p>{getPortfolioProjectsByStatus('draft').length}</p>
        </Surface>
        <Surface padding="lg">
          <h3>Review / Approved</h3>
          <p>
            {reviewItems.length} / {approvedItems.length}
          </p>
        </Surface>
        <Surface padding="lg">
          <h3>Blocking issues</h3>
          <p>{summary.blockingCount}</p>
        </Surface>
      </Grid>

      {portfolioProjects.length > 0 ? (
        <Grid columns="cards" gap="lg">
          {portfolioProjects.map((project) => (
            <Surface key={project.id} padding="lg">
              <ProjectDraftCard project={project} />
            </Surface>
          ))}
        </Grid>
      ) : (
        <Surface className="portfolio-lab__empty-state" padding="lg" tone="highlight">
          <Stack gap="md">
            <ApprovalBadge tone="warning">No portfolio items loaded</ApprovalBadge>
            <p>El laboratorio queda listo para revisar drafts reales cuando SUBEROS disponga de assets, copy y permisos.</p>
          </Stack>
        </Surface>
      )}
    </Stack>
  )
}

export function PortfolioLabPage() {
  const preferences = useMotionPreferences()
  const summary = getPortfolioValidationSummary()
  const rootRef = useRef<HTMLDivElement | null>(null)

  useElementReveal(rootRef, {
    selector: '.portfolio-lab__reveal',
  })

  useEffect(() => {
    const previousTitle = document.title
    const robotsMeta = document.querySelector('meta[name="robots"]')
    const previousRobots = robotsMeta?.getAttribute('content') ?? null

    document.title = 'SUBEROS Portfolio Lab'
    robotsMeta?.setAttribute('content', 'noindex,nofollow')
    refreshManager.requestRefresh('layout-change')

    return () => {
      document.title = previousTitle
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute('content', previousRobots)
      } else if (robotsMeta) {
        robotsMeta.removeAttribute('content')
      }
    }
  }, [])

  return (
    <div className="portfolio-lab" id="portfolio-lab-root" ref={rootRef}>
      <Section aria-labelledby="portfolio-lab-title" className="portfolio-lab__section" spacing="scene">
        <Container>
          <Stack gap="xl">
            <Stack className="section-header section-header--wide portfolio-lab__hero" gap="sm">
              <p className="eyebrow">Internal portfolio QA</p>
              <h1 id="portfolio-lab-title">Portfolio Lab</h1>
              <p className="section-header__body">
                Laboratorio interno no indexable para revisar readiness, vacios de media, estados de aprobacion y composiciones editoriales antes de publicar cualquier portfolio real.
              </p>
            </Stack>

            <Grid columns="thirds" gap="md">
              <Surface className="portfolio-lab__reveal" padding="lg">
                <h3>Profile</h3>
                <p>{preferences.profile}</p>
              </Surface>
              <Surface className="portfolio-lab__reveal" padding="lg">
                <h3>Published items</h3>
                <p>{summary.publishedCount}</p>
              </Surface>
              <Surface className="portfolio-lab__reveal" padding="lg">
                <h3>Warnings / Pending</h3>
                <p>
                  {summary.warningCount} / {summary.pendingCount}
                </p>
              </Surface>
            </Grid>

            <Surface className="portfolio-lab__reveal" padding="lg" tone="highlight">
              <Stack gap="md">
                <div className="portfolio-lab__tag-row">
                  <ApprovalBadge tone="review">Internal only</ApprovalBadge>
                  <ApprovalBadge tone="warning">Noindex</ApprovalBadge>
                </div>
                <p>El Portfolio Lab no se enlaza desde la navegacion publica, no entra en sitemap y solo se activa mediante `?portfolio-lab=1`.</p>
                <TextLink href="#trabajo">Volver al bloque publico de trabajo</TextLink>
              </Stack>
            </Surface>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="portfolio-lab-system-title" className="portfolio-lab__section">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              body="Estas ranuras sirven para revisar hero, metadata, galeria, bloques editoriales y placeholders sin inventar proyectos."
              eyebrow="System preview"
              title="Visual readiness shells"
              titleId="portfolio-lab-system-title"
              width="wide"
            />

            <Grid columns="content-aside" gap="lg">
              <Surface className="portfolio-lab__reveal" padding="lg" tone="highlight">
                <AssetPlaceholder label="Hero slot" title="Approved media required" variant="hero" />
              </Surface>
              <Stack gap="lg">
                <Surface className="portfolio-lab__reveal" padding="lg">
                  <h3>Metadata slot</h3>
                  <p>Cliente, ano, servicios, SEO y permisos se revisan aqui antes de publicar.</p>
                </Surface>
                <Surface className="portfolio-lab__reveal" padding="lg">
                  <h3>Gallery slot</h3>
                  <p>Las galerias no deben usar media sin dimensiones, ownership o alt validados.</p>
                </Surface>
                <Surface className="portfolio-lab__reveal" padding="lg">
                  <h3>Editorial blocks</h3>
                  <p>Contexto, enfoque, proceso y resultados solo aparecen cuando el contenido existe y esta aprobado.</p>
                </Surface>
              </Stack>
            </Grid>
          </Stack>
        </Container>
      </Section>

      <Section aria-labelledby="portfolio-lab-projects-title" className="portfolio-lab__section" tone="raised">
        <Container>
          <Stack gap="xl">
            <SectionHeader
              body="Revision de estados, errores bloqueantes y vacios de datos para cualquier elemento del portfolio."
              eyebrow="Readiness"
              title="Drafts and approvals"
              titleId="portfolio-lab-projects-title"
              width="wide"
              action={
                <Button onClick={() => refreshManager.requestRefresh('layout-change')} size="small" variant="secondary">
                  Refresh lab
                </Button>
              }
            />
            <DraftPreviewContent />
          </Stack>
        </Container>
      </Section>
    </div>
  )
}
