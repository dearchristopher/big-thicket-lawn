import {useState} from 'react'
import {useFeaturedGalleries} from '../hooks/useSanity'
import {ChevronLeft, ChevronRight} from 'lucide-react'

export default function BeforeAfterGallery() {
  const {data: galleries, loading, error} = useFeaturedGalleries()
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({})

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Recent Transformations</h2>
          <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </section>
    )
  }

  if (error || !galleries || galleries.length === 0) {
    return null
  }

  const currentGallery = galleries[activeIndex]
  const sliderPosition = sliderPositions[currentGallery._id] || 50

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPositions({
      ...sliderPositions,
      [currentGallery._id]: parseInt(e.target.value),
    })
  }

  const nextGallery = () => {
    setActiveIndex((prev) => (prev + 1) % galleries.length)
  }

  const prevGallery = () => {
    setActiveIndex((prev) => (prev - 1 + galleries.length) % galleries.length)
  }

  return (
    <section id="gallery" className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Recent Transformations</h2>
        <p className="text-gray-600 text-center mb-8">
          See the difference professional lawn care makes
        </p>

        <div className="relative">
          {/* Before/After Slider */}
          <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
            {/* Before Image */}
            <div className="absolute inset-0">
              <img
                src={currentGallery.beforePhotoUrl}
                alt={`${currentGallery.title} - Before`}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded text-sm font-semibold">
                Before
              </span>
            </div>

            {/* After Image (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`}}
            >
              <img
                src={currentGallery.afterPhotoUrl}
                alt={`${currentGallery.title} - After`}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold">
                After
              </span>
            </div>

            {/* Slider Control */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Compare before and after"
            />

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20"
              style={{left: `${sliderPosition}%`}}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="flex">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Info */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">{currentGallery.title}</h3>
            {currentGallery.description && (
              <p className="text-gray-600 mt-2">{currentGallery.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-2 capitalize">
              Category: {currentGallery.category.replace('-', ' ')}
            </p>
          </div>

          {/* Navigation */}
          {galleries.length > 1 && (
            <div className="flex justify-center items-center mt-6 gap-4">
              <button
                onClick={prevGallery}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <span className="text-gray-600">
                {activeIndex + 1} / {galleries.length}
              </span>
              
              <button
                onClick={nextGallery}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}

          {/* Thumbnail Navigation */}
          {galleries.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {galleries.map((gallery, index) => (
                <button
                  key={gallery._id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`}
                  aria-label={`View ${gallery.title}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
