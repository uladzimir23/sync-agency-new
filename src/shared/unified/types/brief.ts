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
  
  export interface BriefState {
    formData: BriefFormData
    isSubmitted: boolean
  }