import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Service } from './header.types'
import { MobileMenuItem } from './mobile-menu-item'
import styles from './mobile-menu.mobile.module.scss'

interface MobileMenuContentProps {
  services: readonly Service[]
  activeIndex: number
  onServiceChange: (index: number) => void
  isOpen: boolean
}

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  services,
  activeIndex,
  onServiceChange,
  isOpen
}) => {
  const handleServiceClick = (index: number) => {
    onServiceChange(index)
  }

  return (
    <div className={cn(styles.menu, {
      [styles.menuVisible]: isOpen,
      [styles.menuHidden]: !isOpen
    })}>
      <nav className={cn(styles.nav, {
        [styles.navVisible]: isOpen,
        [styles.navHidden]: !isOpen
      })}>
        {services.map((service, index) => (
          <MobileMenuItem
            key={service.path}
            service={service}
            isActive={index === activeIndex}
            onClick={() => handleServiceClick(index)}
            index={index}
            isOpen={isOpen}
            totalItems={services.length}
          />
        ))}
      </nav>
    </div>
  )
}