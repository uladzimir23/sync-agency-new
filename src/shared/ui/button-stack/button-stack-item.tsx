import React from 'react'
import { cn } from '@/shared/utils/utils'
import { ButtonStackItemProps } from './button-stack.types'
import styles from './button-stack-item.module.scss'

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
          styles.btnStackItem,
          {
            [styles.btnStackItemToday]: isToday,
            [styles.btnStackItemActive]: isActive,
            [styles.btnStackItemHovered]: isHovered,
          },
          className
        )}
        onClick={onClick}
        data-active={isActive}
        {...props}
      >
        <span className={styles.btnStackItem__content}>
          {children}
        </span>
      </button>
    )
  }
)

ButtonStackItem.displayName = "ButtonStackItem"

export { ButtonStackItem }