import { useFeaturedTestimonials, useSiteSettings } from '../hooks/useSanity'
import { Star, ExternalLink } from 'lucide-react'

export default function TestimonialsSection() {
  const { data: testimonials, loading, error } = useFeaturedTestimonials()
  const { data: settings } = useSiteSettings()

  const title = settings?.testimonialsTitle || 'What Our Customers Say'
  const subtitle = settings?.testimonialsSubtitle || 'From our neighbors right here in Lumberton'

  if (loading) {
    return (
      <section id="reviews" className="py-16 bg-gradient-to-b from-gray-50 to-green-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="flex justify-center">
            <div className="animate-pulse flex space-x-4">
              <div className="h-32 w-80 bg-gray-200 rounded"></div>
              <div className="h-32 w-80 bg-gray-200 rounded"></div>
              <div className="h-32 w-80 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    console.error('Error loading testimonials:', error)
    return null
  }

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section id="reviews" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-600 text-center mb-12">{subtitle}</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {testimonial.photoUrl ? (
                  <img
                    src={testimonial.photoUrl}
                    alt={testimonial.customerName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                    <span className="text-green-700 font-bold text-lg">
                      {testimonial.customerName.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{testimonial.customerName}</h3>
                  <div className="flex">
                    {Array.from({length: 5}).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              {testimonial.serviceType && (
                <p className="text-sm text-gray-500 mt-3">
                  Service: {testimonial.serviceType.replace('-', ' ')}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Leave a Review CTA - Google only for simplicity */}
        <div className="mt-10 text-center">
          <a
            href={settings?.googleReviewUrl || 'https://g.page/r/CVvxhi9Zv5amEBM/review'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            <span>Leave us a review on Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-gray-500 text-sm mt-2">It helps other folks around here find us</p>
        </div>
      </div>
    </section>
  )
}
