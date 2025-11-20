import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './FAQSection.scss'

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
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Анимация появления секции
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleItemClick = (index: number) => {
    if (activeIndex === index) {
      // Закрываем текущий элемент
      closeItem(index)
      setActiveIndex(null)
    } else {
      // Закрываем предыдущий и открываем новый
      if (activeIndex !== null) {
        closeItem(activeIndex)
      }
      openItem(index)
      setActiveIndex(index)
    }
  }

  const openItem = (index: number) => {
    const item = itemRefs.current[index]
    if (!item) return

    const answer = item.querySelector('.faq-answer') as HTMLElement
    const icon = item.querySelector('.faq-icon') as HTMLElement

    // Анимация иконки
    gsap.to(icon, {
      backgroundColor: 'var(--primary-color)',
      borderColor: 'var(--primary-color)',
      duration: 0.3,
      ease: "power2.out"
    })

    gsap.to(icon.querySelector('svg'), {
      rotation: 90,
      fill: 'white',
      duration: 0.4,
      ease: "back.out(1.7)"
    })

    // Анимация ответа
    gsap.to(answer, {
      maxHeight: answer.scrollHeight,
      opacity: 1,
      marginTop: '1.5rem',
      duration: 0.6,
      ease: "power2.out"
    })

    // Анимация вопроса
    gsap.to(item.querySelector('.faq-question'), {
      color: 'var(--primary-color)',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const closeItem = (index: number) => {
    const item = itemRefs.current[index]
    if (!item) return

    const answer = item.querySelector('.faq-answer') as HTMLElement
    const icon = item.querySelector('.faq-icon') as HTMLElement

    // Анимация иконки
    gsap.to(icon, {
      backgroundColor: 'transparent',
      borderColor: 'var(--border-color)',
      duration: 0.3,
      ease: "power2.out"
    })

    gsap.to(icon.querySelector('svg'), {
      rotation: 0,
      fill: 'var(--text-secondary)',
      duration: 0.4,
      ease: "back.out(1.7)"
    })

    // Анимация ответа
    gsap.to(answer, {
      maxHeight: 0,
      opacity: 0,
      marginTop: '0',
      duration: 0.4,
      ease: "power2.in"
    })

    // Анимация вопроса
    gsap.to(item.querySelector('.faq-question'), {
      color: 'var(--text-primary)',
      duration: 0.3,
      ease: "power2.out"
    })
  }

  const handleMouseEnter = (index: number) => {
    if (window.innerWidth > 1024 && activeIndex !== index) {
      const icon = itemRefs.current[index]?.querySelector('.faq-icon') as HTMLElement
      if (icon) {
        gsap.to(icon, {
          backgroundColor: 'var(--primary-color)',
          borderColor: 'var(--primary-color)',
          duration: 0.2,
          ease: "power2.out"
        })

        gsap.to(icon.querySelector('svg'), {
          fill: 'white',
          duration: 0.2,
          ease: "power2.out"
        })
      }
    }
  }

  const handleMouseLeave = (index: number) => {
    if (window.innerWidth > 1024 && activeIndex !== index) {
      const icon = itemRefs.current[index]?.querySelector('.faq-icon') as HTMLElement
      if (icon) {
        gsap.to(icon, {
          backgroundColor: 'transparent',
          borderColor: 'var(--border-color)',
          duration: 0.2,
          ease: "power2.out"
        })

        gsap.to(icon.querySelector('svg'), {
          fill: 'var(--text-secondary)',
          duration: 0.2,
          ease: "power2.out"
        })
      }
    }
  }

  return (
    <section ref={sectionRef} className={`faq-section ${className}`}>
      <h2 className="faq-title">{title}</h2>
      
      <div className="faq-items">
        {items.map((item, index) => (
          <div
            key={index}
            ref={el => itemRefs.current[index] = el}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div 
              className="faq-header"
              onClick={() => handleItemClick(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="faq-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
                </svg>
              </div>
              <h3 className="faq-question">{item.question}</h3>
            </div>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}