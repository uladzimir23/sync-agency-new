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
import styles from './BrandingAndIdentityPage.module.scss'; // Модульные стили

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
      {/* Фон с сеткой */}
      <SimpleGridBackground
        cellSize={45}
        lineWidth={1}
        color="var(--border-color-accent)"
        opacity={0.16}
        speed={0.12}
        highlightCount={25}
        highlightColors={[
          'rgba(79, 70, 229, 0.15)',
          'rgba(147, 51, 234, 0.12)',
          'rgba(236, 72, 153, 0.1)',
          'rgba(6, 182, 212, 0.1)',
          'rgba(34, 197, 94, 0.08)',
        ]}
        className={styles.gridBackground}
      />
      
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