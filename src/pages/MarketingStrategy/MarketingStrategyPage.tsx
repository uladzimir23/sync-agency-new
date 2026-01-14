import React from 'react'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { CTASection } from '../../shared/sections/CTASection'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './MarketingStrategyPage.scss'
import { BriefSection } from '@/shared/sections/brief-section'


import { UnifiedBookingSection } from '@/shared/unified'


export const MarketingStrategyPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - discuss strategy')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view marketing cases')
  }

  return (
    <div className="marketing-strategy-page">

      <ServiceFeatures
        title="Strategic Marketing Framework"
        subtitle="Integrated marketing solutions that drive sustainable growth and build dominant market presence"
        features={featuresData['marketing-strategy']}
      />

      <ProcessTimeline
        title="Strategic Marketing Process"
        subtitle="A results-driven methodology that aligns marketing excellence with business objectives for maximum ROI"
        steps={processStepsData['marketing-strategy']}
      />

      <FAQSection
        title={faqData['marketing-strategy'].title}
        items={faqData['marketing-strategy'].items}
      />

      <BriefSection />

    </div>
  )
}