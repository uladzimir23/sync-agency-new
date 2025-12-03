import React, { useState, useRef, useEffect } from 'react'
import { FiGlobe, FiCheck } from 'react-icons/fi'
import { dropdownAnimations } from './animations'
import styles from './LanguageSwitcher.module.scss'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'

export interface LanguageSwitcherProps {
  className?: string
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ 
  className = ''
}) => {
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [dropdownStyles, setDropdownStyles] = useState({ width: 0, left: 0 })
  
  const dropdownRef = useRef<HTMLDivElement>(null)
  const dropdownContentRef = useRef<HTMLDivElement>(null)
  const switcherTriggerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'ru', name: 'РУСЪ', flag: '🇷🇺' }
  ]

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
    if (switcherTriggerRef.current && dropdownContentRef.current) {
      const triggerRect = switcherTriggerRef.current.getBoundingClientRect()
      const wrapperRect = dropdownRef.current?.getBoundingClientRect()
      
      if (wrapperRect) {
        setDropdownStyles({
          width: triggerRect.width,
          left: 0
        })
      }
    }
  }

  // Обновляем позицию при открытии
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

  const handleLanguageChange = (langCode: 'en' | 'ru') => {
    changeLanguage(langCode)
    setIsDropdownOpen(false)
    
    // Анимация подтверждения
    const currentLangElement = switcherTriggerRef.current?.querySelector(`.${styles.currentLanguage}`)
    if (currentLangElement) {
      currentLangElement.classList.add(styles.languageChanged)
      setTimeout(() => {
        currentLangElement.classList.remove(styles.languageChanged)
      }, 300)
    }
  }

  // GSAP анимации для дропдауна
  useEffect(() => {
    const dropdownContent = dropdownContentRef.current
    if (!dropdownContent) return

    if (isDropdownOpen) {
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
    document.addEventListener('touchstart', handleClickOutside as any)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className={`${styles.languageSwitcher} ${className}`}>
      <div 
        ref={dropdownRef}
        className={styles.dropdownWrapper}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className={styles.dropdownTrigger}>
          <div 
            ref={switcherTriggerRef}
            className={styles.languageTrigger}
            aria-label="Select language"
          >
            <FiGlobe className={styles.globeIcon} />

          </div>
        </div>

        <div 
          ref={dropdownContentRef}
          className={styles.dropdownContent}
          style={{ 
            display: 'none',
            width: dropdownStyles.width > 0 ? `${dropdownStyles.width}px` : 'auto',
            left: `${dropdownStyles.left}px`
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.languageOption} ${language === lang.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code as 'en' | 'ru')}
              aria-label={`Switch to ${lang.name}`}
            >
              <div className={styles.languageInfo}>
                <span className={styles.languageFlag}>{lang.flag}</span>
              </div>

            </button>
          ))}
        </div>
      </div>
    </div>
  )
}