import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { homeContent } from '../../data/homeContent'
import { processSteps } from '../../data/processSteps'
import { useElementReveal } from '../../motion/hooks/useElementReveal'
import './process-editorial.css'

export function ProcessEditorial() {
  const sectionRef = useRef<HTMLElement | null>(null)

  useElementReveal(sectionRef, {
    selector: '.process-editorial__intro, .process-editorial__list',
  })

  return (
    <Section
      aria-labelledby="process-title"
      className="process-editorial"
      data-qa="section-process"
      id="proceso"
      ref={sectionRef}
      tone="raised"
    >
      <Container>
        <div className="process-editorial__intro">
          <p className="process-editorial__eyebrow">{homeContent.process.eyebrow}</p>
          <div className="process-editorial__heading">
            <h2 id="process-title">{homeContent.process.title}</h2>
            <p>{homeContent.process.body}</p>
          </div>
        </div>

        <div className="process-editorial__list" role="list">
          {processSteps.map((step) => (
            <article className="process-editorial__step" key={step.id} role="listitem" tabIndex={0}>
              <p className="process-editorial__index">{step.index}</p>
              <h3>{step.title}</h3>
              <p className="process-editorial__body">{step.body}</p>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
