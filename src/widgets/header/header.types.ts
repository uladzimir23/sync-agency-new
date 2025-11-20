export interface Service {
  readonly name: string
  readonly path: string
}

export interface HeaderProps {
  className?: string
  onServiceChange?: (index: number) => void
  activeServiceIndex?: number
  services?: readonly Service[]
}

export interface HeaderDeviceProps extends HeaderProps {
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
  onMobileMenuClose: () => void
  activeIndex: number
  onServiceChange: (index: number) => void
  services: readonly Service[]
}

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  services: readonly Service[]
  activeIndex: number
  onServiceChange: (index: number) => void
  variant?: 'mobile' | 'tablet'
}

export interface MobileMenuContentProps {
  isOpen: boolean
  services: readonly Service[]
  activeIndex: number
  onServiceChange: (index: number) => void
  variant?: 'mobile' | 'tablet'
}