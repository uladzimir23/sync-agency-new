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
import { BriefSection } from '@/shared/sections/brief-section'
import { PageHeader } from '@/shared/sections/PageHeader'



export const ProductDevelopmentPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view cases')
  }

  return (
    <div className="product-development-page">

<PageHeader
  pageTitle="Product Development"
  title={<>From idea to launch —<br />we turn concepts <br />into working products.</>}
  subtitle="We design and build digital products — from landing pages and apps to complex platforms. At every stage, from UX research to development, we focus on user value and solving business problems."
  onBookCall={() => console.log('Book call for Product Development')}
  onMakeBrief={() => console.log('Make brief for Product Development')}
/>

      <ServiceFeatures
        title="Full-Stack Development Excellence"
        subtitle="Comprehensive digital product development engineered for performance, scalability, and user satisfaction"
        features={featuresData['product-development']}
      />

      <ProcessTimeline
        title="Agile Development Lifecycle"
        subtitle="A structured, transparent approach that ensures quality, innovation, and successful product delivery"
        steps={processStepsData['product-development']}
      />


      <FAQSection
        title={faqData['product-development'].title}
        items={faqData['product-development'].items}
      />

      <BriefSection page="product" />

    </div>
  )
}