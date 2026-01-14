import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CONFIG } from '../config/constants'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

const BirthdayWishes = () => {
  const { ref, inView } = useIntersectionObserver()
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; size: number; rotation: number; color: string }>>([])

  const createHearts = () => {
    // Light pink color variations
    const lightPinkColors = ['#FFB6C1', '#FFC0CB', '#FFD1DC', '#FFE4E1', '#FFB5E8', '#FFC5E8']
    const newHearts = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: -10,
      size: 20 + Math.random() * 15, // Size between 20-35px
      rotation: Math.random() * 360,
      color: lightPinkColors[Math.floor(Math.random() * lightPinkColors.length)],
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 3000)
  }

  useEffect(() => {
    if (inView) {
      createHearts()
    }
  }, [inView])

  return (
    <section
      id="wishes"
      ref={ref}
      className="relative py-20 px-4 min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Light Pink Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
          }}
          initial={{
            y: -10,
            opacity: 1,
            rotate: heart.rotation,
          }}
          animate={{
            y: '100vh',
            x: heart.x + (Math.random() - 0.5) * 50,
            rotate: heart.rotation + 360,
            opacity: [1, 1, 0.8, 0],
            scale: [1, 1.2, 0.8, 0.5],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            ease: 'easeOut',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={heart.color}
            style={{
              width: '100%',
              height: '100%',
              filter: 'drop-shadow(0 2px 4px rgba(255, 182, 193, 0.5))',
            }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      <div className="container mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: 'spring' }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 text-aurora-gradient"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            Happy Birthday, {CONFIG.name}!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl text-white/90 font-handwritten mb-12"
          >
            {/* May your special day be filled with joy, laughter, and magical moments */}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex justify-center gap-6"
          >
            {[...Array(5)].map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              >
                <svg className="w-12 h-12 text-aurora-teal" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </motion.div>
            ))}
          </motion.div>

          <motion.button
            onClick={createHearts}
            className="mt-12 px-8 py-4 glass-strong rounded-full text-lg font-semibold text-white hover:text-aurora-teal transition-colors aurora-glow"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            More Love
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default BirthdayWishes

