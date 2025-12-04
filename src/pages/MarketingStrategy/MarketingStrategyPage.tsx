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
      <ProductHeroSection
        title="Marketing Strategy"
        subtitle="Data-Driven Growth Solutions & Market Leadership"
        description="We develop comprehensive, results-oriented marketing strategies that drive measurable growth and sustainable competitive advantages. Our integrated approach combines data intelligence with creative excellence to build brand authority and accelerate revenue growth across all channels."
        ctaText="Discuss Your Strategy"
        onCtaClick={handleCtaClick}
        backgroundType='marketing'

      />

      <UnifiedBookingSection 
        title="Let's finally get in touch."
        subtitle="Schedule a consultation with our project manager"
        onBookingSubmit={async (data) => {
          // Отправка данных в Telegram или другой сервис
          console.log('Booking submitted:', data)
        }}
      />

      <ServiceFeatures
        title="Strategic Marketing Framework"
        subtitle="Integrated marketing solutions that drive sustainable growth and build dominant market presence"
        features={featuresData['marketing-strategy']}
      />

      <FAQSection
        title={faqData['marketing-strategy'].title}
        items={faqData['marketing-strategy'].items}
      />

      <ProcessTimeline
        title="Strategic Marketing Process"
        subtitle="A results-driven methodology that aligns marketing excellence with business objectives for maximum ROI"
        steps={processStepsData['marketing-strategy']}
      />

      <CTASection
        title="Ready to Accelerate Your Market Growth?"
        description="Let's develop a powerful marketing strategy that drives measurable results, builds brand authority, and positions your business for market leadership and sustained success."
        ctaText="Get Strategy Consultation"
        secondaryCtaText="View Success Stories"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}