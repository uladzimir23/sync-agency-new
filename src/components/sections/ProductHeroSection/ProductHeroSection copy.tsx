import React from 'react'
import './ProductHeroSection.scss'

interface ProductHeroSectionProps {
  title: string
  subtitle: string
  description: string
  image?: string
  ctaText?: string
  onCtaClick?: () => void
}

export const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  title,
  subtitle,
  description,
  image,
  ctaText = 'Get Started',
  onCtaClick
}) => {
  return (
    <section className="product-hero-section">
      <div className="product-hero-container">
        <div className="product-hero-content">
          <div className="product-hero-text">
            <span className="product-hero-subtitle">{subtitle}</span>
            <h1 className="product-hero-title">{title}</h1>
            <p className="product-hero-description">{description}</p>
            <button 
              className="product-hero-cta"
              onClick={onCtaClick}
            >
              {ctaText}
            </button>
          </div>
          
          {image && (
            <div className="product-hero-visual">
              <img 
                src={image} 
                alt={title}
                className="product-hero-image"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}