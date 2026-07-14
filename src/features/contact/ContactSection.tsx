import { SectionHeader } from '../../components/ui/SectionHeader'
import { homeContent, siteContact, siteServices } from '../../data/siteContent'

export function ContactSection() {
  return (
    <section className="contact-section section-spacing" id="contacto" aria-labelledby="contact-title">
      <div className="site-container contact-section__grid">
        <SectionHeader
          eyebrow="Contacto"
          title="Cuentanos que necesitas y te responderemos con una direccion clara."
          body={homeContent.contactBody}
        />
        <div className="contact-card">
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
            <button className="button-link button-link--primary" type="submit">
              Enviar briefing
            </button>
          </form>
          <div className="contact-card__meta">
            <p>
              <strong>Telefono</strong>
              <a href={`tel:${siteContact.phoneHref}`}>{siteContact.phoneDisplay}</a>
            </p>
            <p>
              <strong>Email</strong>
              <a href={`mailto:${siteContact.email}`}>{siteContact.email}</a>
            </p>
            <p>
              <strong>Ubicacion</strong>
              <span>{siteContact.location}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
