export type Language = 'en' | 'ru'

export interface Translation {
  [key: string]: string | Translation
}

export interface Translations {
  en: Translation
  ru: Translation
}