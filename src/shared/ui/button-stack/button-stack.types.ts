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