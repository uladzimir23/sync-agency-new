export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  services: readonly Service[] // Добавляем readonly
  activeIndex: number
  onServiceChange: (index: number) => void
}

export interface Service {
  readonly name: string
  readonly path: string
}

export interface HeaderProps {
  className?: string
  onServiceChange?: (index: number) => void
  activeServiceIndex?: number
  services?: readonly Service[] // Добавляем readonly здесь тоже
}