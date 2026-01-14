import { CONFIG } from '../config/constants'
import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'
import { useState, useEffect } from 'react'

// Snowflake Component
const Snowflake = ({ delay, duration, left, size }: { delay: number; duration: number; left: number; size: number }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        fontSize: `${size}px`,
        willChange: 'transform, opacity',
      }}
      initial={{
        y: -50,
        x: 0,
        opacity: 0.4,
      }}
      animate={{
        y: '100vh',
        x: [0, 15, -15, 0],
        opacity: [0.4, 0.6, 0.4, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: duration,
        delay: delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      ❄
    </motion.div>
  )
}

// Confetti stream for celebration
const ConfettiStream = ({ delay, left }: { delay: number; left: number }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-50px',
        willChange: 'transform, opacity',
      }}
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        y: '150vh',
        opacity: [0, 0.6, 0.6, 0], // Reduced opacity for better readability
      }}
      transition={{
        duration: 5 + Math.random() * 4, // 5-9 seconds (much slower)
        delay: delay,
        repeat: Infinity,
        repeatDelay: 3, // Longer delay between repeats
        ease: 'easeOut',
      }}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: ['#16F8B6', '#7DF9FF', '#FFB5E8', '#4CC9F0', '#FFD700'][i],
            left: `${i * 8}px`,
            top: `${i * 10}px`,
          }}
          animate={{
            x: [0, 20, -20],
            rotate: 360,
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </motion.div>
  )
}

