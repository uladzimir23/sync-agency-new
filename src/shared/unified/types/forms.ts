// Общие типы для форм
export type CommunicationMethod = 'telegram' | 'whatsapp' | 'viber' | 'other'

export interface BaseFormData {
  name: string
  email: string
  communicationMethod: CommunicationMethod
  contactId: string
}

export interface BookingFormData extends BaseFormData {
  selectedDate?: Date
  selectedTime?: string
}

export interface BriefFormData extends BaseFormData {
  projectDescription: string
  selectedFeatures: string[]
  selectedBudget: string | null
  selectedTimeline: string | null
  uploadedFiles: File[]
}