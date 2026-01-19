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
  scrollToBrief?: () => void

}

// Маппинг названий страниц на цветовые схемы
const PAGE_COLOR_MAPPING: Record<string, string> = {
  'Brand Identity': 'blueColor',
  'Marketing Strategy': 'redColor', 
  'Product Development': 'greenColor',
  'Infrastructure Automation': 'cyanColor',
  'Performance Intelligence': 'purpleColor',
  // Дополнительные страницы, если понадобятся
  'brand': 'blueColor',
  'marketing': 'redColor',
  'product': 'greenColor',
  'automation': 'cyanColor',
  'performance': 'purpleColor',
  'data': 'purpleColor',
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  pageTitle,
  title, 
  subtitle,
  titleClassName = '',
  subtitleClassName = '',
  className = '',
  onBookCall,
  onMakeBrief,
  scrollToBrief // Новый пропс

}) => {
  const { t } = useTranslation()

  // Функция для обработки клика на кнопку Make Brief
  const handleMakeBriefClick = () => {
    if (scrollToBrief) {
      scrollToBrief() // Сначала скроллим к BriefSection
    }
    if (onMakeBrief) {
      onMakeBrief() // Затем выполняем дополнительную логику (если есть)
    }
  }

  // Получаем цветовой класс для pageTitle
  const getPageTitleColorClass = () => {
    const normalizedTitle = pageTitle.trim()
    
    // Прямое совпадение
    if (PAGE_COLOR_MAPPING[normalizedTitle]) {
      return PAGE_COLOR_MAPPING[normalizedTitle]
    }
    
    // Поиск по частичному совпадению (без учета регистра)
    const normalizedKey = Object.keys(PAGE_COLOR_MAPPING).find(key => 
      normalizedTitle.toLowerCase().includes(key.toLowerCase()) ||
      key.toLowerCase().includes(normalizedTitle.toLowerCase())
    )
    
    return normalizedKey ? PAGE_COLOR_MAPPING[normalizedKey] : 'blueColor'
  }

  // Генерация уникальных классов на основе pageTitle
  const generateUniqueClass = (baseClass: string) => {
    const normalizedTitle = pageTitle.toLowerCase().replace(/[^a-z0-9]/g, '_')
    return `${baseClass} ${baseClass}--${normalizedTitle}`
  }

  const uniqueTitleClass = generateUniqueClass(styles.title)
  const uniqueSubtitleClass = generateUniqueClass(styles.subtitle)
  const pageTitleColorClass = getPageTitleColorClass()

  return (
    <div className={`${styles.pageHeader} ${className}`}>
      <div className={styles.content}>
        {/* Название страницы с цветовым классом */}
        <div className={styles.pageTitleWrapper}>
          <span className={`${styles.pageTitle} ${pageTitleColorClass}`}>
            {pageTitle}
          </span>
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
            onClick={handleMakeBriefClick} 
            className={styles.button}
          >
            {t('header.makeBrief')}
          </Button>
        </div>
      </div>
    </div>
  )
}