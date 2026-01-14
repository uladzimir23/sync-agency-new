import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import styles from './ServiceFeatures.module.scss'

interface Feature {
  title: string
  description: string
  detailedDescription: string
  exampleDescription: string // Новое поле
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const detailRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initializeParallax = (element: HTMLElement, isDetail = false) => {
      let isHovered = false
      let activeTween: gsap.core.Tween | null = null
      
      const parallaxDepth = isDetail ? 6 : 4
      const maxTilt = isDetail ? 1.5 : 2

      const handleMouseEnter = () => {
        isHovered = true
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (!isHovered) return
        
        const rect = element.getBoundingClientRect()
        const centerX = rect.width / 2
        const centerY = rect.height / 2
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        const posX = (mouseX - centerX) / centerX
        const posY = (mouseY - centerY) / centerY
        
        if (activeTween) {
          activeTween.kill()
        }

        activeTween = gsap.to(element, {
          x: posX * parallaxDepth,
          y: posY * parallaxDepth,
          rotationY: posX * maxTilt,
          rotationX: posY * -maxTilt,
          duration: 0.1,
          ease: 'none',
          overwrite: 'auto'
        })
      }

      const handleMouseLeave = () => {
        isHovered = false
        
        gsap.to(element, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.08,
          ease: 'none'
        })
        
        activeTween = null
      }

      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }

    cardRefs.current.forEach((card, index) => {
      if (card && index !== activeFeature) {
        initializeParallax(card)
      }
    })

    if (detailRef.current) {
      initializeParallax(detailRef.current, true)
    }
  }, [activeFeature])

  const handleCardClick = (index: number) => {
    setActiveFeature(index)
  }

  return (
    <section className={styles.serviceFeaturesSection}>
      <div className={styles.serviceFeaturesContainer}>
        <div className={styles.serviceFeaturesHeader}>
          <h2 className={styles.serviceFeaturesTitle}>{title}</h2>
          <p className={styles.serviceFeaturesSubtitle}>{subtitle}</p>
        </div>

        <div className={styles.serviceFeaturesContent}>
          <div className={styles.serviceFeaturesGrid}>
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className={`${styles.serviceFeatureCard} ${index === activeFeature ? styles.active : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <h3 className={styles.serviceFeatureTitle}>{feature.title}</h3>
                
                <p className={styles.serviceFeatureDescription}>{feature.description}</p> 
                
              </div>
            ))}
          </div>

          <div 
            ref={detailRef}
            className={styles.serviceFeaturesDetail}
          >
            <div className={styles.featureDetailContent}>
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