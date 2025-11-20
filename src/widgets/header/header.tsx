import React, { useState } from 'react'
import { useDeviceType } from '@/shared/hooks/useDeviceType'
import { useNavigation } from '@/shared/hooks/useNavigation'
import { HeaderDesktop } from './components/desktop/HeaderDesktop'
import { HeaderTablet } from './components/tablet/HeaderTablet'
import { HeaderMobile } from './components/mobile/HeaderMobile'
import { HeaderProps } from './header.types'

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

  const commonProps = {
    isMobileMenuOpen,
    onMobileMenuToggle: handleMobileMenuToggle,
    onMobileMenuClose: handleMobileMenuClose,
    activeIndex,
    onServiceChange: handleServiceChange,
    services,
    className
  }

  // Рендер соответствующего компонента для устройства
  switch (deviceType) {
    case 'desktop':
      return <HeaderDesktop {...commonProps} />
    case 'tablet':
      return <HeaderTablet {...commonProps} />
    case 'mobile':
      return <HeaderMobile {...commonProps} />
    default:
      return <HeaderDesktop {...commonProps} />
  }
}