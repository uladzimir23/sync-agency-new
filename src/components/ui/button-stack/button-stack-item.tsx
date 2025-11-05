import React from 'react'
import { cn } from '@/lib/utils'
import { ButtonStackItemProps } from './button-stack.types'

const ButtonStackItem = React.forwardRef<HTMLButtonElement, ButtonStackItemProps>(
  ({ 
    children, 
    className,
    onClick,
    isToday = false,
    'data-active': isActive = false,
    'data-hovered': isHovered = false,
    ...props 
  }, ref) => {
    
    return (
      <button
        ref={ref}
        className={cn(
          'colabsys-btn-stack-item',
          {
            'colabsys-btn-stack-item--active': isActive,
            'colabsys-btn-stack-item--today': isToday,
            'colabsys-btn-stack-item--hovered': isHovered,
          },
          className
        )}
        onClick={onClick}
        {...props}
      >
        <span className="colabsys-btn-stack-item__content">
          {children}
        </span>
      </button>
    )
  }
)

ButtonStackItem.displayName = "ButtonStackItem"

export { ButtonStackItem }