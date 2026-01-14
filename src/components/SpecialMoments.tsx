import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONFIG } from '../config/constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const SpecialMoments = () => {
  const { ref, inView } = useIntersectionObserver()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDesktop, setIsDesktop] = useState(false)

  // Detect desktop view (1024px and above)
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % CONFIG.specialMoments.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + CONFIG.specialMoments.length) % CONFIG.specialMoments.length)
  }

  // Automatic carousel effect
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % CONFIG.specialMoments.length)
      }, 4000) // Change slide every 4 seconds

      return () => clearInterval(interval)
    }
  }, [inView, CONFIG.specialMoments.length])

  return (
    <section
      ref={ref}
      className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bold text-center text-aurora-gradient mb-8 sm:mb-10 md:mb-12"
          style={{ fontSize: 'clamp(1.875rem, 4vw, 3rem)' }}
        >
          Special Moments
        </motion.h2>

        <div className="relative max-w-4xl mx-auto px-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="glass-strong rounded-2xl overflow-hidden">
                {(CONFIG.specialMoments[currentIndex] as any).isVideo ? (
                  <video
                    src={CONFIG.specialMoments[currentIndex].image}
                    className="w-full h-full object-cover"
                    style={{ 
                      height: 'clamp(300px, 45vw, 500px)',
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                  />
                ) : (
                  <motion.img
                    src={CONFIG.specialMoments[currentIndex].image}
                    alt={CONFIG.specialMoments[currentIndex].caption}
                    className="w-full h-full object-cover"
                    style={{ 
                      height: 'clamp(300px, 45vw, 500px)',
                      imageRendering: 'auto' as const,
                      transformOrigin: 'center center'
                    }}
                    animate={{
                      scale: (() => {
                        const moment = CONFIG.specialMoments[currentIndex] as any
                        if (moment.zoomDesktopOnly) {
                          return isDesktop ? (moment.zoom || 1) : 1
                        }
                        return moment.zoom || 1
                      })()
                    }}
                    transition={{ duration: 0.3 }}
                    loading="eager"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400"%3E%3Crect fill="%231a0b2e" width="800" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2316F8B6" font-family="Arial" font-size="24"%3EImage Coming Soon%3C/text%3E%3C/svg%3E'
                    }}
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 glass-strong p-4 sm:p-5 md:p-6">
                  <p className="text-white font-handwritten text-center" style={{ fontSize: 'clamp(1rem, 3vw, 1.5rem)' }}>
                    {CONFIG.specialMoments[currentIndex].caption}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            style={{ width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
            aria-label="Previous"
          >
            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>←</span>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            style={{ width: 'clamp(2rem, 4vw, 3rem)', height: 'clamp(2rem, 4vw, 3rem)' }}
            aria-label="Next"
          >
            <span style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)' }}>→</span>
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {CONFIG.specialMoments.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-aurora-teal w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SpecialMoments

