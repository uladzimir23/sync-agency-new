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
import { PageHeader } from '@/shared/sections/PageHeader'



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

<PageHeader
  pageTitle="Marketing Strategy"
  title={<>Launch with clarity.<br />Grow with data.</>}

  subtitle="We create marketing strategies built on analytics and insights. We define the right channels, audiences, and messaging, build funnels and content plans. For new launches and scaling existing products."
  onBookCall={() => console.log('Book call for Marketing Strategy')}
  onMakeBrief={() => console.log('Make brief for Marketing Strategy')}
/>

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

      <BriefSection page="marketing" />

    </div>
  )
}