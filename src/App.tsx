import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const services = [
  {
    title: 'Fotografía profesional',
    copy: 'Creamos imágenes capaces de detener el scroll, elevar la percepción de tu marca y convertir atención en deseo.',
    href: '#fotografia',
  },
  {
    title: 'Diseño gráfico y branding',
    copy: 'Construimos identidades visuales, campañas y piezas gráficas coherentes, memorables y preparadas para crecer.',
    href: '#branding',
  },
  {
    title: 'Impresión y producción',
    copy: 'Llevamos el diseño al mundo físico con materiales, acabados y producción orientados a conseguir un resultado real.',
    href: '#impresion',
  },
  {
    title: 'Diseño y desarrollo web',
    copy: 'Diseñamos experiencias digitales rápidas, accesibles, emocionales y enfocadas en contacto, confianza y conversión.',
    href: '#web',
  },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const intro = gsap.timeline({ onComplete: () => setLoaded(true) })

      if (reduced) {
        gsap.set('.preloader', { display: 'none' })
        setLoaded(true)
      } else {
        intro
          .to('.preloader__count', { textContent: 100, duration: 1.15, snap: { textContent: 1 }, ease: 'power2.inOut' })
          .to('.preloader__line', { scaleX: 1, duration: 1.15, ease: 'power3.inOut' }, 0)
          .to('.preloader__word', { letterSpacing: '0.04em', opacity: 1, duration: 0.8 }, 0.2)
          .to('.preloader', { yPercent: -100, duration: 1, ease: 'power4.inOut' })
      }

      if (!reduced) {
        gsap.from('.hero__eyebrow, .hero__title span, .hero__copy, .hero__actions', {
          yPercent: 110,
          opacity: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: 'power4.out',
          delay: 1.7,
        })

        gsap.to('.hero__title', {
          yPercent: -18,
          scale: 0.93,
          ease: 'none',
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 },
        })

        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.from(element, {
            y: 80,
            opacity: 0,
            duration: 1.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 84%', once: true },
          })
        })

        gsap.utils.toArray<HTMLElement>('.service-card').forEach((card, index) => {
          gsap.from(card, {
            y: 90 + index * 10,
            opacity: 0,
            rotateX: 8,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          })
        })
      }
    },
    { scope: root },
  )

  return (
    <div ref={root} className={loaded ? 'site is-loaded' : 'site'}>
      <div className="preloader" aria-hidden="true">
        <div className="preloader__word">SUBEROS</div>
        <div className="preloader__meta"><span className="preloader__count">0</span><span>/100</span></div>
        <div className="preloader__track"><span className="preloader__line" /></div>
      </div>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="SUBEROS, volver al inicio">SUBEROS®</a>
        <nav aria-label="Navegación principal">
          <a href="#estudio">Estudio</a>
          <a href="#servicios">Servicios</a>
          <a href="#proyecto">Proyecto</a>
          <a className="nav-cta" href="#contacto">Hablemos</a>
        </nav>
      </header>

      <main id="contenido">
        <section id="inicio" className="hero" aria-labelledby="hero-title">
          <div className="hero__glow" aria-hidden="true" />
          <p className="hero__eyebrow">Estudio creativo · Imagen · Diseño · Digital</p>
          <h1 id="hero-title" className="hero__title">
            <span>Creamos</span>
            <span>imágenes que</span>
            <span>mueven marcas.</span>
          </h1>
          <div className="hero__bottom">
            <p className="hero__copy">Fotografía profesional, diseño gráfico, impresión y desarrollo web para negocios que quieren dejar de parecer uno más.</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#contacto">Cuéntanos tu proyecto</a>
              <a className="button button--ghost" href="#proyecto">Ver experiencia web</a>
            </div>
          </div>
          <a className="scroll-cue" href="#estudio">Scroll para descubrir <span aria-hidden="true">↓</span></a>
        </section>

        <section id="estudio" className="manifesto section">
          <p className="section-label" data-reveal>01 · Qué es SUBEROS</p>
          <h2 data-reveal>No hacemos piezas aisladas. Construimos una percepción completa.</h2>
          <div className="manifesto__grid">
            <p data-reveal>SUBEROS une estrategia, fotografía, diseño, producción y tecnología para convertir una idea en una marca que se reconoce, se recuerda y se elige.</p>
            <p data-reveal>Cada proyecto nace con una intención: comunicar mejor, emocionar de verdad y facilitar que el siguiente paso del usuario sea contactar.</p>
          </div>
        </section>

        <section id="servicios" className="services section" aria-labelledby="services-title">
          <p className="section-label" data-reveal>02 · Servicios</p>
          <h2 id="services-title" data-reveal>Una dirección creativa. Cuatro capacidades conectadas.</h2>
          <div className="services__grid">
            {services.map((service, index) => (
              <article className="service-card" id={service.href.slice(1)} key={service.title}>
                <span>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <a href="#contacto" aria-label={`Solicitar información sobre ${service.title}`}>Empezar un proyecto <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section id="proyecto" className="featured section" aria-labelledby="featured-title">
          <div className="featured__visual" role="img" aria-label="Vista conceptual de la experiencia web Luxury Shisha">
            <span className="featured__noise" aria-hidden="true" />
            <p>Featured digital experience</p>
            <strong>LUXURY<br />SHISHA</strong>
          </div>
          <div className="featured__content">
            <p className="section-label" data-reveal>03 · Experiencia destacada</p>
            <h2 id="featured-title" data-reveal>Una carta digital convertida en una experiencia inmersiva.</h2>
            <p data-reveal>Luxury Shisha demuestra cómo una web puede dejar de ser un soporte estático y convertirse en parte de la experiencia del negocio: diseño mobile-first, narrativa visual y movimiento ligado al scroll.</p>
            <a className="button button--primary" href="https://suberos.com/shisha/">Abrir proyecto</a>
          </div>
        </section>

        <section className="process section" aria-labelledby="process-title">
          <p className="section-label" data-reveal>04 · Cómo trabajamos</p>
          <h2 id="process-title" data-reveal>Descubrir. Diseñar. Crear. Producir. Lanzar.</h2>
          <p data-reveal>Un proceso directo, colaborativo y enfocado en convertir ideas en resultados visibles. Sin capas innecesarias y con una única dirección creativa desde el concepto hasta la entrega.</p>
        </section>

        <section id="contacto" className="contact section" aria-labelledby="contact-title">
          <p className="section-label">05 · Contacto</p>
          <h2 id="contact-title">Tu marca ya está diciendo algo. Hagamos que diga lo correcto.</h2>
          <p>Cuéntanos qué quieres crear, mejorar o transformar. Revisaremos el proyecto y te responderemos con una dirección clara.</p>
          <form className="contact-form" action="mailto:info@suberos.com" method="post" encType="text/plain">
            <label>Nombre<input name="nombre" autoComplete="name" required /></label>
            <label>Email<input type="email" name="email" autoComplete="email" required /></label>
            <label>¿Qué necesitas?<select name="servicio" defaultValue=""><option value="" disabled>Selecciona un servicio</option><option>Fotografía profesional</option><option>Diseño gráfico y branding</option><option>Impresión y producción</option><option>Diseño y desarrollo web</option><option>Proyecto multidisciplinar</option></select></label>
            <label className="contact-form__full">Háblanos del proyecto<textarea name="proyecto" rows={5} required /></label>
            <button className="button button--primary contact-form__full" type="submit">Enviar solicitud</button>
          </form>
        </section>
      </main>

      <footer>
        <a className="brand" href="#inicio">SUBEROS®</a>
        <p>Fotografía · Diseño gráfico · Impresión · Desarrollo web</p>
        <a href="#inicio">Volver arriba ↑</a>
      </footer>
    </div>
  )
}

export default App
