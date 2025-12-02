import React, { useState } from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import styles from './UnifiedBookingForm.module.scss'

interface UnifiedBookingFormProps {
  initialData?: {
    name?: string
    email?: string
    communicationMethod?: 'telegram' | 'whatsapp' | 'viber' | 'other'
    contactId?: string
  }
  onSubmit: (data: any) => Promise<void>
  onCancel?: () => void
  submitText?: string
  cancelText?: string
  disabled?: boolean
  showCancel?: boolean
  className?: string
}

export const UnifiedBookingForm: React.FC<UnifiedBookingFormProps> = ({
  initialData = {},
  onSubmit,
  onCancel,
  submitText = 'Confirm Booking',
  cancelText = 'Back',
  disabled = false,
  showCancel = true,
  className = ''
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    communicationMethod: 'telegram' as const,
    contactId: '',
    ...initialData
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    if (error) setError(null)
  }

  const handleCommunicationMethodChange = (index: number) => {
    if (disabled || isSubmitting) return
    
    const methods: ('telegram' | 'whatsapp' | 'viber' | 'other')[] = 
      ['telegram', 'whatsapp', 'viber', 'other']
    
    setFormData(prev => ({
      ...prev,
      communicationMethod: methods[index],
      contactId: ''
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (disabled || isSubmitting) return
    
    setIsSubmitting(true)
    setError(null)

    try {
      await onSubmit(formData)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to submit form')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getContactIdPlaceholder = () => {
    switch (formData.communicationMethod) {
      case 'telegram': return '@telegramID'
      case 'whatsapp': return '@whatsappID' 
      case 'viber': return 'Phone number'
      case 'other': return 'Your contact details'
      default: return 'Contact ID'
    }
  }

  const getContactIdLabel = () => {
    switch (formData.communicationMethod) {
      case 'telegram': return 'Telegram ID'
      case 'whatsapp': return 'WhatsApp ID'
      case 'viber': return 'Phone Number'
      case 'other': return 'Contact Details'
      default: return 'Contact ID'
    }
  }

  const communicationMethods = ['Telegram', 'WhatsApp', 'Viber', 'Other']
  const activeMethodIndex = ['telegram', 'whatsapp', 'viber', 'other'].indexOf(formData.communicationMethod)

  const isFormDisabled = disabled || isSubmitting
  const canSubmit = !isFormDisabled && formData.name && formData.email && formData.contactId

  return (
    <div className={`${styles.unifiedBookingForm} ${className} ${isFormDisabled ? styles.disabled : ''}`}>
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
            disabled={isFormDisabled}
            placeholder="Your name"
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
            disabled={isFormDisabled}
            placeholder="your.email@example.com"
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
            disabled={isFormDisabled}
          />
        </div>

        <div className={styles.actions}>
          {showCancel && onCancel && (
            <button 
              type="button" 
              onClick={onCancel} 
              className={styles.backButton}
              disabled={isFormDisabled}
            >
              {cancelText}
            </button>
          )}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={!canSubmit}
          >
            {isSubmitting ? 'Sending...' : submitText}
          </button>
        </div>
      </form>
    </div>
  )
}