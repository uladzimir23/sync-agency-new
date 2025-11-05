import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import './ServiceFeatures.scss'

interface Feature {
  title: string
  description: string
  detailedDescription: string
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
      
      // Оптимизированные настройки для мгновенного отклика
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
        
        // Упрощенный расчет параллакса
        const posX = (mouseX - centerX) / centerX
        const posY = (mouseY - centerY) / centerY
        
        // Мгновенное обновление без проверок
        if (activeTween) {
          activeTween.kill()
        }

        activeTween = gsap.to(element, {
          x: posX * parallaxDepth,
          y: posY * parallaxDepth,
          rotationY: posX * maxTilt,
          rotationX: posY * -maxTilt,
          duration: 0.1, // Очень короткая длительность для мгновенного отклика
          ease: 'none', // Линейная для максимальной отзывчивости
          overwrite: 'auto'
        })
      }

      const handleMouseLeave = () => {
        isHovered = false
        
        // Быстрый сброс
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

    // Инициализируем параллакс для карточек
    cardRefs.current.forEach((card, index) => {
      if (card && index !== activeFeature) {
        initializeParallax(card)
      }
    })

    // Инициализируем параллакс для детального блока
    if (detailRef.current) {
      initializeParallax(detailRef.current, true)
    }
  }, [activeFeature])

  const handleCardClick = (index: number) => {
    setActiveFeature(index)
  }

  return (
    <section className="service-features-section">
      <div className="service-features-container">
        <div className="service-features-header">
          <h2 className="service-features-title">{title}</h2>
          <p className="service-features-subtitle">{subtitle}</p>
        </div>

        <div className="service-features-content">
          <div className="service-features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                ref={el => cardRefs.current[index] = el}
                className={`service-feature-card ${index === activeFeature ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <h3 className="service-feature-title">{feature.title}</h3>
                <p className="service-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div 
            ref={detailRef}
            className="service-features-detail"
          >
            <div className="feature-detail-content">
              <h3 className="detail-title">{features[activeFeature].description}</h3>
              <p className="detail-description">
                {features[activeFeature].detailedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}