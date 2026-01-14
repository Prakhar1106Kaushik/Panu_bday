import { lazy, Suspense } from 'react'
import { AppProvider } from './context/AppContext'
import Hero from './components/Hero'
import MusicPlayer from './components/MusicPlayer'
import VoiceMessage from './components/VoiceMessage'

// Lazy load components below the fold for faster initial load
const PhotoGallery = lazy(() => import('./components/PhotoGallery'))
const LoveLetter = lazy(() => import('./components/LoveLetter'))
const SpecialMoments = lazy(() => import('./components/SpecialMoments'))
const BirthdayWishes = lazy(() => import('./components/BirthdayWishes'))

function App() {
  return (
    <AppProvider>
      <div className="relative min-h-screen overflow-x-hidden bg-aurora-dark-purple1">
        <main>
          <Hero />
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <div className="inline-block w-8 h-8 border-4 border-aurora-teal/30 border-t-aurora-teal rounded-full animate-spin mb-4"></div>
                <p className="text-white/70 text-sm">Loading beautiful memories...</p>
              </div>
            </div>
          }>
            <PhotoGallery />
            <LoveLetter />
            <SpecialMoments />
            <BirthdayWishes />
          </Suspense>
        </main>
        <MusicPlayer />
        <VoiceMessage />
      </div>
    </AppProvider>
  )
}

export default App

