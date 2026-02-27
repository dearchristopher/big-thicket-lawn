import { Home, Users, Zap, Shield } from 'lucide-react'

// TODO: Verify all claims before going live

const reasons = [
  {
    icon: Home,
    title: 'Local & Family Owned',
    description:
      "We're your neighbors in Lumberton. When you call, you speak directly with the owners, not a call center.",
    highlight: 'Lumberton Based',
  },
  {
    icon: Users,
    title: 'Owner-Operated Service',
    description:
      "Todd, Hunter, and Terry personally handle your lawn care. The same friendly faces every time, no rotating crews.",
    highlight: 'Since 2018',
  },
  {
    icon: Zap,
    title: 'Fast, Free Quotes',
    description:
      "Get a quote the same day you reach out. No waiting, no hassle, just honest pricing upfront.",
    highlight: 'Same-Day Response',
  },
  {
    icon: Shield,
    title: 'Satisfaction Guaranteed',
    description:
      "Not happy with something? We'll make it right. Your satisfaction is our priority on every single visit.",
    highlight: '100% Guarantee',
  },
]

export const WhyChooseUs = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50 to-gray-50 border-t-4 border-green-600">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Why Homeowners Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 font-decorative mb-4">
            The Big Thicket Difference
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're not a big franchise. We're your neighbors, and we treat your lawn like it's our own.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl p-6 hover:bg-green-50 transition-colors duration-300"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <reason.icon className="w-7 h-7 text-white" />
              </div>

              {/* Highlight Badge */}
              <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-3">
                {reason.highlight}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 mb-2">{reason.title}</h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Trust Statement */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 rounded-full px-6 py-3">
            <span className="text-2xl">🌿</span>
            <p className="text-gray-700 font-medium">
              Supporting local business means supporting your community
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
