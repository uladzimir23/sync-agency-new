import React from 'react'
import { ProductHeroSection } from '../../sections/ProductHeroSection'
import { ServiceFeatures } from '../../sections/ServiceFeatures'
import { ProcessTimeline } from '../../sections/ProcessTimeline'
import { CTASection } from '../../sections/CTASection'
import './MarketingStrategyPage.scss'

export const MarketingStrategyPage: React.FC = () => {
  const features = [
    {
      title: 'SEO Optimization',
      description: 'Improve your search engine rankings and organic visibility with data-driven strategies.'
    },
    {
      title: 'Content Marketing',
      description: 'Engaging content that converts visitors into customers and builds brand authority.'
    },
    {
      title: 'Social Media Strategy',
      description: 'Strategic social media campaigns that engage audiences and drive conversions.'
    },
    {
      title: 'PPC Advertising',
      description: 'Targeted paid advertising campaigns that maximize ROI and reach your ideal customers.'
    },
    {
      title: 'Email Marketing',
      description: 'Personalized email campaigns that nurture leads and build customer relationships.'
    },
    {
      title: 'Analytics & Reporting',
      description: 'Comprehensive tracking and reporting to measure performance and optimize strategies.'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Market Research',
      description: 'We analyze your industry, competitors, and target audience to identify opportunities.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Strategy Development',
      description: 'We create a comprehensive marketing strategy tailored to your business goals.',
      duration: '2 weeks'
    },
    {
      step: 3,
      title: 'Channel Planning',
      description: 'We select the most effective marketing channels and tactics for your audience.',
      duration: '1 week'
    },
    {
      step: 4,
      title: 'Implementation',
      description: 'Our team executes the marketing strategy across selected channels and platforms.',
      duration: 'Ongoing'
    },
    {
      step: 5,
      title: 'Monitoring & Optimization',
      description: 'We continuously monitor performance and optimize campaigns for better results.',
      duration: 'Ongoing'
    },
    {
      step: 6,
      title: 'Reporting & Analysis',
      description: 'Regular reporting and analysis to demonstrate ROI and inform future strategies.',
      duration: 'Monthly'
    }
  ]

  const handleCtaClick = () => {
    console.log('CTA clicked - discuss strategy')
  }

  return (
    <div className="marketing-strategy-page">
      <ProductHeroSection
        title="Marketing Strategy"
        subtitle="Data-Driven Growth Solutions"
        description="We develop comprehensive marketing strategies that drive measurable results. Our data-driven approach ensures your marketing efforts deliver maximum ROI and sustainable growth."
        ctaText="Discuss Your Strategy"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Our Marketing Services"
        subtitle="Integrated marketing solutions that drive growth and build brand presence"
        features={features}
      />

      <ProcessTimeline
        title="Our Strategic Process"
        subtitle="A results-driven approach that aligns marketing efforts with business objectives"
        steps={processSteps}
      />

      <CTASection
        title="Ready to Accelerate Your Growth?"
        description="Let's develop a marketing strategy that drives results and positions your brand for success."
        ctaText="Get Strategy Consultation"
        onCtaClick={handleCtaClick}
      />
    </div>
  )
}