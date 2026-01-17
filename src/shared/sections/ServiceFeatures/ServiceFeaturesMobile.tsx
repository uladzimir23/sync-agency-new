import React, { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
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

type ItemState = 'closed' | 'opening' | 'closing' | 'active'

export const ServiceFeaturesMobile: React.FC<ServiceFeaturesMobileProps> = ({
  title,
  subtitle,
  features
}) => {
  const [activeFeature, setActiveFeature] = useState<number>(0)
  const [itemStates, setItemStates] = useState<ItemState[]>(
    features.map((_, index) => index === 0 ? 'active' : 'closed')
  )
  
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const contentRefs = useRef<(HTMLDivElement | null)[]>([])
  const arrowRefs = useRef<(HTMLDivElement | null)[]>([])
  const descriptionRefs = useRef<(HTMLDivElement | null)[]>([])
  const animationTimelines = useRef<(gsap.core.Timeline | null)[]>([])

  // Инициализируем начальные состояния для GSAP
  useEffect(() => {
    features.forEach((_, index) => {
      const item = itemRefs.current[index]
      const content = contentRefs.current[index]
      const arrow = arrowRefs.current[index]
      
      if (item && content && arrow) {
        // Устанавливаем начальные стили в зависимости от состояния
        if (itemStates[index] === 'active') {
          gsap.set(content, { height: 'auto', opacity: 1 })
          gsap.set(arrow, { rotate: 45 })
        } else {
          gsap.set(content, { height: 0, opacity: 0 })
          gsap.set(arrow, { rotate: 0 })
        }
      }
    })
  }, [])

  const handleCardClick = useCallback(async (index: number) => {
    // Если элемент уже в процессе анимации, игнорируем клик
    if (itemStates[index] === 'opening' || itemStates[index] === 'closing') return
    
    // Если кликнули на активный элемент - закрываем его
    if (itemStates[index] === 'active') {
      await closeItem(index)
      return
    }
    
    // Если есть другой активный элемент, закрываем его одновременно с открытием нового
    const currentlyActiveIndex = itemStates.findIndex(state => state === 'active')
    if (currentlyActiveIndex !== -1) {
      // Запускаем параллельные анимации
      await Promise.all([
        closeItem(currentlyActiveIndex),
        openItem(index)
      ])
    } else {
      // Просто открываем новый элемент
      await openItem(index)
    }
  }, [itemStates])

  // Функция для плавного открытия элемента
  const openItem = useCallback(async (index: number): Promise<void> => {
    return new Promise(resolve => {
      const item = itemRefs.current[index]
      const content = contentRefs.current[index]
      const arrow = arrowRefs.current[index]
      const description = descriptionRefs.current[index]
      
      if (!item || !content || !arrow || !description) {
        resolve()
        return
      }

      // Убиваем предыдущую анимацию, если есть
      if (animationTimelines.current[index]) {
        animationTimelines.current[index]!.kill()
      }

      // Сначала устанавливаем состояние opening
      setItemStates(prev => {
        const newStates = [...prev]
        newStates[index] = 'opening'
        return newStates
      })

      // Получаем высоту контента
      const contentHeight = content.scrollHeight
      const closedHeight = 140 // Высота закрытого элемента

      // Создаем новую timeline для анимации
      const tl = gsap.timeline({
        onComplete: () => {
          setItemStates(prev => {
            const newStates = [...prev]
            newStates[index] = 'active'
            return newStates
          })
          setActiveFeature(index)
          animationTimelines.current[index] = null
          resolve()
        }
      })

      animationTimelines.current[index] = tl

      // Анимация открытия с эффектом жидкости Apple
      // Убираем анимацию фона - оставляем ее на CSS
      tl.to(item, {
        duration: 0.25,
        scale: 0.95,
        opacity: 0.9,
        borderRadius: '3.5rem',
        ease: "power2.out"
      }, 0)

      // Параллельно анимируем высоту элемента
      tl.to(item, {
        duration: 0.5,
        height: closedHeight + contentHeight,
        ease: "power2.inOut"
      }, 0)

      // Анимация стрелки
      tl.to(arrow, {
        duration: 0.25,
        rotate: 90,
        ease: "back.out(1.7)",
        opacity: 0,
        color: 'var(--primary-color)'
      }, 0.1)

      // Анимация скрытия короткого описания
      tl.to(description, {
        duration: 0,
        opacity: 0,
        y: -5,
        ease: "power2.in"
      }, 0.0)

      // Анимация появления детального контента с небольшой задержкой
      tl.to(content, {
        duration: 0.25,
        height: contentHeight,
        opacity: 1,
        ease: "power2.out"
      }, 0.2)

      // Завершающая анимация возврата к нормальному scale и opacity
      tl.to(item, {
        duration: 0.25,
        scale: 1.015,
        opacity: 1,
        borderRadius: '2.5rem',
        ease: "power2.in"
      }, 0.2)
    })
  }, [])

  // Функция для плавного закрытия элемента
  const closeItem = useCallback(async (index: number): Promise<void> => {
    return new Promise(resolve => {
      const item = itemRefs.current[index]
      const content = contentRefs.current[index]
      const arrow = arrowRefs.current[index]
      const description = descriptionRefs.current[index]
      
      if (!item || !content || !arrow || !description) {
        resolve()
        return
      }

      // Убиваем предыдущую анимацию, если есть
      if (animationTimelines.current[index]) {
        animationTimelines.current[index]!.kill()
      }

      // Сначала устанавливаем состояние closing
      setItemStates(prev => {
        const newStates = [...prev]
        newStates[index] = 'closing'
        return newStates
      })

      // Получаем текущие значения
      const contentHeight = content.scrollHeight
      const closedHeight = 140 // Высота закрытого элемента

      // Создаем новую timeline для анимации закрытия
      const tl = gsap.timeline({
        onComplete: () => {
          setItemStates(prev => {
            const newStates = [...prev]
            newStates[index] = 'closed'
            return newStates
          })
          if (activeFeature === index) {
            setActiveFeature(-1)
          }
          animationTimelines.current[index] = null
          resolve()
        }
      })

      animationTimelines.current[index] = tl

      // Начальная анимация сжатия с эффектом жидкости Apple
      // Убираем анимацию фона - оставляем ее на CSS
      tl.to(item, {
        duration: 0.25,
        scale: 0.95,
        opacity: 0.9,
        borderRadius: '3rem',
        ease: "power2.out"
      }, 0)

      // Анимация скрытия детального контента
      tl.to(content, {
        duration: 0.2,
        height: 0,
        opacity: 0,
        ease: "power2.in"
      }, 0.05)

      // Анимация стрелки
      tl.to(arrow, {
        duration: 0.25,
        rotate: 0,
        ease: "back.out(1.7)",   
        opacity: 1,     
        color: 'var(--text-primary)'

      }, 0.1)

      // Параллельно анимируем высоту элемента
      tl.to(item, {
        duration: 0.5,
        height: closedHeight,
        ease: "power2.inOut"
      }, 0)

      // Анимация появления короткого описания
      tl.to(description, {
        duration: 0.2,
        opacity: 1,
        y: 0,
        ease: "power2.out"
      }, 0)

      // Завершающая анимация возврата к нормальному scale и opacity
      tl.to(item, {
        duration: 0.25,
        scale: 1,
        opacity: 1,
        borderRadius: '2rem',
        ease: "power2.in"
      }, 0.2)
    })
  }, [activeFeature])

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
              className={`${styles.accordionItem} ${styles[itemStates[index]]}`}
            >
              <div
                className={styles.accordionHeader}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles.headerContent}>
                  <h3 className={styles.accordionTitle}>{feature.title}</h3>
                  <p 
                    ref={el => descriptionRefs.current[index] = el}
                    className={styles.accordionDescription}
                  >
                    {feature.description}
                  </p>
                </div>
                
                <div 
                  ref={el => arrowRefs.current[index] = el}
                  className={styles.arrowContainerMobile}
                >
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
                className={styles.accordionContent}
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