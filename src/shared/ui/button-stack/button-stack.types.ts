import { ReactNode } from 'react'

export interface ButtonStackProps {
  children: ReactNode
  direction?: 'row' | 'column' | 'grid'
  spacing?: number
  className?: string
  activeIndex: number
  scale?: number
  onActiveChange: (index: number) => void
  interactionMode?: 'hover' | 'click'
  enableActiveSlider?: boolean
  rememberActive?: boolean
  disabled?: boolean
  showArrows?: boolean // Добавляем пропс для стрелок
}

export interface ButtonStackItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  isToday?: boolean
  showArrow?: boolean // Добавляем пропс для стрелки
  'data-active'?: boolean
  'data-hovered'?: boolean
  'data-index'?: number
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}