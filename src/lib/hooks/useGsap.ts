import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ColabsysAnimations, AnimationPresets } from '../animations/gsap-animations'

export const useGsap = () => {
  const elementRef = useRef<HTMLElement>(null)
  
  // Анимация появления элемента
  const fadeIn = (options = {}) => {
    if (elementRef.current) {
      return ColabsysAnimations.fadeIn(elementRef.current, options)
    }
  }

  // Анимация появления списка
  const staggerIn = (options = {}) => {
    if (elementRef.current) {
      const children = Array.from(elementRef.current.children) as HTMLElement[]
      return ColabsysAnimations.staggerIn(children, options)
    }
  }

  // Анимация скролла
  const scrollReveal = (options = {}) => {
    if (elementRef.current) {
      return ColabsysAnimations.scrollReveal(elementRef.current, options)
    }
  }

  // Микро-взаимодействия
  const microInteraction = (type: 'pulse' | 'shake' | 'bounce' = 'pulse') => {
    if (elementRef.current) {
      return ColabsysAnimations.microInteraction(elementRef.current, type)
    }
  }

  return {
    elementRef,
    fadeIn,
    staggerIn,
    scrollReveal,
    microInteraction,
    gsap,
    AnimationPresets
  }
}

// Хук для анимаций при наведении
export const useHoverAnimation = () => {
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const onMouseEnter = () => {
      ColabsysAnimations.hoverLift(element)
    }

    const onMouseLeave = () => {
      ColabsysAnimations.hoverReset(element)
    }

    element.addEventListener('mouseenter', onMouseEnter)
    element.addEventListener('mouseleave', onMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', onMouseEnter)
      element.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return { elementRef }
}