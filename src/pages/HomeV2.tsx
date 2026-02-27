import { HeroV2 } from './components/HeroV2'
import { TrustBar } from '../components/TrustBar'
import { PricingV2 } from './components/PricingV2'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhyChooseUs } from './components/WhyChooseUs'
import { ServicesV2 } from './components/ServicesV2'
import TestimonialsSection from '../components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { FinalCTA } from './components/FinalCTA'
import { ContactLayout } from './components/ContactLayout'
import { Contact } from './components/Contact'
import { FloatingCTA } from '../components/FloatingCTA'

export default function HomeV2() {
  return (
    <div className="min-h-screen">
      <HeroV2 />
      <TrustBar />
      <PricingV2 />
      <BeforeAfterGallery />
      <WhyChooseUs />
      <ServicesV2 />
      <TestimonialsSection />
      <FAQSection />
      <ContactLayout>
        <Contact />
      </ContactLayout>
      <FinalCTA />
      <FloatingCTA />
    </div>
  )
}
