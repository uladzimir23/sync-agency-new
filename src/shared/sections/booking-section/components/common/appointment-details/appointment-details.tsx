import React from 'react'
import { AppointmentDetailsProps } from '../../../types'
import styles from './appointment-details.module.scss'

export const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  selectedDateObj,
  selectedTimeObj,
  formData,
  onNewBooking,
  formatDateFull,
}) => {
  // Функция для форматирования метода связи
  const formatCommunicationMethod = (method: string) => {
    switch (method) {
      case 'telegram': return 'Telegram'
      case 'whatsapp': return 'WhatsApp'
      case 'viber': return 'Viber'
      case 'other': return 'Other'
      default: return method
    }
  }

  return (
    <div className={styles.appointmentDetails}>
      <div className={styles.successIcon}>✅</div>
      <h3 className={styles.successTitle}>Booking Confirmed!</h3>
      
      <div className={styles.successDetails}>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Date & Time:</span>
          <span className={styles.successValue}>
            {selectedDateObj && formatDateFull(selectedDateObj.date)} at {selectedTimeObj?.time}
          </span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>With:</span>
          <span className={styles.successValue}>Colabsys Studio Project Manager</span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Meeting Type:</span>
          <span className={styles.successValue}>Consultation</span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Name:</span>
          <span className={styles.successValue}>{formData.name}</span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Email:</span>
          <span className={styles.successValue}>{formData.email}</span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Communication:</span>
          <span className={styles.successValue}>
            {formatCommunicationMethod(formData.communicationMethod)}
          </span>
        </div>
        <div className={styles.successItem}>
          <span className={styles.successLabel}>Contact ID:</span>
          <span className={styles.successValue}>{formData.contactId}</span>
        </div>
      </div>
      
      <div className={styles.instructions}>
        <h4>What's Next?</h4>
        <ul>
          <li>You'll receive a reminder email 1 hour before the meeting</li>
          <li>Join link will be sent 15 minutes before the start</li>
          <li>Duration: 30 minutes</li>
          <li>Please prepare your project questions</li>
        </ul>
      </div>
      
      <button 
        className={styles.newBookingButton}
        onClick={onNewBooking}
      >
        Create New Booking
      </button>
    </div>
  )
}