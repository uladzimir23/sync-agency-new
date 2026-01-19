import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { BookingSection } from '@shared/sections/booking-section';
import { ServicesSection } from '@shared/sections/ServicesSection';
import { CurvedLoop } from '@/shared/ui/curved-loop';
import { FloatingContactButton } from '@/shared/ui/floating-contact-button';
import { useTheme } from '@/shared/hooks/useTheme';
import styles from './HomePage.module.scss';

import {WavyBackground} from '@shared/ui/wavy-background';

import { ChatAI } from '@/shared/ui/chat-ai';
import { ROUTES } from '@/shared/constants/routes';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  // Ref для скролла к BookingSection
  const bookingSectionRef = useRef<HTMLDivElement>(null);

  const handleContactClick = () => {
    console.log('Opening contact modal...');
  };

  const handleServiceClick = (id: string) => {
    switch(id) {
      case 'brand-identity':
        navigate(ROUTES.BRANDING_AND_IDENTITY);
        break;
      case 'marketing-strategy':
        navigate(ROUTES.MARKETING_STRATEGY);
        break;
      case 'product-development':
        navigate(ROUTES.PRODUCT_DEVELOPMENT);
        break;
      case 'performance-intelligence':
        navigate(ROUTES.ANALYTICS_AND_OPTIMIZATION);
        break;
      case 'infrastructure-automation':
        navigate(ROUTES.AUTOMATION_AND_INFRASTRUCTURE);
        break;
    }
  };

  // Функция для скролла к BookingSection
  const scrollToBookingSection = () => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Функция для открытия модального окна Book Call
  const handleOpenBookCallModal = () => {
    console.log('Opening Book Call modal...');
    // Здесь можно добавить логику открытия модального окна
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePageContent}>
        <div className={styles.dashboardSection}>
          <DashboardHeader 
            title={
              <>
                Unified system where <br />
                brand, strategy, technology and data <br />
                work together in 
              </>
            }
            subtitle={
              <>
                Creating premium digital experiences <br />
                with integrated solutions
              </>
            }
            // Передаем функцию скролла
            scrollToBooking={scrollToBookingSection}
            // Дополнительная логика при клике
            onBookCall={handleOpenBookCallModal}
          />

          <ServicesSection onServiceClick={handleServiceClick} />

          {/* Добавляем ref к BookingSection */}
          <div ref={bookingSectionRef}>
            <BookingSection />
          </div>
        </div>
      </div>
      
      {/* <FloatingContactButton onClick={handleContactClick} /> */}
    </div>
  );
};