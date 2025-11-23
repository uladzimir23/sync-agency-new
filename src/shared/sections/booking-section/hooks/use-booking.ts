import { useState, useMemo, useEffect } from 'react'
import { BookingState, BookingFormData, BookingDate, TimeSlot } from '../types'
import { TelegramService } from '@/shared/services/telegram-service'

console.log('Env variables:', {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN,
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID
})

export const useBooking = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedMonth: 0,
    selectedDate: -1,
    selectedTime: -1,
    isConfirmed: false,
    formData: {
      name: '',
      email: '',
      communicationMethod: 'telegram',
      contactId: ''
    },
    step: 'selection'
  })

  

  // Generate months for the next 6 months
  const months = useMemo((): Date[] => {
    const monthsList: Date[] = []
    const today = new Date()
    
    for (let i = 0; i < 2; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() + i, 1)
      monthsList.push(month)
    }
    
    return monthsList
  }, [])

  // Generate dates for selected month
  const bookingDates = useMemo((): BookingDate[] => {
    const dates: BookingDate[] = []
    const currentMonth = months[bookingState.selectedMonth]
    
    if (!currentMonth) return dates
    
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      date.setHours(0, 0, 0, 0)
      
      const isPast = date < today
      
      const timeSlots: TimeSlot[] = [
        { id: `morning-${i}`, time: '09:00', available: !isPast && Math.random() > 0.3 },
        { id: `morning2-${i}`, time: '10:30', available: !isPast && Math.random() > 0.3 },
        { id: `afternoon-${i}`, time: '14:00', available: !isPast && Math.random() > 0.3 },
        { id: `afternoon2-${i}`, time: '15:30', available: !isPast && Math.random() > 0.3 },
        { id: `evening-${i}`, time: '17:00', available: !isPast && Math.random() > 0.3 },
      ]

      dates.push({ date, timeSlots })
    }
    
    return dates
  }, [bookingState.selectedMonth, months])

  // Находим первую доступную дату при изменении месяца
  useEffect(() => {
    if (bookingDates.length > 0 && bookingState.selectedDate === -1) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const firstAvailableIndex = bookingDates.findIndex(bookingDate => {
        const date = new Date(bookingDate.date)
        date.setHours(0, 0, 0, 0)
        return date >= today
      })
      
      if (firstAvailableIndex >= 0) {
        setBookingState(prev => ({
          ...prev,
          selectedDate: firstAvailableIndex
        }))
      } else if (bookingDates.length > 0) {
        setBookingState(prev => ({
          ...prev,
          selectedDate: 0
        }))
      }
    }
  }, [bookingDates, bookingState.selectedDate])

  const handleMonthSelect = (index: number) => {
    setBookingState(prev => ({
      ...prev,
      selectedMonth: index,
      selectedDate: -1,
      selectedTime: -1,
      step: 'selection'
    }))
  }

  const handleDateSelect = (index: number) => {
    const selectedDateObj = bookingDates[index]
    if (selectedDateObj) {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const selectedDate = new Date(selectedDateObj.date)
      selectedDate.setHours(0, 0, 0, 0)
      
      if (selectedDate >= today) {
        setBookingState(prev => ({
          ...prev,
          selectedDate: index,
          selectedTime: -1,
          step: 'selection'
        }))
      }
    }
  }

  const handleTimeSelect = (index: number) => {
    const selectedDateObj = bookingDates[bookingState.selectedDate]
    if (selectedDateObj && selectedDateObj.timeSlots[index]?.available) {
      setBookingState(prev => ({
        ...prev,
        selectedTime: index,
        step: 'form'
      }))
    }
  }

  const handleFormDataChange = (formData: BookingFormData) => {
    setBookingState(prev => ({
      ...prev,
      formData
    }))
  }

  const handleFormOpen = () => {
    if (bookingState.selectedTime >= 0) {
      setBookingState(prev => ({
        ...prev,
        step: 'form'
      }))
    }
  }
  const handleFormSubmit = async (formData: BookingFormData) => {
    try {
      // Получаем данные о выбранной дате и времени
      const selectedDateObj = bookingDates[bookingState.selectedDate]
      const selectedTimeObj = bookingState.selectedTime >= 0 
        ? selectedDateObj?.timeSlots[bookingState.selectedTime] 
        : null
  
      // ВРЕМЕННО: пропускаем проверку Telegram конфигурации
      // const configCheck = TelegramService.checkConfig()
      // if (!configCheck.isValid) {
      //   console.warn('Telegram not configured properly:', configCheck.issues)
      // } else {
        // Отправляем уведомление в Telegram
        if (selectedDateObj && selectedTimeObj) {
          const telegramMessage = {
            name: formData.name,
            email: formData.email,
            communicationMethod: formData.communicationMethod,
            contactId: formData.contactId,
            date: selectedDateObj.date.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            time: selectedTimeObj.time
          }
  
          const telegramSuccess = await TelegramService.sendBookingNotification(telegramMessage)
          
          if (!telegramSuccess) {
            console.warn('Telegram notification failed, but booking will be confirmed')
          }
        }
      // }
  
      // Обновляем состояние
      setBookingState(prev => ({
        ...prev,
        formData,
        step: 'confirmation',
        isConfirmed: true
      }))
  
    } catch (error) {
      console.error('Error in booking process:', error)
      setBookingState(prev => ({
        ...prev,
        formData,
        step: 'confirmation', 
        isConfirmed: true
      }))
    }
  }

  const handleFormBack = () => {
    setBookingState(prev => ({
      ...prev,
      step: 'selection'
    }))
  }

  const handleNewBooking = () => {
    setBookingState({
      selectedMonth: 0,
      selectedDate: -1,
      selectedTime: -1,
      isConfirmed: false,
      formData: {
        name: '',
        email: '',
        communicationMethod: 'telegram',
        contactId: ''
      },
      step: 'selection'
    })
  }

  return {
    bookingState,
    months,
    bookingDates,
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleFormDataChange,
    handleFormOpen,
    handleFormSubmit,
    handleFormBack,
    handleNewBooking
  }
}