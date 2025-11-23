import React from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { DatePickerProps } from '../../../types'
import { useToday } from '@/shared/hooks/useToday'
import styles from './date-picker.module.scss'

export const DatePicker: React.FC<DatePickerProps> = ({
  bookingDates,
  selectedDate,
  onDateSelect,
}) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const { isToday } = useToday()

  // Проверяем, является ли дата прошедшей
  const isPastDate = (date: Date): boolean => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)
    return checkDate < today
  }

  return (
    <div className={styles.datePicker}>
      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {weekDays.map((day, index) => (
            <div 
              key={day} 
              className={`${styles.weekDay} ${
                index === 0 || index === 6 ? styles.weekend : ''
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        <ButtonStack 
          direction="grid" 
          spacing={4}
          activeIndex={selectedDate}
          onActiveChange={onDateSelect}
          className={styles.stack}
          interactionMode="click"
          rememberActive={true}
          enableActiveSlider={true}
        >
          {bookingDates.map((bookingDate, index) => {
            const isWeekend = bookingDate.date.getDay() === 0 || bookingDate.date.getDay() === 6
            const today = isToday(bookingDate.date)
            const past = isPastDate(bookingDate.date)
            
            return (
              <ButtonStackItem 
                key={index}
                className={`${isWeekend ? styles.weekend : ''} ${today ? styles.today : ''} ${past ? styles.past : ''}`}
                isToday={today}
              >
                <div className={styles.item}>
                  <div className={styles.itemNumber}>
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