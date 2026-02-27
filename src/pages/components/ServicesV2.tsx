import {useNavigate} from 'react-router-dom'
import {useActiveServices} from '../../hooks/useSanity'
import {Mower} from '../../components/icons/Mower'
import {Shears} from '../../components/icons/Shears'
import {Broom} from '../../components/icons/Broom'
import {Bush} from '../../components/icons/Bush'
import {ArrowRight} from 'lucide-react'

// Icon mapping
const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  Mower,
  Shears,
  Broom,
  Bush,
}

// Default pricing for services (TODO: Verify all pricing)
const defaultPricing: Record<string, string> = {
  Mowing: '$55+',
  'Edging & Trimming': 'Included',
  'Mulch & Cleanups': '$150+',
  'Bush Shaping': '$45+',
}

export const ServicesV2 = () => {
  const navigate = useNavigate()
  const {data: services} = useActiveServices()

  // Fallback services if Sanity data isn't loaded yet
  const defaultServices = [
    {
      _id: 'mowing',
      name: 'Mowing',
      shortDescription: 'Professional lawn mowing with precision equipment',
      iconName: 'Mower',
      pricingText: '$55+',
    },
    {
      _id: 'edging',
      name: 'Edging & Trimming',
      shortDescription: 'Clean edges and detailed trimming around obstacles',
      iconName: 'Shears',
      pricingText: 'Included',
    },
    {
      _id: 'cleanups',
      name: 'Mulch & Cleanups',
      shortDescription: 'Seasonal cleanups and fresh mulch application',
      iconName: 'Broom',
      pricingText: '$150+',
    },
    {
      _id: 'bushes',
      name: 'Bush Shaping',
      shortDescription: 'Professional shrub and bush trimming',
      iconName: 'Bush',
      pricingText: '$45+',
    },
  ]

  const displayServices = services?.length ? services : defaultServices

  return (
    <section id="services" className="py-16 md:py-24 bg-white border-t-4 border-yellow-400">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            What We Do
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-decorative mb-4">
            Complete Lawn & Landscape Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From regular maintenance to seasonal projects, we handle it all with care and precision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayServices.map((service) => {
            const IconComponent = iconMap[service.iconName || ''] || Mower
            const price = service.pricingText || defaultPricing[service.name] || 'Custom'

            return (
              <div
                key={service._id}
                className="group bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-8 h-8 fill-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{service.shortDescription}</p>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <span className="text-green-700 font-bold text-lg">{price}</span>
                  <button
                    onClick={() => navigate('/quote')}
                    className="text-green-600 hover:text-green-800 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('/quote')}
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Get a Custom Quote
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
