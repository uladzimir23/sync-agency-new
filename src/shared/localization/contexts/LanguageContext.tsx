import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react'

type Language = 'en' | 'ru'

interface LanguageContextType {
  language: Language
  changeLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ 
  children, 
  defaultLanguage = 'en' 
}) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Пытаемся получить сохраненный язык из localStorage
    const saved = localStorage.getItem('app-language') as Language
    return saved || defaultLanguage
  })

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('app-language', lang)
    // Можно также отправить событие для обновления других компонентов
    window.dispatchEvent(new Event('language-changed'))
  }

  // Синхронизация между вкладками
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'app-language' && e.newValue) {
        setLanguage(e.newValue as Language)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}