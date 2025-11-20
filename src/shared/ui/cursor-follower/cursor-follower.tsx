// src/components/ui/cursor-follower/cursor-follower.tsx
import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import './cursor-follower.scss'

interface CursorFollowerProps {
  size?: number
  delay?: number
  color?: string
  className?: string
  offsetX?: number
  offsetY?: number
}

export const CursorFollower: React.FC<CursorFollowerProps> = ({
  size = 8, // Уменьшили размер
  delay = 0.05,
  color = 'var(--primary-color)', // Изменили на primary цвет
  className,
  offsetX = 10, // Смещение по X
  offsetY = 10  // Смещение по Y
}) => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Функция для проверки, является ли элемент интерактивным
  const isInteractiveElement = (element: HTMLElement): boolean => {
    if (!element) return false
    
    // Проверяем теги
    if (['BUTTON', 'A', 'INPUT', 'SELECT', 'TEXTAREA'].includes(element.tagName)) {
      return true
    }
    
    // Проверяем наличие в DOM родителей с определенными классами
    if (element.closest('button') || 
        element.closest('a') ||
        element.closest('.colabsys-btn-stack-item') ||
        element.closest('.calendar-day') ||
        element.closest('[data-cursor-hover]')) {
      return true
    }
    
    // Проверяем стиль курсора
    const computedStyle = getComputedStyle(element)
    if (element.style.cursor === 'pointer' || computedStyle.cursor === 'pointer') {
      return true
    }
    
    return false
  }

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX + offsetX
    let cursorY = mouseY + offsetY
    let animationFrameId: number

    const updateCursorPosition = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      // Инициализируем позицию курсора при первом движении мыши
      if (!isInitialized) {
        cursorX = mouseX + offsetX
        cursorY = mouseY + offsetY
        setIsInitialized(true)
        setIsVisible(true)
        
        gsap.set(cursor, {
          x: cursorX,
          y: cursorY,
          opacity: 1
        })
      }
    }

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = isInteractiveElement(target)
      setIsHovering(interactive)
    }

    const animateCursor = () => {
      // Плавное следование с задержкой только после инициализации
      if (isInitialized) {
        const targetX = mouseX + offsetX
        const targetY = mouseY + offsetY
        
        cursorX += (targetX - cursorX) * delay
        cursorY += (targetY - cursorY) * delay
      }

      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
        opacity: isVisible ? 1 : 0
      })

      animationFrameId = requestAnimationFrame(animateCursor)
    }

    // Запускаем анимацию
    animateCursor()

    // Слушатели событий
    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mousemove', checkHover)

    // Скрываем курсор при выходе за пределы окна
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => {
      if (isInitialized) setIsVisible(true)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(animationFrameId)
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mousemove', checkHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [size, delay, isInitialized, isVisible, offsetX, offsetY])

  // Анимация масштаба при изменении состояния hover
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (isHovering) {
      // При наведении - мгновенно скрываем
      gsap.to(cursor, {
        scale: 0,
        duration: 0.15,
        ease: "power2.out"
      })
    } else {
      // При уходе - показываем с bounce эффектом
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }, [isHovering])

  return (
    <div
      ref={cursorRef}
      className={`cursor-follower ${className || ''}`}
      style={{
        '--cursor-size': `${size}px`,
        '--cursor-color': color,
      } as React.CSSProperties}
    />
  )
}