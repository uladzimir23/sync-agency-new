import React from 'react'
import { MonthSelector, DatePicker, TimeSlots, BookingForm, AppointmentDetails } from '../common'
import { BookingState, BookingDate } from '../../types'
import styles from './booking-desktop.module.scss'

interface BookingDesktopProps {
  bookingState: BookingState
  months: Date[]
  bookingDates: BookingDate[]
  onMonthSelect: (index: number) => void
  onDateSelect: (index: number) => void
  onTimeSelect: (index: number) => void
  onFormDataChange: (formData: any) => void
  onFormOpen: () => void // Новый пропс
  onFormSubmit: (formData: any) => void
  onFormBack: () => void
  onNewBooking: () => void
  formatMonth: (date: Date) => string
  formatDate: (date: Date) => string
  formatDateFull: (date: Date) => string
}

export const BookingDesktop: React.FC<BookingDesktopProps> = ({
  bookingState,
  months,
  bookingDates,
  onMonthSelect,
  onDateSelect,
  onTimeSelect,
  onFormDataChange,
  onFormOpen, // Новый пропс (не используется в десктопе, но нужен для совместимости)
  onFormSubmit,
  onFormBack,
  onNewBooking,
  formatMonth,
  formatDate,
  formatDateFull,
}) => {
  const { step, selectedDate, selectedTime, formData } = bookingState
  const selectedDateObj = bookingDates[selectedDate]
  const selectedTimeObj = selectedTime >= 0 ? selectedDateObj?.timeSlots[selectedTime] : null

  return (
    <div className={styles.desktopLayout}>
      <div className={styles.leftPanel}>
        <MonthSelector
          months={months}
          selectedMonth={bookingState.selectedMonth}
          onMonthSelect={onMonthSelect}
          formatMonth={formatMonth}
          scrollable={true}
        />
        <DatePicker
          bookingDates={bookingDates}
          selectedDate={bookingState.selectedDate}
          onDateSelect={onDateSelect}
        />
      </div>

      <div className={styles.rightPanel}>
        {selectedDate >= 0 && selectedDateObj && (
          <TimeSlots
            selectedDate={selectedDate}
            bookingDates={bookingDates}
            selectedTime={selectedTime}
            onTimeSelect={onTimeSelect}
            formatDate={formatDate}
            scrollable={true}
          />
        )}

        {step === 'form' && selectedTime >= 0 && (
          <BookingForm
            formData={formData}
            onFormDataChange={onFormDataChange}
            onSubmit={onFormSubmit}
            onBack={onFormBack}
          />
        )}
        
        {step === 'confirmation' && (
          <AppointmentDetails
            selectedDateObj={selectedDateObj}
            selectedTimeObj={selectedTimeObj}
            formData={formData}
            onNewBooking={onNewBooking}
            formatDateFull={formatDateFull}
          />
        )}
      </div>
    </div>
  )
}