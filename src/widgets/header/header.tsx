import React, { useState } from 'react'
import { cn } from '@/shared/utils/utils'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { Button } from '@/shared/ui/button'
import { useDeviceType } from '@/shared/hooks/useDeviceType'
import { useNavigation } from '@/shared/hooks/useNavigation'
import { MobileMenu } from './mobile-menu'
import { MobileMenuContent } from './mobile-menu-content'
import { HeaderProps } from './header.types'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import styles from './header.module.scss'
// Импортируем иконки из react-icons
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

export const Header: React.FC<HeaderProps> = ({
  className,
  onServiceChange,
  activeServiceIndex,
  services: externalServices
}) => {
  const deviceType = useDeviceType()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const { 
    activeServiceIndex: currentActiveIndex, 
    handleServiceChange: handleNavChange,
    services: navServices
  } = useNavigation()

  const services = externalServices || navServices
  const activeIndex = activeServiceIndex !== undefined ? activeServiceIndex : currentActiveIndex

  const handleServiceChange = (index: number) => {
    console.log('Changing service to:', index, services[index]?.name)
    handleNavChange(index)
    onServiceChange?.(index)
    setIsMobileMenuOpen(false)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  // Рендер навигации в зависимости от устройства
  const renderNavigation = () => {
    if (deviceType === 'mobile') {
      return (
        <button 
          className={cn(styles.mobileToggle, 'menu-toggle')}
          onClick={handleMobileMenuToggle}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {/* Иконка двойной стрелки (повернута на 90 градусов) */}
          <FaArrowRightArrowLeft 
            className={cn(styles.menuIcon, { [styles.menuIconHidden]: isMobileMenuOpen })}
            size={18}
          />
          
          {/* Иконка крестика */}
          <IoClose 
            className={cn(styles.closeIcon, { [styles.closeIconVisible]: isMobileMenuOpen })}
            size={24}
          />
        </button>
      )
    }

    // Для tablet и desktop используем ButtonStack + кнопку меню
    const displayServices = deviceType === 'tablet' ? services.slice(0, 4) : services
    
    return (
      <div className={cn(
        styles.nav,
        deviceType === 'tablet' ? styles.navTablet : styles.navDesktop
      )}>
        <ButtonStack
          activeIndex={activeIndex}
          onActiveChange={handleServiceChange}
          interactionMode="click"
          enableActiveSlider={true}
          spacing={deviceType === 'tablet' ? 4 : 8}
        >
          {displayServices.map((service) => (
            <ButtonStackItem key={service.path}>
              {service.name}
            </ButtonStackItem>
          ))}
        </ButtonStack>
      </div>
    )
  }

  return (
    <header className={cn(
      styles.header, 
      className, 
      'uc-global-container',
      { 
        [styles.headerExpanded]: isMobileMenuOpen && deviceType === 'mobile'
      }
    )}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}>
            <h3>SYNC</h3>
          </div>
        </div>

        {/* Навигация */}
        {renderNavigation()}

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

      {/* Mobile Menu Overlay (только для мобильных) */}
      {deviceType === 'mobile' && (
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
          services={services}
          activeIndex={activeIndex}
          onServiceChange={handleServiceChange}
        />
      )}

      {/* Mobile Menu Content (только для мобильных) */}
      {deviceType === 'mobile' && (
        <MobileMenuContent
          isOpen={isMobileMenuOpen}
          services={services}
          activeIndex={activeIndex}
          onServiceChange={handleServiceChange}
        />
      )}
    </header>
  )
}