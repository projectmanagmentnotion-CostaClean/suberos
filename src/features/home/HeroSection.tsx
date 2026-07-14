import { useMemo, useRef } from 'react'

import { Cluster } from '../../components/layout/Cluster'
import { Container } from '../../components/layout/Container'
import { Grid } from '../../components/layout/Grid'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { Surface } from '../../components/layout/Surface'
import { Button } from '../../components/ui/Button'
import { Divider } from '../../components/ui/Divider'
import { homeContent } from '../../data/homeContent'
import { siteContact } from '../../data/siteContent'
import { siteServices } from '../../data/services'
import { useScrollScene } from '../../motion/hooks/useScrollScene'
import { createHeroFoundationScene } from '../../motion/scenes/createHeroFoundationScene'
import './hero.css'

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null)
  const titleRef = useRef<HTMLHeadingElement | null>(null)
  const titleLineRefs = useRef<Array<HTMLSpanElement | null>>([])
  const visualRef = useRef<HTMLElement | null>(null)
  const accentRef = useRef<HTMLDivElement | null>(null)
  const metadataRef = useRef<HTMLDivElement | null>(null)
  const scrollCueRef = useRef<HTMLAnchorElement | null>(null)
  const heroServices = useMemo(() => siteServices.map((service) => service.title), [])

  useScrollScene(heroRef, {
    dependencies: [heroServices.length],
    scene: (context) =>
      createHeroFoundationScene(context, {
        accent: accentRef.current,
        headline: titleRef.current,
        lines: titleLineRefs.current.filter((line): line is HTMLSpanElement => Boolean(line)),
        metadata: metadataRef.current,
        scrollCue: scrollCueRef.current,
        visual: visualRef.current,
      }),
  })

  return (
    <Section
      aria-labelledby="home-title"
      className="hero hero-foundation"
      id="inicio"
      ref={heroRef}
      tone="hero"
      spacing="scene"
    >
      <Container>
        <Grid className="hero-foundation__layout" columns="content-aside" gap="lg">
          <Stack className="hero-foundation__copy" gap="lg">
            <div>
              <p className="hero__eyebrow hero-foundation__eyebrow">{homeContent.hero.eyebrow}</p>
              <h1 aria-label={homeContent.hero.title} className="hero-foundation__title" id="home-title" ref={titleRef}>
                {homeContent.hero.titleLines.map((line, index) => (
                  <span
                    className="hero-foundation__line"
                    key={line}
                    ref={(element) => {
                      titleLineRefs.current[index] = element
                    }}
                  >
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            <p className="hero__body hero-foundation__body">{homeContent.hero.body}</p>

            <Cluster className="hero__actions" gap="sm">
              <Button href="#proyectos" size="large" variant="primary">
                {homeContent.hero.primaryCta}
              </Button>
              <Button href="#contacto" size="large" variant="ghost">
                {homeContent.hero.secondaryCta}
              </Button>
            </Cluster>

            <div className="hero-foundation__meta" ref={metadataRef}>
              <div className="hero-foundation__services" aria-label="Servicios clave">
                {heroServices.map((service) => (
                  <span key={service}>{service}</span>
                ))}
              </div>
              <div className="hero-foundation__contact" aria-label="Contacto principal">
                <span>{siteContact.location}</span>
                <span>{siteContact.email}</span>
                <span>{siteContact.phoneDisplay}</span>
              </div>
            </div>

            <a className="hero-foundation__scroll" href="#estudio" ref={scrollCueRef}>
              <span className="hero-foundation__scroll-dot" aria-hidden="true" />
              <span>{homeContent.hero.scrollLabel}</span>
            </a>
          </Stack>

          <div className="hero-foundation__visual-wrap">
            <div aria-hidden="true" className="hero-foundation__accent" ref={accentRef} />
            <Surface className="hero-foundation__visual" padding="lg" ref={visualRef} tone="highlight">
              <div aria-hidden="true" className="hero-foundation__grid" />
              <div aria-hidden="true" className="hero-foundation__orbital" />

              <div className="hero-foundation__visual-head">
                <span className="hero-foundation__visual-label">{homeContent.hero.visualEyebrow}</span>
                <p>{homeContent.hero.visualBody}</p>
              </div>

              <div className="hero-foundation__emblem" data-hero-emblem>
                <picture>
                  <source srcSet="/branding/suberos-logo-symbol.webp" type="image/webp" />
                  <img
                    alt="Simbolo de SUBEROS"
                    decoding="async"
                    fetchPriority="high"
                    height="512"
                    src="/branding/suberos-logo-symbol.webp"
                    width="494"
                  />
                </picture>
              </div>

              <div className="hero-foundation__visual-foot">
                <Divider />
                <div className="hero-foundation__divider" data-hero-divider>
                  <Divider />
                </div>
                <p>{homeContent.hero.visualCaption}</p>
              </div>
            </Surface>
          </div>
        </Grid>
      </Container>
    </Section>
  )
}
