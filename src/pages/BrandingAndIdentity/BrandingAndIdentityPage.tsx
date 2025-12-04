import React from 'react'
import { ProductHeroSection } from '@/shared/sections/ProductHeroSection'
import { ServiceFeatures } from '@/shared/sections/ServiceFeatures'
import { BriefSection } from '@/shared/sections/brief-section'
import { useTheme } from '@/shared/hooks/useTheme'
import { featuresData } from '@/shared/lib/data/featuresData'
import './BrandingAndIdentityPage.scss'

import { WavyBackground } from '@/shared/ui/wavy-background'




export const BrandingAndIdentityPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  const { theme } = useTheme()
  
    // Определяем цвета фона в зависимости от темы
  const getBackgroundFill = () => {
    return theme === 'dark' ? '#020212' : '#f2f2ff'
  }


  return (
    <div className="branding-identity-page">
      <div className="home-page-background">
        {/* Background content */}

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

      <ProductHeroSection
        title="Branding & Identity"
        subtitle="Memorable Brand Experiences"
        description="Craft distinctive brand identities that tell compelling stories and build lasting connections with your audience. Your brand is more than a logo—it's the soul of your business."
        ctaText="Create Your Brand"
        onCtaClick={handleCtaClick}
        backgroundType='brand'
        

      />
      <BriefSection />
    </div>
  )
}