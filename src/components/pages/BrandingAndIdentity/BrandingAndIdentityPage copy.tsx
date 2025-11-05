import React from 'react'
import { ProductHeroSection } from '../../sections/ProductHeroSection'
import { ServiceFeatures } from '../../sections/ServiceFeatures'
import { ProcessTimeline } from '../../sections/ProcessTimeline'
import { CTASection } from '../../sections/CTASection'
import './BrandingAndIdentityPage.scss'
import { useTheme } from '@/hooks/useTheme'
import { WavyBackground } from '@/components/ui/wavy-background'
import { Icon } from '@/components/ui/icon'

import { FAQSection } from '../../sections/FAQSection'
import { faqData } from '../../../data/faqData'





export const BrandingAndIdentityPage: React.FC = () => {
    const features = [
      {
        title: 'Logo Design',
        description: 'Unique and memorable logos that capture your brand essence.',
        detailedDescription: 'Our logo design process begins with deep research into your industry, target audience, and brand values. We create multiple concepts that reflect your unique identity, followed by meticulous refinement. The final logo will be versatile, scalable, and memorable—working across digital and print mediums while maintaining its impact and recognition.'
      },
      {
        title: 'Brand Guidelines',
        description: 'Comprehensive brand standards for consistent application.',
        detailedDescription: 'We develop detailed brand guidelines that serve as your brand\'s rulebook. This includes precise specifications for logo usage, color palettes, typography, imagery style, voice and tone, and application examples. These guidelines ensure every team member and partner represents your brand consistently, building trust and recognition across all touchpoints.'
      },
      {
        title: 'Visual Identity',
        description: 'Cohesive visual systems including colors and typography.',
        detailedDescription: 'Beyond the logo, we craft a complete visual language that tells your brand story. This includes custom color palettes that evoke specific emotions, carefully selected typography that reflects your personality, distinctive graphic elements, and photography guidelines. Every visual component works harmoniously to create a memorable and distinctive brand presence.'
      },
      {
        title: 'Brand Strategy',
        description: 'Strategic positioning that differentiates your brand.',
        detailedDescription: 'We help you define your brand\'s core purpose, positioning, and personality. Through market analysis, competitor research, and audience insights, we develop a strategic foundation that guides all brand decisions. This includes your unique value proposition, brand story, messaging architecture, and customer journey mapping—ensuring every interaction strengthens your brand position.'
      },
      {
        title: 'Packaging Design',
        description: 'Eye-catching packaging that enhances customer experience.',
        detailedDescription: 'Your packaging is often the first physical interaction customers have with your brand. We design packaging that not only protects your product but also tells your story, creates emotional connections, and drives purchase decisions. We consider materials, sustainability, unboxing experience, and shelf impact to create packaging that stands out and builds brand loyalty.'
      },
      {
        title: 'Brand Assets',
        description: 'Complete set of digital and print assets.',
        detailedDescription: 'We deliver a comprehensive suite of brand assets ready for immediate use. This includes all logo variations in multiple formats, social media kits, business stationery, presentation templates, marketing collateral, and digital assets. Each asset is professionally crafted and follows your brand guidelines, saving you time and ensuring professional representation across all platforms.'
      }
    ]
  
  const processSteps = [
    {
      step: 1,
      title: 'Brand Discovery',
      description: 'Dive deep into your business, values, and target audience to understand your essence.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Market Research',
      description: 'Analysis of competitors and industry trends to identify unique positioning opportunities.',
      duration: '1 week'
    },
    {
      step: 3,
      title: 'Concept Development',
      description: 'Creation of initial brand concepts, mood boards, and visual directions for your review.',
      duration: '2-3 weeks'
    },
    {
      step: 4,
      title: 'Design Refinement',
      description: 'Iterative refinement of selected concepts based on your feedback and strategic alignment.',
      duration: '2-3 weeks'
    },
    {
      step: 5,
      title: 'Brand Guidelines',
      description: 'Development of comprehensive guidelines for consistent brand application.',
      duration: '2 weeks'
    },
    {
      step: 6,
      title: 'Asset Delivery',
      description: 'Delivery of all brand assets and guidelines with support for implementation.',
      duration: '1 week'
    }
  ]

  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view brand portfolio')
  }
  
    const { theme } = useTheme()
  

    // Определяем цвета фона в зависимости от темы
    const getBackgroundFill = () => {
        return theme === 'dark' ? '#020212' : '#f2f2ff'
        }


  return (
    <div className="branding-identity-page">

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

        <div className="appointment-details__placeholder-icon">
            <Icon name="calendar" size={102} alt="Calendar icon" />
        </div>
        
      <ProductHeroSection
        title="Branding & Identity"
        subtitle="Memorable Brand Experiences"
        description="Craft distinctive brand identities that tell compelling stories and build lasting connections with your audience. Your brand is more than a logo—it's the soul of your business."
        ctaText="Create Your Brand"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="System Branding PLUS+"
        subtitle="Comprehensive brand development that captures your essence and communicates your value"
        features={features}
      />

      <FAQSection
        title={faqData['branding-and-identity'].title}
        items={faqData['branding-and-identity'].items}
      />

      <ProcessTimeline
        title="Branding Process"
        subtitle="A strategic approach that ensures your brand authentically represents your business"
        steps={processSteps}
      />

      <CTASection
        title="Ready to Build a Remarkable Brand?"
        description="Let's create a brand identity that resonates with your audience and drives business growth."
        ctaText="Start Branding Project"
        secondaryCtaText="View Brand Portfolio"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}