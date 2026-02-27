import {useFeaturedTestimonials} from '../hooks/useSanity'
import {Star} from 'lucide-react'

export default function TestimonialsSection() {
  const {data: testimonials, loading, error} = useFeaturedTestimonials()

  if (loading) {
    return (
      <section id="reviews" className="py-16 bg-gradient-to-b from-gray-50 to-green-50 border-y border-green-200">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">What Our Customers Say</h2>
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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Customers Say</h2>
        <p className="text-gray-600 text-center mb-12">Real reviews from real customers in Lumberton, TX</p>
        
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
      </div>
    </section>
  )
}
