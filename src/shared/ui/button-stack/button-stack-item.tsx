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
    showArrow = false, // Добавляем новый пропс
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
            [styles.btnStackItemWithArrow]: showArrow, // Добавляем класс для кнопки со стрелкой
          },
          className
        )}
        onClick={onClick}
        data-active={isActive}
        data-hovered={isHovered}
        {...props}
      >
        <span className={styles.btnStackItem__content}>
          {children}
        </span>
        
        {/* Добавляем стрелку */}
        {showArrow && (
          <div className={styles.btnStackItem__arrowContainer}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              className={styles.btnStackItem__arrow}
            >
              <path d="M0 14.0904L0 10.6205H16.3636C15.2253 9.55926 14.6453 8.92032 13.3636 6.86145C12.4743 5.43281 12 3.10241 11.7273 1.65663L14.7273 0.5C15.4545 2.33133 15.7727 4.54819 18.2727 7.72892C19.8636 9.75301 21.8182 10.3313 24 10.6205V14.0904C21.5455 14.3795 19.5415 15.1087 17.7273 17.8494C15.913 20.5901 15.1818 22.9578 14.7273 24.5L11.7273 23.0542C12.1818 21.8976 12.664 19.9352 13.6364 18.1386C14.6087 16.3419 15.6364 14.9578 16.3636 14.0904H0Z"/>
            </svg>
          </div>
        )}
      </button>
    )
  }
)

ButtonStackItem.displayName = "ButtonStackItem"

export { ButtonStackItem }