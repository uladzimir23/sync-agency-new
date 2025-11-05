import React from 'react'
import { ProductHeroSection } from '../../sections/ProductHeroSection'
import { ServiceFeatures } from '../../sections/ServiceFeatures'
import { ProcessTimeline } from '../../sections/ProcessTimeline'
import { CTASection } from '../../sections/CTASection'
import './AnalyticsAndOptimizationPage.scss'

export const AnalyticsAndOptimizationPage: React.FC = () => {
  const features = [
    {
      title: 'Performance Analytics',
      description: 'Comprehensive tracking and analysis of system performance and user experience metrics.'
    },
    {
      title: 'User Behavior Analysis',
      description: 'Deep insights into how users interact with your product and identify improvement opportunities.'
    },
    {
      title: 'A/B Testing',
      description: 'Data-driven experimentation to test and validate improvements and new features.'
    },
    {
      title: 'Conversion Optimization',
      description: 'Strategies and implementations to improve conversion rates and user engagement.'
    },
    {
      title: 'Data Visualization',
      description: 'Clear and actionable dashboards that make complex data understandable and useful.'
    },
    {
      title: 'Predictive Analytics',
      description: 'Advanced analytics to forecast trends and user behavior for proactive decision making.'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Data Audit',
      description: 'Comprehensive review of your current data collection, tracking, and analysis capabilities.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Goal Definition',
      description: 'Identify key business objectives and define measurable goals and success metrics.',
      duration: '1 week'
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Setup of tracking systems, analytics tools, and data collection infrastructure.',
      duration: '2-4 weeks'
    },
    {
      step: 4,
      title: 'Analysis & Insights',
      description: 'Deep analysis of collected data to identify patterns, trends, and optimization opportunities.',
      duration: '2-3 weeks'
    },
    {
      step: 5,
      title: 'Optimization',
      description: 'Implementation of data-driven improvements and A/B testing to validate changes.',
      duration: 'Ongoing'
    },
    {
      step: 6,
      title: 'Reporting & Strategy',
      description: 'Regular reporting and strategic recommendations based on continuous data analysis.',
      duration: 'Monthly'
    }
  ]

  const handleCtaClick = () => {
    console.log('CTA clicked - start analytics project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view analytics dashboard')
  }

  return (
    <div className="analytics-optimization-page">
      <ProductHeroSection
        title="Analytics & Optimization"
        subtitle="Data-Driven Growth & Performance"
        description="We transform your data into actionable insights that drive business growth. Our analytics solutions help you understand user behavior, optimize performance, and make informed decisions."
        ctaText="Optimize With Data"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Our Analytics Services"
        subtitle="Comprehensive data analysis and optimization solutions for continuous improvement"
        features={features}
      />

      <ProcessTimeline
        title="Our Analytics Process"
        subtitle="A systematic approach to turning data into actionable insights and measurable improvements"
        steps={processSteps}
      />

      <CTASection
        title="Ready to Make Data-Driven Decisions?"
        description="Let's implement analytics solutions that provide clear insights and drive continuous optimization for your business."
        ctaText="Start Analytics Project"
        secondaryCtaText="View Sample Reports"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}