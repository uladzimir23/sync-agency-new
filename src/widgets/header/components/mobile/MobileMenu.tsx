import React from 'react'
import { cn } from '@/shared/utils/utils'
import { MobileMenuProps } from '../../header.types' // Исправленный путь
import mobileStyles from './mobile-menu.mobile.module.scss'
import tabletStyles from '../tablet/mobile-menu.tablet.module.scss'

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  variant = 'mobile'
}) => {
  const styles = variant === 'tablet' ? tabletStyles : mobileStyles

  return (
    <div 
      className={cn(styles.overlay, { 
        [styles.overlayVisible]: isOpen,
        [styles.overlayHidden]: !isOpen
      })}
      onClick={onClose}
    />
  )
}