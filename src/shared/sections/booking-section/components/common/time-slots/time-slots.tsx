import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { TimeSlotsProps } from '../../../types'
import styles from './time-slots.module.scss'

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedDate,
  bookingDates,
  selectedTime,
  onTimeSelect,
  formatDate,
  scrollable = false,
}) => {
  const selectedDateObj = bookingDates[selectedDate]

  if (!selectedDateObj) return null

  return (
    <div className={`${styles.timeSlots} ${scrollable ? styles.scrollable : ''}`}>
      <h4 className={styles.title}>
        Available times for {formatDate(selectedDateObj.date)}
      </h4>
      <div className={styles.container}>
        <ButtonStack 
          direction="row" 
          spacing={6}
          activeIndex={selectedTime}
          onActiveChange={onTimeSelect}
          className={styles.stack}
          interactionMode="click"
          rememberActive={true}
        >
          {selectedDateObj.timeSlots.map((slot, index) => (
            <ButtonStackItem 
              key={slot.id}
              className={!slot.available ? styles.unavailable : ''}
            >
              <div className={styles.slot}>
                {slot.time}
              </div>
            </ButtonStackItem>
          ))}
        </ButtonStack>
      </div>
    </div>
  )
}