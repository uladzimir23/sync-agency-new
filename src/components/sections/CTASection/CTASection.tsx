import React from 'react'
import './CTASection.scss'

interface CTASectionProps {
  title: string
  description: string
  ctaText: string
  secondaryCtaText?: string
  onCtaClick: () => void
  onSecondaryCtaClick?: () => void
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaText,
  secondaryCtaText,
  onCtaClick,
  onSecondaryCtaClick
}) => {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-title">{title}</h2>
          <p className="cta-description">{description}</p>
          
          <div className="cta-buttons">
            <button 
              className="cta-button cta-button-primary"
              onClick={onCtaClick}
            >
              {ctaText}
            </button>
            
            {secondaryCtaText && onSecondaryCtaClick && (
              <button 
                className="cta-button cta-button-secondary"
                onClick={onSecondaryCtaClick}
              >
                {secondaryCtaText}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}