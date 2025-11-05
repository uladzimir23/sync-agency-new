import React from 'react'
import './ServicesSection.scss'

export const ServicesSection: React.FC = () => {
  const services = [
    {
      icon: '🚀',
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices.'
    },
    {
      icon: '📱',
      title: 'Mobile Development',
      description: 'Cross-platform mobile apps for iOS and Android using React Native.'
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'User-centered design solutions that enhance user experience and engagement.'
    },
    {
      icon: '☁️',
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment strategies.'
    }
  ]

  return (
    <section className="services-section">
      <div className="services-section__container">
        <h2 className="services-section__title">Our Services</h2>
        <p className="services-section__subtitle">
          We offer a wide range of digital services to help your business grow
        </p>
        <div className="services-section__grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-card__icon">{service.icon}</div>
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}