import {useState, useEffect} from 'react'
import { HeroV2 } from './components/HeroV2'
import { TrustBar } from '../components/TrustBar'
import { PricingV2 } from './components/PricingV2'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import { WhyChooseUsDynamic } from './components/WhyChooseUsDynamic'
import { ServicesDynamic } from './components/ServicesDynamic'
import TestimonialsSection from '../components/TestimonialsSection'
import { FAQSection } from './components/FAQSection'
import { FinalCTA } from './components/FinalCTA'
import { ReviewCTA } from '../components/ReviewCTA'
import { ReviewModal } from '../components/ReviewModal'
import { FloatingCTA } from '../components/FloatingCTA'
import { useReviewMode } from '../hooks/useReviewMode'

export default function HomeV2() {
  const isReviewMode = useReviewMode()
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  // Auto-open review modal when ?review=true
  useEffect(() => {
    if (isReviewMode) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsReviewModalOpen(true)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isReviewMode])

  const openReviewModal = () => setIsReviewModalOpen(true)
  const closeReviewModal = () => setIsReviewModalOpen(false)

  return (
    <div className="min-h-screen">
      <HeroV2 onOpenReviewModal={openReviewModal} />
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
      
      {/* In review mode: show prominent ReviewCTA (includes quote CTAs) */}
      {/* In normal mode: show FinalCTA (ReviewCTA is embedded in TestimonialsSection) */}
      {isReviewMode ? <ReviewCTA /> : <FinalCTA />}
      
      <FloatingCTA />

      {/* Review Modal - auto-opens when ?review=true, can be triggered manually */}
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={closeReviewModal} 
      />
    </div>
  )
}
