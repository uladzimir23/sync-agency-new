import React, { useState, useRef, useEffect } from 'react'
import styles from './ServiceFeaturesMobile.module.scss'

interface Feature {
  title: string
  description: string
  detailedDescription: string
  exampleDescription: string
  icon?: string
}

interface ServiceFeaturesMobileProps {
  title: string
  subtitle: string
  features: Feature[]
}

export const ServiceFeaturesMobile: React.FC<ServiceFeaturesMobileProps> = ({
  title,
  subtitle,
  features
}) => {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const [isAnimating, setIsAnimating] = useState<boolean>(false)
  const [heights, setHeights] = useState<number[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // Инициализируем высоты контента
  useEffect(() => {
    const newHeights = features.map((_, index) => {
      const ref = contentRefs.current[index]
      if (ref) {
        return ref.scrollHeight
      }
      return 0
    })
    setHeights(newHeights)
  }, [features])

  const handleCardClick = (index: number) => {
    if (index === activeFeature || isAnimating) return
    
    setIsAnimating(true)
    setActiveFeature(index)
    
    setTimeout(() => {
      setIsAnimating(false)
    },800)
  }

  // Рассчитываем высоту каждого элемента
  const getItemHeight = (index: number) => {
    const baseHeight = 120 // Высота заголовка (приблизительно)
    if (index === activeFeature) {
      return baseHeight + heights[index] + 32 // + padding
    }
    return baseHeight
  }

  return (
    <section className={styles.serviceFeaturesSectionMobile}>
      <div className={styles.serviceFeaturesContainerMobile}>
        <div className={styles.serviceFeaturesHeaderMobile}>
          <h2 className={styles.serviceFeaturesTitleMobile}>{title}</h2>
          <h3 className={styles.serviceFeaturesSubtitleMobile}>{subtitle}</h3>
        </div>

        <div className={styles.accordion}>
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => itemRefs.current[index] = el}
              className={`${styles.accordionItem} ${index === activeFeature ? styles.active : ''} ${isAnimating ? styles.animating : ''}`}
              style={{ 
                height: `${getItemHeight(index)}px`,
                transition: isAnimating ? 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)' : 'none'
              }}
            >
              <div
                className={styles.accordionHeader}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles.headerContent}>
                  <h3 className={styles.accordionTitle}>{feature.title}</h3>
                  <p className={styles.accordionDescription}>
                    {feature.description}
                  </p>
                </div>
                
                <div className={`${styles.arrowContainerMobile} ${index === activeFeature ? styles.arrowActive : ''}`}>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                    className={styles.arrowMobile}
                  >
                    <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
                  </svg>
                </div>
              </div>
              
              <div
                ref={el => contentRefs.current[index] = el}
                className={`${styles.accordionContent} ${index === activeFeature ? styles.contentVisible : ''}`}
              >
                <p className={styles.detailDescription}>
                  {feature.detailedDescription}
                </p>
                <p className={styles.detailExample}>
                  {feature.exampleDescription}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}