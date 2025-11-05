import React from 'react'
import { DashboardHeader } from '../../sections/DashboardHeader'
import './ContactPage.scss'

export const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="page-container">
        <DashboardHeader 
          title={
            <>
              Let's start a conversation <br />
              about your next project <br />
              and create something amazing
            </>
          }
          subtitle="Get in touch to discuss how we can help bring your ideas to life"
        />
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="info-item">
              <h3>Email</h3>
              <p>hello@example.com</p>
            </div>
            
            <div className="info-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            
            <div className="info-item">
              <h3>Location</h3>
              <p>New York, NY</p>
            </div>
          </div>
          
          <div className="contact-form">
            <h3>Send us a message</h3>
            <form>
              <input type="text" placeholder="Your Name" />
              <input type="email" placeholder="Your Email" />
              <textarea placeholder="Your Message" rows={5}></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}