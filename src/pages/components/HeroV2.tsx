import {useNavigate} from 'react-router-dom'
import {useSiteSettings} from '../../hooks/useSanity'
import {Phone, MessageCircle} from 'lucide-react'
import {useIsMobile} from '../../hooks/useIsMobile'
import {Bar} from './bar'
import {EstimateModal} from '../../components/EstimateModal'
import {useEstimateModal} from '../../hooks/useEstimateModal'
import {HeroLogo} from './hero-logo'
import {HeroGalleryCarousel} from '../../components/HeroGalleryCarousel'

// TODO: Verify all numbers and claims before going live

export const HeroV2 = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const {data: settings} = useSiteSettings()
  const {isEstimateModalOpen, closeEstimateModal} = useEstimateModal()

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')



  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center py-12"
      style={{
        backgroundImage: `url('${settings?.heroImageUrl || '/images/lawn-placeholder.png'}')`,
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

      <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto w-full">
        {/* Logo */}
        <div className="mb-4 scale-75">
          <HeroLogo />
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg mb-3 font-main text-green-100/80 drop-shadow-md">
          {settings?.heroSubtitle || 'Professional lawn care by people who live in your community'}
        </p>

        {/* Trust Badge */}
        <div className="flex flex-wrap justify-center gap-2 mb-3 text-xs sm:text-sm">
          <span className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-green-300">✓</span> Mowing
          </span>
          <span className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-green-300">✓</span> Edging
          </span>
          <span className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-green-300">✓</span> Mulching
          </span>
          <span className="bg-green-600/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-green-300">✓</span> Cleanups
          </span>
        </div>

        <Bar color="yellow-400" className="mb-4 mx-auto w-24" />

        {/* Pricing Teaser */}
        <p className="text-base md:text-lg font-bold mb-3 drop-shadow-lg">
          Starting at <span className="text-green-300">$55</span> per service
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
          <button
            onClick={() => navigate('/quote')}
            className="w-full sm:w-auto cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Get Your Free Quote
          </button>

          <button
            onClick={() =>
              isMobile ? (window.location.href = `tel:${phoneHref}`) : navigate('#contact')
            }
            className="w-full sm:w-auto cursor-pointer bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4" />
            Call {phone}
          </button>
        </div>

        {/* Gallery Carousel */}
        <div className="relative">
          <HeroGalleryCarousel />
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-green-200">
          <span>✓ No Contracts</span>
          <span>✓ Satisfaction Guaranteed</span>
          <span>✓ Owner-Operated</span>
        </div>
      </div>

      <EstimateModal isOpen={isEstimateModalOpen} onClose={closeEstimateModal} />
    </div>
  )
}
