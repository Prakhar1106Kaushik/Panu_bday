import { motion } from 'framer-motion'
import { CONFIG } from '../config/constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useState, useEffect } from 'react'

// Ribbon component falling from top
const FallingRibbon = ({ delay, left, color, direction }: { delay: number; left: number; color: string; direction: 'left' | 'right' }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${left}%`,
        top: '-100px',
      }}
      initial={{
        y: -100,
        rotate: direction === 'left' ? -45 : 45,
        opacity: 0,
      }}
      animate={{
        y: '150vh',
        rotate: direction === 'left' ? [-45, -30, -45] : [45, 30, 45],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{
        duration: 12 + Math.random() * 6, // Slow: 12-18 seconds
        delay: delay,
        repeat: Infinity,
        repeatDelay: 4,
        ease: 'easeOut',
      }}
    >
      <div
        className="w-24 h-6"
        style={{
          background: `linear-gradient(${direction === 'left' ? '135deg' : '45deg'}, ${color}, ${color}dd)`,
          clipPath: 'polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%, 10% 50%)',
        }}
      />
    </motion.div>
  )
}

const Timeline = () => {
  const { ref } = useIntersectionObserver()
  const [ribbons, setRibbons] = useState<Array<{ id: number; delay: number; left: number; color: string; direction: 'left' | 'right' }>>([])

  useEffect(() => {
    // Create slow falling ribbons
    const ribbonArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: (i * 1.5) % 10,
      left: Math.random() * 100,
      color: ['#16F8B6', '#7DF9FF', '#FFB5E8', '#4CC9F0', '#FFD700', '#FF6B9D', '#C77DFF'][Math.floor(Math.random() * 7)],
      direction: i % 2 === 0 ? 'left' : 'right' as 'left' | 'right',
    }))
    setRibbons(ribbonArray)
  }, [])

  return (
    <section
      id="timeline"
      ref={ref}
      className="relative py-12 sm:py-16 md:py-20 px-3 sm:px-4 md:px-6 overflow-hidden"
    >
      {/* Falling ribbons from top */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        {ribbons.map((ribbon) => (
          <FallingRibbon
            key={`ribbon-${ribbon.id}`}
            delay={ribbon.delay}
            left={ribbon.left}
            color={ribbon.color}
            direction={ribbon.direction}
          />
        ))}
      </div>

      <div className="container mx-auto relative z-[2]">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bold text-center text-aurora-gradient"
          style={{ 
            fontSize: 'clamp(1.875rem, 4vw, 3rem)',
            marginBottom: 'clamp(2rem, 5vw, 4rem)'
          }}
        >
          Our Journey Together
        </motion.h2>

        <div className="relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 flex-wrap md:flex-nowrap">
          {/* Initial Card - Our Journey Begins */}
          {CONFIG.timelineEvents.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-auto md:flex-shrink-0"
              style={{ maxWidth: 'clamp(280px, 35vw, 400px)' }}
            >
              <motion.div
                className="glass-strong rounded-xl hover:glass transition-all"
                style={{ padding: 'clamp(1rem, 2.5vw, 1.5rem)' }}
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <div className="flex items-center mb-3">
                  <svg className="text-aurora-teal mr-2" style={{ width: 'clamp(1rem, 2vw, 1.25rem)', height: 'clamp(1rem, 2vw, 1.25rem)' }} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h3 className="font-bold text-white" style={{ fontSize: 'clamp(1.125rem, 3vw, 1.5rem)' }}>
                    Our Journey Begins
                  </h3>
                </div>
                <p className="text-white/70 mb-3" style={{ fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
                  {CONFIG.timelineEvents[0].description}
                </p>
                {CONFIG.timelineEvents[0].image && (
                  <motion.img
                    src={CONFIG.timelineEvents[0].image}
                    alt="Our Journey Begins"
                    className="mt-3 rounded-lg w-full object-cover"
                    style={{ 
                      height: 'clamp(200px, 25vw, 300px)',
                      imageRendering: 'auto' as const
                    }}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%231a0b2e" width="400" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%2316F8B6" font-family="Arial" font-size="16"%3EImage Coming Soon%3C/text%3E%3C/svg%3E'
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          )}

          {/* Arrow pointing right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block flex-shrink-0"
            style={{ width: 'clamp(60px, 8vw, 100px)' }}
          >
            <motion.svg
              className="w-full h-auto text-aurora-teal"
              fill="none"
              viewBox="0 0 100 50"
              animate={{
                x: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M10 25 L80 25 M70 15 L80 25 L70 35"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

          {/* Mobile Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="block md:hidden w-full text-center"
          >
            <motion.svg
              className="w-16 h-16 mx-auto text-aurora-teal"
              fill="none"
              viewBox="0 0 100 100"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <path
                d="M25 30 L50 50 L25 70"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

          {/* Infinity Logo and Forever Together */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full md:w-auto flex flex-col items-center justify-center"
          >
            {/* Infinity Symbol */}
            <motion.svg
              className="text-aurora-gradient"
              style={{
                width: 'clamp(120px, 20vw, 200px)',
                height: 'clamp(60px, 10vw, 100px)',
              }}
              fill="none"
              viewBox="0 0 200 100"
              animate={{
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <defs>
                <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#16F8B6" />
                  <stop offset="50%" stopColor="#FFB5E8" />
                  <stop offset="100%" stopColor="#4CC9F0" />
                </linearGradient>
              </defs>
              <path
                d="M50 50 Q30 30 50 10 Q70 10 90 30 Q110 10 130 10 Q150 10 170 30 Q190 50 170 70 Q150 90 130 90 Q110 90 90 70 Q70 90 50 90 Q30 90 10 70 Q-10 50 10 30 Q30 10 50 10 Q70 10 90 30"
                stroke="url(#infinityGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                fill="none"
              />
            </motion.svg>

            {/* Forever Together Text */}
            <motion.h3
              className="font-handwritten font-bold text-aurora-gradient text-center mt-4"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
              animate={{
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              Forever Together
            </motion.h3>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Timeline

