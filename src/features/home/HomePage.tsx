import { ContactSection } from '../contact/ContactSection'
import { BrandStatementSection } from './BrandStatementSection'
import { FeaturedWorkSection } from './FeaturedWorkSection'
import { HeroSection } from './HeroSection'
import { ProcessSection } from './ProcessSection'
import { ServicesSection } from './ServicesSection'
import { StudioSection } from './StudioSection'
import './home-page.css'

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StudioSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <ProcessSection />
      <BrandStatementSection />
      <ContactSection />
    </>
  )
}
