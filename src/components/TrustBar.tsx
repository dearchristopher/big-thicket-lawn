import {Star, Users, MapPin, Clock} from 'lucide-react'
import {useSiteSettings} from '../hooks/useSanity'
import {useFeaturedTestimonials} from '../hooks/useSanity'

// TODO: Verify all numbers before going live
// These are placeholder values - update with real data

export const TrustBar = () => {
  const {data: settings} = useSiteSettings()
  const {data: testimonials} = useFeaturedTestimonials()

  // Calculate average rating from real testimonials if available
  const avgRating = testimonials?.length
    ? (testimonials.reduce((sum, t) => sum + (t.rating || 5), 0) / testimonials.length).toFixed(1)
    : '5.0'

  const reviewCount = testimonials?.length || 0
  const serviceArea = settings?.serviceArea?.split(',')[0] || 'Lumberton'

  const trustItems = [
    {
      icon: <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />,
      text: `★ ${avgRating} Rating`,
    },
    {
      icon: <MapPin className="w-4 h-4 text-green-300" />,
      text: `${serviceArea} Area`,
    },
    {
      icon: <Users className="w-4 h-4 text-green-300" />,
      text: 'Family Owned',
    },
    {
      icon: <Clock className="w-4 h-4 text-green-300" />,
      text: 'Same-Day Quotes',
    },
  ]

  return (
    <div className="bg-gradient-to-r from-green-800 to-green-900 text-white py-3 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm">
          {trustItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              {item.icon}
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
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
