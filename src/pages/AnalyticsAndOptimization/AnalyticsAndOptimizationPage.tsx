import React from 'react'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './AnalyticsAndOptimizationPage.scss'
import { BriefSection } from '@/shared/sections/brief-section'
import { PageHeader } from '@/shared/sections/PageHeader'



export const AnalyticsAndOptimizationPage: React.FC = () => {

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
    <div className="analytics-optimization-page">

<PageHeader
  pageTitle="Performance Intelligence"
  title={<>Data-driven decisions,<br />always.</>}

  subtitle="We set up data collection and visualization systems, identify pain points and growth opportunities. We optimize landing pages, ads, funnels, and UX — all driven by real user behavior and numbers."
  onBookCall={() => console.log('Book call for Performance Intelligence')}
  onMakeBrief={handleMakeBrief}
/>

      <ServiceFeatures
        title="Intelligence & Optimization Platform"
        subtitle="Comprehensive data analysis and continuous optimization solutions for data-driven excellence"
        features={featuresData['analytics-and-optimization']}
      />

      <ProcessTimeline
        title="Analytics Implementation Framework"
        subtitle="A systematic approach to transforming data into actionable insights and measurable business improvements"
        steps={processStepsData['analytics-and-optimization']}
      />

      <FAQSection
        title={faqData['analytics-and-optimization'].title}
        items={faqData['analytics-and-optimization'].items}
      />

    <div id="brief-section">
      <BriefSection page="analytics" />
    </div>

    </div>
  )
}