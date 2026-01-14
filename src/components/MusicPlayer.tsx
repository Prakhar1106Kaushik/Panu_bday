import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { CONFIG } from '../config/constants'

const MusicPlayer = () => {
  const { isMusicPlaying, toggleMusic } = useApp()
  const [isExpanded, setIsExpanded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const hasUnmutedRef = useRef(false)
  const playAttemptRef = useRef(false)

  // Auto-play music on mount - start muted for autoplay, unmute on interaction
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Set volume to a comfortable level (30%)
    audio.volume = 0.3

    // Handle audio loading errors
    const handleError = () => {
      console.warn('Audio file not found or failed to load:', CONFIG.audioFile)
    }
    audio.addEventListener('error', handleError)

    // Function to try playing (muted or unmuted)
    const tryPlay = (unmuted = false) => {
      if (!isMusicPlaying) return
      
      if (unmuted) {
        audio.muted = false
        hasUnmutedRef.current = true
      } else {
        // Start muted for autoplay (browsers allow muted autoplay)
        audio.muted = true
      }
      
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            playAttemptRef.current = true
            if (unmuted) {
              hasUnmutedRef.current = true
            }
          })
          .catch(() => {
            // If unmuted fails, try muted
            if (unmuted) {
              audio.muted = true
              audio.play().catch(() => {})
            }
          })
      }
    }

    // Try to play when audio is ready
    const handleCanPlay = () => {
      if (isMusicPlaying && audio.paused) {
        tryPlay()
      }
    }

    // Multiple event listeners for when audio is ready
    audio.addEventListener('loadeddata', handleCanPlay)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('canplaythrough', handleCanPlay)
    audio.addEventListener('loadedmetadata', handleCanPlay)

    // Try to play immediately on mount (muted for autoplay)
    if (isMusicPlaying) {
      // Try multiple times with delays
      setTimeout(() => tryPlay(), 100)
      setTimeout(() => {
        if (audio.paused) tryPlay()
      }, 500)
      setTimeout(() => {
        if (audio.paused) tryPlay()
      }, 1000)
    } else {
      audio.pause()
    }

    // Monitor and keep playing - restart if it stops
    const keepPlayingInterval = setInterval(() => {
      if (isMusicPlaying && audio.paused && playAttemptRef.current) {
        audio.play().catch(() => {})
      }
    }, 1000)

    // Resume when page becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden && isMusicPlaying && audio.paused && playAttemptRef.current) {
        audio.play().catch(() => {})
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('loadeddata', handleCanPlay)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('canplaythrough', handleCanPlay)
      audio.removeEventListener('loadedmetadata', handleCanPlay)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      clearInterval(keepPlayingInterval)
    }
  }, [isMusicPlaying])

  // Unmute and ensure playing on first user interaction
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !isMusicPlaying) return

    // Unmute and ensure playing on user interaction
    const handleUserInteraction = () => {
      if (!hasUnmutedRef.current) {
        // Unmute on first interaction
        audio.muted = false
        hasUnmutedRef.current = true
      }
      
      // Ensure audio is playing
      if (isMusicPlaying && audio.paused) {
        audio.play()
          .then(() => {
            playAttemptRef.current = true
          })
          .catch(() => {})
      }
    }

    // Listen to all interaction events
    const events = ['click', 'touchstart', 'keydown', 'mousedown', 'scroll', 'pointerdown', 'wheel']
    events.forEach(event => {
      document.addEventListener(event, handleUserInteraction, { passive: true, once: true })
    })

    // Also listen on window
    window.addEventListener('click', handleUserInteraction, { once: true })
    window.addEventListener('scroll', handleUserInteraction, { once: true })
    window.addEventListener('wheel', handleUserInteraction, { once: true })

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserInteraction)
      })
      window.removeEventListener('click', handleUserInteraction)
      window.removeEventListener('scroll', handleUserInteraction)
      window.removeEventListener('wheel', handleUserInteraction)
    }
  }, [isMusicPlaying])

  return (
    <>
      {/* Audio element (hidden) - starts muted for autoplay */}
      {CONFIG.audioFile && (
        <audio 
          ref={audioRef} 
          src={CONFIG.audioFile} 
          loop 
          autoPlay
          muted
          preload="auto"
          playsInline
          crossOrigin="anonymous"
        />
      )}

      {/* Message cloud with "play me" text */}
      <motion.div
        initial={{ opacity: 0, scale: 0, x: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          x: 0,
          y: [0, -5, 0]
        }}
        transition={{ 
          delay: 2,
          duration: 0.5,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="fixed bottom-24 right-6 z-50 pointer-events-none"
      >
        <div className="relative">
          {/* Speech bubble */}
          <div className="glass-strong rounded-2xl px-4 py-2.5 shadow-lg border border-aurora-teal/40 relative overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-aurora-teal/20 via-aurora-pink/20 to-aurora-blue/20 animate-shimmer" />
            <p className="text-aurora-gradient text-sm font-semibold whitespace-nowrap relative z-10">
              Play me 🎵
            </p>
          </div>
          {/* Arrow pointing to button */}
          <div 
            className="absolute -bottom-2 right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent"
            style={{
              borderTopColor: 'rgba(22, 248, 182, 0.4)',
              filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>
      </motion.div>

      {/* Floating music button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring' }}
        onClick={(e) => {
          // Unmute and play music on click
          if (audioRef.current && isMusicPlaying) {
            audioRef.current.muted = false
            hasUnmutedRef.current = true
            if (audioRef.current.paused) {
              audioRef.current.play().catch(() => {})
            }
          }
          setIsExpanded(!isExpanded)
        }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass-strong flex items-center justify-center text-white hover:bg-white/30 transition-colors aurora-glow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Music Player"
      >
        {isMusicPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-4.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
          </svg>
        )}
      </motion.button>

      {/* Expanded player */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-24 right-6 z-50 glass-strong rounded-2xl p-4 min-w-[200px]"
          >
            <div className="flex items-center gap-4">
              <button
                onClick={toggleMusic}
                className="w-10 h-10 rounded-full glass flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label={isMusicPlaying ? 'Pause' : 'Play'}
              >
                {isMusicPlaying ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <div>
                <p className="text-white text-sm font-semibold">Background Music</p>
                <p className="text-white/60 text-xs">Happy Birthday Theme</p>
              </div>
            </div>
            {CONFIG.spotifyUrl && (
              <div className="mt-4">
                <iframe
                  src={CONFIG.spotifyUrl}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="rounded-lg"
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MusicPlayer

