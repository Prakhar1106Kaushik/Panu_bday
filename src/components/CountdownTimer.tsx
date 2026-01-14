import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface ConfettiParticle {
  id: number
  x: number
  y: number
  color: string
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
}

// Flip Counter Component
const FlipCounter = ({ value, label }: { value: number; label: string }) => {
  const [displayValue, setDisplayValue] = useState(value)
  const [isFlipping, setIsFlipping] = useState(false)
  const prevValueRef = useRef(value)

  useEffect(() => {
    if (prevValueRef.current !== value) {
      setIsFlipping(true)
      setTimeout(() => {
        setDisplayValue(value)
        setIsFlipping(false)
      }, 300)
      prevValueRef.current = value
    }
  }, [value])

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, '0')
  }

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Flip card container - Responsive size */}
        <div className="relative mx-auto" style={{ 
          width: 'clamp(3rem, 8vw, 5.5rem)', 
          height: 'clamp(3.5rem, 9.5vw, 5rem)',
          perspective: '1000px' 
        }}>
          <motion.div
            className="relative w-full h-full"
            animate={{
              rotateX: isFlipping ? 90 : 0,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Front face */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                borderRadius: '0.5rem 0.5rem 0 0',
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-aurora-dark-purple1/90 to-aurora-dark-purple2/90 flex items-center justify-center border border-aurora-teal/30 shadow-lg" style={{ borderRadius: '0.5rem 0.5rem 0 0' }}>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-aurora-teal via-aurora-pink to-aurora-purple" style={{ fontSize: 'clamp(1.125rem, 3vw, 2.25rem)' }}>
                  {formatNumber(displayValue)}
                </span>
              </div>
            </div>
            {/* Back face (flipping) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateX(180deg)',
                borderRadius: '0.5rem 0.5rem 0 0',
              }}
            >
              <div className="w-full h-full bg-gradient-to-b from-aurora-dark-purple1/90 to-aurora-dark-purple2/90 flex items-center justify-center border border-aurora-teal/30 shadow-lg" style={{ borderRadius: '0.5rem 0.5rem 0 0' }}>
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-b from-aurora-teal via-aurora-pink to-aurora-purple" style={{ fontSize: 'clamp(1.125rem, 3vw, 2.25rem)' }}>
                  {formatNumber(value)}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
        {/* Label - Responsive */}
        <div className="mt-1.5 text-white/90 uppercase tracking-wider font-semibold" style={{ fontSize: 'clamp(0.7rem, 1.5vw, 0.875rem)' }}>
          {label}
        </div>
      </div>
    </div>
  )
}

const CountdownTimer = () => {
  // Target date: January 15th, 12 AM (midnight)
  const getTargetDate = () => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const targetDate = new Date(currentYear, 0, 15, 0, 0, 0, 0) // January 15, 12 AM
    
    // If January 15 has already passed this year, target next year
    if (now > targetDate) {
      return new Date(currentYear + 1, 0, 15, 0, 0, 0, 0)
    }
    
    return targetDate
  }

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isCelebrating, setIsCelebrating] = useState(false)
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([])
  const burstIntervalRef = useRef<number | null>(null)

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date()
    const target = getTargetDate()
    const difference = target.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const createCelebration = () => {
    setIsCelebrating(true)
    const colors = ['#16F8B6', '#7DF9FF', '#FFB5E8', '#4CC9F0', '#FFD700', '#FF6B9D', '#C77DFF', '#FF1493', '#00FFFF', '#FF00FF']
    const particles: ConfettiParticle[] = []

    // Create GRAND celebration with many more particles
    for (let i = 0; i < 500; i++) {
      particles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 50, // Start from different heights
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 8, // More horizontal spread
        vy: Math.random() * 5 + 3, // Faster fall
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 15, // Faster rotation
      })
    }
    setConfetti(particles)

    // Clear any existing burst interval
    if (burstIntervalRef.current) {
      clearInterval(burstIntervalRef.current)
    }

    // Create continuous bursts of confetti
    burstIntervalRef.current = setInterval(() => {
      const newParticles: ConfettiParticle[] = []
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          id: Date.now() + i,
          x: Math.random() * 100,
          y: -10,
          color: colors[Math.floor(Math.random() * colors.length)],
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 2,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 12,
        })
      }
      setConfetti(prev => [...prev, ...newParticles].slice(-300)) // Keep max 300 particles
    }, 2000) // New burst every 2 seconds

    // Keep celebrating continuously - never stop!
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (burstIntervalRef.current) {
        clearInterval(burstIntervalRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Check if timer reached zero
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0 && !isCelebrating) {
        createCelebration()
      }
    }, 1000)

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [isCelebrating])

  const isZero = timeLeft.days === 0 && timeLeft.hours === 0 && 
                 timeLeft.minutes === 0 && timeLeft.seconds === 0

  return (
    <div className="relative">
      {/* Grand Celebration Confetti - Fixed to viewport */}
      <AnimatePresence>
        {confetti.map((particle) => (
          <motion.div
            key={particle.id}
            className="fixed rounded-full pointer-events-none z-50"
            style={{
              backgroundColor: particle.color,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              boxShadow: `0 0 ${10 + Math.random() * 10}px ${particle.color}`,
            }}
            initial={{ y: particle.y, opacity: 1, scale: 0 }}
            animate={{
              y: '110vh',
              x: `${particle.x + particle.vx * 50}%`,
              rotate: particle.rotation + particle.rotationSpeed * 30,
              opacity: [1, 1, 0.8, 0],
              scale: [0, 1.2, 1, 0.8],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              ease: 'easeOut',
            }}
            exit={{ opacity: 0 }}
          />
        ))}
      </AnimatePresence>

      {/* Grand Celebration Sparkles */}
      {isCelebrating && (
        <>
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="fixed pointer-events-none z-50"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '6px',
                height: '6px',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            >
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `radial-gradient(circle, ${['#16F8B6', '#7DF9FF', '#FFB5E8', '#FFD700'][Math.floor(Math.random() * 4)]} 0%, transparent 70%)`,
                  boxShadow: `0 0 10px ${['#16F8B6', '#7DF9FF', '#FFB5E8', '#FFD700'][Math.floor(Math.random() * 4)]}`,
                }}
              />
            </motion.div>
          ))}
        </>
      )}

      {/* Timer Display - No outer box, just flip counters */}
      {isZero && isCelebrating ? (
        <motion.div
          className="text-center"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="font-bold text-aurora-gradient mb-4 px-4"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 4.5rem)' }}
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            🎉 IT'S TIME! 🎉
          </motion.h2>
          <motion.p
            className="text-white font-handwritten px-4"
            style={{ fontSize: 'clamp(1rem, 3vw, 2rem)' }}
            animate={{
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            Happy Birthday!
          </motion.p>
        </motion.div>
      ) : (
        <div>
          <motion.h4
            className="text-xl md:text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-aurora-teal via-aurora-pink to-aurora-purple mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Countdown to Our Special Day */}
          </motion.h4>
          <div className="flex justify-center items-center flex-wrap px-2" style={{ gap: 'clamp(0.25rem, 1.5vw, 1rem)' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <FlipCounter value={timeLeft.days} label="Days" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <FlipCounter value={timeLeft.hours} label="Hours" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <FlipCounter value={timeLeft.minutes} label="Minutes" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <FlipCounter value={timeLeft.seconds} label="Seconds" />
            </motion.div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CountdownTimer

