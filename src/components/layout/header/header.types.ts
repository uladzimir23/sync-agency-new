
  export interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
    services: Service[]
    activeIndex: number
    onServiceChange: (index: number) => void
  }

  export interface Service {
    name: string
    path: string
  }
  
  export interface HeaderProps {
    className?: string
    onServiceChange?: (index: number) => void
    activeServiceIndex?: number
    services?: Service[]
  }