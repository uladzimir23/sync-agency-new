import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { SocialMediaGrid } from '@shared/sections/SocialMediaGrid';
import { BookingSection } from '@shared/sections/booking-section';
import { ServicesSection } from '@shared/sections/ServicesSection';
// import { SoftBlurCirclesBackground } from '@/shared/ui/soft-blur-circles-background';
import styles from './HomePage.module.scss';
import { ROUTES } from '@/shared/constants/routes';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const navigate = useNavigate();
  
  const bookingSectionRef = useRef<HTMLDivElement>(null);

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

  const scrollToBookingSection = () => {
    if (bookingSectionRef.current) {
      bookingSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleOpenBookCallModal = () => {
    console.log('Opening Book Call modal...');
  };

  // Мягкие пастельные цвета для кругов
  const softColors = [
    'rgba(120, 119, 198, 0.15)',
    'rgba(168, 85, 247, 0.1)',
    'rgba(79, 70, 229, 0.12)',
    'rgba(139, 92, 246, 0.08)',
  ];

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
              scrollToBooking={scrollToBookingSection}
              onBookCall={handleOpenBookCallModal}
            />

            {/* Новая секция социальных сетей */}
            <SocialMediaGrid 
              title="Our Digital Presence"
              subtitle="Connect with us across platforms for insights, updates, and inspiration"
              columns={3}
              showDescriptions={true}
              className={styles.smoothStepped}
              
            />

            <ServicesSection onServiceClick={handleServiceClick} />

            <div ref={bookingSectionRef}>
              <BookingSection />
            </div>
          </div>
        </div>
      </div>
  );
};