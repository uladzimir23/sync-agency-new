import React from 'react'
import { cn } from '@/shared/utils/utils'
import { MobileMenuContentProps } from '../../header.types' // Исправленный путь
import { MobileMenuItem } from './mobile-menu-item' // Исправленный путь
import mobileStyles from './mobile-menu.mobile.module.scss'
import tabletStyles from '../tablet/mobile-menu.tablet.module.scss'

export const MobileMenuContent: React.FC<MobileMenuContentProps> = ({
  services,
  activeIndex,
  onServiceChange,
  isOpen,
  variant = 'mobile'
}) => {
  const styles = variant === 'tablet' ? tabletStyles : mobileStyles

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
            variant={variant}
          />
        ))}
      </nav>
    </div>
  )
}