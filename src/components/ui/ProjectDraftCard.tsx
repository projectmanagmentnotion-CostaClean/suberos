import { PortfolioProject, validatePortfolioProject } from '../../data/portfolioProjects'
import { ApprovalBadge } from './ApprovalBadge'

type ProjectDraftCardProps = {
  project: PortfolioProject
}

export function ProjectDraftCard({ project }: ProjectDraftCardProps) {
  const validation = validatePortfolioProject(project)

  return (
    <article className="project-draft-card">
      <div className="project-draft-card__header">
        <ApprovalBadge tone={project.status}>{project.status}</ApprovalBadge>
        <ApprovalBadge tone={validation.publishable ? 'ok' : 'warning'}>
          {validation.publishable ? 'Publishable' : 'Needs review'}
        </ApprovalBadge>
      </div>
      <h3>{project.title}</h3>
      <p>{project.category}</p>
      <ul className="project-draft-card__meta">
        <li>Slug: {project.slug}</li>
        <li>Media: {project.media.length}</li>
        <li>Client approval: {project.clientPublicationApproved ? 'Yes' : 'No'}</li>
      </ul>
    </article>
  )
}
