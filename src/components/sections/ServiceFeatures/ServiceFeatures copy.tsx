import React, { useState } from 'react'
import './ServiceFeatures.scss'

interface Feature {
  title: string
  description: string
  detailedDescription: string
  icon?: string
}

interface ServiceFeaturesProps {
  title: string
  subtitle: string
  features: Feature[]
}

export const ServiceFeatures: React.FC<ServiceFeaturesProps> = ({
  title,
  subtitle,
  features
}) => {
  const [activeFeature, setActiveFeature] = useState<number>(0)

  return (
    <section className="service-features-section">
      <div className="service-features-container">
        <div className="service-features-header">
          <h2 className="service-features-title">{title}</h2>
          <p className="service-features-subtitle">{subtitle}</p>
        </div>

        <div className="service-features-content">
          <div className="service-features-grid">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`service-feature-card ${index === activeFeature ? 'active' : ''}`}
                onClick={() => setActiveFeature(index)}
              >
                <h3 className="service-feature-title">{feature.title}</h3>
                <p className="service-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="service-features-detail">
            <div className="feature-detail-content">
              <h3 className="detail-title">{features[activeFeature].description}</h3>
              <p className="detail-description">
                {features[activeFeature].detailedDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}