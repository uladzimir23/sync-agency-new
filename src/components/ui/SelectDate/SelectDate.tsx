import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import { BookingDate } from '@/hooks/useCalendar'
import { useToday } from '@/hooks/useToday'
import './SelectDate.scss'

interface SelectDateProps {
  bookingDates: BookingDate[]
  selectedDate: number
  onDateSelect: (index: number) => void
}

export const SelectDate: React.FC<SelectDateProps> = ({
  bookingDates,
  selectedDate,
  onDateSelect,
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const { isToday } = useToday()

  return (
    <div className="select-date">
      <div className="select-date__calendar">
        <h3 className="select-date__title">Select Date</h3>
        
        {/* Week days header */}
        <div className="select-date__week-days">
          {weekDays.map((day, index) => (
            <div 
              key={day} 
              className={`select-date__week-day ${
                index === 0 || index === 6 ? 'select-date__week-day--weekend' : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Date Selection */}
        <ButtonStack 
          direction="grid" 
          spacing={4}
          activeIndex={selectedDate}
          onActiveChange={onDateSelect}
          className="select-date__stack"
          interactionMode="click"
          rememberActive={true}
        >
          {bookingDates.map((bookingDate, index) => {
            const isWeekend = bookingDate.date.getDay() === 0 || bookingDate.date.getDay() === 6
            const today = isToday(bookingDate.date)
            
            return (
              <ButtonStackItem 
                key={index}
                className={`${isWeekend ? 'select-date__item--weekend' : ''} ${today ? 'select-date__item--today' : ''}`}
                isToday={today}
              >
                <div className="select-date__item">
                  <div className="select-date__item-number">
                    {bookingDate.date.getDate()}
                  </div>
                </div>
              </ButtonStackItem>
            )
          })}
        </ButtonStack>
      </div>
    </div>
  )
}