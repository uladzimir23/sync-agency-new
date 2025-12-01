import { useLanguage } from '../contexts/LanguageContext'
import enTranslations from '../translations/en.json'
import ruTranslations from '../translations/ru.json'

const translations = {
  en: enTranslations,
  ru: ruTranslations
}

type TranslationKey = string

export const useTranslation = () => {
  const { language } = useLanguage()

  const t = (key: TranslationKey): string => {
    // Поддержка вложенных ключей типа "header.title"
    const keys = key.split('.')
    let value: any = translations[language]

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        console.warn(`Translation key "${key}" not found for language "${language}"`)
        return key // Возвращаем ключ как fallback
      }
    }

    return typeof value === 'string' ? value : String(value)
  }

  const translateObject = <T extends Record<string, any>>(obj: T): T => {
    const translated: any = {}
    
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        // Проверяем, является ли значение ключом перевода
        const value = obj[key]
        translated[key] = t(value.startsWith('translation:') ? value.slice(12) : value)
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        translated[key] = translateObject(obj[key])
      } else {
        translated[key] = obj[key]
      }
    }
    
    return translated as T
  }

  return {
    t,
    language,
    translateObject
  }
}