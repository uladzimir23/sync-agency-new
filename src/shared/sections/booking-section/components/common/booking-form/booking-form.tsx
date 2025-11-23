import React, { useState } from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import { BookingFormProps } from '../../../types'
import styles from './booking-form.module.scss'

export const BookingForm: React.FC<BookingFormProps> = ({
  formData,
  onFormDataChange,
  onSubmit,
  onBack,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    onFormDataChange({
      ...formData,
      [field]: value
    })
    if (error) setError(null)
  }

  const handleCommunicationMethodChange = (index: number) => {
    const methods: ('telegram' | 'whatsapp' | 'viber' | 'other')[] = 
      ['telegram', 'whatsapp', 'viber', 'other']
    
    onFormDataChange({
      ...formData,
      communicationMethod: methods[index],
      contactId: ''
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(formData)
    } catch (error) {
      setError('Failed to submit booking. Please try again.')
      console.error('Booking submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getContactIdPlaceholder = () => {
    switch (formData.communicationMethod) {
      case 'telegram':
        return '@telegramID'
      case 'whatsapp':
        return '@whatsappID' 
      case 'viber':
        return 'Phone number'
      case 'other':
        return 'Your contact details'
      default:
        return 'Contact ID'
    }
  }

  const getContactIdLabel = () => {
    switch (formData.communicationMethod) {
      case 'telegram':
        return 'Telegram ID'
      case 'whatsapp':
        return 'WhatsApp ID'
      case 'viber':
        return 'Phone Number'
      case 'other':
        return 'Contact Details'
      default:
        return 'Contact ID'
    }
  }

  const communicationMethods = ['Telegram', 'WhatsApp', 'Viber', 'Other']
  const activeMethodIndex = ['telegram', 'whatsapp', 'viber', 'other'].indexOf(formData.communicationMethod)

  return (
    <div className={styles.bookingForm}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && (
          <div className={styles.errorMessage}>
            {error}
          </div>
        )}

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
          <div className={styles.communicationStack}>
            <ButtonStack 
              direction="row"
              spacing={8}
              activeIndex={activeMethodIndex}
              onActiveChange={handleCommunicationMethodChange}
              className={styles.communicationButtons}
              interactionMode="click"
              rememberActive={true}
            >
              {communicationMethods.map((method) => (
                <ButtonStackItem key={method}>
                  {method}
                </ButtonStackItem>
              ))}
            </ButtonStack>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="contactId" className={styles.label}>
            {getContactIdLabel()}
          </label>
          <input
            id="contactId"
            type="text"
            className={styles.input}
            value={formData.contactId}
            onChange={(e) => handleInputChange('contactId', e.target.value)}
            placeholder={getContactIdPlaceholder()}
            required
          />
        </div>

        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={onBack} 
            className={styles.backButton}
            disabled={isSubmitting}
          >
            Back
          </button>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Confirm Booking'}
          </button>
        </div>
      </form>
    </div>
  )
}