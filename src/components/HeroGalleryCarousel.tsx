import {useState, useEffect} from 'react'
import {useFeaturedGalleries} from '../hooks/useSanity'
import {ChevronLeft, ChevronRight} from 'lucide-react'

// Test galleries for preview - remove when real data is added
const testGalleries = [
  {
    _id: 'test-1',
    title: 'Front Yard Transformation',
    beforePhotoUrl: '/images/lawn-placeholder.png',
    afterPhotoUrl: '/images/lawn-placeholder.png',
  },
]

export const HeroGalleryCarousel = () => {
  const {data: galleries} = useFeaturedGalleries()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isInteracting, setIsInteracting] = useState(false)

  // Filter galleries that have both before and after photos
  const sanityGalleries = galleries?.filter(
    (g) => g.beforePhotoUrl && g.afterPhotoUrl
  ) || []
  
  // Use test data if no Sanity galleries exist
  const validGalleries = sanityGalleries.length > 0 ? sanityGalleries : testGalleries

  // Auto-advance carousel (pauses when user is interacting)
  useEffect(() => {
    if (validGalleries.length <= 1) return
    if (isInteracting) return // Don't auto-advance while user is interacting
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validGalleries.length)
      setSliderPosition(50) // Reset slider position
    }, 6000) // Change every 6 seconds

    return () => clearInterval(interval)
  }, [validGalleries.length, isInteracting])

  if (validGalleries.length === 0) {
    return null
  }

  const currentGallery = validGalleries[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % validGalleries.length)
    setSliderPosition(50)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + validGalleries.length) % validGalleries.length)
    setSliderPosition(50)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value))
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 relative">
      {/* Arrow Navigation - Outside slider */}
      {validGalleries.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute -left-10 sm:-left-12 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors z-30"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-10 sm:-right-12 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors z-30"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Before/After Slider */}
      <div 
        className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20"
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => setIsInteracting(false)}
        onTouchStart={() => setIsInteracting(true)}
        onTouchEnd={() => setIsInteracting(false)}
      >
        {/* After Image (full background) */}
        <div className="absolute inset-0">
          <img
            src={currentGallery.afterPhotoUrl}
            alt={`${currentGallery.title} - After`}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
            After
          </span>
        </div>

        {/* Before Image (clipped - reveals as you slide right) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={currentGallery.beforePhotoUrl}
            alt={`${currentGallery.title} - Before`}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-bold">
            Before
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
          style={{ left: `${sliderPosition}%` }}
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
      <div className="mt-3 text-center">
        <p className="text-white text-sm font-medium drop-shadow-md">
          {currentGallery.title}
        </p>
        {validGalleries.length > 1 && (
          <p className="text-green-200 text-xs mt-1">
            {currentIndex + 1} / {validGalleries.length} — Drag to compare
          </p>
        )}
      </div>

      {/* Navigation Dots */}
      {validGalleries.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {validGalleries.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index)
                setSliderPosition(50)
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
              aria-label={`View gallery ${index + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  )
}
