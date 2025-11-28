import React from 'react'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { CTASection } from '../../shared/sections/CTASection'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './ProductDevelopmentPage.scss'

export const ProductDevelopmentPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view cases')
  }

  return (
    <div className="product-development-page">
      <ProductHeroSection
        title="Product Development"
        subtitle="End-to-End Digital Innovation & Excellence"
        description="We transform visionary ideas into scalable, user-centric digital products that drive business growth and market disruption. From strategic concept to technical execution, we deliver innovative solutions that engage users, solve real problems, and create sustainable competitive advantages."
        ctaText="Start Your Project"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Full-Stack Development Excellence"
        subtitle="Comprehensive digital product development engineered for performance, scalability, and user satisfaction"
        features={featuresData['product-development']}
      />

      <FAQSection
        title={faqData['product-development'].title}
        items={faqData['product-development'].items}
      />

      <ProcessTimeline
        title="Agile Development Lifecycle"
        subtitle="A structured, transparent approach that ensures quality, innovation, and successful product delivery"
        steps={processStepsData['product-development']}
      />

      <CTASection
        title="Ready to Build Your Digital Future?"
        description="Let's collaborate to create innovative digital products that exceed user expectations, drive business growth, and establish your leadership in the digital landscape."
        ctaText="Start Project"
        secondaryCtaText="View Case Studies"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}