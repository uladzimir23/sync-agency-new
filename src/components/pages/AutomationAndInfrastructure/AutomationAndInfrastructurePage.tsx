import React from 'react'
import { ProductHeroSection } from '../../sections/ProductHeroSection'
import { ServiceFeatures } from '../../sections/ServiceFeatures'
import { ProcessTimeline } from '../../sections/ProcessTimeline'
import { CTASection } from '../../sections/CTASection'
import './AutomationAndInfrastructurePage.scss'

export const AutomationAndInfrastructurePage: React.FC = () => {
  const features = [
    {
      title: 'CI/CD Pipelines',
      description: 'Automated deployment workflows for rapid, reliable, and consistent software releases.'
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud solutions optimized for performance, security, and cost-efficiency.'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Manage and provision infrastructure through code for reproducibility and version control.'
    },
    {
      title: 'Monitoring & Alerting',
      description: 'Real-time system monitoring and proactive alerting to ensure optimal performance.'
    },
    {
      title: 'Security Automation',
      description: 'Automated security scanning and compliance checks to protect your systems.'
    },
    {
      title: 'Database Management',
      description: 'Optimized database solutions with automated backups, scaling, and performance tuning.'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Infrastructure Assessment',
      description: 'Comprehensive analysis of your current infrastructure and automation needs.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Architecture Design',
      description: 'Design scalable and secure infrastructure architecture tailored to your requirements.',
      duration: '2-3 weeks'
    },
    {
      step: 3,
      title: 'Implementation',
      description: 'Setup and configuration of infrastructure using infrastructure as code practices.',
      duration: '3-6 weeks'
    },
    {
      step: 4,
      title: 'Automation Setup',
      description: 'Implementation of CI/CD pipelines and automation workflows for efficient operations.',
      duration: '2-4 weeks'
    },
    {
      step: 5,
      title: 'Testing & Optimization',
      description: 'Rigorous testing and performance optimization of the implemented solutions.',
      duration: '1-2 weeks'
    },
    {
      step: 6,
      title: 'Training & Handover',
      description: 'Comprehensive training and documentation for your team to manage the infrastructure.',
      duration: '1 week'
    }
  ]

  const handleCtaClick = () => {
    console.log('CTA clicked - discuss automation')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view infrastructure cases')
  }

  return (
    <div className="automation-infrastructure-page">
      <ProductHeroSection
        title="Automation & Infrastructure"
        subtitle="Streamlined Operations & Scalable Systems"
        description="We build robust, automated infrastructure that scales with your business. Our solutions eliminate manual processes, reduce errors, and ensure your systems run smoothly 24/7."
        ctaText="Optimize Your Infrastructure"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Our Infrastructure Services"
        subtitle="Comprehensive automation and infrastructure solutions for modern businesses"
        features={features}
      />

      <ProcessTimeline
        title="Our Implementation Process"
        subtitle="A systematic approach to building reliable and scalable infrastructure solutions"
        steps={processSteps}
      />

      <CTASection
        title="Ready to Streamline Your Operations?"
        description="Let's build an automated infrastructure that scales with your business and reduces operational overhead."
        ctaText="Discuss Infrastructure Needs"
        secondaryCtaText="View Case Studies"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}