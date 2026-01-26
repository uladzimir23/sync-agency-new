import React from 'react'
import { PageHeader } from '@/shared/sections/PageHeader'
import { ServiceFeatures } from '@/shared/sections/ServiceFeatures'
import { BriefSection } from '@/shared/sections/brief-section'
import { featuresData } from '@/shared/lib/data/featuresData'

import { FAQSection } from '../../shared/sections/FAQSection'
import { ProcessTimeline } from '../../shared/sections/ProcessTimeline'
import { processStepsData } from '../../shared/lib/data/processStepsData'
import { faqData } from '../../shared/lib/data/faqData'

import { SimpleGridBackground } from '@/shared/ui/simple-grid-background';
import './BrandingAndIdentityPage.scss'; 

export const BrandingAndIdentityPage: React.FC = () => {

  const handleMakeBrief = () => {
    console.log('Make brief clicked')
    const briefSection = document.getElementById('brief-section')
    if (briefSection) {
      briefSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <>

      {/* Контент страницы */}
      <div className="branding-identity-page">
        <PageHeader
          pageTitle="Brand Identity"
          title={<>Design that speaks.<br />Identity that stays.</>}
          subtitle="We craft visual and verbal identities that make brands stand out, build trust, and stay memorable. From logos and colors to tone of voice and positioning — for startups and established companies alike."
          onBookCall={() => console.log('Book call for Brand Identity')}
          onMakeBrief={handleMakeBrief}
        />

        <ServiceFeatures
          title="Full-Stack Development Excellence"
          subtitle="Comprehensive digital product development engineered for performance, scalability, and user satisfaction"
          features={featuresData['branding-and-identity']}
        />

        <ProcessTimeline
          title="Agile Development Lifecycle"
          subtitle="A structured, transparent approach that ensures quality, innovation, and successful product delivery"
          steps={processStepsData['branding-and-identity']}
        />

        <FAQSection
          title={faqData['branding-and-identity'].title}
          items={faqData['branding-and-identity'].items}
        />

        <div id="brief-section">
          <BriefSection page="branding" />
        </div>
      </div>
    </>
  )
}