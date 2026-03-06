import { useState, useEffect } from 'react'
import { Star, Facebook, X, ExternalLink, Heart } from 'lucide-react'
import { useSiteSettings } from '../hooks/useSanity'

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReviewModal = ({ isOpen, onClose }: ReviewModalProps) => {
  const { data: settings } = useSiteSettings()
  const [isVisible, setIsVisible] = useState(false)

  const facebookUrl = settings?.facebookPageUrl
  const googleReviewUrl = settings?.googleReviewUrl || 'https://g.page/r/CVvxhi9Zv5amEBM/review'
  const yelpReviewUrl = settings?.yelpReviewUrl || 'https://www.yelp.com/writeareview/biz/qNkwDerKkc65IunGPwy4gg'

  // Handle animation
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEscape)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const hasFacebook = !!facebookUrl
  const hasGoogle = true // Google is always available with fallback URL
  const hasYelp = true // Yelp is always available with fallback URL

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`
          relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden
          transition-all duration-300 transform
          ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-8 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Animated stars */}
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-8 h-8 fill-yellow-400 text-yellow-400 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>

          <h2 className="text-3xl font-bold text-white font-decorative mb-2">
            Love Your Lawn?
          </h2>
          <p className="text-green-100">
            We&apos;d be honored if you&apos;d share your experience!
          </p>
          <p className="text-yellow-300 text-sm mt-1 font-medium">
            Google reviews help others decide to work with us!
          </p>
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600 text-center mb-6">
            Your review helps other homeowners in Southeast Texas discover quality lawn care they
            can trust.
          </p>

          {/* Review Options - Google first, then Facebook, then Yelp */}
          <div className="space-y-3">
            {/* Google - Priority #1 */}
            {hasGoogle && (
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 hover:border-green-500 hover:from-green-100 hover:to-green-200 transition-all group shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-600 shrink-0 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-green-700 transition-colors">
                    Review on Google
                  </h3>
                  <p className="text-sm text-green-700 font-medium">Most helpful for our business and our customers</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors" />
              </a>
            )}

            {/* Facebook - Priority #2 */}
            {hasFacebook && (
              <a
                href={`${facebookUrl}/reviews`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-[#1877F2]/5 border-2 border-[#1877F2]/20 hover:border-[#1877F2] hover:bg-[#1877F2]/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center text-white shrink-0">
                  <Facebook className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-[#1877F2] transition-colors">
                    Review on Facebook
                  </h3>
                  <p className="text-sm text-gray-500">Share with our community</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
              </a>
            )}

            {/* Yelp - only show if URL is configured */}
            {hasYelp && (
              <a
                href={yelpReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border-2 border-red-200 hover:border-red-500 hover:bg-red-100 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-[#FF1A1A] flex items-center justify-center text-white shrink-0 shadow-sm">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5h-2.257l-.918-2.522-1.056 2.522H9.93l.795-1.987H9.36l-.555 1.987H7.5l1.68-5.5h2.14l.818 2.22.936-2.22h2.18l-1.65 5.5h1.896v1.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                    Review on Yelp
                  </h3>
                  <p className="text-sm text-gray-500">Share your experience</p>
                </div>
                <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-colors" />
              </a>
            )}

            {/* Only shown if somehow all platforms unavailable */}
            {!hasFacebook && !hasGoogle && !hasYelp && (
              <div className="text-center p-4 text-gray-500">
                Review links temporarily unavailable. Please check back later!
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <Heart className="w-4 h-4 fill-red-400 text-red-400" />
            <span>Thank you for supporting our small business!</span>
          </div>
        </div>
      </div>
    </div>
  )
}
