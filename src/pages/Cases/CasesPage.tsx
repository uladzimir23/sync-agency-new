import React from 'react'
import { DashboardHeader } from '../../shared/sections/DashboardHeader'
import './CasesPage.scss'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { CasesSection } from '../../shared/sections/CasesSection'
import { WavyBackground } from '@/shared/ui/wavy-background'
import { useTheme } from '@/shared/hooks/useTheme'
import { PageHeader } from '@/shared/sections/PageHeader'




export const CasesPage: React.FC = () => {

  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  // This will be updated later with actual CaseCard components
  return (
    <div className="cases-page">
            <div className="home-page-background">

            </div>
      
      
      <div className="page-container">
<PageHeader
  pageTitle="Cases"
  title={<>From idea to launch —<br />we turn concepts into working products.</>}
  subtitle="We design and build digital products — from landing pages and apps to complex platforms. At every stage, from UX research to development, we focus on user value and solving business problems."
  onBookCall={() => console.log('Book call for Product Development')}
  onMakeBrief={() => console.log('Make brief for Product Development')}
/>

      <CasesSection />

      </div>
    </div>
  )
}