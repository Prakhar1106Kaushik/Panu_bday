/**
 * Image optimization utilities
 * In production, consider using a service like Cloudinary or ImageKit
 * For now, we'll use WebP with fallbacks
 */

export const getImageSrc = (src: string): string => {
  // In a real app, you'd convert to WebP here
  // For now, return the original src
  return src
}

export const getImageSrcSet = (src: string, sizes: number[] = [400, 800, 1200, 1600]): string => {
  return sizes.map(size => `${src}?w=${size} ${size}w`).join(', ')
}

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = reject
    img.src = src
  })
}

