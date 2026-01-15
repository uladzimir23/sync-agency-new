import React from 'react'
import { PageHeader } from '@/shared/sections/PageHeader'
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
  const handleBookCall = () => {
    console.log('Book call clicked - start branding project')
    // Реализация открытия модалки или перехода
  }

  const handleMakeBrief = () => {
    console.log('Make brief clicked')
    // Реализация открытия формы брифа
  }

  const { theme } = useTheme()
  
  const getBackgroundFill = () => {
    return theme === 'dark' ? '#020212' : '#f2f2ff'
  }

  return (
    <div className="branding-identity-page">

      <PageHeader
        pageTitle="Brand Identity"
        title={<>Design that speaks.<br />Identity that stays.</>}

        subtitle="We craft visual and verbal identities that make brands stand out, build trust, and stay memorable. From logos and colors to tone of voice and positioning — for startups and established companies alike."
        onBookCall={handleBookCall}
        onMakeBrief={handleMakeBrief}
      />

      <ServiceFeatures
        title="Full-Stack Development Excellence"
        subtitle="Comprehensive digital product development engineered for performance, scalability, and user satisfaction"
        features={featuresData['branding-and-identity']}
      />

      <ProcessTimeline
        title="Agile Development Lifecycle"
        subtitle="A structured, transparent approach that ensures quality, innovation, and successful product delivery"
        steps={processStepsData['branding-and-identity']}
      />

      <FAQSection
        title={faqData['branding-and-identity'].title}
        items={faqData['branding-and-identity'].items}
      />

      <BriefSection page="branding" />   
    </div>
  )
}