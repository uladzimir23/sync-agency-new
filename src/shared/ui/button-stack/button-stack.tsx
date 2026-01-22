import React, { useRef, useEffect, useState, useCallback } from 'react'
import { cn } from '@/shared/utils/utils'
import { gsap } from 'gsap'
import { ButtonStackProps } from './button-stack.types'
import styles from './button-stack.module.scss'

const ButtonStack = React.forwardRef<HTMLDivElement, ButtonStackProps>(
  ({ 
    children, 
    direction = 'row', 
    spacing = 0,
    className,
    activeIndex = 0,
    onActiveChange,
    interactionMode = 'hover',
    rememberActive = false,
    enableActiveSlider = true,
    disabled = false, // ДОБАВЬТЕ ЭТО
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const activeSliderRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)
    const activeAnimationRef = useRef<gsap.core.Tween | null>(null)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    
    const [currentActive, setCurrentActive] = useState(activeIndex)
    const [isAnimating, setIsAnimating] = useState(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [isHovering, setIsHovering] = useState(false)

    const getSliderIndex = useCallback(() => {
      if (isHovering && hoverIndex !== null) {
        return hoverIndex
      }
      return rememberActive ? currentActive : activeIndex
    }, [isHovering, hoverIndex, rememberActive, currentActive, activeIndex])

    const updateSliderPosition = useCallback((index: number, immediate = false) => {
      const container = containerRef.current
      const slider = sliderRef.current
      if (!container || !slider) return

      const children = container.children
      if (index < 0 || index >= children.length - 1) return

      const targetElement = children[index] as HTMLElement

            // Проверяем, не является ли элемент прошедшей датой
      if (targetElement.classList.contains('past')) {
        // Не обновляем слайдер для прошедших дат
        return
      }
      
      const targetRect = targetElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const x = targetRect.left - containerRect.left
      const y = targetRect.top - containerRect.top
      const width = targetRect.width
      const height = targetRect.height

      if (animationRef.current) {
        animationRef.current.kill()
      }

      if (immediate) {
        gsap.set(slider, {
          x,
          y,
          width,
          height,
          scale: 1,
          borderRadius: 15
        })
        return
      }

      setIsAnimating(true)
      
      animationRef.current = gsap.to(slider, {
        x,
        y,
        width,
        height,
        scale: 1.05,
        borderRadius: 12,
        duration: 0.2,
        ease: "power2.out",
        onComplete: () => {
          animationRef.current = gsap.to(slider, {
            borderRadius: 15,
            duration: 0.2,
            scale: 1,
            ease: "power2.out",
            onComplete: () => {
              setIsAnimating(false)
              animationRef.current = null
            }
          })
        }
      })
    }, [])

    const updateActiveSliderPosition = useCallback((index: number, immediate = false) => {
      if (!enableActiveSlider) return
      
      const container = containerRef.current
      const activeSlider = activeSliderRef.current
      if (!container || !activeSlider) return

      const children = container.children
      if (index < 0 || index >= children.length - 1) return

      const targetElement = children[index] as HTMLElement

            // Проверяем, не является ли элемент прошедшей датой
      if (targetElement.classList.contains('past')) {
        // Не обновляем слайдер для прошедших дат
        return
      }
      const targetRect = targetElement.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      const x = targetRect.left - containerRect.left
      const y = targetRect.top - containerRect.top
      const width = targetRect.width
      const height = targetRect.height

      if (activeAnimationRef.current) {
        activeAnimationRef.current.kill()
      }

      if (immediate) {
        gsap.set(activeSlider, {
          x,
          y,
          width,
          height,
          opacity: 1,
          borderRadius: 15

        })
        return
      }

      activeAnimationRef.current = gsap.to(activeSlider, {
        x,
        y,
        width,
        height,
        scale: 1.05,
        borderRadius: 12,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          animationRef.current = gsap.to(activeSlider, {
            borderRadius: 15,
            duration: 0.3,
            scale: 1,
            ease: "power2.out",
            onComplete: () => {
              setIsAnimating(false)
              animationRef.current = null
            }
          })
        }
      })
    }, [enableActiveSlider])

    const handleMouseEnter = useCallback((index: number) => {
      if (interactionMode === 'hover') {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }

        hoverTimeoutRef.current = setTimeout(() => {
          setHoverIndex(index)
          setIsHovering(true)
          if (!rememberActive) {
            setCurrentActive(index)
            onActiveChange?.(index)
          }
          updateSliderPosition(index)
        }, 25)
      } else {
        setHoverIndex(index)
        setIsHovering(true)
        updateSliderPosition(index)
      }
    }, [interactionMode, rememberActive, onActiveChange, updateSliderPosition])

    const handleMouseLeave = useCallback(() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
    }, [])

    const handleContainerMouseLeave = useCallback(() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      
      setIsHovering(false)
      setHoverIndex(null)
      
      const targetIndex = rememberActive ? currentActive : activeIndex
      updateSliderPosition(targetIndex)
    }, [rememberActive, currentActive, activeIndex, updateSliderPosition])

    const handleClick = useCallback((index: number) => {
      if (interactionMode === 'click' || rememberActive) {
        setCurrentActive(index)
        onActiveChange?.(index)
        if (rememberActive) {
          updateSliderPosition(index)
        }
        updateActiveSliderPosition(index)
      }
    }, [interactionMode, rememberActive, onActiveChange, updateSliderPosition, updateActiveSliderPosition])

    useEffect(() => {
      const targetIndex = rememberActive ? currentActive : activeIndex
      updateSliderPosition(targetIndex, true)
      updateActiveSliderPosition(targetIndex, true)
    }, [])

    useEffect(() => {
      setCurrentActive(activeIndex)
      if (rememberActive && !isHovering) {
        updateSliderPosition(activeIndex)
      }
      updateActiveSliderPosition(activeIndex)
    }, [activeIndex, rememberActive, isHovering, updateSliderPosition, updateActiveSliderPosition])

    useEffect(() => {
      if (isHovering && hoverIndex !== null) {
        updateSliderPosition(hoverIndex)
      }
    }, [hoverIndex, isHovering, updateSliderPosition])

    useEffect(() => {
      const handleResize = () => {
        const targetIndex = getSliderIndex()
        updateSliderPosition(targetIndex, true)
        updateActiveSliderPosition(currentActive, true)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [getSliderIndex, updateSliderPosition, updateActiveSliderPosition, currentActive])

    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        if (animationRef.current) {
          animationRef.current.kill()
        }
        if (activeAnimationRef.current) {
          activeAnimationRef.current.kill()
        }
      }
    }, [])

    const enhancedChildren = React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          // @ts-ignore
          onMouseEnter: () => handleMouseEnter(index),
          onMouseLeave: handleMouseLeave,
          onClick: () => handleClick(index),
          'data-active': currentActive === index,
          'data-index': index,
          showArrow: true, // Добавляем стрелку для всех элементов
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn(
          styles.btnStack,
          styles[`btnStack--${direction}`],
          className
        )}
        style={{
          gap: spacing,
          ['--spacing' as any]: `${spacing}px`
        }}
        onMouseLeave={handleContainerMouseLeave}
      >
        <div 
          ref={containerRef}
          className={styles.btnStack__container}
        >
          {enhancedChildren}
          <div 
            ref={sliderRef}
            className={styles.btnStack__slider}
          />
          {enableActiveSlider && (
            <div 
              ref={activeSliderRef}
              className={styles.btnStack__activeSlider}
            />
          )}
        </div>
      </div>
    )
  }
)

ButtonStack.displayName = "ButtonStack"

export { ButtonStack }