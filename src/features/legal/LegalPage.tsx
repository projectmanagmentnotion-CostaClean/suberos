import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { TextLink } from '../../components/ui/TextLink'
import { homeAnchors, legalPaths } from '../../app/routes'
import { legalPageContent } from '../../data/legalContent'
import { usePageHeadingFocus } from '../../lib/accessibility/usePageHeadingFocus'
import './legal-pages.css'

type LegalPageProps = {
  slug: keyof typeof legalPageContent
}

export function LegalPage({ slug }: LegalPageProps) {
  const documentContent = legalPageContent[slug]

  usePageHeadingFocus('legal-page-title')

  return (
    <Section aria-labelledby="legal-page-title" className="legal-page" data-qa="legal-page" spacing="scene" tone="raised">
      <Container size="content">
        <Stack gap="xl">
          <Stack className="legal-page__hero" gap="md">
            <p className="eyebrow">Informacion publica provisional</p>
            <h1 id="legal-page-title">{documentContent.title}</h1>
            <p className="legal-page__intro">{documentContent.intro}</p>
            <Surface className="legal-page__status" padding="lg" tone="highlight">
              <p>{documentContent.statusNote}</p>
              <p className="legal-page__updated">Actualizado: {documentContent.updatedAt}</p>
            </Surface>
          </Stack>

          <Stack className="legal-page__sections" gap="lg">
            {documentContent.sections.map((section) => (
              <Surface key={section.title} padding="lg">
                <Stack gap="md">
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.bullets ? (
                    <ul className="legal-page__list">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </Stack>
              </Surface>
            ))}
          </Stack>

          <Surface padding="lg">
            <Stack gap="md">
              <h2>Siguientes enlaces utiles</h2>
              <div className="legal-page__links">
                <TextLink href={homeAnchors.inicio}>Volver al inicio</TextLink>
                <TextLink href={homeAnchors.contacto}>Ir a contacto</TextLink>
                {slug !== 'aviso-legal' ? <TextLink href={legalPaths.avisoLegal}>Aviso legal</TextLink> : null}
                {slug !== 'privacidad' ? <TextLink href={legalPaths.privacidad}>Privacidad</TextLink> : null}
                {slug !== 'cookies' ? <TextLink href={legalPaths.cookies}>Cookies</TextLink> : null}
                {slug !== 'accesibilidad' ? (
                  <TextLink href={legalPaths.accesibilidad}>Accesibilidad</TextLink>
                ) : null}
              </div>
            </Stack>
          </Surface>
        </Stack>
      </Container>
    </Section>
  )
}
