import { useState, useMemo } from 'react';

export interface TimeSlot {
  id: string
  time: string
  available: boolean
}

export interface BookingDate {
  date: Date
  timeSlots: TimeSlot[]
}

export const useCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(0)
  const [selectedDate, setSelectedDate] = useState<number>(0)
  const [selectedTime, setSelectedTime] = useState<number>(-1)
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false)

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
    const currentMonth = months[selectedMonth]
    
    if (!currentMonth) return dates;
    
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i)
      
      // Skip past dates
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (date < today) continue
      
      // Generate time slots with random availability for demo
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
  }, [selectedMonth, months])

  const handleMonthSelect = (index: number) => {
    setSelectedMonth(index)
    setSelectedDate(0)
    setSelectedTime(-1)
    setIsConfirmed(false)
  }

  const handleDateSelect = (index: number) => {
    setSelectedDate(index)
    setSelectedTime(-1)
    setIsConfirmed(false)
  }

  const handleTimeSelect = (index: number) => {
    if (bookingDates[selectedDate]?.timeSlots[index]?.available) {
      setSelectedTime(index)
      setIsConfirmed(false)
    }
  }

  const handleBookingConfirm = () => {
    setIsConfirmed(true)
  }

  const resetBooking = () => {
    setSelectedTime(-1)
    setIsConfirmed(false)
  }

  return {
    // State
    selectedMonth,
    selectedDate,
    selectedTime,
    isConfirmed,
    months,
    bookingDates,
    
    // Handlers
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleBookingConfirm,
    resetBooking,
    
    // Setters
    setSelectedMonth,
    setSelectedDate,
    setSelectedTime,
    setIsConfirmed,
  }
}