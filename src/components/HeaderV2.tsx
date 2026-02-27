import { Link, useNavigate } from 'react-router-dom'
import { HeaderMower } from './HeaderMower'
import { useEffect, useState } from 'react'
import { useSiteSettings } from '../hooks/useSanity'
import { Menu, X, Phone } from 'lucide-react'

const defaultNavLinks = [
  { label: 'Pricing', href: '#pricing' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export const HeaderV2 = () => {
  const navigate = useNavigate()
  const { data: settings } = useSiteSettings()
  const [showLogo, setShowLogo] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')
  const navLinks = settings?.navLinks || defaultNavLinks
  const navCtaText = settings?.navCtaText || 'Get Quote'

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight
      setShowLogo(window.scrollY > heroHeight * 0.5)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showLogo
          ? 'bg-gradient-to-r from-green-700 to-green-800 shadow-xl'
          : 'bg-gradient-to-r from-green-800/90 to-green-900/90 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Always visible */}
          <Link to="/" className="text-white">
            <HeaderMower />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="text-white hover:text-green-200 font-medium transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${phoneHref}`}
              className="text-white hover:text-green-200 flex items-center gap-1 font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              {phone}
            </a>
            <button
              onClick={() => navigate('/quote')}
              className="bg-yellow-400 hover:bg-yellow-300 text-green-900 px-4 py-2 rounded-lg font-bold text-sm transition-colors"
            >
              {navCtaText}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-white hover:text-green-200 hover:bg-white/10 px-4 py-2 rounded-lg text-left transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <hr className="border-white/20 my-2" />
              <a
                href={`tel:${phoneHref}`}
                className="text-white hover:text-green-200 px-4 py-2 flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {phone}
              </a>
              <button
                onClick={() => {
                  navigate('/quote')
                  setIsMobileMenuOpen(false)
                }}
                className="bg-yellow-400 hover:bg-yellow-300 text-green-900 mx-4 py-3 rounded-lg font-bold mt-2"
              >
                Get Free {navCtaText}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
