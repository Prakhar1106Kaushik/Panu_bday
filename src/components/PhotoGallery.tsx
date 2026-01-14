import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config/constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

interface ImageModalProps {
  image: { src: string; caption: string; date?: string }
  isOpen: boolean
  onClose: () => void
}

const ImageModal = ({ image, isOpen, onClose }: ImageModalProps) => {
  // Auto-close after 7 seconds
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose()
      }, 7000)
      return () => clearTimeout(timer)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={onClose}
          style={{ cursor: 'zoom-out' }}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative max-w-[95vw] max-h-[95vh] mx-2 sm:mx-4"
            onClick={(e) => e.stopPropagation()}
            style={{ cursor: 'default' }}
          >
            <motion.img
              src={image.src}
              alt={image.caption}
              className="max-w-full object-contain rounded-lg shadow-2xl"
              style={{ 
                maxHeight: 'clamp(50vh, 80vh, 90vh)', // Better for mobile
                maxWidth: '100%',
                imageRendering: 'auto' as const
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute bottom-0 left-0 right-0 glass-strong p-2 sm:p-3 md:p-4 rounded-b-lg backdrop-blur-lg">
              <p className="text-white font-handwritten" style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1.125rem)' }}>{image.caption}</p>
            </div>
            <button
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 rounded-full glass-strong flex items-center justify-center text-white hover:bg-red-500/50 transition-all hover:scale-110 font-bold shadow-lg"
              style={{
                width: 'clamp(2.5rem, 4vw, 3rem)',
                height: 'clamp(2.5rem, 4vw, 3rem)',
                fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(10px)',
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const PhotoGallery = () => {
  const { ref } = useIntersectionObserver()
  const [selectedImage, setSelectedImage] = useState<{ src: string; caption: string; date?: string } | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [isDesktop, setIsDesktop] = useState<boolean>(false)

  // Detect desktop view (1024px and above)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  // Helper function to shuffle array
  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // Memoize shuffled images for 'all' filter to prevent re-shuffling on every render
  const shuffledAllImages = useMemo(() => shuffleArray(CONFIG.galleryImages), [])

  const filteredImages = filter === 'all'
    ? shuffledAllImages // Mix all photos from all years
    : filter === '2026'
    ? [] // 2026 shows empty with message
    : CONFIG.galleryImages.filter(img => {
        // Filter by year property
        const image = img as any
        return image.year === filter
      })

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative py-2 sm:py-4 md:py-6 lg:py-8 px-2 sm:px-4 md:px-6"
    >
      <div className="container mx-auto max-w-7xl px-0.5 sm:px-1 md:px-2">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-aurora-gradient"
          style={{ fontSize: 'clamp(1.5rem, 5vw, 3rem)' }}
        >
          My Gallery
        </motion.h2>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 flex-wrap px-1 sm:px-2"
        >
          {['all', '2022', '2023', '2024', '2025', '2026'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-2.5 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full glass transition-all ${
                filter === filterOption
                  ? 'glass-strong text-aurora-teal aurora-glow scale-105 sm:scale-110'
                  : 'text-white/70 hover:text-white hover:scale-105'
              }`}
              style={{ fontSize: 'clamp(0.7rem, 2vw, 1rem)' }}
            >
              {filterOption === 'all' ? 'All' : filterOption === '2026' ? '2026 - I Will Create More Memories' : filterOption}
            </button>
          ))}
        </motion.div>

        {/* Gallery grid - Mobile responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3 px-0.5 sm:px-1 md:px-2">
          {filter === '2026' ? (
            <div className="col-span-full text-center py-6 sm:py-8 md:py-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-strong rounded-2xl p-4 sm:p-6 md:p-8"
              >
                <h3 className="font-bold text-aurora-gradient mb-3 sm:mb-4" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                   I Will Create More Memories
                </h3>
                <p className="text-white/70" style={{ fontSize: 'clamp(0.875rem, 2vw, 1.125rem)' }}>
                  {/* Our journey continues, and we'll fill this year with beautiful moments together. */}
                </p>
              </motion.div>
            </div>
          ) : (
            filteredImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.3) }}
              className="relative group cursor-zoom-in"
              onClick={() => setSelectedImage(image)}
            >
              <motion.div
                className="relative overflow-hidden rounded-lg glass-strong"
                style={{ willChange: 'transform' }}
              >
                <motion.img
                  src={image.src}
                  alt={image.caption}
                  className={`w-full h-full ${
                    (image as any).cropBottom || (image as any).cropRight 
                      ? 'object-cover' 
                      : (image as any).showComplete 
                        ? 'object-contain' 
                        : 'object-cover'
                  }`}
                  style={{ 
                    height: 'clamp(533px, 108vw, 455px)', // 40% more height on mobile (381px + 40% = 533px)
                    imageRendering: 'auto' as const,
                    transformOrigin: 'center center',
                    display: (image as any).showComplete && !(image as any).cropBottom && !(image as any).cropRight ? 'block' : undefined,
                    margin: (image as any).showComplete && !(image as any).cropBottom && !(image as any).cropRight ? '0 auto' : undefined,
                    objectPosition: (() => {
                      const imageData = image as any
                      if (imageData.cropBottom) {
                        return 'center top' // Crop bottom 20% - show top portion
                      }
                      if (imageData.cropRight) {
                        return 'left center' // Crop right side - show left portion
                      }
                      return 'center center'
                    })()
                  }}
                  animate={{
                    rotate: (image as any).rotate || 0,
                    scale: (() => {
                      const imageData = image as any
                      // If zoomDesktopOnly is true, only apply zoom on desktop
                      if (imageData.zoomDesktopOnly) {
                        return isDesktop ? (imageData.zoom || 1) : 1
                      }
                      // Otherwise apply zoom normally
                      return imageData.zoom || 1
                    })()
                  }}
                  whileHover={{ 
                    scale: (image as any).zoom ? (image as any).zoom * 1.1 : 1.1, // Reduced hover zoom
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  transition={{ duration: 0.3 }}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    // Fallback for missing images
                    const target = e.target as HTMLImageElement
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231a0b2e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2316F8B6" font-family="Arial" font-size="20"%3EImage Coming Soon%3C/text%3E%3C/svg%3E'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white font-handwritten" style={{ fontSize: 'clamp(0.75rem, 2.5vw, 1.125rem)' }}>{image.caption}</p>
                </div>
              </motion.div>
            </motion.div>
          )))}
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </section>
  )
}

export default PhotoGallery

