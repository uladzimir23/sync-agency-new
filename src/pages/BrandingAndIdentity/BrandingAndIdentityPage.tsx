import React from 'react'
import { ProductHeroSection } from '@/shared/sections/ProductHeroSection'
import { ServiceFeatures } from '@/shared/sections/ServiceFeatures'
import { BriefSection } from '@/shared/sections/brief-section'
import { useTheme } from '@/shared/hooks/useTheme'
import { featuresData } from '@/shared/lib/data/featuresData'
import './BrandingAndIdentityPage.scss'

export const BrandingAndIdentityPage: React.FC = () => {
  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  return (
    <div className="branding-identity-page">
      <div className="home-page-background">
        {/* Background content */}
      </div>

      <ProductHeroSection
        title="Branding & Identity"
        subtitle="Memorable Brand Experiences"
        description="Craft distinctive brand identities that tell compelling stories and build lasting connections with your audience. Your brand is more than a logo—it's the soul of your business."
        ctaText="Create Your Brand"
        onCtaClick={handleCtaClick}
      />
      <BriefSection />
    </div>
  )
}