const Hero = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; delay: number; duration: number; left: number; size: number }>>([])
  const [celebrationRibbons, setCelebrationRibbons] = useState<Array<{ id: number; delay: number; left: number; color: string; direction: 'left' | 'right' }>>([])
  const [celebrationConfetti, setCelebrationConfetti] = useState<Array<{ id: number; delay: number; left: number }>>([])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile view for background sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Get hero images array or fallback to single image
  const heroImages = (CONFIG as any).heroImages || [CONFIG.heroImage]

  useEffect(() => {
    // Preload hero images with priority - first image immediately, others deferred
    const preloadImage = (src: string, priority: boolean = false) => {
      const img = new Image()
      if (priority) {
        img.src = src // High priority - load immediately
      } else {
        // Defer other images
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => { img.src = src }, { timeout: 3000 })
        } else {
          setTimeout(() => { img.src = src }, 500)
        }
      }
    }

    // Load first image immediately, others deferred
    if (heroImages.length > 0) {
      preloadImage(heroImages[0], true)
      heroImages.slice(1).forEach((src: string) => preloadImage(src, false))
    }

    // Rotate images every 3 seconds
    if (heroImages.length > 1) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
      }, 3000)

      return () => clearInterval(imageInterval)
    }
  }, [heroImages])

  useEffect(() => {
    // Defer particle creation to avoid blocking initial render
    const createParticles = () => {
      // Reduced particle counts for better performance
      const flakes = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        delay: Math.random() * 5,
        duration: 25 + Math.random() * 30,
        left: Math.random() * 100,
        size: 12 + Math.random() * 18,
      }))
      setSnowflakes(flakes)

      const ribbons = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        delay: (i * 0.3) % 10,
        left: Math.random() * 100,
        color: ['#16F8B6', '#7DF9FF', '#FFB5E8', '#4CC9F0', '#FFD700', '#FF6B9D', '#C77DFF'][Math.floor(Math.random() * 7)],
        direction: i % 2 === 0 ? 'left' : 'right' as 'left' | 'right',
      }))
      setCelebrationRibbons(ribbons)

      const confetti = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        delay: (i * 0.3) % 6,
        left: Math.random() * 100,
      }))
      setCelebrationConfetti(confetti)
    }

    // Use requestIdleCallback if available, otherwise setTimeout
    if ('requestIdleCallback' in window) {
      requestIdleCallback(createParticles, { timeout: 2000 })
    } else {
      setTimeout(createParticles, 100)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Aurora background image - full screen background with continuous zoom-in animation */}
      <div 
        className="fixed inset-0 z-0 bg-no-repeat bg-center hero-background-zoom"
        style={{
          backgroundImage: `url(${CONFIG.auroraBackground})`,
          backgroundSize: isMobile ? 'cover' : '120%',
          backgroundPosition: 'center',
          filter: 'brightness(0.85) contrast(1.05)',
          willChange: 'transform',
        }}
      >
        {/* Subtle overlay for better text readability - stronger on mobile */}
        <div className="absolute inset-0 bg-gradient-to-b from-aurora-dark-purple1/40 via-aurora-dark-purple1/20 to-aurora-dark-purple1/60" />
      </div>

      {/* Continuous Celebration Ribbons and Confetti */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {celebrationRibbons.map((ribbon) => (
          <motion.div
            key={`ribbon-${ribbon.id}`}
            className="absolute pointer-events-none"
            style={{
              left: `${ribbon.left}%`,
              top: '-100px',
              willChange: 'transform, opacity',
            }}
            initial={{
              y: -100,
              rotate: ribbon.direction === 'left' ? -45 : 45,
              opacity: 0,
            }}
            animate={{
              y: '150vh',
              rotate: ribbon.direction === 'left' ? [-45, -30, -45] : [45, 30, 45],
              opacity: [0, 0.5, 0.5, 0], // Reduced opacity for better readability
            }}
            transition={{
              duration: 8 + Math.random() * 6, // 8-14 seconds (much slower)
              delay: ribbon.delay,
              repeat: Infinity,
              repeatDelay: 4, // Longer delay between repeats
              ease: 'easeOut',
            }}
          >
            <div
              className="w-32 h-8"
              style={{
                background: `linear-gradient(${ribbon.direction === 'left' ? '135deg' : '45deg'}, ${ribbon.color}, ${ribbon.color}dd)`,
                clipPath: 'polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%, 10% 50%)',
              }}
            />
          </motion.div>
        ))}
        {celebrationConfetti.map((confetti) => (
          <ConfettiStream
            key={`confetti-${confetti.id}`}
            delay={confetti.delay}
            left={confetti.left}
          />
        ))}
      </div>

      {/* Snowflakes falling from top */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            delay={flake.delay}
            duration={flake.duration}
            left={flake.left}
            size={flake.size}
          />
        ))}
      </div>

      <div className="relative z-[2] text-center w-full mx-auto" style={{ 
        padding: 'clamp(1rem, 3vw, 4rem) clamp(0.5rem, 2vw, 3rem)',
      }}>
        {/* Square Profile Image - Fixed frame with changing images */}
        <div
          className="relative mx-auto"
          style={{ 
            width: 'clamp(200px, 32vw, 320px)', 
            height: 'clamp(200px, 32vw, 320px)',
            marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)',
          }}
        >
          {/* Fixed square frame with border - stays constant */}
          <div
            className="absolute inset-0 rounded-lg border-4 sm:border-[5px] md:border-6 border-aurora-teal/70 shadow-xl sm:shadow-2xl shadow-aurora-teal/40 pointer-events-none z-10"
            style={{ borderRadius: '0.5rem' }}
          />
          
          {/* Inner image - simple change after 2 seconds */}
          <div
            className="relative w-full h-full overflow-hidden rounded-lg"
            style={{ borderRadius: '0.5rem' }}
          >
            <img
              src={heroImages[currentImageIndex]}
              alt={`Hero ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              style={{
                imageRendering: 'auto' as const,
                borderRadius: '0.5rem'
              }}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
        </div>

        {/* Happy Birthday Panu - First */}
        <motion.h3
          className="font-bold flex flex-wrap items-center justify-center"
          style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            gap: 'clamp(0.75rem, 2vw, 1rem)',
            marginBottom: 'clamp(1.5rem, 4vw, 2rem)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="text-aurora-gradient">
            Happy Birthday
          </span>
          <motion.span
            className="font-handwritten font-extrabold relative inline-block"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 4.5rem)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-pink via-aurora-purple to-aurora-teal drop-shadow-2xl">
              Panu
            </span>
            {/* Glowing text shadow effect */}
            <span className="absolute inset-0 text-aurora-pink blur-2xl opacity-60 -z-10">
              Panu
            </span>
            {/* Additional glow layers */}
            <span className="absolute inset-0 text-aurora-teal blur-xl opacity-40 -z-20 translate-x-2 translate-y-2">
              Panu
            </span>
          </motion.span>
        </motion.h3>

        {/* Countdown Timer - After Happy Birthday */}
        <motion.div
          className="w-full mx-auto"
          style={{ padding: '0 clamp(0.25rem, 2vw, 1.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <CountdownTimer />
        </motion.div>

        {/* Walk to our memories button */}
        <motion.div
          style={{ marginTop: 'clamp(1rem, 3vw, 2.5rem)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <button
            onClick={() => {
              const gallery = document.querySelector('#gallery')
              gallery?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="glass-strong rounded-full font-semibold text-white hover:text-aurora-teal transition-all duration-300 aurora-glow hover:scale-105 active:scale-95"
            style={{ 
              padding: 'clamp(0.875rem, 3vw, 1rem) clamp(1.5rem, 4vw, 3rem)',
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            }}
          >
            <span> Our Memories</span>
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

