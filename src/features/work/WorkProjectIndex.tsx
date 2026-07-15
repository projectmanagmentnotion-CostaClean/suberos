import { Button } from '../../components/ui/Button'
import type { WorkShowcaseDiscipline } from '../../data/workShowcase'

type WorkProjectIndexProps = {
  activeId: string
  items: WorkShowcaseDiscipline[]
  onSelect: (id: string) => void
}

export function WorkProjectIndex({ activeId, items, onSelect }: WorkProjectIndexProps) {
  return (
    <div className="work-index" aria-label="Disciplinas destacadas">
      {items.map((item) => (
        <Button
          aria-pressed={item.id === activeId}
          className="work-index__item"
          data-active={item.id === activeId}
          key={item.id}
          onClick={() => onSelect(item.id)}
          type="button"
          variant="text"
        >
          <span className="work-index__number">{item.label}</span>
          <span className="work-index__copy">
            <span className="work-index__title">{item.title}</span>
            <span className="work-index__summary">{item.summary}</span>
          </span>
        </Button>
      ))}
    </div>
  )
}
