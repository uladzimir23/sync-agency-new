import React from 'react'
import { BookingDate, TimeSlot } from '../../../types'
import styles from './collapsed-selection.module.scss'

interface CollapsedSelectionProps {
  selectedMonth: Date
  selectedDate: BookingDate | undefined
  selectedTime: TimeSlot | null
  formatMonth: (date: Date) => string
  formatDate: (date: Date) => string
  onExpand: () => void
  children?: React.ReactNode
  isExpanded?: boolean
  isDisabled?: boolean
  title?: string
  icon?: string
}

export const CollapsedSelection: React.FC<CollapsedSelectionProps> = ({
  selectedMonth,
  selectedDate,
  selectedTime,
  formatMonth,
  formatDate,
  onExpand,
  children,
  isExpanded = false,
  isDisabled = false,
  title = 'Date & Time Selection',
  icon = '📅'
}) => {
  const handleClick = () => {
    if (!isDisabled) {
      onExpand()
    }
  }

  return (
    <div 
      className={`${styles.collapsedSelection} ${isExpanded ? styles.expanded : ''} ${isDisabled ? styles.disabled : ''}`}
    >
      <div className={styles.header} onClick={handleClick}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.details}>
          <div className={styles.summary}>
            {selectedTime ? (
              // Показываем выбранное время и дату
              <>
                <span className={styles.date}>{formatDate(selectedDate?.date || new Date())}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.time}>{selectedTime.time}</span>
              </>
            ) : selectedDate ? (
              // Показываем выбранную дату
              <>
                <span className={styles.month}>{formatMonth(selectedMonth)}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.date}>{formatDate(selectedDate.date)}</span>
              </>
            ) : (
              // Показываем заголовок по умолчанию
              <span>{title}</span>
            )}
          </div>
          <div className={styles.hint}>
            {isDisabled 
              ? 'Select time to continue' 
              : isExpanded 
                ? 'Tap to collapse' 
                : 'Tap to expand'
            }
          </div>
        </div>
        <div className={styles.arrow}>▼</div>
      </div>
      
      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        {children}
      </div>
    </div>
  )
}