import React from 'react'
//import './CasesPreview.scss'

export const CasesPreview: React.FC = () => {
  const cases = [
    {
      title: 'E-commerce Platform',
      description: 'Modern online store with advanced features',
      category: 'Development'
    },
    {
      title: 'Brand Redesign',
      description: 'Complete brand identity overhaul',
      category: 'Branding'
    },
    {
      title: 'Marketing Campaign',
      description: 'Multi-channel marketing strategy',
      category: 'Marketing'
    }
  ]

  return (
    <section className="cases-preview-section">
      <div className="cases-preview-container">
        <h2 className="cases-preview-title">Recent Cases</h2>
        <p className="cases-preview-subtitle">
          Explore our successful projects and client work
        </p>
        
        <div className="cases-preview-grid">
          {cases.map((caseItem, index) => (
            <div key={index} className="cases-preview-card">
              <h3>{caseItem.title}</h3>
              <p>{caseItem.description}</p>
              <span className="cases-preview-category">{caseItem.category}</span>
            </div>
          ))}
        </div>
        
        <button className="cases-preview-button">
          View All Cases
        </button>
      </div>
    </section>
  )
}