import React, { useState, useRef, useEffect } from 'react'
import styles from './FAQSection.module.scss'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  items: FAQItem[]
  className?: string
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  title = "Frequently Asked Questions",
  items,
  className = ''
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0) // Первый вопрос всегда открыт по умолчанию
  const [heights, setHeights] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const answerRefs = useRef<(HTMLDivElement | null)[]>([])

  // Определяем, мобильное ли устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1024)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Измеряем высоту каждого ответа
  useEffect(() => {
    const newHeights = items.map((_, index) => {
      const element = answerRefs.current[index]?.querySelector('p')
      return element ? element.scrollHeight + 60 : 0
    })
    setHeights(newHeights)
  }, [items])

  // Обработчики для десктопов (ховер)
  const handleMouseEnter = (index: number) => {
    if (!isMobile) {
      setActiveIndex(index)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      // На десктопе при уходе мыши не закрываем последний открытый вопрос
      // Оставляем активным тот, на который навели последним
    }
  }

  // Обработчик для мобильных и планшетов (клик)
  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? activeIndex : index)
      // Если пользователь кликает на уже открытый вопрос, не закрываем его
      // Таким образом всегда остается открытым хотя бы один вопрос
    }
  }

  return (
    <section className={`${styles.faqSection} ${className}`}>
      <h2 className={styles.title}>{title}</h2>
      
      <div className={styles.items}>
        {items.map((item, index) => (
          <div
            key={index}
            className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            onClick={() => handleItemClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className={styles.header}>
              <div className={styles.icon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
                </svg>
              </div>
              <h3 className={styles.question}>{item.question}</h3>
            </div>
            <div 
              className={`${styles.answerContainer} ${activeIndex === index ? styles.expanded : ''}`}
              style={activeIndex === index ? { 
                maxHeight: heights[index] ? `${heights[index]}px` : '1000px' 
              } : {}}
            >
              <div 
                ref={el => answerRefs.current[index] = el}
                className={`${styles.answer} ${activeIndex === index ? styles.expanded : ''}`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}