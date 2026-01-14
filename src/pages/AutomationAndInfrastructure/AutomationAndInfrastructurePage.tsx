import React from 'react'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { CTASection } from '../../shared/sections/CTASection'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './AutomationAndInfrastructurePage.scss'
import { BriefSection } from '@/shared/sections/brief-section'


export const AutomationAndInfrastructurePage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - discuss automation')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view infrastructure cases')
  }

  return (
    <div className="automation-infrastructure-page">

      <ServiceFeatures
        title="Infrastructure Excellence Suite"
        subtitle="End-to-end automation and infrastructure solutions that transform your operational efficiency"
        features={featuresData['automation-and-infrastructure']}
      />
      
      <ProcessTimeline
        title="Infrastructure Implementation Process"
        subtitle="A systematic approach to building reliable, secure, and scalable infrastructure solutions"
        steps={processStepsData['automation-and-infrastructure']}
      />

      <FAQSection
        title={faqData['automation-and-infrastructure'].title}
        items={faqData['automation-and-infrastructure'].items}
      />


      <BriefSection />


    </div>
  )
}