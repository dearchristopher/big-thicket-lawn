import { useNavigate } from 'react-router-dom'
import { MessageCircle, Phone, Check } from 'lucide-react'
import { useCTASection, useSiteSettings } from '../../hooks/useSanity'

const defaultBenefits = ['No obligation', 'Same-day response', 'Easy booking']

export const FinalCTA = () => {
  const navigate = useNavigate()
  const { data: settings } = useSiteSettings()
  const { data: ctaSection } = useCTASection('final-cta')

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')
  const yearEstablished = settings?.yearEstablished || 2025
  const serviceArea = settings?.serviceArea?.split(',')[0] || 'Lumberton'

  const title = ctaSection?.title || 'Ready for a Lawn You\'re Proud Of?'
  const subtitle = ctaSection?.subtitle || 'Get your free quote in under 2 minutes. No obligation, no pressure; just honest pricing and great service.'
  const benefits = ctaSection?.benefits || defaultBenefits
  const primaryButtonText = ctaSection?.primaryButtonText || 'Get Your Free Quote'
  const secondaryButtonText = ctaSection?.secondaryButtonText || 'Call Us'
  const footerText = ctaSection?.footerText || `Serving ${serviceArea} and surrounding areas since ${yearEstablished}`

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold font-decorative mb-4">
          {title}
        </h2>
        <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
          {subtitle}
        </p>

        {/* Benefits */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm">
          {benefits.map((benefit, i) => (
            <span key={i} className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <Check className="w-4 h-4 text-green-300" />
              {benefit}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => navigate('/quote')}
            className="w-full sm:w-auto bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl text-lg font-bold transition-colors flex items-center justify-center gap-2 shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {primaryButtonText}
          </button>

          <a
            href={`tel:${phoneHref}`}
            className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-xl text-lg font-bold transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            {secondaryButtonText} {phone}
          </a>
        </div>

        <p className="mt-6 text-green-200 text-sm">
          {footerText}
        </p>
      </div>
    </section>
  )
}
