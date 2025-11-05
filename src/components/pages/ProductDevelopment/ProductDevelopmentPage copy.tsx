import React from 'react'
import { DashboardHeader } from '../../sections/DashboardHeader'
import './ProductDevelopmentPage.scss'

export const ProductDevelopmentPage: React.FC = () => {
  return (
    <div className="product-development-page">
      <div className="page-container">
        <DashboardHeader 
          title={
            <>
              Transforming visionary ideas <br />
              into scalable digital products <br />
              that users love
            </>
          }
          subtitle="End-to-end product development from concept to deployment and beyond"
        />
        
        <div className="services-grid">
          <div className="service-item">
            <h3>Web Applications</h3>
            <p>Modern, responsive web applications built with cutting-edge technologies</p>
          </div>
          
          <div className="service-item">
            <h3>Mobile Apps</h3>
            <p>iOS and Android native applications with seamless user experiences</p>
          </div>
          
          <div className="service-item">
            <h3>API Development</h3>
            <p>Robust RESTful and GraphQL APIs for seamless integration</p>
          </div>
        </div>
      </div>
    </div>
  )
}