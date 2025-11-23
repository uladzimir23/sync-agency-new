import React from 'react'
import { MonthSelector, DatePicker, TimeSlots, BookingForm, AppointmentDetails, CollapsedSelection } from '../common'
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
  onFormOpen: () => void
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
  onFormOpen,
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

  // В десктопе оба аккордеона всегда открыты и доступны
  const isSelectionExpanded = true
  const isFormExpanded = true

  return (
    <div className={styles.desktopLayout}>
      {/* Аккордеон 1: Выбор даты и времени (всегда открыт в десктопе) */}
      <CollapsedSelection
        selectedMonth={months[bookingState.selectedMonth]}
        selectedDate={selectedDateObj}
        selectedTime={selectedTimeObj}
        formatMonth={formatMonth}
        formatDate={formatDate}
        onExpand={() => {}}
        isExpanded={isSelectionExpanded}
        isDisabled={false}
        title="Select Date & Time"
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

      {/* Аккордеон 2: Форма контактов (всегда открыт в десктопе) */}
      <CollapsedSelection
        selectedMonth={months[bookingState.selectedMonth]}
        selectedDate={selectedDateObj}
        selectedTime={selectedTimeObj}
        formatMonth={formatMonth}
        formatDate={formatDate}
        onExpand={() => {}}
        isExpanded={isFormExpanded}
        isDisabled={false} // Всегда доступен в десктопе
        title="Contact Details"
        forceTitle={true}
      >
        {selectedTime >= 0 ? (
          <>
            {step === 'form' && (
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
          </>
        ) : (
          <div className={styles.desktopFormPlaceholder}>
            Please select a date and time to continue
          </div>
        )}
      </CollapsedSelection>
    </div>
  )
}