import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Surface } from '../../components/layout/Surface'
import { Divider } from '../../components/ui/Divider'
import { SectionHeader } from '../../components/ui/SectionHeader'
import { homeContent } from '../../data/homeContent'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { ContactAlternativeMethods } from './ContactAlternativeMethods'
import { ContactForm } from './ContactForm'
import './contact.css'

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, {
    selector: '.section-header, .contact-card, .contact-alternatives',
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
        <Grid className="contact-section__grid" columns="content-aside" gap="lg">
          <SectionHeader
            eyebrow="Contacto"
            title="Cuentanos que necesitas y te responderemos con una direccion clara."
            titleId="contact-title"
            body={homeContent.contact.body}
          />
          <Surface className="contact-card" padding="lg" tone="highlight">
            <p className="contact-section__lead">{homeContent.contact.closingLead}</p>
            <ContactForm />
            <Divider />
            <ContactAlternativeMethods />
          </Surface>
        </Grid>
      </Container>
    </Section>
  )
}
