import React from 'react'
import './HeaderSection.scss'

export const HeaderSection: React.FC = () => {
  return (
    <header className="app-header fade-in-up">
      <div>
        <h1 className="app-header__title">Component Library colabsys/ui</h1>
        <p className="app-header__subtitle">
          Unified system where <br />
          strategy, brand, technology and data <br />
          work together in
        </p>
      </div>
    </header>
  )
}

// Modern, accessible, and beautiful React components built with TypeScript and GSAP animations. 
