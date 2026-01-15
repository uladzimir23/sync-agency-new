// src/shared/sections/brief-section/components/hooks/use-brief.ts
import { useState, useCallback, useMemo } from 'react'
import { 
  BriefState, 
  BriefFormData, 
  ProjectFeature, 
  BudgetOption, 
  TimelineOption 
} from '../../types'

// Интерфейс для пропсов хука
interface UseBriefOptions {
  page?: string // Идентификатор страницы (например: 'branding', 'automation', 'analytics', 'marketing', 'product')
  initialFormData?: Partial<BriefFormData>
}

// Данные для всех страниц - храним прямо в хуке
const PAGE_FEATURES: Record<string, ProjectFeature[]> = {
  // Branding & Identity
  branding: [
    {
      id: 'logo-design',
      title: 'Signature Identity',
      description: 'Distinctive logos that embody your brand\'s core essence.',
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
  ],
  
  // Automation & Infrastructure
  automation: [
    {
      id: 'automated-deployment',
      title: 'Automated Deployment',
      description: 'Seamless deployment workflows for exceptional reliability.',
      category: 'Automation'
    },
    {
      id: 'cloud-architecture',
      title: 'Cloud Architecture',
      description: 'Sophisticated cloud solutions engineered for excellence.',
      category: 'Infrastructure'
    },
    {
      id: 'infrastructure-as-code',
      title: 'Infrastructure as Code',
      description: 'Precision infrastructure management through code.',
      category: 'Automation'
    },
    {
      id: 'performance-monitoring',
      title: 'Performance Monitoring',
      description: 'Comprehensive monitoring for optimal system performance.',
      category: 'Monitoring'
    },
    {
      id: 'security-framework',
      title: 'Security Framework',
      description: 'Advanced security protocols for complete protection.',
      category: 'Security'
    },
    {
      id: 'database-solutions',
      title: 'Database Solutions',
      description: 'Optimized database architectures for peak performance.',
      category: 'Infrastructure'
    }
  ],
  
  // Analytics & Optimization
  analytics: [
    {
      id: 'performance-intelligence',
      title: 'Performance Intelligence',
      description: 'Comprehensive analytics for informed strategic decisions.',
      category: 'Analytics'
    },
    {
      id: 'user-insights',
      title: 'User Insights',
      description: 'Deep understanding of user behavior and preferences.',
      category: 'Analytics'
    },
    {
      id: 'strategic-testing',
      title: 'Strategic Testing',
      description: 'Data-driven experimentation to validate enhancements.',
      category: 'Optimization'
    },
    {
      id: 'conversion-excellence',
      title: 'Conversion Excellence',
      description: 'Optimized user journeys for maximum conversion rates.',
      category: 'Optimization'
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Elegant dashboards that transform data into understanding.',
      category: 'Analytics'
    },
    {
      id: 'predictive-analytics',
      title: 'Predictive Analytics',
      description: 'Advanced forecasting for proactive business strategy.',
      category: 'Analytics'
    }
  ],
  
  // Marketing Strategy
  marketing: [
    {
      id: 'search-excellence',
      title: 'Search Excellence',
      description: 'Strategic SEO for dominant search presence.',
      category: 'SEO'
    },
    {
      id: 'content-strategy',
      title: 'Content Strategy',
      description: 'Compelling content that builds authority and engagement.',
      category: 'Content'
    },
    {
      id: 'social-presence',
      title: 'Social Presence',
      description: 'Strategic social media for meaningful audience connections.',
      category: 'Social Media'
    },
    {
      id: 'precision-advertising',
      title: 'Precision Advertising',
      description: 'Targeted campaigns that maximize return on investment.',
      category: 'Advertising'
    },
    {
      id: 'email-excellence',
      title: 'Email Excellence',
      description: 'Personalized communications that nurture relationships.',
      category: 'Email'
    },
    {
      id: 'marketing-intelligence',
      title: 'Marketing Intelligence',
      description: 'Comprehensive analytics for marketing optimization.',
      category: 'Analytics'
    }
  ],
  
  // Product Development
  product: [
    {
      id: 'web-applications',
      title: 'Web Applications',
      description: 'Sophisticated web solutions with exceptional user experiences.',
      category: 'Web'
    },
    {
      id: 'mobile-excellence',
      title: 'Mobile Excellence',
      description: 'Refined mobile applications with native performance.',
      category: 'Mobile'
    },
    {
      id: 'api-architecture',
      title: 'API Architecture',
      description: 'Robust API solutions for seamless integration.',
      category: 'API'
    },
    {
      id: 'cloud-solutions',
      title: 'Cloud Solutions',
      description: 'Scalable cloud architectures for modern applications.',
      category: 'Cloud'
    },
    {
      id: 'experience-design',
      title: 'Experience Design',
      description: 'Intuitive interfaces that anticipate user needs.',
      category: 'UX/UI'
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      description: 'Comprehensive testing for flawless performance.',
      category: 'QA'
    }
  ]
}

const initialFormData: BriefFormData = {
  projectDescription: '',
  selectedFeatures: [],
  selectedBudget: null,
  selectedTimeline: null,
  uploadedFiles: []
}

export const useBrief = (options: UseBriefOptions = {}) => {
  const { 
    page = 'branding', // Дефолтная страница
    initialFormData: customInitialData = {} 
  } = options

  const [briefState, setBriefState] = useState<BriefState>({
    formData: {
      ...initialFormData,
      ...customInitialData
    },
    isSubmitted: false
  })

  // Получаем фичи для указанной страницы
  const projectFeatures: ProjectFeature[] = useMemo(() => {
    return PAGE_FEATURES[page] || PAGE_FEATURES.branding
  }, [page])

  const budgetOptions: BudgetOption[] = useMemo(() => [
    { id: 'up-to-500', label: 'up to $500', value: 'up_to_500' },
    { id: '500-1500', label: '$500 - $1,500', value: '500_1500' },
    { id: '1500-5000', label: '$1,500 - $5,000', value: '1500_5000' },
    { id: '5000-15000', label: '$5,000 - $15,000', value: '5000_15000' },
    { id: '15000-30000', label: '$15,000 - $30,000', value: '15000_30000' },
    { id: '30000-plus', label: '$30,000+', value: '30000_plus' },
    { id: 'not-sure', label: 'Not sure yet', value: 'not_sure' }
  ], [])

  const timelineOptions: TimelineOption[] = useMemo(() => [
    { id: 'urgent', label: 'Urgent (1-3 months)', value: 'urgent' },
    { id: 'standard', label: 'Standard (3-6 months)', value: 'standard' },
    { id: 'long-term', label: 'Long-term (6+ months)', value: 'long_term' },
    { id: 'planning', label: 'Still planning', value: 'planning' }
  ], [])

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
      
      // Подготовка данных для отправки
      const submissionData = {
        ...briefState.formData,
        page,
        timestamp: new Date().toISOString(),
        selectedFeaturesDetails: briefState.formData.selectedFeatures.map(featureId => 
          projectFeatures.find(f => f.id === featureId) || { id: featureId }
        )
      }
      
      console.log('Submitting brief for page:', page, submissionData)
      
      // TODO: Здесь будет логика отправки данных
      // Например: sendBriefToTelegram(submissionData)
    }
  }, [briefState.formData, isFormValid, page, projectFeatures])

  const resetForm = useCallback(() => {
    setBriefState({
      formData: initialFormData,
      isSubmitted: false
    })
  }, [])

  return {
    briefState,
    page,
    projectFeatures,
    budgetOptions,
    timelineOptions,
    handleFeatureToggle,
    handleBudgetSelect,
    handleTimelineSelect,
    handleProjectDescriptionChange,
    handleFilesUpload,
    handleBriefSubmit,
    resetForm,
    isFormValid
  }
}