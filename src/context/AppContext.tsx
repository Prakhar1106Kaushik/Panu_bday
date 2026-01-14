import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AppContextType {
  isMusicPlaying: boolean
  toggleMusic: () => void
  sparkleEffect: boolean
  setSparkleEffect: (value: boolean) => void
  foundConstellations: number
  addConstellation: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(true) // Auto-play music by default
  const [sparkleEffect, setSparkleEffect] = useState(false)
  const [foundConstellations, setFoundConstellations] = useState(0)

  const toggleMusic = () => {
    setIsMusicPlaying(!isMusicPlaying)
  }

  const addConstellation = () => {
    setFoundConstellations(prev => prev + 1)
  }

  return (
    <AppContext.Provider
      value={{
        isMusicPlaying,
        toggleMusic,
        sparkleEffect,
        setSparkleEffect,
        foundConstellations,
        addConstellation,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

