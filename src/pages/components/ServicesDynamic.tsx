import {useActiveServices} from '../../hooks/useSanity'
import {Mower} from '../../components/icons'
import {Broom} from '../../components/icons/Broom'
import {Bush} from '../../components/icons/Bush'
import {Shears} from '../../components/icons/Shears'
import {Sprout, Sun, Droplets, Wrench} from 'lucide-react'

// Map icon names to components
const iconMap: Record<string, React.ComponentType<{className?: string}>> = {
  mower: Mower,
  shears: Shears,
  broom: Broom,
  bush: Bush,
  tools: Wrench,
  droplet: Droplets,
  sun: Sun,
  sparkles: Sprout,
}

export const ServicesDynamic = () => {
  const {data: services, loading, error} = useActiveServices()

  if (loading) {
    return (
      <div id="services" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-700 font-futura">OUR SERVICES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="bg-green-200 rounded-full w-24 h-24 mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Fallback to static content if no services in Sanity yet
  if (error || !services || services.length === 0) {
    return (
      <div id="services" className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-1 bg-orange-500 w-24"></div>
              <h2 className="text-4xl font-bold text-green-700 font-futura">OUR SERVICES</h2>
              <div className="h-1 bg-orange-500 w-24"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 pb-2">
                <span className="text-4xl"><Mower className='h-14 w-14 fill-green-100' /></span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Mowing</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl"><Shears className='h-12 w-12 fill-green-100' /></span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Edging & Trimming</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl"><Broom className='h-12 w-12 fill-green-100' /></span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Mulch & Cleanups</h3>
            </div>

            <div className="text-center">
              <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl"><Bush className='h-12 w-12 fill-green-100' /></span>
              </div>
              <h3 className="text-xl font-bold text-red-600 mb-2">Bush Shaping</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="services" className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-1 bg-orange-500 w-24"></div>
            <h2 className="text-4xl font-bold text-green-700 font-futura">OUR SERVICES</h2>
            <div className="h-1 bg-orange-500 w-24"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => {
            const IconComponent = service.iconName ? iconMap[service.iconName] : null
            
            return (
              <div key={service._id} className="text-center group">
                <div className="bg-green-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 pb-2 group-hover:bg-green-600 transition-colors">
                  {IconComponent ? (
                    <span className="text-4xl">
                      <IconComponent className='h-12 w-12 text-green-100' />
                    </span>
                  ) : (
                    <span className="text-4xl text-green-100">🌿</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-red-600 mb-2">{service.name}</h3>
                {service.shortDescription && (
                  <p className="text-gray-600 text-sm px-4">{service.shortDescription}</p>
                )}
                {service.pricingText && (
                  <p className="text-green-700 font-semibold mt-2">{service.pricingText}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
