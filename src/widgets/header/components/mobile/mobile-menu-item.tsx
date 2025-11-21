import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Service } from '../../header.types'
// Исправленные импорты
import mobileStyles from './mobile-menu.mobile.module.scss'
import tabletStyles from '../tablet/mobile-menu.tablet.module.scss'

interface MobileMenuItemProps {
  service: Service
  isActive: boolean
  onClick: () => void
  index: number
  isOpen: boolean
  totalItems: number
  variant?: 'mobile' | 'tablet'
}

export const MobileMenuItem: React.FC<MobileMenuItemProps> = ({
  service,
  isActive,
  onClick,
  index,
  isOpen,
  totalItems,
  variant = 'mobile'
}) => {
  const styles = variant === 'tablet' ? tabletStyles : mobileStyles

  const getDelay = () => {
    if (isOpen) {
      return `${index * 60}ms`
    } else {
      return `${(totalItems - 1 - index) * 60}ms`
    }
  }

  return (
    <button
      className={cn(styles.item, {
        [styles.itemActive]: isActive,
        [styles.itemVisible]: isOpen,
        [styles.itemHidden]: !isOpen
      })}
      onClick={onClick}
      style={{ 
        transitionDelay: getDelay()
      }}
    >
      {service.name}
    </button>
  )
}