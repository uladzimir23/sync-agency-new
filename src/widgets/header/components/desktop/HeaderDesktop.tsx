import React from 'react'
import { cn } from '@/shared/utils/utils'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { Button } from '@/shared/ui/button'
import { ThemeToggle } from '@/shared/theme/ThemeToggle'
import { HeaderDeviceProps } from '../../header.types'
import styles from './header-desktop.module.scss'

export const HeaderDesktop: React.FC<HeaderDeviceProps> = ({
  className,
  activeIndex,
  onServiceChange,
  services
}) => {
  const handleServiceClick = (index: number) => {
    onServiceChange(index)
  }

  return (
    <header className={cn(styles.header, className, 'uc-global-container')}>
      <div className={styles.container}>
        {/* Логотип */}
        <div className={styles.logo}>
          <div className={styles.logoPlaceholder}>
            <h3>SYNC</h3>
          </div>
        </div>

        {/* Навигация */}
        <div className={styles.nav}>
          <ButtonStack
            activeIndex={activeIndex}
            onActiveChange={handleServiceClick}
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
    </header>
  )
}