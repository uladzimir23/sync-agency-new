import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    
    // Обновляем состояние при изменении медиазапроса
    const updateMatches = () => {
      setMatches(media.matches)
    }
    
    // Устанавливаем начальное значение
    updateMatches()
    
    // Добавляем слушатель
    media.addEventListener('change', updateMatches)
    
    // Убираем слушатель при размонтировании
    return () => {
      media.removeEventListener('change', updateMatches)
    }
  }, [query])

  return matches
}