// src/shared/sections/brief-section/types.ts
export interface ProjectFeature {
  id: string
  title: string
  description: string
  category: string
}

export interface BudgetOption {
  id: string
  label: string
  value: string
}

export interface TimelineOption {
  id: string
  label: string
  value: string
}

export interface BriefFormData {
  projectDescription: string
  selectedFeatures: string[]
  selectedBudget: string | null
  selectedTimeline: string | null
  uploadedFiles: File[]
}

export interface BriefState {
  formData: BriefFormData
  isSubmitted: boolean
}

// Интерфейс для BriefSection пропсов
export interface BriefSectionProps {
  page?: string // Простая строка
}

// Common props for all device types
export interface BriefCommonProps {
  briefState: BriefState
  page: string
  projectFeatures: ProjectFeature[]
  budgetOptions: BudgetOption[]
  timelineOptions: TimelineOption[]
  onFeatureToggle: (featureId: string) => void
  onBudgetSelect: (budgetValue: string) => void
  onTimelineSelect: (timelineValue: string) => void
  onProjectDescriptionChange: (description: string) => void
  onFilesUpload: (files: File[]) => void
  onBriefSubmit: () => void
  resetForm?: () => void
  isFormValid: boolean
}

export interface BriefDesktopProps extends BriefCommonProps {}
export interface BriefTabletProps extends BriefCommonProps {}
export interface BriefMobileProps extends BriefCommonProps {}