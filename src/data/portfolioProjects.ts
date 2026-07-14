export type PublicationStatus = 'draft' | 'approved' | 'published' | 'archived'

export type PortfolioProject = {
  slug: string
  title: string
  status: PublicationStatus
  notes: string[]
}

export const portfolioProjects: PortfolioProject[] = []

export function getPublishedPortfolioProjects() {
  return portfolioProjects.filter((project) => project.status === 'published')
}
