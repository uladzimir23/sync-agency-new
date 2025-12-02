import React, { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTranslation } from '../../hooks/useTranslation'
import styles from './LanguageSwitcher.module.scss'

export const LanguageSwitcher: React.FC = () => {
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const languages = [
    { code: 'en', name: t('language.en') },
    { code: 'ru', name: t('language.ru') }
  ]

  const handleLanguageChange = (langCode: 'en' | 'ru') => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className={styles.languageSwitcher}>
      <button 
        className={styles.switcherButton}
        onClick={toggleDropdown}
        aria-label="Change language"
      >
        <FiGlobe className={styles.globeIcon} />

      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`${styles.languageOption} ${language === lang.code ? styles.active : ''}`}
              onClick={() => handleLanguageChange(lang.code as 'en' | 'ru')}
            >
              <span className={styles.languageCode}>{lang.code.toUpperCase()}</span>
              <span className={styles.languageName}>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}