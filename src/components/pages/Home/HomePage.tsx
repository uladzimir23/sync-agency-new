import React, { useState } from 'react'

import { WavyBackground } from '@/components/ui/wavy-background'
import { CurvedLoop } from '@/components/ui/curved-loop'
import { FloatingContactButton } from '@/components/ui/floating-contact-button'


import { DashboardHeader } from '../../sections/DashboardHeader'
import { ButtonStackSection } from '../../sections/ButtonStackSection/ButtonStackSection'
import { ContentCardSection } from '../../sections/ContentCardSection/ContentCardSection'
import { ButtonVariantsSection } from '../../sections/ButtonVariantsSection/ButtonVariantsSection'
import { ButtonSizesSection } from '../../sections/ButtonSizesSection/ButtonSizesSection'
import { ButtonAnimationsSection } from '../../sections/ButtonAnimationsSection/ButtonAnimationsSection'
import { ButtonStatesSection } from '../../sections/ButtonStatesSection/ButtonStatesSection'
import { CalendarSection } from '../../sections/CalendarSection/CalendarSection'
import { FooterSection } from '../../sections/FooterSection/FooterSection'
import { ProductHeroSection } from '../../sections/ProductHeroSection'


import './HomePage.scss'

import { useTheme } from '@/hooks/useTheme'



export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0)
  const [activeMenu, setActiveMenu] = useState(0)
  const { theme } = useTheme()

  const handleCtaClick = () => {
    console.log('CTA clicked - start branding project')
  }

  const handleSecondaryCtaClick = () => {
    console.log('Secondary CTA clicked - view brand portfolio')
  }


  const handleContactClick = () => {
    // Логика для открытия контактной формы/модалки
    console.log('Opening contact modal...')
    // Или скролл к секции контактов
    // document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })
  }
  
  // Определяем цвета фона в зависимости от темы
  const getBackgroundFill = () => {
    return theme === 'dark' ? '#020212' : '#f2f2ff'
  }


  return (
    <div className="home-page">
      {/* Фиксированный волновой фон */}
      <div className="home-page-background">
        <WavyBackground
          backgroundFill={getBackgroundFill()}
          colors={["#38bdf8", "#818cf8", "#c084fc", "#e879f9"]}
          waveWidth={20}
          blur={10}
          speed="fast"
          waveOpacity={0.5}
          containerClassName="home-page-wavy-bg"
        />
      </div>

      {/* Плавающая кнопка контактов */}
      <FloatingContactButton 
        circularText="Get in touch • Contact us • Let's talk • "
        spinDuration={15}
        onHover="slowDown"
        onClick={handleContactClick}
        radius={85}
        fontSize={12}
        className="floating-contact-button--custom"
      />


      {/* Основной контент */}
      <div className="home-page-content">
        <div className="dashboard-section">
          <DashboardHeader 
            title={
              <>
                Unified system where <br />
                brand, strategy, technology and data <br />
                work together in perfect harmony
              </>
            }
            subtitle="Creating exceptional digital experiences through integrated solutions and innovative approaches"
          />
            <div className="curved-loop-section">
                <div className="curved-loop__container">
                <CurvedLoop 
                    marqueeText="in developing ✦ "
                    speed={1}
                    curveAmount={250}
                    direction="left"
                    interactive={true}
                    textColor="var(--text-primary)"
                    fontSize={20}
                    height={80}
                    className="curved-loop--interactive"
                />
                </div>
            </div>
            <div className='product-hero-sections-wrapper'>
            <ProductHeroSection
                title="Branding & Identity"
                subtitle="Memorable Brand Experiences"
                description="Craft distinctive brand identities that tell compelling stories and build lasting connections with your audience. Your brand is more than a logo—it's the soul of your business."
                ctaText="Create Your Brand"
                onCtaClick={handleCtaClick}
            />
            <ProductHeroSection
                title="Marketing Strategy"
                subtitle="Data-Driven Growth Solutions"
                description="Develop comprehensive marketing strategies that drive measurable results. Our data-driven approach ensures your marketing efforts deliver maximum ROI and sustainable growth."
                ctaText="Discuss Your Strategy"
                onCtaClick={handleCtaClick}
            />
            <ProductHeroSection
                title="Product Development"
                subtitle="End-to-End Digital Solutions"
                description="Transform your ideas into scalable, user-friendly digital products. From concept to deployment, we deliver solutions that drive business growth and engage your audience."
                ctaText="Start Your Project"
                onCtaClick={handleCtaClick}
            />
            <ProductHeroSection
                title="Analytics & Optimization"
                subtitle="Data-Driven Growth & Performance"
                description="Transform your data into actionable insights that drive business growth. Our analytics solutions help you understand user behavior, optimize performance, and make informed decisions."
                ctaText="Optimize With Data"
                onCtaClick={handleCtaClick}
            />
            <ProductHeroSection
                title="Automation & Infrastructure"
                subtitle="Streamlined Operations & Scalable Systems"
                description="Build robust, automated infrastructure that scales with your business. Our solutions eliminate manual processes, reduce errors, and ensure your systems run smoothly 24/7."
                ctaText="Optimize Your Infrastructure"
                onCtaClick={handleCtaClick}
            />
            </div>
            
          <CalendarSection />

        </div>
      </div>
    </div>
  )
}