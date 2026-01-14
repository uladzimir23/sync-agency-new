import React from 'react';
import { ProductHeroGrid } from '../ProductHeroGrid';
import styles from './ServicesSection.module.scss';

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  onServiceClick?: (id: string) => void;
  className?: string;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = 'Comprehensive Services',
  subtitle = 'That elevate your brand, marketing, and products',
  onServiceClick,
  className = ''
}) => {
  const handleServiceClick = (id: string) => {
    console.log(`Service clicked: ${id}`);
    onServiceClick?.(id);
  };

  return (
    <section className={`${styles.servicesSection} ${className}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
      </div>
      
      <ProductHeroGrid onItemClick={handleServiceClick} />
    </section>
  );
};