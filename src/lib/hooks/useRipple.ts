import { useCallback, useRef } from 'react'

interface RippleOptions {
  color?: string
  opacity?: number
  duration?: number
  easing?: string
  disabled?: boolean
}

export const useRipple = (options: RippleOptions = {}) => {
  const {
    color = 'currentColor',
    opacity = 0.3,
    duration = 600,
    easing = 'linear',
    disabled = false
  } = options

  const elementRef = useRef<HTMLElement>(null)

  const createRipple = useCallback((event: React.MouseEvent<HTMLElement>) => {
    if (disabled) return

    const element = elementRef.current
    if (!element) return

    // Получаем позицию и размеры элемента
    const rect = element.getBoundingClientRect()
    
    // Вычисляем позицию клика относительно элемента
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    // Вычисляем диаметр ripple эффекта (максимальный размер)
    const diameter = Math.max(rect.width, rect.height)
    
    // Создаем элемент для ripple эффекта
    const ripple = document.createElement('div')
    ripple.className = 'ripple-effect'
    
    // Устанавливаем стили через CSS класс и инлайновые стили
    Object.assign(ripple.style, {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: opacity.toString(),
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%) scale(0)',
      transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
      left: `${x}px`,
      top: `${y}px`,
      width: `${diameter}px`,
      height: `${diameter}px`
    })
    
    // Добавляем ripple в элемент
    if (element.style.position !== 'absolute' && 
        element.style.position !== 'fixed' && 
        element.style.position !== 'relative') {
      element.style.position = 'relative'
    }
    element.style.overflow = 'hidden'
    element.appendChild(ripple)
    
    // Запускаем анимацию
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(2)'
      ripple.style.opacity = '0'
    })
    
    // Удаляем элемент после анимации
    setTimeout(() => {
      if (ripple.parentElement === element) {
        element.removeChild(ripple)
      }
    }, duration)
  }, [color, opacity, duration, easing, disabled])

  return {
    elementRef,
    createRipple
  }
}

// Хук для глобального ripple эффекта
export const useGlobalRipple = (options: Omit<RippleOptions, 'disabled'> = {}) => {
  const {
    color = 'rgba(0, 0, 0, 0.1)',
    opacity = 0.5,
    duration = 1000,
    easing = 'cubic-bezier(0, 0, 0.2, 1)'
  } = options

  const createGlobalRipple = useCallback((event: MouseEvent) => {
    const ripple = document.createElement('div')
    const size = Math.max(window.innerWidth, window.innerHeight)
    
    ripple.className = 'global-ripple'
    
    Object.assign(ripple.style, {
      position: 'fixed',
      borderRadius: '50%',
      backgroundColor: color,
      opacity: opacity.toString(),
      pointerEvents: 'none',
      transform: 'translate(-50%, -50%) scale(0)',
      transition: `transform ${duration}ms ${easing}, opacity ${duration}ms ${easing}`,
      left: `${event.clientX}px`,
      top: `${event.clientY}px`,
      width: `${size}px`,
      height: `${size}px`,
      zIndex: '9999'
    })
    
    document.body.appendChild(ripple)
    
    // Запускаем анимацию
    requestAnimationFrame(() => {
      ripple.style.transform = 'translate(-50%, -50%) scale(1)'
      ripple.style.opacity = '0'
    })
    
    // Удаляем после анимации
    setTimeout(() => {
      if (ripple.parentElement) {
        ripple.parentElement.removeChild(ripple)
      }
    }, duration)
  }, [color, opacity, duration, easing])

  return { createGlobalRipple }
}