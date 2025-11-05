import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/components/ui/button-stack'
import { BookingDate } from '@/hooks/useCalendar'
import './AvailableTimes.scss'

interface AvailableTimesProps {
  selectedDate: number
  bookingDates: BookingDate[]
  selectedTime: number
  onTimeSelect: (index: number) => void
  formatDate: (date: Date) => string
}

export const AvailableTimes: React.FC<AvailableTimesProps> = ({
  selectedDate,
  bookingDates,
  selectedTime,
  onTimeSelect,
  formatDate,
}) => {
  const selectedDateObj = bookingDates[selectedDate]

  if (!selectedDateObj) return null

  return (
    <div className="available-times">
      <h2 className="available-times__title">
        Available times for {formatDate(selectedDateObj.date)}
      </h2>
      <ButtonStack 
        direction="row" 
        spacing={6}
        activeIndex={selectedTime}
        onActiveChange={onTimeSelect}
        className="available-times__stack"
        interactionMode="click"
        rememberActive={true}
      >
        {selectedDateObj.timeSlots.map((slot, index) => (
          <ButtonStackItem 
            key={slot.id}
            className={!slot.available ? 'available-times__slot--unavailable' : ''}
          >
            <div className="available-times__slot">
              {slot.time}
            </div>
          </ButtonStackItem>
        ))}
      </ButtonStack>
    </div>
  )
}