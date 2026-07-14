export type SeoStructuredData = Record<string, unknown> | Array<Record<string, unknown>>

export type SeoMetadata = {
  title: string
  description: string
  canonicalUrl?: string | null
  robots: string
  ogType: 'website' | 'article'
  ogTitle: string
  ogDescription: string
  ogUrl?: string | null
  ogImage: string
  ogImageAlt: string
  ogImageWidth?: string
  ogImageHeight?: string
  twitterCard: 'summary' | 'summary_large_image'
  twitterTitle: string
  twitterDescription: string
  twitterImage: string
  twitterImageAlt: string
  locale: string
  jsonLd?: SeoStructuredData | null
}
