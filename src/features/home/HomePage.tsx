import { ContactSection } from '../contact/ContactSection'
import { BrandStatementSection } from './BrandStatementSection'
import { HeroSection } from './HeroSection'
import { ProcessEditorial } from '../process/ProcessEditorial'
import { SequenceNarrativeSection } from './SequenceNarrativeSection'
import { ServicesSection } from './ServicesSection'
import { StudioSection } from './StudioSection'
import { WorkShowcase } from '../work/WorkShowcase'
import './home-page.css'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <SequenceNarrativeSection />
      <StudioSection />
      <ServicesSection />
      <WorkShowcase />
      <ProcessEditorial />
      <BrandStatementSection />
      <ContactSection />
    </>
  )
}
