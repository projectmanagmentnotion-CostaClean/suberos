import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { homeAnchors } from '../../app/routes'
import { usePageHeadingFocus } from '../../lib/accessibility/usePageHeadingFocus'
import './not-found.css'

type NotFoundPageProps = {
  pathname: string
}

export function NotFoundPage({ pathname }: NotFoundPageProps) {
  usePageHeadingFocus('not-found-title')

  return (
    <Section aria-labelledby="not-found-title" className="not-found-page" data-qa="not-found-page" spacing="scene" tone="raised">
      <Container size="content">
        <Stack gap="xl">
          <Stack className="not-found-page__hero" gap="md">
            <p className="eyebrow">Ruta no disponible</p>
            <h1 id="not-found-title">No encontramos esta pagina.</h1>
            <p className="not-found-page__intro">
              La ruta <code>{pathname}</code> no forma parte del contenido publico actual de SUBEROS. Puedes volver a la home, revisar los servicios o ir directamente al contacto.
            </p>
          </Stack>

          <Surface padding="lg" tone="highlight">
            <Stack gap="md">
              <h2>Que puedes hacer ahora</h2>
              <p>La web publica actual se organiza como una SPA con anchors internos y rutas legales dedicadas.</p>
              <div className="not-found-page__actions">
                <Button href={homeAnchors.inicio} variant="primary">
                  Ir al inicio
                </Button>
                <Button href={homeAnchors.servicios} variant="ghost">
                  Ver servicios
                </Button>
                <Button href={homeAnchors.contacto} variant="secondary">
                  Ir a contacto
                </Button>
              </div>
            </Stack>
          </Surface>
        </Stack>
      </Container>
    </Section>
  )
}
