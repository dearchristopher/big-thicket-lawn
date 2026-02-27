import {Contact} from './components/Contact'
import {AboutDynamic} from './components/AboutDynamic'
import {ServicesDynamic} from './components/ServicesDynamic'
import {HeroDynamic} from './components/HeroDynamic'
import {ContactLayout} from './components/ContactLayout'
import TestimonialsSection from '../components/TestimonialsSection'
import BeforeAfterGallery from '../components/BeforeAfterGallery'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroDynamic />
      <AboutDynamic />
      <ServicesDynamic />
      <BeforeAfterGallery />
      <TestimonialsSection />
      <ContactLayout>
        <Contact />
      </ContactLayout>
    </div>
  )
}
