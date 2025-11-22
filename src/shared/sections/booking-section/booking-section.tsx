import React from 'react'
import { useDeviceType } from '@/shared/hooks/useDeviceType'
import { useBooking } from './hooks/use-booking'
import { useDateFormatters } from './hooks/use-date-formatters'
import { BookingDesktop } from './components/desktop/booking-desktop'
import { BookingTablet } from './components/tablet/booking-tablet'
import { BookingMobile } from './components/mobile/booking-mobile'
import styles from './booking-section.module.scss'

export const BookingSection: React.FC = () => {
  const deviceType = useDeviceType()
  const {
    bookingState,
    months,
    bookingDates,
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleFormDataChange,
    handleFormOpen, // Новый обработчик
    handleFormSubmit,
    handleFormBack,
    handleNewBooking
  } = useBooking()

  const { formatMonth, formatDate, formatDateFull } = useDateFormatters()

  const renderContent = () => {
    const commonProps = {
      bookingState,
      months,
      bookingDates,
      onMonthSelect: handleMonthSelect,
      onDateSelect: handleDateSelect,
      onTimeSelect: handleTimeSelect,
      onFormDataChange: handleFormDataChange,
      onFormOpen: handleFormOpen, // Передаем новый обработчик
      onFormSubmit: handleFormSubmit,
      onFormBack: handleFormBack,
      onNewBooking: handleNewBooking,
      formatMonth,
      formatDate,
      formatDateFull
    }

    switch (deviceType) {
      case 'desktop':
        return <BookingDesktop {...commonProps} />
      case 'tablet':
        return <BookingTablet {...commonProps} />
      case 'mobile':
        return <BookingMobile {...commonProps} />
      default:
        return <BookingDesktop {...commonProps} />
    }
  }

  return (
    <section className={styles.bookingSection}>
      <div className={styles.header}>
        <h1 className={styles.title}>Let's finally get in touch.</h1>
        <p className={styles.subtitle}>
          Schedule a consultation with our project manager
        </p>
      </div>
      
      {renderContent()}
    </section>
  )
}