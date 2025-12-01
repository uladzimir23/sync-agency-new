import React, { useState, useRef, useEffect } from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { FaTelegram } from 'react-icons/fa'
import { Button } from '@/shared/ui/button'
import { dropdownAnimations } from './animations'
import styles from './SyncDropdownHeader.module.scss'
import { useTranslation } from '@/shared/localization/hooks/useTranslation'


interface SyncDropdownHeaderProps {
  className?: string
}

export const SyncDropdownHeader: React.FC<SyncDropdownHeaderProps> = ({ 
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dropdownStyles, setDropdownStyles] = useState({ width: 0, left: 0 })
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)
  const soonSyncHeaderRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const { t } = useTranslation()


  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Вычисляем ширину и позицию дропдауна
  const updateDropdownPosition = () => {
    if (soonSyncHeaderRef.current && dropdownContentRef.current) {
      const triggerRect = soonSyncHeaderRef.current.getBoundingClientRect()
      const wrapperRect = dropdownRef.current?.getBoundingClientRect()
      
      if (wrapperRect) {
        setDropdownStyles({
          width: triggerRect.width,
          left: 0 // Позиционируем относительно родителя
        })
      }
    }
  }

  // Обновляем позицию при открытии и изменении размера окна
  useEffect(() => {
    if (isDropdownOpen) {
      updateDropdownPosition()
      window.addEventListener('resize', updateDropdownPosition)
    } else {
      window.removeEventListener('resize', updateDropdownPosition)
    }

    return () => {
      window.removeEventListener('resize', updateDropdownPosition)
    }
  }, [isDropdownOpen])

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (!isMobile) {
      setIsDropdownOpen(true)
    }
  }

  const handleMouseLeave = () => {
    if (!isMobile) {
      timeoutRef.current = setTimeout(() => {
        setIsDropdownOpen(false)
      }, 200)
    }
  }

  const handleClick = () => {
    if (isMobile) {
      setIsDropdownOpen(!isDropdownOpen)
    }
  }

  // Обработчик для кнопки Subscribe
  const handleSubscribeClick = () => {
    window.open('https://t.me/sync_agency', '_blank', 'noopener,noreferrer')
  }

  // GSAP анимации для дропдауна
  useEffect(() => {
    const dropdownContent = dropdownContentRef.current
    if (!dropdownContent) return

    if (isDropdownOpen) {
      // Применяем вычисленные стили перед анимацией
      if (dropdownStyles.width > 0) {
        dropdownContent.style.width = `${dropdownStyles.width}px`
        dropdownContent.style.left = `${dropdownStyles.left}px`
      }
      
      dropdownAnimations.open(dropdownContent, isMobile)
      dropdownAnimations.blurIn(dropdownContent)
    } else {
      dropdownAnimations.close(dropdownContent, isMobile)
      dropdownAnimations.blurOut(dropdownContent)
    }
  }, [isDropdownOpen, isMobile, dropdownStyles])

  // Закрытие дропдауна при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    
    // Для мобильных устройств также добавляем обработчик тача
    document.addEventListener('touchstart', handleClickOutside as any)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <div className={`${styles.syncDropdownHeader} ${className}`}>
      {/* Дропдаун секция */}
      <div 
        ref={dropdownRef}
        className={styles.dropdownWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.dropdownTrigger}>
          <div 
            ref={soonSyncHeaderRef}
            className={styles.soonSyncHeader}
          >
            <span className={styles.soon}>{t('header.soon')}</span>
            <div className={styles.syncText}>
              <span>{t('header.syncLibrary')}</span>
              <FiArrowUpRight className={`${styles.arrow} ${isDropdownOpen ? styles.arrowRotated : ''}`} />
            </div>
          </div>
        </div>

        {/* Дропдаун контент с GSAP анимацией */}
        <div 
          ref={dropdownContentRef}
          className={styles.dropdownContent}
          style={{ 
            display: 'none',
            width: dropdownStyles.width > 0 ? `${dropdownStyles.width}px` : 'auto',
            left: `${dropdownStyles.left}px`
          }}
        >
          <div className={styles.dropdownItem}>
            <div className={styles.dropdownHeader}>
              <FaTelegram className={styles.telegramIcon} />
              <div className={styles.dropdownTextWrapper}>
                <div className={styles.dropdownText}>
                  <span className={styles.dropdownTitle}>{t('header.joinTelegram')}</span>
                </div>
                <span className={styles.dropdownSubtitle}>{t('header.getUpdates')}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className={styles.subscribeBtn}
              onClick={handleSubscribeClick}
            >
              {t('header.subscribe')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}