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

export const AutomationAndInfrastructurePage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - discuss automation')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view infrastructure cases')
  }

  return (
    <div className="automation-infrastructure-page">
      <ProductHeroSection
        title="Automation & Infrastructure"
        subtitle="Streamlined Operations & Scalable Systems"
        description="We build robust, automated infrastructure that scales with your business. Our solutions eliminate manual processes, reduce errors, and ensure your systems run smoothly 24/7 while optimizing costs and enhancing security across your entire technology stack."
        ctaText="Optimize Your Infrastructure"
        onCtaClick={handleCtaClick}
        backgroundType='automation'

      />

      <ServiceFeatures
        title="Infrastructure Excellence Suite"
        subtitle="End-to-end automation and infrastructure solutions that transform your operational efficiency"
        features={featuresData['automation-and-infrastructure']}
      />

      <FAQSection
        title={faqData['automation-and-infrastructure'].title}
        items={faqData['automation-and-infrastructure'].items}
      />

      <ProcessTimeline
        title="Infrastructure Implementation Process"
        subtitle="A systematic approach to building reliable, secure, and scalable infrastructure solutions"
        steps={processStepsData['automation-and-infrastructure']}
      />

      <CTASection
        title="Ready to Transform Your Infrastructure?"
        description="Let's build an automated, scalable infrastructure that reduces operational overhead and accelerates your business growth with enterprise-grade reliability."
        ctaText="Discuss Infrastructure Needs"
        secondaryCtaText="View Case Studies"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}