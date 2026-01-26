import React from 'react'
import { FaChevronDown } from 'react-icons/fa'; // Импортируем иконку
import { BookingDate, TimeSlot } from '@shared/sections/booking-section/types.ts'
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
  forceTitle?: boolean
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
  title = 'Select Date & Time',
  forceTitle = false
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
        <div className={styles.details}>
          <div className={styles.summary}>
            {forceTitle ? (
              <span>{title}</span>
            ) : selectedTime ? (
              <>
                <span className={styles.date}>{formatDate(selectedDate?.date || new Date())}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.time}>{selectedTime.time}</span>
              </>
            ) : selectedDate ? (
              <>
                <span className={styles.month}>{formatMonth(selectedMonth)}</span>
                <span className={styles.separator}>•</span>
                <span className={styles.date}>{formatDate(selectedDate.date)}</span>
              </>
            ) : (
              <span>{title}</span>
            )}
          </div>
        </div>

      < div className={styles.arrowWrapper}>
       <FaChevronDown className={`${styles.arrowDropdown} ${isExpanded ? styles.expanded : ''}`} />
       </div>
    </div>

      <div className={`${styles.content} ${isExpanded ? styles.expanded : ''}`}>
        {children}
      </div>
    </div>
  )
}