export interface TimeSlot {
    id: string
    time: string
    available: boolean
  }
  
  export interface BookingDate {
    date: Date
    timeSlots: TimeSlot[]
  }
  
  export interface BookingState {
    selectedMonth: number
    selectedDate: number
    selectedTime: number
    isConfirmed: boolean
    formData: BookingFormData
    step: 'selection' | 'form' | 'confirmation'
  }
  
  export interface MonthSelectorProps {
    months: Date[]
    selectedMonth: number
    onMonthSelect: (index: number) => void
    formatMonth: (date: Date) => string
    scrollable?: boolean
  }
  
  export interface DatePickerProps {
    bookingDates: BookingDate[]
    selectedDate: number
    onDateSelect: (index: number) => void
  }
  
  export interface TimeSlotsProps {
    selectedDate: number
    bookingDates: BookingDate[]
    selectedTime: number
    onTimeSelect: (index: number) => void
    formatDate: (date: Date) => string
    scrollable?: boolean
  }