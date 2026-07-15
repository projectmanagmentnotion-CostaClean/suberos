import type { WorkShowcaseDiscipline } from '../../data/workShowcase'
import { WorkProjectMedia } from './WorkProjectMedia'

type WorkProjectProps = {
  item: WorkShowcaseDiscipline
}

export function WorkProject({ item }: WorkProjectProps) {
  return (
    <article className="work-project-card">
      <div className="work-project-card__header">
        <span className="work-project-card__index">{item.label}</span>
        <div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
        </div>
      </div>
      <WorkProjectMedia item={item} />
      <p className="work-project-card__body">{item.detail}</p>
    </article>
  )
}
