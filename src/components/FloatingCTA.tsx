import {useNavigate} from 'react-router-dom'
import {MessageCircle, Phone, X} from 'lucide-react'
import {useState, useEffect} from 'react'
import {useSiteSettings} from '../hooks/useSanity'

// Mobile-only floating CTA that appears after scrolling past hero

export const FloatingCTA = () => {
  const navigate = useNavigate()
  const {data: settings} = useSiteSettings()
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero (approximately 100vh)
      const heroHeight = window.innerHeight
      setIsVisible(window.scrollY > heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 md:hidden">
      <div className="flex items-center p-3 gap-3">
        {/* Quote Button */}
        <button
          onClick={() => navigate('/quote')}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Get Free Quote
        </button>

        {/* Call Button */}
        <a
          href={`tel:${phoneHref}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Call
        </a>

        {/* Dismiss */}
        <button
          onClick={() => setIsDismissed(true)}
          className="p-2 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      {/* Safe area for iPhone */}
      <div className="h-safe-area-inset-bottom bg-white" />
    </div>
  )
}
