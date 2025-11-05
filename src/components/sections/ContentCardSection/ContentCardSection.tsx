import React from 'react'
import './ContentCardSection.scss'

export const ContentCardSection: React.FC = () => {
  return (
    <section className="demo-section fade-in-up">
      <h2 className="demo-section__title">Content Card Component</h2>
      <div className="content-card__wrapper">
        <div className="content-card">
          <h3 className="text-lg font-semibold mb-2">Feature One</h3>
          <p className="text-secondary">Beautiful card with hover effects</p>
        </div>
        <div className="content-card">
          <h3 className="text-lg font-semibold mb-2">Feature Two</h3>
          <p className="text-secondary">Smooth animations and transitions</p>
        </div>
        <div className="content-card">
          <h3 className="text-lg font-semibold mb-2">Feature Three</h3>
          <p className="text-secondary">Fully responsive design</p>
        </div>
      </div>
    </section>
  )
}