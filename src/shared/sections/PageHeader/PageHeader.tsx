import React from 'react'
import { Button } from '@/shared/ui/button'
import styles from './PageHeader.module.scss'
import { useTranslation } from '@/shared/localization/hooks/useTranslation'

export interface PageHeaderProps {
  pageTitle: string
  title: React.ReactNode
  subtitle?: string
  titleClassName?: string
  subtitleClassName?: string
  className?: string
  onBookCall?: () => void
  onMakeBrief?: () => void
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  pageTitle,
  title, 
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  className = '',
  onBookCall,
  onMakeBrief
}) => {
  const { t } = useTranslation()

  // Генерация уникальных классов на основе pageTitle
  const generateUniqueClass = (baseClass: string) => {
    const normalizedTitle = pageTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')
    return `${baseClass} ${baseClass}--${normalizedTitle}`
  }

  const uniqueTitleClass = generateUniqueClass(styles.title)
  const uniqueSubtitleClass = generateUniqueClass(styles.subtitle)

  return (
    <div className={`${styles.pageHeader} ${className}`}>
      <div className={styles.content}>
        {/* Название страницы вместо SyncDropdownHeader */}
        <div className={styles.pageTitleWrapper}>
          <span className={styles.pageTitle}>{pageTitle}</span>
        </div>

        {/* Заголовок и подзаголовок */}
        <h1 className={`${uniqueTitleClass} ${titleClassName}`}>{title}</h1>
        {subtitle && (
          <p className={`${uniqueSubtitleClass} ${subtitleClassName}`}>
            {subtitle}
          </p>
        )}

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
