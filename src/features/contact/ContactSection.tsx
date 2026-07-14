import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { TextLink } from '../../components/ui/TextLink'
import { homeContent, siteContact, siteServices } from '../../data/siteContent'

export function ContactSection() {
  return (
    <Section className="contact-section" id="contacto" aria-labelledby="contact-title" tone="raised">
      <Container>
        <Grid className="contact-section__grid" columns="content-aside" gap="lg">
          <SectionHeader
            eyebrow="Contacto"
            title="Cuentanos que necesitas y te responderemos con una direccion clara."
            body={homeContent.contactBody}
          />
          <Surface className="contact-card" padding="lg" tone="highlight">
            <form className="contact-form" action={`mailto:${siteContact.email}`} method="post" encType="text/plain">
              <label>
                Nombre
                <input type="text" name="nombre" autoComplete="name" required />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Servicio
                <select name="servicio" defaultValue="" required>
                  <option value="" disabled>
                    Selecciona un servicio
                  </option>
                  {siteServices.map((service) => (
                    <option key={service.id} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Proyecto
                <textarea name="proyecto" rows={5} required />
              </label>
              <Button type="submit" variant="primary">
                Enviar briefing
              </Button>
            </form>
            <Divider />
            <Stack className="contact-card__meta" gap="sm">
              <p>
                <strong>Telefono</strong>
                <TextLink href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</TextLink>
              </p>
              <p>
                <strong>Email</strong>
                <TextLink href={`mailto:${siteContact.email}`}>{siteContact.email}</TextLink>
              </p>
              <p>
                <strong>Ubicacion</strong>
                <span>{siteContact.location}</span>
              </p>
            </Stack>
          </Surface>
        </Grid>
      </Container>
    </Section>
  )
}
