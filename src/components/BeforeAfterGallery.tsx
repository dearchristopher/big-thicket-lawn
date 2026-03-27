import { useState, useRef, useCallback } from 'react'
import { useAllGalleries, useSiteSettings } from '../hooks/useSanity'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function BeforeAfterGallery() {
  const { data: galleries, loading, error } = useAllGalleries()
  const { data: settings } = useSiteSettings()
  const [activeIndex, setActiveIndex] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const sliderPosRef = useRef(50)

  const title = settings?.galleryTitle || 'Recent Transformations'
  const subtitle = settings?.gallerySubtitle || 'See the difference professional lawn care makes'

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = Math.max(0, Math.min(100, (x / rect.width) * 100))
    if (percentage < 5) percentage = 0
    else if (percentage > 95) percentage = 100
    sliderPosRef.current = percentage
    containerRef.current.style.setProperty('--slider-pos', `${percentage}%`)
  }, [])

  const handleDragStart = useCallback((clientX: number) => {
    isDraggingRef.current = true
    updateSliderPosition(clientX)
  }, [updateSliderPosition])

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDraggingRef.current) return
    updateSliderPosition(clientX)
  }, [updateSliderPosition])

  const handleDragEnd = useCallback(() => {
    isDraggingRef.current = false
  }, [])

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    sliderPosRef.current = val
    if (containerRef.current) {
      containerRef.current.style.setProperty('--slider-pos', `${val}%`)
    }
  }

  const handleGalleryChange = (index: number) => {
    setActiveIndex(index)
    sliderPosRef.current = 50
    if (containerRef.current) {
      containerRef.current.style.setProperty('--slider-pos', '50%')
    }
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
            onMouseLeave={handleDragEnd}
          >
            <div className="absolute inset-0">
              <img
                src={currentGallery.afterPhotoUrl}
                alt={`${currentGallery.title} - After`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                loading="lazy"
              />
              <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold pointer-events-none">
                After
              </span>
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 0 0 var(--slider-pos, 50%))` }}
            >
              <img
                src={currentGallery.beforePhotoUrl}
                alt={`${currentGallery.title} - Before`}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
                loading="lazy"
              />
              <span className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded text-sm font-semibold pointer-events-none">
                Before
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              defaultValue={50}
              onChange={handleSliderChange}
              className="hidden sm:block absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
              aria-label="Compare before and after"
            />

            <div
              className="absolute top-0 bottom-0 w-8 -ml-4 bg-transparent z-20 cursor-ew-resize touch-none"
              style={{ left: `var(--slider-pos, 50%)`, touchAction: 'none' }}
              onMouseDown={(e) => {
                e.preventDefault()
                handleDragStart(e.clientX)
              }}
              onMouseMove={(e) => {
                if (isDraggingRef.current) {
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
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-white shadow-lg" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 sm:w-10 sm:h-10 bg-white rounded-full shadow-lg flex items-center justify-center pointer-events-none">
                <div className="flex">
                  <ChevronLeft className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
                  <ChevronRight className="w-5 h-5 sm:w-4 sm:h-4 text-gray-600" />
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
                onClick={() => handleGalleryChange((activeIndex - 1 + galleries.length) % galleries.length)}
                className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <span className="text-gray-600">
                {activeIndex + 1} / {galleries.length}
              </span>

              <button
                onClick={() => handleGalleryChange((activeIndex + 1) % galleries.length)}
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
                  onClick={() => handleGalleryChange(index)}
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
