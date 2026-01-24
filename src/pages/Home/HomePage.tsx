import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { SocialMediaGrid } from '@shared/sections/SocialMediaGrid';
import { BookingSection } from '@shared/sections/booking-section';
import { ServicesSection } from '@shared/sections/ServicesSection';
import { SimpleGridBackground } from '@/shared/ui/simple-grid-background';
import { Modal } from '@/shared/ui/modal'; // Импортируем модальное окно

import styles from './HomePage.module.scss';
import { ROUTES } from '@/shared/constants/routes';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false); // Состояние для модалки
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
    setIsBookingModalOpen(true);
    console.log('Opening Book Call modal...');
  };

  const handleCloseBookCallModal = () => {
    setIsBookingModalOpen(false);
  };

  return (
    <div className={styles.homePage}>
      <SimpleGridBackground
        cellSize={45.39}
        lineWidth={1}
        color="var(--border-color-accent)"
        opacity={0.16}
        speed={0.12}
        highlightCount={50}
        highlightColors={[
          'rgba(79, 70, 229, 0.15)',
          'rgba(147, 51, 234, 0.12)',
          'rgba(236, 72, 153, 0.1)',
          'rgba(6, 182, 212, 0.1)',
          'rgba(34, 197, 94, 0.08)',
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
            onBookCall={handleOpenBookCallModal} // Передаем функцию открытия модалки
          />
          <ServicesSection onServiceClick={handleServiceClick} />

          <SocialMediaGrid 
            columns={3}
            showDescriptions={true}
            className={styles.socialSection}
          />
            <BookingSection />
        </div>
      </div>

      {/* Модальное окно с BookingSection */}
      <Modal
        isOpen={isBookingModalOpen}
        onClose={handleCloseBookCallModal}
        size="lg"
        title="Book a Consultation"
        showCloseButton={true}
        closeOnBackdropClick={true}
        closeOnEscape={true}
        className={styles.bookingModal}
      >
        <div className={styles.bookingModalContent}>
          <BookingSection 
          />
        </div>
      </Modal>
    </div>
  );
};