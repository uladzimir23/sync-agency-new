// src/hooks/useTheme.ts
import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

// Глобальная переменная для отслеживания подписчиков
const themeSubscribers = new Set<() => void>()

// Функция для уведомления всех подписчиков об изменении темы
const notifyThemeChange = () => {
  themeSubscribers.forEach(callback => callback())
}

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Проверяем сохраненную тему или системные настройки
    if (typeof window === 'undefined') return 'light'
    
    const savedTheme = localStorage.getItem('colabsys-theme') as Theme
    if (savedTheme) return savedTheme
    
    // Проверяем системные предпочтения
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    
    return 'light'
  })

  // Функция для применения темы к DOM
  const applyTheme = (newTheme: Theme) => {
    const body = document.body
    const root = document.documentElement

    if (newTheme === 'dark') {
      body.classList.add('dark-theme')
      body.classList.remove('light-theme')
      root.style.colorScheme = 'dark'
    } else {
      body.classList.add('light-theme')
      body.classList.remove('dark-theme')
      root.style.colorScheme = 'light'
    }

    // Сохраняем тему в localStorage
    localStorage.setItem('colabsys-theme', newTheme)
    
    // Уведомляем всех подписчиков
    notifyThemeChange()
  }

  useEffect(() => {
    // Применяем тему при монтировании
    applyTheme(theme)
    
    // Добавляем текущий компонент в подписчики
    const handleThemeChange = () => {
      // Форсируем ререндер при изменении темы
      setTheme(current => current)
    }
    
    themeSubscribers.add(handleThemeChange)
    
    // Слушаем изменения системной темы
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Меняем тему только если пользователь не выбрал тему вручную
      const savedTheme = localStorage.getItem('colabsys-theme')
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light'
        setTheme(newTheme)
        applyTheme(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleSystemThemeChange)

    return () => {
      themeSubscribers.delete(handleThemeChange)
      mediaQuery.removeEventListener('change', handleSystemThemeChange)
    }
  }, [])

  // Применяем тему при ее изменении
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Функция для принудительного обновления темы
  const forceThemeUpdate = () => {
    applyTheme(theme)
  }

  return {
    theme,
    toggleTheme,
    forceThemeUpdate,
    isDark: theme === 'dark',
    isLight: theme === 'light'
  }
}

// Дополнительный хук для синхронизации между компонентами
export const useThemeSync = () => {
  const [_, setUpdate] = useState(0)
  
  useEffect(() => {
    const forceUpdate = () => setUpdate(prev => prev + 1)
    themeSubscribers.add(forceUpdate)
    
    return () => {
      themeSubscribers.delete(forceUpdate)
    }
  }, [])
}