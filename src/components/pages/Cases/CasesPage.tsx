import React from 'react'
import { DashboardHeader } from '../../sections/DashboardHeader'
import './CasesPage.scss'

export const CasesPage: React.FC = () => {
  // This will be updated later with actual CaseCard components
  return (
    <div className="cases-page">
      <div className="page-container">
        <DashboardHeader 
          title={
            <>
              Where innovative solutions <br />
              meet real-world challenges <br />
              and deliver exceptional results
            </>
          }
          subtitle="Discover how our strategic approach transforms ideas into successful digital products"
        />
        
        <div className="cases-grid">
          <div className="case-card">
            <h3>E-commerce Platform</h3>
            <p>Modern online store with advanced features</p>
          </div>
          
          <div className="case-card">
            <h3>Mobile Application</h3>
            <p>Cross-platform mobile solution</p>
          </div>
          
          <div className="case-card">
            <h3>Enterprise Dashboard</h3>
            <p>Business intelligence and analytics platform</p>
          </div>
        </div>
      </div>
    </div>
  )
}