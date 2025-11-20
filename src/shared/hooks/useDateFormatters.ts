export const useDateFormatters = () => {
    const formatMonth = (date: Date): string => {
      return date.toLocaleDateString('en-US', { 
        month: 'long',
        year: 'numeric'
      })
    }
  
    const formatDate = (date: Date): string => {
      const today = new Date()
      const tomorrow = new Date(today)
      tomorrow.setDate(today.getDate() + 1)
  
      if (date.toDateString() === today.toDateString()) {
        return 'Today'
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Tomorrow'
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          day: 'numeric',
          month: 'short'
        })
      }
    }
  
    const formatDateFull = (date: Date): string => {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    }
  
    return {
      formatMonth,
      formatDate,
      formatDateFull,
    }
  }