import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import { useDeviceType } from '@/hooks/useDeviceType'
import { useNavigation } from '@/hooks/useNavigation'
import { MobileMenu } from './mobile-menu'
import { HeaderProps } from './header.types'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import './header.scss'
import { Button } from '@/components/ui/button'


export const Header: React.FC<HeaderProps> = ({
  className,
  onServiceChange,
  activeServiceIndex,
  services: externalServices
}) => {
  const deviceType = useDeviceType()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Используем наш хук навигации
  const { 
    activeServiceIndex: currentActiveIndex, 
    handleServiceChange: handleNavChange,
    services: navServices
  } = useNavigation()

  // Используем внешние сервисы или из хука
  const services = externalServices || navServices
  const activeIndex = activeServiceIndex !== undefined ? activeServiceIndex : currentActiveIndex

  const handleServiceChange = (index: number) => {
    console.log('Changing service to:', index, services[index]?.name)
    handleNavChange(index)
    onServiceChange?.(index)
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  // Рендер навигации в зависимости от устройства
  const renderNavigation = () => {
    switch (deviceType) {
      case 'mobile':
        return (
          <>
            <button 
              className="colabsys-header__mobile-toggle"
              onClick={handleMobileMenuToggle}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onClose={handleMobileMenuClose}
              services={services}
              activeIndex={activeIndex}
              onServiceChange={handleServiceChange}
            />
          </>
        )

      case 'tablet':
        return (
          <div className="colabsys-header__nav colabsys-header__nav--tablet">
            <ButtonStack
              activeIndex={activeIndex}
              onActiveChange={handleServiceChange}
              interactionMode="click"
              enableActiveSlider={true}
              spacing={4}
            >
              {services.slice(0, 4).map((service) => (
                <ButtonStackItem key={service.path}>
                  {service.name}
                </ButtonStackItem>
              ))}
            </ButtonStack>
          </div>
        )

      case 'desktop':
        return (
          <div className="colabsys-header__nav colabsys-header__nav--desktop">
            <ButtonStack
              activeIndex={activeIndex}
              onActiveChange={handleServiceChange}
              interactionMode="click"
              enableActiveSlider={true}
              spacing={8}
            >
              {services.map((service) => (
                <ButtonStackItem key={service.path}>
                  {service.name}
                </ButtonStackItem>
              ))}
            </ButtonStack>
          </div>
        )
        
      default:
        return null
    }
  }

  return (
    <header className={cn('colabsys-header', className)}>
      <div className="colabsys-header__container">
        {/* Логотип */}
        <div className="colabsys-header__logo">
          <div className="colabsys-header__logo-placeholder">
            <h3>SYNC</h3>
          </div>
        </div>

        {/* Навигация */}
        {renderNavigation()}

        {/* Дополнительные элементы */}
        <div className="colabsys-header__actions">
          <div className="colabsys-header__action-items">
          <Button variant="outline">Discuss</Button>

            <ThemeToggle />

          </div>
        </div>
      </div>
      <div className="colabsys-header__blur"></div>
    </header>
  )
}