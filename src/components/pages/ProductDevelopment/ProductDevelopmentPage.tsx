import React from 'react'
import { ProductHeroSection } from '../../sections/ProductHeroSection'
import { ServiceFeatures } from '../../sections/ServiceFeatures'
import { ProcessTimeline } from '../../sections/ProcessTimeline'
import { CTASection } from '../../sections/CTASection'
import './ProductDevelopmentPage.scss'

export const ProductDevelopmentPage: React.FC = () => {
  const features = [
    {
      title: 'Web Applications',
      description: 'Modern, responsive web applications built with cutting-edge technologies and best practices.'
    },
    {
      title: 'Mobile Apps',
      description: 'iOS and Android native applications with seamless user experiences and native performance.'
    },
    {
      title: 'API Development',
      description: 'Robust RESTful and GraphQL APIs for seamless integration and scalability.'
    },
    {
      title: 'Cloud Architecture',
      description: 'Scalable cloud solutions optimized for performance, security, and cost-efficiency.'
    },
    {
      title: 'UI/UX Design',
      description: 'User-centered design approaches that create intuitive and engaging experiences.'
    },
    {
      title: 'Quality Assurance',
      description: 'Comprehensive testing strategies to ensure reliability and performance.'
    }
  ]

  const processSteps = [
    {
      step: 1,
      title: 'Discovery & Planning',
      description: 'We analyze your requirements, define project scope, and create detailed specifications.',
      duration: '1-2 weeks'
    },
    {
      step: 2,
      title: 'Design & Prototyping',
      description: 'Our designers create wireframes and prototypes for your review and feedback.',
      duration: '2-3 weeks'
    },
    {
      step: 3,
      title: 'Development & Implementation',
      description: 'Our developers build your product using agile methodologies and continuous integration.',
      duration: '4-12 weeks'
    },
    {
      step: 4,
      title: 'Testing & Quality Assurance',
      description: 'Rigorous testing ensures your product meets quality standards and user expectations.',
      duration: '1-3 weeks'
    },
    {
      step: 5,
      title: 'Deployment & Launch',
      description: 'We deploy your product to production and ensure a smooth launch process.',
      duration: '1 week'
    },
    {
      step: 6,
      title: 'Maintenance & Support',
      description: 'Ongoing support, updates, and improvements to keep your product running smoothly.',
      duration: 'Ongoing'
    }
  ]

  const handleCtaClick = () => {
    // Navigate to contact form or open modal
    console.log('CTA clicked - start project')
  }

  const handleSecondaryCtaClick = () => {
    // Navigate to cases page
    console.log('Secondary CTA clicked - view cases')
  }

  return (
    <div className="product-development-page">
      <ProductHeroSection
        title="Product Development"
        subtitle="End-to-End Digital Solutions"
        description="We transform your ideas into scalable, user-friendly digital products. From concept to deployment, we deliver solutions that drive business growth and engage your audience."
        ctaText="Start Your Project"
        onCtaClick={handleCtaClick}
      />

      <ServiceFeatures
        title="Our Development Services"
        subtitle="Comprehensive digital product development tailored to your business needs"
        features={features}
      />

      <ProcessTimeline
        title="Our Development Process"
        subtitle="A structured approach that ensures quality, transparency, and successful delivery"
        steps={processSteps}
      />

      <CTASection
        title="Ready to Build Your Digital Product?"
        description="Let's discuss your project requirements and create a solution that exceeds your expectations."
        ctaText="Start Project"
        secondaryCtaText="View Case Studies"
        onCtaClick={handleCtaClick}
        onSecondaryCtaClick={handleSecondaryCtaClick}
      />
    </div>
  )
}