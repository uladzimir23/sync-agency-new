import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Service } from './header.types'
import styles from './mobile-menu.mobile.module.scss'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  services: readonly Service[]
  activeIndex: number
  onServiceChange: (index: number) => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  services,
  activeIndex,
  onServiceChange
}) => {
  return (
    <>
      <div 
        className={cn(styles.overlay, { 
          [styles.overlayVisible]: isOpen,
          [styles.overlayHidden]: !isOpen
        })}
        onClick={onClose}
      />
    </>
  )
}