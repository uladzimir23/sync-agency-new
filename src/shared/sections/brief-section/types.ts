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
  
  export interface ServiceFeatureTooltipProps {
    feature: ProjectFeature
    isVisible: boolean
    position: { top: number; left: number }
  }
  
  export interface FeaturesGridProps {
    features: ProjectFeature[]
    selectedFeatures: string[]
    onFeatureToggle: (featureId: string) => void
  }
  
  export interface FileUploadProps {
    uploadedFiles: File[]
    onFilesUpload: (files: File[]) => void
  }
  
  export interface BudgetTimelineSelectionProps {
    budgetOptions: BudgetOption[]
    timelineOptions: TimelineOption[]
    selectedBudget: string | null
    selectedTimeline: string | null
    onBudgetSelect: (budgetValue: string) => void
    onTimelineSelect: (timelineValue: string) => void
  }
  
  export interface ProjectDescriptionProps {
    description: string
    onDescriptionChange: (description: string) => void
  }
  
  // Common props for all device types
  export interface BriefCommonProps {
    briefState: BriefState
    projectFeatures: ProjectFeature[]
    budgetOptions: BudgetOption[]
    timelineOptions: TimelineOption[]
    onFeatureToggle: (featureId: string) => void
    onBudgetSelect: (budgetValue: string) => void
    onTimelineSelect: (timelineValue: string) => void
    onProjectDescriptionChange: (description: string) => void
    onFilesUpload: (files: File[]) => void
    onBriefSubmit: () => void
    isFormValid: boolean
  }
  
  export interface BriefDesktopProps extends BriefCommonProps {}
  export interface BriefTabletProps extends BriefCommonProps {}
  export interface BriefMobileProps extends BriefCommonProps {}