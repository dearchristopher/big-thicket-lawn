import { useNavigate } from 'react-router-dom'
import { textShadow } from '../utils/text-classes'
import { Bar } from './bar'
import { HeroLogo } from './hero-logo'
import { EstimateModal } from '../../components/EstimateModal'
import { useEstimateModal } from '../../hooks/useEstimateModal'
import { PricingDynamic } from './PricingDynamic'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useSiteSettings } from '../../hooks/useSanity'

export const HeroDynamic = () => {
  const { isEstimateModalOpen, closeEstimateModal } = useEstimateModal()
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { data: settings } = useSiteSettings()

  const heroTitle = settings?.heroTitle || 'Family-Owned Lawn Care in Lumberton, TX'
  const heroImage = settings?.heroImageUrl || '/images/lawn-placeholder.png'
  const serviceBadges = settings?.heroServiceBadges || ['Mowing', 'Trimming', 'Landscaping', 'Cleanups']
  const primaryCta = settings?.heroPrimaryCta || 'Message Us'
  const secondaryCta = settings?.heroSecondaryCta || 'Call Us'

  return (
    <div
      className="relative min-h-screen bg-cover bg-center flex items-center flex-col justify-center bg-green-900 py-8"
      style={{
        backgroundImage: `url('${heroImage}')`,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.6) 100%)',
        }}
      ></div>
      <div className="relative text-center flex flex-col gap-4 items-center text-white px-4 z-10">
        <HeroLogo />
        <p className={`text-lg sm:text-xl md:text-2xl mb-8 font-medium font-main ${textShadow}`}>
          {heroTitle}
        </p>

        <Bar color="yellow-400" className="mb-8" />

        <div className="flex flex-col mb-8 gap-1">
          <div className={`flex flex-wrap justify-center gap-8 text-lg ${textShadow}`}>
            {serviceBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <span className="text-green-400">✓</span>
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/quote')}
            className="cursor-pointer bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl text-xl font-bold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {primaryCta}
          </button>
          <button
            onClick={() => (window.location.href = !isMobile ? '#contact' : 'tel:14097193979')}
            className="cursor-pointer hover:underline text-white px-8 py-4 rounded-lg text-xl font-bold transition-colors drop-shadow-lg drop-shadow-gray-800"
          >
            {secondaryCta}
          </button>
        </div>

        <PricingDynamic />
      </div>

      <EstimateModal isOpen={isEstimateModalOpen} onClose={closeEstimateModal} />
    </div>
  )
}
