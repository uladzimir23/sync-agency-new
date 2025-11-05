import { ReactNode } from 'react'

export interface ButtonStackProps {
  children: ReactNode
  direction?: 'row' | 'column'
  spacing?: number
  className?: string
  activeIndex?: number
  scale?: number
  onActiveChange?: (index: number) => void

}

export interface ButtonStackItemProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}