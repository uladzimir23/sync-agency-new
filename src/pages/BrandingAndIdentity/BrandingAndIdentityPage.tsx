import React from 'react'
import { ProductHeroSection } from '@/shared/sections/ProductHeroSection'
import { ServiceFeatures } from '@/shared/sections/ServiceFeatures'
import { BriefSection } from '@/shared/sections/brief-section'
import { useTheme } from '@/shared/hooks/useTheme'
import { featuresData } from '@/shared/lib/data/featuresData'
import './BrandingAndIdentityPage.scss'
import { CTASection } from '../../shared/sections/CTASection'
import { FAQSection } from '../../shared/sections/FAQSection'
import { WavyBackground } from '@/shared/ui/wavy-background'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'

export const BrandingAndIdentityPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  const { theme } = useTheme()
  
  const getBackgroundFill = () => {
    return theme === 'dark' ? '#020212' : '#f2f2ff'
  }

  return (
    <div className="branding-identity-page">

      <ServiceFeatures
        title="Full-Stack Development Excellence"
        subtitle="Comprehensive digital product development engineered for performance, scalability, and user satisfaction"
        features={featuresData['branding-and-identity']}
      />
      
      {/* Обновленная ProcessTimeline с дизайном в стиле Apple */}
      <ProcessTimeline
        title="Agile Development Lifecycle"
        subtitle="A structured, transparent approach that ensures quality, innovation, and successful product delivery"
        steps={processStepsData['branding-and-identity']}
      />

      <FAQSection
        title={faqData['branding-and-identity'].title}
        items={faqData['branding-and-identity'].items}
      />


      <BriefSection />
    </div>
  )
}