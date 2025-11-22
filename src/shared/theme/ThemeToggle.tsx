// src/shared/theme/ThemeToggle.tsx
import React from 'react'
import { useTheme } from '@/shared/hooks/useTheme'
import styles from './ThemeToggle.module.scss'

export const ThemeToggle: React.FC = () => {
  const { toggleTheme, isDark } = useTheme()

  return (
    <button 
      className={`${styles['theme-toggle']} ${styles['fade-in-scale']} ${styles['header__theme-toggle']}`}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? (
        // Солнце для темной темы (переключение на светлую)
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path 
            d="M12 16a4 4 0 100-8 4 4 0 000 8zM12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        // Луна для светлой темы (переключение на темную)
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path 
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  )
}