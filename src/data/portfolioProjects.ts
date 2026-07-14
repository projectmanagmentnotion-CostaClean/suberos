import portfolioProjectsData from './portfolioProjects.data.json'

export type PublicationStatus = 'draft' | 'review' | 'approved' | 'published' | 'archived'

export type AssetApprovalStatus = 'pending' | 'approved' | 'rejected'

export type PortfolioMediaType = 'image' | 'video' | 'sequence' | 'mockup' | 'document'

export interface PortfolioMedia {
  id: string
  type: PortfolioMediaType
  src: string
  mobileSrc?: string
  poster?: string
  alt?: string
  width: number
  height: number
  approval: AssetApprovalStatus
  ownershipConfirmed: boolean
  priority?: boolean
  decorative?: boolean
  credit?: string
}

export interface PortfolioProject {
  id: string
  slug: string
  status: PublicationStatus
  title: string
  category: string
  summary?: string
  services: string[]
  year?: string
  clientDisplayName?: string
  clientPublicationApproved: boolean
  media: PortfolioMedia[]
  seoApproved: boolean
  copyApproved: boolean
  legalApproved: boolean
}

export type PortfolioValidationResult = {
  blockingErrors: string[]
  warnings: string[]
  pendingData: string[]
  publishable: boolean
}

const validStatuses: PublicationStatus[] = ['draft', 'review', 'approved', 'published', 'archived']
const validMediaTypes: PortfolioMediaType[] = ['image', 'video', 'sequence', 'mockup', 'document']
const validApprovals: AssetApprovalStatus[] = ['pending', 'approved', 'rejected']

function isValidSlug(slug: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

function isRemoteAsset(src: string) {
  return /^https?:\/\//i.test(src)
}

export function validatePortfolioProject(project: PortfolioProject): PortfolioValidationResult {
  const blockingErrors: string[] = []
  const warnings: string[] = []
  const pendingData: string[] = []

  if (!project.id.trim()) {
    blockingErrors.push('Missing project id.')
  }

  if (!project.slug.trim() || !isValidSlug(project.slug)) {
    blockingErrors.push(`Invalid slug "${project.slug}".`)
  }

  if (!project.title.trim()) {
    blockingErrors.push('Missing project title.')
  }

  if (!validStatuses.includes(project.status)) {
    blockingErrors.push(`Invalid publication status "${project.status}".`)
  }

  if (!project.category.trim()) {
    blockingErrors.push('Missing project category.')
  }

  if (project.services.length === 0) {
    pendingData.push('Services list is empty.')
  }

  if (project.status === 'published' && !project.clientPublicationApproved) {
    blockingErrors.push('Published project without client publication approval.')
  }

  if (project.status === 'published' && !project.seoApproved) {
    blockingErrors.push('Published project without SEO approval.')
  }

  if (project.status === 'published' && !project.copyApproved) {
    blockingErrors.push('Published project without copy approval.')
  }

  if (project.status === 'published' && !project.legalApproved) {
    blockingErrors.push('Published project without legal approval.')
  }

  if (project.status === 'published' && !project.summary?.trim()) {
    blockingErrors.push('Published project without summary.')
  }

  for (const media of project.media) {
    if (!media.id.trim()) {
      blockingErrors.push(`Project "${project.slug}" has media without id.`)
    }

    if (!validMediaTypes.includes(media.type)) {
      blockingErrors.push(`Project "${project.slug}" has invalid media type "${media.type}".`)
    }

    if (!validApprovals.includes(media.approval)) {
      blockingErrors.push(`Project "${project.slug}" has invalid approval status "${media.approval}".`)
    }

    if (!media.src.trim()) {
      blockingErrors.push(`Project "${project.slug}" has media "${media.id}" without source.`)
    }

    if (isRemoteAsset(media.src)) {
      blockingErrors.push(`Project "${project.slug}" hotlinks remote media "${media.src}".`)
    }

    if (media.width <= 0 || media.height <= 0) {
      blockingErrors.push(`Project "${project.slug}" has media "${media.id}" without valid dimensions.`)
    }

    if (!media.decorative && !media.alt?.trim()) {
      blockingErrors.push(`Project "${project.slug}" has informative media "${media.id}" without alt text.`)
    }

    if (media.decorative && media.alt?.trim()) {
      warnings.push(`Decorative media "${media.id}" should keep empty alt text.`)
    }

    if (project.status === 'published' && media.approval !== 'approved') {
      blockingErrors.push(`Published project "${project.slug}" uses media "${media.id}" not approved for publication.`)
    }

    if (project.status === 'published' && !media.ownershipConfirmed) {
      blockingErrors.push(`Published project "${project.slug}" uses media "${media.id}" without ownership confirmation.`)
    }

    if (media.approval === 'pending') {
      pendingData.push(`Media "${media.id}" still pending approval.`)
    }

    if (!media.ownershipConfirmed) {
      pendingData.push(`Media "${media.id}" still needs ownership confirmation.`)
    }
  }

  if (project.status === 'published' && project.media.length === 0) {
    blockingErrors.push(`Published project "${project.slug}" has no media.`)
  }

  return {
    blockingErrors,
    warnings,
    pendingData,
    publishable: blockingErrors.length === 0 && project.status === 'published',
  }
}

export const portfolioProjects = portfolioProjectsData as PortfolioProject[]

export function getPublishedPortfolioProjects() {
  return portfolioProjects.filter((project) => project.status === 'published')
}

export function getPortfolioProjectsByStatus(status: PublicationStatus) {
  return portfolioProjects.filter((project) => project.status === status)
}

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug)
}

export function getPortfolioValidationSummary() {
  const results = portfolioProjects.map((project) => ({
    project,
    validation: validatePortfolioProject(project),
  }))

  return {
    results,
    publishedCount: results.filter((item) => item.project.status === 'published').length,
    publishableCount: results.filter((item) => item.validation.publishable).length,
    blockingCount: results.reduce((total, item) => total + item.validation.blockingErrors.length, 0),
    warningCount: results.reduce((total, item) => total + item.validation.warnings.length, 0),
    pendingCount: results.reduce((total, item) => total + item.validation.pendingData.length, 0),
  }
}
