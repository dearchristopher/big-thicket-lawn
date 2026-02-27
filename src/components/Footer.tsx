import {Link} from 'react-router-dom'
import {FooterMower} from './HeaderMower'
import {MowerTreeIcon} from './icons/MowerTree'
import {Heart, Mail, Phone, TreeDeciduous, Clock, Facebook} from 'lucide-react'
import {useSiteSettings} from '../hooks/useSanity'

export const Footer = () => {
  const {data: settings} = useSiteSettings()

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')
  const hours = settings?.businessHours || 'Mon-Fri: 8am-6pm, Sat: 8am-2pm'
  const serviceArea = settings?.serviceArea || 'Lumberton, TX'
  const facebookUrl = settings?.facebookPageUrl

  return (
    <footer className="bg-gradient-to-br from-green-800 to-green-900 text-white py-8 md:py-12 px-4 md:px-8 shadow-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 md:gap-8 md:items-start justify-center">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
            <Link to="/" className="mb-4">
              <FooterMower />
            </Link>
            <p className="text-green-200 text-sm text-center md:text-left max-w-64">
              Professional lawn care services in Southeast Texas
            </p>
          </div>

          <div className="hidden">
            <h3 className="text-xl font-bold mb-4 font-decorative">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="#about" className="text-green-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#services" className="text-green-200 hover:text-white transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="#contact" className="text-green-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold mb-4 font-decorative">Contact Us</h3>
            <div className="space-y-3">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-green-300">
                  <Phone className="h-4 w-4" />
                </span>
                <a href={`tel:${phoneHref}`} className="text-green-200 hover:text-white transition-colors">
                  {phone}
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-green-300">
                  <Mail className="h-4 w-4" />
                </span>
                <a
                  href="mailto:contact@bigthicketlawn.com"
                  className="text-green-200 hover:text-white transition-colors"
                >
                  contact@bigthicketlawn.com
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-green-300">
                  <TreeDeciduous className="h-4 w-4" />
                </span>
                <span className="text-green-200">{serviceArea}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-green-300">
                  <Clock className="h-4 w-4" />
                </span>
                <span className="text-green-200 text-sm">{hours}</span>
              </p>
              {facebookUrl && (
                <p className="flex items-center justify-center md:justify-start gap-2">
                  <span className="text-green-300">
                    <Facebook className="h-4 w-4" />
                  </span>
                  <a
                    href={facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-200 hover:text-white transition-colors"
                  >
                    Follow us on Facebook
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-green-700 mt-6 md:mt-8 pt-6 md:pt-8 text-center text-green-300 text-sm flex flex-col items-center">
          <div className="flex relative mb-2">
            <MowerTreeIcon className="w-10 h-10 md:w-12 md:h-12 fill-green-300" />
            <Heart className="w-3 h-3 md:w-4 md:h-4 fill-red-400 absolute top-[20px] md:top-[24px] right-[-12px] md:right-[-14px] stroke-transparent" />
          </div>
          <p className="text-xs md:text-sm">
            &copy; {new Date().getFullYear()} Big Thicket Lawn Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
