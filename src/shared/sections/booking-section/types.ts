export interface TimeSlot {
    id: string
    time: string
    available: boolean
  }
  
  export interface BookingDate {
    date: Date
    timeSlots: TimeSlot[]
  }
  
  export interface BookingFormData {
    name: string
    email: string
    communicationMethod: 'telegram' | 'whatsapp' | 'viber' | 'other'
    contactId: string // Новое поле для ID/номера контакта
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
  
  export interface BookingFormProps {
    formData: BookingFormData
    onFormDataChange: (data: BookingFormData) => void
    onSubmit: (formData: BookingFormData) => void
    onBack: () => void
  }
  
  export interface AppointmentDetailsProps {
    selectedDateObj: BookingDate | undefined
    selectedTimeObj: TimeSlot | null
    formData: BookingFormData // Обновлено с новыми полями
    onNewBooking: () => void
    formatDateFull: (date: Date) => string
  }
  
  // ... существующие типы ...

export interface BookingDesktopProps {
    bookingState: BookingState
    months: Date[]
    bookingDates: BookingDate[]
    onMonthSelect: (index: number) => void
    onDateSelect: (index: number) => void
    onTimeSelect: (index: number) => void
    onFormDataChange: (formData: BookingFormData) => void
    onFormOpen: () => void // Добавлен
    onFormSubmit: (formData: BookingFormData) => void
    onFormBack: () => void
    onNewBooking: () => void
    formatMonth: (date: Date) => string
    formatDate: (date: Date) => string
    formatDateFull: (date: Date) => string
  }
  
  export interface BookingTabletProps {
    bookingState: BookingState
    months: Date[]
    bookingDates: BookingDate[]
    onMonthSelect: (index: number) => void
    onDateSelect: (index: number) => void
    onTimeSelect: (index: number) => void
    onFormDataChange: (formData: BookingFormData) => void
    onFormOpen: () => void // Добавлен
    onFormSubmit: (formData: BookingFormData) => void
    onFormBack: () => void
    onNewBooking: () => void
    formatMonth: (date: Date) => string
    formatDate: (date: Date) => string
    formatDateFull: (date: Date) => string
  }
  
  export interface BookingMobileProps {
    bookingState: BookingState
    months: Date[]
    bookingDates: BookingDate[]
    onMonthSelect: (index: number) => void
    onDateSelect: (index: number) => void
    onTimeSelect: (index: number) => void
    onFormDataChange: (formData: BookingFormData) => void
    onFormOpen: () => void // Добавлен
    onFormSubmit: (formData: BookingFormData) => void
    onFormBack: () => void
    onNewBooking: () => void
    formatMonth: (date: Date) => string
    formatDate: (date: Date) => string
    formatDateFull: (date: Date) => string
  }