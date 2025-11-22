import React from 'react'
import { BookingFormProps } from '../../../types'
import styles from './booking-form.module.scss'

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  onFormDataChange,
  onSubmit,
  onBack,
}) => {
  const handleInputChange = (field: keyof typeof formData, value: string) => {
    onFormDataChange({
      ...formData,
      [field]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)  // Изменено: передаем formData
  }

  return (
    <div className={styles.bookingForm}>
      <h3 className={styles.title}>Contact Details</h3>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Communication Method</label>
          <div className={styles.radioGroup}>
            {['telegram', 'whatsapp', 'viber', 'other'].map((method) => (
              <label key={method} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="communication"
                  value={method}
                  checked={formData.communicationMethod === method}
                  onChange={(e) => handleInputChange('communicationMethod', e.target.value as any)}
                  className={styles.radioInput}
                />
                <span className={styles.radioText}>
                  {method.charAt(0).toUpperCase() + method.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="message" className={styles.label}>Message (Optional)</label>
          <textarea
            id="message"
            className={styles.textarea}
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            rows={3}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onBack} className={styles.backButton}>
            Back
          </button>
          <button type="submit" className={styles.submitButton}>
            Confirm Booking
          </button>
        </div>
      </form>
    </div>
  )
}