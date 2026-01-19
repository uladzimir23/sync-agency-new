import React from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/shared/utils/utils'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import { MobileMenu } from '../mobile/MobileMenu'
import { MobileMenuContent } from '../mobile/MobileMenuContent'
import { HeaderDeviceProps } from '../../header.types'
import styles from './header-tablet.module.scss'
import { FaArrowRightArrowLeft } from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { ROUTES } from '@/shared/constants/routes'

export const HeaderTablet: React.FC<HeaderDeviceProps> = ({
  className,
  isMobileMenuOpen,
  onMobileMenuToggle,
  onMobileMenuClose,
  activeIndex,
  onServiceChange,
  services
}) => {
  return (
    <header className={cn(styles.header, className, 'uc-global-container')}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <Link to={ROUTES.HOME} className={styles.logoPlaceholder}>
            <h3>SYNC</h3>
          </Link>
        </div>

        {/* Правый блок с действиями (аналогично мобильной версии) */}
        <div className={styles.actionsSection}>
          {/* Кнопка Discuss */}
          <Button 
            variant="outline" 
            size="md"
            className={styles.discussBtn}
          >
            Discuss
          </Button>

          {/* Переключатель темы */}
          <div className={styles.themeToggle}>
            <ThemeToggle />
          </div>

          {/* Кнопка меню с анимацией как в мобильной версии */}
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