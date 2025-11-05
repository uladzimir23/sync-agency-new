import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { createNoise3D } from 'simplex-noise'
import './WavyBackground.scss'

export interface WavyBackgroundProps {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
  colors?: string[]
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: 'slow' | 'fast'
  waveOpacity?: number
  [key: string]: any
}

export const WavyBackground: React.FC<WavyBackgroundProps> = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = 'transparent',
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}) => {
  const [isSafari, setIsSafari] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [computedBackgroundFill, setComputedBackgroundFill] = useState('transparent')
  
  const noise = createNoise3D()
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  // Функция для получения вычисленного значения CSS переменной
  const getComputedColor = (color: string): string => {
    if (!isClient) return 'transparent'
    
    // Если цвет не CSS переменная, возвращаем как есть
    if (!color.startsWith('var(--')) return color
    
    // Извлекаем имя переменной
    const variableName = color.replace('var(', '').replace(')', '')
    
    // Создаем временный элемент для вычисления значения
    const tempEl = document.createElement('div')
    tempEl.style.color = 'transparent'
    tempEl.style.setProperty('color', color)
    document.body.appendChild(tempEl)
    
    // Получаем вычисленное значение
    const computedValue = getComputedStyle(tempEl).color
    document.body.removeChild(tempEl)
    
    return computedValue || 'transparent'
  }

  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.001
      case 'fast':
        return 0.002
      default:
        return 0.001
    }
  }

  const init = () => {
    if (!isClient) return
    canvas = canvasRef.current
    if (!canvas) return
    ctx = canvas.getContext('2d')
    if (!ctx) return
    
    w = ctx.canvas.width = canvas.offsetWidth
    h = ctx.canvas.height = canvas.offsetHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = function () {
      if (!canvas || !ctx) return
      w = ctx.canvas.width = canvas.offsetWidth
      h = ctx.canvas.height = canvas.offsetHeight
      ctx.filter = `blur(${blur}px)`
    }
    render()
  }

  const waveColors = colors ?? [
    '#38bdf8',
    '#818cf8',
    '#c084fc',
    '#e879f9',
    '#22d3ee',
  ]

  const drawWave = (n: number) => {
    if (!ctx) return
    nt += getSpeed()
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 50
      ctx.strokeStyle = waveColors[i % waveColors.length]
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100
        ctx.lineTo(x, y + h * 0.5)
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId: number
  const render = () => {
    if (!ctx) return
    ctx.fillStyle = computedBackgroundFill
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    drawWave(5)
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    if (isClient) {
      // Вычисляем значение CSS переменной
      const computedColor = getComputedColor(backgroundFill)
      setComputedBackgroundFill(computedColor)
    }
  }, [isClient, backgroundFill])

  useEffect(() => {
    if (isClient) {
      init()
    }
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isClient, blur, computedBackgroundFill, waveOpacity, speed, waveWidth, colors])

  useEffect(() => {
    setIsClient(true)
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome')
    )
  }, [])

  // Обработчик изменения темы
  useEffect(() => {
    if (!isClient) return

    const handleThemeChange = () => {
      const computedColor = getComputedColor(backgroundFill)
      setComputedBackgroundFill(computedColor)
    }

    // Слушаем изменения в DOM которые могут быть связаны с темой
    const observer = new MutationObserver(handleThemeChange)
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [isClient, backgroundFill])

  return (
    <div
      className={cn(
        'wavy-background-container',
        containerClassName
      )}
    >
      <canvas
        className="wavy-background-canvas"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isClient && isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn('wavy-background-content', className)} {...props}>
        {children}
      </div>
    </div>
  )
}