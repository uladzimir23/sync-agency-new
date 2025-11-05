import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'success' | 'warning' | 'link'
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  animation?: 'scale' | 'lift' | 'glow' | 'none'
  glow?: boolean
  gradient?: boolean
  hoverEffect?: boolean
  loading?: boolean
}