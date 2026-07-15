import { useMemo, useRef, useState } from 'react'

import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { homeContent } from '../../data/homeContent'
import { workShowcaseDisciplines, workShowcaseNotes } from '../../data/workShowcase'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import { WorkProject } from './WorkProject'
import { WorkProjectDetails } from './WorkProjectDetails'
import { WorkProjectIndex } from './WorkProjectIndex'
import { WorkProjectMedia } from './WorkProjectMedia'
import './work-showcase.css'

export function WorkShowcase() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [activeId, setActiveId] = useState(workShowcaseDisciplines[0]?.id ?? 'fotografia')

  useElementReveal(sectionRef, {
    selector: '.work-showcase__intro, .work-showcase__desktop, .work-showcase__mobile, .work-showcase__note',
  })

  const activeItem = useMemo(
    () => workShowcaseDisciplines.find((item) => item.id === activeId) ?? workShowcaseDisciplines[0],
    [activeId],
  )

  return (
    <Section
      aria-labelledby="work-title"
      className="work-showcase-scene"
      data-qa="section-work"
      id="trabajo"
      ref={sectionRef}
    >
      <Container>
        <div className="work-showcase__intro">
          <p className="work-showcase__eyebrow">{homeContent.work.eyebrow}</p>
          <div className="work-showcase__heading">
            <h2 id="work-title">{homeContent.work.title}</h2>
            <p>{homeContent.work.body}</p>
          </div>
        </div>

        <div className="work-showcase__desktop">
          <div className="work-showcase__media-wrap">
            <WorkProjectMedia item={activeItem} />
            <div className="work-showcase__note">
              <p className="work-showcase__note-title">{homeContent.work.notesTitle}</p>
              <ul>
                {workShowcaseNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="work-showcase__editorial">
            <WorkProjectDetails item={activeItem} />
            <WorkProjectIndex activeId={activeItem.id} items={workShowcaseDisciplines} onSelect={setActiveId} />
          </div>
        </div>

        <div className="work-showcase__mobile">
          {workShowcaseDisciplines.map((item) => (
            <WorkProject item={item} key={item.id} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
