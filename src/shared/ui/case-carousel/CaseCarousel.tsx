import React, { useState, useEffect } from 'react'
import { CaseImage } from '../../types/case.types'
import styles from './CaseCarousel.module.scss'

export interface CaseCarouselProps {
  images: CaseImage[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export const CaseCarousel: React.FC<CaseCarouselProps> = ({ 
  images, 
  className = '',
  autoPlay = false,
  autoPlayInterval = 5000
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [imageError, setImageError] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages(prev => new Set(prev).add(imageUrl))
  }

  const handleImageError = () => {
    setImageError(true)
  }

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      nextImage()
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, images.length])

  if (images.length === 0) {
    return (
      <div className={`${styles.caseCarousel} ${styles.placeholder} ${className}`}>
        <div className={styles.carouselPlaceholder}>
          <span className={styles.placeholderIcon}>📷</span>
          <span className={styles.placeholderText}>Images Coming Soon</span>
        </div>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <div className={`${styles.caseCarousel} ${className}`}>
      <div className={styles.carouselContainer}>
        <div className={styles.imageContainer}>
          {!loadedImages.has(currentImage.url) && !imageError && (
            <div className={styles.imageSkeleton}>
              <div className={styles.skeletonAnimation}></div>
            </div>
          )}
          
          <img 
            src={currentImage.url} 
            alt={currentImage.alt}
            className={`${styles.carouselImage} ${
              loadedImages.has(currentImage.url) ? styles.loaded : ''
            } ${imageError ? styles.error : ''}`}
            onLoad={() => handleImageLoad(currentImage.url)}
            onError={handleImageError}
          />
          
          {imageError && (
            <div className={styles.imageError}>
              <span className={styles.errorIcon}>⚠️</span>
              <span className={styles.errorText}>Failed to load image</span>
            </div>
          )}
        </div>
        
        {images.length > 1 && (
          <>
            <button 
              className={styles.carouselBtnPrev}
              onClick={prevImage}
              aria-label="Previous image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <button 
              className={styles.carouselBtnNext}
              onClick={nextImage}
              aria-label="Next image"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className={styles.carouselIndicators}>
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            <div className={styles.carouselCounter}>
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    </div>
  )
}