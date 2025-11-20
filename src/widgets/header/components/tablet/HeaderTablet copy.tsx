import React from 'react'
import { cn } from '@/shared/utils/utils'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import { MobileMenu } from '../mobile/MobileMenu'
import { MobileMenuContent } from '../mobile/MobileMenuContent'
import { HeaderDeviceProps } from '../../header.types'
import styles from './header-tablet.module.scss'

export const HeaderTablet: React.FC<HeaderDeviceProps> = ({
  className,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  activeIndex,
  onServiceChange,
  services
}) => {
  const displayServices = services.slice(0, 4)

  return (
    <header className={cn(styles.header, className, 'uc-global-container')}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}>
            <h3>SYNC</h3>
          </div>
        </div>

        {/* Навигация + меню */}
        <div className={styles.navSection}>
          {/* Основная навигация */}
          <div className={styles.nav}>
            <ButtonStack
              activeIndex={activeIndex}
              onActiveChange={onServiceChange}
              interactionMode="click"
              enableActiveSlider={true}
              spacing={4}
            >
              {displayServices.map((service) => (
                <ButtonStackItem key={service.path}>
                  {service.name}
                </ButtonStackItem>
              ))}
            </ButtonStack>
          </div>

          {/* Кнопка меню */}
          <button 
            className={styles.menuToggle}
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className={styles.menuIcon}>☰</span>
          </button>
        </div>

        {/* Дополнительные элементы */}
        <div className={styles.actions}>
          <div className={styles.actionItems}>
            <Button variant="outline">Discuss</Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
      
      {/* Blur эффект */}
      <div className={styles.blur}></div>

      {/* Mobile Menu для tablet */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
        services={services}
        activeIndex={activeIndex}
        onServiceChange={onServiceChange}
        variant="tablet"
      />

      <MobileMenuContent
        isOpen={isMobileMenuOpen}
        services={services}
        activeIndex={activeIndex}
        onServiceChange={onServiceChange}
        variant="tablet"
      />
    </header>
  )
}