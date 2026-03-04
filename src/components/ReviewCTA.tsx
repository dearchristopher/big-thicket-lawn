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
  const googleReviewUrl = settings?.googleReviewUrl

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
      id: 'google',
      name: 'Google',
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
      ),
      url: googleReviewUrl || '#',
      description: googleReviewUrl 
        ? 'Help others find us on Google'
        : 'Coming soon - help others find us on Google',
      available: !!googleReviewUrl,
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
            We&apos;d be honored if you&apos;d share your experience!
          </p>
          <p className="text-green-200 mb-10 max-w-xl mx-auto">
            Your review helps other homeowners in Southeast Texas discover quality lawn care they can trust.
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
                Your feedback helps other homeowners find quality lawn care they can trust.
              </p>
            </div>

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {facebookUrl && (
                <a
                  href={`${facebookUrl}/reviews`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166fe5] text-white px-6 py-3 rounded-xl font-semibold transition-colors shadow-md"
                >
                  <Facebook className="w-5 h-5" />
                  Review on Facebook
                </a>
              )}
              {googleReviewUrl && (
                <a
                  href={googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-colors shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Review on Google
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
