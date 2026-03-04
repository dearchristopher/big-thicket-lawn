import { useFeaturedTestimonials, useSiteSettings } from '../hooks/useSanity'
import { Star, Facebook, ExternalLink } from 'lucide-react'

export default function TestimonialsSection() {
  const { data: testimonials, loading, error } = useFeaturedTestimonials()
  const { data: settings } = useSiteSettings()

  const title = settings?.testimonialsTitle || 'What Our Customers Say'
  const subtitle = settings?.testimonialsSubtitle || 'Real reviews from real customers in Lumberton, TX'

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

        {/* Leave a Review CTA */}
        {(settings?.facebookPageUrl || settings?.googleReviewUrl) && (
          <div className="mt-10 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-xl shadow-md px-6 py-4 border border-green-100">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-700 font-medium">Happy with our service?</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                {settings?.facebookPageUrl && (
                  <a
                    href={`${settings.facebookPageUrl}/reviews`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {settings?.googleReviewUrl && (
                  <a
                    href={settings.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white border border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700 px-4 py-2 rounded-lg font-semibold transition-colors text-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
