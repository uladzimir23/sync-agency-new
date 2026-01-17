import React, { useState, useRef, useEffect } from 'react'
import styles from './ServiceFeatures.module.scss'

interface Feature {
  title: string
  description: string
  detailedDescription: string
  exampleDescription: string
  icon?: string
}

interface ServiceFeaturesProps {
  title: string
  subtitle: string
  features: Feature[]
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  title,
  subtitle,
  features
}) => {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [detailHeight, setDetailHeight] = useState<number>(0)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const detailContentRef = useRef<HTMLDivElement>(null)
  const detailContainerRef = useRef<HTMLDivElement>(null)

  // Обновляем высоту при изменении активного элемента
  useEffect(() => {
    if (detailContentRef.current && detailContainerRef.current) {
      // Получаем высоту контента
      const contentHeight = detailContentRef.current.scrollHeight
      
      // Получаем computed стили контейнера
      const computedStyle = window.getComputedStyle(detailContainerRef.current)
      const paddingTop = parseFloat(computedStyle.paddingTop) || 0
      const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
      
      // Устанавливаем высоту контейнера (контент + паддинги)
      const totalHeight = contentHeight + paddingTop + paddingBottom
      setDetailHeight(totalHeight)
    }
  }, [activeFeature])

  // Обновляем высоту при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (detailContentRef.current && detailContainerRef.current) {
        const contentHeight = detailContentRef.current.scrollHeight
        const computedStyle = window.getComputedStyle(detailContainerRef.current)
        const paddingTop = parseFloat(computedStyle.paddingTop) || 0
        const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0
        const totalHeight = contentHeight + paddingTop + paddingBottom
        setDetailHeight(totalHeight)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [activeFeature])

  const handleCardClick = (index: number) => {
    if (index === activeFeature || isAnimating) return
    
    setIsAnimating(true)
    setActiveFeature(index)
    
    // Сброс состояния анимации после завершения
    setTimeout(() => {
      setIsAnimating(false)
    }, 200)
  }

  return (
    <section className={styles.serviceFeaturesSection}>
      <div className={styles.serviceFeaturesContainer}>
        <div className={styles.serviceFeaturesHeader}>
          <h2 className={styles.serviceFeaturesTitle}>{title}</h2>
          <h3 className={styles.serviceFeaturesSubtitle}>{subtitle}</h3>
        </div>

        <div className={styles.serviceFeaturesContent}>
          <div className={styles.serviceFeaturesGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${styles.serviceFeatureCard} ${index === activeFeature ? styles.active : ''}`}
                onClick={() => handleCardClick(index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={styles.cardContent}>
                  <h3 className={styles.serviceFeatureTitle}>{feature.title}</h3>
                  <p className={styles.serviceFeatureDescription}>{feature.description}</p> 
                </div>
                
                {/* Стрелка, которая появляется при ховере */}
                <div 
                  className={`${styles.arrowContainer} ${
                    hoveredCard === index || index === activeFeature ? styles.arrowVisible : ''
                  }`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={styles.arrow}
                  >
                    <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <div 
            ref={detailContainerRef}
            className={`${styles.serviceFeaturesDetail} ${isAnimating ? styles.animating : ''}`}
            style={{ height: `${detailHeight}px` }}
          >
            <div 
              ref={detailContentRef}
              className={`${styles.featureDetailContent} ${isAnimating ? styles.contentAnimating : ''}`}
              key={activeFeature}
            >
              <h3 className={styles.detailTitle}>{features[activeFeature].title}</h3>
              <p className={styles.detailDescription}>
                {features[activeFeature].detailedDescription}
              </p>
              <p className={styles.detailExample}>
                {features[activeFeature].exampleDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}