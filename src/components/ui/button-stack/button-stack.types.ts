import { ReactNode } from 'react'

export interface MagneticConfig {
  strength?: number    // Сила притяжения (0-1)
  maxPull?: number     // Максимальное смещение в пикселях
  lerp?: number        // Плавность следования
}

export interface ButtonStackProps {
  children: ReactNode
  direction?: 'row' | 'column' | 'grid'
  spacing?: number
  className?: string
  activeIndex: number // Теперь обязательный пропс
  scale?: number
  onActiveChange: (index: number) => void // Теперь обязательный пропс
  interactionMode?: 'hover' | 'click'
  magnetic?: boolean | MagneticConfig
  enableActiveSlider?: boolean
}

export interface ButtonStackItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  isToday?: boolean
  'data-active'?: boolean
  'data-hovered'?: boolean
  'data-index'?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}