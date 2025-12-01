import React from 'react'
import { Button } from '@/shared/ui/button'
import { SyncDropdownHeader } from '@/shared/ui/sync-dropdown-header'
import styles from './DashboardHeader.module.scss'
import { useTranslation } from '@/shared/localization/hooks/useTranslation'


interface DashboardHeaderProps {
  title: React.ReactNode
  subtitle?: string
  className?: string
  onBookCall?: () => void
  onMakeBrief?: () => void
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  title, 
  subtitle,
  className = '',
  onBookCall,
  onMakeBrief
}) => {
  const { t } = useTranslation()

  return (
    <div className={`${styles.dashboardHeader} ${className}`}>
      <div className={styles.content}>
        {/* Используем вынесенную компоненту дропдауна */}
        <SyncDropdownHeader />

        {/* Заголовок и подзаголовок */}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* Кнопки */}
        <div className={styles.actions}>
          <Button 
            variant="outline"
            size="lg"
            animation="scale"
            onClick={onBookCall}
            className={styles.button}
          >
            {t('header.bookCall')}
          </Button>
          <Button 
            variant="secondary"
            size="lg"
            animation="scale"
            onClick={onMakeBrief}
            className={styles.button}
          >
            {t('header.makeBrief')}
          </Button>
        </div>
      </div>
    </div>
  )
}