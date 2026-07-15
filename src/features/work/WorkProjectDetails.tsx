import { Button } from '../../components/ui/Button'
import type { WorkShowcaseDiscipline } from '../../data/workShowcase'
import { homeAnchors } from '../../app/routes'

type WorkProjectDetailsProps = {
  item: WorkShowcaseDiscipline
}

export function WorkProjectDetails({ item }: WorkProjectDetailsProps) {
  return (
    <div className="work-details">
      <div className="work-details__meta">
        <p className="work-details__eyebrow">Sistema creativo SUBEROS</p>
        <p className="work-details__index">{item.label}</p>
      </div>
      <h3 className="work-details__title">{item.title}</h3>
      <p className="work-details__headline">{item.headline}</p>
      <p className="work-details__body">{item.detail}</p>
      <ul className="work-details__outcomes">
        {item.outcomes.map((outcome) => (
          <li key={outcome}>{outcome}</li>
        ))}
      </ul>
      <div className="work-details__actions">
        <Button href={homeAnchors.contacto} variant="primary">
          Cuentanos tu proyecto
        </Button>
        <Button href={homeAnchors.servicios} variant="ghost">
          Ver servicios
        </Button>
      </div>
    </div>
  )
}
