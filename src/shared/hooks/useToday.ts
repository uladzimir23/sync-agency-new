import { useMemo } from 'react'

export const useToday = () => {
  const today = useMemo(() => {
    const now = new Date()
    // Сбрасываем время для точного сравнения дат
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])
  
  const isToday = (date: Date): boolean => {
    const compareDate = new Date(date.getFullYear(), date.getMonth(), date.getDate())
    return compareDate.getTime() === today.getTime()
  }

  return {
    today,
    isToday,
  }
}