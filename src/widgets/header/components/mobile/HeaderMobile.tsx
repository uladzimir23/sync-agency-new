import React from 'react'
import { cn } from '@/shared/utils/utils'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { MobileMenuContent } from './MobileMenuContent'
import { HeaderDeviceProps } from '../../header.types'
import styles from './header-mobile.module.scss'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'

export const HeaderMobile: React.FC<HeaderDeviceProps> = ({
  className,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  activeIndex,
  onServiceChange,
  services
}) => {
  return (
    <header className={cn(
      styles.header, 
      className, 
      'uc-global-container',
      { 
        [styles.headerExpanded]: isMobileMenuOpen
      }
    )}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}>
            <h3>SYNC</h3>
          </div>
        </div>

        {/* Правый блок с действиями */}
        <div className={styles.actionsSection}>
          {/* Переключатель темы */}

          {/* Кнопка Discuss */}
          <Button 
            variant="outline" 
            size="md"
            className={styles.discussBtn}
          >
            Discuss
          </Button>
          <div className={styles.themeToggle}>
            <ThemeToggle />
          </div>


          {/* Кнопка меню */}
          <button 
            className={styles.mobileToggle}
            onClick={onMobileMenuToggle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <FaArrowRightArrowLeft 
              className={cn(styles.menuIcon, { [styles.menuIconHidden]: isMobileMenuOpen })}
              size={18}
            />
            <IoClose 
              className={cn(styles.closeIcon, { [styles.closeIconVisible]: isMobileMenuOpen })}
              size={24}
            />
          </button>
        </div>
      </div>
      
      {/* Blur эффект */}
      <div className={styles.blur}></div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={onMobileMenuClose}
        services={services}
        activeIndex={activeIndex}
        onServiceChange={onServiceChange}
        variant="mobile"
      />

      <MobileMenuContent
        isOpen={isMobileMenuOpen}
        services={services}
        activeIndex={activeIndex}
        onServiceChange={onServiceChange}
        variant="mobile"
      />
    </header>
  )
}