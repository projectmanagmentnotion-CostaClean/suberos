import { useRef } from 'react'

import { Container } from '../../components/layout/Container'
import { Section } from '../../components/layout/Section'
import { Stack } from '../../components/layout/Stack'
import { homeContent } from '../../data/homeContent'
import { useScrollScene } from '../../motion/hooks/useScrollScene'
import { createStatementScene } from '../../motion/scenes/createStatementScene'

export function BrandStatementSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const bodyRef = useRef<HTMLParagraphElement | null>(null)
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([])

  useScrollScene(sectionRef, {
    dependencies: [homeContent.statement.lines.length],
    scene: (context) =>
      createStatementScene(context, {
        body: bodyRef.current,
        lines: lineRefs.current.filter((line): line is HTMLSpanElement => Boolean(line)),
      }),
  })

  return (
    <Section className="brand-statement" ref={sectionRef} tone="hero">
      <Container>
        <Stack className="brand-statement__inner" gap="lg">
          <p className="brand-statement__eyebrow">{homeContent.statement.eyebrow}</p>
          <div className="brand-statement__lines">
            {homeContent.statement.lines.map((line, index) => (
              <span
                className="brand-statement__line"
                key={line}
                ref={(element) => {
                  lineRefs.current[index] = element
                }}
              >
                {line}
              </span>
            ))}
          </div>
          <p className="brand-statement__body" ref={bodyRef}>
            {homeContent.statement.body}
          </p>
        </Stack>
      </Container>
    </Section>
  )
}
