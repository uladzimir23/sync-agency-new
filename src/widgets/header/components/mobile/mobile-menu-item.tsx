import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Service } from '../../header.types' // Исправленный путь
import styles from './mobile-menu.mobile.module.scss'

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
  // Обратная задержка для закрытия: последний элемент скрывается первым
  const getDelay = () => {
    if (isOpen) {
      // При открытии: первый элемент появляется первым
      return `${index * 60}ms`
    } else {
      // При закрытии: последний элемент исчезает первым
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