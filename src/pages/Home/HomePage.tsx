import React, { useState } from 'react';
import { DashboardHeader } from '@shared/sections/DashboardHeader';
import { BookingSection } from '@shared/sections/booking-section';
import { ProductHeroGrid } from '@shared/sections/ProductHeroGrid';
import { CurvedLoop } from '@/shared/ui/curved-loop';
import { FloatingContactButton } from '@/shared/ui/floating-contact-button';
import { useTheme } from '@/shared/hooks/useTheme';
import styles from './HomePage.module.scss';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeMenu, setActiveMenu] = useState(0);
  const { theme } = useTheme();

  const handleContactClick = () => {
    console.log('Opening contact modal...');
  };

  const handleProductClick = (id: string) => {
    console.log(`Product clicked: ${id}`);
    // Здесь можно добавить навигацию или открытие модального окна
  };

  const getBackgroundFill = () => {
    return theme === 'dark' ? '#020212' : '#f2f2ff';
  };

  return (
    <div className={styles.homePage}>
      <div className={styles.homePageBackground}></div>
      
      <div className={styles.homePageContent}>
        <div className={styles.dashboardSection}>
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


          <ProductHeroGrid onItemClick={handleProductClick} />

          <BookingSection />
        </div>
      </div>
      
      <FloatingContactButton onClick={handleContactClick} />
    </div>
  );
};