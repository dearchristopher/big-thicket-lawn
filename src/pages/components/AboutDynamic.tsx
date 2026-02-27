import { TreesIcon } from 'lucide-react'
import { useSiteSettings } from '../../hooks/useSanity'

// Simple Portable Text renderer without external deps
function SimplePortableText({ value }: { value?: unknown[] }) {
  if (!value || !Array.isArray(value)) return null

  return (
    <>
      {value.map((block, index) => {
        if ((block as { _type?: string })._type !== 'block') return null

        const typedBlock = block as {
          style?: string
          children?: Array<{ text?: string; marks?: string[] }>
        }
        const style = typedBlock.style || 'normal'
        const children = typedBlock.children?.map((child, i: number) => {
          let text: React.ReactNode = child.text
          if (child.marks?.includes('strong')) text = <strong key={i}>{text}</strong>
          if (child.marks?.includes('em')) text = <em key={i}>{text}</em>
          return <span key={i}>{text}</span>
        })

        if (style === 'h1')
          return (
            <h1 key={index} className="text-3xl font-bold mb-4">
              {children}
            </h1>
          )
        if (style === 'h2')
          return (
            <h2 key={index} className="text-2xl font-bold mb-3">
              {children}
            </h2>
          )
        if (style === 'h3')
          return (
            <h3 key={index} className="text-xl font-bold mb-2">
              {children}
            </h3>
          )
        if (style === 'blockquote')
          return (
            <blockquote key={index} className="border-l-4 border-green-500 pl-4 italic my-4">
              {children}
            </blockquote>
          )

        return (
          <p key={index} className="mb-4">
            {children}
          </p>
        )
      })}
    </>
  )
}

export const AboutDynamic = () => {
  const { data: settings, loading } = useSiteSettings()

  const aboutText = settings?.aboutText
  const serviceArea = settings?.serviceArea || 'Serving Southeast Texas with pride.'
  const aboutTitle = settings?.aboutTitle || 'ABOUT US'
  const aboutImageUrl = settings?.aboutImageUrl || '/images/terrytodd.jpg'
  const aboutImageCaption = settings?.aboutImageCaption || 'Family-owned & operated'

  // Fallback content if no Sanity data
  if (loading || !aboutText || aboutText.length === 0) {
    return (
      <div id="about" className="bg-yellow-50 py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-green-700 text-4xl">
                  <TreesIcon className="h-12 w-12" />
                </div>
                <h2 className="text-4xl font-bold text-red-600 font-futura">{aboutTitle}</h2>
              </div>
              <div className="space-y-4 text-lg text-gray-700">
                <p>We're a local family-owned business offering reliable, affordable lawn care with attention to detail.</p>
                <p className="font-semibold text-xl text-green-700">{serviceArea}</p>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">
                    <img src={aboutImageUrl} alt="Big Thicket Lawn Services - Owners" className="rounded" />
                  </div>
                  <p className="text-sm text-gray-600">{aboutImageCaption}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="about" className="bg-yellow-50 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-green-700 text-4xl">
                <TreesIcon className="h-12 w-12" />
              </div>
              <h2 className="text-4xl font-bold text-red-600 font-futura">{aboutTitle}</h2>
            </div>
            <div className="space-y-4 text-lg text-gray-700">
              <SimplePortableText value={aboutText as unknown[]} />
              {serviceArea && <p className="font-semibold text-xl text-green-700 mt-6">{serviceArea}</p>}
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-green-100 rounded-lg p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">
                  <img src={aboutImageUrl} alt="Big Thicket Lawn Services - Owners" className="rounded" />
                </div>
                <p className="text-sm text-gray-600">{aboutImageCaption}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
