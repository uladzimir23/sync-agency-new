import React from 'react'
import { cn } from '@/lib/utils'
import { ButtonStackItemProps } from './button-stack.types'

const ButtonStackItem = React.forwardRef<HTMLButtonElement, ButtonStackItemProps>(
  ({ 
    children, 
    className,
    onClick,
    isToday = false,
    ...props 
  }, ref) => {
    
    return (
      <button
        ref={ref}
        className={cn(
          'colabsys-btn-stack-item',
          {
            'colabsys-btn-stack-item--today': isToday,
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