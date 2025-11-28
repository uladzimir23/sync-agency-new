import React from 'react'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { CTASection } from '../../shared/sections/CTASection'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './AnalyticsAndOptimizationPage.scss'

export const AnalyticsAndOptimizationPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start analytics project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view analytics dashboard')
  }

  return (
    <div className="analytics-optimization-page">
      <ProductHeroSection
        title="Analytics & Optimization"
        subtitle="Data-Driven Growth & Performance Excellence"
        description="We transform your raw data into actionable intelligence that drives strategic decisions and measurable business growth. Our advanced analytics solutions uncover hidden opportunities, optimize user experiences, and deliver competitive advantages through deep data insights."
        ctaText="Optimize With Data"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Intelligence & Optimization Platform"
        subtitle="Comprehensive data analysis and continuous optimization solutions for data-driven excellence"
        features={featuresData['analytics-and-optimization']}
      />

      <FAQSection
        title={faqData['analytics-and-optimization'].title}
        items={faqData['analytics-and-optimization'].items}
      />

      <ProcessTimeline
        title="Analytics Implementation Framework"
        subtitle="A systematic approach to transforming data into actionable insights and measurable business improvements"
        steps={processStepsData['analytics-and-optimization']}
      />

      <CTASection
        title="Ready to Harness the Power of Your Data?"
        description="Let's implement sophisticated analytics solutions that provide clear insights, drive continuous optimization, and unlock new growth opportunities for your business."
        ctaText="Start Analytics Project"
        secondaryCtaText="View Sample Reports"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}