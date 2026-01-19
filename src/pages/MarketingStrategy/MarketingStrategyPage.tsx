import React from 'react'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './MarketingStrategyPage.scss'
import { BriefSection } from '@/shared/sections/brief-section'
import { PageHeader } from '@/shared/sections/PageHeader'



export const MarketingStrategyPage: React.FC = () => {
  const handleMakeBrief = () => {
    console.log('Make brief clicked')
    // Прокрутка к BriefSection по якорной ссылке
    const briefSection = document.getElementById('brief-section')
    if (briefSection) {
      briefSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div className="marketing-strategy-page">

<PageHeader
  pageTitle="Marketing Strategy"
  title={<>Launch with clarity.<br />Grow with data.</>}

  subtitle="We create marketing strategies built on analytics and insights. We define the right channels, audiences, and messaging, build funnels and content plans. For new launches and scaling existing products."
  onBookCall={() => console.log('Book call for Marketing Strategy')}
  onMakeBrief={handleMakeBrief}
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
      
      <div id="brief-section">
        <BriefSection page="marketing" />
      </div>

    </div>
  )
}