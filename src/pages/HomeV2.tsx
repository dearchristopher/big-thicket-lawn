import { HeroV2 } from './components/HeroV2'
import { TrustBar } from '../components/TrustBar'
import { PricingV2 } from './components/PricingV2'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhyChooseUsDynamic } from './components/WhyChooseUsDynamic'
import { ServicesDynamic } from './components/ServicesDynamic'
import TestimonialsSection from '../components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { FinalCTA } from './components/FinalCTA'
import { FloatingCTA } from '../components/FloatingCTA'

export default function HomeV2() {
  return (
    <div className="min-h-screen">
      <HeroV2 />
      <TrustBar />
      <PricingV2 />
      <BeforeAfterGallery />
      <WhyChooseUsDynamic />
      <ServicesDynamic />
      <TestimonialsSection />
      <FAQSection />
      {/* <ContactLayout>
        <Contact />
      </ContactLayout> */}
      <FinalCTA />
      <FloatingCTA />
    </div>
  )
}
