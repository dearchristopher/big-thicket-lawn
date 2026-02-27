import {useState} from 'react'
import {useSanityQuery} from '../../hooks/useSanity'
import {ChevronDown, ChevronUp, Phone} from 'lucide-react'
import {useSiteSettings} from '../../hooks/useSanity'

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
    answer:
      'For most lawns in the Lumberton area, we recommend weekly mowing during the growing season (March-October) and bi-weekly during slower growth periods. However, this can vary based on grass type, weather, and your preferences. We can customize a schedule that works best for your lawn.',
    category: 'general',
    orderIndex: 1,
  },
  {
    _id: 'default-2',
    question: 'Do I need to be home during service?',
    answer:
      "No, you don't need to be home. Many of our customers provide gate codes or leave gates unlocked. We respect your property and will ensure everything is secured when we leave. We'll also send you a message when the work is complete.",
    category: 'scheduling',
    orderIndex: 2,
  },
  {
    _id: 'default-3',
    question: 'What forms of payment do you accept?',
    answer:
      'We accept cash, checks, and all major credit cards. For recurring customers, we can set up automatic billing to make things even easier. Payment is due upon completion of service unless other arrangements have been made.',
    category: 'payment',
    orderIndex: 3,
  },
  {
    _id: 'default-4',
    question: "What's included in a standard mowing service?",
    answer:
      'Our standard service includes professional mowing with commercial-grade equipment, precise edging along sidewalks and driveways, detailed trimming around obstacles and fence lines, and complete cleanup of all grass clippings. We leave your property looking neat and tidy.',
    category: 'services',
    orderIndex: 4,
  },
  {
    _id: 'default-5',
    question: 'Do you offer discounts for recurring service?',
    answer:
      'Yes! We offer discounted rates for weekly and bi-weekly recurring service. The more frequent the service, the better the rate. Contact us for a custom quote based on your specific needs and schedule.',
    category: 'pricing',
    orderIndex: 5,
  },
]

export const FAQSection = () => {
  const [openId, setOpenId] = useState<string | null>(null)
  const {data: settings} = useSiteSettings()
  const {data: faqData} = useSanityQuery<FAQ[]>('*[_type == "faq" && isActive == true] | order(orderIndex asc)')

  const phone = settings?.phoneNumber || '(409) 719-3979'
  const phoneHref = phone.replace(/\D/g, '')

  // Use Sanity data if available, otherwise fall back to defaults
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
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-decorative mb-4">
            Common Questions Answered
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our lawn care services
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq._id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
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
          <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
          <p className="text-green-100 mb-4">
            We're happy to answer any questions you have. Give us a call or send a message.
          </p>
          <a
            href={`tel:${phoneHref}`}
            className="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Call or Text {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
