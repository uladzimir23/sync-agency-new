import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { SocialMediaGrid } from '@shared/sections/SocialMediaGrid';
import { BookingSection } from '@shared/sections/booking-section';
import { ServicesSection } from '@shared/sections/ServicesSection';
import { SimpleGridBackground } from '@/shared/ui/simple-grid-background';
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

  return (
    <div className={styles.homePage}>
      {/* <SimpleGridBackground
        cellSize={50}
        lineWidth={1}
        color="var(--border-color-accent)"
        opacity={0.15}
        speed={0.05}
        fixed={true}
        className={styles.gridBackground}
      />
       */}
             <SimpleGridBackground
        cellSize={45}
        lineWidth={1}
        color="var(--border-color-accent)"
        opacity={0.16}
        speed={0.12}
        highlightCount={25}
        highlightColors={[
          'rgba(79, 70, 229, 0.15)',    // indigo
          'rgba(147, 51, 234, 0.12)',   // purple
          'rgba(236, 72, 153, 0.1)',    // pink
          'rgba(6, 182, 212, 0.1)',     // cyan
          'rgba(34, 197, 94, 0.08)',    // green
        ]}
        className={styles.gridBackground}
      />
      <div className={styles.homePageContent}>
        <div className={styles.dashboardSection}>
          <DashboardHeader 
            title={
              <>
                Unified system where <br />
                brand, strategy,<br /> technology and data <br />
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

          <SocialMediaGrid 
            columns={3}
            showDescriptions={true}
            className={styles.socialSection}
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