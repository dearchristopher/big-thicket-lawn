import { useState, useEffect, useRef, useCallback } from 'react'
import { useFeaturedGalleries } from '../hooks/useSanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const HeroGalleryCarousel = () => {
  const { data: galleries } = useFeaturedGalleries()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  // Filter galleries that have both before and after photos
  const sanityGalleries = galleries?.filter(
    (g) => g.beforePhotoUrl && g.afterPhotoUrl
  ) || []

  // Use test data if no Sanity galleries exist
  const validGalleries = sanityGalleries.length > 0 ? sanityGalleries : []

  // All useCallback hooks must be called before any early returns
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    setIsInteracting(true)
    updateSliderPosition(clientX)
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return
    updateSliderPosition(clientX)
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
    setIsInteracting(false)
  }, [])

  // Update slider position with edge snapping
  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    if (percentage < 5) percentage = 0
    else if (percentage > 95) percentage = 100

    setSliderPosition(percentage)
  }

  // Auto-advance carousel (pauses when user is interacting)
  useEffect(() => {
    if (validGalleries.length <= 1) return
    if (isInteracting) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % validGalleries.length)
      setSliderPosition(50)
    }, 6000)

    return () => clearInterval(interval)
  }, [validGalleries.length, isInteracting])

  // Early return after all hooks
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
    validGalleries.length > 0 && <div className="w-full max-w-2xl mx-auto mt-6 relative px-12 sm:px-14">
      {/* Arrow Navigation */}
      {validGalleries.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors z-30"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full flex items-center justify-center transition-colors z-30"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Before/After Slider */}
      <div
        ref={containerRef}
        className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 select-none"
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => setIsInteracting(true)}
        onMouseLeave={() => {
          setIsInteracting(false)
          handleDragEnd()
        }}
      >
        {/* After Image (background) */}
        <div className="absolute inset-0">
          <img
            src={currentGallery.afterPhotoUrl}
            alt={`${currentGallery.title} - After`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
            After
          </span>
        </div>

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={currentGallery.beforePhotoUrl}
            alt={`${currentGallery.title} - Before`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
          <span className="absolute top-3 right-3 bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-bold pointer-events-none">
            Before
          </span>
        </div>

        {/* Slider Control - Desktop */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="hidden sm:block absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
          aria-label="Compare before and after"
        />

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-8 -ml-4 bg-transparent z-20 cursor-ew-resize touch-none"
          style={{ left: `${sliderPosition}%`, touchAction: 'none' }}
          onMouseDown={(e) => {
            e.preventDefault()
            handleDragStart(e.clientX)
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              e.preventDefault()
              handleDragMove(e.clientX)
            }
          }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={(e) => {
            e.preventDefault()
            handleDragStart(e.touches[0].clientX)
          }}
          onTouchMove={(e) => {
            e.preventDefault()
            handleDragMove(e.touches[0].clientX)
          }}
          onTouchEnd={handleDragEnd}
        >
          {/* Visible line */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white shadow-lg" />
          {/* Handle button - larger on mobile */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
            <div className="flex">
              <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
              <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
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
            {currentIndex + 1} / {validGalleries.length}
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
              className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? 'bg-white' : 'bg-white/40'
                }`}
              aria-label={`View gallery ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
