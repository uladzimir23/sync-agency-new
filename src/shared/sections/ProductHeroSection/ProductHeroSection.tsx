import React, { useState, useMemo } from 'react';
import { HeroBackground, HeroBackgroundType } from '@/shared/ui/hero-background';
import { Button } from '@/shared/ui/button';
import styles from './ProductHeroSection.module.scss';

interface ProductHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  onCtaClick: () => void;
  backgroundType: HeroBackgroundType;
  className?: string;
}

// Маппинг типов фона к цветовым схемам
const COLOR_SCHEMES: Record<HeroBackgroundType, string> = {
  brand: 'blue',
  marketing: 'red',
  product: 'green',
  data: 'cyan',
  automation: 'purple',
} as const;

export const ProductHeroSection: React.FC<ProductHeroSectionProps> = ({
  title,
  subtitle,
  description,
  ctaText,
  onCtaClick,
  backgroundType,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Получаем цветовую схему на основе типа фона
  const colorScheme = useMemo(() => COLOR_SCHEMES[backgroundType] || 'blue', [backgroundType]);

  // Определяем классы для subtitle
  const subtitleClasses = useMemo(() => {
    const baseClass = styles.subtitle;
    const sizeClass = styles.medium;
    
    // Добавляем цветной класс только при ховере
    const colorClass = isHovered ? (styles[`${colorScheme}Color`] || '') : '';
    
    return `${baseClass} ${sizeClass} ${colorClass}`;
  }, [colorScheme, isHovered]);

  return (
    <section
      className={`${styles.container} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-type={backgroundType}
      data-color-scheme={colorScheme}
      data-hovered={isHovered}
    >
      <div className={styles.backgroundWrapper}>
        <HeroBackground 
          type={backgroundType} 
          speed={1} // Фиксированная скорость
          intensity={1} // Фиксированная интенсивность
          isHovered={isHovered} // Передаем состояние ховера
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <span className={subtitleClasses}>{subtitle}</span>
          <h1 className={styles.title}>{title}</h1>
        </div>
        
        <div className={`${styles.description} ${isHovered ? styles.descriptionVisible : ''}`}>
          {description}
        </div>
        
      </div>
    </section>
  );
};