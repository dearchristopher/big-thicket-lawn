import { Star, Users, MapPin, Clock, Shield, Award } from 'lucide-react'
import { useSiteSettings, useFeaturedTestimonials } from '../hooks/useSanity'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  star: Star,
  users: Users,
  mapPin: MapPin,
  clock: Clock,
  shield: Shield,
  award: Award,
}

const defaultTrustItems = [
  { icon: 'star', text: '★ 5.0 Rating' },
  { icon: 'mapPin', text: 'Lumberton Area' },
  { icon: 'users', text: 'Family Owned' },
  { icon: 'clock', text: 'Same-Day Quotes' },
]

export const TrustBar = () => {
  const { data: settings } = useSiteSettings()
  const { data: testimonials } = useFeaturedTestimonials()

  const avgRating = testimonials?.length
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : '5.0'

  const reviewCount = testimonials?.length || 0
  const serviceArea = settings?.serviceArea?.split(',')[0] || 'Lumberton'

  const trustItemsFromSettings = settings?.trustBarItems

  // Build trust items dynamically
  const trustItems = trustItemsFromSettings?.map(item => ({
    icon: item.icon,
    text: item.text
      .replace('{rating}', avgRating)
      .replace('{area}', serviceArea)
      .replace('{count}', String(reviewCount)),
  })) || defaultTrustItems.map(item => ({
    icon: item.icon,
    text: item.text
      .replace('5.0', avgRating)
      .replace('Lumberton', serviceArea),
  }))

  return (
    <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm">
          {trustItems.map((item, index) => {
            const IconComponent = iconMap[item.icon] || Star
            return (
              <div key={index} className="flex items-center gap-2">
                <IconComponent className={`w-4 h-4 ${item.icon === 'star' ? 'fill-yellow-400 text-yellow-400' : 'text-green-300'}`} />
                <span className="font-medium">{item.text}</span>
              </div>
            )
          })}
        </div>
        {reviewCount > 0 && (
          <p className="text-center text-xs text-green-300 mt-2">
            Based on {reviewCount} customer review{reviewCount !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  )
}
