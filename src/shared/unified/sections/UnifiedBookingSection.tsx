import React from 'react'
import { useUnifiedBooking } from '../hooks/use-unified-booking'
import { CollapsedSection } from '../components/forms/collapsed-section/CollapsedSection'
import { UnifiedBookingForm } from '../components/forms/booking-form/UnifiedBookingForm'
import { MonthSelector, DatePicker, TimeSlots } from '@/shared/sections/booking-section/components/common'
import { useDateFormatters } from '@/shared/sections/booking-section/hooks/use-date-formatters'
import { AppointmentDetails } from '@/shared/sections/booking-section/components/common'
import styles from './UnifiedBookingSection.module.scss'

interface UnifiedBookingSectionProps {
  title?: string
  subtitle?: string
  onBookingSubmit?: (data: any) => Promise<void>
}

export const UnifiedBookingSection: React.FC<UnifiedBookingSectionProps> = ({
  title = "Let's finally get in touch.",
  subtitle = 'Schedule a consultation with our project manager',
  onBookingSubmit
}) => {
  const {
    bookingState,
    months,
    bookingDates,
    selectedDateObj,
    selectedTimeObj,
    isTwoColumn,
    isAccordion,
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleFormDataChange,
    handleFormOpen,
    handleFormSubmit,
    handleFormBack,
    handleNewBooking,
    canShowForm,
    isFormDisabled
  } = useUnifiedBooking({ onBookingSubmit })

  const { formatMonth, formatDate, formatDateFull } = useDateFormatters()

  const renderDateSelection = () => (
    <div className={styles.selectionContent}>
      <MonthSelector
        months={months}
        selectedMonth={bookingState.selectedMonth}
        onMonthSelect={handleMonthSelect}
        formatMonth={formatMonth}
        scrollable={true}
      />
      
      <DatePicker
        bookingDates={bookingDates}
        selectedDate={bookingState.selectedDate}
        onDateSelect={handleDateSelect}
      />

      {bookingState.selectedDate >= 0 && selectedDateObj && (
        <TimeSlots
          selectedDate={bookingState.selectedDate}
          bookingDates={bookingDates}
          selectedTime={bookingState.selectedTime}
          onTimeSelect={handleTimeSelect}
          formatDate={formatDate}
          scrollable={true}
        />
      )}
    </div>
  )

  const renderContactForm = () => (
    canShowForm ? (
      <>
        {bookingState.step === 'form' && (
          <UnifiedBookingForm
            initialData={bookingState.formData}
            onSubmit={handleFormSubmit}
            onCancel={handleFormBack}
            disabled={isFormDisabled}
          />
        )}
        
        {bookingState.step === 'confirmation' && selectedDateObj && selectedTimeObj && (
          <AppointmentDetails
            selectedDateObj={selectedDateObj}
            selectedTimeObj={selectedTimeObj}
            formData={bookingState.formData}
            onNewBooking={handleNewBooking}
            formatDateFull={formatDateFull}
          />
        )}
      </>
    ) : (
      <div className={styles.formPlaceholder}>
        Please select a date and time to continue
      </div>
    )
  )

  return (
    <section className={styles.unifiedBookingSection}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>

      {isTwoColumn ? (
        <div className={styles.twoColumnLayout}>
          {/* Left Column - Date Selection */}
          <CollapsedSection
            title="Select Date & Time"
            isExpanded={true}
            forceOpen={true}
            className={styles.leftColumn}
          >
            {renderDateSelection()}
          </CollapsedSection>

          {/* Right Column - Contact Form */}
          <CollapsedSection
            title="Contact Details"
            isExpanded={true}
            forceOpen={true}
            disabled={isFormDisabled}
            className={styles.rightColumn}
          >
            {renderContactForm()}
          </CollapsedSection>
        </div>
      ) : (
        <div className={styles.singleColumnLayout}>
          {/* Accordion Mode for Mobile/Tablet */}
          <CollapsedSection
            title="Select Date & Time"
            isExpanded={bookingState.step === 'selection'}
            onToggle={() => {
              if (bookingState.step === 'form') {
                handleFormBack()
              }
            }}
            className={styles.selectionAccordion}
          >
            {renderDateSelection()}
          </CollapsedSection>

          <CollapsedSection
            title="Contact Details"
            isExpanded={bookingState.step === 'form'}
            onToggle={handleFormOpen}
            disabled={isFormDisabled}
            className={styles.formAccordion}
          >
            {renderContactForm()}
          </CollapsedSection>

          {/* Confirmation Section (outside accordion) */}
          {bookingState.step === 'confirmation' && selectedDateObj && selectedTimeObj && (
            <div className={styles.confirmationSection}>
              <AppointmentDetails
                selectedDateObj={selectedDateObj}
                selectedTimeObj={selectedTimeObj}
                formData={bookingState.formData}
                onNewBooking={handleNewBooking}
                formatDateFull={formatDateFull}
              />
            </div>
          )}
        </div>
      )}
    </section>
  )
}