import React, { useRef, useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { gsap } from 'gsap'
import { ButtonStackProps } from './button-stack.types'
import './button-stack.scss'

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
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const sliderRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
    const [currentActive, setCurrentActive] = useState(activeIndex)
    const [isAnimating, setIsAnimating] = useState(false)
    const [hoverIndex, setHoverIndex] = useState<number | null>(null)
    const [isHovering, setIsHovering] = useState(false)

    // Определяем, какой индекс использовать для слайдера
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
        scale: 0.93,
        borderRadius: 10,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          animationRef.current = gsap.to(slider, {
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
    }, [])

    // Обработчик ховера на элемент
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

    // Обработчик ухода мыши с элемента
    const handleMouseLeave = useCallback(() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
    }, [])

    // Обработчик ухода мыши со всего контейнера
    const handleContainerMouseLeave = useCallback(() => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current)
        hoverTimeoutRef.current = null
      }
      
      setIsHovering(false)
      setHoverIndex(null)
      
      // Возвращаем слайдер к активному табу
      const targetIndex = rememberActive ? currentActive : activeIndex
      updateSliderPosition(targetIndex)
    }, [rememberActive, currentActive, activeIndex, updateSliderPosition])

    // Обработчик клика
    const handleClick = useCallback((index: number) => {
      if (interactionMode === 'click' || rememberActive) {
        setCurrentActive(index)
        onActiveChange?.(index)
        if (rememberActive) {
          updateSliderPosition(index)
        }
      }
    }, [interactionMode, rememberActive, onActiveChange, updateSliderPosition])

    // Инициализация
    useEffect(() => {
      const targetIndex = rememberActive ? currentActive : activeIndex
      updateSliderPosition(targetIndex, true)
    }, [])

    // Обновление при изменении активного индекса
    useEffect(() => {
      setCurrentActive(activeIndex)
      if (rememberActive && !isHovering) {
        updateSliderPosition(activeIndex)
      }
    }, [activeIndex, rememberActive, isHovering, updateSliderPosition])

    // Обновление при изменении hoverIndex
    useEffect(() => {
      if (isHovering && hoverIndex !== null) {
        updateSliderPosition(hoverIndex)
      }
    }, [hoverIndex, isHovering, updateSliderPosition])

    // Обновление при изменении размера
    useEffect(() => {
      const handleResize = () => {
        const targetIndex = getSliderIndex()
        updateSliderPosition(targetIndex, true)
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [getSliderIndex, updateSliderPosition])

    // Очистка при размонтировании
    useEffect(() => {
      return () => {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
        }
        if (animationRef.current) {
          animationRef.current.kill()
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
          'data-index': index
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn(
          'colabsys-btn-stack',
          `colabsys-btn-stack--${direction}`,
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
          className="colabsys-btn-stack__container"
        >
          {enhancedChildren}
          <div 
            ref={sliderRef}
            className="colabsys-btn-stack__slider"
          />
        </div>
      </div>
    )
  }
)

ButtonStack.displayName = "ButtonStack"

export { ButtonStack }