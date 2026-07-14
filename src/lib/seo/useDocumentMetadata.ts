import { useEffect } from 'react'

import type { SeoMetadata } from './seo.types'

function ensureMeta(selector: string, attributes: Record<string, string>) {
  const existing = document.head.querySelector<HTMLMetaElement>(selector)

  if (existing) {
    return existing
  }

  const element = document.createElement('meta')

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }

  document.head.appendChild(element)
  return element
}

function ensureLink(selector: string, attributes: Record<string, string>) {
  const existing = document.head.querySelector<HTMLLinkElement>(selector)

  if (existing) {
    return existing
  }

  const element = document.createElement('link')

  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value)
  }

  document.head.appendChild(element)
  return element
}

function setStructuredData(jsonLd: SeoMetadata['jsonLd']) {
  const scriptId = 'suberos-jsonld'
  const existing = document.getElementById(scriptId)

  if (!jsonLd) {
    existing?.remove()
    return
  }

  const script = existing instanceof HTMLScriptElement ? existing : document.createElement('script')
  script.id = scriptId
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify(jsonLd)

  if (!existing) {
    document.head.appendChild(script)
  }
}

export function useDocumentMetadata(metadata: SeoMetadata) {
  useEffect(() => {
    document.documentElement.lang = 'es'
    document.title = metadata.title

    ensureMeta('meta[name="description"]', { name: 'description' }).setAttribute('content', metadata.description)
    ensureMeta('meta[name="robots"]', { name: 'robots' }).setAttribute('content', metadata.robots)
    ensureMeta('meta[property="og:type"]', { property: 'og:type' }).setAttribute('content', metadata.ogType)
    ensureMeta('meta[property="og:locale"]', { property: 'og:locale' }).setAttribute('content', metadata.locale)
    ensureMeta('meta[property="og:site_name"]', { property: 'og:site_name' }).setAttribute('content', 'SUBEROS')
    ensureMeta('meta[property="og:title"]', { property: 'og:title' }).setAttribute('content', metadata.ogTitle)
    ensureMeta('meta[property="og:description"]', { property: 'og:description' }).setAttribute('content', metadata.ogDescription)
    ensureMeta('meta[property="og:image"]', { property: 'og:image' }).setAttribute('content', metadata.ogImage)
    ensureMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }).setAttribute('content', metadata.ogImageAlt)
    ensureMeta('meta[name="twitter:card"]', { name: 'twitter:card' }).setAttribute('content', metadata.twitterCard)
    ensureMeta('meta[name="twitter:title"]', { name: 'twitter:title' }).setAttribute('content', metadata.twitterTitle)
    ensureMeta('meta[name="twitter:description"]', { name: 'twitter:description' }).setAttribute('content', metadata.twitterDescription)
    ensureMeta('meta[name="twitter:image"]', { name: 'twitter:image' }).setAttribute('content', metadata.twitterImage)
    ensureMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt' }).setAttribute('content', metadata.twitterImageAlt)

    if (metadata.ogUrl) {
      ensureMeta('meta[property="og:url"]', { property: 'og:url' }).setAttribute('content', metadata.ogUrl)
    } else {
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }

    if (metadata.ogImageWidth) {
      ensureMeta('meta[property="og:image:width"]', { property: 'og:image:width' }).setAttribute('content', metadata.ogImageWidth)
    } else {
      document.head.querySelector('meta[property="og:image:width"]')?.remove()
    }

    if (metadata.ogImageHeight) {
      ensureMeta('meta[property="og:image:height"]', { property: 'og:image:height' }).setAttribute('content', metadata.ogImageHeight)
    } else {
      document.head.querySelector('meta[property="og:image:height"]')?.remove()
    }

    if (metadata.canonicalUrl) {
      ensureLink('link[rel="canonical"]', { rel: 'canonical' }).setAttribute('href', metadata.canonicalUrl)
    } else {
      document.head.querySelector('link[rel="canonical"]')?.remove()
    }

    ensureLink('link[rel="manifest"]', { rel: 'manifest' }).setAttribute('href', '/site.webmanifest')
    setStructuredData(metadata.jsonLd)
  }, [metadata])
}
