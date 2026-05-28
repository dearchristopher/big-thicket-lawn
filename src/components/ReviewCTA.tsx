import {Star, Facebook, ExternalLink} from 'lucide-react'
import {useSiteSettings} from '../hooks/useSanity'
import {useReviewMode} from '../hooks/useReviewMode'
import {useNavigate} from 'react-router-dom'
import {MessageCircle, Phone} from 'lucide-react'

interface ReviewPlatform {
  id: string
  name: string
  icon: React.ReactNode
  url: string
  description: string
  available: boolean
}

export const ReviewCTA = () => {
  const navigate = useNavigate()
  const {data: settings} = useSiteSettings()
  const isReviewMode = useReviewMode()

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')
  const facebookUrl = settings?.facebookPageUrl
  const yelpReviewUrl = settings?.yelpReviewUrl

  // Google review collection is unavailable (GBP verification failed) — Facebook + Yelp only.
  const reviewPlatforms: ReviewPlatform[] = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      url: facebookUrl ? `${facebookUrl}/reviews` : '#',
      description: 'Share your experience with our community',
      available: !!facebookUrl,
    },
    {
      id: 'yelp',
      name: 'Yelp',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-2.257l-.918-2.522-1.056 2.522H9.93l.795-1.987H9.36l-.555 1.987H7.5l1.68-5.5h2.14l.818 2.22.936-2.22h2.18l-1.65 5.5h1.896v1.5z"/>
        </svg>
      ),
      url: yelpReviewUrl || 'https://www.yelp.com/writeareview/biz/qNkwDerKkc65IunGPwy4gg',
      description: 'Also on Yelp',
      available: true,
    },
  ]

  // Prominent version when ?review is in URL
  if (isReviewMode) {
    return (
      <section className="py-16 md:py-24 bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-decorative mb-4">
            Love Your Lawn?
          </h2>
          <p className="text-xl text-green-100 mb-2 max-w-2xl mx-auto">
            Mind leaving us a quick review?
          </p>
          <p className="text-green-200 mb-10 max-w-xl mx-auto">
            It really helps other folks around here find us.
          </p>

          {/* Review Platform Cards - only show available platforms */}
          <div className={`grid gap-4 max-w-2xl mx-auto mb-10 ${reviewPlatforms.filter(p => p.available).length === 1 ? 'sm:grid-cols-1 max-w-md' : 'sm:grid-cols-2'}`}>
            {reviewPlatforms
              .filter((platform) => platform.available)
              .map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col items-center p-6 rounded-xl transition-all duration-200 bg-white text-gray-800 hover:bg-green-50 hover:scale-105 shadow-xl cursor-pointer"
                >
                  <div className="mb-3 transition-colors text-green-600 group-hover:text-green-700">
                    {platform.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-1">{platform.name}</h3>
                  <p className="text-sm text-center opacity-80">{platform.description}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-green-600">
                    Leave a Review
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </a>
              ))}
          </div>

          {/* Secondary: Still need help? */}
          <div className="border-t border-green-500/50 pt-8">
            <p className="text-green-200 mb-4">Need help with your lawn instead?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('/quote')}
                className="w-full sm:w-auto bg-white text-green-700 hover:bg-green-50 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                Get a Free Quote
              </button>
              <a
                href={`tel:${phoneHref}`}
                className="w-full sm:w-auto bg-transparent border-2 border-white/50 text-white hover:bg-white/10 px-6 py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Call {phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Secondary version - shown normally in the flow
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-200">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Left: Text */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold text-yellow-600 uppercase tracking-wide">
                  Happy with our service?
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2 font-decorative">
                Leave Us a Review
              </h3>
              <p className="text-gray-600">
                It helps other folks in the area find good lawn care.
                <span className="block mt-1 text-sm text-green-600 font-medium">
                  Your reviews help us the most!
                </span>
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Facebook */}
              {facebookUrl && (
                <a
                  href={`${facebookUrl}/reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-[#1877F2]/30 hover:border-[#1877F2] hover:bg-[#1877F2]/5 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-md"
                >
                  <Facebook className="w-5 h-5 text-[#1877F2]" />
                  Facebook
                </a>
              )}

              {/* Yelp - Tertiary */}
              <a
                href={yelpReviewUrl || 'https://www.yelp.com/writeareview/biz/qNkwDerKkc65IunGPwy4gg'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-red-400 hover:bg-red-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all shadow-sm"
              >
                <svg className="w-5 h-5 text-[#FF1A1A]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-2.257l-.918-2.522-1.056 2.522H9.93l.795-1.987H9.36l-.555 1.987H7.5l1.68-5.5h2.14l.818 2.22.936-2.22h2.18l-1.65 5.5h1.896v1.5z"/>
                </svg>
                Yelp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
