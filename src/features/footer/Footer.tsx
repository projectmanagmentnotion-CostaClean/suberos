import { Cluster } from '../../components/layout/Cluster'
import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { TextLink } from '../../components/ui/TextLink'
import { siteContact, siteNavigation, siteServices } from '../../data/siteContent'

const currentYear = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Grid className="site-footer__grid" columns="cards" gap="lg">
          <div className="site-footer__column">
            <p className="site-footer__brand">SUBEROS</p>
            <p className="site-footer__copy">
              Branding, fotografia profesional, impresion digital y diseno y desarrollo web con datos y
              contacto confirmados en la web publica actual.
            </p>
            <TextLink href="#inicio">Volver arriba</TextLink>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__label">Navegacion</p>
            <ul className="site-footer__list">
              {siteNavigation.map((item) => (
                <li key={item.href}>
                  <TextLink href={item.href}>{item.label}</TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__label">Servicios</p>
            <ul className="site-footer__list">
              {siteServices.map((service) => (
                <li key={service.id}>
                  <TextLink href={`#${service.id}`}>{service.title}</TextLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="site-footer__column">
            <p className="site-footer__label">Contacto</p>
            <ul className="site-footer__list">
              <li>
                <TextLink href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</TextLink>
              </li>
              <li>
                <TextLink href={`mailto:${siteContact.email}`}>{siteContact.email}</TextLink>
              </li>
              <li>{siteContact.location}</li>
            </ul>
          </div>
        </Grid>

        <Cluster as="div" className="site-footer__bottom" gap="md" justify="between">
          <Cluster as="ul" className="site-footer__legal" gap="sm">
            <li>
              <TextLink href="/legal/aviso-legal.html">Aviso legal</TextLink>
            </li>
            <li>
              <TextLink href="/legal/privacidad.html">Privacidad</TextLink>
            </li>
            <li>
              <TextLink href="/legal/cookies.html">Cookies</TextLink>
            </li>
          </Cluster>
          <p className="site-footer__meta">© {currentYear} SUBEROS</p>
        </Cluster>
      </Container>
    </footer>
  )
}
