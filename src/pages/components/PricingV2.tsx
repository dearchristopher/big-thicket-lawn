import { useNavigate } from 'react-router-dom'
import { useIsMobile } from '../../hooks/useIsMobile'
import { useActivePricingTiers, useSiteSettings } from '../../hooks/useSanity'
import { Check, Sparkles } from 'lucide-react'

interface PricingTierData {
  _id: string
  size: string
  price: number
  description?: string
  features: string[]
  isPopular: boolean
}

const defaultPricingTiers: PricingTierData[] = [
  {
    _id: 'default-1',
    size: '1/4 Acre',
    price: 55,
    description: 'Compact properties',
    features: ['Professional Mowing', 'Precise Edging', 'Detail Trimming', 'Full Cleanup'],
    isPopular: false,
  },
  {
    _id: 'default-2',
    size: '1/3 Acre',
    price: 65,
    description: 'Standard residential lots',
    features: ['Professional Mowing', 'Precise Edging', 'Detail Trimming', 'Full Cleanup'],
    isPopular: true,
  },
  {
    _id: 'default-3',
    size: '1/2 Acre',
    price: 75,
    description: 'Spacious properties',
    features: ['Professional Mowing', 'Precise Edging', 'Detail Trimming', 'Full Cleanup'],
    isPopular: false,
  },
  {
    _id: 'default-4',
    size: 'Full Acre',
    price: 95,
    description: 'Large estate properties',
    features: ['Professional Mowing', 'Precise Edging', 'Detail Trimming', 'Full Cleanup'],
    isPopular: false,
  },
]

export const PricingV2 = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { data: tiers, loading } = useActivePricingTiers()
  const { data: settings } = useSiteSettings()

  const pricingTiers = tiers && tiers.length > 0 ? tiers : defaultPricingTiers
  
  const title = settings?.pricingTitle || 'Know Exactly What You\'ll Pay'
  const subtitle = settings?.pricingSubtitle || 'No hidden fees. No surprises. Get a quality lawn service at a fair price.'
  const footerText = settings?.pricingFooter || '* Prices may vary based on terrain complexity, obstacles, and specific property requirements'

  if (loading) {
    return (
      <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white border-t-4 border-green-600">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-4 bg-green-200 rounded w-32 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-96 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-128 mx-auto"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-6 h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="pricing" className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white border-t-4 border-green-600">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-decorative mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Pricing Grid */}
        <div
          className={`grid gap-6 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}
        >
          {pricingTiers.map((tier) => (
            <PricingCard
              key={tier._id}
              tier={tier}
              onGetStarted={() => navigate('/quote')}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                What's Included
              </h3>
              <ul className="space-y-3">
                {[
                  'Professional mowing with commercial-grade equipment',
                  'Precise edging along sidewalks, driveways, and beds',
                  'Detailed trimming around obstacles and fence lines',
                  'Complete cleanup - we leave no grass clippings behind',
                  'Free consultation to assess your property',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-600">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Quotes</h3>
              <p className="text-gray-600 mb-4">
                Have a larger property, commercial space, or need specialized services? We provide
                custom quotes for:
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>• Properties over 1 acre</li>
                <li>• Commercial properties</li>
                <li>• HOAs and multi-unit properties</li>
                <li>• Specialized landscaping projects</li>
              </ul>
              <button
                onClick={() => navigate('/quote')}
                className="w-full md:w-auto cursor-pointer bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Request Custom Quote
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-2">{footerText}</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-green-700 font-semibold">
            <span>✓ Free Estimates</span>
            <span>✓ No Contracts Required</span>
            <span>✓ Satisfaction Guaranteed</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const PricingCard = ({
  tier,
  onGetStarted,
  isMobile,
}: {
  tier: PricingTierData
  onGetStarted: () => void
  isMobile: boolean
}) => {
  if (isMobile) {
    return (
      <div className={`relative bg-white rounded-xl p-4 shadow-lg ${tier.isPopular ? 'ring-2 ring-green-400' : ''}`}>
        {tier.isPopular && (
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="bg-green-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
              ⭐ POPULAR
            </div>
          </div>
        )}
        <div className="text-center mb-3">
          <h3 className="text-lg font-bold text-gray-900">{tier.size}</h3>
          <p className="text-xs text-gray-500">{tier.description}</p>
        </div>
        <div className="text-center mb-3">
          <span className="text-2xl font-bold text-green-600">${tier.price}</span>
          <span className="text-gray-500 text-sm">/service</span>
        </div>
        <ul className="space-y-1 mb-3">
          {tier.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center text-xs text-gray-600">
              <Check className="w-3 h-3 text-green-500 mr-1" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={onGetStarted}
          className="w-full py-2 rounded-lg font-semibold text-sm text-white transition-colors bg-green-600 hover:bg-green-700"
        >
          Book Now
        </button>
      </div>
    )
  }

  return (
    <div className={`relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${tier.isPopular ? 'ring-2 ring-green-400' : ''}`}>
      {tier.isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            ⭐ POPULAR
          </div>
        </div>
      )}
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-1">{tier.size}</h3>
        <p className="text-sm text-gray-500">{tier.description}</p>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold text-green-600">${tier.price}</span>
          <span className="text-gray-500 ml-2">/service</span>
        </div>
      </div>

      <ul className="space-y-3 mb-6">
        {tier.features.map((feature, i) => (
          <li key={i} className="flex items-center text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      <button
        onClick={onGetStarted}
        className="w-full py-3 rounded-xl font-semibold text-white transition-all duration-200 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
      >
        Get Started
      </button>
    </div>
  )
}
