import React from 'react'
import { ServiceFeatures } from '../../shared/sections/ServiceFeatures'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { FAQSection } from '../../shared/sections/FAQSection'
import { featuresData } from '../../shared/lib/data/featuresData'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'
import './AutomationAndInfrastructurePage.scss'
import { BriefSection } from '@/shared/sections/brief-section'
import { PageHeader } from '@/shared/sections/PageHeader'



export const AutomationAndInfrastructurePage: React.FC = () => {
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
    <div className="automation-infrastructure-page">

<PageHeader
  pageTitle="Infrastructure Automation"
  title={<>Speed up.<br />Clean up.<br />Scale up.</>}

  subtitle="We streamline repetitive tasks and set up resilient digital infrastructure. From lead automation and CRM funnels to system integrations and sales pipelines — everything to grow your business faster."
  onBookCall={() => console.log('Book call for Infrastructure Automation')}
  onMakeBrief={handleMakeBrief}
/>

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

    <div id="brief-section">
      <BriefSection page="automation" />
    </div>

    </div>
  )
}