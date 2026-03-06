import { useState, useEffect, useRef, useCallback } from 'react'
import { useFeaturedGalleries } from '../hooks/useSanity'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

export const HeroGalleryCarousel = () => {
  const { data: galleries } = useFeaturedGalleries()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isInteracting, setIsInteracting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isTransitioning, setIsTransitioning] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const rafRef = useRef<number | null>(null)
  const targetPositionRef = useRef(50)

  // Filter galleries that have both before and after photos
  const sanityGalleries = galleries?.filter(
    (g) => g.beforePhotoUrl && g.afterPhotoUrl
  ) || []

  // Use test data if no Sanity galleries exist
  const validGalleries = sanityGalleries.length > 0 ? sanityGalleries : []

  // Handle image load events
  const handleImageLoad = useCallback((imageUrl: string) => {
    setLoadedImages(prev => {
      const newSet = new Set(prev)
      newSet.add(imageUrl)
      return newSet
    })
  }, [])

  // Check if current slide images are loaded
  const currentGallery = validGalleries[currentIndex]
  const afterImageLoaded = currentGallery ? loadedImages.has(currentGallery.afterPhotoUrl) : false
  const beforeImageLoaded = currentGallery ? loadedImages.has(currentGallery.beforePhotoUrl) : false
  const imagesReady = afterImageLoaded && beforeImageLoaded

  // Smooth slider update using requestAnimationFrame
  const updateSliderSmooth = useCallback(() => {
    setSliderPosition(prev => {
      const diff = targetPositionRef.current - prev
      // Smooth interpolation - move 25% of the way each frame
      const newPos = prev + diff * 0.25
      // Stop if very close
      if (Math.abs(diff) < 0.5) {
        return targetPositionRef.current
      }
      return newPos
    })
    
    if (isDraggingRef.current) {
      rafRef.current = requestAnimationFrame(updateSliderSmooth)
    }
  }, [])

  // Update target position (called on mouse move)
  const updateTargetPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))

    if (percentage < 5) percentage = 0
    else if (percentage > 95) percentage = 100

    targetPositionRef.current = percentage
  }, [])

  // All useCallback hooks must be called before any early returns
  const handleDragStart = useCallback((clientX: number) => {
    // Clear any pending interaction timeout
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
      interactionTimeoutRef.current = null
    }
    isDraggingRef.current = true
    setIsDragging(true)
    setIsInteracting(true)
    updateTargetPosition(clientX)
    // Start the animation loop
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(updateSliderSmooth)
  }, [updateTargetPosition, updateSliderSmooth])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return
    updateTargetPosition(clientX)
  }, [updateTargetPosition])

  const interactionTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false
    setIsDragging(false)
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    // Snap to final position
    setSliderPosition(targetPositionRef.current)
    
    // Keep isInteracting true for 3 seconds after release (grace period)
    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current)
    }
    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false)
    }, 3000)
  }, [])

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

  // Cleanup interaction timeout on unmount
  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current)
      }
    }
  }, [])

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    if (validGalleries.length <= 1) return
    
    const preloadIndices = [
      (currentIndex + 1) % validGalleries.length,
      (currentIndex - 1 + validGalleries.length) % validGalleries.length
    ]
    
    preloadIndices.forEach(index => {
      const gallery = validGalleries[index]
      if (!loadedImages.has(gallery.afterPhotoUrl)) {
        const img = new Image()
        img.src = gallery.afterPhotoUrl
        img.onload = () => handleImageLoad(gallery.afterPhotoUrl)
      }
      if (!loadedImages.has(gallery.beforePhotoUrl)) {
        const img = new Image()
        img.src = gallery.beforePhotoUrl
        img.onload = () => handleImageLoad(gallery.beforePhotoUrl)
      }
    })
  }, [currentIndex, validGalleries, loadedImages, handleImageLoad])

  // Early return after all hooks
  if (validGalleries.length === 0) {
    return null
  }

  const nextSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % validGalleries.length)
      setSliderPosition(50)
      setIsTransitioning(false)
    }, 150)
  }

  const prevSlide = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + validGalleries.length) % validGalleries.length)
      setSliderPosition(50)
      setIsTransitioning(false)
    }, 150)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(parseInt(e.target.value))
  }

  return (
    validGalleries.length > 0 && <div className="w-full mt-6 relative px-2 sm:px-4">
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
        className="relative h-56 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-2xl border-4 border-white/20 select-none"
        style={{ touchAction: 'pan-y' }}
        onMouseEnter={() => {
          // Clear any pending timeout when user hovers back
          if (interactionTimeoutRef.current) {
            clearTimeout(interactionTimeoutRef.current)
            interactionTimeoutRef.current = null
          }
          setIsInteracting(true)
        }}
        onMouseLeave={() => {
          handleDragEnd()
        }}
      >
        {/* Loading State - Gradient placeholder */}
        {!imagesReady && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center z-10 animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-10 h-10 text-green-500 animate-spin" />
              <span className="text-gray-400 text-sm font-medium">Loading...</span>
            </div>
          </div>
        )}

        {/* Slide Content with crossfade */}
        <div className={`absolute inset-0 transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
        {/* After Image (background) */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${imagesReady ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src={currentGallery.afterPhotoUrl}
            alt={`${currentGallery.title} - After`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
            onLoad={() => handleImageLoad(currentGallery.afterPhotoUrl)}
          />
          <span className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold pointer-events-none">
            After
          </span>
        </div>

        {/* Before Image (clipped) */}
        <div
          className={`absolute inset-0 overflow-hidden transition-opacity duration-500 ${imagesReady ? 'opacity-100' : 'opacity-0'}`}
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={currentGallery.beforePhotoUrl}
            alt={`${currentGallery.title} - Before`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
            onLoad={() => handleImageLoad(currentGallery.beforePhotoUrl)}
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
