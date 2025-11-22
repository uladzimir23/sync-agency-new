import React from 'react'
import { DashboardHeader } from '../../shared/sections/DashboardHeader'
import './CasesPage.scss'
import { ProductHeroSection } from '../../shared/sections/ProductHeroSection'
import { CasesSection } from '../../shared/sections/CasesSection'
import { WavyBackground } from '@/shared/ui/wavy-background'
import { useTheme } from '@/shared/hooks/useTheme'



export const CasesPage: React.FC = () => {

  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }
    const { theme } = useTheme()

    // Определяем цвета фона в зависимости от темы
    const getBackgroundFill = () => {
      return theme === 'dark' ? '#020212' : '#f2f2ff'
      }


  // This will be updated later with actual CaseCard components
  return (
    <div className="cases-page">
            <div className="home-page-background">
              <WavyBackground
                  backgroundFill={getBackgroundFill()}
                  colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9"]}
                  waveWidth={20}
                  blur={10}
                  speed="fast"
                  waveOpacity={0.5}
                  containerClassName="home-page-wavy-bg"
              />
            </div>
      
      
      <div className="page-container">
      <ProductHeroSection
        title="Case Studies"
        subtitle="Focused on Results & Impact"
        description="Dive into the challenges we've tackled and the solutions we've built. Each case is a story of collaboration, innovation, and the tangible business value we create alongside our partners."
        ctaText="Discover the Proof"
        onCtaClick={handleCtaClick}
      />
        
      <CasesSection />

      </div>
    </div>
  )
}