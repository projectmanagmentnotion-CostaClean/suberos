import { ScrollAccent } from '../../components/motion/ScrollAccent'
import { ButtonLink } from '../../components/ui/ButtonLink'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { homeContent, siteServices } from '../../data/siteContent'
import { ContactSection } from '../contact/ContactSection'

export function HomePage() {
  return (
    <>
      <section className="hero section-spacing" id="top" aria-labelledby="home-title">
        <div className="site-container hero__layout">
          <div className="hero__copy">
            <p className="hero__eyebrow">{homeContent.heroEyebrow}</p>
            <h1 id="home-title">{homeContent.heroTitle}</h1>
            <p className="hero__body">{homeContent.heroBody}</p>
            <div className="hero__actions">
              <ButtonLink href="#contacto" tone="primary">
                {homeContent.heroPrimaryCta}
              </ButtonLink>
              <ButtonLink href="#servicios" tone="ghost">
                {homeContent.heroSecondaryCta}
              </ButtonLink>
            </div>
          </div>
          <div className="hero__panel" aria-label="Marca SUBEROS">
            <img
              className="hero__panel-logo"
              src="/branding/suberos-logo-symbol.webp"
              alt="Simbolo de SUBEROS"
              width="494"
              height="512"
            />
            <div className="hero__panel-copy">
              <span>Baseline Sprint 01</span>
              <p>Arquitectura, accesibilidad, SEO y motion listos para crecer.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing" id="estudio" aria-labelledby="estudio-title">
        <div className="site-container stack-lg">
          <ScrollAccent label="Motion validation" />
          <SectionHeader
            eyebrow="Que es SUBEROS"
            title={homeContent.manifestoTitle}
            body={homeContent.manifestoBody}
          />
          <div className="manifesto-grid">
            <article className="surface-card">
              <h3>Contenido real</h3>
              <p>
                El baseline se apoya en servicios y datos confirmados de la web actual: branding, fotografia,
                impresion digital, desarrollo web, telefono, email y ubicacion.
              </p>
            </article>
            <article className="surface-card">
              <h3>Motion seguro</h3>
              <p>
                GSAP, ScrollTrigger y Lenis quedan centralizados con limpieza, reduced motion real y una
                animacion de validacion ligada al scroll.
              </p>
            </article>
            <article className="surface-card">
              <h3>Escalabilidad</h3>
              <p>
                La estructura ya separa layout, features, data, hooks y librerias para facilitar escenas
                cinematograficas posteriores sin rehacer la base.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-spacing" id="servicios" aria-labelledby="services-title">
        <div className="site-container stack-lg">
          <SectionHeader
            eyebrow="Servicios"
            title="Capacidades confirmadas en la web actual, ordenadas para una experiencia mas clara."
          />
          <div className="service-grid">
            {siteServices.map((service, index) => (
              <article className="service-card" id={service.id} key={service.id}>
                <span className="service-card__index">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <a href="#contacto">Solicitar informacion</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
    </>
  )
}
