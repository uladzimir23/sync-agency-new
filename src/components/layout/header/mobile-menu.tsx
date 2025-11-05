import React from 'react'
import { cn } from '@/lib/utils'
import { Service } from './header.types'
import './mobile-menu.scss'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  services: Service[]
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
  const handleServiceClick = (index: number) => {
    onServiceChange(index)
    onClose()
  }

  return (
    <>
      {/* Overlay */}
      <div 
        className={cn('mobile-menu-overlay', { 'mobile-menu-overlay--visible': isOpen })}
        onClick={onClose}
      />
      
      {/* Menu */}
      <div className={cn('mobile-menu', { 'mobile-menu--open': isOpen })}>
        <div className="mobile-menu__header">
          <button 
            className="mobile-menu__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <span></span>
            <span></span>
          </button>
        </div>
        
        <nav className="mobile-menu__nav">
          {services.map((service, index) => (
            <button
              key={service.path}
              className={cn('mobile-menu__item', {
                'mobile-menu__item--active': index === activeIndex
              })}
              onClick={() => handleServiceClick(index)}
            >
              {service.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  )
}