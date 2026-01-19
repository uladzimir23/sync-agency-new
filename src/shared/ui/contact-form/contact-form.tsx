import React, { useState } from 'react'
import { ButtonStack, ButtonStackItem } from '@/shared/ui/button-stack'
import styles from './contact-form.module.scss'

export interface ContactFormData {
  name: string
  email: string
  communicationMethod: 'telegram' | 'whatsapp' | 'viber' | 'other'
  contactId: string
}

interface ContactFormProps {
  formData: ContactFormData
  onFormDataChange: (data: ContactFormData) => void
  onSubmit: (formData: ContactFormData) => Promise<void> | void
  onBack?: () => void
  submitLabel?: string
  showBackButton?: boolean
  disabled?: boolean
  error?: string | null
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formData,
  onFormDataChange,
  onSubmit,
  onBack,
  submitLabel = 'Confirm',
  showBackButton = true,
  disabled = false,
  error: externalError = null
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [internalError, setInternalError] = useState<string | null>(null)

  const error = externalError || internalError

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    onFormDataChange({
      ...formData,
      [field]: value
    })
    if (internalError) setInternalError(null)
  }

  const handleCommunicationMethodChange = (index: number) => {
    const methods: ('telegram' | 'whatsapp' | 'viber' | 'other')[] = 
      ['telegram', 'whatsapp', 'viber', 'other']
    
    onFormDataChange({
      ...formData,
      communicationMethod: methods[index],
      contactId: ''
    })
    if (internalError) setInternalError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (disabled || isSubmitting) return
    
    setIsSubmitting(true)
    setInternalError(null)

    try {
      await onSubmit(formData)
    } catch (error) {
      setInternalError('Failed to submit. Please try again.')
      console.error('Form submission error:', error)
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

  const getAutoCompleteType = (method: string) => {
    switch (method) {
      case 'telegram': return 'username'
      case 'whatsapp': return 'username'
      case 'viber': return 'tel'
      case 'other': return 'off'
      default: return 'off'
    }
  }

  const communicationMethods = ['Telegram', 'WhatsApp', 'Viber', 'Other']
  const activeMethodIndex = ['telegram', 'whatsapp', 'viber', 'other'].indexOf(formData.communicationMethod)

  return (
    <div className={styles.contactForm}>
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
            name="name"
            type="text"
            autoComplete="name"
            className={styles.input}
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={styles.input}
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            disabled={isSubmitting}
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
              disabled={isSubmitting}
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
            name="contactId"
            type="text"
            autoComplete={getAutoCompleteType(formData.communicationMethod)}
            className={styles.input}
            value={formData.contactId}
            onChange={(e) => handleInputChange('contactId', e.target.value)}
            placeholder={getContactIdPlaceholder()}
            required
            disabled={isSubmitting}
          />
        </div>

        <div className={styles.actions}>
          {showBackButton && onBack && (
            <button 
              type="button"
              className={styles.backButton}
              onClick={onBack}
              disabled={isSubmitting}
            >
              Back
            </button>
          )}
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={isSubmitting || disabled}
          >
            {isSubmitting ? 'Sending...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  )
}