import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const useIntersectionObserver = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: 0.05, // Lower threshold for earlier trigger
    triggerOnce: true, // Only trigger once for better performance
    rootMargin: '50px', // Start loading slightly before viewport
    ...options,
  })

  return { ref, inView }
}

