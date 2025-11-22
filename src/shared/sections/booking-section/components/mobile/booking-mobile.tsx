import React from 'react'
import { MonthSelector, DatePicker, TimeSlots, BookingForm, AppointmentDetails, CollapsedSelection } from '../common'
import { BookingState, BookingDate } from '../../types'
import styles from './booking-mobile.module.scss'

interface BookingMobileProps {
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

export const BookingMobile: React.FC<BookingMobileProps> = ({
  bookingState,
  months,
  bookingDates,
  onMonthSelect,
  onDateSelect,
  onTimeSelect,
  onFormDataChange,
  onFormOpen, // Новый пропс
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

  // Определяем состояния аккордеонов
  const isSelectionExpanded = step === 'selection'
  const isFormExpanded = step === 'form'

  return (
    <div className={styles.mobileLayout}>
      {/* Аккордеон 1: Выбор даты и времени */}
      <CollapsedSelection
        selectedMonth={months[bookingState.selectedMonth]}
        selectedDate={selectedDateObj}
        selectedTime={selectedTimeObj}
        formatMonth={formatMonth}
        formatDate={formatDate}
        onExpand={() => {
          // Переходим обратно к выбору, если мы на форме
          if (step === 'form') {
            onFormBack()
          }
        }}
        isExpanded={isSelectionExpanded}
        isDisabled={false}
        title="Select Date & Time"
        icon="📅"
      >
        <div className={styles.selectionContent}>
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
        </div>
      </CollapsedSelection>

      {/* Аккордеон 2: Форма контактов */}
      <CollapsedSelection
        selectedMonth={months[bookingState.selectedMonth]}
        selectedDate={selectedDateObj}
        selectedTime={selectedTimeObj}
        formatMonth={formatMonth}
        formatDate={formatDate}
        onExpand={() => {
          // Открываем форму (без подтверждения!), если время выбрано
          if (selectedTime >= 0) {
            onFormOpen() // Используем новый обработчик
          }
        }}
        isExpanded={isFormExpanded}
        isDisabled={selectedTime < 0}
        title="Contact Information"
        icon="👤"
      >
        <BookingForm
          formData={formData}
          onFormDataChange={onFormDataChange}
          onSubmit={onFormSubmit} // Этот обработчик вызывается только при нажатии кнопки Confirm
          onBack={onFormBack}
        />
      </CollapsedSelection>

      {/* Step 3: Confirmation */}
      {step === 'confirmation' && (
        <div className={styles.confirmationSection}>
          <AppointmentDetails
            selectedDateObj={selectedDateObj}
            selectedTimeObj={selectedTimeObj}
            formData={formData}
            onNewBooking={onNewBooking}
            formatDateFull={formatDateFull}
          />
        </div>
      )}
    </div>
  )
}