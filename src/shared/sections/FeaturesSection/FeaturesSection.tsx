import React from 'react'
import './FeaturesSection.scss'

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Innovation',
      description: 'We stay ahead of the curve by adopting the latest technologies and trends.',
      icon: '🚀'
    },
    {
      title: 'Quality',
      description: 'We deliver high-quality code and design that meets the highest standards.',
      icon: '⭐'
    },
    {
      title: 'Collaboration',
      description: 'We work closely with our clients to ensure their vision is realized.',
      icon: '🤝'
    },
    {
      title: 'Support',
      description: 'We provide ongoing support and maintenance for all our projects.',
      icon: '🔧'
    }
  ]

  return (
    <section className="features-section">
      <div className="features-section__container">
        <h2 className="features-section__title">Why Choose Us</h2>
        <p className="features-section__subtitle">
          We are committed to delivering exceptional results for every project
        </p>
        <div className="features-section__grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}