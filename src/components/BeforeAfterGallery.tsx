import { useState, useRef, useCallback } from 'react'
import { useAllGalleries, useSiteSettings } from '../hooks/useSanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BeforeAfterGallery() {
  const { data: galleries, loading, error } = useAllGalleries()
  const { data: settings } = useSiteSettings()
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliderPositions, setSliderPositions] = useState<Record<string, number>>({})
  const [isDragging, setIsDragging] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const minSwipeDistance = 50

  const title = settings?.galleryTitle || 'Recent Transformations'
  const subtitle = settings?.gallerySubtitle || 'See the difference professional lawn care makes'

  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true)
    updateSliderPosition(clientX)
  }, [])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return
    updateSliderPosition(clientX)
  }, [isDragging])

  const handleDragEnd = useCallback(() => {
    setIsDragging(false)
  }, [])

  const updateSliderPosition = (clientX: number) => {
    if (!containerRef.current || !galleries || !galleries[activeIndex]) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    
    if (percentage < 5) percentage = 0
    else if (percentage > 95) percentage = 100
    
    const galleryId = galleries[activeIndex]._id
    setSliderPositions(prev => ({
      ...prev,
      [galleryId]: percentage,
    }))
  }

  if (loading) {
    return (
      <section id="gallery" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
          <div className="animate-pulse h-96 bg-gray-200 rounded-lg"></div>
        </div>
      </section>
    )
  }

  if (error || !galleries || galleries.length === 0) {
    return null
  }

  const currentGallery = galleries[activeIndex]
  const sliderPosition = sliderPositions[currentGallery._id] ?? 50

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

  const onSwipeStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (isDragging) return
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    touchStartX.current = clientX
  }

  const onSwipeEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (isDragging || touchStartX.current === null) {
      touchStartX.current = null
      return
    }
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX
    const distance = touchStartX.current - clientX
    
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        nextGallery()
      } else {
        prevGallery()
      }
    }
    
    touchStartX.current = null
  }

  return (
    <section id="gallery" className="py-16 bg-white border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">{title}</h2>
        <p className="text-gray-600 text-center mb-8">{subtitle}</p>

        <div className="relative">
          <div 
            ref={containerRef}
            className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl select-none"
            style={{ touchAction: 'pan-y' }}
            onMouseDown={onSwipeStart}
            onMouseUp={onSwipeEnd}
            onMouseLeave={() => {
              handleDragEnd()
              touchStartX.current = null
            }}
            onTouchStart={onSwipeStart}
            onTouchEnd={onSwipeEnd}
          >
            <div className="absolute inset-0">
              <img
                src={currentGallery.afterPhotoUrl}
                alt={`${currentGallery.title} - After`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold pointer-events-none">
                After
              </span>
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{clipPath: `inset(0 0 0 ${sliderPosition}%)`}}
            >
              <img
                src={currentGallery.beforePhotoUrl}
                alt={`${currentGallery.title} - Before`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <span className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded text-sm font-semibold pointer-events-none">
                Before
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="hidden sm:block absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Compare before and after"
            />

            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-20 cursor-ew-resize"
              style={{left: `${sliderPosition}%`, touchAction: 'none'}}
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
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
                <div className="flex">
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">{currentGallery.title}</h3>
            {currentGallery.description && (
              <p className="text-gray-600 mt-2">{currentGallery.description}</p>
            )}
            <p className="text-sm text-gray-500 mt-2 capitalize">
              Category: {currentGallery.category.replace('-', ' ')}
            </p>
          </div>

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
