import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Типы для анимаций
export type AnimationType = 'fadeIn' | 'slideIn' | 'scaleIn' | 'bounceIn'
export type AnimationDirection = 'up' | 'down' | 'left' | 'right'

interface UseAnimationProps {
  type?: AnimationType
  direction?: AnimationDirection
  duration?: number
  delay?: number
  trigger?: 'onMount' | 'onScroll' | 'onHover'
  enabled?: boolean
}

export const useAnimation = ({
  type = 'fadeIn',
  direction = 'up',
  duration = 0.6,
  delay = 0,
  trigger = 'onMount',
  enabled = true
}: UseAnimationProps = {}) => {
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  // Базовые анимации
  const getInitialState = () => {
    const baseState = { opacity: 0 }
    
    switch (type) {
      case 'fadeIn':
        return baseState
        
      case 'slideIn':
        const directionMap = {
          up: { y: 50 },
          down: { y: -50 },
          left: { x: 50 },
          right: { x: -50 }
        }
        return { ...baseState, ...directionMap[direction] }
        
      case 'scaleIn':
        return { ...baseState, scale: 0.8 }
        
      case 'bounceIn':
        return { ...baseState, scale: 0.3 }
        
      default:
        return baseState
    }
  }

  const getFinalState = () => {
    const baseState = { opacity: 1 }
    
    switch (type) {
      case 'fadeIn':
        return baseState
        
      case 'slideIn':
        return { ...baseState, x: 0, y: 0 }
        
      case 'scaleIn':
        return { ...baseState, scale: 1 }
        
      case 'bounceIn':
        return { ...baseState, scale: 1 }
        
      default:
        return baseState
    }
  }

  const getEase = () => {
    switch (type) {
      case 'bounceIn':
        return 'elastic.out(1, 0.8)'
      case 'scaleIn':
        return 'back.out(1.7)'
      default:
        return 'power2.out'
    }
  }

  // Основная анимация
  const animate = () => {
    if (!elementRef.current || !enabled) return

    const element = elementRef.current
    
    // Устанавливаем начальное состояние
    gsap.set(element, getInitialState())
    
    // Запускаем анимацию
    animationRef.current = gsap.to(element, {
      ...getFinalState(),
      duration,
      delay,
      ease: getEase()
    })
  }

  // Анимация при скролле
  const setupScrollAnimation = () => {
    if (!elementRef.current || !enabled) return

    animationRef.current = gsap.fromTo(elementRef.current,
      getInitialState(),
      {
        ...getFinalState(),
        duration,
        delay,
        ease: getEase(),
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  }

  // Очистка анимации
  const cleanup = () => {
    if (animationRef.current) {
      animationRef.current.kill()
      animationRef.current = null
    }
  }

  // Эффекты в зависимости от триггера
  useEffect(() => {
    if (!enabled) return

    switch (trigger) {
      case 'onMount':
        animate()
        break
        
      case 'onScroll':
        setupScrollAnimation()
        break
        
      case 'onHover':
        // Обработка ховера будет через отдельные методы
        break
    }

    return cleanup
  }, [type, direction, duration, delay, trigger, enabled])

  // Методы для ручного управления
  const play = () => {
    if (animationRef.current) {
      animationRef.current.play()
    } else {
      animate()
    }
  }

  const pause = () => {
    animationRef.current?.pause()
  }

  const restart = () => {
    cleanup()
    animate()
  }

  // Ховер анимации
  const setupHover = (onHover?: () => void, onLeave?: () => void) => {
    if (!elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: onHover
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
        onComplete: onLeave
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  return {
    elementRef,
    play,
    pause,
    restart,
    setupHover,
    isActive: animationRef.current?.isActive() || false
  }
}

// Специализированные хуки для конкретных анимаций
export const useFadeIn = (props?: Omit<UseAnimationProps, 'type'>) => 
  useAnimation({ ...props, type: 'fadeIn' })

export const useSlideIn = (direction: AnimationDirection = 'up', props?: Omit<UseAnimationProps, 'type' | 'direction'>) => 
  useAnimation({ ...props, type: 'slideIn', direction })

export const useScaleIn = (props?: Omit<UseAnimationProps, 'type'>) => 
  useAnimation({ ...props, type: 'scaleIn' })

export const useBounceIn = (props?: Omit<UseAnimationProps, 'type'>) => 
  useAnimation({ ...props, type: 'bounceIn' })