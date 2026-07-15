import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { homeContent } from '../../data/homeContent'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { ContactAlternativeMethods } from './ContactAlternativeMethods'
import { ContactForm } from './ContactForm'
import './contact.css'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, {
    selector: '.contact-section__intro, .contact-section__info, .contact-form-shell',
  })

  return (
    <Section
      ref={sectionRef}
      className="contact-section"
      data-qa="section-contact"
      id="contacto"
      aria-labelledby="contact-title"
      tone="raised"
    >
      <Container>
        <div className="contact-section__intro">
          <p className="contact-section__eyebrow">Contacto</p>
          <div className="contact-section__heading">
            <h2 id="contact-title">Cuentanos el proyecto y cerramos la web con una conversacion clara.</h2>
            <p>{homeContent.contact.body}</p>
          </div>
        </div>

        <div className="contact-section__layout">
          <div className="contact-section__info">
            <p className="contact-section__lead">{homeContent.contact.closingLead}</p>
            <ContactAlternativeMethods />
          </div>

          <div className="contact-form-shell">
            <ContactForm />
          </div>
        </div>
      </Container>
    </Section>
  )
}
