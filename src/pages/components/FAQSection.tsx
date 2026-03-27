import { useState } from 'react'
import { useSanityQuery, useSiteSettings } from '../../hooks/useSanity'
import { ChevronDown, ChevronUp, Phone } from 'lucide-react'

interface FAQ {
  _id: string
  question: string
  answer: string
  category: string
  orderIndex: number
}

const defaultFAQs: FAQ[] = [
  {
    _id: 'default-1',
    question: 'How often should my lawn be mowed?',
    answer: 'Weekly during growing season (March through October), every other week the rest of the year. We can adjust based on how your yard grows.',
    category: 'general',
    orderIndex: 1,
  },
  {
    _id: 'default-2',
    question: 'Do I need to be home during service?',
    answer: "Nope. Most folks just leave the gate unlocked or give us a code. We'll lock up when we're done and shoot you a text.",
    category: 'scheduling',
    orderIndex: 2,
  },
  {
    _id: 'default-3',
    question: 'What forms of payment do you accept?',
    answer: 'Cash, check, or card — whatever works for you. Recurring customers can set up auto-pay if they want.',
    category: 'payment',
    orderIndex: 3,
  },
  {
    _id: 'default-4',
    question: "What's included in a standard mowing service?",
    answer: 'Mowing, edging along sidewalks and driveways, trimming around obstacles and fences, and we clean up all the clippings before we leave.',
    category: 'services',
    orderIndex: 4,
  },
  {
    _id: 'default-5',
    question: 'Do you offer discounts for recurring service?',
    answer: 'Yep — weekly and bi-weekly customers get a better rate. Give us a call and we\'ll work out pricing for your yard.',
    category: 'pricing',
    orderIndex: 5,
  },
]

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null)
  const { data: settings } = useSiteSettings()
  const { data: faqData } = useSanityQuery<FAQ[]>('*[_type == "faq" && isActive == true] | order(orderIndex asc)')

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')
  
  const badge = settings?.faqBadge || 'Got Questions?'
  const title = settings?.faqTitle || 'Common Questions Answered'
  const subtitle = settings?.faqSubtitle || 'The stuff people usually ask us'
  const ctaTitle = settings?.faqCtaTitle || 'Still have questions?'
  const ctaText = settings?.faqCtaText || "Just give us a call or shoot us a text."
  const ctaButtonText = settings?.faqCtaButtonText || 'Call or Text'

  const faqs = faqData && faqData.length > 0 ? faqData : defaultFAQs

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq" className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-white border-t-4 border-green-600">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            {badge}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-decorative mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600">{subtitle}</p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq._id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <button
                onClick={() => toggleFAQ(faq._id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                {openId === faq._id ? (
                  <ChevronUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openId === faq._id ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-gray-600 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-12 text-center bg-green-600 rounded-2xl p-6 md:p-8 text-white">
          <h3 className="text-xl font-bold mb-2">{ctaTitle}</h3>
          <p className="text-green-100 mb-4">{ctaText}</p>
          <a
            href={`tel:${phoneHref}`}
            className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            {ctaButtonText} {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
