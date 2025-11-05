import React from 'react'
import { DashboardHeader } from '../../sections/DashboardHeader'
import './AboutPage.scss'

export const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="page-container">
        <DashboardHeader 
          title={
            <>
              Passionate creators <br />
              dedicated to excellence <br />
              and driven by innovation
            </>
          }
          subtitle="Learn more about our team, mission, and the values that guide our work"
        />
        
        <div className="about-content">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              We are a passionate team of developers, designers, and strategists 
              dedicated to creating exceptional digital experiences. Our journey 
              began with a simple belief: that technology should serve people, 
              not the other way around.
            </p>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <h3>Expert Team</h3>
              <p>Skilled professionals with diverse backgrounds and complementary expertise</p>
            </div>
            
            <div className="team-member">
              <h3>Proven Process</h3>
              <p>Methodologies that deliver results through collaboration and innovation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}