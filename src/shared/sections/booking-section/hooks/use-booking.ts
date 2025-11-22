import { useState, useMemo } from 'react'
import { BookingState, BookingFormData, BookingDate, TimeSlot } from '../types'

export const useBooking = () => {
  const [bookingState, setBookingState] = useState<BookingState>({
    selectedMonth: 0,
    selectedDate: 0,
    selectedTime: -1,
    isConfirmed: false,
    formData: {
      name: '',
      email: '',
      communicationMethod: 'telegram',
      message: ''
    },
    step: 'selection'
  })

  // Generate months for the next 6 months
  const months = useMemo((): Date[] => {
    const monthsList: Date[] = []
    const today = new Date()
    
    for (let i = 0; i < 6; i++) {
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
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      
      // Skip past dates
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (date < today) continue
      
      // Generate time slots
      const timeSlots: TimeSlot[] = [
        { id: `morning-${i}`, time: '09:00', available: Math.random() > 0.3 },
        { id: `morning2-${i}`, time: '10:30', available: Math.random() > 0.3 },
        { id: `afternoon-${i}`, time: '14:00', available: Math.random() > 0.3 },
        { id: `afternoon2-${i}`, time: '15:30', available: Math.random() > 0.3 },
        { id: `evening-${i}`, time: '17:00', available: Math.random() > 0.3 },
      ]

      dates.push({ date, timeSlots })
    }
    
    return dates
  }, [bookingState.selectedMonth, months])

  const handleMonthSelect = (index: number) => {
    setBookingState(prev => ({
      ...prev,
      selectedMonth: index,
      selectedDate: 0,
      selectedTime: -1
    }))
  }

  const handleDateSelect = (index: number) => {
    setBookingState(prev => ({
      ...prev,
      selectedDate: index,
      selectedTime: -1
    }))
  }

  const handleTimeSelect = (index: number) => {
    if (bookingDates[bookingState.selectedDate]?.timeSlots[index]?.available) {
      setBookingState(prev => ({
        ...prev,
        selectedTime: index,
        step: 'form' // Переходим к форме после выбора времени
      }))
    }
  }

  const handleFormDataChange = (formData: BookingFormData) => {
    setBookingState(prev => ({
      ...prev,
      formData
    }))
  }

  // Новый метод для открытия формы (без подтверждения)
  const handleFormOpen = () => {
    setBookingState(prev => ({
      ...prev,
      step: 'form'
    }))
  }

  // Метод для подтверждения бронирования
  const handleFormSubmit = (formData: BookingFormData) => {
    setBookingState(prev => ({
      ...prev,
      formData,
      step: 'confirmation',
      isConfirmed: true
    }))
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
      selectedDate: 0,
      selectedTime: -1,
      isConfirmed: false,
      formData: {
        name: '',
        email: '',
        communicationMethod: 'telegram',
        message: ''
      },
      step: 'selection'
    })
  }

  return {
    // State
    bookingState,
    months,
    bookingDates,
    
    // Handlers
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleFormDataChange,
    handleFormOpen, // Новый обработчик
    handleFormSubmit,
    handleFormBack,
    handleNewBooking
  }
}