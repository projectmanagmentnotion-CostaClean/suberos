import { legalPageContent } from './legalContent'
import { siteContact, siteMeta } from './siteContent'
import type { AppRoute } from '../app/routes'
import type { SeoMetadata } from '../lib/seo/seo.types'

const origin = siteMeta.canonicalUrl.replace(/\/$/, '')
const socialImageUrl = `${origin}/branding/suberos-social-card.png`
const socialImageAlt = 'Composicion editorial de SUBEROS para vista social con logo y tipografia en fondo charcoal.'

const homeStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${origin}/#organization`,
    name: 'SUBEROS',
    url: `${origin}/`,
    email: siteContact.email,
    telephone: siteContact.phoneDisplay,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: siteContact.email,
        telephone: siteContact.phoneDisplay,
        availableLanguage: ['es'],
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: 'SUBEROS',
    inLanguage: 'es',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${origin}/#webpage`,
    url: `${origin}/`,
    name: siteMeta.title,
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#organization` },
    inLanguage: 'es',
  },
]

function createMetadata(overrides: Partial<SeoMetadata> & Pick<SeoMetadata, 'title' | 'description' | 'robots'>): SeoMetadata {
  return {
    title: overrides.title,
    description: overrides.description,
    robots: overrides.robots,
    canonicalUrl: overrides.canonicalUrl ?? `${origin}/`,
    ogType: overrides.ogType ?? 'website',
    ogTitle: overrides.ogTitle ?? overrides.title,
    ogDescription: overrides.ogDescription ?? overrides.description,
    ogUrl: overrides.ogUrl ?? overrides.canonicalUrl ?? `${origin}/`,
    ogImage: overrides.ogImage ?? socialImageUrl,
    ogImageAlt: overrides.ogImageAlt ?? socialImageAlt,
    ogImageWidth: overrides.ogImageWidth ?? '1200',
    ogImageHeight: overrides.ogImageHeight ?? '630',
    twitterCard: overrides.twitterCard ?? 'summary_large_image',
    twitterTitle: overrides.twitterTitle ?? overrides.title,
    twitterDescription: overrides.twitterDescription ?? overrides.description,
    twitterImage: overrides.twitterImage ?? socialImageUrl,
    twitterImageAlt: overrides.twitterImageAlt ?? socialImageAlt,
    locale: overrides.locale ?? 'es_ES',
    jsonLd: overrides.jsonLd ?? null,
  }
}

export function getRouteMetadata(route: AppRoute): SeoMetadata {
  if (route.kind === 'legal') {
    const legalContent = legalPageContent[route.slug]

    return createMetadata({
      title: `SUBEROS - ${legalContent.title} provisional`,
      description: `${legalContent.title} provisional de SUBEROS con el estado real del proyecto, sin inventar datos legales todavia no verificados.`,
      canonicalUrl: `${origin}${route.canonicalPath}`,
      ogUrl: `${origin}${route.canonicalPath}`,
      robots: 'noindex,nofollow',
    })
  }

  if (route.kind === 'motion-lab') {
    return createMetadata({
      title: 'SUBEROS Motion Lab',
      description: 'Laboratorio interno de motion de SUBEROS para QA de escenas, pinning, reveal y reduced motion.',
      canonicalUrl: null,
      ogUrl: null,
      robots: 'noindex,nofollow',
      jsonLd: null,
    })
  }

  if (route.kind === 'portfolio-lab') {
    return createMetadata({
      title: 'SUBEROS Portfolio Lab',
      description: 'Laboratorio interno de readiness para portfolio y composiciones editoriales no publicadas.',
      canonicalUrl: null,
      ogUrl: null,
      robots: 'noindex,nofollow',
      jsonLd: null,
    })
  }

  if (route.kind === 'sequence-lab') {
    return createMetadata({
      title: 'SUBEROS Sequence Lab',
      description: 'Laboratorio interno para validar secuencias canvas scroll-linked con fallback y reduced motion.',
      canonicalUrl: null,
      ogUrl: null,
      robots: 'noindex,nofollow',
      jsonLd: null,
    })
  }

  if (route.kind === 'not-found') {
    return createMetadata({
      title: 'SUBEROS - Pagina no encontrada',
      description: 'Ruta no disponible dentro del contenido publico actual de SUBEROS.',
      canonicalUrl: null,
      ogUrl: null,
      robots: 'noindex,nofollow',
      jsonLd: null,
    })
  }

  return createMetadata({
    title: siteMeta.title,
    description:
      'SUBEROS es un estudio creativo que conecta fotografia, diseno, produccion e interaccion web para construir marcas mas claras, memorables y listas para avanzar.',
    canonicalUrl: `${origin}/`,
    ogUrl: `${origin}/`,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    jsonLd: homeStructuredData,
  })
}
