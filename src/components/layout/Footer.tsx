import { siteContact, siteServices } from '../../data/siteContent'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid site-container">
        <div>
          <p className="site-footer__brand">SUBEROS</p>
          <p className="site-footer__copy">
            Branding, fotografia profesional, impresion digital y desarrollo web.
          </p>
        </div>
        <div>
          <p className="site-footer__label">Servicios</p>
          <ul className="site-footer__list">
            {siteServices.map((service) => (
              <li key={service.id}>
                <a href={`#${service.id}`}>{service.title}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="site-footer__label">Contacto</p>
          <ul className="site-footer__list">
            <li>
              <a href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</a>
            </li>
            <li>
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            </li>
            <li>{siteContact.location}</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
