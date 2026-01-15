import React, { useState } from 'react';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { BookingSection } from '@shared/sections/booking-section';
import { ServicesSection } from '@shared/sections/ServicesSection';
import { CurvedLoop } from '@/shared/ui/curved-loop';
import { FloatingContactButton } from '@/shared/ui/floating-contact-button';
import { HeroVideo } from '@/shared/ui/hero-video'; // Импортируем новый компонент
import { useTheme } from '@/shared/hooks/useTheme';
import styles from './HomePage.module.scss';
import {WavyBackground} from '@shared/ui/wavy-background'

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const { theme } = useTheme();


  
    
    const getBackgroundFill = () => {
      return theme === 'dark' ? '#020212' : '#f2f2ff'
    }
  

  const handleContactClick = () => {
    console.log('Opening contact modal...');
  };

  const handleServiceClick = (id: string) => {
    console.log(`Service clicked: ${id}`);
    // Можно добавить логику навигации или открытия модального окна
    switch(id) {
      case 'brand-identity':
        // Навигация к странице Brand Identity
        break;
      case 'marketing-strategy':
        // Навигация к странице Marketing Strategy
        break;
      case 'product-development':
        // Навигация к странице Product Development
        break;
      case 'performance-intelligence':
        // Навигация к странице Performance Intelligence
        break;
      case 'infrastructure-automation':
        // Навигация к странице Infrastructure Automation
        break;
    }
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePageContent}>

        <div className={styles.dashboardSection}>
          {/* Добавляем HeroVideo под заголовком */}
          <div className={styles.heroVideoSection}>
            <DashboardHeader 
              title={
                <>
                  Unified system where <br />
                  brand, strategy, technology and data <br />
                  work together in sync
                </>
              }
              subtitle="Creating premium digital experiences with integrated solutions"
            />
            
            <div className={styles.videoWrapper}>
              <HeroVideo className={styles.heroVideoElement} />
            </div>
          </div>

          <ServicesSection onServiceClick={handleServiceClick} />

          <BookingSection />
        </div>
      </div>
      
      <FloatingContactButton onClick={handleContactClick} />
    </div>

  );
};