import React from 'react'
import { useCalendar } from '@/hooks/useCalendar'
import { useDateFormatters } from '@/hooks/useDateFormatters'
import { SelectMonth } from '@/components/ui/SelectMonth/SelectMonth'
import { SelectDate } from '@/components/ui/SelectDate/SelectDate'
import { AvailableTimes } from '@/components/ui/AvailableTimes/AvailableTimes'
import { AppointmentDetails } from '@/components/ui/AppointmentDetails/AppointmentDetails'
import './CalendarSection.scss'
import {ThemeToggle} from '@/components/theme/ThemeToggle'


export const CalendarSection: React.FC = () => {
  const {
    selectedMonth,
    selectedDate,
    selectedTime,
    isConfirmed,
    months,
    bookingDates,
    handleMonthSelect,
    handleDateSelect,
    handleTimeSelect,
    handleBookingConfirm,
    resetBooking,
  } = useCalendar()

  const { formatMonth, formatDate, formatDateFull } = useDateFormatters()

  const selectedDateObj = bookingDates[selectedDate]
  const selectedTimeObj = selectedTime >= 0 ? selectedDateObj?.timeSlots[selectedTime] : null

  return (
    <section className="calendar-section">
      <div className='header-calendar-section'>
        <h1>
        Let's finally get in touch.
        </h1>
      </div>
      <div className="calendar-layout">
        <div className="calendar-left">
          <div className="calendar-step">
            <SelectMonth
              months={months}
              selectedMonth={selectedMonth}
              onMonthSelect={handleMonthSelect}
              formatMonth={formatMonth}
              scrollable={true} // Включаем скролл для месяцев
            />

            <SelectDate
              bookingDates={bookingDates}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />


          </div>
        </div>

        <div className="calendar-right">
        {selectedDate >= 0 && selectedDateObj && (
              <AvailableTimes
                selectedDate={selectedDate}
                bookingDates={bookingDates}
                selectedTime={selectedTime}
                onTimeSelect={handleTimeSelect}
                formatDate={formatDate}
                scrollable={true} // Включаем скролл для временных слотов
              />
            )}
          <AppointmentDetails
            selectedDateObj={selectedDateObj}
            selectedTimeObj={selectedTimeObj}
            isConfirmed={isConfirmed}
            onBookingConfirm={handleBookingConfirm}
            onNewBooking={resetBooking}
            formatDateFull={formatDateFull}
          />
        </div>
      </div>
    </section>
  )
}