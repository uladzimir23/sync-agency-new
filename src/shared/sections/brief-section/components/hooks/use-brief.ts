import { useState, useCallback, useMemo } from 'react'
import { 
  BriefState, 
  BriefFormData, 
  ProjectFeature, 
  BudgetOption, 
  TimelineOption 
} from '../../types'

const initialFormData: BriefFormData = {
  projectDescription: '',
  selectedFeatures: [],
  selectedBudget: null,
  selectedTimeline: null,
  uploadedFiles: []
}

export const useBrief = () => {
  const [briefState, setBriefState] = useState<BriefState>({
    formData: initialFormData,
    isSubmitted: false
  })

  // Mock data
  const projectFeatures: ProjectFeature[] = [
    {
      id: 'logo-design',
      title: 'Signature Identity',
      description: 'Distinctive logos that embody your brand’s core essence.',
      category: 'Branding'
    },
    {
      id: 'brand-guidelines',
      title: 'Brand Standards',
        description: 'Comprehensive guidelines ensuring consistent brand representation.',
      category: 'Branding'
    },
    {
      id: 'visual-identity',
      title: 'Visual Language',
      description: 'Cohesive visual systems that communicate with sophistication.',
      category: 'Branding'
    },
    {
      id: 'brand-strategy',
      title: 'Brand Strategy',
      description: 'Strategic positioning that defines your market presence.',
      category: 'Branding'
    },
    {
      id: 'packaging-design',
      title: 'Packaging Design',
      description: 'Elegant packaging solutions that create memorable unboxing experiences.',
      category: 'Branding'
    },
    {
      id: 'brand-assets',
      title: 'Brand Assets',
      description: 'Complete suite of meticulously crafted brand elements.',
      category: 'Branding'
    }
  ]

  const budgetOptions: BudgetOption[] = [
    { id: 'up-to-500', label: 'up to $500', value: 'up_to_500' },
    { id: '500-1500', label: '$500 - $1,500', value: '500_1500' },
    { id: '1500-5000', label: '$1,500 - $5,000', value: '1500_5000' },
    { id: '5000-15000', label: '$5,000 - $15,000', value: '5000_15000' },
    { id: '15000-30000', label: '$15,000 - $30,000', value: '15000_30000' },
    { id: '30000-plus', label: '$30,000+', value: '30000_plus' },
    { id: 'not-sure', label: 'Not sure yet', value: 'not_sure' }
  ]

  const timelineOptions: TimelineOption[] = [
    { id: 'urgent', label: 'Urgent (1-3 months)', value: 'urgent' },
    { id: 'standard', label: 'Standard (3-6 months)', value: 'standard' },
    { id: 'long-term', label: 'Long-term (6+ months)', value: 'long_term' },
    { id: 'planning', label: 'Still planning', value: 'planning' }
  ]

  const handleFeatureToggle = useCallback((featureId: string) => {
    setBriefState(prev => {
      const currentFeatures = prev.formData.selectedFeatures
      const newFeatures = currentFeatures.includes(featureId)
        ? currentFeatures.filter(id => id !== featureId)
        : [...currentFeatures, featureId]

      return {
        ...prev,
        formData: {
          ...prev.formData,
          selectedFeatures: newFeatures
        }
      }
    })
  }, [])

  const handleBudgetSelect = useCallback((budgetValue: string) => {
    setBriefState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        selectedBudget: budgetValue
      }
    }))
  }, [])

  const handleTimelineSelect = useCallback((timelineValue: string) => {
    setBriefState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        selectedTimeline: timelineValue
      }
    }))
  }, [])

  const handleProjectDescriptionChange = useCallback((description: string) => {
    setBriefState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        projectDescription: description
      }
    }))
  }, [])

  const handleFilesUpload = useCallback((files: File[]) => {
    setBriefState(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        uploadedFiles: files
      }
    }))
  }, [])

  const isFormValid = useMemo(() => 
    briefState.formData.projectDescription.trim().length > 0 &&
    briefState.formData.selectedFeatures.length > 0 &&
    briefState.formData.selectedBudget !== null &&
    briefState.formData.selectedTimeline !== null,
    [briefState.formData]
  )

  const handleBriefSubmit = useCallback(() => {
    if (isFormValid) {
      setBriefState(prev => ({
        ...prev,
        isSubmitted: true
      }))
      console.log('Submitting brief:', briefState.formData)
    }
  }, [briefState.formData, isFormValid])

  return {
    briefState,
    projectFeatures,
    budgetOptions,
    timelineOptions,
    handleFeatureToggle,
    handleBudgetSelect,
    handleTimelineSelect,
    handleProjectDescriptionChange,
    handleFilesUpload,
    handleBriefSubmit,
    isFormValid
  }
}