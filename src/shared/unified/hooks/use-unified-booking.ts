import { useState, useMemo, useCallback } from 'react'
import { useResponsiveLayout } from './use-responsive-layout'
import { TimeSlot, BookingDate, BookingFormData } from '../types/booking'

interface UseUnifiedBookingOptions {
  initialStep?: 'selection' | 'form' | 'confirmation'
  initialFormData?: Partial<BookingFormData>
  monthsCount?: number
  onBookingSubmit?: (data: any) => Promise<void>
}

export const useUnifiedBooking = (options: UseUnifiedBookingOptions = {}) => {
  const {
    initialStep = 'selection',
    initialFormData = {},
    monthsCount = 2,
    onBookingSubmit
  } = options

  const { isTwoColumn, isAccordion } = useResponsiveLayout({
    desktop: 'two-column',
    tablet: 'two-column',
    mobile: 'accordion'
  })

  const [bookingState, setBookingState] = useState({
    selectedMonth: 0,
    selectedDate: -1,
    selectedTime: -1,
    step: initialStep,
    isConfirmed: false,
    formData: {
      name: '',
      email: '',
      communicationMethod: 'telegram' as const,
      contactId: '',
      ...initialFormData
    }
  })

  // Generate months
  const months = useMemo(() => {
    const monthsList: Date[] = []
    const today = new Date()
    
    for (let i = 0; i < monthsCount; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() + i, 1)
      monthsList.push(month)
    }
    
    return monthsList
  }, [monthsCount])

  // Generate dates for selected month
  const bookingDates = useMemo(() => {
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

  // Handlers
  const handleMonthSelect = useCallback((index: number) => {
    setBookingState(prev => ({
      ...prev,
      selectedMonth: index,
      selectedDate: -1,
      selectedTime: -1,
      step: 'selection'
    }))
  }, [])

  const handleDateSelect = useCallback((index: number) => {
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
  }, [bookingDates])

  const handleTimeSelect = useCallback((index: number) => {
    const selectedDateObj = bookingDates[bookingState.selectedDate]
    if (selectedDateObj && selectedDateObj.timeSlots[index]?.available) {
      setBookingState(prev => ({
        ...prev,
        selectedTime: index,
        step: isTwoColumn ? prev.step : 'form'
      }))
    }
  }, [bookingDates, bookingState.selectedDate, isTwoColumn])

  const handleFormDataChange = useCallback((data: Partial<BookingFormData>) => {
    setBookingState(prev => ({
      ...prev,
      formData: { ...prev.formData, ...data }
    }))
  }, [])

  const handleFormOpen = useCallback(() => {
    if (bookingState.selectedTime >= 0) {
      setBookingState(prev => ({
        ...prev,
        step: 'form'
      }))
    }
  }, [bookingState.selectedTime])

  const handleFormSubmit = useCallback(async (formData: BookingFormData) => {
    try {
      if (onBookingSubmit) {
        await onBookingSubmit(formData)
      }
      
      setBookingState(prev => ({
        ...prev,
        formData,
        step: 'confirmation',
        isConfirmed: true
      }))
    } catch (error) {
      console.error('Booking submission error:', error)
      throw error
    }
  }, [onBookingSubmit])

  const handleFormBack = useCallback(() => {
    setBookingState(prev => ({
      ...prev,
      step: 'selection'
    }))
  }, [])

  const handleNewBooking = useCallback(() => {
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
  }, [])

  const selectedDateObj = bookingState.selectedDate >= 0 
    ? bookingDates[bookingState.selectedDate] 
    : undefined

  const selectedTimeObj = bookingState.selectedTime >= 0 && selectedDateObj
    ? selectedDateObj.timeSlots[bookingState.selectedTime]
    : null

  return {
    // State
    bookingState,
    months,
    bookingDates,
    selectedDateObj,
    selectedTimeObj,
    isTwoColumn,
    isAccordion,
    
    // Handlers
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleFormDataChange,
    handleFormOpen,
    handleFormSubmit,
    handleFormBack,
    handleNewBooking,
    
    // Derived state
    canShowForm: bookingState.selectedTime >= 0,
    isFormDisabled: bookingState.selectedTime < 0
  }
}