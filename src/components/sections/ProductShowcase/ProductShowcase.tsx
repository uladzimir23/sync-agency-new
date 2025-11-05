import React from 'react'
//import './ProductShowcase.scss'

export const ProductShowcase: React.FC = () => {
  const products = [
    {
      title: 'Product Development',
      description: 'End-to-end digital product creation',
      path: '/product-development'
    },
    {
      title: 'Marketing Strategy',
      description: 'Data-driven marketing solutions',
      path: '/marketing-strategy'
    },
    {
      title: 'Branding & Identity',
      description: 'Memorable brand experiences',
      path: '/branding-and-identity'
    },
    {
      title: 'Automation & Infrastructure',
      description: 'Streamlined operations',
      path: '/automation-and-infrastructure'
    },
    {
      title: 'Analytics & Optimization',
      description: 'Data-driven growth',
      path: '/analytics-and-optimization'
    }
  ]

  return (
    <section className="product-showcase-section">
      <div className="product-showcase-container">
        <h2 className="product-showcase-title">Our Services</h2>
        <p className="product-showcase-subtitle">
          Comprehensive digital solutions tailored to your business needs
        </p>
        
        <div className="product-showcase-grid">
          {products.map((product, index) => (
            <div key={index} className="product-showcase-card">
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <button className="product-showcase-button">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}