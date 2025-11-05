import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { ButtonProps } from './button.types'

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    animation = 'scale',
    loading = false,
    children, 
    onClick,
    disabled,
    ...props 
  }, ref) => {
    
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return
      onClick?.(e)
    }

    const baseClass = 'colabsys-btn'
    const variantClass = `colabsys-btn--${variant}`
    const sizeClass = `colabsys-btn--${size}`
    const animationClass = animation !== 'none' ? `colabsys-btn--${animation}` : ''
    const loadingClass = loading ? 'colabsys-btn--loading' : ''

    return (
      <button
        className={cn(
          baseClass,
          variantClass,
          sizeClass,
          animationClass,
          loadingClass,
          className
        )}
        ref={ref}
        onClick={handleClick}
        disabled={disabled || loading}
        {...props}
      >
        <span className="colabsys-btn__content">
          {children}
        </span>
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }